## TableCon 表格
根据STable、STableColumn、SPagination组合，在原表格拥有功能的基础上，新加翻页显示控制、表头拖拽、表格编辑、列配置和高度自适应

### 基础表格

基础的表格展示用法。

:::demo 当`s-table-con`元素中注入`data`对象数组、`columns`控制列对象数组。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      border>
    </s-table-con>
  </template>

  <script>
    export default {
      data() {
        return {
          columns: [
            { label: '日期', prop: 'date', width: 180 },
            { label: '姓名', prop: 'name', width: 180 },
            { label: '地址', prop: 'address' }
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::

### 带分页表格

:::demo 默认情况下，STableCon 组件是不会显示分页组件的，如果需要，可以使用show-pagination属性，它接受一个Boolean，设置为true即可启用。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      show-pagination
      border>
    </s-table-con>
  </template>

  <script>
    export default {
      data() {
        return {
          columns: [
            { label: '日期', prop: 'date', width: 180 },
            { label: '姓名', prop: 'name', width: 180 },
            { label: '地址', prop: 'address' }
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::

### 自定义列模板和表头

:::demo 默认情况下，STableCon 组件是不会显示分页组件的，如果需要，可以使用show-pagination属性，它接受一个Boolean，设置为true即可启用。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      show-pagination
      border>
      <template v-slot:actionheader="scope">
        <s-input size="small" placeholder="自定义表头" v-model="value"></s-input>
      </template>
      <template v-slot:action="scope">
        <s-button
          size="mini"
          @click="handleClick(scope.$index, scope.row)">编辑</s-button>
        <s-button
          size="mini"
          type="danger"
          @click="handleClick(scope.$index, scope.row)">删除</s-button>
      </template>
    </s-table-con>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '',
          columns: [
            { label: '日期', prop: 'date', width: 180 },
            { label: '姓名', prop: 'name', width: 180 },
            { label: '地址', prop: 'address' },
            { label: '操作', prop: 'action' },
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        handleClick (index, row) {
          console.log(index, row)
        }
      }
    }
  </script>
```
:::

### 表头可拖拽表格

:::demo 默认情况下，STableCon 组件表头是不能进行拖拽的，如果需要，可以使用table-header-dragable属性，它接受一个Boolean，设置为true即可启用（多级表头也适用）。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      show-pagination
      table-header-dragable
      border>
    </s-table-con>
  </template>

  <script>
    export default {
      data() {
        return {
          columns: [
            { label: '日期', prop: 'date', width: 180 },
            { label: '姓名', prop: 'name', width: 180 },
            { label: '详细地址',
              children: [
                { label: '省份', prop: 'province', width: 180 },
                { label: '地址', prop: 'address' },
              ]
            }
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海市',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海市',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海市',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海市',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::

### 表格数据传递函数

:::demo STableCon 组件`data`接收数组和返回promise的函数。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      show-pagination
      table-header-dragable border>
    </s-table-con>
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
            console.log('分页参数', params) // params会自动添加对应的分页参数（分页参数可通过props进行配置）【表格其他参数也可在此处添加】
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(tempData[params.pageNo])
              }, 1000)
            })
          }
        }
      }
    }
  </script>
```
:::

### 表格数据传递函数 ***分页参数配置***
`props`默认值为
```html
{
  pageSize: 'pageSize', // 每页显示条数-对应字段
  total: 'total', // 总条数-对应字段
  pageNo: 'pageNo', // 当前页码-对应字段
  list: 'list' // 列表返回-对应字段
}
```

:::demo STableCon 组件`data`接收数组和返回promise的函数 分页参数配置 `props`。
```html
  <template>
    <s-table-con
      :data="tableData"
      :columns="columns"
      :props="{ pageNo: 'page' }"
      show-pagination
      table-header-dragable
      border>
    </s-table-con>
  </template>

  <script>
    export default {
      data() {
        const tempData = {
          '1': {
            page: 1,
            'pageSize': 10,
            total: 28,
            list: [
              { id: '1-1', date: '2016-05-02', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1518 弄' },
              { id: '1-2', date: '2016-05-04', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1517 弄' },
              { id: '1-3', date: '2016-05-01', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1519 弄' }, 
              { id: '1-4', date: '2016-05-03', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1516 弄' }
            ]
          },
          '2': {
            page: 1,
            'pageSize': 10,
            total: 28,
            list: [
              { id: '2-1', date: '2016-05-02', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1518 弄' },
              { id: '2-2', date: '2016-05-04', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1517 弄' },
              { id: '2-3', date: '2016-05-01', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1519 弄' }, 
              { id: '2-4', date: '2016-05-03', name: '王小虎', province: '上海市', address: '上海市普陀区金沙江路 1516 弄' }
            ]
          },
          '3': {
            page: 1,
            'pageSize': 10,
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
            console.log('分页参数222', params) // params会自动添加对应的分页参数（分页参数可通过props进行配置）【表格其他参数也可在此处添加】
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(tempData[params['page']])
              }, 1000)
            })
          }
        }
      }
    }
  </script>
```
:::

### 表格高度自适应

:::demo STableCon 组件使用`auto-height`属性，即可启用表格根据父容器自适应。
```html
  <template>
    <div style="height: 300px;border: 1px solid #CCCCCC">
      <s-table-con
        :data="tableData"
        :columns="columns"
        show-pagination
        auto-height
        table-header-dragable
        border>
      </s-table-con>
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
            console.log('分页参数', params) // params会自动添加对应的分页参数【表格其他参数也可在此处添加】
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(tempData[params.pageNo])
              }, 1000)
            })
          }
        }
      }
    }
  </script>
```
:::


### TableCon Attributes（此处只列举出新增配置，其他配置与STable保持一致）
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| table-header-dragable | 表头是否可拖拽 | boolean | — | false |
| auto-load | 自动加载表格数据 | boolean | — | true |
| data | 显示的数据 | array/function(当为function时，必须返回promise) | — | — |
| show-pagination | 是否显示分页组件 | boolean | — | false |
| auto-height | 是否根据父容器自适应高度 | boolean | — | false |
| props | 分页配置（针对`data`为`function`时） | object | — | `{ pageSize: 'pageSize', total: 'total', ageNo: 'pageNo', list: 'list'}` |
| columns | 表格列配置，列表中每个对象即对TableColumn进行配置**详见[Table-column Attributes](/component/data/table.html#table-column-attributes)** | array | — | [] |

### TableCon columns配置
| edittype | 编辑类型(设置该字段，单元格可编辑) | input/select | — | — |
列表中每个对象即对TableColumn进行配置**详见[Table-column Attributes](/component/data/table.html#table-column-attributes)**

### TableCon Methods
**详见[Table-column Attributes](/component/data/table.html#table-methods)**

### TableCon Scoped Slot
| name | 说明 |
|------|--------|
| — | 对于自定义列插槽会以column配置中的`prop`指定的值为插槽名，对于自定义表头会议column配置的`prop`指定的值+`header`为插槽名 |