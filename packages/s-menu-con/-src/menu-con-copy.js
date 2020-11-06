/*
 * @Author: PT
 * @Date: 2020-10-27 15:42:29
 * @LastEditors: PT
 * @LastEditTime: 2020-11-03 16:16:42
 * @Description: SMenuCon 菜单导航封装 最多支持5级导航
 */
import HorizontalNav from './horizontal-nav'
import './menu-con.scss'
export default {
  name: 'SMenuCon',
  componentName: 'SMenuCon',
  props: {
    // 模式 vertical 垂直 horizontal 水平
    mode: {
      type: String,
      default: 'vertical'
    },
    // 是否启用vue-router的模式
    router: Boolean,
    // 水平布局时，三级以上菜单
    popperWidth: [ Number, String ],
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
    }
  },
  provide () {
    return {
      menuCon: this
    }
  },
  render () {
    console.log('====', this)
    return (
      <div class={{
        's-menu-con': true,
        [`s-menu-con--${this.mode}`]: true
      }}>
        {
          this.mode === 'horizontal' &&
          this.options.map(item => <HorizontalNav item={item} popperWidth={this.popperWidth}></HorizontalNav>)
        }
      </div>
    )
  },
  methods: {
    /**
     * @description: popover内容
     * @param {array} list 子菜单列表
     * @return {JSX}
     */
    renderPopoverContent (list) {
      console.log(list)
      return '内容内容'
    },
    /**
     * @description: 渲染第一层菜单
     * @param {object} item
     * @return {jsx}
     */
    // renderFirstItem (item = {}) {
    //   if (this.mode === 'horizontal') {
    //     // 水平布局
    //     if (item.children && item.children.length) {
    //       let arry = []
    //       return <s-popover width={document.documentElement.offsetWidth} popper-class="menu-con-popover--horizontal menu-con-popover--horizontal--full" placement="bottom" trigger="hover" closeDelay={10000000} visibleArrow={false}>
    //         <s-menu-con-item attrs={{...(item || {})}} slot="reference"></s-menu-con-item>
    //         { this.renderPopoverContent(item.children) }
    //       </s-popover>
    //     } else {
    //       return <s-menu-con-item attrs={{...(item || {})}}></s-menu-con-item>
    //     }
    //   } else {
    //     // 垂直
    //     // if (item.children && item.children.length) {
    //     //   return <div class="menu-con-group">
    //     //     <s-menu-con-item attrs={{...(item || {})}}></s-menu-con-item>
    //     //     {
    //     //       item.children.map(child => )
    //     //     }
    //     //   </div>
    //     // } else {
    //     //   return <s-menu-con-item attrs={{...(item || {})}}></s-menu-con-item>
    //     // }
    //   }
    // },
    renderSubMenu (item) {
      if (item.children) {}
    },
  },
  components: {
    HorizontalNav
  }
}