export default {
  name: 'LeafNavs',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      input: ''
    }
  },
  computed: {
    filterOptions () {
      let arry = this.options.slice()
      if (this.input) {
        arry = this.options.filter(item => {
          if (item.name && item.name.indexOf(this.input) !== -1) {
            return true
          }
          if (item.children && item.children.length > 0) {
            let childs = item.children.filter(child => child.name && child.name.indexOf(this.input) !== -1)
            return childs.length > 0
          }
          return false
        })
      }
      return arry
    }
  },
  render () {
    return <div class="nav-search">
      <s-input size="small" vModel={this.input} placeholder="请输入内容"></s-input>
      <div class="search-content">
        {
          this.filterOptions.map(item => {
            return <div class="nav-group">
              <Navitem attrs={{...(item || {})}}></Navitem>
              <div class="nav-group_sub">
                {
                  item.children &&
                  item.children.length > 0 &&
                  item.children.map(nav => <Navitem attrs={{...(nav || {})}}></Navitem>)
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  },
  components: {
    Navitem: {
      functional: true,
      props: {
        icon: String,
        suffixIcon: String,
        name: String
      },
      render (h, context) {
        return <div class="nav-item">
          { context.props.icon && <i class={ ['menu-icon', context.props.icon] }></i> }
          { context.props.name }
          { context.props.suffixIcon && <i class={ ['menu-icon', context.props.suffixIcon] }></i> }
        </div>
      }
    }
  }
}