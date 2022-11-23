<template>
<n-config-provider abstract :theme-overrides="theme" >
  <!-- <div class="value-input" style="display:flex;align-items: center;">

    <n-button
    :disabled="props.disabled"
    size="small"
    type="info"
    @click="handleModal"
    style="margin-left: 4px;"
    >选择</n-button>
  </div> -->

  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-biaodanmoshi" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        接口修改历史
      </div>
    </template>
    
    <n-spin :show="isLoading">
      <n-layout class="nw-page" style="height: 400px;padding-top: 5px;" >
      <!-- <n-layout-header>
        <h1>OpenAPI</h1>
        <div class="nw-page-header-right">
        </div>
      </n-layout-header> -->
      <n-layout-content style="height:100%;">

        <vxe-grid
          v-bind="gridOptions"
          ref="tableRef"
          class="mytable-scrollbar"
        >
        </vxe-grid>
      </n-layout-content>
    </n-layout>
  </n-spin>
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
</n-config-provider>
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

import {
  query,
  queryDetail,
  queryHis
} from '../../api/index.js'
import { 
  StaticFilter
} from '../../store/tree.js'

import theme from '../../theme/index.js'

import Detail from '../detail/index.vue'

import SideTree from '../tree-grid/index.vue'

import Search from '../search/index.vue'

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
    Search
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
    }
  },
  emits: [ 'callback' ],
  setup (props, context) {
    const isLoading = ref(false)

    const visible = ref(false)

    const tableRef = ref(null)

    const gridContent = ref(null)

    const StaticSearch = ref({
      mthPath: '',
      mthMethod: ''
    })

    const handleCancel = () => {
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
        { field: 'createTime', title: '时间', showHeaderOverflow: true, },
        {
          field: 'ctlName', 
          title: '类名', 
          showHeaderOverflow: true
        },
        { field: 'mthDescription', title: '接口描述',showHeaderOverflow: true }
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
            return queryHis({
              // mthPath: '',
              // mthMethod: '',
              // parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
              // page.currentPage, page.pageSize
              // ctlName: '对外提供的restFull接口',
              ...StaticSearch.value,
              // ...StaticFilter.value,
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

      theme,

      gridOptions,

      tableRef,

      handleModal() {
        visible.value = true
      },
      show (mthPath, mthMethod) {
        visible.value = true
        StaticSearch.value = {
          mthPath,
          mthMethod
        }
        tableRef.value.commitProxy("query");
      },
      handleCancel,

    };

  }
}
</script>

<style lang='less'>
</style>