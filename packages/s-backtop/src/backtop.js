/*
 * @Author: PT
 * @Date: 2020-10-12 15:32:34
 * @LastEditors: PT
 * @LastEditTime: 2020-10-21 15:18:33
 * @Description: SBacktop
 */

import './backtop.scss'
import Backtop from 'element-ui/lib/backtop'
export default {
  name: 'SBacktop',
  render () {
    return (
      <el-backtop ref="backtop" class="s-backtop" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default || <i class={'el-icon-caret-top'}></i>}
      </el-backtop>
    )
  },
  components: {
    [ Backtop.name ]: Backtop
  }
}