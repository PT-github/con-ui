/*
 * @Author: PT
 * @Date: 2020-09-29 17:25:24
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 17:42:20
 * @Description: SRow
 */
import Row from 'element-ui/lib/row'
import 'element-ui/lib/theme-chalk/row.css'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'SRow',
  render () {
    return (
      <el-row
        {
          ...{
            attrs: {
              ...this.$attrs
            }
          }
        }
      >
        {this.$slots.default}
      </el-row>
    )
  },
  components: {
    [Row.name]: Row
  }
}