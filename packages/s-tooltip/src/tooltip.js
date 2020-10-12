/*
 * @Author: PT
 * @Date: 2020-10-12 11:21:49
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 11:24:16
 * @Description: STooltip
 */

import './tooltip.scss'
import Tooltip from 'element-ui/lib/tooltip'
export default {
  name: 'STooltip',
  render () {
    return (
      <el-tooltip ref="tooltip" class="s-tooltip" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
        {
          this.$slots.content && (
            <template slot="content">
              { this.$slots.content }
            </template>
          )
        }
      </el-tooltip>
    )
  },
  components: {
    [Tooltip.name]: Tooltip
  }
}