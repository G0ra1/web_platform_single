<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-layout class="nw-table" ref="tbody">
      <n-layout-header class="nw-table-header">
        <div class="nw-table-header-left" style="position: relative">
          <slot name="header-left" :selected="selected" :searchFormData="searchFormCache.value"></slot>

        </div>
        <div class="nw-table-header-right">
          <slot name="header-right"></slot>
          <n-form class="nw-table-header-right-form" inline label-align="left" label-placement="left"
            :show-feedback="false">
            <n-input-group>
              <n-input size="small" placeholder="请输入" v-model:value="searchValue" clearable
                :style="{ width: '100%', height: '32px' }">
                <template #suffix>
                  <NwIcon @click="fastSearch" style="cursor:pointer" name="icon-sousuo1" :size="20"></NwIcon>
                </template>
              </n-input>
            </n-input-group>
            <n-button text :style="{
              height: '28px',
              width: '36px',
              marginLeft: '15px',
              background: '#F8F8FC',
            }" color="#ff69b4" @click="toggleSearchForm" size="small">
              <img style="width: 32px; margin-top: 5px" :src="
                searchFormVisible
                  ? '/assets/image/guolv2.png'
                  : '/assets/image/guolv1.png'
              " />
            </n-button>
          </n-form>
          {{ selected.length ? `已选择${selected.length}项` : "" }}
          <nw-icon v-if="selected.length" name="icon-cuowu" color="red" style="cursor: pointer" title="取消全选"
            @click="clearSelected" />
          <!-- 这里是表格基础工具 -->
          <!-- 这里放置表格功能 -->
        </div>
        <div :style="{
          height: '15px',
          width: ' 100%',
          position: 'absolute',
          top: '45px',
        }" id="myheader"></div>
        <!-- <n-switch v-model:value="collapsed" /> -->
      </n-layout-header>

      <!-- <n-layout-header style="height: 200px;">
        header2
        {{active}}
      </n-layout-header>-->
      <n-layout has-sider class="nw-table-content">
        <n-layout-content>
          <vxe-grid v-bind="gridOptions" ref="gridComponent" class="mytable-scrollbar" v-on="gridEvent">
            <template #toolbar_buttons v-if="props.labelCodes.length">
              <div style="width:100%;height:30px;padding:12px 0px 0px 5px;background-color:white">
                标签：<n-radio-group v-model:value="labelValue" name="radiobuttongroup1" @update:value="typeSearch">
                  <n-space>
                    <n-radio-button size="small" v-for="item in props.labelCodes" :key="item.value" :value="item.value">
                      {{ item.label }}</n-radio-button>
                  </n-space>
                </n-radio-group>
              </div>
            </template>
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
    <n-drawer :show="searchFormVisible" width="100%" height="280" placement="top" style="background: #f8f8fc"
      to="#myheader">
      <n-drawer-content :footer-style="{
        padding: '10px',
        justifyContent: 'flex-start',
      }">
        <slot name="search-form" :searchFormData="searchFormCache.value" :searchFormData2="searchFormCache.items">
        </slot>
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
  NInput,
  NForm,
  NSelect,
  NInputGroup,
  NDrawerContent,
  NDatePicker,
  NRadioGroup,
  NRadioButton,
} from "naive-ui";
import { h, ref, reactive, defineComponent } from "vue";
import theme from "./theme.js";
import _NwTableFun from "./nw-table-fun.vue";
import { cloneDeep } from "lodash";
import NwIcon from "/@/components/nw-icon/index.vue";
import { format } from "date-fns";
export const NwTableFun = _NwTableFun;
export default defineComponent({
  props: {
    // 列
    columns: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: () => 'questionCode',
    },

    labelCodes: {
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
    defaultKey: {
      type: String,
      default: "workHourCode",
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
      default: () => { },
    },
    currentChange: {
      type: Function,
      default: () => { },
    },
    // 接口请求
    request: {
      type: Object,
      default: () => ({
        XHR: () => { }, // promise 请求函数
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
  emits: ["callback"],
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
    NInput,
    NForm,
    NSelect,
    NInputGroup,
    NDatePicker,
    NRadioGroup,
    NRadioButton,
  },
  setup(props, p) {
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
    const labelValue = ref('')
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
      size: "small",
      stripe: true,
      border: false,
      height: "auto",
      align: null,
      columns: props.columns.map(d => { console.log(d); !d.minWidth ? d.minWidth = 120 : ""; return d }),
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
        isCurrent: true,
        isHover: true,
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
      checkboxConfig: {
        trigger: 'cell',
        reserve: true
      },
      radioConfig: {
        // trigger: 'row',
        reserve: true,
      },
      toolbarConfig: props.labelCodes.length ? {
        custom: false,
        // className: props.labelCodes.length ? 'showTool' :'hidenTool',
        slots: {
          buttons: props.labelCodes.length ? 'toolbar_buttons' : null
        }
      } : null,
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
      currentChange: ({ row, rowIndex }) => {
        props.currentChange(row, rowIndex);
      },
    });
    // 判断是否是服务端分页
    // 下拉搜索功能
    const searchKey = ref(props.defaultKey);
    const searchValue = ref("");
    const searchType = ref("");
    const dateRange = ref([Date.now(), Date.now()]);
    const searchKeyUpdate = (key) => {
      resetSearch();
      searchKey.value = key;
      searchType.value = key.split(".")[0];
      console.log(
        searchType.value,
        "searchType.valuesearchType.valuesearchType.value"
      );
      searchValue.value = "";
    };
    const searchOption = () => {
      return props.columns
        .filter((d) => d.field)
        .map((d) => {
          return {
            label: d.title,
            value: d.field,
          };
        });
    };
    // 学员端用到标签搜索
    const typeSearch = (v) => {
      searchFormCache.value[props.labelKey] = v;
      gridComponent.value.commitProxy("query");
      p.emit("callback");
    }
    const fastSearch = () => {
      if (searchType.value == "daterange") {
        let v = dateRange.value;
        let d1;
        let d2;
        let k1;
        let k2;
        if (v[0] && v[1]) {
          d1 = format(v[0], "yyyy-MM-dd") + " " + "00:00:00";
          d2 = format(v[1], "yyyy-MM-dd") + " " + "23:59:59";
        }
        k1 = searchKey.value.split(".")[1].split("-")[0];
        k2 = searchKey.value.split(".")[1].split("-")[1];
        searchFormCache.value[k1] = d1;
        searchFormCache.value[k2] = d2;
      } else {
        searchFormCache.value['searchCondition'] = searchValue.value;
      }
      gridComponent.value.commitProxy("query");
      p.emit("callback");
      // searchFormData.value[searchKey.value] = searchValue.value
      // queryTable()
    };
    const resetSearch = () => {
      searchFormCache.value = {};
      searchFormCache.items = [];
      gridComponent.value.commitProxy("query");
      searchFormVisible.value = false;
      searchFormActive.value = false;
      p.emit("callback");
    };
    const handleSearch = () => {
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
      p.emit("callback");
    };
    return {
      props,
      labelValue,
      // 变量
      selected,
      searchFormCache,
      gridComponent,
      theme, // 风格
      searchFormActive, // 是否开启高级查询
      searchFormVisible,
      gridOptions,
      gridEvent,
      // 下拉搜索部分
      searchKeyUpdate,
      searchOption,
      searchKey,
      searchValue,
      typeSearch,
      fastSearch,
      dateRange,
      searchType,

      // 下拉搜索部分
      handlePageChange: () => { },
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
        p.emit("callback");
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
      handleSearch,
      // 重置查询，取消高级查询状态
      resetSearch,
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

<style lang='less' >
// 表格样式
.nw-table {
  height: 100%;

  &-header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 5px;
    border: 1px solid #e6e9f0;

    // border-bottom: 2px solid #188ae2;
    // &-left {
    //   // float: left;
    // }
    &-right {
      display: flex;

      &-form.n-form.n-form--inline {
        width: 284px;
      }
    }
  }

  &-content {
    height: calc(~"100% - 50px");
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

.nw-page .n-drawer .n-drawer-content.n-drawer-content--native-scrollbar .n-drawer-body-content-wrapper {
  padding: 10px 0px;
}

.vxe-table--render-default.size--small {
  font-size: 14px;
}

.vxe-table--render-default.size--small .vxe-body--column:not(.col--ellipsis),
.vxe-table--render-default.size--small .vxe-footer--column:not(.col--ellipsis),
.vxe-table--render-default.size--small .vxe-header--column:not(.col--ellipsis) {
  padding: 12px 0;
}

.vxe-table--render-default.size--small .vxe-header--column:not(.col--ellipsis) {
  padding: 14px 0;
}

.vxe-toolbar .hidenTool {
  display: none !important;
}

.vxe-toolbar .showTool {
  display: block;
}
</style>