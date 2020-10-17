// import
// initialInputHeight

import Select from 'element-ui/lib/select'

export default {
  name: 'SelectMain',
  mixins: [Select],
  watch: {
    selectSize (v) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      }
      this.initialInputHeight = sizeMap[v]
      this.resetInputHeight()
    }
  }
}