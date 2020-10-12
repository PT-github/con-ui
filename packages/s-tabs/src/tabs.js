import './styles/tabs.scss'
import Tabs from './mixin'
export default {
  name: 'STabs',
  render () {
    return (
      <el-tabs ref="tabs" class="s-tabs" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-tabs>
    )
  },
  components: {
    [Tabs.name]: Tabs
  }
}