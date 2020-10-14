import STableColumn from '../../s-table/src/table-column'
import STableEditComponent from './table-edit-component'

export default {
  name: 'STableColumnCon',
  componentName: 'STableColumnCon',
  data () {
    return {
      rowIndex: '', // 单元格所在行下标
      isEditting: false, // 表格是否正在编辑
    }
  },
  render () {
    // 传递expand和列插槽
    let defaultScopedSlots = this.$scopedSlots[this.$attrs.type === 'expand' ? 'expand' : this.$attrs.prop]

    // 单元格可编辑，并且是正在编辑状态，传递编辑插槽
    this.$attrs.edittype && (defaultScopedSlots = this.renderEditSlots())

    return (
      <s-table-column
        {...{
          attrs: {
            ...this.$attrs
          },
          scopedSlots: {
            default: defaultScopedSlots,
            header: this.$scopedSlots[this.$attrs.prop + 'header']
          }
        }}
      >
        {
          this.$attrs.children &&
          this.$attrs.children.length > 0 &&
          this.$attrs.children.map(child => <s-table-column-con {
            ...{
              attrs: { ...child },
              scopedSlots: { ...this.$scopedSlots }
            }
          }></s-table-column-con>)
        }
      </s-table-column>
    )
  },
  methods: {
    /**
     * @description: 设置编辑单元格插槽
     */
    renderEditSlots () {
      return (scope) => {
        this.rowIndex = scope.$index
        return (
          <s-table-edit-component
            rowIndex={scope.$index}
            rowData={scope.row}
            value={scope.row[this.$attrs.prop]}
            {
              ...{
                attrs: { ...this.$attrs},
                on: {
                  'update:value': (v) => {
                    this.handleChange(scope, v)
                  }
                }
              }
            }
            ></s-table-edit-component>
        )
      }
    },
    /**
     * @description: 监听表格数据变化
     * 用vModel指令不生效，改为用传value，监听update:value事件，改变表格数据
     * @param {object} scope 当前行数据
     * @param {} v 单元格改变后的数据
     */
    handleChange (scope, v) {
      scope.row[this.$attrs.prop] = v
    }
  },
  components: {
    STableColumn,
    STableEditComponent
  }
}