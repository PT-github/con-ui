/*
 * @Author: PT
 * @Date: 2020-10-09 11:14:52
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 11:20:22
 * @Description: SDatePicker
 */
import DatePicker from 'element-ui/lib/date-picker'
import './date-picker.scss'
export default {
  name: 'SDatePicker',
  render () {
    return (
      <el-date-picker
        ref="date-picker"
        class="s-date-picker"
        popper-class="s-date-picker-popper"
        {
          ...{
            attrs: {
              ...this.$attrs
            },
            on: {
              ...this.$listeners
            }
          }
        }
      >
      {
        this.$slots['range-separator'] && (
          <template slot="range-separator">
            { this.$slots['range-separator'] }
          </template>
        )
      }
      </el-date-picker>
    )
  },
  methods: {
    focus () {
      this.$refs['date-picker'].focus()
    }
  },
  components: {
    [DatePicker.name]: DatePicker
  }
}