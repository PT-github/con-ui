export const strong = str => `<strong>${str}</strong>`

export const link = (target, text = 'here') => `<a href="${target}">${text}</a>`


function createArray (len, valueMaker) {
  const arr = []
  let i = 0
  while (i < len) arr.push(valueMaker(i++))
  return arr
}

export function generateOptions (maxLevel, itemsPerLevel = maxLevel) {
  const generate = parentId => createArray(itemsPerLevel, i => {
    const id = parentId + String.fromCharCode(97 + i)
    const option = { id, label: id.toUpperCase() }
    if (id.length < maxLevel) option.children = generate(id)
    return option
  })

  return generate('')
}

export const options = [{ 'value': 'zhinan', 'label': '指南', 'children': [{ 'value': 'shejiyuanze', 'label': '设计原则', 'children': [{ 'value': 'yizhi', 'label': '一致' }, { 'value': 'fankui', 'label': '反馈' }, { 'value': 'xiaolv', 'label': '效率' }, { 'value': 'kekong', 'label': '可控' }] }, { 'value': 'daohang', 'label': '导航', 'children': [{ 'value': 'cexiangdaohang', 'label': '侧向导航' }, { 'value': 'dingbudaohang', 'label': '顶部导航' }] }] }, { 'value': 'zujian', 'label': '组件', 'children': [{ 'value': 'basic', 'label': 'Basic', 'children': [{ 'value': 'layout', 'label': 'Layout 布局' }, { 'value': 'color', 'label': 'Color 色彩' }, { 'value': 'typography', 'label': 'Typography 字体' }, { 'value': 'icon', 'label': 'Icon 图标' }, { 'value': 'button', 'label': 'Button 按钮' }] }, { 'value': 'form', 'label': 'Form', 'children': [{ 'value': 'radio', 'label': 'Radio 单选框' }, { 'value': 'checkbox', 'label': 'Checkbox 多选框' }, { 'value': 'input', 'label': 'Input 输入框' }, { 'value': 'input-number', 'label': 'InputNumber 计数器' }, { 'value': 'select', 'label': 'Select 选择器' }, { 'value': 'cascader', 'label': 'Cascader 级联选择器' }, { 'value': 'switch', 'label': 'Switch 开关' }, { 'value': 'slider', 'label': 'Slider 滑块' }, { 'value': 'time-picker', 'label': 'TimePicker 时间选择器' }, { 'value': 'date-picker', 'label': 'DatePicker 日期选择器' }, { 'value': 'datetime-picker', 'label': 'DateTimePicker 日期时间选择器' }, { 'value': 'upload', 'label': 'Upload 上传' }, { 'value': 'rate', 'label': 'Rate 评分' }, { 'value': 'form', 'label': 'Form 表单' }] }, { 'value': 'data', 'label': 'Data', 'children': [{ 'value': 'table', 'label': 'Table 表格' }, { 'value': 'tag', 'label': 'Tag 标签' }, { 'value': 'progress', 'label': 'Progress 进度条' }, { 'value': 'tree', 'label': 'Tree 树形控件' }, { 'value': 'pagination', 'label': 'Pagination 分页' }, { 'value': 'badge', 'label': 'Badge 标记' }] }, { 'value': 'notice', 'label': 'Notice', 'children': [{ 'value': 'alert', 'label': 'Alert 警告' }, { 'value': 'loading', 'label': 'Loading 加载' }, { 'value': 'message', 'label': 'Message 消息提示' }, { 'value': 'message-box', 'label': 'MessageBox 弹框' }, { 'value': 'notification', 'label': 'Notification 通知' }] }, { 'value': 'navigation', 'label': 'Navigation', 'children': [{ 'value': 'menu', 'label': 'NavMenu 导航菜单' }, { 'value': 'tabs', 'label': 'Tabs 标签页' }, { 'value': 'breadcrumb', 'label': 'Breadcrumb 面包屑' }, { 'value': 'dropdown', 'label': 'Dropdown 下拉菜单' }, { 'value': 'steps', 'label': 'Steps 步骤条' }] }, { 'value': 'others', 'label': 'Others', 'children': [{ 'value': 'dialog', 'label': 'Dialog 对话框' }, { 'value': 'tooltip', 'label': 'Tooltip 文字提示' }, { 'value': 'popover', 'label': 'Popover 弹出框' }, { 'value': 'card', 'label': 'Card 卡片' }, { 'value': 'carousel', 'label': 'Carousel 走马灯' }, { 'value': 'collapse', 'label': 'Collapse 折叠面板' }] }] }, { 'value': 'ziyuan', 'label': '资源', 'children': [{ 'value': 'axure', 'label': 'Axure Components' }, { 'value': 'sketch', 'label': 'Sketch Templates' }, { 'value': 'jiaohu', 'label': '组件交互文档' }] }]
export const options2 = [{ 'id': 'zhinan', 'label': '指南', 'children': [{ 'id': 'shejiyuanze', 'label': '设计原则', 'children': [{ 'id': 'yizhi', 'label': '一致' }, { 'id': 'fankui', 'label': '反馈' }, { 'id': 'xiaolv', 'label': '效率' }, { 'id': 'kekong', 'label': '可控' }] }, { 'id': 'daohang', 'label': '导航', 'children': [{ 'id': 'cexiangdaohang', 'label': '侧向导航' }, { 'id': 'dingbudaohang', 'label': '顶部导航' }] }] }, { 'id': 'zujian', 'label': '组件', 'children': [{ 'id': 'basic', 'label': 'Basic', 'children': [{ 'id': 'layout', 'label': 'Layout 布局' }, { 'id': 'color', 'label': 'Color 色彩' }, { 'id': 'typography', 'label': 'Typography 字体' }, { 'id': 'icon', 'label': 'Icon 图标' }, { 'id': 'button', 'label': 'Button 按钮' }] }, { 'id': 'form', 'label': 'Form', 'children': [{ 'id': 'radio', 'label': 'Radio 单选框' }, { 'id': 'checkbox', 'label': 'Checkbox 多选框' }, { 'id': 'input', 'label': 'Input 输入框' }, { 'id': 'input-number', 'label': 'InputNumber 计数器' }, { 'id': 'select', 'label': 'Select 选择器' }, { 'id': 'cascader', 'label': 'Cascader 级联选择器' }, { 'id': 'switch', 'label': 'Switch 开关' }, { 'id': 'slider', 'label': 'Slider 滑块' }, { 'id': 'time-picker', 'label': 'TimePicker 时间选择器' }, { 'id': 'date-picker', 'label': 'DatePicker 日期选择器' }, { 'id': 'datetime-picker', 'label': 'DateTimePicker 日期时间选择器' }, { 'id': 'upload', 'label': 'Upload 上传' }, { 'id': 'rate', 'label': 'Rate 评分' }, { 'id': 'form', 'label': 'Form 表单' }] }, { 'id': 'data', 'label': 'Data', 'children': [{ 'id': 'table', 'label': 'Table 表格' }, { 'id': 'tag', 'label': 'Tag 标签' }, { 'id': 'progress', 'label': 'Progress 进度条' }, { 'id': 'tree', 'label': 'Tree 树形控件' }, { 'id': 'pagination', 'label': 'Pagination 分页' }, { 'id': 'badge', 'label': 'Badge 标记' }] }, { 'id': 'notice', 'label': 'Notice', 'children': [{ 'id': 'alert', 'label': 'Alert 警告' }, { 'id': 'loading', 'label': 'Loading 加载' }, { 'id': 'message', 'label': 'Message 消息提示' }, { 'id': 'message-box', 'label': 'MessageBox 弹框' }, { 'id': 'notification', 'label': 'Notification 通知' }] }, { 'id': 'navigation', 'label': 'Navigation', 'children': [{ 'id': 'menu', 'label': 'NavMenu 导航菜单' }, { 'id': 'tabs', 'label': 'Tabs 标签页' }, { 'id': 'breadcrumb', 'label': 'Breadcrumb 面包屑' }, { 'id': 'dropdown', 'label': 'Dropdown 下拉菜单' }, { 'id': 'steps', 'label': 'Steps 步骤条' }] }, { 'id': 'others', 'label': 'Others', 'children': [{ 'id': 'dialog', 'label': 'Dialog 对话框' }, { 'id': 'tooltip', 'label': 'Tooltip 文字提示' }, { 'id': 'popover', 'label': 'Popover 弹出框' }, { 'id': 'card', 'label': 'Card 卡片' }, { 'id': 'carousel', 'label': 'Carousel 走马灯' }, { 'id': 'collapse', 'label': 'Collapse 折叠面板' }] }] }, { 'id': 'ziyuan', 'label': '资源', 'children': [{ 'id': 'axure', 'label': 'Axure Components' }, { 'id': 'sketch', 'label': 'Sketch Templates' }, { 'id': 'jiaohu', 'label': '组件交互文档' }] }]

export const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${ i }`,
      disabled: i % 4 === 0
    })
  }
  return data
}