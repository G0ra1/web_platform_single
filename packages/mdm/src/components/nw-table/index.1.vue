<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-layout
      class="nw-table"
      ref="tbody"
    >
      <n-layout-header class="nw-table-header">
        <div class="nw-table-header-left">
          <slot name="header-left"></slot>
        </div>
        <div class="nw-table-header-right">
          <slot name="header-right"></slot>
          <!-- 这里是表格基础工具 -->
          这里放置表格功能
          <!-- <n-switch v-model:value="searchFormActive" /> -->
        </div>
        <!-- <n-switch v-model:value="collapsed" /> -->
      </n-layout-header>
      <!-- <n-layout-header style="height: 200px;">
        header2
        {{active}}
      </n-layout-header> -->
    <n-layout
      has-sider
      class="nw-table-content"
    >
      <n-layout-content>
        <vxe-grid
          v-bind="gridOptions"
          ref="gridComponent"
          class="mytable-scrollbar"
        >
          <!-- <template #pager>
            <vxe-pager
              :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
              v-model:current-page="tablePage.currentPage"
              v-model:page-size="tablePage.pageSize"
              :total="tablePage.total"
              @page-change="handlePageChange">
            </vxe-pager>
          </template> -->
        </vxe-grid>
        
      </n-layout-content>
      <!-- <n-layout-sider
      :bordered="false"
      collapse-mode="width"
      :collapsed-width="0"
      :width="170"
      :collapsed="collapsed"
      :show-trigger="false"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      >
      1
      </n-layout-sider> -->
    </n-layout>
      <!-- <n-layout-footer>
        footer
      </n-layout-footer> -->
    </n-layout>
    <n-drawer
      :show="searchFormActive"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.tbody && $refs.tbody.$el"
    >
      <n-drawer-content
        title="高级搜索"
        :header-style="{
          'padding': '10px',
          'font-size': '16px',
          'font-weight': 'bold'
        }"
      >
        <slot name="search-form"></slot>
      </n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>
<script>
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton,
  NSwitch,
  NSpace,
  NConfigProvider,
  NDrawer,
  NDrawerContent
} from 'naive-ui'
import { h, ref, reactive, defineComponent } from 'vue'
import theme from './theme.js'
import _NwTableFun from './nw-table-fun.vue'

export const NwTableFun = _NwTableFun
export default defineComponent({
  props: {
    // 列
    columns: {
      type: Array,
      default: () => []
    },
    // 数据
    data: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // 接口请求
    request: {
      type: Object,
      default: () => ({
        XHR: () => {}, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({ // 分页
          page: {
              current,
              size
          }
        }),
      })
    },
    // 接口响应
    /**
     * {
     *    dataMethod: () => {},
     *    pageMethod: ({ total }) => ({ total })
     * 
     * }
     *  */
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records,
        pageMethod: ({ total }) => ({ total })
      })
    },
    // 分页配置
    pagerConfig: {
      type: Object,
      default: () => ({
        enable: true, // 开启分页
        // 分页类型 server | client | none 不分页
        pageType: 'server',
        // 分页属性提取，使用服务端分页时生效
        
        // 每页可显示选择
        pageSizeOpts: [5, 10, 20, 50],

      })
    },
    // 树形配置
    tree: {
      type: Object,
      default: () => ({
        enable: false, // 开启树形
        rootId: '#', // 顶级元素ID
        id: 'id', // 元素id字段
        parentId: 'parentId' // 父级id字段
      })
    }
  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NModal,
    NButton,
    NSwitch,
    NSpace,
    NConfigProvider,
    NDrawer,
    NDrawerContent
  },
  setup (props) {
    console.log('====props=columns==', props.columns)
    const searchFormActive = ref(false)
    const gridComponent = ref(null)
    const gridOptions = reactive({
      size: 'mini',
      border: false,
      resizable: true,
      height: 'auto',
      align: null,
      columns: props.columns,
      data: props.data,
      pagerConfig: {
        pageSize: 10
      },
    })
    // 判断是否是服务端分页
    // props.pagerConfig.
    
    const tablePage = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10
    })
    return {
      // 变量
      gridComponent,
      theme, // 风格
      searchFormActive, // 是否开启高级查询
      tablePage,
      gridOptions,
      toggleSearchForm () { // 切换高级查询
        console.log('toggleSearchForm');
        searchFormActive.value = !searchFormActive.value
      },
      handlePageChange: () => {},
      refreshColumn () {
        console.log('grid===', gridOptions);
        gridComponent.value.reloadColumn(gridOptions.columns)
      }
    }
  },
  methods: {
    
  }
})
// 整体body用于抽屉覆盖
// const tbody = ref(null)
// const searchFormActive = ref(false)
// const collapsed = ref(true)
// const tablePage = reactive({
//   total: 0,
//   currentPage: 1,
//   pageSize: 10
// })

// const handlePageChange = () => {}
// const gridOptions = reactive({
//   size: 'mini',
//   border: false,
//   resizable: true,
//   height: 300,
//   align: null,
//   columns: [
//     { type: 'seq', width: 50 },
//     { field: 'name', title: 'app.body.label.name' },
//     { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
//     { field: 'address', title: 'Address', showOverflow: true }
//   ],
//   // toolbarConfig: {
//   //   slots: {
//   //     buttons: 'toolbar_buttons'
//   //   }
//   // },
//   data: [
//     { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
//     { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
//     { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
//     { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
//     { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
//     { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
//     { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
//     { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
//   ]
// })
// // 查询表单

// const toggleSearchForm = (active = true) => {
//   searchFormActive = active
// }
</script>

<style lang='less'>
// 表格样式
.nw-table {
  height: 100%;
  &-header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 5px;
    border: 1px solid #e6e9f0;
    // border-bottom: 2px solid #188ae2;
    &-left {
      // float: left;
    }
    &-right {
      // float: right;
    }
  }
  &-content {
    height: calc(~'100% - 40px')
  }
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 18px;
  height: 18px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>