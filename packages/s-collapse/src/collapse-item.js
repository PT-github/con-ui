/*
 * @Author: PT
 * @Date: 2020-10-12 15:04:40
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 15:10:18
 * @Description: SCollapseItem
 */
import './collapse-item.scss'
import CollapseItem from 'element-ui/lib/collapse-item'
export default {
  name: 'SCollapseItem',
  render () {
    return (
      <el-collapse-item ref="collapse-item" class="s-collapse-item" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
        { this.$slots.title && (
            <template slot="title">
              { this.$slots.title }
            </template>
          )
        }
      </el-collapse-item>
    )
  },
  components: {
    [CollapseItem.name]: CollapseItem
  }
}