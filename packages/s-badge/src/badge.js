/*
 * @Author: PT
 * @Date: 2020-10-10 11:40:12
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 11:41:45
 * @Description: SBadge
 */

import './badge.scss'
import Badge from 'element-ui/lib/badge'
export default {
  name: 'SBadge',
  render () {
    return (
      <el-badge ref="badge" class="s-badge" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-badge>
    )
  },
  components: {
    [Badge.name]: Badge
  }
}