/*
 * @Author: PT
 * @Date: 2020-10-17 19:14:45
 * @LastEditors: PT
 * @LastEditTime: 2020-10-19 17:39:26
 * @Description: SFormCon
 */
import SForm from '../../s-form'
import SFormItem from '../../s-form-item'
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
    value: {

    },
    // 默认行内表单模式
    inline: {
      type: Boolean,
      default: true
    },
    // form下的列数
    columns: {
      type: Number | String,
      default: 1
    }
  },
  render () {
    return (
      <s-form
        vModel={this.value}
        class="s-form-con"
        {
          ...{
            attrs: { ...this.$attrs, inline: this.inline },
            on: { ...this.$listeners }
          }
        }
      >
        { this.fields && this.fields.length > 0 && this.fields.map(formitem => this.renderFormItem(formitem)) }
      </s-form>
    )
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
    }
  },
  methods: {
    /**
     * @description: 绑定组件值change的回调
     * @param {string} componentType 组件类型
     * @param {string} key 绑定值value中的key键值
     * @param {} value 改变后的数据
     * @return {type} 
     */
    handleChange (componentType, key, value) {
      this.value[key] = value
      this.$emit('change', this.value, key)
    },
    // 渲染formitem
    renderFormItem (formitem = {}) {
      return (
        <s-form-item
          style={{width: formitem.width || this.formitemWidth}}
          {
            ...{
              attrs: { ...formitem }
            }
          }
        >
          {
            formitem.is && this.renderField(formitem.is, formitem.prop, formitem.attrs)
          }
        </s-form-item>
      )
    },
    getDateFormat (v) {
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
      return defaultFormat[v]
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
        case 'input':
          return <s-input
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  input: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-input>
        case 'radio':
          return <s-radio-con
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  input: (v) => {
                    this.handleChange(componentName, key, v)
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
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
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
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-select-con>
        case 'input-number':
          return <s-input-number vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  input: (v) => {
                    this.handleChange(componentName, key, v)
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
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
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
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-switch>
        case 'slider':
          return <s-slider vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-slider>
        case 'time-select':
          return <s-time-select vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: attrs.valueFormat || 'HH:mm:ss',
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-time-select>
        case 'time-picker':
          return <s-time-picker vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: attrs.valueFormat || 'HH:mm:ss',
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-time-picker>
        case 'date-picker':

          return <s-date-picker vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  valueFormat: this.getDateFormat(attrs.type),
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-date-picker>
        case 'rate':
          return <s-rate vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-rate>
        case 'transfer':
          return <s-transfer vModel={this.value[key]}
            {
              ...{
                attrs: {
                  ...attrs,
                  value: this.value[key]
                },
                on: {
                  change: (v) => {
                    this.handleChange(componentName, key, v)
                  }
                }
              }
            }
            ></s-transfer>
        case 'upload': // TODO
          return <s-upload vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-upload>
      }
    }
  },
  component: {
    SForm,
    SFormItem
  }
}