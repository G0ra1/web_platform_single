<template>
  <div class="users-layout">
    <div class="sider">
      <div class="header">
        字典类型

        <n-input size="small" v-model:value="searchDictTypeValue" style="width:150px;margin-left: 10px;"
          placeholder="请输入字典类型查询">
          <template #suffix>
            <NwIcon name='icon-n-y-sousuo' style="cursor: pointer;" @click="searchDictTypeHandel" :size=16 />
          </template>
        </n-input>

      </div>
      <div class="content">
        <!-- 表单列表 -->
        <vxe-grid class="nw-vxe-grid-tree" ref="gridDictTypeRef" v-bind="gridDictTypeOption" v-on="gridDictTypeEvent" />
      </div>
    </div>
    <div class="body">
      <div class="header">
        字典值（{{ actionDictType ? actionDictType.dictName : '所有' }}）
      </div>
      <div class="content">
        <vxe-grid class="nw-vxe-grid" ref="gridDictRef" v-bind="gridDictOption" />
      </div>
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
import { dictType, dictItemLists } from './api'

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
  props: {
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
  setup(props, context) {
    const actionDictType = ref(null)
    const gridDictTypeRef = ref(null)
    const gridDictTypeOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: 'auto',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: false,
      tableMenu: {

      },

      rowClassName: ({ row }) => {
        return (row === actionDictType.value) ? 'form-active' : ''
      },
      pagerConfig: {
        layouts: ['PrevPage', 'Number', 'NextPage',],
        pageSize: 10
      },
      proxyConfig: {
        seq: true,
        props: {
          result: 'result.data',
          total: 'page.total'
        },
        ajax: {
          query: ({ page }) => dictType({ dictName: searchDictTypeValue.value, page: { current: page.currentPage } }).then(async d => ({
            result: { data: d.records },
            page: { total: d.total }
          }))
        }
      },

      // data: gridData,
      columns: [
        {
          treeNode: true,
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [<div style="display:flex; justify-content: space-between;    align-items: center;">
                <div>
                  <NwIcon name='icon-w_bijiben' size={16} style="margin-right: 5px;" />
                  <NButton
                    text
                    size="small"
                    onClick={() => {
                      actionDictType.value = row
                      gridDictRef.value.commitProxy('query')
                    }}
                  >{{
                    default: () => row.dictName
                  }}</NButton>
                </div>

              </div>]
            }
          }
        }
      ]
    })
    const gridDictRef = ref(null)
    const gridDictOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: 'auto',
      showOverflow: false,
      highlightHoverRow: true,
      // showHeader: false,
      border: false,
      tableMenu: {

      },
      proxyConfig: {
        props: {
          list: 'list',
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
            return dictItemLists(
              actionDictType.value?.dictCode
            ).then(async d => {
              return ({
                list: actionDictType.value?.dictCode ? d : [],
              })
            })
          },
          // query: (current, size) => dictItemLists({
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
        {
          field: 'dictItemName',
          title: '字典项',
          width: 130
        },
        {
          showOverflow: 'title',
          field: 'dictItemCode',
          title: '字典值'
        },
        {
          width: 65,
          slots: {
            default: ({ row }) => {
              let index = -1
              const us = props.value.find((d, i) => {
                const f = d.dictItemCode === row.dictItemCode
                if (f) index = i
                return f
              })
              if (us) {
                return [
                  <NButton
                    type="success"
                    size="tiny"
                    onClick={() => {
                      context.emit('callback', false, row.dictItemName, row.dictItemCode, row)
                    }}
                  >{{
                    default: () => '已选择'
                  }}</NButton>
                ]
              } else {
                return [
                  <NButton
                    type="info"
                    size="tiny"
                    onClick={() => {
                      context.emit('callback', true, row.dictItemName, row.dictItemCode, row)
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
    const searchDictTypeValue = ref('')
    const gridDictTypeEvent = ref({
      'cell-click': ({ row }) => {
        // console.log(row)
      }
    })
    const searchDictTypeHandel = () => {
      gridDictTypeRef.value.commitProxy('query')
    }
    return {
      actionDictType,
      gridDictTypeRef,
      gridDictTypeOption,
      gridDictRef,
      gridDictOption,
      gridDictTypeEvent,
      searchDictTypeValue,
      searchDictTypeHandel,
      props,
      sizeChange() {

      }
    }
  }
}
</script>

<style lang='less' scoped>
.users-layout {
  display: flex;
  height: 100%;

  >.sider {
    flex: 0 1 225px;

    display: flex;
    flex-direction: column;
  }

  >.body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .header {
    flex: 0 1 32px;
    display: flex;
    align-items: center;
  }

  .content {

    flex: 1;
  }
}
</style>