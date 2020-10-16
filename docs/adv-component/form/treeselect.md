## Treeselect 下拉树选择器

下拉单选/多选树

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的 `id` 属性值
```html
<template>
  <div style="width: 200px">
    <s-treeselect v-model="value" :options="options" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null,
        options: [ {
          id: 'a',
          label: '父节点',
          children: [ {
            id: 'aa',
            label: '子节点一',
          }, {
            id: 'ab',
            label: '子节点二',
          } ],
        }, {
          id: 'b',
          label: '父节点二',
        }, {
          id: 'c',
          label: '父节点三',
        } ]
      }
    }
  }
</script>
```
:::

### 下拉多选

适用广泛的基础多选
:::demo `v-model`的值为当前被选中的的 `id` 属性值的数组
```html
<template>
  <div style="width: 200px">
    <s-treeselect
      v-model="value"
      :multiple="true"
      :options="options"
      placeholder="请选择你喜欢的"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        options: [ {
          id: 'fruits',
          label: 'Fruits',
          children: [ {
            id: 'apple',
            label: 'Apple 🍎',
            isNew: true,
          }, {
            id: 'grapes',
            label: 'Grapes 🍇',
          }, {
            id: 'pear',
            label: 'Pear 🍐',
          }, {
            id: 'strawberry',
            label: 'Strawberry 🍓',
          }, {
            id: 'watermelon',
            label: 'Watermelon 🍉',
          } ],
        }, {
          id: 'vegetables',
          label: 'Vegetables',
          children: [ {
            id: 'corn',
            label: 'Corn 🌽',
          }, {
            id: 'carrot',
            label: 'Carrot 🥕',
          }, {
            id: 'eggplant',
            label: 'Eggplant 🍆',
          }, {
            id: 'tomato',
            label: 'Tomato 🍅',
          } ],
        } ]
      }
    }
  }
</script>
```
:::

### 尺寸

适用广泛的基础多选
:::demo  可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 small 和 mini 两种尺寸。
```html
<template>
  <div class="demo-size">
    <div class="block">
      <s-treeselect
        v-model="value1"
        :multiple="true"
        :options="options"
        placeholder="请选择你喜欢的"/>
    </div>
    <div class="block">
      <s-treeselect
        size="medium"
        v-model="value2"
        :multiple="true"
        :options="options"
        placeholder="请选择你喜欢的"/>
    </div>
    <div class="block">
      <s-treeselect
        size="small"
        v-model="value3"
        :multiple="true"
        :options="options"
        placeholder="请选择你喜欢的"/>
    </div>
    <div class="block">
      <s-treeselect
        size="mini"
        v-model="value4"
        :multiple="true"
        :options="options"
        placeholder="请选择你喜欢的"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: [ 'fruits' ],
        value2: [ 'fruits'],
        value3: [ 'fruits'],
        value4: [ 'fruits'],
        options: [ {
          id: 'fruits',
          label: 'Fruits',
          children: [ {
            id: 'apple',
            label: 'Apple 🍎',
            isNew: true,
          }, {
            id: 'grapes',
            label: 'Grapes 🍇',
          }, {
            id: 'pear',
            label: 'Pear 🍐',
          }, {
            id: 'strawberry',
            label: 'Strawberry 🍓',
          }, {
            id: 'watermelon',
            label: 'Watermelon 🍉',
          } ],
        }, {
          id: 'vegetables',
          label: 'Vegetables',
          children: [ {
            id: 'corn',
            label: 'Corn 🌽',
          }, {
            id: 'carrot',
            label: 'Carrot 🥕',
          }, {
            id: 'eggplant',
            label: 'Eggplant 🍆',
          }, {
            id: 'tomato',
            label: 'Tomato 🍅',
          } ],
        } ]
      }
    }
  }
</script>
<style>
  .demo-size {
    display: flex;
  }
  .demo-size .block {
    flex: 1;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
  }
</style>
```
:::

