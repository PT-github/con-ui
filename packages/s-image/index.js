import Image from './src/image'

Image.install = function (Vue) {
  Vue.component(Image.name, Image)
}

export default Image 