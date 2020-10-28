## CheckboxCon 多选框组
一组备选项中进行多选

:::warning 注意
该组件依赖 `SCheckbox` 、 `SCheckboxButton` 、 `SCheckboxGroup` 组件

按需引入时，需要引入依赖的组件
`import { SCheckbox, SCheckboxButton, SCheckboxGroup } from 'con-ui'`
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
通过`options`配置来渲染选项列表


:::demo `s-checkbox-con`元素能把多个 checkbox 管理为一组，只需要在组件中使用`v-model`绑定`Array`类型的变量即可。 `options` 中每项的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<template>
  <s-checkbox-con
    v-model="checkList"
    :options="options">
  </s-checkbox-con>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['选中且禁用','复选框 A'],
        options: [
          { label: '复选框 A' },
          { label: '复选框 B' },
          { label: '复选框 C' },
          { label: '禁用', disabled: true },
          { label: '选中且禁用', disabled: true },
        ]
      };
    }
  };
</script>
```
:::

### 多选框组(绑定值为字符串)

通过`delimiter`配置值的连接符（默认为`,`）

:::demo 

```html
<template>
  <s-checkbox-con
    v-model="checkValue"
    delimiter="-"
    :options="options" @change="handleChange">
  </s-checkbox-con>
</template>

<script>
  export default {
    data () {
      return {
        checkValue: '选中且禁用-复选框 A',
        options: [
          { label: '复选框 A' },
          { label: '复选框 B' },
          { label: '复选框 C' },
          { label: '禁用', disabled: true },
          { label: '选中且禁用', disabled: true },
        ]
      };
    },
    methods: {
      handleChange (v) {
        console.log(v, '000')
      }
    }
  };
</script>
```
:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

```html
<template>
  <s-checkbox-con 
    v-model="checkedCities"
    :options="cities"
    :min="1"
    :max="2">
    <s-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</s-checkbox>
  </s-checkbox-con>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkedCities: ['上海', '北京'],
        cities: cityOptions
      };
    }
  };
</script>
```

:::

### 按钮样式

按钮样式的多选组合。

:::demo 只需要把`options`配置添加为`is: checkbox-button` 配置即可。
```html
<template>
  <div>
    <s-checkbox-con
      v-model="checkboxGroup1"
      :options="cities">
    </s-checkbox-con>
  </div>
  <div style="margin-top: 20px">
    <s-checkbox-con
      v-model="checkboxGroup2"
      :options="cities"
      size="medium">
    </s-checkbox-con>
  </div>
  <div style="margin-top: 20px">
    <s-checkbox-con
      v-model="checkboxGroup3"
      :options="cities3"
      size="small">
    </s-checkbox-con>
  </div>
  <div style="margin-top: 20px">
    <s-checkbox-con
      v-model="checkboxGroup4"
      :options="cities"
      size="mini"
      disabled>
    </s-checkbox-con>
  </div>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data () {
      return {
        checkboxGroup1: ['上海'],
        checkboxGroup2: ['上海'],
        checkboxGroup3: ['上海'],
        checkboxGroup4: ['上海'],
        cities: [
          {
            is: 'checkbox-button',
            label: '上海'
          },
          '北京', '广州', '深圳'
        ],
        cities3: [
          {
            is: 'checkbox-button',
            label: '上海'
          },
          {
            label: '北京',
            disabled: true
          }, '广州', '深圳'
        ]
      };
    }
  }
</script>
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的多选框。
```html
<template> 
  <div>
    <s-checkbox-con
      v-model="checkboxGroup"
      :options="options"
      >
    </s-checkbox-con>
  </div>
  <div style="margin-top: 20px">
    <s-checkbox-con
      v-model="checkboxGroup1"
      :options="options1"
      size="small">
    </s-checkbox-con>
  </div>
  <div style="margin-top: 20px">
    <s-checkbox-con
      v-model="checkboxGroup2"
      :options="options"
      size="mini"
      disabled>
    </s-checkbox-con>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checkboxGroup: [],
        checkboxGroup1: [],
        checkboxGroup2: [],
        options: [ { label: '备选项1', border: true }, { label: '备选项2' } ],
        options1: [ { label: '备选项1', border: true }, { label: '备选项2', disabled: true } ]
      };
    }
  }
</script>
```
:::

### CheckboxCon Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | array | — | — |
| delimiter | 当value为string时，配置选中项值的连接符 | string | — | `,` |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色    | string   | — | #409EFF   |
| options  | 选项配置列表    | array   | — | —   |

### CheckboxCon options Attributes
>option如果为string，组件认为是label配置 即 `{label: ''}`

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is | 选项所使用的组件 | string | checkbox / checkbox-button | checkbox |
| label     | 选中状态的值   | string / number / boolean    |       —        |      —   |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| content | 选项显示名称（没有以label显示） | string    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框（仅对checkbox有效）  | boolean   | — | false   |
| size  | Checkbox 的尺寸，仅在 { is: checkbox, border: true } 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |
