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
    }
  },
  computed: {
    optionType () {
      return this.options && this.options.length && this.options[0].is || ''
    },
    hasBorder () {
      return !!(this.options && this.options.length && this.options[0].border)
    }
  },
  render () {
    return (
      <s-checkbox-group class="s-checkbox-con"
        {
          ...{
            attrs: {
              ...this.$attrs
            },
            on: {
              ...this.$listeners
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