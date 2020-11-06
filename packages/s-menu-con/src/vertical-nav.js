

// import Navitem from './navitem'
export default {
  name: 'VerticalNav',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    cls: String
  },
  data () {
    return {
      activeIndex: null
    }
  },
  render () {
    let { options } = this
    return <div class={['vertical-nav', this.cls]}>
      {
        options.map(item => (
          <s-menu-item
            {
              ...{
                attrs: { ...item },
              }
            }
            vOn:mouseenter_native={($event) => this.handleMenuItemMouseenter($event, 100, item.children)}
            vOn:mouseleave_native={() => this.handleMenuItemMouseleave(true)}
            vOn:hover_native={($event) => this.handleMenuItemMouseenter($event, 100)}
          >
            { item.icon && <i class={ item.icon }></i>}
            { item.name }
            { item.children && <i class='el-icon-arrow-right el-submenu__icon-arrow'></i>}
            {/* { item.children && popupMenuitem } */}
          </s-menu-item>)
        )
      }
    </div>
  },
  methods: {
    handleMenuItemMouseenter (event, showTimeout = this.showTimeout, popupData) {
      clearTimeout(this.timeoutMenuItem)
      this.timeoutMenuItem = setTimeout(() => {
        this.$emit('nav-change', popupData)
      }, showTimeout)
    },
    handleMenuItemMouseleave () {
      clearTimeout(this.timeoutMenuItem)
      this.timeoutMenuItem = setTimeout(() => {
      }, this.hideTimeout) // this.hideTimeout
    },
    // setActive () {
    //   for (let i = 0, j = this.options.length; i < j; i++) {
    //     if (this.options[i].children && this.options[i].children.length) {
    //       this.handleMouseMover(this.options[i], i)
    //       break
    //     }
    //   }
    // },
    // handleMouseMover (item, index) {
    //   this.activeIndex = index
    //   this.$emit('nav-change', item)
    // }
  },
  // watch: {
  //   options: {
  //     handler: function () {
  //       this.activeIndex = null
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  components: {
    // Navitem
  }
}