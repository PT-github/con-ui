/*
 * @Author: PT
 * @Date: 2020-10-10 14:41:02
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 14:43:24
 * @Description: SAlert
 */
import './alert.scss'
import Alert from 'element-ui/lib/alert'
export default {
  name: 'SAlert',
  render () {
    return (
      <el-alert ref="alert" class="s-alert" {
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
          this.$slots.title && (
            <template slot="title">
              { this.$slots.title }
            </template>
          )
        }
      </el-alert>
    )
  },
  components: {
    [Alert.name]: Alert
  }
}