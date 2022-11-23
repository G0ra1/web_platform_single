<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-layout class="nw-table" ref="tbody">
      <n-layout-header class="nw-table-header">
        <div class="nw-table-header-left">
          <slot name="header-left" :selected="selected"></slot>

          {{ selected.length ? `已选择${selected.length}项` : "" }}
        </div>
        <div class="nw-table-header-right">
          <slot name="header-right"></slot>
          <!-- 这里是表格基础工具 -->
          这里放置表格功能
        </div>
        <!-- <n-switch v-model:value="collapsed" /> -->
      </n-layout-header>
      <!-- <n-layout-header style="height: 200px;">
        header2
        {{active}}
      </n-layout-header> -->
      <n-layout has-sider class="nw-table-content">
        <n-layout-content>
          <vxe-grid
            v-bind="gridOptions"
            ref="gridComponent"
            class="mytable-scrollbar"
            v-on="gridEvent"
            show-overflow
          >
          </vxe-grid>
        </n-layout-content>
      </n-layout>
      <!-- <n-layout-footer>
        footer
      </n-layout-footer> -->
    </n-layout>
    <n-drawer
      :show="searchFormVisible"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.tbody && $refs.tbody.$el"
    >
      <n-drawer-content
        title="高级搜索"
        :header-style="{
          padding: '10px',
          'font-size': '16px',
          'font-weight': 'bold',
        }"
        :footer-style="{
          padding: '10px',
        }"
      >
        <slot
          name="search-form"
          :searchFormData="searchFormCache.value"
          :searchFormData2="searchFormCache.items"
        ></slot>

        <template #footer>
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="handleSearch"
            >查询</n-button
          >
          <n-button
            type="warning"
            size="small"
            style="margin-right: 5px"
            @click="resetSearch"
            >重置</n-button
          >
          <n-button size="small" @click="handleCancel">取消</n-button>
        </template>
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
  NDrawerContent,
} from "naive-ui";
import { h, ref, reactive, defineComponent } from "vue";
import theme from "./theme.js";
import _NwTableFun from "./nw-table-fun.vue";

