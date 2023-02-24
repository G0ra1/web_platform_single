<template>
  <div class="users-layout">
    <div class="sider">
      <div class="header">
        组织机构
      </div>
      <div class="content" >
      <!-- 表单列表 -->
        <vxe-grid
          class="nw-vxe-grid-tree"
          ref="gridOrgRef"
          v-bind="gridOrgOption"
          v-on="gridOrgEvent"
        />
      </div>
    </div>
    <div class="body">
      <div class="header">
        人员列表（{{ actionOrg ? actionOrg.orgName : '所有'}}）
      </div>
      <div class="content" >
        <vxe-grid
          class="nw-vxe-grid"
          ref="gridUsersRef"
          v-bind="gridUsersOption"
        />
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
import { queryOrg, queryUsers } from './api'

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
    const actionOrg = ref(null)
    const gridOrgRef = ref(null)
    const gridOrgOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: '370',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: false,
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
      
      rowClassName: ({row}) => {
        return (row === actionOrg.value) ? 'form-active' : ''
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
          query: () => queryOrg({
            isDefault: 0,
            status: 1,
            // orgType: 1
          }).then(async d => ({
            list: d
          }))
          // query: () => viewQueryDir('/').then(async d => ({list: d}))
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
                <NwIcon name={row.orgType === 1 ? 'icon-n-y-org' : 'icon-n-y-users'} size={16} style="margin-right: 5px;" />
                <NButton
                  text
                  size="small"
                  onClick={() => {
                                
                    actionOrg.value = row
                    gridUsersRef.value.commitProxy('query')
                  }}
                >{{
                  default: () => row.orgName
                }}</NButton>
              </div>
              
              </div>]
            }
          }
        }
      ]
    })
    const gridUsersRef = ref(null)
    const gridUsersOption = ref({
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
            return queryUsers({
              parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
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
        {
          field: 'userNameCh',
          title: '姓名',
          width: 130
        },
        {
          showOverflow: 'title',
          field: 'parentOrgName',
          title: '所属机构'
        },
        {
          showOverflow: 'title',
          field: 'parentDeptName',
          title: '所属部门'
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
                    size="tiny"
                    onClick={() => {
                      // userSelect.value.splice(index, 1)
                      // userSelect.value.push(row)
                      
                      context.emit('callback', false, row.id, row.userNameCh, row.userName, row)
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
                      context.emit('callback', true, row.id, row.userNameCh, row.userName, row)
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

    const gridOrgEvent = ref({
      'cell-click': ({row}) => {
        // console.log(row)
      }
    })

    return {
      actionOrg,
      gridOrgRef,
      gridOrgOption,
      gridUsersRef,
      gridUsersOption,
      gridOrgEvent,

      props,
      sizeChange () {
        
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