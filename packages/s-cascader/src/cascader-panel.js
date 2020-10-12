/*
 * @Author: PT
 * @Date: 2020-10-09 09:52:59
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:03:18
 * @Description: SCascaderPanel组件
 */

import './cascader-panel.scss'
import CascaderPanel from 'element-ui/lib/cascader-panel'
export default {
  name: 'SCascaderPanel',
  render () {
    return (
      <el-cascader-panel ref="cascader-panel" class="s-cascader-panel" {
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
      </el-cascader-panel>
    )
  },
  methods: {
    getCheckedNodes () {
      return this.$refs['cascader-panel'].getCheckedNodes()
    },
    clearCheckedNodes () {
      this.$refs['cascader-panel'].clearCheckedNodes()
    }
  },
  components: {
    [CascaderPanel.name]: CascaderPanel
  }
}