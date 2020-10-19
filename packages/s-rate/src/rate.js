/*
 * @Author: PT
 * @Date: 2020-10-09 15:42:03
 * @LastEditors: PT
 * @LastEditTime: 2020-10-19 17:34:36
 * @Description: SRate
 */
import './rate.scss'
import Rate from 'element-ui/lib/rate'
export default {
  name: 'SRate',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  computed: {
    paddingTop () {
      if (!this.elFormItem) {
        return
      }
      let _elFormItemSize = this.elFormItem.elFormItemSize
      let obj = {
        'medium': '8',
        'small': '6',
        'mini': '4'
      }
      return (obj[_elFormItemSize] || '10') + 'px'
    }
  },
  render () {
    return (
      <el-rate ref="rate" class="s-rate" style={{
        paddingTop: this.paddingTop
      }} {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
      </el-rate>
    )
  },
  components: {
    [Rate.name]: Rate
  }
}