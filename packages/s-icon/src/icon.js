/*
 * @Author: PT
 * @Date: 2020-09-29 08:36:57
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 09:02:53
 * @Description: SIcon组件
 */
import './icon.css'
export default {
  name: 'SIcon',
  render () {
    return (
      this.$attrs.name && (<i class={'el-icon-' + this.$attrs.name}></i>)
    )
  }
}