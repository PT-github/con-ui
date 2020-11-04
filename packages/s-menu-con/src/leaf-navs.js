/*
 * @Author: PT
 * @Date: 2020-11-04 14:47:49
 * @LastEditors: PT
 * @LastEditTime: 2020-11-04 17:20:32
 * @Description: LeafNavs
 */
import Navitem from './navitem'
export default {
  name: 'LeafNavs',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      input: ''
    }
  },
  computed: {
    filterOptions () {
      let arry = this.options.slice()
      if (this.input) {
        arry = this.options.filter(item => {
          if (item.name && item.name.indexOf(this.input) !== -1) {
            return true
          }
          if (item.children && item.children.length > 0) {
            let childs = item.children.filter(child => child.name && child.name.indexOf(this.input) !== -1)
            return childs.length > 0
          }
          return false
        })
      }
      return arry
    }
  },
  render () {
    return <div class="leaf-navs">
      <s-input size="small" vModel={this.input} placeholder="请输入内容"></s-input>
      {
        this.filterOptions.map(item => {
          return <div class="leaf-group">
            <Navitem attrs={{...(item || {})}}></Navitem>
            <div class="leaf-group-content">
              {
                item.children &&
                item.children.length > 0 &&
                item.children.map(nav => <Navitem attrs={{...(nav || {})}}></Navitem>)
              }
            </div>
          </div>
        })
      }
    </div>
  },
  components: {
    Navitem
  }
}