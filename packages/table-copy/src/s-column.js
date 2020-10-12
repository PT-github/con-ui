/*
 * @Author: fenzhou
 * @Date: 2020-05-25 09:56:38
 * @LastEditors: PT
 * @LastEditTime: 2020-09-28 23:20:06
 * @Description: {{}}
 */
import TableColumn from 'element-ui/lib/table-column'
export default {
  name: 'SColumn',

  props: {
    column: Object
  },
  render () {
    return ( <el-table-column 
      { ...{
          props: this.$attrs,
          on: this.$listeners
        }
      }
      scopedSlots={{
        default: this.$scopedSlots[this.column.value],
        header: this.$scopedSlots[this.column.value + 'Header']
      }}>
        {this.column.children && this.column.children.length>0 && this.column.children.map(child => {
          return <s-column column={child}           
          type={child.type}
          index={child.index}
          column-key={child.columnKey}
          label={child.label}
          prop={child.value} 
          width={child.width}
          min-width={child.minWidth}
          fixed={child.fixed}
          render-header={child.renderHeader}
          sortable={child.sortable}
          sort-method={child.sortMethod}
          sort-by={child.sortBy}
          sort-orders={child.sortOrders}
          resizable={child.resizable}
          formatter={child.formatter}
          show-overflow-tooltip={child.showOverflowTooltip}
          align={child.align}
          header-align={child.headerAlign}
          class-name={child.className}
          label-class-name={child.labelClassName}
          selectable={child.selectable}
          reserve-selection={child.reserveSelection}
          filters={child.filters}
          filter-placement={child.filterPlacement}
          filter-multiple={child.filterMultiple}
          filter-method={child.filterMethod}
          filtered-value={child.filteredValue}
          key={child.value} 
          scopedSlots={{...this.$scopedSlots}}></s-column>
        })}
      </el-table-column>
    )
  },

  components: {
    [TableColumn.name]: TableColumn
  },

  data () {
    return {}
  },

  computed: {},

  mounted () {
  },

  methods: {

  },

  watch: {}
}