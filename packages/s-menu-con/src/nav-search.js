import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'NavSearch',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  mixins: [ emitter ],
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
      {
        this.options &&
        this.options.length > 0 &&
        <s-input size="small" vModel={this.input} placeholder="请输入内容"></s-input>
      }
      <div class="search-content">
        {
          this.filterOptions.map(item => {
            return <div class="nav-group">
              <Navitem attrs={{...(item || {})}} on={{ click: this.handleClick }}></Navitem>
              <div class="nav-group_sub">
                {
                  item.children &&
                  item.children.length > 0 &&
                  item.children.map(nav => <Navitem attrs={{...(nav || {})}} on={{ click: this.handleClick }}></Navitem>)
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  },
  methods: {
    handleClick (item) {
      if (item.disabled || (item.children && item.children.length > 0)) {
        return
      }
      this.dispatch('ElMenu', 'item-click', item)
      this.$emit('click', item)
    }
  },
  components: {
    Navitem: {
      functional: true,
      inject: ['rootMenu'],
      props: {
        icon: String,
        suffixIcon: String,
        name: String,
        index: {
          default: null,
          validator: val => typeof val === 'string' || val === null
        },
        route: [String, Object],
        disabled: Boolean,
        children: {
          type: Array,
          default: () => []
        }
      },
      render (h, context) {
        return <div class="nav-item" class={{
          'nav-item': true,
          'is-active': context.props.index === context.injections.rootMenu.activeIndex
          }
        }
        on={
          {
            click: () => {
              context.listeners &&
              typeof context.listeners.click === 'function' &&
              context.listeners.click(context.props)
            }
          }
        }
        >
          { context.props.icon && <i class={ ['menu-icon', context.props.icon] }></i> }
          { context.props.name }
          { context.props.suffixIcon && <i class={ ['menu-icon', context.props.suffixIcon] }></i> }
        </div>
      }
    }
  }
}