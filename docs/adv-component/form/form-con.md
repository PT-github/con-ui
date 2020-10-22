## FormCon 表单

由数据配置输入框、选择器、单选框、多选框等控件。
组件在SForm功能的基础上新加fields配置，通过数据配置动态渲染SForm下的SFormItem


### 完整表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 FormCon 组件中，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<s-form-con class="control-form" size="small" v-model="controlForm" columns="2" :fields="confields" label-width="80px"></s-form-con>

<s-form-con
  ref="form"
  v-model="form"
  columns="2"
  :fields="fields"
  :disabled="controlForm.disabled"
  :size="controlForm.size"
  :rules="rules"
  label-width="100px"
  style="margin-top: 20px;">
  <template v-slot:field_custome>
    <span>
      <s-tag>标签一</s-tag>
      <s-tag type="success">标签二</s-tag>
      <s-tag type="info">标签三</s-tag>
      <s-tag type="warning">标签四</s-tag>
      <s-tag type="danger">标签五</s-tag>
    </span>
  </template>
  <!-- upload的默认插槽
    <template v-slot:upload_default_fileList="{callback}">
      <s-button type="primary" @click="callback().submit()">自定义上传</s-button>
    </template>
  -->
  <div slot="upload_file_filelist2" slot-scope="{file}">
    <img
      class="el-upload-list__item-thumbnail"
      :src="file.url" alt=""
    >
    <span class="el-upload-list__item-actions">
      <span
        class="el-upload-list__item-preview"
        @click="handlePictureCardPreview(file)"
      >
        <i class="el-icon-zoom-in"></i>
      </span>
      <span
        v-if="!disabled"
        class="el-upload-list__item-delete"
        @click="handleDownload(file)"
      >
        <i class="el-icon-download"></i>
      </span>
      <span
        v-if="!disabled"
        class="el-upload-list__item-delete"
        @click="handleRemove(file)"
      >
        <i class="el-icon-delete"></i>
      </span>
    </span>
  </div>
