/*
 * @Author: PT
 * @Date: 2020-10-15 22:36:22
 * @LastEditors: PT
 * @LastEditTime: 2020-10-16 15:40:10
 * @Description: STreeselect
 */
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import './treeselect.scss'

export default {
  name: 'STreeselect',
  props: {
    clearAllText: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noChildrenText: {
      type: String,
      default: '暂无数据'
    },
    noOptionsText: {
      type: String,
      default: '暂无数据'
    },
    noResultsText: {
      type: String,
      default: '暂无数据'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    searchPromptText: {
      type: String,
      default: '输入要查询的数据'
    },
    retryText: {
      type: String,
      default: '重试加载'
    },
    retryTitle: {
      type: String,
      default: '点击重新加载数据'
    },
    // 大小控制
    size: {
      type: String,
      validator: function (value) {
        return ['medium', 'small', 'mini'].indexOf(value) !== -1
      },
      default: 'medium'
    }
  },
  data () {
    return {
      // selectClearable: false,
      timer: null
    }
  },
  render () {
    // TODO
    // vOn: mouseover_native_stop_prevent={this.handleMouseOver}
    // vOn: mouseout_native_stop_prevent={this.handleMouseOut}
    return (
      <Treeselect class={
        {
          's-treeselect': true,
          's-treeselect--small': this.size === 'small',
          's-treeselect--mini': this.size === 'mini'
        }
      }
        {
        ...{
          attrs: {
            ...this.$attrs,
            ...this.$props,
            // clearable: this.selectClearable
          },
          on: {
            ...this.$listeners
          },
          scopedSlots: { ...this.$scopedSlots }
        }
        }
      >
      </Treeselect>
    )
  },
  methods: {
    // handleMouseOver () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(() => {
    //     this.clearable && (this.selectClearable = true)
    //   }, 20)
    // },
    // handleMouseOut () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(() => {
    //     this.selectClearable && (this.selectClearable = false)
    //   }, 500)
    // },
  },
  watch: {
    clearable: {
      handler: function (v) {
        this.selectClearable = v
      },
      immediate: true
    }
  },
  component: {
    Treeselect
  }
}