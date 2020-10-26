/*
 * @Author: PT
 * @Date: 2020-09-28 12:03:44
 * @LastEditors: PT
 * @LastEditTime: 2020-10-26 17:27:32
 * @Description: 入口文件
 */

// 只加载s-开头的文件夹的组件
const files = require.context('../packages', true, /^\.\/s-((?!(loading|message|message-box|notification)).)*\/index.js$/)
import SLoading from '../packages/s-loading'
import SMessage from '../packages/s-message'
import SMessageBox from '../packages/s-message-box'
import SNotification from '../packages/s-notification'
import '../packages/styles/base'

const autoInjectComponents = {}
files.keys().forEach(key => {
  let component = files(key).default
  component && (autoInjectComponents[component.name] = component)
})
// 全局注入组件
const install = function (Vue, opts = {}) { // , opts = {}
  typeof window !== 'undefined' && opts.theme && window.document.documentElement.setAttribute( 'data-theme', opts.theme)
  for (let componentName in autoInjectComponents) {
    Vue.component(componentName, autoInjectComponents[componentName])
  }

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000,
    theme: opts.theme || 'light'
  }

  Vue.use(SLoading.directive)
  Vue.prototype.$loading = SLoading.service
  Vue.prototype.$message = SMessage
  Vue.prototype.$msgbox = SMessageBox
  Vue.prototype.$alert = SMessageBox.alert
  Vue.prototype.$confirm = SMessageBox.confirm
  Vue.prototype.$prompt = SMessageBox.prompt
  Vue.prototype.$notify = SNotification
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...autoInjectComponents,
  SLoading,
  SMessage,
  SMessageBox,
  SNotification
}