/*
 * @Author: PT
 * @Date: 2020-10-09 16:52:56
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 17:25:46
 * @Description: STransfer
 */
import Transfer from 'element-ui/lib/transfer'
import './transfer.scss'
export default {
  name: 'STransfer',
  render () {
    return (
      <el-transfer ref="transfer" class="s-transfer" {
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
        {
          this.$slots['left-footer'] && (
            <template slot="left-footer">
              { this.$slots['left-footer'] }
            </template>
          )
        }
        {
          this.$slots['right-footer'] && (
            <template slot="right-footer">
              { this.$slots['right-footer'] }
            </template>
          )
        }
      </el-transfer>
    )
  },
  methods: {
    clearQuery () {
      this.$refs.transfer.clearQuery()
    }
  },
  components: {
    [Transfer.name]: Transfer
  }
}