/*
 * @Author: PT
 * @Date: 2020-10-10 16:46:47
 * @LastEditors: PT
 * @LastEditTime: 2020-11-11 15:27:27
 * @Description: SMenu
 */
import './styles/menu.scss'
import Menu from 'element-ui/lib/menu'
const mixins = {
  mixins: [Menu],
  methods: {
    addItem (item) {
      !item.inpop && this.$set(this.items, item.index, item)
    }
  }
}

export default {
  name: 'SMenu',
  render () {
    return (
      <el-menu ref="menu" class="s-menu" {
        ...{
          attrs: {
            ...this.$attrs
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