### options选项配置
>子节点
```
{
  id: '<id>', // 用于标识树中的选项，因此它的值在所有选项中必须是唯一的
  label: '<label>', // 用于显示选项
}
```
>父节点
```
{
  id: '<id>', // 用于标识树中的选项，因此它的值在所有选项中必须是唯一的
  label: '<label>', // 用于显示选项
  children: [
    id: '<child id>',
    label: '<child label>'
  ]
}
```

### 更多配置
常用属性配置示例

:::demo
```html
<template>
  <div style="width: 500px">
    <s-treeselect
      name="demo"
      :multiple="multiple"
      :clearable="clearable"
      :searchable="searchable"
      :disabled="disabled"
      :open-on-click="openOnClick"
      :open-on-focus="openOnFocus"
      :clear-on-select="clearOnSelect"
      :close-on-select="closeOnSelect"
      :always-open="alwaysOpen"
      :append-to-body="appendToBody"
      :options="options"
      :limit="3"
      :max-height="200"
      v-model="value"
      />
    <p style="margin-top: 20px">
      <s-checkbox v-model="multiple">Multi-select</s-checkbox>
      <s-checkbox v-model="clearable">Clearable</s-checkbox>
      <s-checkbox v-model="searchable">Searchable</s-checkbox>
      <s-checkbox v-model="disabled">Disabled</s-checkbox>
    </p>
    <p>
      <s-checkbox v-model="openOnClick">Open on click</s-checkbox>
      <s-checkbox v-model="openOnFocus">Open on focus</s-checkbox>
    </p>
    <p>
      <s-checkbox v-model="clearOnSelect">Clear on select</s-checkbox>
      <s-checkbox v-model="closeOnSelect">Close on select</s-checkbox>
    </p>
    <p>
      <s-checkbox v-model="alwaysOpen">Always open</s-checkbox>
      <s-checkbox v-model="appendToBody">Append to body</s-checkbox>
    </p>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        multiple: true,
        clearable: true,
        searchable: true,
        disabled: false,
        openOnClick: true,
        openOnFocus: false,
        clearOnSelect: true,
        closeOnSelect: false,
        alwaysOpen: false,
        appendToBody: false,
        rtl: false,
        value: [ ],
        options: []
      }
    },
    mounted () {
      import('../utils').then(module => {
        this.options = module.generateOptions(2, 3)
      })
    },
    watch: {
      multiple(newValue) {
        if (newValue) {
          this.value = this.value ? [ this.value ] : []
        } else {
          this.value = this.value[0]
        }
      },
    }
  }
</script>
```
:::


### Node节点 Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 是否必填 |
|---------- |-------------- |---------- |--------------------------------  |-------- |-------- |
| id | 用于标识树中的选项。它的值在所有选项中必须是唯一的。 | string / number | — | — |是|
| label | 用于显示选项 | string | — | — |是|
| disabled | 是否禁用 | boolean | — | false |否|
| children | 声明一个分枝节点；设置为null用于延迟加载;如果要声明叶节点，请设置children: undefined或直接省略此属性 | node[] / null | — | value |否|
| isDisabled | 用于禁用项目选择 | boolean | - | — |否|
| isNew | 用于为新节点赋予不同的颜色 | boolean | — | - |否|
| isDefaultExpanded | 默认情况下是否应展开此文件夹选项 | boolean | — | - |否|

