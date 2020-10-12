/*
 * @Author: PT
 * @Date: 2020-10-09 11:02:46
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 11:33:41
 * @Description: STimeSelect
 */
import TimeSelect from 'element-ui/lib/time-select'
import './time-select.scss'
export default {
  name: 'STimeSelect',
  render () {
    return (
      <el-time-select
        ref="time-select"
        class="s-time-select"
        popper-class="s-time-select-popper"
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
      </el-time-select>
    )
  },
  methods: {
    focus () {
      this.$refs['time-select'].focus()
    }
  },
  components: {
    [TimeSelect.name]: TimeSelect
  }
}