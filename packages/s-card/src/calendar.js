/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 16:23:53
 * @Description: SCard组件
 */
import './calendar.scss'
import Calendar from 'element-ui/lib/calendar'
export default {
  name: 'SCalendar',
  render () {
    return (
      <el-calendar ref="calendar" class="s-calendar" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          },
          scopedSlots: {
            ...this.$scopedSlots
          }
        }}>
      </el-calendar>
    )
  },
  components: {
    [Calendar.name]: Calendar
  }
}