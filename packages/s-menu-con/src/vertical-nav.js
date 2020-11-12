

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
    defaultActive: {
      type: String,
      default: ''
    },
    cls: String
  },
  inject: {
    menuCon: {
      default: ''
    },
    rootMenu: {
      default: ''
    }
  },
  data () {
    return {
      hoverActive: null
    }
  },
  render () {
    let { options } = this
    return <div class={['vertical-nav', this.cls]}>
      {
        options.map(item => (
          <MenuitemCon
            inpop={true}
            class={{
              'is-active': this.defaultActive === item.index,
              'hover-active': this.hoverActive === item.index
              }
            }
            {
              ...{
                attrs: { ...item },
              }
            }
            vOn:mouseenter_native={() => this.handleMenuItemMouseenter(item.children, item)}
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
    handleMenuItemMouseenter (popupData, item) {
      this.rootMenu.mode === 'vertical' && (this.hoverActive = item.index)
      this.$emit('show-popup', popupData)
    },
    handleMenuItemMouseleave () {
      this.$emit('hide-popup')
    },
  },
  watch: {
    options: {
      handler: function (v) {
        if (this.menuCon && this.menuCon.mode === 'horizontal') {
          if (v && v.length > 0) {
            let defaultActiveItems = []
            defaultActiveItems = v.filter(item => item.children && item.children.length > 0)

            let activeItems = defaultActiveItems.filter(item => item.index === this.defaultActive)

            let activeItem = activeItems.length > 0 ? activeItems[0] : defaultActiveItems[0]
            this.$emit('show-popup', activeItem.children)
            this.hoverActive = activeItem.index

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