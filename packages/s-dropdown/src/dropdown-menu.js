/*
 * @Author: PT
 * @Date: 2020-10-12 10:20:28
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 10:30:07
 * @Description: SDropdownMenu
 */
import './styles/dropdown-menu.scss'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
export default {
  name: 'SDropdownMenu',
  render () {
    return (
      <el-dropdown-menu ref="dropdown-menu" class="s-dropdown-menu" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-dropdown-menu>
    )
  },
  components: {
    [DropdownMenu.name]: DropdownMenu
  }
}