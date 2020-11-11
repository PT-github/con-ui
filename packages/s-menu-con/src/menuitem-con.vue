<template>
  <li class="el-menu-item"
    role="menuitem"
    tabindex="-1"
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <el-tooltip
      v-if="parentMenu.$options.componentName === 'ElMenu' && rootMenu.collapse && $slots.title"
      :visible-arrow="false"
      popper-class="s-menu-popup"
      effect="light"
      :boundaries-padding="0"
      placement="right">
      <div slot="content"><slot name="title"></slot></div>
      <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
        <slot></slot>
      </div>
    </el-tooltip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script>
import SMenuItem from '../../s-menu-item'
export default {
  name: 'MenuitemCon',
  props: {
    // 是否存在与弹窗中
    inpop: {
      type: Boolean,
      default: false
    }
  },
  mixins: [SMenuItem],
  computed: {
    itemStyle () {
      return {}
    }
  }
}
</script>
<style lang='scss' scoped>
</style>