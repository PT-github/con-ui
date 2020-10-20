/*
 * @Author: PT
 * @Date: 2020-10-09 17:29:05
 * @LastEditors: PT
 * @LastEditTime: 2020-10-20 15:43:01
 * @Description: SForm
 */

import './form.scss'
import Form from 'element-ui/lib/form'
export default {
  name: 'SForm',
  render () {
    return (
      <el-form ref="form" class="s-form"
        vOn:submit_native_prevent={this.handleSubmit}
        {
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
      </el-form>
    )
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },
    validate () {
      this.$refs.form.validate()
    },
    validateField () {
      this.$refs.form.validateField()
    },
    resetFields () {
      this.$refs.form.resetFields()
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    },
  },
  components: {
    [Form.name]: Form
  }
}