### Treeselect Attributes
| 参数      | 类型      |   默认值  | 说明                          |
|----------|------|----|-------------------------------- |
| allowClearingDisabled | Boolean | false | 即使禁用了选定的节点，是否也允许重置值。 |
| allowSelectingDisabledDescendants | Boolean | false | 选择/取消选择祖先节点时，是否应该选择/取消选择其禁用的后代。您可能希望将其与 allowClearingDisabled 结合使用。 |
| alwaysOpen | Boolean | false | 菜单是否应始终打开。 |
| appendToBody | Boolean | false | 将菜单追加到 <body />. |
| async | Boolean | false | 是否启用 异步搜索模式. |
| autoFocus | Boolean | false | 自动将组件聚焦在安装座上。 |
| autoLoadRootOptions | Boolean | true | 在装入时自动加载root选项。设置false, 为时，打开菜单时将加载根选项。 |
| autoDeselectAncestors | Boolean | false | 当用户取消选择节点时，将自动取消选择其祖先。仅适用于平面模式。 |
| autoDeselectDescendants | Boolean | false | 当用户取消选择节点时，将自动取消选择其后代。仅适用于平面模式。 |
| autoSelectAncestors | Boolean | false | 当用户选择节点时，将自动选择其祖先。仅适用于平面模式。 |
| autoSelectDescendants | Boolean | false | 当用户选择一个节点时，将自动选择其后代。仅适用于平面模式。 |
| backspaceRemoves | Boolean | true | Backspace如果没有文本输入，是否删除最后一项。 |
| beforeClearAll | function(Boolean | Promise[Boolean])返回Boolean | () => true | 在清除所有输入字段之前处理的功能。返回 false 到要清除的停止值。 |
| branchNodesFirst | Boolean | false | 在叶节点之前显示分支节点。 |
| cacheOptions | Boolean | true | 是否为 异步搜索模式缓存每个搜索请求的结果。 |
| clearable |Boolean | true | 是否显示重置值的“×”按钮。 |
| clearAllText | String | '' | 当:multiple="true"，“×”按钮的标题 . |
| clearOnSelect | Boolean | 当multiple="true"，默认为false；否则是true | 选择选项后是否清除搜索输入。仅在时使用 :multiple="true"。对于单选模式，无论prop值如何，它始终在选择后清除输入。 |
| clearValueText | String | '' | “×”按钮的标题 |
| closeOnSelect | Boolean | true | 选择选项后是否关闭菜单。仅在时使用 :multiple="true". |
| defaultExpandLevel | Number | 0 | 加载时应自动扩展多少级分支节点。设置 Infinity 为默认使所有分支节点扩展。 |
| defaultOptions | Boolean / node[] | false | 在用户开始搜索之前显示的默认选项集。用于 异步搜索模式。设置true为时，将自动加载搜索查询的结果为空字符串。 |
| deleteRemoves | Boolean | true | Delete 如果没有文本输入，是否删除最后一项。 |
| delimiter | String | "," | 用于连接隐藏字段值的多个值的定界符。 |
| flattenSearchResults | Boolean | false | 搜索时是否展平树（仅同步搜索模式）。|
| disableBranchNodes | Boolean | false | 是否阻止选择分支节点。 |
| disabled | Boolean | false | 是否禁用控件。 |
| disableFuzzyMatching | Boolean | false | 设置为true 禁用默认情况下启用的模糊匹配功能。 |
| flat | Boolean | false | 是否启用平面模式。 |
| instanceId | String / Number | "[auto-incrementing number]$$" | 将所有事件作为最后一个参数传递。对于识别事件来源很有用。 |
| joinValues | Boolean | false | 使用 delimiter （旧版模式）将多个值连接到单个表单字段中。 |
| limit | Number | Infinity | 限制所选选项的显示。其余的将隐藏在limitText 字符串中。 |
| limitText | Fn(count)返回String | count => `and ${count} more` | 当所选元素超过定义的限制时处理显示的消息的功能。 |
| loadingText | String | "加载中..." | 加载选项时显示的文本。 |
| loadOptions | Fn({action, callback, parentNode?, instanceId})返回(void | Promise) | –	用于动态加载选项。action可接受的值: "LOAD_ROOT_OPTIONS", "LOAD_CHILDREN_OPTIONS" or "ASYNC_SEARCH"；callback：接受可选 error 参数的函数；parentNode：仅在加载子选项时显示；searchQuery：仅在搜索异步选项时显示；instanceId：instanceId 等于传递给vue-treeselect 的prop 的值 |
| matchKeys | String[] | [ "label" ] | node 要过滤对象的哪些键。 |
| maxHeight | Number | 300 | 设置 maxHeight 菜单的样式值。 |
| multiple | Boolean | false | 设置 true为允许选择多个选项（又名多重选择模式）。 |
| name | String | – | input使用此字段名称为html表单生成一个隐藏标签。 |
| noChildrenText | String | "No sub-options." | 当分支节点没有子节点时显示的文本。 |
| noOptionsText | tring | "No options available." | 没有可用选项时显示的文本。 |
| noResultsText | String | "暂无数据" | 没有匹配的搜索结果时显示的文本。 |
| normalizer | Fn(node, instanceId) 返回 node | node => node | 用于规范化源数据。 |
| openDirection | String | "auto" | 默认情况下（"auto"），菜单将在控件下方打开。如果没有足够的空间，vue-treeselect将自动翻转菜单。可接受的值："auto", "below", "bottom", "above" 或 "top".|
| openOnClick | Boolean | true | 单击控件时是否自动打开菜单。|
| openOnFocus | Boolean | false | 控件聚焦时是否自动打开菜单。|
| options | node[] | – |可用选项的数组。|
| placeholder | String | "请选择" | 字段占位符，无值时显示。|
| required | Boolean | false | required在需要时应用HTML5 属性。|
| retryText | String | "重试加载" |	显示的文本询问用户是否重试加载子项选项。|
| retryTitle | String | "点击重新加载数据" | 重试按钮的标题。|
| searchable | Boolean | true | 是否启用搜索功能。|
| searchNested | Boolean | false | 设置true，则会在所有祖先节点中搜索查询。|
| searchPromptText | String | "输入要查询的数据" | 提示您进行异步搜索的文字提示。用于 异步搜索模式。|
| showCount	| Boolean | false | 在每个分支节点的标签旁边是否显示子项计数。|
| showCountOf | String | "ALL_CHILDREN" | 与showCount一起使用，用以指定应显示的计数类型。可接受的值："ALL_CHILDREN", "ALL_DESCENDANTS", "LEAF_CHILDREN" or "LEAF_DESCENDANTS".|
| showCountOnSearch | Boolean | – | 搜索时显示孩子数。未指定时|
| size | String | 'large' | 组件大小控制。可接受的值："medium", "small", "mini"|
| sortValueBy | String | "ORDER_SELECTED" | 所选选项应按触发顺序显示并按 value 数组排序。仅在:multiple="true"时使用。可接受的值："ORDER_SELECTED", "LEVEL" or "INDEX".|
| tabIndex	| Number| 0 | 控件的Tab索引 |
| value/v-model	 |  id / node / id[] / node[] |  – | 控件的值。multiple="false时应为id或node 对象；multiple="true"时应为 id or node 对象的数组。其格式取决于valueFormat。 | 
| valueConsistsOf	 |  String |  "BRANCH_PRIORITY"	 | value 在多选模式下，数组中应包括哪种节点。可接受的值："ALL", "BRANCH_PRIORITY", "LEAF_PRIORITY" or "ALL_WITH_INDETERMINATE". | 
| valueFormat |  String |  "id"	 | value 道具格式 请注意，设置为"object"，中的每个对象只需要 id & label 属性。可接受的值：或。nodevalue. Acceptable values: "id" or "object". | 
| zIndex	| Number | String | 999 | z-index 菜单中的.|

### Treeselect Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| open | 菜单打开时发出。 | instanceId |
| close | 菜单关闭时发出。 | value, instanceId |
| input | 值更改后发出。 | value, instanceId |
| select | 选择一个选项后发出。 | node, instanceId |
| deselect | 取消选择一个选项后发出 | node, instanceId |
| search-change | 搜索查询更改后发出 | searchQuery, instanceId |

### Treeselect Slots
|   name  |   参数   | 说明     |
|---------|---------|---------------------------------------------|
| option-label | {node, shouldShowCount, count, labelClassName, countClassName} | 自定义选项标签模板的插槽。 |
| value-label | {node} | 自定义值标签模板的插槽。 |
| before-list | - | 插槽内容显示在菜单列表之前。 |
| after-list | - | 插槽内容显示在菜单列表之后 |
