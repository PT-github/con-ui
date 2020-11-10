import MenuitemCon from './menuitem-con'
export default {
  name: 'SubmenuNavpop',
  inject: {
    rootMenu: {
      default: ''
    }
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
  },
  render () {
    return <div class="submenu-navpop">
      <div
        class="el-submenu__title"
        ref="submenu-title"
      >
        { this.option.icon && <i class={this.option.icon}></i> }
        <span>{this.option.name}</span>
        <i class={[ 'el-submenu__icon-arrow el-icon-arrow-down' ]}></i>
      </div>
      <ul
        role="menu"
        class="el-menu el-menu--inline">
        {
          this.option.children &&
          this.option.children.length > 0 &&
          this.option.children.map((item, idx) => {
            return <MenuitemCon
              ref={'s-menuitem_' + idx}
              {
                ...{
                  attrs: { ...item }
                }
              }
              on-click={this.handleClick}
              on-mouseenter={this.handleTitleMouseenter}
              on-mouseleave={this.handleTitleMouseleave}
            >
              { item.icon && <i class={ item.icon }></i>}
              <span slot="title">{ item.name }</span>
            </MenuitemCon>
          })
        }
      </ul>
    </div>
  },
  methods: {
    handleClick () {
      //
    },
    handleTitleMouseenter () {
      //
    },
    handleTitleMouseleave () {
      //
    },
  },
  components: {
    MenuitemCon
  }
}