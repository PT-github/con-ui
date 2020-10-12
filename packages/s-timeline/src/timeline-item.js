/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 15:14:46
 * @Description: STimelineItem组件
 */
import './timeline-item.scss'
import TimelineItem from 'element-ui/lib/timeline-item'
export default {
  name: 'STimelineItem',
  render () {
    return (
      <el-timeline-item ref="timeline-item" class="s-timeline-item" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
        { this.$slots.dot && (
            <template slot="dot">
              { this.$slots.dot }
            </template>
          )
        }
      </el-timeline-item>
    )
  },
  components: {
    [TimelineItem.name]: TimelineItem
  }
}