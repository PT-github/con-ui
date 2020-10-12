/*
 * @Author: PT
 * @Date: 2020-10-09 09:00:31
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 14:59:49
 * @Description: SInputNumber
 */

import './input-number.scss'
import InputNumber from 'element-ui/lib/input-number'
export default {
  name: 'SInputNumber',
  render () {
    return (
      <el-input-number ref="inputNumber" class="s-input-number" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        </el-input-number>
    )
  },
  methods: {
    focus () {
      this.$refs.inputNumber.focus()
    },
    select () {
      this.$refs.inputNumber.select()
    },
  },
  components: {
    [InputNumber.name]: InputNumber
  }
}