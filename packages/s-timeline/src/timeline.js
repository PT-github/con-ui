/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 15:14:46
 * @Description: STimeline组件
 */
import './timeline.scss'
import Timeline from 'element-ui/lib/timeline'
export default {
  name: 'STimeline',
  render () {
    return (
      <el-timeline ref="timeline" class="s-timeline" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-timeline>
    )
  },
  components: {
    [Timeline.name]: Timeline
  }
}