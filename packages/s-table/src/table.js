/*
 * @Author: PT
 * @Date: 2020-09-28 11:56:30
 * @LastEditors: PT
 * @LastEditTime: 2020-10-15 17:40:56
 * @Description: STable
 */

import './styles/table.scss'
import Table from 'element-ui/lib/table'
import { throttle } from 'throttle-debounce'

export default {
  name: 'STable',
  render (){
    return (
      <el-table ref='table' class="s-table" {
        ...{
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }
      }>
        {
          this.$slots.default
        }
        {
          this.$slots.empty && (
            <template slot="empty">
              { this.$slots.empty }
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
      </el-table>
    )
  },

  mounted () {
    this.$refs.table.$refs.bodyWrapper.addEventListener('scroll', this.handlerScroll, { passive: true })
  },

  beforeDestroy () {
    this.$refs.table.$refs.bodyWrapper.removeEventListener('scroll', this.handlerScroll, { passive: true })
  },

  components: {
    [Table.name]: Table
  },

  methods: {
    handlerScroll:  throttle(20, function () {
      this.$emit('body-scroll')
    }),
    clearSelection () {
      return this.$refs.table.clearSelection()
    },
    toggleRowSelection (...args) {
      return this.$refs.table.toggleRowSelection(...args)
    },
    toggleAllSelection () {
      return this.$refs.table.toggleAllSelection()
    },
    toggleRowExpansion (...args) {
      return this.$refs.table.toggleRowExpansion(...args)
    },
    setCurrentRow (...args) {
      return this.$refs.table.setCurrentRow(...args)
    },
    clearSort () {
      return this.$refs.table.clearSort()
    },
    clearFilter (...args) {
      return this.$refs.table.clearFilter(...args)
    },
    doLayout () {
      return this.$refs.table.doLayout()
    },
    sort (...args) {
      return this.$refs.table.sort(...args)
    }
  }
}