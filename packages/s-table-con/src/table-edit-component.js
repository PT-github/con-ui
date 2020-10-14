import SInput from '../../s-input'
import SSelectCon from '../../s-select-con'
export default {
  name: 'STableEditComponent',
  componentName: 'STableEditComponent',
  inject: {
    tableCon: {
      default: ''
    }
  },
  props: {
    edittype: {
      type: String,
      required: true
    },
    rowIndex: {
      type: Number
    },
    // 当前行数据
    rowData: {
      type: Object
    },
    // 值
    value: {}
  },
  created () {
    // 监听单元格保存
    this.$on('tablecell-save', this.handleTableSave)
    // 监听单元格编辑
    this.$on('tablecell-edit', this.handleTableCellEdit)
    // 取消单元格编辑
    this.$on('cancel-tablecell-edit', () => {
      this.isEditting = false
      this.renderValue = this.value
      this.tableCon.removeEdittingComponent(this)
    })
    this.renderValue = this.value
  },
  destroyed () {
    this.tableCon.removeEdittingComponent(this)
  },
  data () {
    return {
      isEditting: false, // 是否正在编辑
      renderValue: null // 组件的绑定数据
    }
  },
  render () {
    switch (this.edittype) {
      case 'input':
        return this.renderInput()
    
      case 'select': 
        return this.renderSelect()
    }
  },
  methods: {
    /**
     * @description: 监听input/select change事件
     */
    handleChange (v) {
      this.renderValue = v
    },
    /**
     * @description: 设置单元格编辑状态 {rowIndexs = [], isEdit = false}
     * @param {Object} {} rowIndexs:行下标列表(Array) isEdit是否编辑状态(Boolean)
     */
    handleTableCellEdit ({rowIndexs = [], isEdit = true}) {
      if (rowIndexs.indexOf(this.rowIndex) !== -1) {
        this.isEditting = isEdit
        this.tableCon[isEdit ? 'addEdittingComponent' : 'removeEdittingComponent'](this)
      }
    },
    /**
     * @description: 单元格保存
     * @param {Number} rowIndex 需要保存的行下标
     */
    handleTableSave (rowIndex) {
      if (this.isEditting && (rowIndex === 'all' || rowIndex === this.rowIndex)) {
        // rowIndex为undefined即保存所有单元格
        this.renderValue !== this.value && this.$emit('update:value', this.renderValue)
        this.isEditting = false
        this.tableCon.removeEdittingComponent(this)
      }
    },
    /**
     * @description: 渲染input输入框
     */
    renderInput () {
      if (this.isEditting) {
        return (
          <s-input
            value={ this.renderValue }
            {
              ...{
                attrs: { ...this.$attrs.input },
                on: {
                  input: this.handleChange
                }
              }
            }>
          </s-input>
        )
      }
      return <span>{this.value}</span>
    },
    /**
     * @description: 渲染select下拉框
     */
    renderSelect () {
      if (this.isEditting) {
        return (
          <s-select-con
            vModel={this.renderValue}
            {
              ...{
                attrs: { ...this.$attrs.select },
                on: {
                  change: this.handleChange
                }
              }
            }>
          </s-select-con>
        )
      }
      return <span>{this.getSelectValue(this.value)}</span>
    },
    /**
     * @description: 获取select匹配option的数据
     * @param v select的值
     * @return {String} 匹配的数据 
     */
    getSelectValue (v) {
      let value = this.$attrs.select &&
      this.$attrs.select.options &&
      this.$attrs.select.options.length > 0 &&
      this.$attrs.select.options.filter(item => item.value === v) || []
      return value[0] && value[0].label || v
    }
  },
  component: {
    SInput,
    SSelectCon
  }
}