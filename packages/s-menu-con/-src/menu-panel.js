

import VerticalNavs from './vertical-navs'
import LeafNavs from './leaf-navs'
import { findDeep } from '../../../src/utils'
export default {
  name: 'MenuPanel',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeMenus4: [],
      activeMenus5: [],
    }
  },
  computed: {
    deep () {
      let max = 0, deep = 0
      this.activeMenus4.forEach(item => {
        deep = findDeep(item)
        max = max > deep ? max : deep
      })
      return max
    }
  },
  render () {
    let { options } = this
    return <div class="menu-panel">
      <VerticalNavs
        options={options}
        on={
          {
            'nav-change': (activeMenu) => {
              this.activeMenus4 = activeMenu.children
            }
          }
        }
        ></VerticalNavs>
      {
        this.deep === 3 && <VerticalNavs
          cls="vertical-navs--white"
          options={this.activeMenus4}
          on={
            {
              'nav-change': (activeMenu) => {
                this.activeMenus5 = activeMenu.children
              }
            }
          }
          ></VerticalNavs>
      }
      <LeafNavs options={this.deep <= 2 ? this.activeMenus4 : this.activeMenus5}></LeafNavs>
    </div>
  },
  methods: {
    renderChildren (list) {
      if (list && list.length > 0) {
        return <div class="menu-group-item">
          {
            list.map(item => <Navitem attrs={{...(item || {})}}></Navitem>)
          }
        </div>
      }
    }
  },
  components: {
    VerticalNavs,
    LeafNavs
  }
}