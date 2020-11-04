/*
 * @Author: PT
 * @Date: 2020-10-28 16:44:33
 * @LastEditors: PT
 * @LastEditTime: 2020-11-04 12:00:00
 * @Description: Navitem 菜单显示
 */
import { throttle } from 'throttle-debounce'
export default {
  name: 'Navitem',
  functional: true,
  props: {
    icon: String,
    suffixIcon: String,
    name: String,
    cls: String,
    // 级别
    level: Number,
    // 子节点
    children: Array
  },
  inject: {
    menuCon: {
      default: ''
    }
  },
  render: function (h, context) {
    let fun = typeof context.listeners.mouseover === 'function' ? context.listeners.mouseover : () => {}
    let handleMouseOver = throttle(20, function () {
      fun(context.props.children)
    })
    return (
      <div class={
        {
          'navitem': true,
          ...(context.data.class || {}),
          [ context.props.cls ]: context.props.cls
        }}
        on={
          {
            mouseover: () => {
              context.props.children &&
              context.props.children.length > 0 &&
              handleMouseOver(context.props.children)
            }
          }
        }
      >
        { context.props.icon && <i class={ ['menu-icon', context.props.icon] }></i> }
        { context.props.name }
        { context.props.suffixIcon && <i class={ ['menu-icon', context.props.suffixIcon] }></i> }
        {
          context.injections.menuCon &&
          context.injections.menuCon.mode !== 'horizontal' &&
          context.props.level === 1 &&
          context.props.children &&
          context.props.children.length > 0 &&
          <i class="el-icon-arrow-down"></i>
        }
      </div>
    )
  },
  methods: {
    handleMouseOver: throttle(20, function (list) {
      this.$emit('nav-hover', list)
    })
  }
}