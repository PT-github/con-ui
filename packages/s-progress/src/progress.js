/*
 * @Author: PT
 * @Date: 2020-10-10 10:53:08
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 10:55:12
 * @Description: SProgress
 */

import './progress.scss'
import Progress from 'element-ui/lib/progress'
export default {
  name: 'SProgress',
  render () {
    return (
      <el-progress ref="progress" class="s-progress" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
      </el-progress>
    )
  },
  components: {
    [Progress.name]: Progress
  }
}