/*
 * @Author: PT
 * @Date: 2020-09-29 22:18:44
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 22:21:51
 * @Description: SButtonGroup
 */
import ButtonGroup from 'element-ui/lib/button-group'
import 'element-ui/lib/theme-chalk/button-group.css'
export default {
  name: 'SButtonGroup',
  render () {
    return (
      <el-button-group {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }
      }>
        {this.$slots.default}
      </el-button-group>
    )
  },
  components: {
    [ButtonGroup.name]: ButtonGroup
  }
}