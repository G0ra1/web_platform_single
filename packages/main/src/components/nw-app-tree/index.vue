<template>
  <vxe-grid v-bind="bind" ref="gridRef">
  </vxe-grid>
</template>
<script lang="tsx">
// import request from '/@/plugins/request'
// import { Request } from '@platform/main'

import type { VxeGridProps, VxeGridInstance, SizeType, VxeGridPropTypes } from 'vxe-table'
import {
  NSelect,
  NCheckboxGroup,
  NCheckbox,
  NSpace,
  NInput,
  NButton
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
// import { cloneDeep } from 'lodash'

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  components: {
    // NInput,
    // NSelect,
    // NCheckboxGroup,
    // NCheckbox,
    // NSpace
  },
  emits: ['callback'],
  setup (props, context) {
    const data = ref([
      {
        id: 'root',
        name: '全部',

        children: [
          {
            id: 'apptype1',
            name: 'app分类1',
            type: '1',
            children: [
              {
                id: 'smm',
                name: 'smm',
                type: '2',
              }
            ]
          }
        ]
      }
      
      ])
    const bind = reactive<VxeGridProps>({
      rowId: 'key',
      rowKey: false,
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: true,
      height: '100%',
      treeConfig: {
        // children: 'children',
        indent: 15,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        expandAll: true, // 是否展开所有
        // expandRowKeys: ['/', '//src'],
        // lazy: true, // 是否懒加载
        // children: 'kids',
        // hasChild: 'hasChild',
      },
      data: data.value,
      columns: [
        {
          field: 'name',
          treeNode: true,
          // slots: {
          //   default: ({ row }) => {
          //     return []
          //   }
          // }
        },
        {
          // field: 'dictName',
          width: '50px',
          slots: {
            default: ({ row }) => {
              if (row.type === '2') {
                return [
                  <NButton
                    size="tiny"
                    onClick={() => {
                      context.emit('callback', row)
                    }}
                  >
                    {{
                      default: () => '选择'
                    }}
                  </NButton>
                ]
              } else {
                return []
              }
            }
          }
        }
      ]
    })
    return {
      bind
    }
  }
})
</script>

<style lang='less'>
</style>