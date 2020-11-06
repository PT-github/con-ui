/*
 * @Author: PT
 * @Date: 2020-10-28 16:37:53
 * @LastEditors: PT
 * @LastEditTime: 2020-11-04 16:13:36
 * @Description: HorizontalNav 水平布局的菜单
 */
import Navitem from './navitem'
import MenuGroup from './menu-group'
import MenuPanel from './menu-panel'
import PopContent from './pop-content'
import { findDeep } from '../../../src/utils'
export default {
  name: 'HorizontalPanel',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    // 水平布局时，弹出层面板宽度 数字或百分比
    popperWidth: [ Number, String ],
  },
  render () {
    // return this.initMenu()
    return <div class="horizontal-panel">
      {
        this.options.length > 0 && this.options.map(item => {
          if (!(item.children && item.children.length > 0)) {
            return <Navitem attrs={{...(item || {})}}></Navitem>
          }
          let deep = findDeep(item)
          return <s-popover
            popper-class={'horizontal--pop--' + deep}
            placement={ deep > 2 ? 'bottom' : 'bottom-start' }
            trigger="hover"
            // offset={200}
            vOn:created={(popperVm) => {
              this.setPopper(popperVm, deep)
            }}
            popper-options={
              {
                boundariesPadding: 0,
                gpuAcceleration: false,
                modifiersIgnored: [ 'preventOverflow', 'flip', 'arrow' ]
              }
            }
            boundariesPadding={0}
            close-delay={this.closeDelay}
            visibleArrow={false}>
              <Navitem attrs={{...(item || {}), level: 1}} slot="reference"></Navitem>
              <div class={ [`popover-content--${deep}`] }>
                {
                  deep === 2 &&
                  item.children.map(child => <Navitem attrs={{...(child || {})}}></Navitem>)
                }
                {
                  deep === 3 &&
                  item.children.map(child => <MenuGroup item={child}></MenuGroup>)
                }
                {
                  deep >= 4 && <MenuPanel options={item.children}></MenuPanel>
                }
              </div>
              
            </s-popover>
        })
      }
    </div>
  },
  methods: {
    initMenu () {
      let { item } = this,
        deep = findDeep(item)
      if (deep >= 2) {
        return <s-popover
          popper-class={'horizontal--pop--' + deep}
          placement={ deep > 2 ? 'bottom' : 'bottom-start' }
          trigger="hover"
          // offset={200}
          vOn:created={(popperVm) => {
            console.log(popperVm, this)

            this.setPopper(popperVm, deep)
          }}
          popper-options={
            {
              boundariesPadding: 0,
              gpuAcceleration: false,
              modifiersIgnored: [ 'preventOverflow', 'flip', 'arrow' ]
            }
          }
          boundariesPadding={0}
          close-delay={100000000}
          visibleArrow={false}>
            <Navitem attrs={{...(item || {}), level: 1}} slot="reference"></Navitem>
            <div class={
              {
                ['popover-content--' + deep]: true,
              }
            }>
              {
                item.children &&
                item.children.length > 0 &&
                item.children.map(child => <PopContent level={deep} item={child}></PopContent>)
              }
            </div>
            
          </s-popover>
      }
      return <Navitem attrs={{...(item || {})}}></Navitem>
    },
    /**
     * @description: 设置弹出层的宽度
     * @param {*}
     * @return {*}
     */    
    setPopper (popperVm, deep) {
      if (deep !== 2) {
        let parent = this.findParent(this, 'SMenuCon')
        if (this.popperWidth) {
          popperVm.popperJS._popper.style.width = typeof this.popperWidth === 'number' ?
            this.popperWidth + 'px' : this.popperWidth
        } else {
          popperVm.popperJS._popper.style.width = parent.$el.offsetWidth + 'px'
        }
        popperVm.popperJS._reference = parent.$el
        popperVm.$nextTick(() => {
          popperVm.updatePopper()
        })
      }
      popperVm.popperJS._popper.style.padding = 0
      popperVm.popperJS._popper.style.marginTop = 0
    },
    /**
     * @description: 渲染pop弹窗内容
     * @param {number} deep 节点层级
     * @param {array} list 子节点数据
     * @return {jsx}
     */    
    renderPopContent (deep, list) {
      switch (deep) {
        case 3:
          return <div class="popover-content-3"></div>
      
        default:
          return <div>
            {
              list &&
              list.length > 0 &&
              list.map(child => <PopContent level={deep} item={child}></PopContent>)
            }
          </div>
      }
    },
    /**
     * @description: 根据componentName获取父节点
     * @param {object} vm 当前组件
     * @param {string} componentName 父组件名称
     * @return {object} 父组件
     */    
    findParent (vm, componentName) {
      let parent = vm.$parent
      while (parent) {
        if (parent.$options.componentName === componentName) {
          break
        }
        parent = parent.$parent
      }
      return parent
    },
  },
  components: {
    Navitem,
    MenuGroup,
    MenuPanel,
    PopContent
  }
}