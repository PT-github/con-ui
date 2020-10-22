---
sidebar: false
---
# 开发指南
## 发布版本说明

最新版本：[npm](https://www.npmjs.com/package/con-ui)


## CDN

对于制作原型或学习，你可以这样使用最新版本

```html
<script src="https://unpkg.com/con-ui@1.0.4/lib/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/browse/con-ui@1.0.4/lib/theme-chalk/index.css" />
```
对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

## NPM
在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 [Webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 模块打包器配合使用。

```bash
# 最新稳定版
$ npm install con-ui
```

## 引入 ConUI

你可以引入整个 ConUI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 ConUI。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ConUI from 'con-ui';
import 'con-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ConUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 ConUI 的引入。需要注意的是，样式文件需要单独引入。

### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "component",
      {
        "libraryName": "con-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 SButton 和 SSelect，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { SButton, SSelect } from 'con-ui';
import App from './App.vue';

Vue.component(SButton.name, SButton);
Vue.component(SSelect.name, SSelect);
/* 或写为
 * Vue.use(SButton)
 * Vue.use(SSelect)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/PT-github/con-ui/blob/master/components.json) 为准）

```javascript
import Vue from 'vue';
import {
  SAlert,
  SAutocomplete,
  SAvatar,
  SBacktop,
  SBadge,
  SBreadcrumb,
  SBreadcrumb-item,
  SButton,
  SButton-group,
  SCalendar,
  SCard,
  SCarousel,
  SCarousel-item,
  SCascader,
  SCascader-panel,
  SCheckbox,
  SCheckbox-button,
  SCheckbox-con,
  SCheckbox-group,
  SCol,
  SCollapse,
  SCollapse-item,
  SData-picker,
  SDialog,
  SDivider,
  SDropdown,
  SDropdown-item,
  SDropdown-menu,
  SForm,
  SForm-con,
  SForm-item,
  SIcon,
  SImage,
  SInfinite-scroll,
  SInput,
  SInput-number,
  SLayout,
  SLoading,
  SMenu,
  SMenu-item,
  SMenu-item-group,
  SMessage,
  SMessage-box,
  SNotification,
  SOption,
  SOption-group,
  SPagination,
  SPopconfirm,
  SPopover,
  SProgress,
  SRadio,
  SRadio-button,
  SRadio-con,
  SRadio-group,
  SRate,
  SRow,
  SSelect,
  SSelect-con,
  SSlider,
  SSTep,
  SSTeps,
  SSubmenu,
  SSwitch,
  STab-pane,
  STable,
  STable-column,
  STable-con,
  STabs,
  STag,
  STime-picker,
  STime-select,
  STimeline,
  STimeline-item,
  STooltip,
  STransfer,
  STree,
  STreeselect,
  SUpload
} from 'con-ui';

Vue.use(SAlert)
Vue.use(SAutocomplete)
Vue.use(SAvatar)
Vue.use(SBacktop)
Vue.use(SBadge)
Vue.use(SBreadcrumb)
Vue.use(SBreadcrumb-item)
Vue.use(SButton)
Vue.use(SButton-group)
Vue.use(SCalendar)
Vue.use(SCard)
Vue.use(SCarousel)
Vue.use(SCarousel-item)
Vue.use(SCascader)
Vue.use(SCascader-panel)
Vue.use(SCheckbox)
Vue.use(SCheckbox-button)
Vue.use(SCheckbox-con)
Vue.use(SCheckbox-group)
Vue.use(SCol)
Vue.use(SCollapse)
Vue.use(SCollapse-item)
Vue.use(SData-picker)
Vue.use(SDialog)
Vue.use(SDivider)
Vue.use(SDropdown)
Vue.use(SDropdown-item)
Vue.use(SDropdown-menu)
Vue.use(SForm)
Vue.use(SForm-con)
Vue.use(SForm-item)
Vue.use(SIcon)
Vue.use(SImage)
Vue.use(SInfinite-scroll)
Vue.use(SInput)
Vue.use(SInput-number)
Vue.use(SLayout)
Vue.use(SMenu)
Vue.use(SMenu-item)
Vue.use(SMenu-item-group)
Vue.use(SOption)
Vue.use(SOption-group)
Vue.use(SPagination)
Vue.use(SPopconfirm)
Vue.use(SPopover)
Vue.use(SProgress)
Vue.use(SRadio)
Vue.use(SRadio-button)
Vue.use(SRadio-con)
Vue.use(SRadio-group)
Vue.use(SRate)
Vue.use(SRow)
Vue.use(SSelect)
Vue.use(SSelect-con)
Vue.use(SSlider)
Vue.use(SSTep)
Vue.use(SSTeps)
Vue.use(SSubmenu)
Vue.use(SSwitch)
Vue.use(STab-pane)
Vue.use(STable)
Vue.use(STable-column)
Vue.use(STable-con)
Vue.use(STabs)
Vue.use(STag)
Vue.use(STime-picker)
Vue.use(STime-select)
Vue.use(STimeline)
Vue.use(STimeline-item)
Vue.use(STooltip)
Vue.use(STransfer)
Vue.use(STree)
Vue.use(STreeselect)
Vue.use(SUpload)

Vue.use(SLoading.directive)
Vue.prototype.$loading = SLoading.service
Vue.prototype.$message = SMessage
Vue.prototype.$msgbox = SMessageBox
Vue.prototype.$alert = SMessageBox.alert
Vue.prototype.$confirm = SMessageBox.confirm
Vue.prototype.$prompt = SMessageBox.prompt
Vue.prototype.$notify = SNotification
```

### 全局配置

在引入 ConUI 时，可以传入一个全局配置对象。该对象目前支持 `size` 与 `zIndex` 字段。`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000）。按照引入 ConUI 的方式，具体操作如下：

完整引入 ConUI：

```js
import Vue from 'vue';
import ConUI from 'element-ui';
Vue.use(ConUI, { size: 'small', zIndex: 3000 });
```

按需引入 ConUI：

```js
import Vue from 'vue';
import { SButton } from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(SButton);
```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。

### 开始使用

至此，一个基于 Vue 和 ConUI 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
