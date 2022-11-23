<template>
  <n-layout has-sider class="nw-layout-full with-sprite" >
    
    <n-layout-sider class="nw-sprite" width="250" style="margin-right: 10px;">
        <!-- <vxe-grid
          v-bind="gridTreeOptions"
          ref="gridComponent"
          class="mytable-scrollbar"
        >
        </vxe-grid> -->
        <!-- <SideTree
          @callback="sideTreeCallback"
        /> -->
        
        <nw-app-tree-grid rootName="全部" @callback="sideTreeCallback" />
      </n-layout-sider>
    <n-layout  class="nw-layout-full nw-sprite" content-style="height: 100%">
      <n-layout-header class="nw-layout-header" >
        <Search />
      </n-layout-header>
      <n-layout-content>
        <vxe-grid
          v-bind="gridOptions"
          ref="tableRef"
        >
        </vxe-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <n-drawer
    v-model:show="InterfaceDetail.visible"
    placement="right"
    width="100%"
    :trap-focus="false"
    :block-scroll="false"
    :to="gridContent && gridContent.$el"
  >
    <n-drawer-content >
      <Detail />
    </n-drawer-content>
  </n-drawer>
  <HistoryModal ref="HistoryModalRef" />

</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, computed, getCurrentInstance } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
} from "naive-ui";


import { 
  pageRef,
  tableRef,
  SearchForm,
  InterfaceDetail,
  showInterfaceDetail,
  cancelInterfaceDetail
} from './store/index.js'

import { 
  StaticFilter
} from './store/tree.js'
import theme from './theme/index.js'
import Detail from './components/detail/index.vue'
import HistoryModal from './components/history-modal/index.vue'

import SideTree from './components/tree-grid/index.vue'

import Search from './components/search/index.vue'

import { query } from './api/index.js'

import { NwAppTreeGrid } from '@platform/main'

export default defineComponent({
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    Detail,
    SideTree,
    Search,
    HistoryModal,
    NwAppTreeGrid
  },
  setup() {
    const gridContent = ref(null)
    const HistoryModalRef = ref(null)
    // 树形数据
    // 表格配置
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      border: false,
      resizable: true,
      height: 'auto',
      align: null,
      columns: [
        { field: 'mthPath', title: '请求URL', showHeaderOverflow: true, },
        {
          field: 'mthMethod', 
          title: '请求Method', 
          showHeaderOverflow: true, 
          width: '105px'
        },
        { field: 'mthDescription', title: '接口描述',showHeaderOverflow: true },
        { field: 'ctlName', title: '所属类', showHeaderOverflow: true, },
        //{ field: 'openWay', title: '打开方式', showOverflow: true, 
          // slots: {
          //   default: ({ row }) => {
          //     return [
          //       <span>{ row.openWay ? openWays.filter(d=>d.value == row.openWay)[0].label:'' }</span>,
          //     ];
          //   },
          // }
        //},
        // { field: 'createTime', title: '创建时间', showOverflow: true },
        {
          field: 'status',
          title: '状态',
          showOverflow: true,
          width: '45px',
          slots: {
            default: ({row}) => {
              return [
                <span>
                  {row.onOff=='on'?'启用':'禁用'}
                </span>
              ];
            },
          }
        },
        {
          field: 'status',
          title: '在线/离线',
          showOverflow: true,
          width: '90px',
          slots: {
            default: ({row}) => {
              return [
                <span>
                  {row.isLine === 'offline' ? '离线' : '在线'}
                </span>
              ];
            },
          }
        },
        {
          field: '',
          title: '操作',
          showHeaderOverflow: true,
          width: '100px',
          slots: {
            default: ({row}) => {
              return [
                <NButton
                  text
                  size="small"
                  type="info"
                  style="margin-right: 10px;"
                  onClick={() => {
                    console.log('gridContent', gridContent)
                    showInterfaceDetail(row.id)
                  }}
                >{{
                  default: () => '查看'
                }}</NButton>,
                <NButton
                  text
                  size="small"
                  type="info"
                  onClick={() => {
                    HistoryModalRef.value.show(row.mthPath, row.mthMethod)
                  }}
                >{{
                  default: () => '历史'
                }}</NButton>
              ];
            },
          }
        }
      ],
      // data: gridData,
      
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
            return query({
              // parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
              // page.currentPage, page.pageSize
              // ctlName: '对外提供的restFull接口',
              ...SearchForm.value,
              ...StaticFilter.value,
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async (d) => {
              return ({
                result: d.records,
                total: d.total
                // result: d,
                // total: 1
              })
            })}
        }
      },
    })

    return {
      HistoryModalRef,
      gridContent,
      InterfaceDetail,
      theme,

      gridOptions,

      pageRef,
      tableRef,

      sideTreeCallback (app) {
        // console.log(app)
        StaticFilter.value = {
          sysCode: app.appCode
        }
        tableRef.value.commitProxy("query");
        cancelInterfaceDetail()
      }
    };
  },
});
</script>
