---
pageClass: custom-radio
---
## RadioCon 单选框组
通过数据配置选项列

:::warning 注意
该组件依赖 `SRadio` 、 `SRadioButton` 、 `SRadioGroup` 组件

按需引入时，需要引入依赖的组件
`import { SRadio, SRadioButton, SRadioGroup } from 'con-ui'`
:::

### 单选框组

适用于在多个互斥的选项中选择的场景，通过`options`配置来渲染选项列表


:::demo 结合`s-radio-con`元素，并配置`options`可以实现单选组，在`s-radio-con`中绑定`v-model`，在`options`中设置好`label`即可。

```html
<template>
  <s-radio-con
    v-model="radio"
    :options="options">
  </s-radio-con>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3,
        options: [
          {
            label: 3,
            content: '备选项3'
          },
          {
            label: 6,
            content: '备选项6'
          },
          {
            label: 9,
            content: '备选项9'
          },
        ]
      };
    }
  }
</script>
```
:::

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`options`配置的`第一项`添加`is: radio-button`配置即可。
```html
<template>
  <div>
    <s-radio-con
      v-model="radio1"
      :options="options">
    </s-radio-con>
  </div>
  <div style="margin-top: 20px">
    <s-radio-con
    v-model="radio2"
    size="medium"
    :options="options">
    </s-radio-con>
  </div>
  <div style="margin-top: 20px">
    <s-radio-con
      v-model="radio3"
      size="small"
      :options="options2">
    </s-radio-con>
  </div>
  <div style="margin-top: 20px">
    <s-radio-con
      v-model="radio4"
      disabled
      size="mini"
      :options="options">
    </s-radio-con>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '上海',
        radio2: '上海',
        radio3: '上海',
        radio4: '上海',
        options: [
          { is: 'radio-button', label: '上海' },
          { is: 'radio-button', label: '北京' },
          { is: 'radio-button', label: '广州' },
          { is: 'radio-button', label: '深圳' }
        ],
        options2: [
          { is: 'radio-button', label: '上海' },
          { is: 'radio-button', label: '北京', disabled: true },
          { is: 'radio-button', label: '广州', disabled: true },
          { is: 'radio-button', label: '深圳' }
        ],
      };
    }
  }
</script>
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <div>
    <s-radio-con
      v-model="radio"
      :options="options">
    </s-radio-con>
  </div>
  <div style="margin-top: 20px">
    <s-radio-con
      v-model="radio1"
      :options="options1"
      size="small">
    </s-radio-con>
  </div>
  <div style="margin-top: 20px">
    <s-radio-con
      v-model="radio2"
      :options="options2"
      size="mini"
      disabled>
    </s-radio-con>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1',
        radio1: '1',
        radio2: '1',
        options: [
          { label: '1', border: true, content: '备选项1' },
          { label: '2', content: '备选项2' }
        ],
        options1: [
          { label: '1', border: true, content: '备选项1' },
          { label: '2', content: '备选项2', disabled: true }
        ],
        options2: [
          { label: '1', border: true, content: '备选项1' },
          { label: '2', content: '备选项2' }
        ]
      };
    }
  }
</script>
```
:::

### RadioCon Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |
| options  | 选项配置列表    | array   | — | —   |

### RadioCon options Attributes
>options中如果每项为string，组件认为是label配置 即 `{label: ''}`

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is | 选项所使用的组件 | string | radio / radio-button | radio |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框(当is是radio有效)，只使用options中第一项的border  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在radio border 为真时有效  | string  | medium / small / mini | — |
| content | 选项名称（没有以label显示） | string    |      —         |     —    |
| name | 原生 name 属性 | string    |      —         |     —    |


### RadioCon Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |
