/*
 * @Author: PT
 * @Date: 2020-12-15 11:18:10
 * @LastEditors: PT
 * @LastEditTime: 2020-12-15 11:20:51
 * @Description: file content
 */
import Input from 'element-ui/lib/input'
export default {
  name: 'ElInput',
  mixins: [ Input ],
  computed: {
    showClear () {
      return this.clearable &&
        !this.inputDisabled &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
    },
  }
}