/*
 * @Author: PT
 * @Date: 2020-10-15 22:36:22
 * @LastEditors: PT
 * @LastEditTime: 2020-10-16 22:43:38
 * @Description: STreeselect
 */
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import './treeselect.scss'
import Emitter from '../../../src/utils/emitter'

export default {
  name: 'STreeselect',
  props: {
    value: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    clearAllText: {
      type: String,
      default: ''
    },
    clearValueText: {
      type: String,
      default: ''
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
        return ['large', 'medium', 'small', 'mini'].indexOf(value) !== -1
      },
      default: 'large'
    }
  },
  mixins: [ Emitter ],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
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
          's-treeselect--medium': this.treeselectSize === 'medium',
          's-treeselect--small': this.treeselectSize === 'small',
          's-treeselect--mini': this.treeselectSize === 'mini'
        }
      }
        {
        ...{
          attrs: {
            ...this.$attrs,
            ...this.$props,
            disabled: this.treeselectDisabled
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
  computed: {
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize
    },
    validateState () {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    treeselectSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    treeselectDisabled () {
      return this.$attrs.disabled || (this.elForm || {}).disabled
    },
  },
  // methods: {
  //   handleMouseOver () {
  //     clearTimeout(this.timer)
  //     this.timer = setTimeout(() => {
  //       this.clearable && (this.selectClearable = true)
  //     }, 20)
  //   },
  //   handleMouseOut () {
  //     clearTimeout(this.timer)
  //     this.timer = setTimeout(() => {
  //       this.selectClearable && (this.selectClearable = false)
  //     }, 500)
  //   },
  // },
  watch: {
    value (val) {
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', val)
      }
    },
  },
  component: {
    Treeselect
  }
}