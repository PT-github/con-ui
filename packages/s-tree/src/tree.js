/*
 * @Author: PT
 * @Date: 2020-10-10 11:04:29
 * @LastEditors: PT
 * @LastEditTime: 2020-10-10 11:15:24
 * @Description: STree
 */

import './tree.scss'
import Tree from 'element-ui/lib/tree'
export default {
  name: 'STree',
  render () {
    return (
      <el-tree ref="tree" class="s-tree" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          },
          scopedSlots: {
            ...this.$scopedSlots
          }
        }}>
        { this.$slots.default }
      </el-tree>
    )
  },
  methods: {
    filter (...args) {
      this.$refs.tree.filter(...args)
    },
    updateKeyChildren (...args) {
      this.$refs.tree.updateKeyChildren(...args)
    },
    getCheckedNodes (...args) {
      this.$refs.tree.getCheckedNodes(...args)
    },
    setCheckedNodes (...args) {
      this.$refs.tree.setCheckedNodes(...args)
    },
    getCheckedKeys (...args) {
      this.$refs.tree.getCheckedKeys(...args)
    },
    setCheckedKeys (...args) {
      this.$refs.tree.setCheckedKeys(...args)
    },
    setChecked (...args) {
      this.$refs.tree.setChecked(...args)
    },
    getHalfCheckedNodes (...args) {
      this.$refs.tree.getHalfCheckedNodes(...args)
    },
    getHalfCheckedKeys (...args) {
      this.$refs.tree.getHalfCheckedKeys(...args)
    },
    getCurrentKey (...args) {
      this.$refs.tree.getCurrentKey(...args)
    },
    getCurrentNode (...args) {
      this.$refs.tree.getCurrentNode(...args)
    },
    setCurrentKey (...args) {
      this.$refs.tree.setCurrentKey(...args)
    },
    setCurrentNode (...args) {
      this.$refs.tree.setCurrentNode(...args)
    },
    getNode (...args) {
      this.$refs.tree.getNode(...args)
    },
    remove (...args) {
      this.$refs.tree.remove(...args)
    },
    append (...args) {
      this.$refs.tree.append(...args)
    },
    insertBefore (...args) {
      this.$refs.tree.insertBefore(...args)
    },
    insertAfter (...args) {
      this.$refs.tree.insertAfter(...args)
    }
  },
  components: {
    [Tree.name]: Tree
  }
}