/*
 * @Author: PT
 * @Date: 2020-09-29 22:33:41
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 22:51:11
 * @Description: SRadio
 */
import Radio from 'element-ui/lib/radio'
import './radio.scss'
export default {
  name: 'SRadio',
  render () {
    return (
      <el-radio class="s-radio"
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
      </el-radio>
    )
  },
  components: {
    [Radio.name]: Radio
  }
}