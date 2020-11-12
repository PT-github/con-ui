/*
 * @Author: PT
 * @Date: 2020-11-05 10:08:26
 * @LastEditors: PT
 * @LastEditTime: 2020-11-12 15:41:27
 * @Description: SubmenuCon
 */
import SSubmenu from '../../s-submenu'
import VerticalNav from './vertical-nav'
import NavRightPanel from './nav-right-panel'
import NavSearch from './nav-search'
import MenuitemCon from './menuitem-con'

import SCollapseTransition from './s-collapse-transition'
import { findDeep } from '../../../src/utils'

// import { addClass } from 'element-ui/src/utils/dom'


export default {
  name: 'SubmenuCon',
  componentName: 'SubmenuCon',
  inject: ['rootMenu', 'menuCon'],
  props: {
    hideTimeout: {
      type: Number,
      default: 300
    },
    // 节点数据
    option: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [ SSubmenu ],
  components: {
    VerticalNav,
    SCollapseTransition,
    NavRightPanel,
    NavSearch,
    MenuitemCon,
  },
  created () {
    this.$on('pop3-mouseenter', () => {
      clearTimeout(this.timeout)
    })
    this.$on('pop3-mouseleave', () => {
      this.handleMouseleave()
    })
  },
  data () {
    return {
      deep: 2,
      currentShowNavs: [],
      searchShowNavs: []
    }
  },
  render () {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootMenu,
      disabled,
      isFirstLevel
    } = this
    this.deep = findDeep(this.option)

    const inlineMenu = (
      <s-collapse-transition>
        <ul
          role="menu"
          class="el-menu el-menu--inline"
          v-show={opened}
          style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
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
                vOn:mouseenter_native={() => this.handleMenuItemMouseenter(item.children)}
                vOn:mouseleave_native={() => this.handleMenuItemMouseleave(true)}
                vOn:focus_native={() => this.handleMenuItemMouseenter(item.children)}
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </MenuitemCon>
            })
          }
        </ul>
      </s-collapse-transition>
    )
    const popupMenu = (
      <transition name={this.menuTransitionName}>
        <div
          ref="menu"
          v-show={this.opened}
          class={
            {
              [`el-menu--${this.mode}`]: true,
              's-menu-popup': true,
              [`s-menu-popup--${this.deep}`]: rootMenu.mode === 'horizontal'
            }
          }
          on-mouseenter={($event) => this.handleMouseenter($event, 100)}
          on-mouseleave={() => this.handleMouseleave(true)}
          on-focus={($event) => this.handleMouseenter($event, 100)}>
          <ul
            role="menu"
            class={['el-menu el-menu--popup', `el-menu--popup-${this.currentPlacement}`]}
            style={{
              backgroundColor: this.rootMenu.backgroundColor || '',
              minWidth: this.menuCon.collapse && this.menuCon.mode === 'vertical' && (this.menuCon.width - (64 + 10)) + 'px' || ''
            }}>
            {
              this.getPopup(this.option)
            }
          </ul>
        </div>
      </transition>
    )

    const submenuTitleIcon = (
      rootMenu.mode === 'horizontal' && isFirstLevel ||
      rootMenu.mode === 'vertical' && !rootMenu.collapse
    ) ? 'el-icon-arrow-down' : 'el-icon-arrow-right'

    return (
      <li
        class={{
          'el-submenu': true,
          'is-active': active,
          'is-opened': opened,
          'is-disabled': disabled
        }}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={opened}
        on-mouseenter={this.handleMouseenter2}
        on-mouseleave={() => this.handleMouseleave(false)}
        on-focus={this.handleMouseenter2}
      >
        <div
          class="el-submenu__title"
          ref="submenu-title"
          on-click={this.handleClick}
          on-mouseenter={this.handleTitleMouseenter}
          on-mouseleave={this.handleTitleMouseleave}
          style={[paddingStyle, titleStyle, { backgroundColor }]}
        >
          { this.option.icon && <i class={this.option.icon}></i> }
          <span>{this.option.name}</span>
          <i class={[ 'el-submenu__icon-arrow', submenuTitleIcon ]}></i>
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </li>
    )
  },
  methods: {
    handleMouseenter2 (e) {
      this.dispatch('SMenuCon', 'submenu-mouseenter')
      this.handleMouseenter(e)
    },
    getPopup (option = {}) {
      if (this.mode === 'vertical') {
        return this.getVerticalPopup(option)
      }
      return this.getHorizontalPopup(option)
    },
    getVerticalPopup (option = {}) {
      return <div class="submenu-navpop">
        <div
          class="el-submenu__title"
          ref="submenu-title"
        >
          { option.icon && <i class={option.icon}></i> }
          {option.name}
          <i class={[ 'el-submenu__icon-arrow el-icon-arrow-down' ]}></i>
        </div>
        <ul
          role="menu"
          class="el-menu el-menu--inline">
          {
            option.children &&
            option.children.length > 0 &&
            option.children.map((item, idx) => {
              return <MenuitemCon
                ref={'s-menuitem_' + idx}
                {
                  ...{
                    attrs: { ...item }
                  }
                }
                // on-click={this.handleClick}
                vOn:mouseenter_native={() => {
                  this.handlePopTitleMouseenter(item)
                }}
                vOn:mouseleave={this.handlePopTitleMouseleave}
              >
                { item.icon && <i class={ item.icon }></i>}
                { item.name }
              </MenuitemCon>
            })
          }
        </ul>
      </div>
    },
    handlePopTitleMouseleave () {
      this.$emit('hide-popup')
    },
    handlePopTitleMouseenter (item = {}) {
      this.$emit('show-popup', item.children)
    },
    /**
     * @description: 根据菜单数据 设置popup
     * @param {object} option 菜单数据
     * @return {jsx}
     */    
    getHorizontalPopup (option = {}) {
      let popupMenuContent = []
      switch (this.deep) {
        case 5:
          popupMenuContent.push(<VerticalNav
            options={option.children}
            cls='blue'
            on={
              { 'show-popup': (navs) => navs && navs.length > 0 && (this.currentShowNavs = navs) }
            }
          ></VerticalNav>)
          popupMenuContent.push(<VerticalNav
            options={this.currentShowNavs}
            on={
              { 'show-popup': (navs) => navs && navs.length > 0 && (this.searchShowNavs = navs) }
            }
          ></VerticalNav>)
          popupMenuContent.push(<NavSearch options={this.searchShowNavs}></NavSearch>)
          break
        case 4:
          popupMenuContent.push(<VerticalNav
            defaultActive={this.rootMenu.activeIndex}
            options={option.children}
            on={
              { 'show-popup': (navs) => navs && navs.length > 0 && (this.currentShowNavs = navs) }
            }
          ></VerticalNav>)
          popupMenuContent.push(<NavSearch options={this.currentShowNavs}></NavSearch>)
          break
        case 3:
          popupMenuContent = option.children.map(item => {
            return <div class="nav-group">
              <MenuitemCon
                {
                  ...{
                    attrs: { ...item }
                  }
                }
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </MenuitemCon>
              <div class='nav-group-sub'>
                {
                  item.children &&
                  item.children.length &&
                  item.children.map(submenu => <MenuitemCon
                    {
                      ...{
                        attrs: { ...submenu }
                      }
                    }
                  >
                    { submenu.icon && <i class={ submenu.icon }></i>}
                    <span slot="title">{ submenu.name }</span>
                  </MenuitemCon>)
                }
              </div>
            </div>
          })
          break
        default:
          popupMenuContent = option.children.map(submenu => <MenuitemCon
            {
              ...{
                attrs: { ...submenu }
              }
            }
          >
            { submenu.icon && <i class={ submenu.icon }></i>}
            <span slot="title">{ submenu.name }</span>
          </MenuitemCon>)
      }
      return popupMenuContent
    },
    initPopper () {
      let referenceElm, popperElm
      if (this.menuCon.mode === 'horizontal') {
        switch (this.deep) {
          case 5:
          case 4:
          case 3:
            referenceElm = this.menuCon.$refs.elMenu.$el
            popperElm = this.$refs.menu
            popperElm && (popperElm.style.width = referenceElm.offsetWidth + 'px')
            break
          default: // 2
            referenceElm = this.$el
            popperElm = this.$refs.menu
        }
      } else {
        referenceElm = this.$el
        popperElm = this.$refs.menu
      }
      this.referenceElm = referenceElm
      this.popperElm = popperElm
      this.updatePlacement()
    },
    updatePlacement () {
      this.currentPlacement = this.mode === 'horizontal' ? (this.deep > 2 ? 'bottom' : 'bottom-start') : 'right-start'
    },
    handleMenuItemMouseenter (children = []) {
      this.$emit('show-popup', children.slice())
    },
    handleMenuItemMouseleave () {
      this.$emit('hide-popup')
    },
  }
}