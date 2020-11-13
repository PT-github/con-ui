## MenuCon 多级菜单

封装一套能支持`5`级的菜单，只需配置`options`数据，组件会根据是否包含子菜单动态展示

### 顶栏
适用置顶的导航

:::demo
```html
<s-menu-con default-active="4-2" @select="handleSelect" mode="horizontal" :options="options"></s-menu-con>
<script>
  export default {
    data() {
      return {
        options: [
          {
            icon: 'el-icon-s-data',
            name: '一级菜单1',
            index: '1'
          },
          {
            name: '一级菜单2',
            index: '2',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单2-1',
                index: '2-1',
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单2-2',
                index: '2-2',
              },
            ]
          },
          {
            name: '一级菜单3',
            index: '3',
            icon: 'el-icon-s-data',
            children: [
              {
                name: '二级菜单3-1',
                index: '3-1',
                children: [
                  {
                    name: '三级菜单3-1-1',
                    index: '3-1-1',
                  },
                  {
                    name: '三级菜单3-1-2',
                    index: '3-1-2',
                  },
                  {
                    name: '三级菜单3-1-3',
                    index: '3-1-3',
                  },
                ]
              },
              {
                name: '二级菜单3-2',
                index: '3-2',
                children: [
                  {
                    name: '三级菜单3-2-1',
                    index: '3-2-1',
                  },
                  {
                    name: '三级菜单3-2-2',
                    index: '3-2-2',
                  },
                  {
                    name: '三级菜单3-2-3',
                    index: '3-2-3',
                  },
                  {
                    name: '三级菜单3-2-4',
                    index: '3-2-4',
                  },
                ]
              },
              {
                name: '二级菜单3-3',
                index: '3-3',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-3-1',
                    index: '3-3-1',
                  },
                ]
              },
              {
                name: '二级菜单3-4',
                index: '3-4',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-4-1',
                    index: '3-4-1',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-4-2',
                    index: '3-4-2',
                  },
                ]
              },
              {
                name: '二级菜单3-5',
                index: '3-5',
                children: [
                  {
                    name: '三级菜单3-5-1',
                    index: '3-5-1'
                  },
                  {
                    name: '三级菜单3-5-2',
                    index: '3-5-2'
                  },
                ]
              },
              {
                name: '二级菜单3-6',
                index: '3-6'
              },
            ]
          },
          {
            name: '一级菜单4',
            index: '4',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单4-1',
                index: '4-1',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-1',
                    index: '4-1-1',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-1',
                        index: '4-1-1-1',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-2',
                        index: '4-1-1-2',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-3',
                        index: '4-1-1-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-4',
                        index: '4-1-1-4',
                      }
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-2',
                    index: '4-1-2',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-1',
                        index: '4-1-2-1',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-2',
                        index: '4-1-2-2',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-3',
                        index: '4-1-2-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-4',
                        index: '4-1-2-4',
                      }
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-3',
                    index: '4-1-3'
                  }
                ]
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单4-2',
                index: '4-2',
              },
            ]
          },
          {
            name: '一级菜单5',
            index: '5',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单5-1',
                index: '5-1',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-1',
                    index: '5-1-1',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-1',
                        index: '5-1-1-1',
                        children: [
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-1',
                            index: '5-1-1-1-1',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-2',
                            index: '5-1-1-1-2',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-3',
                            index: '5-1-1-1-3',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-4',
                            index: '5-1-1-1-4',
                          },
                        ]
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-2',
                        index: '5-1-1-2',
                        children: [
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-1',
                            index: '5-1-1-2-1',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-2',
                            index: '5-1-1-2-2',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-3',
                            index: '5-1-1-2-3',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-4',
                            index: '5-1-1-2-4',
                          },
                        ]
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-3',
                        index: '5-1-1-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-4',
                        index: '5-1-1-4',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-5',
                        index: '5-1-1-5',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-6',
                        index: '5-1-1-6',
                      },
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-2',
                    index: '5-1-2',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-3',
                    index: '5-1-3',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-4',
                    index: '5-1-4',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-5',
                    index: '5-1-5',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-6',
                    index: '5-1-6',
                  },
                ]
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单5-2',
                index: '5-2',
              },
            ]
          },
        ]
      };
    },
    methods: {
      handleSelect (index, item) {
        console.log(index, item)
      }
    }
  }
</script>
<style>
  .s-menu-popup--5 {
    width: 80% !important;
  }
</style>
```
:::

### 侧栏

垂直菜单。

第四、五级菜单所在的弹出层是基于屏幕宽度、左侧宽度和offsetLeft进行计算的，开发人员可以通过css对宽度进行设置达到业务需要的效果

