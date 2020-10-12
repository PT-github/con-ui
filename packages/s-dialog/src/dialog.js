/*
 * @Author: PT
 * @Date: 2020-10-12 10:56:23
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 11:20:23
 * @Description: SDialog
 */
import './dialog.scss'
import Dialog from 'element-ui/lib/dialog'
export default {
  name: 'SDialog',
  render () {
    return (
      <el-dialog ref="dialog" class="s-dialog" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners,
            'update:visible': this.handleSync
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
        {
          this.$slots.footer && (
            <template slot="footer">
              { this.$slots.footer }
            </template>
          )
        }
      </el-dialog>
    )
  },

  methods: {
    handleSync (v) {
      this.$emit('update:visible', v)
    }
  },
  
  components: {
    [Dialog.name]: Dialog
  }
}