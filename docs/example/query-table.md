---
pageClass: custom-querytable
---

## 查询表格
根据STableCon、SQueryForm组合的一个示例

:::demo
```html
  <template>
    <div class="service-page">
      <s-form-con
        ref="form"
        :model="form"
        :columns="3"
        is-query-form
        :fields="fields"
        size="small"
        label-width="80px"
        @query="handleQuery"
        @reset="handleReset"
        style="margin-top: 20px;">
      </s-form-con>
      <div style="flex: 1">
        <s-table-con
          ref="table"
          :data="tableData"
          :columns="columns"
          observe-selector=".service-page"
          show-pagination
          auto-height
          table-header-dragable
          border>
        </s-table-con>
      </div>
    </div>
  </template>

  <script>
    export default {
      data() {
        const tempData = {
          '1': {
            pageNo: 1,
            pageSize: 10,
            total: 28,
            list: [
              { id: '1-1', date: '2016-05-02', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1518 弄' },
              { id: '1-2', date: '2016-05-04', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1517 弄' },
              { id: '1-3', date: '2016-05-01', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1519 弄' }, 
              { id: '1-4', date: '2016-05-03', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1516 弄' }
            ]
          },
          '2': {
            pageNo: 1,
            pageSize: 10,
            total: 28,
            list: [
              { id: '2-1', date: '2016-05-02', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1518 弄' },
              { id: '2-2', date: '2016-05-04', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1517 弄' },
              { id: '2-3', date: '2016-05-01', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1519 弄' }, 
              { id: '2-4', date: '2016-05-03', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1516 弄' }
            ]
          },
          '3': {
            pageNo: 1,
            pageSize: 10,
            total: 28,
            list: [
              { id: '3-1', date: '2016-05-02', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1518 弄' },
              { id: '3-2', date: '2016-05-04', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1517 弄' }
            ]
          },
        }
        return {
          columns: [
            { label: 'ID', prop: 'id', width: 55 },
            { label: '日期', prop: 'date', width: 180 },
            { label: '姓名', prop: 'name', width: 180 },
            { label: '详细地址',
              children: [
                { label: '省份', prop: 'province', width: 180 },
                { label: '地址', prop: 'address' },
              ]
            }
          ],
          tableData: params => {
            console.log('分页参数', Object.assign({},params, this.form)) // params会自动添加对应的分页参数【表格其他参数也可在此处添加】
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(tempData[params.pageNo])
              }, 1000)
            })
          },
          form: {
            username: '',
            username2: '',
            sex: '',
            subject: null,
            time: ''
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
            { prop: 'subject', label: '科目', is: 'treeselect', attrs: { options: [], alwaysOpen: false, zIndex: 1002, multiple: true } },
            { prop: 'time', label: '时间', is: 'time-select', attrs: {
              pickerOptions: {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              },  placeholder: '选择时间' },
            }
          ],
        }
      },
      mounted () {
        import('../adv-component/utils').then(module => {
          this.fields[3].attrs.options.push(...module.options2)
        })
      },
      methods: {
        handleQuery() {
          // alert('点击了查询按钮')
          this.$refs.table.refresh(true)
          this.$refs.form.setFold(true)
        },
        handleReset () {
          // alert('点击了重置按钮')
          this.$refs.table.refresh(true)
        },
      }
    }
  </script>
```
:::