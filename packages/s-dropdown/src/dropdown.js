/*
 * @Author: PT
 * @Date: 2020-10-12 10:20:28
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 10:24:08
 * @Description: SDropdown
 */

import './styles/dropdown.scss'
import Dropdown from 'element-ui/lib/dropdown'
export default {
  name: 'SDropdown',
  render () {
    return (
      <el-dropdown ref="dropdown" class="s-dropdown" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
        {
          this.$slots.dropdown && (
            <template slot="dropdown">
              { this.$slots.dropdown }
            </template>
          )
        }
      </el-dropdown>
    )
  },
  components: {
    [Dropdown.name]: Dropdown
  }
}