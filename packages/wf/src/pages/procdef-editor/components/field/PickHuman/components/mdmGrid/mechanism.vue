<template>
  <div class="org-tree" >
    
    <div class="org-tree-header" >
      <!-- 查询用 -->
      <n-input size="small"/>
    </div>
    <div class="org-tree-content">
      <vxe-grid
      class="nw-vxe-grid-tree"
        ref="gridRef"
        v-bind="gridOption"
        :loading="isLoading"
      />
    </div>
  </div>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSelect,
  NSwitch
} from 'naive-ui'


import { NwIcon } from '@platform/main'
import { queryOrg } from '../../../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../../../store/bpmn'
import { get } from 'lodash'

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSwitch
  },
  props:{
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否异步
    // async: {
    //   type: Boolean,
    //   default: true
    // },

    // 是否
    isOrg: {
      type: Boolean,
      default: true
    },
    // 回显值
    actionOrgType: {
      type: Array,
      default: () => [ 1 ]
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ["callback"],
  setup(props, context){
    // 
    // const multipleSelectCache = ref([])

    const gridRef = ref(null)

    const gridData = ref([])
    // 是否加载中
    const isLoading = ref(true)

    const loadData = () => {
      isLoading.value = true
      queryOrg({
        isDefault: 0,
        status: 1,
        orgType: props.isOrg ? 1 : null
      }).then((res) => {
        isLoading.value = false
        gridData.value = res
      })
    }
    loadData()
    // 
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: 'auto',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: true,
      treeConfig: {
        // children: 'children',
        // indent: 15,
        // accordion: false, // 是否手风琴
        // line: true, // 是否展示线
        // expandAll: true, // 是否展开所有
        // // expandRowKeys: ['root'],
        // //lazy: true, // 是否懒加载
        // children: 'kids',
        // -----------

        indent: 15,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        //expandAll: true, // 是否展开所有
        // lazy: true, // 是否懒加载
        children: 'kids',
        // hasChild: 'hasKids',
        // loadMethod: ({ row }) => queryOrg({
        //     isDefault: 1,
        //     status: 1,
        //     orgType: 1,
        //     parentId: row.id
        //   }).then(async d => d)
      },
      tableMenu: {
         
      },
      
      // proxyConfig: {
      //   props: {
      //     list: 'list',
      //   },
      //   ajax: {
      //     // 接收 Promise
      //     // query: () => viewQueryDir('/').then(async d => ({list: [
      //     //   {
      //     //     key: '/',
      //     //     name: '/',
      //     //     type: 'dir',
      //     //     children: d
      //     //     }
      //     // ]})),
      //     query: () => queryOrg({
      //       isDefault: 1,
      //       status: 1,
      //       orgType: 1
      //     }).then(async d => ({
      //       list: d
      //     }))
      //     // query: () => viewQueryDir('/').then(async d => ({list: d}))
      //   }
      // },

      data: gridData,
      columns: [
        {
          field: 'name',
          treeNode: true,
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              //  return row.orgName
              if (props.actionOrgType.includes(row.orgType)) {
                // 这里判断是否选择
                return [<div style="display:flex; justify-content: space-between;    align-items: center;">
                <div>
                  <NwIcon name={row.orgType === 1 ? 'icon-jigou' : 'icon-bumen2'} size={16} style="margin-right: 5px;" />
                  { row.orgName }
                </div>
                {props.value.includes(row.id) ? <NButton
                  size="small"
                  type="success"
                  onClick={() => {
                    // 判断是否多选
                    context.emit('callback', false, row.id, row.orgName)
                  }}
                >{{
                  default: () => '已选择'
                }}</NButton> : <NButton
                  size="small"
                  type="info"
                  onClick={() => {
                    // 判断是否多选
                    context.emit('callback', true, row.id, row.orgName)
                  }}
                >{{
                  default: () => '选择'
                }}</NButton>}
                
                </div>]

              } else {
                return [<div style="display:flex; justify-content: space-between;    align-items: center;">
                <div>
                  <NwIcon name={row.orgType === 1 ? 'icon-jigou' : 'icon-bumen2'} size={16} style="margin-right: 5px;" />
                  { row.orgName }
                </div>
                
                </div>]
              }
            }
          }
        }
      ]
    })
    return {
      props,
      gridRef,
      isLoading,
      gridOption
      
    }
  }
}
</script>

<style lang='less' >
@import "../../../../../style/vxe-table-tree.less";
.org-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-header {
    // height: 25px;
    // padding: 0 8px 8px 8px;
    padding: 5px;
  }
  &-content {
    flex: 1
  }
}
</style>