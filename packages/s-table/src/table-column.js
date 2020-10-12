/*
 * @Author: PT
 * @Date: 2020-10-10 08:46:04
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 08:55:28
 * @Description: STableColumn
 */
import './styles/table-column.scss'
import TableColumn from 'element-ui/lib/table-column'

export default {
  name: 'STableColumn',
  render (){
    return (
      <el-table-column ref='table-column' class="s-table-column" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          },
          scopedSlots: {
            ...this.$scopedSlots
          }
        }
      }>
        {
          this.$slots.default
        }
      </el-table-column>
    )
  },

  components: {
    [TableColumn.name]: TableColumn
  }
}