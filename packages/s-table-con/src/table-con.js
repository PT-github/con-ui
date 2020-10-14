import STable from '../../s-table'
import STableColumnCon from './table-column-con'
import SPagination from '../../s-pagination'
import Sortable from 'sortablejs'
import { domObserve } from '../../../src/utils/dom-helper'
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
    parentSelector: String,
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
      paginationHeight: 0, // 分页组件高度
      parentNode: null, // 父容器
      timer: null, // 防抖
      sortable: null, // 表头拖拽实例
      editComponent: [] // 正在编辑的子组件
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
                ...this.$listeners
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
  methods: {
    ...STable.methods,
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
    },
    /**
     * @description: 设置表格行为编辑状态
     * @param {Array} rowIndexs
     * @param {Boolean} isEdit
     */
    setRowEdit (rowIndexs = [], isEdit = true) {
      this.broadcast('STableEditComponent', 'tablecell-edit', {rowIndexs, isEdit})
    },
    /**
     * @description: 保存编辑后的数据
     * @param {Number} rowIndex 需要保存的行下标
     */
    saveEdit (rowIndex) {
      this.$emit('save-start', rowIndex)
      this.broadcast('STableEditComponent', 'tablecell-save', rowIndex)
    },
    /**
     * @description: 取消编辑
     */
    cancelEdit () {
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
            console.log(res, '=================')
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
        this.observeDom = this.parentSelector ? (document.querySelector(this.parentSelector) || this.parentNode) : this.parentNode
        // 设置父容器溢出隐藏
        this.parentNode.style.overflow = 'hidden'
        // 分页组件高度
        this.paginationHeight = this.showPagination ? this.$refs.pagination.$el.offsetHeight + 'px' : 0
        // 监听高度变化的容器class和style属性变化
        this.observe = domObserve(this.observeDom, {
          attributes: true,
          attributeFilter: ['class', 'style']
        }, this.handleTableHeight)
        this.handleTableHeight()
      }
    },
    handleTableHeight () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let height = window.getComputedStyle(this.parentNode).height // 外部容器高度
        try {
          this.showPagination && (height = (Number(height.substring(0, height.length - 2)) - Number(this.paginationHeight.substring(0, this.paginationHeight.length - 2))) + 'px')
        } catch (error) {
          console.error('STableCon组件计算Pagination高度发生错误', error)
        }
        this.tableHeight = height
      }, 0)
    }
  },
  destroyed () {
    this.observe && this.observe.disconnect()
  },
  components: {
    STable,
    STableColumnCon,
    SPagination
  }
}