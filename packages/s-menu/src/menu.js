/*
 * @Author: PT
 * @Date: 2020-10-10 16:46:47
 * @LastEditors: PT
 * @LastEditTime: 2020-11-12 17:07:06
 * @Description: SMenu
 */
import './styles/menu.scss'
import Menu from 'element-ui/lib/menu'
const mixins = {
  mixins: [Menu],
  methods: {
    addItem (item) {
      !item.inpop && this.$set(this.items, item.index, item)
    },
    updateActiveIndex: function updateActiveIndex (val) {
      var item = this.items[val] || this.items[this.activeIndex] || this.items[this.defaultActive]
      if (item) {
        this.activeIndex = item.index
        this.initOpenedMenu()
      }
    },
    handleItemClick (item) {
      const { index, indexPath } = item
      const oldActiveIndex = this.activeIndex
      const hasIndex = item.index !== null

      if (hasIndex) {
        this.activeIndex = item.index
      }

      this.$emit('select', index, item, indexPath)

      if (this.mode === 'horizontal' || this.collapse) {
        this.openedMenus = []
      }

      if (this.router && hasIndex) {
        this.routeToItem(item, (error) => {
          this.activeIndex = oldActiveIndex
          if (error) {
            // vue-router 3.1.0+ push/replace cause NavigationDuplicated error 
            // https://github.com/ElemeFE/element/issues/17044
            if (error.name === 'NavigationDuplicated') return
            console.error(error)
          }
        })
      }
    },
  }
}

export default {
  name: 'SMenu',
  props: {
    ...Menu.props
  },
  render () {
    return (
      <el-menu ref="menu" class="s-menu" {
        ...{
          attrs: {
            ...this.$attrs,
            ...this.$props,
          },
          on: {
            ...this.$listeners
          }
        }}>
        { this.$slots.default }
      </el-menu>
    )
  },
  methods: {
    open () {
      this.$refs.menu.open()
    },
    close () {
      this.$refs.menu.close()
    }
  },
  components: {
    [Menu.name]: mixins
  }
}