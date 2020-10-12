/*
 * @Author: PT
 * @Date: 2020-09-29 23:06:23
 * @LastEditors: PT
 * @LastEditTime: 2020-09-29 23:20:19
 * @Description: SCheckbox
 */
import CheckboxGroup from 'element-ui/lib/checkbox-group'
import './checkbox-group.scss'
export default {
  name: 'SCheckboxGroup',
  render () {
    return (
      <el-checkbox-group class="s-checkbox-group" {
        ...{
          attrs: {...this.$attrs},
          on: {...this.$listeners}
        }
      }>
        { this.$slots.default }
      </el-checkbox-group>
    )
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup
  }
}