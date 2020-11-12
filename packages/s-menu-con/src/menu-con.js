/*
 * @Author: PT
 * @Date: 2020-11-05 09:57:48
 * @LastEditors: PT
 * @LastEditTime: 2020-11-12 17:08:30
 * @Description: SMenuCon 多级菜单组件
 */
import Vue from 'vue'
import SSubmenuCon from './submenu-con'
import MenuitemCon from './menuitem-con'
import VerticalNav from './vertical-nav'
import NavSearch from './nav-search'
import './menu-con.scss'
import { PopupManager } from 'element-ui/src/utils/popup'
const PopperJS = Vue.prototype.$isServer ? function () {} : require('element-ui/src/utils/popper')
const stop = e => e.stopPropagation()

import emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'SMenuCon',
  componentName: 'SMenuCon',
  mixins: [ emitter ],
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: {
      type: String,
      default: 'hover'
    },
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    collapseTransition: {
      type: Boolean,
      default: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    /**
     * [
     *  {
     *    id: '',
     *    name: '', 菜单显示名称
     *    icon: '', // 菜单显示名称的icon类
     *    path: string() | object(router-link path), 外部链接全路径、router-link的path或者传入router-link的path的对象
     *    is: 'link', // 是否是a标签
     *    target: '' // a标签的target
     *    children: [], // 子菜单
     *  }
     * ]
     */
    options: {
      type: Array,
      default: () => []
    },
  },
  provide () {
    return {
      menuCon: this
    }
  },
  created () {
    this.$on('submenu-mouseenter', this.hidePop)
    this.$on('item-click', this.hidePop)
  },
  data () {
    return {
      width: 256,
      // 三级菜单数据
      popupMenuitem3Data: [],
      item3Hover: false,
      timeoutMenuItem: null,
      // 四/五级菜单数据
      popupMenuitem4Data: [],
      item4Hover: false,
      // 弹窗实例数据 依赖数据
      popperJS: {
        item3: {
          instance: null,
          reference: null,
          popperElm: null
        }
      }
    }
  },
  computed: {
    menuTransitionName () {
      return this.collapse ? 'el-zoom-in-left' : 'el-zoom-in-top'
    }
  },
  mounted () {
    this.handleWidth()
  },
  watch: {
    item3Hover (val) {
      if (val) {
        this.$nextTick(() => {
          this.updateMenuItemPopper('item3')
        })
      }
    },
    item4Hover (val) {
      if (val) {
        this.$nextTick(() => {
          this.updateMenuItemPopper('item4')
        })
      }
    },
    collapse () {
      this.item3Hover = false
      this.item4Hover = false
      clearTimeout(this.timeout)
      this.doDestroy()
      this.$nextTick(this.handleWidth)
    }
  },
  render () {
    const popupMenuitem3 = this.getPopup3()
    const popupMenuitem4 = this.getPopup4()
    return (
      <div class='s-menu-con'>
        <s-menu
          ref="elMenu"
          class={`s-menu-${this.mode}`}
          {
            ...{
              props: {
                ...this.$props
              },
              on: {
                ...this.$listeners
              }
            }
          }
        >
          { popupMenuitem3 }
          { popupMenuitem4 }
          {
            this.options &&
            this.options.length > 0 &&
            this.options.map(submenu => {
              if (submenu.children) {
                return <s-submenu-con {...{
                    attrs: { ...submenu },
                    on: {
                      'show-popup': (popupMenuitem3Data) => {
                        this.showItem3Pop(popupMenuitem3Data)
                      },
                      'hide-popup': () => {
                        this.hideItem3Pop()
                      }
                    }
                  }
                } option={submenu} >
                </s-submenu-con>
              }
              return <MenuitemCon
                {
                  ...{
                    attrs: { ...submenu }
                  }
                }
              >
                { submenu.icon && <i class={ submenu.icon }></i>}
                <span slot="title">{ submenu.name }</span>
              </MenuitemCon>
            })
          }
        </s-menu>
      </div>
    )
  },
  methods: {
    hidePop () {
      clearTimeout(this.timeout)
      this.item3Hover = false
      this.item4Hover = false
      // this.timeout = setTimeout(() => {
      //   this.item3Hover = false
      //   this.item4Hover = false
      // }, this.hideTimeout)
    },
    handleWidth () {
      if (this.mode === 'vertical' && !this.collapse) {
        let elMenu = this.$refs.elMenu.$el
        this.width = parseInt(elMenu.dataset.scrollWidth || elMenu.offsetWidth)
      }
    },
    doDestroy () {
      if (this.popperJS) {
        for (let prop in this.popperJS) {
          if (this.popperJS[prop] && this.popperJS[prop].instance) {
            this.popperJS[prop].instance.destroy()
          }
          this.popperJS[prop] = null
        }
      }
    },
    getPopup4 () {
      return (
        <transition name={this.menuTransitionName}>
          <div
            ref="popup_item4"
            v-show={this.item4Hover}
            class='s-menu-popup submenu-level-4'
            style={{width: `calc(100vw - ${this.width + 240}px)`}}
            on-mouseenter={() => this.handleItem4PopMouseenter()}
            on-mouseleave={() => this.handleItem4PopMouseleave()}
            on-focus={() => this.handleItem3PopMouseenter()}
            >
            <NavSearch options={ this.popupMenuitem4Data }></NavSearch>
          </div>
        </transition>
      )
    },
    getPopup3 () {
      return (
        <transition name={this.menuTransitionName}>
          <div
            ref="popup_item3"
            v-show={this.item3Hover}
            class={
              {
                's-menu-popup': true,
                'submenu-level-3': true,
                's-menu-popup-collapse': this.collapse
              }
            }
            style={
              { marginLeft: this.mode === 'vertical' && this.collapse ? (this.width - 64) + 'px' : 0 }
            }
            on-mouseenter={() => this.handleItem3PopMouseenter()}
            on-mouseleave={() => this.handleItem3PopMouseleave()}
            on-focus={() => this.handleItem3PopMouseenter()}
            >
            <VerticalNav options={ this.popupMenuitem3Data } on={
              {
                'show-popup': (popupData = []) => {
                  this.showItem4Pop(popupData)
                },
                'hide-popup': () => {
                  this.hideItem4Pop()
                }
              }
            }></VerticalNav>
          </div>
        </transition>
      )
    },
    // 3 显示
    showItem3Pop (popupData = []) {
      if (popupData.length) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.popupMenuitem3Data = popupData.slice()
          this.$nextTick(() => {
            this.item3Hover = true
            this.item4Hover = false
          })
        }, this.showTimeout)
      } else {
        this.hideItem3Pop()
      }
    },
    // 3 隐藏
    hideItem3Pop () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.popupMenuitem3Data.splice(0, this.popupMenuitem3Data.length)
        this.item3Hover = false
        this.item4Hover = false
      }, this.hideTimeout)
    },
    // 3 pop mouseenter
    handleItem3PopMouseenter () {
      if (this.mode === 'vertical' && this.collapse) {
        this.broadcast('SubmenuCon', 'pop3-mouseenter')
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.item3Hover = true
      }, this.showTimeout)
    },
    // 3 pop mouseleave
    handleItem3PopMouseleave () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.item3Hover = false
        this.item4Hover = false
        if (this.mode === 'vertical' && this.collapse) {
          this.broadcast('SubmenuCon', 'pop3-mouseleave')
        }
      }, this.hideTimeout)
    },

    // 4 显示
    showItem4Pop (popupData = []) {
      clearTimeout(this.timeout)
      if (popupData && popupData.length > 0) {
        this.timeout = setTimeout(() => {
          this.popupMenuitem4Data.splice(0, this.popupMenuitem4Data.length)
          this.popupMenuitem4Data.push(...popupData)
          this.item4Hover = true
        }, this.showTimeout)
      } else {
        this.hideItem4Pop()
      }
    },
    // 4-5 隐藏
    hideItem4Pop () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.item4Hover = false
      }, this.hideTimeout)
    },
    // 4-5 pop mouseenter
    handleItem4PopMouseenter () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.item4Hover = true
      }, this.showTimeout)
    },
    // 4-5 pop mouseleave
    handleItem4PopMouseleave () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.item4Hover = false
        this.item3Hover = false
        if (this.mode === 'vertical' && this.collapse) {
          this.broadcast('SubmenuCon', 'pop3-mouseleave')
        }
      }, this.hideTimeout)
    },

    updateMenuItemPopper (popKey) {
      const popperJS = this.popperJS[popKey] ? this.popperJS[popKey].instance : null
      if (popperJS) {
        popperJS.update()
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = PopupManager.nextZIndex()
        }
      } else {
        this.createMenuItemPopper(popKey)
      }
    },
    createMenuItemPopper (popKey) {
      if (this.$isServer) return
      this.popperJS[popKey] = this.popperJS[popKey] || { instance: null, reference: null, popperElm: null }
      const options = {
        placement: 'right-start',
        boundariesPadding: 0
      }
      const popper = this.popperJS[popKey].popperElm = this.popperJS[popKey].popperElm || this.$refs['popup_' + popKey]
      let reference = this.popperJS[popKey].reference = this.popperJS[popKey].reference || popKey === 'item3' ? this.$refs.elMenu.$el : this.$refs['popup_item3']
      
      if (!popper || !reference) return

      if (this.popperJS[popKey].instance && this.popperJS[popKey].instance.destroy) {
        this.popperJS[popKey].instance.destroy()
      }

      this.popperJS[popKey].instance = new PopperJS(reference, popper, options)
      this.popperJS[popKey].instance.onCreate(() => {
        this.$emit('created', this)
        this.resetMenuItemTransformOrigin(this.popperJS[popKey].instance)
        this.$nextTick(() => this.updateMenuItemPopper(popKey))
      })
      this.popperJS[popKey].instance._popper.style.zIndex = PopupManager.nextZIndex()
      this.popperJS[popKey].popperElm.addEventListener('click', stop)
    },
    resetMenuItemTransformOrigin (instance) {
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }
      let placement = instance._popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      instance._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ?
        `center ${ origin }` : `${ origin } center`
    }
  },
  components: {
    SSubmenuCon,
    VerticalNav,
    NavSearch,
    MenuitemCon
  }
}