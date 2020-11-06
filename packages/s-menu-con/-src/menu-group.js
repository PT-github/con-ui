import Navitem from './navitem'
export default {
  name: 'MenuGroup',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      activeMenus: []
    }
  },
  render () {
    let { item } = this
    return <div class="menu-group">
      <Navitem attrs={{...(item || {})}}></Navitem>
      {
        this.renderChildren(item.children)
      }
    </div>
  },
  methods: {
    renderChildren (list) {
      if (list && list.length > 0) {
        return <div class="menu-group-item">
          {
            list.map(item => <Navitem attrs={{...(item || {})}}></Navitem>)
          }
        </div>
      }
    }
  },
  components: {
    Navitem
  }
}