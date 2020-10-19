/*
 * @Author: PT
 * @Date: 2020-10-17 19:14:45
 * @LastEditors: PT
 * @LastEditTime: 2020-10-19 10:39:33
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
    // 渲染formitem
    renderFormItem (formitem = {}) {
      return (
        <s-form-item
          style={{width: this.formitemWidth}}
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
    
    /**
     * @description: 根据组件名称 动态返回渲染的JSX组件
     * @param {String} componentName 组件名称 
     * @param {String} key 绑定组件form中的key值
     * @param {Object} attrs 组件的绑定属性
     * @return {} 需要渲染的JSX 
     */
    renderField (componentName, key, attrs = {}) {
      console.log(componentName, key, attrs, '====')
      switch(componentName) {
        case 'input': // OK
          return <s-input vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-input>
        case 'radio': // TODO
          return <s-radio-con vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-radio-con>
        case 'checkbox': // TODO
          return <s-checkbox-con vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-checkbox-con>
        case 'select': // OK
          return <s-select-con vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-select-con>
        case 'input-number':
          return <s-input-number vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-input-number>
        case 'cascader':
          return <s-cascader vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-cascader>
        case 'switch':
          return <s-switch vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-switch>
        case 'slider':
          return <s-slider vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-slider>
        case 'time-select':
          return <s-time-select vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-time-select>
        case 'time-picker':
          return <s-time-picker vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-time-picker>
        case 'date-picker':
          return <s-date-picker vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-date-picker>
        case 'rate':
          return <s-rate vModel={this.value[key]}
            {
              ...{ attrs }
            }
            ></s-rate>
        case 'transfer':
          return <s-transfer vModel={this.value[key]}
            {
              ...{ attrs }
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