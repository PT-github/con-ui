import SInput from '../../s-input'
import SSelectCon from '../../s-select-con'
import AsyncValidator from 'async-validator'
import SPopoper from '../../s-popover'
import { generateUUID } from '../../../src/utils'
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
    // 排除fixed中的单元格
    if (!this.$parent.fixed) {
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
      this.$on('body-scroll', () => {
        this.showPopover && (this.showPopover = false)
      })
    }
    
    this.renderValue = this.value
    // console.log('created', 'table-edit-component', this.$attrs.prop, this.rowIndex)
  },
  destroyed () {
    this.tableCon.removeEdittingComponent(this)
    this.$off()
  },
  data () {
    let uuid = generateUUID()
    return {
      uuid,
      isEditting: false, // 是否正在编辑
      renderValue: null, // 组件的绑定数据
      showPopover: false, // 显示错误弹窗
      validateState: '', // 校验状态
      validateMessage: '', // 错误内容
    }
  },
  computed: {
    // 校验规则
    validRules () {
      return this.$attrs[this.edittype] && this.$attrs[this.edittype].rules || []
    },
    // 是否必填
    isRequired () {
      let rules = this.validRules
      let isRequired = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
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
      this.validate('change')
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
      // console.log(this, '--', this.$attrs.prop, this.rowIndex)
      // console.log(this.edittype, rowIndex, this.rowIndex, this.$attrs.prop, this.renderValue, this.value)
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
          <div class='table-input'>
            {
              this.isRequired && <span class="is-required">*</span>
            }
            <s-popover
              ref="popover"
              placement="top-start"
              trigger="manual"
              vModel={this.showPopover}
              content={ this.validateMessage || '请输入' + this.$attrs.label }>
            </s-popover>
            <s-input
              value={ this.renderValue }
              class={ 'is-' + this.validateState }
              vPopover:popover
              {
                ...{
                  attrs: { 
                    ...this.$attrs.input
                  },
                  on: {
                    input: this.handleChange,
                    blur: this.handleBlur,
                    focus: () => {
                      this.showPopover = false
                    }
                  }
                }
              }>
              {
                this.validateState && (
                  <i class={[
                    'el-input__icon',
                    this.validateState === 'error' && 'icon__error el-icon-circle-close',
                    this.validateState === 'validating' && 'icon__validating el-icon-loading'
                  ]} slot="suffix"></i>
                )
              }
            </s-input>
          </div>
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
          <div class='table-select'>
            {
              this.isRequired && <span class="is-required">*</span>
            }
            <s-popover
              ref="popover"
              placement="top-start"
              trigger="manual"
              vModel={this.showPopover}
              content={ this.validateMessage || '请选择' + this.$attrs.label }>
            </s-popover>
            <s-select-con
              vModel={this.renderValue}
              class={ 'is-' + this.validateState }
              vPopover:popover
              {
                ...{
                  attrs: { ...this.$attrs.select },
                  on: {
                    change: this.handleChange,
                    focus: () => {
                      this.showPopover = false
                    },
                    'visible-change': v => v && this.showPopover && (this.showPopover = false)
                  }
                }
              }>
            </s-select-con>
          </div>
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
    },
    // 根据trigger获取规则
    getFilteredRule (trigger) {
      const rules = this.validRules

      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => Object.assign({}, rule))
    },
    // 校验单元格数据
    validate (trigger, callback = function () {}) {
      const rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        callback()
        return true
      }

      this.showPopover = false // 关闭错误弹窗
      this.validateState = 'validating' // 校验设置成功

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.uuid] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.uuid] = this.renderValue

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.showPopover = !!errors
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        // console.log('invalidFields', invalidFields)

        callback(this.validateMessage, invalidFields)
      })
    },
    // 监听blur事件
    handleBlur () {
      this.validate('blur')
    }
  },
  // watch: {
  //   renderValue () {
  //     this.validate('change')
  //   }
  // },
  component: {
    SInput,
    SSelectCon,
    SPopoper
  }
}