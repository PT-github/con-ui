export const BasicProps = {
  prefixCls: {
    type: String,
    default: ''
  },
  tagName: {
    type: String,
    default: ''
  },
}
export function generator ({ suffixCls, tagName, name }) {
  return BasicComponent => {
    return {
      name,
      props: BasicComponent.props,
      render () {
        const basicComponentProps = {
          props: {
            suffixCls,
            tagName,
          },
          on: this.$listeners,
        }
        return <BasicComponent {...basicComponentProps}>{this.$slots.default}</BasicComponent>
      }
    }
  }
}

export const Basic = {
  props: BasicProps,
  render () {
    const { prefixCls, tagName: Tag, $slots } = this
    const divProps = {
      class: prefixCls,
      on: this.$listeners
    }
    return <Tag {...divProps}>{$slots.default}</Tag>
  }
}
export const BasicLayout = {
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
    }
  },
  render () {
    const { prefixCls, $slots, tagName: Tag } = this
    const divProps = {
      class: {
        [prefixCls]: true,
        [`${prefixCls}-has-sider`]: this.siders.length > 0
      },
      on: this.$listeners
    }
    return <Tag {...divProps}>{$slots.default}</Tag>
  },
}