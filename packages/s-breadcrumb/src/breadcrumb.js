/*
 * @Author: PT
 * @Date: 2020-10-12 10:09:46
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 10:10:30
 * @Description: SBreadcrumb
 */

import './breadcrumb.scss'
import Breadcrumb from 'element-ui/lib/breadcrumb'
export default {
  name: 'SBreadcrumb',
  render () {
    return (
      <el-breadcrumb ref="breadcrumb" class="s-breadcrumb" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-breadcrumb>
    )
  },
  components: {
    [Breadcrumb.name]: Breadcrumb
  }
}