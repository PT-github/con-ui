/*
 * @Author: PT
 * @Date: 2020-10-28 11:23:54
 * @LastEditors: PT
 * @LastEditTime: 2020-10-28 13:01:04
 * @Description: SMenuConItem
 */
export default {
  name: 'SMenuConItem',
  functional: true,
  props: {
    icon: String,
    name: String,
    cls: String
  },
  inject: {
    menuCon: {
      default: ''
    }
  },
  render: function (h, context) {
    return (
      <div class={
        {
          's-menu-con-item': true,
          [ context.props.cls ]: context.props.cls
        }
      }>
        <span>
          { context.props.icon && <i class={ context.props.icon }></i> }
          { context.props.name }
          {
            context.injections.menuCon &&
            context.injections.menuCon.mode !== 'horizontal' &&
            context.parent.$options.name === 'SMenuCon' &&
            context.data.attrs.children &&
            context.data.attrs.children.length > 0 &&
            <i class="el-icon-arrow-down"></i>
          }
        </span>
      </div>
    )
  }
}