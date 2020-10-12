import Col from '../s-row/src/col'

Col.install = function (Vue) {
  Vue.component(Col.name, Col)
}

export default Col