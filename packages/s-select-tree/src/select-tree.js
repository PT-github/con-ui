/*
 * @Author: PT
 * @Date: 2020-10-15 22:36:22
 * @LastEditors: PT
 * @LastEditTime: 2020-10-15 23:01:51
 * @Description: SSelectTree
 */
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import './select-tree.scss'

export default {
  name: 'SSelectTree',
  render () {
    return (
      <TreeSelect class="s-tree-select"
        {
          ...{
            attrs: { ...this.$attrs },
            on: { ...this.$listeners },
            scopedSlots: { ...this.$scopedSlots }
          }
        }
      >
      </TreeSelect>
    )
  },
  component: {
    Treeselect
  }
}