export default {
  name: 'SMenuConGroup',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  render () {
    let { item } = this
    return <div class="menu-con-group">
      <s-menu-con-item attrs={{...(item || {})}}></s-menu-con-item>
      {
        item.children && item.children.length > 0 && item.children.map(child => )
      }
    </div>
  }
}