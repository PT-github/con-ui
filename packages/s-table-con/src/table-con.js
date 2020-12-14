import STable from '../../s-table'
import STableColumnCon from './table-column-con'
// import SPagination from '../../s-pagination'
import Sortable from 'sortablejs'
import { domObserve } from '../../../src/utils/dom-helper'
import { throttle } from 'throttle-debounce'
import Emitter from '../../../src/utils/emitter'
import './table-con.scss'

export default {
  name: 'STableCon',
  componentName: 'STableCon',
  mixins: [ Emitter ],
  provide () {
    return {
      tableCon: this
    }
  },
  props: {
    // 表头是否可拖拽
    tableHeaderDragable: {
      type: Boolean,
      default: false
    },
    // 自动加载表格数据 默认为true
    autoLoad: {
      type: Boolean,
      default: true
    },
    // 表格数据
    data: {
      type: [Function, Array]
    },
    // 高度自适应时，被监听的容器dom节点
    observeSelector: String,
    // 是否显示分页组件
    showPagination: {
      type: Boolean,
      default: false
    },
    // 是否根据父容器自适应高度
    autoHeight: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number]
    },
    // 列配置
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // 请求接口入或接口返回数据 分页字段key配置
    props: {
      type: Object,
      default: () => {
        return {
          pageSize: 'pageSize', // 每页显示条数-对应字段
          total: 'total', // 总条数-对应字段
          pageNo: 'pageNo', // 当前页码-对应字段
          list: 'list' // 列表返回-对应字段
        }
      }
    }
  },
  data () {
    return {
      loading: false, // loading控制
      tableData: [], // 表格数据
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      tableHeight: null, // 表格高度
      parentNode: null, // 父容器
      timer: null, // 防抖
      sortable: null, // 表头拖拽实例
      isSaving: false, // 表格是否正在保存
      savedRowIndex: null, // 正在保存的行下标 'all'表示整个表格保存
      editComponent: [], // 正在编辑的子组件
      observe: null // dom监听
    }
  },
  render () {
    let { size } = this.$attrs
    let { columns } = this.$props
    let props = {
      ...this.$attrs,
      size,
      data: this.tableData
    }
    return (
      <div class="s-table-con">
        <s-table ref="table" {
            ...{
              attrs: {
                ...props,
                height: this.height || this.tableHeight
              },
              on: {
                ...this.$listeners,
                'body-scroll': this.handleBodyScroll
              }
            }
          }
          vLoading={ this.loading }
        >
          { 
            columns &&
            columns.length > 0 &&
            columns.map(column => <s-table-column-con
              {
                ...{
                  attrs: { ...column },
                  scopedSlots: { ...this.$scopedSlots }
                }
              }
            ></s-table-column-con>)
          }
        </s-table>
        { this.renderPagination() }
      </div>
    )
  },
  mounted () {
    this.autoLoad && this.loadData()
    this.initTableheaderDrag()
    this.calcTableHeight()
  },
  computed: {
    // 正在编辑的行下标
    currentEditedRows () {
      return this.editComponent.reduce((editedRows, current) => {
        editedRows.indexOf(current.rowIndex) === -1 && editedRows.push(current.rowIndex)
        return editedRows
      }, [])
    }
  },
  methods: {
    ...STable.methods,
    /**
     * @description: 监听tablebody scroll事件
     */
    handleBodyScroll () {
      this.broadcast('STableEditComponent', 'body-scroll')
    },
    /**
     * @description: 添加正在编辑的子组件
     */
    addEdittingComponent (instance) {
      this.editComponent.indexOf(instance) === -1 && this.editComponent.push(instance)
    },
    /**
     * @description: 删除编辑完的子组件
     */
    removeEdittingComponent (instance) {
      let index = this.editComponent.indexOf(instance)
      index !== -1 && this.editComponent.splice(index, 1)
      if (this.isSaving) {
        if (this.savedRowIndex === 'all') {
          if (this.editComponent.length === 0) {
            this.handleSaveFinishedCallback()
          }
        } else {
          let arry = this.editComponent.filter(component => component.rowIndex === this.savedRowIndex)
          if (arry.length === 0) {
            this.handleSaveFinishedCallback(this.savedRowIndex)
          }
        }
      }
    },
    // 处理保存成功后 关闭loading
    handleSaveFinishedCallback () {
      this.$emit('save-finished', this.savedRowIndex === 'all' ? this.tableData : this.tableData[this.savedRowIndex])
      this.isSaving = false
      this.savedRowIndex = null
      if (typeof this.$listeners.saveFinished === 'function') {
        let ret = this.$listeners.saveFinished()
        if (typeof ret === 'object' && typeof ret.then === 'function') {
          ret.then(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      } else {
        this.loading = false
      }
    },
    /**
     * @description: 设置表格行为编辑状态
     * @param {Array || String || Number} rowIndexs
     * @param {Boolean} isEdit
     */
    setRowEdit (rowIndexs = 'all', isEdit = true) {
      if (rowIndexs === 'all') {
        // 设置所有单元格编辑状态
        rowIndexs = this.tableData.reduce((totalIndex, currentValue, currentIndex) => {
          totalIndex.push(currentIndex)
          return totalIndex
        }, [])
        this.broadcast('STableEditComponent', 'tablecell-edit', {rowIndexs: rowIndexs, isEdit})
      } else if (typeof rowIndexs === 'number') {
        // 设置rowIndexs行的编辑状态
        rowIndexs = [ rowIndexs ]
        this.broadcast('STableEditComponent', 'tablecell-edit', {rowIndexs, isEdit})
      } else if (Array.isArray(rowIndexs)) {
        // 设置多列的编辑状态
        this.broadcast('STableEditComponent', 'tablecell-edit', {rowIndexs, isEdit})
      }
    },
    /**
     * @description: 保存编辑后的数据
     * @param {Number} rowIndex 需要保存的行下标
     */
    saveEdit (rowIndex = 'all') {
      if (!this.editComponent.length) {
        return
      }
      this.savedRowIndex = rowIndex
      this.$emit('save-start', rowIndex)
      this.isSaving = true
      // 先进行表格校验
      this.broadcast('STableEditComponent', 'tablecell-validate', rowIndex)
      // this.loading = true
      // this.broadcast('STableEditComponent', 'tablecell-save', rowIndex)
    },
    /**
     * @description: 可编辑单元格校验完成 回调
     */
    updateEdittingComponent () {
      if (this.isSaving) {
        let arry = []
        if (this.savedRowIndex === 'all') {
          arry = this.editComponent.filter(component => component.validateState !== 'success')
        } else {
          arry = this.editComponent.filter(component => component.rowIndex === this.savedRowIndex && component.validateState !== 'success')
        }
        if (arry.length === 0) {
          this.loading = true
          this.broadcast('STableEditComponent', 'tablecell-save', this.savedRowIndex)
        }
      }
    },
    /**
     * @description: 取消编辑
     */
    cancelEdit () {
      this.isSaving = false
      this.broadcast('STableEditComponent', 'cancel-tablecell-edit')
    },
    /**
     * @description: 根据showPagination配置显示分页组件
     */
    renderPagination () {
      if (this.showPagination) {
        return (
          <s-pagination ref="pagination" {
            ...{
              attrs: {
                // 翻页的配置放置在this.$attrs.pagination对象中
                ...(this.$attrs.pagination || {}),
                layout: this.$attrs.pagination && this.$attrs.pagination.layout || 'total, prev, pager, next, sizes, jumper',
                'page-size': this.pageSize = this.$attrs.pagination && this.$attrs.pagination['page-size'] || this.pageSize,
                'current-page': this.pageNo = this.$attrs.pagination && this.$attrs.pagination['current-page'] || this.pageNo,
                background: true,
                total: this.total
              },
              on: {
                'update:page-size': v => this.pageSize = v,
                'update:current-page': v => this.pageNo = v,
                'size-change': this.handleSizeChange,
                'current-change': this.handleCurrentChange
              }
            }
          }></s-pagination>
        )
      }
    },
    /**
     * @description: 监听分页组件pagesize change事件
     */
    handleSizeChange (pageSize) {
      this.loadData({ pageSize })
    },
    /**
     * @description: 监听分页current-page change事件
     */
    handleCurrentChange (pageNo) {
      this.loadData({ pageNo })
    },
    /**
     * @description: 供外部调用的加载表格数据
     * @param {boolean}} bool 是否从第一页开始加载
     */    
    refresh (bool) {
      bool && (this.pageNo = 1)
      this.loadData()
    },
    /**
     * @description: 表格加载数据
     * @param {Object} { pageNo, pageSize } 
     */
    loadData ({pageNo = this.pageNo, pageSize = this.pageSize} = {}) {
      this.loading = true
      this.tableData.splice(0, this.tableData.length) // 清空数据

      const { data } = this.$props
      
      if (Array.isArray(data)) {
        this.tableData = data
        this.total = this.tableData.length
        // this.pageSize = this.tableData.length
        this.pageNo = 1
        this.$nextTick(() => {
          this.loading = false
        })
      } else if (typeof data === 'function') {
        // 如果传递function，函数执行完必须返回一个promise

        // 设置分页参数
        let props = Object.assign({
          pageSize: 'pageSize', // 每页显示条数-对应字段
          total: 'total', // 总条数-对应字段
          pageNo: 'pageNo', // 当前页码-对应字段
          list: 'list' // 列表返回-对应字段
        }, this.props)
        let params = {
          [props.pageNo]: pageNo,
          [props.pageSize]: pageSize
        }
        let result = data(params)
        if (typeof result === 'object' && typeof result.then === 'function') {
          result.then(res => {
            // console.log(res, '=================')
            if (res[props.list] && res[props.list].length > 0) {
              // 设置表格数据
              this.tableData.push(...res[props.list])
              // 设置分页数据
              this.pageNo = res[props.pageNo]
              this.pageSize = res[props.pageSize]
              this.total = res[props.total]
              this.$nextTick(() => {
                this.loading = false
              })
            }
          }).catch(e => {
            this.loading = false
            console.error('STableCon组件获取数据发生错误', e)
          })
        }
      }
    },
    /**
     * @description: 表头拖拽
     */
    initTableheaderDrag () {
      let self = this
      if (!this.tableHeaderDragable) {
        // 开关
        return
      }
      if (this.sortable) {
        this.sortable.destroy()
      }
      this.$nextTick(() => {
        let tableRefs = this.$refs.table.$refs.table
        let wrapperTr = tableRefs.$el.querySelector('.el-table__header-wrapper tr')
        let currentDataId = '' // 当前拖拽th的data-id
        this.setDataId(wrapperTr.children)
        let sortableArray = null
        this.sortable = new Sortable(wrapperTr, {
          animation: 180,
          delay: 0,
          filter: '.cannotDrag, .gutter',
          onStart: evt => {
            currentDataId = evt.item.getAttribute('data-id')
            sortableArray = self.sortable.toArray()
            self.sortableArray = sortableArray
          },
          onEnd: evt => {
            let _column = tableRefs.store.states._columns[evt.oldIndex]
            tableRefs.store.commit('removeColumn', _column)
            tableRefs.store.commit('insertColumn', _column, evt.newIndex)
            this.$nextTick(() => {
              wrapperTr.children[evt.newIndex].setAttribute('data-id', currentDataId)
            })
          }
        })
      })
    },
    /**
     * @description: 给th添加data-id属性 才能进行排序和恢复排序
     */
    setDataId (list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          let dom = list[i]
          dom.setAttribute('data-id', 'data-id__' + i)
        }
      }
    },
    /**
     * @description: 计算表格高度
     */
    calcTableHeight () {
      if (this.$attrs.height) {
        return
      }
      // 自适应高度（根据父容器高度设置表格的高度，同时监听父容器的高度变化）
      if (this.autoHeight) {
        // 父容器
        this.parentNode = this.$el.parentNode
        // 被监听的父节点
        let observeDom = this.observeSelector ? (document.querySelector(this.observeSelector) || this.parentNode) : this.parentNode
        // 设置父容器溢出隐藏
        this.parentNode.style.overflow = 'hidden'

        this.handleTableHeight = throttle(20, this.observeHeight)
        // 监听高度变化的容器class和style属性变化
        this.observe = domObserve(observeDom, {
          attributes: true,
          attributeFilter: ['class', 'style'],
          characterData: true, // 节点内容或节点文本的变动
          childList: true, // 子节点的变动（新增、删除或者更改）
          subtree: true, // 是否将观察器应用于该节点的所有后代节点
        }, this.handleTableHeight)
        this.handleTableHeight()
      }
    },
    // 表格高度计算
    observeHeight () {
      // let height = window.getComputedStyle(this.parentNode).height // 外部容器高度
      // console.log('===',this.parentNode, this.parentNode.offsetHeight, window.getComputedStyle(this.parentNode).height)
      let height = this.parentNode.offsetHeight
      try {
        let paginationHeight = this.showPagination ? this.$refs.pagination.$el.offsetHeight : 0
        height -= paginationHeight
        this.$refs.table.doLayout()
      } catch (error) {
        console.error('STableCon组件计算自适应高度发生错误', error)
      }
      this.tableHeight = height
    }
    // // 表格高度计算
    // handleTableHeight () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(() => {
    //     // let height = window.getComputedStyle(this.parentNode).height // 外部容器高度
    //     let height = this.parentNode.offsetHeight
    //     try {
    //       let paginationHeight = this.showPagination ? this.$refs.pagination.$el.offsetHeight : 0
    //       height -= paginationHeight
    //       this.$refs.table.doLayout()
    //     } catch (error) {
    //       console.error('STableCon组件计算自适应高度发生错误', error)
    //     }
    //     this.tableHeight = height
    //   }, 0)
    // }
  },
  watch: {
    // 监听正在编辑行数据
    currentEditedRows (v) {
      this.$emit('edit-rows-change', v)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.observe && this.observe.disconnect()
  },
  components: {
    // STable,
    STableColumnCon,
    // SPagination
  }
}