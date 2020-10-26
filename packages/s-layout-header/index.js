import { LayoutHeader } from '../s-layout/src/layout'

LayoutHeader.install = function (Vue) {
  Vue.component(LayoutHeader.name, LayoutHeader)
}

export default LayoutHeader