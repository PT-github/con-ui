export default {
  props: {
    // 模式 vertical 垂直 horizontal 水平
    mode: {
      type: String,
      default: 'vertical'
    },
    // 是否启用vue-router的模式
    router: Boolean,
    /**
     * [
     *  {
     *    id: '',
     *    name: '', 菜单显示名称
     *    icon: '', // 菜单显示名称的icon类
     *    path: string() | object(router-link path), 外部链接全路径、router-link的path或者传入router-link的path的对象
     *    is: 'link', // 是否是a标签
     *    target: '' // a标签的target
     *    children: [], // 子菜单
     *  }
     * ]
     */
    options: {
      type: Array,
      default: () => []
    }
  }
}