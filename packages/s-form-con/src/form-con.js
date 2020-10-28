/*
 * @Author: PT
 * @Date: 2020-10-17 19:14:45
 * @LastEditors: PT
 * @LastEditTime: 2020-10-28 08:55:32
 * @Description: SFormCon
 */
import SForm from '../../s-form'
// import SFormItem from '../../s-form-item'
import './form-con.scss'
export default {
  name: 'SFormCon',
  props: {
    // form-item列表
    fields: {
      type: Array,
      default: () => []
    },
    // form绑定的值
    model: Object,
    // 默认行内表单模式
    inline: {
      type: Boolean,
      default: true
    },
    // form下的列数
    columns: {
      type: Number | String,
      default: 1
    },
    // 带查询按钮模式
    isQueryForm: {
      type: Boolean,
      default: false
    },
    // 重置查询条件时，需要排除的props集合
    resetExcludeProps: {
      type: Array,
      default: () => []
    },
    // 重置查询条件时，需要重置的props集合
    resetIncludeProps: {
      type: Array,
      default: () => []
    },
    // 是否显示展开/收起按钮 默认显示
    showFold: {
      type: Boolean,
      default: true
    }
  },
  render () {
    // 不显示展开和收起按钮时或者button自定义插槽存在 默认不收起formitem
    (this.showFold === false || this.$slots.button) && (this.isfold = false)

    let formItems = this.fields &&
      this.fields.length > 0 &&
      this.fields.map((formitem, index) => this.renderFormItem(formitem, index))
    return (
      <s-form
        class="s-form-con"
        {
          ...{
            attrs: {
              ...this.$attrs,
              inline: this.inline,
              model: this.model
            },
            on: { ...this.$listeners }
          }
        }
      >
        { 
          this.showFoldButton && (
          <transition-group name="query-form" >
            { formItems }
          </transition-group>
          ) || formItems
        }
        {
          this.isQueryForm && (this.$slots.button || this.renderQueryBtn())
        }
      </s-form>
    )
  },
  data () {
    return {
      isfold: true, // 不在第一行的formitem是否被收起
    }
  },
  computed: {
    formitemWidth () {
      let ret
      try {
        ret = 100 / this.columns
        ret = isNaN(ret) ? 100 : ret
      } catch (error) {
        ret = 100
      }
      return ret + '%'
    },
    showFoldButton () {
      return this.isQueryForm && this.fields.length >= this.columns
    },
    // 需要重置的props集合
    _resetIncludeProps () {
      if (this.resetIncludeProps.length) {
        return this.resetIncludeProps
      } else {
        let arry = []
        for (let props in this.model) {
          if (this.resetExcludeProps.indexOf(props) !== -1) {
            continue
          }
          arry.push(props)
        }
        return arry
      }
    }
  },
  methods: {
    ...SForm.methods,
    // 点击查询按钮
    handleQuery () {
      this.$emit('query', this.model)
    },
    // 重置查询条件
    handleReset () {
      this._resetIncludeProps.forEach(prop => {
        switch(typeof this.model[prop]) {
          case 'string':
            this.$set(this.model, prop, '')
            break
          case 'number':
            this.$set(this.model, prop, 0)
            break
          default:
            this.$set(this.model, prop, null)
        }
      })
      this.$emit('reset', this.model)
    },
    handleFold () {
      this.isfold = !this.isfold
      this.$emit('fold', this.isfold)
    },
    /**
     * @description: 供外部调用设置是否展开和收起
     * @param {*} isfold
     */
    setFold (isfold) {
      this.isfold = !!isfold
    },
    /**
     * @description: 渲染查询、重置、展开/收起 按钮
     * @return {} JSX
     */    
    renderQueryBtn () {
      return (
        <s-form-item
          style={{width: this.formitemWidth}}
          class='form-item-query-btn'
        >
          <s-button type="primary" vOn:click={this.handleQuery}>查询</s-button>
          <s-button vOn:click={this.handleReset}>重置</s-button>
          {
            this.showFoldButton && this.showFold && (
              <s-button type="text" vOn:click={this.handleFold}>
                { this.isfold ? '展开' : '收起' }
                <i class={this.isfold ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}></i>
              </s-button>
            )
          }
          
        </s-form-item>
      )
    },
    /**
     * @description: 绑定组件值change的回调
     * @param {string} componentType 组件类型
     * @param {string} key 绑定值value中的key键值
     * @param {} value 改变后的数据
     * @param {object} attrs 组件配置
     */
    handleChange (componentType, key, value, attrs) {
      console.log(componentType, key, value, attrs)
      // this.model[key] = value
      this.$set(this.model, key, value)
      this.$emit('change', this.model, key)
      typeof attrs.onChange === 'function' && attrs.onChange(value)
    },
    // 渲染formitem
    renderFormItem (formitem = {}, index) {
      return (
        <s-form-item
          key={'formitem_' + index}
          style={{width: formitem.width || this.formitemWidth}}
          class={{
            'custome-form-item': this.$slots['field_' + formitem.prop.toLowerCase()],
          }}
          vShow={!this.isQueryForm || (this.isQueryForm && (this.isfold && index < this.columns - 1) || !this.isfold)}
          {
            ...{
              attrs: { ...formitem }
            }
          }
        >
          {
            this.$slots['field_' + formitem.prop.toLowerCase()] &&
            this.$slots['field_' + formitem.prop.toLowerCase()] ||
            formitem.is && this.renderField(formitem.is, formitem.prop, formitem.attrs)
          }
        </s-form-item>
      )
    },
    /**
     * @description: 根据时间组件type类型 获取value-format格式
     * @param {string} type 时间组件类型
     * @return {string} 组件value-format格式
     */
    getDateFormat (type) {
      let defaultFormat = {
        year: 'yyyy',
        month: 'yyyy-MM',
        monthrange: 'yyyy-MM',
        date: 'yyyy-MM-dd',
        dates: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        week: 'yyyy 第 WW 周',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        datetimerange: 'yyyy-MM-dd HH:mm:ss',
      }
      return defaultFormat[type]
    },
    /**
     * @description: 根据组件名称 动态返回渲染的JSX组件
     * @param {String} componentName 组件名称 
     * @param {String} key 绑定组件form中的key值
     * @param {Object} attrs 组件的绑定属性
     * @return {} 需要渲染的JSX 
     */
    renderField (componentName, key, attrs = {}) {
      switch(componentName) {
        case 'text':
          return (
            <div class="field_text">
              { this.model[key] }
            </div>
          )
        case 'input':
          return (
            <s-input
              {
                ...{
                  attrs: {
                    ...attrs,
                    readonly: typeof attrs.readonly !== 'undefined' ? attrs.readonly : attrs.icon ? true : false,
                    value: this.model[key]
                  },
                  on: {
                    input: (v) => {
                      this.handleChange(componentName, key, v, attrs)
                    }
                  }
                }
              }
            >
              {
                attrs.icon && <s-button icon={attrs.icon} slot="append" {...{
                  on: {
                    click: () => {
                      typeof attrs.onClick !== 'function' && attrs.onClick()
                    }
                  }
                }}></s-button>
              }
            </s-input>
          )
        case 'radio':
          return <s-radio-con
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-radio-con>
        case 'checkbox':
          return <s-checkbox-con
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-checkbox-con>
        case 'select':
          return <s-select-con
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-select-con>
        case 'treeselect':
          return <s-treeselect
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    console.log('vvvvv', v)
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-treeselect>
        case 'input-number':
          return <s-input-number
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-input-number>
        case 'cascader':
          return <s-cascader
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-cascader>
        case 'switch':
          return <s-switch
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-switch>
        case 'slider':
          return <s-slider
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-slider>
        case 'time-select':
          return <s-time-select
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: attrs.valueFormat || 'HH:mm:ss',
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-time-select>
        case 'time-picker':
          return <s-time-picker
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: attrs.valueFormat || 'HH:mm:ss',
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-time-picker>
        case 'date-picker':

          return <s-date-picker
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: this.getDateFormat(attrs.type),
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-date-picker>
        case 'rate':
          return <s-rate
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-rate>
        case 'transfer':
          return <s-transfer
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.model[key]
                },
                on: {
                  input: (v) => {
                    this.model[key] !== v && this.handleChange(componentName, key, v, attrs)
                  }
                }
              }
            }
            ></s-transfer>
        case 'upload': {
          let {
            props, // 后台文件名/文件地址对应的key值（根据该key值组合组件需要的数据）
            listType = 'text', // fileList显示形式
            buttonText, // listType为text/picture时，传递的按钮文字信息
            buttonText2, // autoUpload为false时，传递的按钮上传文字信息
            iconClass = 'el-icon-plus', // listType为picture-card时，传递的icon类名
            tip, // 提示信息
            drag = false, // 是否拖拽上传
            autoUpload = true // 是否自动上传
          } = attrs
          // 如果为拖拽上传，并且listType为picture-card，则将fileList显示形式强制设定为picture显示模式
          // ;(drag && !autoUpload) && listType === 'picture-card' && (attrs.listType = listType = 'picture')

          // console.log('listType, buttonText, buttonText2, iconClass, drag, autoUpload')
          // console.log(listType, buttonText, buttonText2, iconClass, drag, autoUpload)

          let fileList = this.setFileValue(this.model[key], props)
          let uploadScopedSlots = this.$scopedSlots['upload_default_' + key.toLowerCase()]

          let fileSlots = this.$scopedSlots['upload_file_' + key.toLowerCase()]
          return <s-upload
            ref={'upload_' + key}
            {
              ...{
                attrs: {
                  ...attrs,
                  fileList,
                  onSuccess: (response, file, fileList = []) => {
                    attrs.onSuccess && attrs.onSuccess(response, file, fileList)
                    this.handleFileChange(componentName, key, fileList, attrs)
                  },
                  onError: (err, file, fileList) => {
                    attrs.onError && attrs.onError(err, file, fileList)
                    this.handleFileChange(componentName, key, fileList, attrs)
                  }
                },
                scopedSlots: fileSlots ? {
                  file: fileSlots
                } : {}
              }
            }
            >
              {
                // 设置default插槽 SFormCon传入默认插槽/组件根据传入参数定义两种默认插槽
                uploadScopedSlots && uploadScopedSlots({callback: () => {
                  return this.$refs['upload_' + key]
                }}) || this.renderUploadSlot(
                  listType, // fileList显示形式
                  buttonText, // listType为text/picture时，传递的按钮文字信息
                  buttonText2, // autoUpload为false时，传递的按钮上传文字信息
                  iconClass, // listType为picture-card时，传递的icon类名
                  drag, // 是否拖拽上传
                  autoUpload // 是否自动上传
                )
              }
              {
                // 设置了手动上传 添加trigger插槽
                !autoUpload && (
                  <s-button slot="trigger" type="primary">{ buttonText || '选取文件' }</s-button>
                )
              }
              {
                // tip 说明
                !!tip && (
                  <div slot="tip" class="el-upload__tip">{tip}</div>
                )
              }
            </s-upload>
        }
      }
    },
    /**
     * @description: 根据attrs属性配置返回upload的default插槽内容
     * @param {string} listType fileList显示形式
     * @param {string} buttonText listType为text/picture时，传递的按钮文字信息
     * @param {string} buttonText2 autoUpload为false时，传递的按钮上传文字信息
     * @param {string} iconClass listType为picture-card时，传递的icon类名
     * @param {string} drag 是否拖拽上传
     * @param {string} autoUpload 是否自动上传
     * @return {} 返回渲染的插槽JSX
     */    
    renderUploadSlot (listType, buttonText, buttonText2, iconClass, drag, autoUpload) {
      if (drag) {
        return <span>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </span>
      }
      if (!autoUpload) {
        return <s-button
          style="margin-left: 10px;"
          type="success" vOn:click={() => {
            this.$refs.upload.submit()
          }}>{ buttonText2 || '上传到服务器' }</s-button>
      }
      if (listType === 'picture-card') {
        return <i class={ iconClass || 'el-icon-upload' }></i>
      }
      return <s-button type="primary">{ buttonText || '点击上传' }</s-button>
    },
    /**
     * @description: 根据attrs.props配置进行数据转换 设置文件上传组件 fileList绑定值
     * @param {array} fileList 传入的默认文件列表
     * @return {array} 返回组件需要的数据结构
     */
    setFileValue (fileList = [], { name = 'name', url = 'url' } = {}) {
      if (name === 'name' && url === 'url') {
        return fileList
      }
      return fileList.map(item => Object.assign(item, {
        name: item[name],
        url: item[url]
      }))
    },
    /**
     * @description: 文件上传状态监听
     * 通过循环uploadFileList中的status来进行判断，任意一项的status部位uploading，表示上传完毕
     * 更新form中的绑定值
     * 执行attrs中传入上传完毕监听函数onFilished
     * @param {string} componentType 组件名
     * @param {string} key form绑定数据的键值
     * @param {array} uploadFileList 文件变更列表
     * @param {object} attrs 传入upload组件的其他属性
     */
    handleFileChange (componentType, key, uploadFileList = [], attrs) {
      let onFinished = typeof attrs.onFinished === 'function' && attrs.onFinished || function () {}
      let i = 0, item, fileList = []
      while (item = uploadFileList[i], i < uploadFileList.length) {
        if (item.status === 'uploading') {
          // 文件未上传完 直接返回
          return
        } else if (item.status === 'success') {
          // 文件上传成功
          fileList.push(item.response && typeof item.response === 'object' ? Object.assign(item, item.response) : item)
        } else {
          // 文件上传失败 会自动删除uploadFileList中的文件
        }
        i++
      }
      onFinished(fileList, key)
      this.handleChange(componentType, key, fileList, attrs)
    }
  },
  component: {
    // SForm,
    // SFormItem
  }
}