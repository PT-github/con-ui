/*
 * @Author: PT
 * @Date: 2020-10-12 15:32:34
 * @LastEditors: PT
 * @LastEditTime: 2020-10-13 09:57:52
 * @Description: SCalendar
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
    [ Calendar.name ]: Calendar
  }
}