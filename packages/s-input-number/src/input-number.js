/*
 * @Author: PT
 * @Date: 2020-10-09 09:00:31
 * @LastEditors: PT
 * @LastEditTime: 2020-10-19 16:24:18
 * @Description: SInputNumber
 */

import './input-number.scss'
import InputNumber from 'element-ui/lib/input-number'
export default {
  name: 'SInputNumber',
  props: [ 'value' ],
  render () {
    return (
      <el-input-number ref="inputNumber" class="s-input-number" {
        ...{
          attrs: {
            ...this.$attrs,
            value: this.value
          },
          on: {
            change: this.$listeners.change || (() => {}),
            input: (v) => {
              this.value !== v && (
                0 === v ?
                  '' !== this.value && null !== this.value && this.$emit('input', v) :
                  this.$emit('input', v)
                )
              this.$emit('update:value', v)
            }
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