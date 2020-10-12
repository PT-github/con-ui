/*
 * @Author: PT
 * @Date: 2020-09-29 22:44:55
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 22:58:13
 * @Description: SRadioButton
 */
import RadioButton from 'element-ui/lib/radio-button'
import 'element-ui/lib/theme-chalk/radio-button.css'
export default {
  name: 'SRadioButton',
  render () {
    return (
      <el-radio-button class="s-radio-button"
        {
          ...{
            attrs: {
              ...this.$attrs
            },
            on: {
              ...this.$listeners
            }
          }
        }
      >
        {this.$slots.default || this.$attrs.label}
      </el-radio-button>
    )
  },
  components: {
    [RadioButton.name]: RadioButton
  }
}