## FormCon 表单

由数据配置输入框、选择器、单选框、多选框等控件


### 完整表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 FormCon 组件中，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<s-form-con v-model="controlForm" columns="2" :fields="confields" label-width="80px"></s-form-con>

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
          sex: '',
          age: '',
          hobby: '',
          organization: '',
          subject: [],
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
        },
        fields: [
          { prop: 'username', label: '姓名', is: 'input', attrs: { placeholder: '请输入姓名' } },
          { prop: 'sex', label: '性别', is: 'select', attrs: { placeholder: '请选择性别',
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
          }
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
            attrs: {
              options: [ '是', '否' ]
            }
          },
          {
            prop: 'size',
            label: '尺寸',
            is: 'radio',
            attrs: {
              options: [
                { label: '',  content: '默认'},
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
        this.fields[6].attrs.options.push(...module.options)
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
```
:::