/*
 * @Author: PT
 * @Date: 2020-10-10 08:56:05
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 08:59:12
 * @Description: STag组件
 */

import './tag.scss'
import Tag from 'element-ui/lib/tag'
export default {
  name: 'STag',
  render () {
    return (
      <el-tag ref="tag" class="s-tag" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-tag>
    )
  },
  components: {
    [Tag.name]: Tag
  }
}