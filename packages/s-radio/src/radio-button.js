/*
 * @Author: PT
 * @Date: 2020-09-29 22:44:55
 * @LastEditors: PT
 * @LastEditTime: 2020-10-19 09:34:36
 * @Description: SRadioButton
 */
import RadioButton from 'element-ui/lib/radio-button'
import './radio-button.scss'
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