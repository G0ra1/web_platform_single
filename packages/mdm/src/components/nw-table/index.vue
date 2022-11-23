<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-layout class="nw-table" ref="tbody">
      <n-layout-header class="nw-table-header">
        <div class="nw-table-header-left" style="display: flex">
          <slot
            name="header-left"
            :selected="selected"
            :searchFormData="searchFormCache.value"
          ></slot>
          <div style="width: 120px; line-height: 32px">
            {{ selected.length ? `已选择${selected.length}项` : "" }}
            <nw-icon
              v-if="selected.length"
              name="icon-cuowu"
              color="red"
              style="cursor: pointer"
              title="取消全选"
              @click="clearSelected"
            />
          </div>
        </div>
        <div class="nw-table-header-right">
          <slot name="header-right"></slot>
          <!-- 这里是表格基础工具 -->
          <!-- 这里放置表格功能 -->
        </div>
        <!-- <n-switch v-model:value="collapsed" /> -->
      </n-layout-header>
      <!-- <n-layout-header style="height: 200px;">
        header2
        {{active}}
      </n-layout-header>-->
      <n-layout has-sider class="nw-table-content">
        <n-layout-content>
          <vxe-grid
            v-bind="gridOptions"
            ref="gridComponent"
            class="mytable-scrollbar"
            v-on="gridEvent"
          >
            <!-- <template #pager>
            <vxe-pager
              :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
              v-model:current-page="tablePage.currentPage"
              v-model:page-size="tablePage.pageSize"
              :total="tablePage.total"
              @page-change="handlePageChange">
            </vxe-pager>
            </template>-->
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
        </n-layout-sider>-->
      </n-layout>
      <!-- <n-layout-footer>
        footer
      </n-layout-footer>-->
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
import { cloneDeep } from "lodash";
import { NwIcon } from '@platform/main'

export const NwTableFun = _NwTableFun;
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
    pagerConfig: {
      type: Object,
      default: () => ({}),
    },
    rowConfig: {
      type: Object,
      default: () => ({}),
    },
    rowClassName: {
      type: Function,
      default: () => {},
    },
    currentChange: {
      type: Function,
      default: () => {},
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
        dataMethod: (res) => res.records,
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
    NwIcon,
  },
  setup(props, ...p) {
    console.log("====props=columns==", props, p);
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
      let pageMethod = () => ({});
      if (props.pagerConfig.enable && props.pagerConfig.pageType === "server") {
        pageMethod = props.request.pageMethod;
      }
      query = ({ page }) => {
        // 取消所有选中
        gridComponent.value.setAllCheckboxRow(false);
        //
        // 这里发起请求
        return new Promise((resolve) => {
          // 分页
          props.request
            .XHR({
              ...props.request.params,
              ...searchFormCache.value,
              ...pageMethod(page.currentPage, page.pageSize),
            })
            .then((res) => {
              const result = props.response.dataMethod(res);
              // 设置选中
              gridComponent.value.setCheckboxRow(
                result.filter((d) =>
                  selected.value.find(
                    (f) => f[props.rowKey] === d[props.rowKey]
                  )
                ),
                true
              );
              // 结果
              resolve({
                total: props.response.pageMethod(res),
                result,
              });
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
      size: "mini",
      stripe: true,
      border: false,
      height: "auto",
      align: null,
      columns: props.columns,
      rowClassName: props.rowClassName,
      // data: props.data,
      pagerConfig: {
        pageSize: 20,
        pageSizes: props.pagerConfig.pageSizes,
      },
      columnConfig: {
        resizable: true,
      },
      rowConfig: {
        keyField: props.rowKey,
      },
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
      rowConfig: {
        isCurrent: true,
        isHover: true,
      },
      checkboxConfig: {
        trigger: "cell",
        reserve: true,
      },
      radioConfig: {
        // trigger: 'row',
        reserve: true,
      },
    });
    // 事件注册
    const gridEvent = reactive({
      pageChange: (...p) => {
        console.log("pageChange...", p);
      },
      radioChange: ({ row }) => {
        console.log("radioChange...", p);
        // 这里改为
        selected.value = [row];
      },
      checkboxChange: ({ row, checked }) => {
        if (checked) {
          selected.value.push(cloneDeep(row));
        } else {
          selected.value = selected.value.filter(
            (d) => d[props.rowKey] !== row[props.rowKey]
          );
          // selected.value.splice(selected.value.indexOf(row), 1)
        }
        console.log("checkboxChange...", cloneDeep(row), selected.value);
      },
      checkboxAll: ({ records, checked }) => {
        if (checked) {
          selected.value = cloneDeep(records);
        } else {
          selected.value = []
          // selected.value.filter(
          //   (d) => d[props.rowKey] !== row[props.rowKey]
          // );
          // selected.value.splice(selected.value.indexOf(row), 1)
        }
        // console.log("checkboxChange...", cloneDeep(row), selected.value);
      },
      currentChange: ({ row, rowIndex }) => {
        props.currentChange(row, rowIndex);
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
      handlePageChange: () => {},
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
      // 加载列配置
      loadColumn: (columns) => {
        gridComponent.value.loadColumn(columns);
      },
      // 获取表单数据
      getTableData: (columns) => {
        return gridComponent.value.getTableData();
      },
      // 设置高亮
      setCurrentRow: (row) => {
        gridComponent.value.setCurrentRow(row);
      },
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
      // 设置select
      clearSelected() {
        selected.value = [];
        gridComponent.value.setAllCheckboxRow(false);
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
    // border-bottom: 2px solid #188ae2;
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