/*
 * @Author: PT
 * @Date: 2020-10-10 11:45:26
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 11:46:45
 * @Description: SAvatar
 */

import './avatar.scss'
import Avatar from 'element-ui/lib/avatar'
export default {
  name: 'SAvatar',
  render () {
    return (
      <el-avatar ref="avatar" class="s-avatar" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-avatar>
    )
  },
  components: {
    [Avatar.name]: Avatar
  }
}