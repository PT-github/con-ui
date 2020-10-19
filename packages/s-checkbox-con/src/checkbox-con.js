import SCheckboxGroup from '../../s-checkbox-group'
import SCheckbox from '../../s-checkbox'
import SCheckboxButton from '../../s-checkbox-button'
import './checkbox-con.scss'
export default {
  name: 'SCheckboxCon',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    delimiter: {
      type: String,
      default: ','
    },
    value: {
      validator: function (value) {
        let valueType = typeof value
        return valueType === 'string' || valueType === 'object'
      },
    }
  },
  data () {
    return {
      modelValue: []
    }
  },
  computed: {
    optionType () {
      return this.options && this.options.length && this.options[0].is || ''
    },
    hasBorder () {
      return !!(this.options && this.options.length && this.options[0].border)
    },
    valueType () {
      return typeof this.value
    }
  },
  created () {
    this.modelValue = this.valueType === 'string' ?
      (this.value ? this.value.split(this.delimiter) : []) : []
  },
  render () {
    return (
      <s-checkbox-group class="s-checkbox-con"
        vModel={ this.modelValue }
        {
          ...{
            attrs: {
              ...this.$attrs,
            },
            on: {
              change: this.updateValue
            }
          }
        }
      >
        {
          this.options &&
          this.options.length &&
          this.options.map(option => this.renderOption(typeof option === 'string' ? {label: option} : option))
        }
      </s-checkbox-group>
    )
  },
  methods: {
    updateValue (v) {
      let modelValue = v,
        _value = this.valueType === 'string' ? 
          modelValue.join(this.delimiter) : modelValue
      this.$emit('update:value', _value)
      this.$emit('change', _value)
    },
    renderOption (option = {}) {
      switch (this.optionType) {
        case 'checkbox-button':
          return <s-checkbox-button {
            ...{
              attrs: { ...option }
            }
          }>{ option && (option.content || option.label) || '' }</s-checkbox-button>


        default:
          return <s-checkbox {
            ...{
              attrs: {
                border: this.hasBorder,
                ...option
              }
            }
          }>{ option && (option.content || option.label ) || '' }</s-checkbox>
      }
    }
  },
  components: {
    SCheckboxGroup,
    SCheckboxButton,
    SCheckbox
  }
}