export const ONwTableFun = _NwTableFun;
export default defineComponent({
  props: {
    // 列
    columns: {
      type: Array,
      default: () => [],
    },
    // 数据
    data: {
      type: Array,
      default: () => null,
    },
    rowKey: {
      type: String,
      default: "id",
    },
    isNotPager: {
      type: Boolean,
      default: false,
    },
    pagerConfig: {
      type: Object,
      default: () => ({}),
    },
    lazy: {
      type: Boolean,
      default: true,
    },

    // 接口请求
    request: {
      type: Object,
      default: () => ({
        XHR: () => {}, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size,
          },
        }),
      }),
    },
    // 接口相应
    response: {
      type: Object,
      default: () => ({
        dataMethod: (res) => res,
        pageMethod: ({ total }) => total,
      }),
    },
    // 分页配置
    pagerConfig: {
      type: Object,
      default: () => ({
        enable: true, // 开启分页
        // 分页类型 server | client | none 不分页
        pageType: "server",
        // 分页属性提取，使用服务端分页时生效

        // 每页可显示选择
        pageSizes: [2, 5, 10, 20, 50],
      }),
    },
    searchFormFields: {
      type: Array,
      default: () => [],
    },
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
    NDrawerContent,
  },
  setup(props, ...p) {
    const searchFormCache = reactive({
      value: {},
      items: [],
    });
    console.log("====searchFormCache====", searchFormCache);
    const searchFormActive = ref(false); // 是否已经触发了高级查询
    const searchFormVisible = ref(false); // 查询表单展示
    // const searchFormType = ref('none')
    const gridComponent = ref(null); // 表格el
    const selected = ref([]); // 单选多选
    //

    let query;
    // 接口请求数据
    if (props.request) {
      console.log("123123props=columns==", props, p);

      let pageMethod = () => ({});
      if (props.pagerConfig.enable && props.pagerConfig.pageType === "server") {
        pageMethod = props.request.pageMethod;
      }
      query = ({ page }) => {
        // 这里发起请求
        return new Promise((resolve) => {
          // 分页
          props.request
            .XHR({
              ...searchFormCache.value,
              ...props.request.params,
              ...pageMethod(page.currentPage, page.pageSize),
            })
            .then((res) => {
              // res.map(d=>{
              //   d.hasChild = d.hasKids == 1
              //   d.children = d.kids
              // })
              // 结果
              if (props.isNotPager) {
                resolve(props.response.dataMethod(res));
              } else {
                resolve({
                  total: props.response.pageMethod(res),
                  result: props.response.dataMethod(res),
                });
              }
            });
        });
      };
    } else {
      query = (...p) => {
        // 这里发起请求
        return new Promise((resolve) => {
          resolve({
            total: props.data ? props.data.length : 0,
            result: props.data || [],
          });
        });
      };
    }
    // 表格配置
    const gridOptions = reactive({
      rowId: props.rowKey,
      size: "mini",
      stripe: true,
      border: false,
      resizable: true,
      height: "auto",
      align: null,
      columns: props.columns,
      // data: props.data,

      proxyConfig: {
        form: true,
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: "result",
          total: "total",
        },
        ajax: {
          // 接收 Promise
          query,
        },
      },
      checkboxConfig: {
        // trigger: 'row',
        reserve: true,
      },
      radioConfig: {
        // trigger: 'row',
        reserve: true,
      },
      treeConfig: {
        lazy: props.lazy,
        children: "kids",
        hasChild: "hasKids",
        loadMethod: ({ row }) => {
          //异步加载子节点
          return new Promise((resolve) => {
            rightList({ status: 1, parentId: row.id, isDefault: 0 }).then(
              (res) => {
                resolve(res);
              }
            );
          });
        },
      },
    });
    if (!props.isNotPager) {
      gridOptions.pagerConfig = {
        pageSize: 20,
        pageSizes: props.pagerConfig.pageSizes,
      };
    }

    // 事件注册
    const gridEvent = reactive({
      pageChange: (...p) => {
        console.log("pageChange...", p);
      },
      loadChildrenMethod: () => {}, //懒加载
      radioChange: ({ row }) => {
        console.log("radioChange...", p);
        selected.value = [row];
      },
      checkboxChange: ({ row, checked }) => {
        console.log("checkboxChange...", p);
        if (checked) {
          selected.value.push(row);
        } else {
          selected.value.splice(selected.value.indexOf(row), 1);
        }
      },
    });
    // 判断是否是服务端分页
    return {
      // 变量
      selected,
      searchFormCache,
      gridComponent,
      theme, // 风格
      searchFormActive, // 是否开启高级查询
      searchFormVisible,
      gridOptions,
      gridEvent,
      loadChildrenMethod: () => {}, //懒加载
      refreshColumn() {
        console.log("grid===", gridOptions);
        gridComponent.value.reloadColumn(gridOptions.columns);
      },
      pageChange: (...p) => {
        console.log("pageChange...", p);
      },
      commitProxy: (...p) => {
        gridComponent.value.commitProxy(...p);
      },
      // 发起查询请求
      commitQuery: () => {
        gridComponent.value.commitProxy("query");
      },
      //
      toggleSearchForm() {
        // 切换高级查询
        console.log("toggleSearchForm");
        searchFormVisible.value = !searchFormVisible.value; // 切换
        if (searchFormVisible.value) {
          searchFormActive.value = true;
        } else if (!searchFormCache.items.length) {
          searchFormActive.value = false;
        } else {
          searchFormActive.value = true;
        }
      },
      setVisibleSearchForm(v) {
        searchFormVisible.value = v;
      },
      handleSearch() {
        // 这里建立查询条件items
        searchFormCache.items = [];
        props.searchFormFields.forEach(({ valueFormat, ...d }) => {
          if (searchFormCache.value[d.field]) {
            searchFormCache.items.push({
              ...d,
              value: valueFormat(searchFormCache.value[d.field]),
            });
          }
        });
        gridComponent.value.commitProxy("query");
        searchFormVisible.value = false;
      },
      // 重置查询，取消高级查询状态
      resetSearch() {
        searchFormCache.value = {};
        searchFormCache.items = [];
        gridComponent.value.commitProxy("query");
        searchFormVisible.value = false;
        searchFormActive.value = false;
      },
      // 点取消
      handleCancel() {
        searchFormVisible.value = false;
        // 判断是否含有条件
        if (!searchFormCache.items.length) {
          searchFormActive.value = false;
        }
      },
    };
  },
});
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
    border-bottom: 2px solid #188ae2;
    // &-left {
    //   // float: left;
    // }
    // &-right {
    //   // float: right;
    // }
  }
  &-content {
    height: calc(~"100% - 40px");
  }
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
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