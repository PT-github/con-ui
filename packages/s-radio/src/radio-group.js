/*
 * @Author: PT
 * @Date: 2020-09-29 22:44:43
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 22:56:22
 * @Description: SRadioGroup
 */
import RadioGroup from 'element-ui/lib/radio-group'
import './radio-group.scss'
export default {
  name: 'SRadioGroup',
  render () {
    return (
      <el-radio-group class="s-radio-group"
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
        {this.$slots.default}
      </el-radio-group>
    )
  },
  components: {
    [RadioGroup.name]: RadioGroup
  }
}