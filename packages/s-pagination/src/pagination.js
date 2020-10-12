/*
 * @Author: PT
 * @Date: 2020-10-10 11:35:35
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 11:37:33
 * @Description: SPagination
 */

import './pagination.scss'
import Pagination from 'element-ui/lib/pagination'
export default {
  name: 'SPagination',
  render () {
    return (
      <el-pagination ref="pagination" class="s-pagination" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-pagination>
    )
  },
  components: {
    [Pagination.name]: Pagination
  }
}