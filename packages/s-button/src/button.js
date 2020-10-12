/*
 * @Author: PT
 * @Date: 2020-09-29 22:03:42
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 22:11:00
 * @Description: SButton
 */
import Button from 'element-ui/lib/button'
import './button.scss'
export default {
  name: 'SButton',
  render () {
    return (
      <el-button {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}
      >
        {this.$slots.default}
      </el-button>
    )
  },
  components: {
    [Button.name]: Button
  }
}
