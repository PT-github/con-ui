import STableColumn from '../../s-table/src/table-column'
export default {
  name: 'STableColumnCon',
  render () {
    console.log(this.$attrs.prop, this.$scopedSlots)
    let scopedSlots = {}
    if (this.$attrs.slotbool) {
      scopedSlots.default = this.$scopedSlots[this.$attrs.prop]
    }
    return (
      <s-table-column
        {...{
          attrs: {
            ...this.$attrs
          },
          scopedSlots: {
            default: this.$scopedSlots[this.$attrs.type === 'expand' ? 'expand' : this.$attrs.prop],
            header: this.$scopedSlots[this.$attrs.prop + 'header']
          }
        }}
      >
        {
          this.$attrs.children &&
          this.$attrs.children.length > 0 &&
          this.$attrs.children.map(child => <s-table-column-con {
            ...{
              attrs: { ...child },
              scopedSlots: { ...this.$scopedSlots }
            }
          }></s-table-column-con>)
        }
      </s-table-column>
    )
  },
  methods: {
    handleSlots () {
      let scopedSlots = {}
      this.$scopedSlots[this.$attrs.prop] && (scopedSlots.default = this.$scopedSlots[this.$attrs.prop])
      this.$attrs.slot
    },
  },
  components: {
    STableColumn
  }
}