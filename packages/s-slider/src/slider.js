/*
 * @Author: PT
 * @Date: 2020-10-09 10:32:18
 * @LastEditors: PT
 * @LastEditTime: 2020-10-09 10:47:49
 * @Description: SSlider
 */

import Slider from 'element-ui/lib/slider'
import './slider.scss'
export default {
  name: 'SSlider',
  render () {
    return (
      <el-slider
        class="s-slider"
        {
          ...{
            attrs: {
              ...this.$attrs
            },
            on: {
              ...this.$listeners
            }
          }
        }
      >
      </el-slider>
    )
  },
  components: {
    [Slider.name]: Slider
  }
}