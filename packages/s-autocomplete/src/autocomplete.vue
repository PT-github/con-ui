<!--
 * @Author: PT
 * @Date: 2020-10-13 08:41:09
 * @LastEditors: PT
 * @LastEditTime: 2020-10-22 16:01:38
 * @Description: SAutocomplete
-->

<template>
  <el-autocomplete ref="autocomplete" class="s-autocomplete" :popperClass="'s-autocomplete-suggestion' + ($attrs['popper-class'] ? ' ' + $attrs['popper-class'] : '')" v-on="$listeners" v-bind="$attrs">
    <template slot="prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="append" v-if="$slots.append">
      <slot name="append"></slot>
    </template>
    <template slot="prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template slot="suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </template>
    <template slot-scope="{ item }" v-if="$scopedSlots.default">
      <slot :item="item"></slot>
    </template>
  </el-autocomplete>
</template>
<script>
import Autocomplete from 'element-ui/lib/autocomplete'
export default {
  name: 'SAutocomplete',
  components: {
    [ Autocomplete.name ]: Autocomplete
  }
}
</script>
<style lang='scss'>
@import '~element-ui/lib/theme-chalk/autocomplete.css';
.s-autocomplete {
  .el-input__inner {
    @include border_color($color: '$1-color-1', $opacity:.15);
    @include font_color($color: '$1-color-1', $opacity:.65);
    @include placeholder_color($color: "$1-color-1", $opacity: .25);
    border-radius: 2px;
  }
}
</style>