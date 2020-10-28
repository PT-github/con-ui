/*
 * @Author: PT
 * @Date: 2020-10-14 14:55:23
 * @LastEditors: PT
 * @LastEditTime: 2020-10-28 08:48:22
 * @Description: SSelectCon
 */
// import SSelect from '../../s-select'
// import SOption from '../../s-option'
// import SOptionGroup from '../../s-option-group'
// import '../../s-select/src/select.scss'
// import '../../s-select/src/option.scss'
// import '../../s-select/src/option-group.scss'

export default {
  name: 'SSelectCon',
  props: {
    optionGroup: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <s-select ref="select" class="s-select-con" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        {
          this.renderDefaultSlot()
        }
        {
          this.$slots.prefix && (
            <template slot="prefix">
              { this.$slots.prefix }
            </template>
          )
        }
        {
          this.$slots.empty && (
            <template slot="empty">
              { this.$slots.empty }
            </template>
          )
        }
      </s-select>
    )
  },
  methods: {
    focus () {
      this.$refs.select.focus()
    },
    blur () {
      this.$refs.select.blur()
    },
    renderDefaultSlot () {
      if (this.$slots.default) {
        return this.$slots.default
      }
      // 循环渲染下拉列表
      if (this.$attrs.options) {
        return this.renderOptions()
      }
    },
    renderOptions () {
      if (this.optionGroup) {
        return (
          this.$attrs.options && this.$attrs.options.length > 0 && this.$attrs.options.map(group => {
            return <s-option-group key={group.label} label={group.label}>
              {
                group.options && group.options.length > 0 && group.options.map(item => {
                  return <s-option key={item.value} label={item.label} value={item.value}>
                    { this.$scopedSlots.options && this.$scopedSlots.options(item) }
                  </s-option>
                })
              }
            </s-option-group>
          })
        )
      }
      return (
        this.$attrs.options && this.$attrs.options.length > 0 && this.$attrs.options.map(item => {
          return <s-option key={item.value} label={item.label} value={item.value} disabled={item.disabled}>
            { this.$scopedSlots.options && this.$scopedSlots.options(item) }
          </s-option>
        })
      )
    }
  },
  components: {
    // SSelect,
    // SOption,
    // SOptionGroup
  }
}