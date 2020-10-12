
import Carousel from 'element-ui/lib/carousel'
export default {
  name: 'ElCarousel',
  mixins: [ Carousel ],
  methods: {
    updateItems () {
      this.items = this.$children.filter(child => child.$options.name === 'SCarouselItem')
    }
  }
}