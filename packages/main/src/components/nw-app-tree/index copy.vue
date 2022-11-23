<template>
  <!-- <vxe-grid v-bind="bind" ref="gridRef">
  </vxe-grid> -->
  <span>123321</span>
</template>
<script lang="tsx">
// import request from '/@/plugins/request'
// import { Request } from '@platform/main'

// import type { VxeGridProps, VxeGridInstance, SizeType, VxeGridPropTypes } from 'vxe-table'
// import {
//   NSelect,
//   NCheckboxGroup,
//   NCheckbox,
//   NSpace,
//   NInput,
//   NButton
// } from 'naive-ui'
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
  setup (props, context) {
    // const data = ref([{
    //   id: 'apptype1',
    //   name: 'app分类1',
    //   type: '1',
    //   children: [
    //     {
    //       id: 'app1',
    //       name: 'app1',
    //       type: '2',
    //     }
    //   ]
    // }])
    // const bind = reactive<VxeGridProps>({
    //   rowId: 'key',
    //   rowKey: false,
    //   size: 'mini',
    //   showOverflow: false,
    //   highlightHoverRow: true,
    //   showHeader: false,
    //   border: true,
    //   treeConfig: {
    //     // children: 'children',
    //     indent: 15,
    //     accordion: false, // 是否手风琴
    //     line: true, // 是否展示线
    //     expandAll: true, // 是否展开所有
    //     // expandRowKeys: ['/', '//src'],
    //     // lazy: true, // 是否懒加载
    //     // children: 'kids',
    //     // hasChild: 'hasChild',
    //   },
    //   data: data.value,
    //   columns: [
    //     {
    //       field: 'name',
    //       treeNode: true,
    //       // slots: {
    //       //   default: ({ row }) => {
    //       //     return []
    //       //   }
    //       // }
    //     },
    //     {
    //       // field: 'dictName',
    //       slots: {
    //         default: ({ row }) => {
    //           return [
    //             <NButton
    //             onClick={() => {
    //               console.log(row)
    //             }}
    //             >
    //               {{
    //                 default: () => '选择'
    //               }}
    //             </NButton>
    //           ]
    //         }
    //       }
    //     }
    //   ]
    // })
    return {
      // bind
    }
  }
})
</script>

<style lang='less'>
.form-view-frame {
  width: 100%;
  // height: calc(~'100% - 6px');
  height: 100%;
  overflow: hidden;
  border: none
}
</style>