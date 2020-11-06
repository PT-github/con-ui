/*
 * @Author: PT
 * @Date: 2020-11-05 10:08:26
 * @LastEditors: PT
 * @LastEditTime: 2020-11-06 17:23:21
 * @Description: SubmenuCon
 */
import SSubmenu from '../../s-submenu'
import VerticalNav from './vertical-nav'
import NavRightPanel from './nav-right-panel'
import NavSearch from './nav-search'

import SCollapseTransition from './s-collapse-transition'
import { findDeep } from '../../../src/utils'

import { addClass } from 'element-ui/src/utils/dom'


export default {
  name: 'SubmenuCon',
  inject: ['rootMenu'],
  props: {
    // TODO
    hideTimeout: {
      type: Number,
      default: 300000000
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
    NavSearch
  },
  data () {
    return {
      deep: 2,
      timeoutMenuItem: null,
      currentShowNavs: [],
      searchShowNavs: [],
      // itemHover: false, // 子菜单focus
      // popupMenuitemData: [], // 三级菜单数据
      // menuItemPopperJS: null // menuitem子菜单弹出层
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
              return <s-menu-item
                ref={'s-menuitem_' + idx}
                {
                  ...{
                    attrs: { ...item }
                  }
                }
                vOn:mouseenter_native={($event) => this.handleMenuItemMouseenter($event, 100, item.children)}
                vOn:mouseleave_native={() => this.handleMenuItemMouseleave(true)}
                vOn:focus_native={($event) => this.handleMenuItemMouseenter($event, 100)}
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </s-menu-item>
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
          class={[`el-menu--${this.mode}`, this.popperClass, 's-menu-popup']}
          on-mouseenter={($event) => this.handleMouseenter($event, 100)}
          on-mouseleave={() => this.handleMouseleave(true)}
          on-focus={($event) => this.handleMouseenter($event, 100)}>
          <ul
            role="menu"
            class={['el-menu el-menu--popup', `el-menu--popup-${this.currentPlacement}`]}
            style={{ backgroundColor: this.rootMenu.backgroundColor || '' }}>
            {
              this.getHorizontalPopup(this.option)
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
        on-mouseenter={this.handleMouseenter}
        on-mouseleave={() => this.handleMouseleave(false)}
        on-focus={this.handleMouseenter}
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
          {this.option.name}
          <i class={[ 'el-submenu__icon-arrow', submenuTitleIcon ]}></i>
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </li>
    )
  },
  methods: {
    /**
     * @description: 根据菜单数据 设置popup
     * @param {object} option 菜单数据
     * @return {jsx}
     */    
    getHorizontalPopup (option = {}) {
      this.deep = findDeep(option)
      let popupMenuContent = []
      switch (this.deep) {
        case 5:
          popupMenuContent.push(<VerticalNav
            options={option.children}
            cls='blue'
            on={
              { 'nav-change': (navs) => this.currentShowNavs = navs }
            }
          ></VerticalNav>)
          popupMenuContent.push(<VerticalNav
            options={this.currentShowNavs}
            on={
              { 'nav-change': (navs) => this.searchShowNavs = navs }
            }
          ></VerticalNav>)
          popupMenuContent.push(<NavSearch options={this.searchShowNavs}></NavSearch>)
          break
        case 4:
          popupMenuContent.push(<VerticalNav
            options={option.children}
            on={
              { 'nav-change': (navs) => this.currentShowNavs = navs }
            }
          ></VerticalNav>)
          popupMenuContent.push(<NavSearch options={this.currentShowNavs}></NavSearch>)
          // popupMenuContent.push(<NavRightPanel options={this.currentShowNavs}></NavRightPanel>)
          break
        case 3:
          popupMenuContent = option.children.map(item => {
            return <div class="nav-group">
              <s-menu-item
                {
                  ...{
                    attrs: { ...item }
                  }
                }
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </s-menu-item>
              <div class='nav-group-sub'>
                {
                  item.children &&
                  item.children.length &&
                  item.children.map(submenu => <s-menu-item
                    {
                      ...{
                        attrs: { ...submenu }
                      }
                    }
                  >
                    { submenu.icon && <i class={ submenu.icon }></i>}
                    <span slot="title">{ submenu.name }</span>
                  </s-menu-item>)
                }
              </div>
            </div>
          })
          break
        default:
          popupMenuContent = option.children.map(submenu => <s-menu-item
            {
              ...{
                attrs: { ...submenu }
              }
            }
          >
            { submenu.icon && <i class={ submenu.icon }></i>}
            <span slot="title">{ submenu.name }</span>
          </s-menu-item>)
      }
      return popupMenuContent
    },
    initPopper () {
      let referenceElm, popperElm
      switch (this.deep) {
        case 5:
        case 4:
        case 3:
          referenceElm = this.rootMenu.$el
          popperElm = this.$refs.menu
          popperElm && (popperElm.style.width = this.rootMenu.$el.offsetWidth + 'px')
          addClass(popperElm, `s-menu-popup--${this.deep}`)
          break
        default: // 2
          referenceElm = this.$el
          popperElm = this.$refs.menu
      }
      this.referenceElm = referenceElm
      this.popperElm = popperElm
      this.updatePlacement()
    },
    /*
    createPopper () {
      if (this.$isServer) return
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return
      }

      const options = {}
      const popper = this.popperElm
      let reference = this.referenceElm

      if (!popper || !reference) return

      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy()
      }

      options.placement = this.currentPlacement
      this.popperJS = new PopperJS(reference, popper, options)
      this.popperJS.onCreate(() => {
        this.$emit('created', this)
        this.resetTransformOrigin()
        this.$nextTick(this.updatePopper)
      })
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex()
      this.popperElm.addEventListener('click', stop)
    },
    */
    updatePlacement () {
      this.currentPlacement = this.mode === 'horizontal' ? (this.deep > 2 ? 'bottom' : 'bottom-start') : 'right-start'
    },
    handleMenuItemMouseenter (event, showTimeout = this.showTimeout, children) {
      clearTimeout(this.timeoutMenuItem)
      this.timeoutMenuItem = setTimeout(() => {
        this.$emit('show-popup', children)
        // this.popupMenuitemData = children
        // this.$nextTick(() => {
        //   this.itemHover = true
        // })
      }, showTimeout)
    },
    handleMenuItemMouseleave () {
      clearTimeout(this.timeoutMenuItem)
      this.timeoutMenuItem = setTimeout(() => {
        this.$emit('hide-popup')
        // this.popupMenuitemData.splice(0, this.popupMenuitemData.length)
        // this.$nextTick(() => {
        //   this.itemHover = false
        // })
      }, 10000000000000) // this.hideTimeout
    },
    
    
    
  },
  
}