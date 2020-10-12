/*
 * @Author: PT
 * @Date: 2020-10-12 10:37:49
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 10:42:11
 * @Description: SSteps
 */
import './styles/steps.scss'
import Steps from 'element-ui/lib/steps'
export default {
  name: 'SSteps',
  render () {
    return (
      <el-steps ref="steps" class="s-steps" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-steps>
    )
  },
  components: {
    [Steps.name]: Steps
  }
}