/*
 * @Author: PT
 * @Date: 2020-10-09 09:45:10
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:02:07
 * @Description: SCascader组件
 */

import './cascader.scss'
import Cascader from 'element-ui/lib/cascader'
export default {
  name: 'SCascader',
  render () {
    return (
      <el-cascader ref="cascader" class="s-cascader" {
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
        {
          this.$slots.suffix && (
            <template slot="suffix">
              { this.$slots.suffix }
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
        
      </el-cascader>
    )
  },
  methods: {
    getCheckedNodes () {
      return this.$refs.cascader.getCheckedNodes()
    }
  },
  components: {
    [Cascader.name]: Cascader
  }
}