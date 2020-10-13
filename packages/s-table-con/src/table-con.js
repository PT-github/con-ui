import STable from '../../s-table'
import STableColumnCon from './table-column-con'
import SPagination from '../../s-pagination'
import './table-con.scss'

export default {
  name: 'STableCon',
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
    // 是否显示分页组件
    showPagination: {
      type: Boolean,
      default: true
    },
    // 是否根据父容器自适应高度
    autoHeight: {
      type: Boolean,
      default: false,
    },
    // 设置高度
    height: {
      type: [String, Number]
    },
    // 列配置
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格尺寸  large、medium、small 和 mini
    size: {
      type: String,
      validator: function (t) {
        // 这个值必须匹配下列字符串中的一个
        return t === 'large' || t === 'medium' || t === 'small' || t === 'mini'
      },
      default: 'medium'
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
      total: 0 // 总条数
    }
  },
  render () {
    console.log(this.showPagination, 'showPagination')
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
                ...props
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
  },
  methods: {
    ...STable.methods,
    /**
     * @description: 根据showPagination配置显示分页组件
     */
    renderPagination () {
      if (this.showPagination) {
        return (
          <s-pagination {
            ...{
              attrs: {
                // 翻页的配置放置在this.$attrs.pagination对象中
                ...(this.$attrs.pagination || {}),
                'page-size': this.pageSize = this.$attrs.pagination['page-size'] || this.pageSize,
                'current-page': this.pageNo = this.$attrs.pagination['current-page'] || this.pageNo,
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
        this.$nextTick(() => {
          this.loading = false
        })
      } else if (typeof data === 'function') {
        // 如果传递function，函数执行完必须返回一个promise

        // 设置分页参数
        let params = {
          [this.props.pageNo]: pageNo,
          [this.props.pageSize]: pageSize
        }
        let result = data(params)
        if (typeof result === 'object' && typeof result.then === 'function') {
          result.then(res => {
            if (res[this.props.list] && res[this.props.list].length > 0) {
              // 设置表格数据
              this.tableData.push(...res[this.props.list])
              // 设置分页数据
              this.pageNo = res[this.props.pageNo]
              this.pageSize = res[this.props.pageSize]
              this.total = res[this.props.total]
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
    }
  },
  components: {
    STable,
    STableColumnCon,
    SPagination
  }
}