---
pageClass: custom-layout
---
## Layout布局

协助进行页面级整体布局。

:::demo 典型的页面布局。
```html
<div class="layout-item">
  <s-layout>
    <s-layout-header>header</s-layout-header>
    <s-layout-content>content</s-layout-content>
    <s-layout-footer>footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout>
    <s-layout-header>header</s-layout-header>
    <s-layout>
      <s-layout-sider>sider</s-layout-sider>
      <s-layout-content>content</s-layout-content>
    </s-layout>
    <s-layout-footer>footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout>
    <s-layout-header>header</s-layout-header>
    <s-layout>
      <s-layout-content>content</s-layout-content>
      <s-layout-sider>sider</s-layout-sider>
    </s-layout>
    <s-layout-footer>footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout>
    <s-layout-sider>sider</s-layout-sider>
    <s-layout>
      <s-layout-header>header</s-layout-header>
      <s-layout-content>content</s-layout-content>
      <s-layout-footer>footer</s-layout-footer>
    </s-layout>
  </s-layout>
</div>

<style>
  .layout-item {
    height: 250px;
    border: 1px solid #CCC;
  }
  .layout-item + .layout-item {
    margin-top: 20px;
  }
  .layout-item .s-layout {
    text-align: center;
  }
  .layout-item .s-layout-header, .layout-item .s-layout-sider, .layout-item .s-layout-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
```
:::

## 深色背景

:::demo
```html
<div class="layout-item">
  <s-layout theme="dark">
    <s-layout-header>header</s-layout-header>
    <s-layout-content>content</s-layout-content>
    <s-layout-footer>footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout theme="dark">
    <s-layout-header>header</s-layout-header>
    <s-layout theme="dark">
      <s-layout-sider>sider</s-layout-sider>
      <s-layout-content>content</s-layout-content>
    </s-layout>
    <s-layout-footer>footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout>
    <s-layout-header theme="dark">header</s-layout-header>
    <s-layout>
      <s-layout-content theme="dark">content</s-layout-content>
      <s-layout-sider theme="dark">sider</s-layout-sider>
    </s-layout>
    <s-layout-footer theme="dark">footer</s-layout-footer>
  </s-layout>
</div>
<div class="layout-item">
  <s-layout theme="dark">
    <s-layout-sider>sider</s-layout-sider>
    <s-layout>
      <s-layout-header theme="light">header</s-layout-header>
      <s-layout-content>content</s-layout-content>
      <s-layout-footer theme="light">footer</s-layout-footer>
    </s-layout>
  </s-layout>
</div>
```
:::

