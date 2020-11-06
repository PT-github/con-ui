

import Navitem from './navitem'
export default {
  name: 'VerticalNavs',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    cls: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeIndex: null
    }
  },
  render () {
    let { options } = this
    if (!this.activeIndex) {
      this.setActive()
    }
    return <div class={['vertical-navs', this.cls]}>
      {
        options.map((item, index) => <Navitem class={
          {
            active: this.activeIndex === index
          }
        }
          attrs={
          {
            ...item,
            suffixIcon: item.suffixIcon || 'el-icon-arrow-right'
          }
        }
        on={
          {
            'mouseover': () => {
              this.handleMouseMover(item, index)
            }
          }
        }></Navitem>)
      }
    </div>
  },
  methods: {
    setActive () {
      for (let i = 0, j = this.options.length; i < j; i++) {
        if (this.options[i].children && this.options[i].children.length) {
          this.handleMouseMover(this.options[i], i)
          break
        }
      }
    },
    handleMouseMover (item, index) {
      this.activeIndex = index
      this.$emit('nav-change', item)
    }
  },
  watch: {
    options: {
      handler: function () {
        this.activeIndex = null
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    Navitem
  }
}