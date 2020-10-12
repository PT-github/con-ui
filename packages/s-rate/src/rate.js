/*
 * @Author: PT
 * @Date: 2020-10-09 15:42:03
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:46:38
 * @Description: SRate
 */
import './rate.scss'
import Rate from 'element-ui/lib/rate'
export default {
  name: 'SRate',
  render () {
    return (
      <el-rate ref="rate" class="s-rate" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
      </el-rate>
    )
  },
  components: {
    [Rate.name]: Rate
  }
}