:::demo
```html
<s-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <s-radio-button :label="false">展开</s-radio-button>
  <s-radio-button :label="true">收起</s-radio-button>
</s-radio-group>

<div style="background-color: #ebebeb;outline: 1px solid #ebebeb;">
  <s-menu-con :unique-opened="true" @select="handleSelect" default-active="3-1-1" :collapse="isCollapse" :options="options"> </s-menu-con>
</div>

<script>
  export default {
    data () {
      return {
        options2: [
          {
            label: true,
            content: '收起'
          },
          {
            label: false,
            content: '展开'
          }
        ],
        isCollapse: false,
        value: '',
        options: [
          {
            icon: 'el-icon-s-data',
            name: '一级菜单1',
            index: '1'
          },
          {
            icon: 'el-icon-s-data',
            name: '一级菜单2',
            index: '2',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单2-1',
                index: '2-1',
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单2-2',
                index: '2-2',
              },
            ]
          },
          {
            name: '一级菜单3',
            index: '3',
            icon: 'el-icon-s-data',
            children: [
              {
                name: '二级菜单3-1',
                index: '3-1',
                children: [
                  {
                    name: '三级菜单3-1-1',
                    index: '3-1-1',
                  },
                  {
                    name: '三级菜单3-1-2',
                    index: '3-1-2',
                  },
                  {
                    name: '三级菜单3-1-3',
                    index: '3-1-3',
                  },
                ]
              },
              {
                name: '二级菜单3-2',
                index: '3-2',
                children: [
                  {
                    name: '三级菜单3-2-1',
                    index: '3-2-1',
                  },
                  {
                    name: '三级菜单3-2-2',
                    index: '3-2-2',
                  },
                  {
                    name: '三级菜单3-2-3',
                    index: '3-2-3',
                  },
                  {
                    name: '三级菜单3-2-4',
                    index: '3-2-4',
                  },
                ]
              },
              {
                name: '二级菜单3-3',
                index: '3-3',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-3-1',
                    index: '3-3-1',
                  },
                ]
              },
              {
                name: '二级菜单3-4',
                index: '3-4',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-4-1',
                    index: '3-4-1',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单3-4-2',
                    index: '3-4-2',
                  },
                ]
              },
              {
                name: '二级菜单3-5',
                index: '3-5',
                children: [
                  {
                    name: '三级菜单3-5-1',
                    index: '3-5-1'
                  },
                  {
                    name: '三级菜单3-5-2',
                    index: '3-5-2'
                  },
                ]
              },
            ]
          },
          {
            icon: 'el-icon-s-data',
            name: '一级菜单4',
            index: '4',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单4-1',
                index: '4-1',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-1',
                    index: '4-1-1',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-1',
                        index: '4-1-1-1',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-2',
                        index: '4-1-1-2',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-3',
                        index: '4-1-1-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-1-3',
                        index: '4-1-1-3',
                      }
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-2',
                    index: '4-1-2',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-1',
                        index: '4-1-2-1',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-2',
                        index: '4-1-2-2',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-3',
                        index: '4-1-2-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单4-1-2-4',
                        index: '4-1-2-4',
                      }
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-3',
                    index: '4-1-3'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-4',
                    index: '4-1-4'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-5',
                    index: '4-1-5'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-6',
                    index: '4-1-6'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-7',
                    index: '4-1-7'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-8',
                    index: '4-1-8'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-9',
                    index: '4-1-9'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-10',
                    index: '4-1-10'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-11',
                    index: '4-1-11'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-12',
                    index: '4-1-12'
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单4-1-13',
                    index: '4-1-13'
                  },
                ]
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单4-2',
                index: '4-2',
              },
            ]
          },
          {
            icon: 'el-icon-s-data',
            name: '一级菜单5',
            index: '5',
            children: [
              {
                icon: 'el-icon-s-data',
                name: '二级菜单5-2',
                index: '5-2',
              },
              {
                icon: 'el-icon-s-data',
                name: '二级菜单5-1',
                index: '5-1',
                children: [
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-1',
                    index: '5-1-1',
                    children: [
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-1',
                        index: '5-1-1-1',
                        children: [
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-1',
                            index: '5-1-1-1-1',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-2',
                            index: '5-1-1-1-2',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-3',
                            index: '5-1-1-1-3',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-1-4',
                            index: '5-1-1-1-4',
                          },
                        ]
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-2',
                        index: '5-1-1-2',
                        children: [
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-1',
                            index: '5-1-1-2-1',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-2',
                            index: '5-1-1-2-2',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-3',
                            index: '5-1-1-2-3',
                          },
                          {
                            icon: 'el-icon-s-data',
                            name: '五级菜单5-1-1-2-4',
                            index: '5-1-1-2-4',
                          },
                        ]
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-3',
                        index: '5-1-1-3',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-4',
                        index: '5-1-1-4',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-5',
                        index: '5-1-1-5',
                      },
                      {
                        icon: 'el-icon-s-data',
                        name: '四级菜单5-1-1-6',
                        index: '5-1-1-6',
                      },
                    ]
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '三级菜单5-1-2',
                    index: '5-1-2',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '二级菜单5-1-3',
                    index: '5-1-3',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '二级菜单5-1-4',
                    index: '5-1-4',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '二级菜单5-1-5',
                    index: '5-1-5',
                  },
                  {
                    icon: 'el-icon-s-data',
                    name: '二级菜单5-1-6',
                    index: '5-1-6',
                  },
                ]
              },
              
            ]
          },
        ]
      }
    },
    methods: {
      handleSelect (index, item) {
        console.log(index, item)
      }
    }
  }
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal / vertical   | vertical |
| collapse  | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean  |   —   | false |
| default-active | 当前激活菜单的 index | string    | — | — |
| default-openeds | 当前打开的 sub-menu 的 index 的数组 | Array    | — | — |
| unique-opened  | 是否只保持一个子菜单的展开 | boolean   | — | false   |
| router  | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean   | — | false   |
| options  | 菜单数据配置 | array   | — | []   |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| select  | 菜单激活回调 | index: 选中菜单项的 index|

### options props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string / null  | — | null |
| name  | 菜单名称 | string | — | — |
| icon  | 前置icon类 | string | — | — |
| suffixIcon  | 后置icon类(只针对4、5级菜单) | boolean | — | — |
| route  | 路由配置 | string / object | — | — |
| children  | 子菜单 | array | — | — |
