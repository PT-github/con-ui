import Navitem from './navitem'
export default {
  name: 'PopContent',
  props: {
    level: {
      type: Number,
      default: 2
    },
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
    return this.init()
  },
  methods: {
    init () {
      let { item } = this
      switch (this.level) {
        case 3:
          // return <Navitem attrs={{...(item || {})}} slot="reference"></Navitem>
          return <div class="menu-group">
            <Navitem attrs={{...(item || {})}}></Navitem>
            {
              this.renderChildren(item.children)
            }
          </div>
        case 4:
          return <div class="content-box">
            
          </div>
        default:
          return <Navitem attrs={{...(item || {})}}></Navitem>
      }
    },
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