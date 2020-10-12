/*
 * @Author: PT
 * @Date: 2020-10-12 15:32:34
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 17:03:06
 * @Description: SBacktop
 */

import './backtop.scss'
import Backtop from 'element-ui/lib/backtop'
import Icon from '../../s-icon'
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
        { this.$slots.default || <s-icon name="caret-top"></s-icon>}
      </el-backtop>
    )
  },
  components: {
    [ Backtop.name ]: Backtop,
    [ Icon.name ]: Icon
  }
}