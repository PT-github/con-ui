/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 15:08:07
 * @Description: SCollapse
 */
import './collapse.scss'
import Collapse from 'element-ui/lib/collapse'
export default {
  name: 'SCollapse',
  render () {
    return (
      <el-collapse ref="collapse" class="s-collapse" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-collapse>
    )
  },
  components: {
    [Collapse.name]: Collapse
  }
}