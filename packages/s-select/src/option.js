/*
 * @Author: PT
 * @Date: 2020-10-09 09:14:58
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 09:20:16
 * @Description: SOption
 */
import './option.scss'
import Option from 'element-ui/lib/option'
export default {
  name: 'SOption',
  render () {
    return (
      <el-option class="s-option" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        {
          this.$slots.default
        }
      </el-option>
    )
  },
  components: {
    [Option.name]: Option
  }
}