import InfiniteScroll from 'element-ui/lib/infinite-scroll'
import Vue from 'vue'

Vue.directive(InfiniteScroll.name, InfiniteScroll)

InfiniteScroll.install = function (Vue) {
  Vue.directive(InfiniteScroll.name, InfiniteScroll)
}

export default InfiniteScroll