<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-layout class="nw-table" ref="tbody">
      <n-layout-header class="nw-table-header">
        <div class="nw-table-header-left">
          <slot name="header-left"
           :selected="selected" :searchFormData="searchFormCache.value">
           </slot>
          <!-- {{ selected.length ? `已选择${selected.length}项` : "" }} -->
          <!-- <nw-icon
            v-if="selected.length"
            name="icon-cuowu"
            color="red"
            style="cursor: pointer"
            title="取消全选"
            @click="clearSelected"
          />-->
        </div>
        <div class="nw-table-header-right">
          <slot name="header-right"></slot>
          <!-- 这里是表格基础工具 -->
          <!-- <n-button type="info" size="small" style="margin-right: 5px" @click="() => {}">保存</n-button> -->
          <n-button
            size="small"
            class="icon-btn"
            style="margin-right: 5px; padding: 0 5px"
            @click="() => {}"
          >
            <template #icon>
              <nw-icon name="icon-shuaxin2" :size="18" />
            </template>
          </n-button>
          <n-button
            size="small"
            class="icon-btn"
            style="margin-right: 5px; padding: 0 5px"
            @click="() => {}"
          >
            <template #icon>
              <nw-icon name="icon-daoru1" :size="18" />
            </template>
          </n-button>
          <n-button
            size="small"
            class="icon-btn"
            style="margin-right: 5px; padding: 0 5px"
            @click="() => {}"
          >
            <template #icon>
              <nw-icon name="icon-daochu1" :size="18" />
            </template>
          </n-button>
          <n-button
            size="small"
            class="icon-btn"
            style="margin-right: 5px; padding: 0 5px"
            @click="() => {}"
          >
            <template #icon>
              <nw-icon name="icon-dayin" :size="18" />
            </template>
          </n-button>
          <!-- <n-button
            size="small"
            style="margin-right: 5px; padding: 0 5px"
            @click="() => {}"
          >
            <template #icon>
              <nw-icon name="icon-yulan" :size="18" />
            </template>
          </n-button>-->
          <n-button
            size="small"
            class="icon-btn"
            style="margin-right: 5px; padding: 0 5px"
            @click="switchHeaderSearch"
          >
            <nw-icon name="icon-yuanweichaxun" :size="18" />
          </n-button>
          <n-popover trigger="click" placement="bottom">
            <template #trigger>
              <n-button size="small" class="icon-btn" style="margin-right: 5px; padding: 0 5px">
                <template #icon>
                  <nw-icon name="icon-ziduanshezhi" :size="18" />
                </template>
              </n-button>
            </template>
            <columnCtrl :data="tsColumns" @callback="ctrlCallBack"></columnCtrl>
          </n-popover>

          <n-dropdown @select="patternHandleSelect" :options="patternOptions" trigger="click">
            <n-button size="small" class="icon-btn" style="margin-right: 5px; padding: 0 5px">
              <template #icon>
                <nw-icon name="icon-midu1" :size="18" />
              </template>
            </n-button>
          </n-dropdown>
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
            class="mytable mytable-scrollbar"
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
          <n-button type="info" size="small" style="margin-right: 5px" @click="handleSearch">查询</n-button>
          <n-button type="warning" size="small" style="margin-right: 5px" @click="resetSearch">重置</n-button>
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
  NDropdown,
  NPopover
} from "naive-ui";
import { h, ref, reactive, defineComponent, nextTick } from "vue";
import theme from "./theme.js";
import _NwTableFun from "./nw-table-fun.vue";
import { cloneDeep } from "lodash";
import NwIcon from "/@/components/nw-icon/index.vue";
import columnCtrl from "./columnCtrl.vue";
export const NwTableFun = _NwTableFun;
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
      default: () => null
    },
    rowKey: {
      type: String,
      default: "id"
    },
    pagerConfig: {
      type: Object,
      default: () => ({})
    },
    rowClassName: {
      type: Function,
      default: () => {}
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
            size
          }
        })
      })
    },
    // 接口相应
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records,
        pageMethod: ({ total }) => total
      })
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
        pageSizes: [2, 5, 10, 20, 50]
      })
    },
    searchFormFields: {
      type: Array,
      default: () => []
    },
    headerSearchForm: {
      type: Object,
      default: () => {}
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
    NDrawerContent,
    NwIcon,
    NDropdown,
    columnCtrl,
    NPopover
  },
  setup(props, ...p) {
    console.log("====props=columns==", props, p);
    const searchFormCache = reactive({
      value: {},
      items: []
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
        return new Promise(resolve => {
          // 分页
          props.request
            .XHR({
              ...searchFormCache.value,
              ...props.request.params,
              ...props.headerSearchForm,
              ...pageMethod(page.currentPage, page.pageSize)
            })
            .then(res => {
              const result = props.response.dataMethod(res);
              // 设置选中
              gridComponent.value.setCheckboxRow(
                result.filter(d =>
                  selected.value.find(f => f[props.rowKey] === d[props.rowKey])
                ),
                true
              );
              // 结果
              resolve({
                total: props.response.pageMethod(res),
                result
              });
            });
        });
      };
    } else {
      query = (...p) => {
        // 这里发起请求
        return new Promise(resolve => {
          resolve({
            total: props.data ? props.data.length : 0,
            result: props.data || []
          });
        });
      };
    }
    const tsColumns = ref(cloneDeep(props.columns));
    const isEnableHeaderSearch = ref(false);
    const formattingColumns = (columns = props.columns) => {
      console.log(columns, "columnscolumnscolumns");
      return cloneDeep(columns).map(d => {
        if (d.children) {
          if (cloneDeep(d.children[0]).slots.default) {
            d.slots = { default: cloneDeep(d.children[0]).slots.default };
          }
          d.children = [];
          return d;
        } else {
          return d;
        }
      });
    };
    const tableColumns = reactive({
      notEnableHeaderSearchColumns: formattingColumns(),
      enableHeaderSearchColumns: props.columns
    });
    const switchHeaderSearch = () => {
      isEnableHeaderSearch.value = !isEnableHeaderSearch.value;
      gridOptions.columns = isEnableHeaderSearch.value
        ? tsColumns.value
        : formattingColumns(tsColumns.value);
    };
    // 表格配置
    const gridOptions = reactive({
      rowId: props.rowKey,
      size: "mini",
      stripe: true,
      border: false,
      resizable: true,
      height: "auto",
      align: null,
      // 新增加属性
      highlightCurrentRow: true,
      highlightHoverRow: true,
      isCurrent: true,
      isHover: true,
      // 新增加结束
      columns: isEnableHeaderSearch.value
        ? tableColumns.enableHeaderSearchColumns
        : tableColumns.notEnableHeaderSearchColumns,
      rowClassName: props.rowClassName,
      // data: props.data,
      pagerConfig: {
        pageSize: 20,
        pageSizes: props.pagerConfig.pageSizes
      },
      proxyConfig: {
        form: true,
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: "result",
          total: "total"
        },
        ajax: {
          // 接收 Promise
          query
        }
      },
      checkboxConfig: {
        // trigger: 'row',
        // reserve: true
      },
      radioConfig: {
        // trigger: 'row',
        reserve: true
      }
    });
    // 事件注册
    const gridEvent = reactive({
      pageChange: (...p) => {
        console.log("pageChange...", p);
      },
      radioChange: ({ row, rowIndex }) => {
        console.log("radioChange...", p);
        gridComponent.value.setCurrentRow(row);
        // 这里改为
        selected.value = [row];
      },
      checkboxChange: ({ row, checked, rowIndex }) => {
        if (checked) {
          gridComponent.value.setCurrentRow(row);
          selected.value.push(cloneDeep(row));
        } else {
          selected.value = selected.value.filter(
            d => d[props.rowKey] !== row[props.rowKey]
          );
          // selected.value.splice(selected.value.indexOf(row), 1)
        }
        console.log("checkboxChange...", cloneDeep(row), selected.value);
      },
      resizableChange:({ rowIndex, column, columnIndex, $columnIndex, $event })=>{
        console.log(rowIndex, column, columnIndex, $columnIndex, $event)
      }
    });
    // 表格重载
    const loadColumn = () => {
      gridComponent.value.loadColumn(gridOptions.columns);
    };
    // 列自定义回调
    const ctrlCallBack = (type, parameter) => {
      console.log(type);
      console.log(parameter);
      switch (type) {
        case "sort":
          sortColumn(parameter);
          break;
        case "columnVisible":
          columnVisible(parameter);
          break;
        case "fixedLeft":
          toggleFixedColumn(parameter + 2, "left");
          break;
        case "fixedRight":
          toggleFixedColumn(parameter + 2, "right");
          break;
        default:
          break;
      }
    };
    // 列排序
    const sortColumn = parameter => {
      let newCol = cloneDeep(parameter);
      newCol.forEach((e, i) => {
        if (tsColumns.value[i + 2].field != e.field) {
          tsColumns.value[i + 2] = e;
        }
      });
      gridOptions.columns = formattingColumns(tsColumns.value);
      loadColumn();
    };
    // 列折叠
    const columnVisible = parameter => {
      let newCol = cloneDeep(parameter);
      newCol.forEach((e, i) => {
        tsColumns.value[i + 2].visible = e._visible;
      });
      gridOptions.columns = formattingColumns(tsColumns.value);
      loadColumn();
    };
    // 模式配置  宽松紧凑标准
    const showPatternDropdown = ref(false);
    const patternHandleSelect = key => {
      console.log(key);
      showPatternDropdown.value = false;
      gridOptions.size = key;
      loadColumn();
    };
    const patternOptions = [
      {
        label: "紧凑",
        key: "mini"
      },
      {
        label: "默认",
        key: "small"
      },
      {
        label: "宽松",
        key: "medium"
      }
    ];
    // 设置列左右固定
    const toggleFixedColumn = async (index, value) => {
      const $table = gridComponent.value;
      // 更改了列属性，需要手动刷新列
      gridOptions.columns[index].fixed =
        gridOptions.columns[index].fixed &&
        gridOptions.columns[index].fixed == value
          ? null
          : value;
      // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
      loadColumn();
      // await nextTick();
      // await $table.refreshColumn();
      // await $table.refreshScroll();
    };
    // 判断是否是服务端分页
    return {
      // 列折叠
      columnVisible,
      // 列 暂存数据 一系列操作的中间数据   props.columns 用于还原
      tsColumns,
      // 列控制回调
      ctrlCallBack,
      // 重载表格
      loadColumn,
      // 模式变量 方法
      showPatternDropdown,
      patternOptions,
      patternHandleSelect,
      //列左右固定
      toggleFixedColumn,
      // 变量
      isEnableHeaderSearch,
      tableColumns,
      switchHeaderSearch,
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
      //
      toggleSearchForm() {
        // 切换高级查询
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
              value: valueFormat(searchFormCache.value[d.field])
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
      }
    };
  }
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
    &-left {
      float: left;
      display: flex;
      width: 800px;
      align-content: space-around;
      align-items: center;
      &-btn {
        width: 100px;
        margin-left: -10px;
      }
    }
    &-right {
      display: flex;
      .icon-btn:hover {
        background: rgba(63, 143, 255, 0.2);
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.08);
      }
    }
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
.mytable {
  .vxe-table--render-default.size--mini {
    font-size: 14px;
  }
  .vxe-table--render-default.size--mini .vxe-body--column.col--ellipsis {
    height: 38px;
  }
  .vxe-table--render-default.size--small {
    font-size: 16px;
  }
  .vxe-table--render-default.size--small .vxe-body--column.col--ellipsis {
    height: 48px;
  }
  .vxe-table--render-default.size--medium {
    font-size: 18px;
  }
  .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis {
    height: 58px;
  }
}
</style>