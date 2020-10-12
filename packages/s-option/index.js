import Option from '../s-select/src/option'

Option.install = function (Vue) {
  Vue.component(Option.name, Option)
}

export default Option