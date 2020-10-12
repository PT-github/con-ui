/*
 * @Author: PT
 * @Date: 2020-10-09 15:25:37
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 15:32:54
 * @Description: SUpload
 */

import './upload.scss'
import Upload from 'element-ui/lib/upload'
export default {
  name: 'SUpload',
  render () {
    return (
      <el-upload ref="upload" class="s-upload" {
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
        { this.$slots.default }
        {
          this.$slots.trigger && (
            <template slot="trigger">
              { this.$slots.trigger }
            </template>
          )
        }
        {
          this.$slots.tip && (
            <template slot="tip">
              { this.$slots.tip }
            </template>
          )
        }
        
      </el-upload>
    )
  },
  methods: {
    clearFiles () {
      this.$refs.upload.clearFiles()
    },
    abort () {
      this.$refs.upload.abort()
    },
    submit () {
      this.$refs.upload.submit()
    },
  },
  components: {
    [Upload.name]: Upload
  }
}