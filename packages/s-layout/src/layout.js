/*
 * @Author: PT
 * @Date: 2020-09-29 17:23:03
 * @LastEditors: PT
 * @LastEditTime: 2020-10-26 17:27:20
 * @Description: SLayout
 */
import './layout.scss'

const generateId = (() => {
  let i = 0
  return (prefix = '') => {
    i += 1
    return `${prefix}${i}`
  }
})()

export const BasicProps = {
  prefixCls: {
    type: String,
    default: ''
  },
  tagName: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: ''
  }
}
function generator ({ suffixCls, tagName, name }, isSider = false) {
  return BasicComponent => {
    return {
      name,
      props: BasicComponent.props,
      inject: {
        siderHook: { default: () => ({}) }
      },
      created () {
        this.uniqueId = generateId()
      },
      data () {
        return {
          uniqueId: ''
        }
      },
      mounted () {
        isSider && this.siderHook && this.siderHook.addSider(this.uniqueId)
      },
      beforeDestroy () {
        if (isSider && this.siderHook.removeSider) {
          this.siderHook.removeSider(this.uniqueId)
        }
      },
      render () {
        const basicComponentProps = {
          props: {
            prefixCls: suffixCls,
            tagName,
            theme: this.theme
          },
          on: this.$listeners,
        }
        return <BasicComponent {...basicComponentProps}>{this.$slots.default}</BasicComponent>
      }
    }
  }
}

const Basic = {
  props: BasicProps,
  inject: {
    layout: {
      default: ''
    },
  },
  render () {
    const { prefixCls, tagName: Tag, $slots } = this
    const divProps = {
      class: {
        [prefixCls]: true,
        [`${prefixCls}-dark`]: this.theme === 'dark' || (!this.theme && this.layout && this.layout.theme === 'dark')
      },
      on: this.$listeners
    }
    return <Tag {...divProps}>{$slots.default}</Tag>
  }
}
const BasicLayout = {
  props: BasicProps,
  data () {
    return {
      siders: [],
    }
  },
  provide () {
    return {
      siderHook: {
        addSider: id => {
          this.siders = [...this.siders, id]
        },
        removeSider: id => {
          this.siders = this.siders.filter(currentId => currentId !== id)
        }
      },
      layout: this
    }
  },
  render () {
    const { prefixCls, $slots, tagName: Tag } = this
    const divProps = {
      class: {
        [prefixCls]: true,
        [`${prefixCls}-has-sider`]: this.siders.length > 0,
        [`${prefixCls}-dark`]: this.theme === 'dark'
      },
      on: this.$listeners
    }
    return <Tag {...divProps}>{$slots.default}</Tag>
  },
}

const Layout = generator({
  suffixCls: 's-layout',
  tagName: 'section',
  name: 'SLayout'
})(BasicLayout)

export const LayoutHeader = generator({
  suffixCls: 's-layout-header',
  tagName: 'header',
  name: 'SLayoutHeader'
})(Basic)

export const LayoutFooter = generator({
  suffixCls: 's-layout-footer',
  tagName: 'footer',
  name: 'SLayoutFooter'
})(Basic)

export const LayoutContent = generator({
  suffixCls: 's-layout-content',
  tagName: 'article',
  name: 'SLayoutContent'
})(Basic)

export const LayoutSider = generator({
  suffixCls: 's-layout-sider',
  tagName: 'aside',
  name: 'SLayoutSider'
}, true)(Basic)

Layout.Header = LayoutHeader
Layout.Footer = LayoutFooter
Layout.Content = LayoutContent
Layout.Sider = LayoutSider

export default Layout