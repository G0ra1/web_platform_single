<template>
  <div class="value-input" style="display:flex;align-items: center;">
    <!-- <n-input
      size="small"
      :value="props.text"
      disabled
      placeholder=""
    /> -->
    <n-button
    :disabled="props.disabled"
    :size="props.size"
    type="info"
    @click="handleModal"
    style="margin-left: 4px;"
    >{{props.label}}</n-button>
  </div>

  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1000px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-request" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择OpenAPI接口
      </div>
    </template>
    
    <n-spin :show="isLoading">
      <n-layout class="nw-page" style="height: 600px;padding-top: 5px;" ref="pageRef">
      <!-- <n-layout-header>
        <h1>OpenAPI</h1>
        <div class="nw-page-header-right">
        </div>
      </n-layout-header> -->
      <n-layout-content style="height:100%;">

        <n-layout class="nw-layout-full" ref="tbody">
          <n-layout-header class="nw-table-header">
            <div class="nw-table-header-left">
              
            </div>
            <div class="nw-table-header-right">
              <Search />
            </div>
          </n-layout-header>

          <n-layout has-sider class="nw-table-content">
            <n-layout-sider width="250">
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
            <n-layout-content ref="gridContent">
              <vxe-grid
                v-bind="gridOptions"
                ref="tableRef"
                class="mytable-scrollbar"
              >
              </vxe-grid>
            </n-layout-content>
          </n-layout>
        </n-layout>
      </n-layout-content>
    </n-layout>
  </n-spin>
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
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="handleCancel" >取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
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
  NModal,
  NSpin
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import NwAppTreeGrid from '../../../menu-manage/components/tree-grid/index.vue'

import { 
  pageRef,
  tableRef,
  SearchForm,
  InterfaceDetail,
  showInterfaceDetail,
  cancelInterfaceDetail
} from '../../store/index.js'

import { query, queryDetail } from '../../api/index.js'
import { 
  StaticFilter
} from '../../store/tree.js'

import theme from '../../theme/index.js'

import Detail from '../detail/index.vue'

import SideTree from '../tree-grid/index.vue'

import Search from '../search/index.vue'

import { JsonRefs } from '../../plugins/json-refs.js'

export default {
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
    NSpin,
    NForm,
    NFormItem,
    NPopconfirm,
    NModal,
    NwIcon,
    Detail,
    SideTree,
    Search,
    NwAppTreeGrid
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bizType: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    label: {
      type: String,
      default: '选择'
    }
  },
  emits: [ 'callback' ],
  setup (props, context) {
    const isLoading = ref(false)

    const visible = ref(false)

    const gridContent = ref(null)

    const handleCancel = () => {
      cancelInterfaceDetail()
      visible.value = false
    }
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
          field: '',
          title: '操作',
          showHeaderOverflow: true,
          width: '120px',
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
                  size="small"
                  type="info"
                  loading={false}
                  onClick={() => {
                    // 这里请求详情后返回数据
                    isLoading.value = true
                    queryDetail(row.id).then(r => {
                      // console.log('=====rr=====', r)
                      JsonRefs.resolveRefs(JSON.parse(r.content)).then(d => {
                        context.emit('callback', r, d)
                      })
                      handleCancel()
                    }).finally(() => {
                      isLoading.value = false
                    })
                  }}
                >{{
                  default: () => '选择'
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
              bizType: props.bizType,
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async d => {
              console.log('=====dd=====', d)
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
      props,
      isLoading,
      visible,
      
      gridContent,
      InterfaceDetail,
      theme,

      gridOptions,

      pageRef,
      tableRef,

      sideTreeCallback (app) {
        StaticFilter.value = {
          sysCode: app.appCode
        }
        tableRef.value.commitProxy("query");
        cancelInterfaceDetail()
      },
      handleModal() {
        visible.value = true
      },
      handleCancel,

    };

  }
}
</script>

<style lang='less'>
</style>