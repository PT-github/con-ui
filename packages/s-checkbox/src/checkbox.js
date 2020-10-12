/*
 * @Author: PT
 * @Date: 2020-09-29 23:06:23
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 23:10:45
 * @Description: SCheckbox
 */
import Checkbox from 'element-ui/lib/checkbox'
import './checkbox.scss'
export default {
  name: 'SCheckbox',
  render () {
    return (
      <el-checkbox class="s-checkbox" {
        ...{
          attrs: {...this.$attrs},
          on: {...this.$listeners}
        }
      }>
        { this.$slots.default || this.$attrs.label }
      </el-checkbox>
    )
  },
  components: {
    [Checkbox.name]: Checkbox
  }
}