<!--
 * @Author: PT
 * @Date: 2020-09-28 11:58:51
 * @LastEditors: PT
 * @LastEditTime: 2020-10-15 22:38:25
 * @Description: 安装依赖
-->
# 项目需要的依赖
```
npm i vue element-ui
npm i async-validator // 校验
npm i @riophae/vue-treeselect //下拉树
```
# docs文档
```
npm i vuepress -D `文档脚手架`
npm i vuepress-plugin-demo-container -D `vue示例`
npm i async-validator@1.11.5 -D `解决vuepress element-ui依赖core-js不一致的问题`
```

# webpack 打包工具
```
npm i webpack webpack-cli -D
```
# loader

## js 转译js/jsx
> babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env

## 代码格式化
> eslint eslint-loader
> ./node_modules/.bin/eslint --init `初始化eslint配置`

## css/scss
> css-loader node-sass postcss-loader sass-loader sass-resources-loader
> mini-css-extract-plugin`css分离`

## vue
> vue-loader

## jsx
@vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

## iconfont 
> url-loader

# optimization
> terser-webpack-plugin `js代码压缩`
> optimize-css-assets-webpack-plugin `css压缩`

:::
修改了vuepress源码中table样式index.styl【排除table:not([class^=el-])】
:::