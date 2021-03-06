const path = require('path')
module.exports = {
  title: 'ConUI',
  description: '基于element-ui的业务常用组件',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    sidebarDepth: 0,
    smoothScroll: true,
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '基础组件', link: '/component/basic/row' },
      { text: '高级组件', link: '/adv-component/form/select-con' },
      { text: '示例', link: '/example/query-table' },
      { text: 'Github', link: 'https://github.com/PT-github/con-ui', target: '_blank' },
    ],
    sidebar: {
      '/guide/': [{
        title: '开发指南',
        collapsable: false,
        children: [
          '/guide/'
        ]
      }],
      '/component/': [{
        title: 'Basic 组件',
        collapsable: false,
        children: [
          '/component/basic/row',
          '/component/basic/layout',
          '/component/basic/icon',
          '/component/basic/button',
        ]
      }, {
        title: 'Form 组件',
        collapsable: false,
        children: [
          '/component/form/radio',
          '/component/form/checkbox',
          '/component/form/input',
          '/component/form/input-number',
          '/component/form/select',
          '/component/form/cascader',
          '/component/form/switch',
          '/component/form/slider',
          '/component/form/time-picker',
          '/component/form/date-picker',
          '/component/form/datetime-picker',
          '/component/form/upload',
          '/component/form/rate',
          '/component/form/transfer',
          '/component/form/form',
        ]
      }, {
        title: 'Data 组件',
        collapsable: false,
        children: [
          '/component/data/table',
          '/component/data/tag',
          '/component/data/progress',
          '/component/data/tree',
          '/component/data/pagination',
          '/component/data/badge',
          '/component/data/avatar',
        ]
      }, {
        title: 'Notice 组件',
        collapsable: false,
        children: [
          '/component/notice/alert',
          '/component/notice/loading',
          '/component/notice/message',
          '/component/notice/message-box',
          '/component/notice/notification',
        ]
      }, {
        title: 'Navigation 组件',
        collapsable: false,
        children: [
          '/component/navigation/menu',
          '/component/navigation/tabs',
          '/component/navigation/breadcrumb',
          '/component/navigation/dropdown',
          '/component/navigation/steps',
        ]
      },  {
        title: 'Others 组件',
        collapsable: false,
        children: [
          '/component/others/dialog',
          '/component/others/tooltip',
          '/component/others/popover',
          '/component/others/popconfirm',
          '/component/others/card',
          '/component/others/carousel',
          '/component/others/collapse',
          '/component/others/timeline',
          '/component/others/divider',
          '/component/others/calendar',
          '/component/others/image',
          '/component/others/backtop',
          '/component/others/infinite-scroll'
        ]
      }],
      '/adv-component/': [{
        title: '高级组件',
        collapsable: true,
        children: [
          {
            title: 'Form 组件',
            collapsable: false,
            children: [
              '/adv-component/form/select-con',
              '/adv-component/form/radio-con',
              '/adv-component/form/checkbox-con',
              '/adv-component/form/treeselect',
              '/adv-component/form/form-con',
            ]
          }, {
            title: 'Data 组件',
            collapsable: false,
            children: [
              '/adv-component/data/table-con',
            ]
          }, {
            title: 'Navigation 组件',
            collapsable: false,
            children: [
              '/adv-component/navigation/menu-con',
            ]
          }
        ]
      }],
      '/example/': [
        {
          title: '组合示例',
          collapsable: false,
          children: [
            {
              title: '查询表格',
              path: '/example/query-table'
              // children: [
              //   '/example/query-table'
              // ]
            }
          ]
        }
      ]
    }
  },
  alias: {
    'demo-style': path.resolve(__dirname, './styles/demo-style')
  },
  plugins: [ 'demo-container' ]
}