</s-form-con>
<script>
  export default {
    data() {
      return {
        disabled: false,
        form: {
          username: '',
          username2: '',
          sex: '',
          age: '',
          hobby: '',
          organization: '',
          subject: [],
          subject2: null,
          slider: 97,
          time: '',
          time2: '',
          date: '',
          rate: 1,
          fileList: [
            {name: '文件一', url: 'http://localhost:8080/logo.png'},
            {name: '文件二', url: 'http://localhost:8080/logo.png'}
          ],
          fileList2: [
            {name1: '文件一', url1: 'http://localhost:8080/logo.png'},
            {name1: '文件二', url1: 'http://localhost:8080/logo.png'}
          ],
          custome: ''
        },
        fields: [
          { prop: 'username', label: '姓名', is: 'input', attrs: { onChange (v) {console.log(v)},placeholder: '请输入姓名' } },
          { prop: 'username2', label: '复合', is: 'input', attrs: { onChange (v) {console.log(v)},onClick () {alert('点击搜索')},placeholder: '请选择', icon: 'el-icon-search' } },
          { prop: 'sex', label: '性别', is: 'select', attrs: { onChange (v) {console.log(v)},  placeholder: '请选择性别',
              options: [
                { label: '男', value: '0' },
                { label: '女', value: '1' },
              ]
            }
          },
          { prop: 'age', label: '年龄', is: 'input-number', attrs: { controlsPosition:"right" } },
          { prop: 'marriage', label: '婚姻', is: 'radio', attrs: { options: [ '已婚', '未婚' ] } },
          { prop: 'hobby', width: '100%', label: '爱好', is: 'checkbox', attrs: {
            delimiter: '-',
            options: [ '篮球', '足球', '羽毛球', '乒乓球' ] }
          },
          { prop: 'organization', width: '100%', label: '党员', is: 'switch' },
          { prop: 'subject', label: '科目', is: 'cascader', attrs: { options: [], clearable: true } },
          { prop: 'subject2', label: '科目', is: 'treeselect', attrs: { options: [], alwaysOpen: false, zIndex: 1002, multiple: true } },
          { prop: 'slider', width: '100%', label: '信息完成度', is: 'slider' },
          { prop: 'time', label: '时间', is: 'time-select', attrs: {
            pickerOptions: {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            },  placeholder: '选择时间' },
          },
          { prop: 'time2', label: '时间2', is: 'time-picker', attrs: {
            isRange: true,
            pickerOptions: {
              selectableRange: '18:30:00 - 20:30:00'
            }, placeholder: '选择时间' } },
          { prop: 'date', label: '日期', is: 'date-picker', attrs: { type: 'date', placeholder: '选择时间' } },
          { prop: 'daterange', label: '日期区间', is: 'date-picker', attrs: { type: 'daterange', placeholder: '选择时间' } },
          { prop: 'rate', label: '评分', is: 'rate', attrs: { showText: true } },
          { prop: 'fileList', width: '100%', label: '文件', is: 'upload', attrs: { 
              action: 'https://jsonplaceholder.typicode.com/posts/',
              multiple: true,
              // 文件名和文件路径对应后台接口返回字段
              // props: {
              //   name: 'name1',
              //   url: 'url1'
              // },
              // autoUpload: false,
              // drag: true,
              listType: 'picture',
              // listType: 'picture-card',
              buttonText: '选择文件',
              buttonText2: '开始上传',
              tip: '文件不超过500kb',
              iconClass: 'el-icon-plus',
              onSuccess (_, file) {
                console.log(file.name, '文件上传成功')
              },
              onError (_, file) {
                console.log(file.name, '上传失败')
              }
            }
          },
          { prop: 'fileList2', width: '100%', label: '文件', is: 'upload', attrs: { 
              action: 'https://jsonplaceholder.typicode.com/posts/',
              multiple: true,
              // 文件名和文件路径对应后台接口返回字段
              props: {
                name: 'name1',
                url: 'url1'
              },
              // autoUpload: false,
              // drag: true,
              listType: 'picture-card',
              // listType: 'picture-card',
              buttonText: '选择文件',
              buttonText2: '开始上传',
              tip: '文件不超过500kb',
              iconClass: 'el-icon-plus',
              onSuccess (_, file) {
                console.log(file.name, '文件上传成功')
              },
              onError (_, file) {
                console.log(file.name, '上传失败')
              }
            }
          },
          { prop: 'custome', label: '自定义'},
        ],
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'change' }
          ]
        },
        controlForm: {
          disabled: false,
          size: ''
        },
        confields: [
          {
            prop: 'disabled',
            label: '是否禁用',
            is: 'radio',
            width: '200px',
            attrs: {
              options: [
                { is: 'radio-button', label: true,  content: '是'},
                { label: false,  content: '否'},
              ]
            }
          },
          {
            prop: 'size',
            label: '尺寸大小',
            is: 'radio',
            attrs: {
              options: [
                { is: 'radio-button', label: '',  content: '默认'},
                { label: 'medium',  content: 'medium'},
                { label: 'small',  content: 'small'},
                { label: 'mini',  content: 'mini'},
              ]
            }
          }
        ]
      }
    },
    mounted () {
      import('../utils').then(module => {
        this.fields[7].attrs.options.push(...module.options)
      })
      import('../utils').then(module => {
        this.fields[8].attrs.options.push(...module.options2)
      })
    },
    methods: {
      handlePictureCardPreview () {},
      handleDownload () {},
      handleRemove () {},
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
.control-form {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  padding: 22px 10px 0;
}
.custome-form-item .el-form-item__content {
  line-height: 40px;
}
</style>
```
:::


### SFormCon Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value/ v-model   | 表单数据对象 | object      |                  —                |  — |
| columns   | 每行显示多少列 | number      |                  —                |  1 |
| fields   | 每个formitem配置[详见下表](/adv-component/form/form-con.html#sformcon-fields-attributes) | array      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### SFormCon fields Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `value` 中的字段 | — |
| is | 需要显示的组件类型(未设置，可自定义插槽传入组件) | string | input / select / input-number / radio / checkbox / switch / cascader / slider / time-select / time-picker / date-picker / upload | — |
| attrs | 针对is配置的组件类型，对应组件的配置 | object | — | {} |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |


:::warning 说明
`is`配置：如果未设置该属性，可以通过设置插槽（插槽名：`field_` + `prop`配置）
`attrs`配置：该配置需要配置`is`配置。例如`is`配置的是`input`，对应attrs的所有配置即是针对[SInput](/component/form/input.html#input-attributes)的配置
:::

#### SFormCon fields attrs Attributes
| is      | attr针对的组件配置 |
|---------- |-------------- |
| input | 添加icon配置时，展示复合型输入框。其他配置请参照[SInput](/component/form/input.html#input-attributes)  |
| select | [SSelectCon](/adv-component/form/select-con.html#selectcon-attributes)  |
| input-number | [SInputNumber](/component/form/input-number.html#inputnumber-attributes)  |
| radio | [SRadioCon](/adv-component/form/radio-con.html#radiocon-attributes)  |
| checkbox | [SCheckboxCon](/adv-component/form/checkbox-con.html#checkboxcon-attributes)  |
| switch | [Switch](/component/form/switch.html#switch-attributes)  |
| treeselect | [STreeselect](/adv-component/form/treeselect.html#treeselect-attributes)  |
| cascader | [SCascader](/component/form/cascader.html#cascader-attributes)  |
| slider | [SSlider](/component/form/slider.html#slider-attributes)  |
| time-select | [STimeSelect](/component/form/time-picker.html#time-select-options)  |
| time-picker | [STimePicker](/component/form/input.html#time-picker-options)  |
| date-picker | [SDatePicker](/component/form/date-picker.html#datepicker-attributes)  |
| upload | [SUpload](/component/form/upload.html#upload-attribute)  |

:::tip 友情提示
针对fields中任意一项可通过配置onChange: function (v) {} 来监听数据发生变化，来满足业务的其他联动需求
:::

### SFormCon Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string)

### SFormCon Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| change | 任一表单项数据发生变化后触发 | 改变后form绑定的对象，被改变的表单项 prop 值 |

### SFormCon Slots
| name | 说明 |
|------|--------|
| field_ + fields中props | is未配置时，自定义field内容显示 |
| upload_default_ + fields中props | is是upload时，对应upload的default插槽 |


### SFormCon scopedSlots
| name | 说明 |
|------|--------|
| upload_file_ + fields中props | is是upload时，对应upload的file作用域插槽 |