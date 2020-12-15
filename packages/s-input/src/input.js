/*
 * @Author: PT
 * @Date: 2020-09-28 16:11:54
 * @LastEditors: PT
 * @LastEditTime: 2020-12-15 11:19:22
 * @Description: SInput组件
 */
import './input.scss'
import Input from './mixin'
export default {
  name: 'SInput',
  render () {
    return (
      <el-input ref="input" class="s-input" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}>
        {
          this.$slots.prepend && (
            <template slot="prepend">
              { this.$slots.prepend }
            </template>
          )
        }
        {
          this.$slots.prefix && (
            <template slot="prefix">
              { this.$slots.prefix }
            </template>
          )
        }
        {
          this.$slots.suffix && (
            <template slot="suffix">
              { this.$slots.suffix }
            </template>
          )
        }
        {
          this.$slots.append && (
            <template slot="append">
              { this.$slots.append }
            </template>
          )
        }
        
      </el-input>
    )
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    },
    select () {
      this.$refs.input.select()
    },
  },
  components: {
    [Input.name]: Input
  }
}