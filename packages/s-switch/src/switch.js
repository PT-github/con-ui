/*
 * @Author: PT
 * @Date: 2020-10-09 10:11:56
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:03:57
 * @Description: SSwitch
 */

import Switch from 'element-ui/lib/switch'
import './switch.scss'
export default {
  name: 'SSwitch',
  render () {
    return (
      <el-switch
        ref="switch"
        class="s-switch"
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
      ></el-switch>
    )
  },
  methods: {
    focus () {
      this.$refs.switch.focus()
    }
  },
  components: {
    [Switch.name]: Switch
  }
}