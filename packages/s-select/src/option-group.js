import './option-group.scss'
import OptionGroup from 'element-ui/lib/option-group'
export default {
  name: 'SOptionGroup',
  render () {
    return (
      <el-option-group class="s-option-group" {
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
      </el-option-group>
    )
  },
  components: {
    [OptionGroup.name]: OptionGroup
  }
}