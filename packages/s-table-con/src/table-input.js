import SInput from '../../s-input'
import SSelect from '../../s-select'
export default {
  name: 'STableInput',
  componentName: 'STableEditComponent',
  props: {
    edittype: {
      type: String,
      required: true
    },
    rowIndex: {
      type: Number
    },
    // 当前行
    row: {
      type: Object
    },
    // 值
    value: {}
  },
  data () {
    return {
      isEditting: false, // 是否正在编辑
    }
  },
  render () {
    if (this.isEditting) {
      switch (this.edittype) {
        case 'input':
          return <s-input {
            ...{
              attrs: { ...this.$attrs }
            }
          }></s-input>
      
        case 'select': 
          return <s-select {
            ...{
              attrs: { ...this.$attrs }
            }
          }></s-select>
      }
    } else {
      // console.log(this, this.row, this.rowIndex, '000', this.$attrs)
      return <span>{this.value}</span>
    }
  },
  component: {
    SInput,
    SSelect
  }
}