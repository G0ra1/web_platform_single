<template>
   <vxe-grid
      class="nw-vxe-grid"
      ref="gridRef"
      v-bind="gridOption"
    />
</template>
<script lang="jsx">
import { request } from '@platform/main'
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

import {
  Grid as VxeGrid
} from 'vxe-table'

import { NwIcon } from '@platform/main'
import { queryOrg } from '../../../../../api/index'
const queryRole = (params) => {
    return request({
        url: `/main/mdmRole/list`,
        method: 'post',
        data: params
    })
}
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
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ["callback"],
  setup (props, context) {
    // const userSelect = ref([])
    const gridRef = ref(null)
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: 'auto',
      showOverflow: false,
      highlightHoverRow: true,
      // showHeader: false,
      border: true,
      tableMenu: {
         
      },
      
      pagerConfig: {
        pageSize: 20,
        pageSizes: [10, 20, 50]
      },
      proxyConfig: {
        props: {
          // list: 'list',
          total: 'total'
        },
        ajax: {
          // 接收 Promise
          // query: () => viewQueryDir('/').then(async d => ({list: [
          //   {
          //     key: '/',
          //     name: '/',
          //     type: 'dir',
          //     children: d
          //     }
          // ]})),
          query: ({ page }) => {
            return queryRole({
              // page.currentPage, page.pageSize
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async d => {
                console.log('========dddd=', d.records)
              return ({
                result: d.records,
                total: d.total
              })
            })},
          // query: (current, size) => queryUsers({
          //     parentOrgId:0,
          //     page:{
          //       current,
          //       size
          //     }
          //   }).then(async d => ({
          //   list: d
          // }))
          // query: () => viewQueryDir('/').then(async d => ({list: d}))
        }
      },

      // data: gridData,
      columns: [
        { field: "roleName", title: "名称" },
        { field: "roleCode", title: "编码", showHeaderOverflow: true },
        { field: "sysName", title: "子系统名称", showHeaderOverflow: true },
        { field: "status", title: "启用状态", showOverflow: true,
          slots: {
              default: ({row}) => {
                return [
                  <span>
                    {row.status == 1 ? '启用' : '禁用'}
                  </span>,
                ];
              },
            }
        },
        {
          width: 65,
          slots: {
            default: ({ row }) => {
              let index = -1
              const us = props.value.find((d, i) => {
                const f = d.id === row.id
                if (f) index = i
                return f
              })
              if (us) {
                return [
                  <NButton
                    type="success"
                    size="small"
                    onClick={() => {
                      // userSelect.value.splice(index, 1)
                      // userSelect.value.push(row)
                      context.emit('callback', false, row.id, row.roleName, row.roleCode, row)
                    }}
                  >{{
                    default: () => '已选择'
                  }}</NButton>
                ]
              } else {
                return [
                  <NButton
                    type="info"
                    size="small"
                    onClick={() => {
                      context.emit('callback', true, row.id, row.roleName, row.roleCode, row)
                      // userSelect.value.push({
                      //   id: row.id,
                      //   name: row.userNameCh
                      // })
                    }}
                  >{{
                    default: () => '选择'
                  }}</NButton>
                ]
              }
            }
          }
        }
      ]
    })


    return {
      gridRef,
      gridOption,
      props,
      sizeChange () {

      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../../style/vxe-table-tree.less";
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}
</style>