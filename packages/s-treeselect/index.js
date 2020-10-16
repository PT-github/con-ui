import TreeSelect from './src/treeselect'

TreeSelect.install = function (Vue) {
  Vue.component(TreeSelect.name, TreeSelect)
}

export default TreeSelect