/*
 * @Author: PT
 * @Date: 2020-10-09 09:09:02
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:00:36
 * @Description: SSelect
 */

import './select.scss'
import Select from 'element-ui/lib/select'
export default {
  name: 'SSelect',
  render () {
    return (
      <el-select ref="select" class="s-select" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        {
          this.$slots.default
        }
        {
          this.$slots.prefix && (
            <template slot="prefix">
              { this.$slots.prefix }
            </template>
          )
        }
        {
          this.$slots.empty && (
            <template slot="empty">
              { this.$slots.empty }
            </template>
          )
        }
      </el-select>
    )
  },
  methods: {
    focus () {
      this.$refs.select.focus()
    },
    blur () {
      this.$refs.select.blur()
    },
  },
  components: {
    [Select.name]: Select
  }
}