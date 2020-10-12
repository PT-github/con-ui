/*
 * @Author: PT
 * @Date: 2020-10-10 09:16:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 09:17:44
 * @Description: SPopover
 */

import './popover.scss'
import Popover from 'element-ui/lib/popover'
export default {
  name: 'SPopover',
  computed: {},
  render () {
    return (
      <el-popover ref="popover" class="s-popover" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        {
          this.$slots.default }
        {
          this.$slots.reference && (
            <template slot="reference">
              { this.$slots.reference }
            </template>
          )
        }
      </el-popover>
    )
  },
  components: {
    [Popover.name]: Popover
  }
}