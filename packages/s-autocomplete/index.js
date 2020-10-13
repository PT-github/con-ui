import Autocomplete from './src/autocomplete'
Autocomplete.install = function (Vue) {
  Vue.component(Autocomplete.name, Autocomplete)
}
export default Autocomplete