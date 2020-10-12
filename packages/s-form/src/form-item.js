/*
 * @Author: PT
 * @Date: 2020-10-09 17:32:36
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 17:40:45
 * @Description: SFormItem
 */
import './form-item.scss'
import FormItem from 'element-ui/lib/form-item'
export default {
  name: 'SFormItem',
  render () {
    return (
      <el-form-item ref="form-item" class="s-form-item" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          },
          scopedSlots: {
            ...this.scopedSlots
          }
        }}>
        { this.$slots.default }
        {
          this.$slots.label && (
            <template slot="label">
              { this.$slots.label }
            </template>
          )
        }
      </el-form-item>
    )
  },
  methods: {
    resetField () {
      this.$refs.formItem.resetField()
    },
    clearValidate () {
      this.$refs.formItem.clearValidate()
    }
  },
  components: {
    [FormItem.name]: FormItem
  }
}