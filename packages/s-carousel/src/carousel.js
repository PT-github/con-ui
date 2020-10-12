/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-12 14:43:23
 * @Description: SCarousel组件
 */
import './carousel.scss'
import Carousel from './mixin'
export default {
  name: 'SCarousel',
  render () {
    return (
      <el-carousel ref="carousel" class="s-carousel" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-carousel>
    )
  },
  methods: {
    setActiveItem () {
      this.$refs.carousel.setActiveItem()
    },
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    },
  },
  components: {
    [Carousel.name]: Carousel
  }
}