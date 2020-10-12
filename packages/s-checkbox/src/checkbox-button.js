/*
 * @Author: PT
 * @Date: 2020-09-29 23:14:44
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 23:17:48
 * @Description: SCheckboxButton
 */
import 'element-ui/lib/theme-chalk/checkbox-button.css'
import CheckboxButton from 'element-ui/lib/checkbox-button'

export default {
  name: 'SCheckboxButton',
  render () {
    return (
      <el-checkbox-button class="s-checkbox-button" {
        ...{
          attrs: {...this.$attrs},
          on: {...this.$listeners}
        }
      }>
        { this.$slots.default || this.$attrs.label }
      </el-checkbox-button>
    )
  },
  components: {
    [CheckboxButton.name]: CheckboxButton
  }
}