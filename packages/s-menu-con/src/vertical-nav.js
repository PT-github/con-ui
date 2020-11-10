

import MenuitemCon from './menuitem-con'
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
  inject: {
    menuCon: {
      default: ''
    }
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
        options.map((item, index) => (
          <MenuitemCon
            class={{active: this.activeIndex === index}}
            {
              ...{
                attrs: { ...item },
              }
            }
            vOn:mouseenter_native={() => this.handleMenuItemMouseenter(item.children)}
            vOn:mouseleave_native={() => this.handleMenuItemMouseleave(true)}
            vOn:hover_native={() => this.handleMenuItemMouseenter()}
          >
            { item.icon && <i class={ item.icon }></i>}
            { item.name }
            { item.children && <i class='el-icon-arrow-right el-submenu__icon-arrow'></i>}
          </MenuitemCon>)
        )
      }
    </div>
  },
  methods: {
    handleMenuItemMouseenter (popupData) {
      // clearTimeout(this.timeoutMenuItem)
      // this.timeoutMenuItem = setTimeout(() => {
        this.$emit('nav-change', popupData)
      // }, showTimeout)
    },
    handleMenuItemMouseleave () {
      this.$emit('hide-popup')
      // clearTimeout(this.timeoutMenuItem)
      // this.timeoutMenuItem = setTimeout(() => {
      // }, this.hideTimeout) // this.hideTimeout
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
  watch: {
    options: {
      handler: function (v) {
        if (this.menuCon && this.menuCon.mode === 'horizontal') {
          this.activeIndex = null
          if (v && v.length > 0) {
            let defaultActiveItems = v.filter(item => item.children && item.children.length > 0)
            if (defaultActiveItems && defaultActiveItems.length > 0) {
              this.$emit('nav-change', defaultActiveItems[0].children)
              this.activeIndex = v.indexOf(defaultActiveItems[0])
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    MenuitemCon
  }
}