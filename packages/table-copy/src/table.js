/*
 * @Author: fenzhou
 * @Date: 2020-06-09 17:40:24
 * @LastEditors: PT
 * @LastEditTime: 2020-09-28 23:31:52
 * @Description: 
 */
import SColumn from './s-column.js'
// import SPagination from '../../s-pagination'
import Sortable from 'sortablejs'
import 'element-ui/lib/theme-chalk/table.css'
import './styles/s-table.scss'
import Table from 'element-ui/lib/table'

export default {
  name: 'STable',
  props: {
    // 表头是否可拖拽
    tableHeaderDragable: {
      type: Boolean,
      default: false
    },
    // 自动加载表格数据
    autoLoad: {
      type: Boolean,
      default: true
    },
    // 表格数据
    data: {
      type: [Function, Array, Object]
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number]
    },
    parentSelector: String,
    maxHeight: {
      type: [String, Number]
    },
    column: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'small'
    },
    pageObj: {
      type: Object
    }
  },
  render (){
    let getSlots = (col)=>{
      let r = {}
      if(!col.slotBool) return {}
      r[col.value] = this.$scopedSlots[col.value]
      r[col.value+'Header'] = this.$scopedSlots[col.value+'Header']
      return r
    }
    const { tData, tHeight } = this.$data
    const { column } = this.$props
    return (
      <div class="s_table">
        <el-table ref='table' {...{props: this.$attrs, on: this.$listeners}}
          height={tHeight}
          data={tData}
          setCurrentRow={(row)=>{this.setCurrentRow(row)}}
          toggleRowSelection={(row, selected)=>{this.toggleRowSelection(row, selected)}}
          sort={(prop, order)=>{this.sort(prop, order)}}
          clearFilter={(columnKey)=>this.clearFilter(columnKey)}>
          {
            column && column.length > 0 && column.map((col) => {
              return <s-column column={col}
              type={col.type}
              index={col.index}
              column-key={col.columnKey}
              label={col.label}
              prop={col.value} 
              width={col.width}
              min-width={col.minWidth}
              fixed={col.fixed}
              render-header={col.renderHeader}
              sortable={col.sortable}
              sort-method={col.sortMethod}
              sort-by={col.sortBy}
              sort-orders={col.sortOrders}
              resizable={col.resizable}
              formatter={col.formatter}
              show-overflow-tooltip={col.showOverflowTooltip}
              align={col.align}
              header-align={col.headerAlign}
              class-name={col.className}
              label-class-name={col.labelClassName}
              selectable={col.selectable}
              reserve-selection={col.reserveSelection}
              filters={col.filters}
              filter-placement={col.filterPlacement}
              filter-multiple={col.filterMultiple}
              filter-method={col.filterMethod}
              filtered-value={col.filteredValue}
              key={col.value} 
              scopedSlots={getSlots(col)}></s-column>
            })
          }
        </el-table>
        {/* {this.renderPagination()} */}
      </div>
    )
  },

  data () {
    return {
      tData: [], // 表格源数据
      sortable: null, // new Sortable实例
      sortableArray: [], // 列序列
      localPagination: {
        pageSize: 10,
        pageNo: 1,
        total: 10
      },
      tHeight: 100
    }
  },

  components: {
    SColumn,
    // SPagination,
    [Table.name]: Table
  },

  computed: {},

  mounted () {
    if (this.autoLoad) {
      // console.log('autoload執行！')
      this.loadData()
    }
    this.initDrag()
    this.$nextTick(()=>{
      if(this.autoHeight && !this.height){
        window.addEventListener('resize', this.resizeHeight)
        this.resizeHeight()
      }else{
        this.tHeight = this.height
      }
      this.$refs.table.doLayout()
    })
  },

  methods: {
    renderPagination () {
      const { localPagination } = this.$data
      if(this.showPagination){
        return <s-pagination class="pagination" ref="pagination"
          background total={localPagination.total} layout="prev, pager, next, sizes, jumper" on-current-change={this.pageChange} on-size-change={this.sizeChange}></s-pagination>
      }else{
        return ''
      }
    },
    pageChange (val) {
      console.log('pageChange val:', val)
      this.loadData({pageNo: val})
    },
    sizeChange (val) {
      this.loadData({pageSize: val})
    },
    resizeHeight () {
      let parentNode = this.$el.parentNode
      let parent = this.parentSelector ? document.querySelector(this.parentSelector) : parentNode
      let h = window.getComputedStyle(parent).height
      let res = ''
      if(this.showPagination){
        let pageH = window.getComputedStyle(this.$refs.pagination.$el).height
        res = Number(h.substring(0, h.length-2)) - Number(pageH.substring(0, pageH.length-2)) - 40 + 'px'
      }else{
        res = h
      }
      this.tHeight = res
    },
    initDrag () { // 初始化拖拽
      let self = this
      if (!this.tableHeaderDragable) {
        // 开关
        return
      }
      if (this.sortable) {
        this.sortable.destroy()
      }
      this.$nextTick(() => {
        let wrapperTr = this.$refs.table.$el.querySelector('.el-table__header-wrapper tr')
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
            /**
             * 禁止拖到序号/选择框所占列前
             * 禁止拖到滚动条所占的列后
             */
            let _column = self.$refs.table.store.states._columns[evt.oldIndex]
            console.log('_column:::', _column)
            self.$refs.table.store.commit('removeColumn', _column)
            self.$refs.table.store.commit('insertColumn', _column, evt.newIndex)
            this.$nextTick(() => {
              wrapperTr.children[evt.newIndex].setAttribute('data-id', currentDataId)
            })
          }
        })
      })
    },
    // 给th添加data-id属性 才能进行排序和恢复排序
    setDataId (list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          let dom = list[i]
          dom.setAttribute('data-id', 'data-id__' + i)
        }
      }
    },
    getColumnSort () { // 获取当前列排序
      console.log('当前列序列：', this.sortableArray)
      return this.sortableArray
    },
    loadData (pagination, filter, sorter) {
      const {
        data
      } = this.$props
      let param = Object.assign({
        pageNo: (pagination && pagination.pageNo) || this.pageNo || this.localPagination.pageNo, 
        pageSize: (pagination && pagination.pageSize) || this.pageSize || this.localPagination.pageSize },
        (sorter && sorter.field && { sortField: sorter.field }) || {},
        (sorter && sorter.order && { sortOrder: sorter.order }) || {}, {...filter})
      if (typeof data === 'object') {
        this.tData = data.list
      } else if (typeof data === 'function') {
        console.log('loadData param:', param)
        let r = data(param)
        if (typeof r === 'object' && typeof r.then === 'function') {
        r.then(res => {
            if (res.list && res.list.length > 0) {
              this.tData = res.list
              this.localPagination = {
                pageNo: res.pageNo,
                pageSize: res.pageSize,
                total: res.total
              }
            }
          })
        }
      }else{
        this.tData = data
      }
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh () {
    // refresh (bool = false) {
      // bool &&
      //   (this.localPagination = Object.assign({}, {
      //     current: 1,
      //     pageSize: this.pageSize
      //   }))
      this.loadData()
    },
    setCurrentRow (row) {
      this.$refs.table.setCurrentRow(row)
    },
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    sort (prop, order) {
      this.$refs.table.sort(prop, order)
    },
    clearFilter (columnKey) {
      this.$refs.table.clearFilter(columnKey)
    }
  },

  watch: {
    pageObj (val) {
      this.localPagination = {...this.localPagination, ...val}
    }
  },
  destroyed () {
    if (this.sortable) {
      this.sortable.destroy()
    }
  }
}