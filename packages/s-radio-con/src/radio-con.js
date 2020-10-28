/*
 * @Author: PT
 * @Date: 2020-10-19 08:33:25
 * @LastEditors: PT
 * @LastEditTime: 2020-10-28 08:46:48
 * @Description: SRadioCon
 */
// import SRadioGroup from '../../s-radio-group'
// import SRadio from '../../s-radio'
// import SRadioButton from '../../s-radio-button'
import './radio-con.scss'
export default {
  name: 'SRadioCon',
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
      return !!(this.options && this.options.length && this.options[0].is !== 'radio-button' && this.options[0].border)
    }
  },
  render () {
    return (
      <s-radio-group class={{
        's-radio-con': true,
        's-radio-con_button': this.optionType === 'radio-button',
      }}
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
          this.options.map(option => this.renderOption(typeof option === 'string' ? { label: option } : option))
        }
      </s-radio-group>
    )
  },
  methods: {
    renderOption (option = {}) {
      switch (this.optionType) {
        case 'radio-button':
          return <s-radio-button {
            ...{
              attrs: { ...option }
            }
          }>{ option && (option.content || option.label) || '' }</s-radio-button>


        default:
          return <s-radio {
            ...{
              attrs: {
                border: this.hasBorder,
                ...option
              }
            }
          }>{ option && (option.content || option.label ) || '' }</s-radio>
      }
    }
  },
  components: {
    // SRadioGroup,
    // SRadioButton,
    // SRadio
  }
}