/*
 * @Author: PT
 * @Date: 2020-10-12 11:33:08
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 11:34:52
 * @Description: SPopconfirm
 */
import './popconfirm.scss'
import Popconfirm from 'element-ui/lib/popconfirm'
export default {
  name: 'SPopconfirm',
  render () {
    return (
      <el-popconfirm ref="popconfirm" class="s-popconfirm" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
        {
          this.$slots.reference && (
            <template slot="reference">
              { this.$slots.reference }
            </template>
          )
        }
      </el-popconfirm>
    )
  },
  
  components: {
    [Popconfirm.name]: Popconfirm
  }
}