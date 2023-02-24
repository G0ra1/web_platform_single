<script lang="ts" setup>
import {
  NwIcon,
  NwFunctionPredefine,
  Page,
  NwGridSearch,
  NwGridControl,
} from "@platform/main";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInput,
  NSelect,
  NInputGroup,
  useDialog,
  NButton,
} from "naive-ui";
import {
  bind,
  gridRef,
  filterData,
  query,
  refresh,
  reset,
  paramsArray,
  initDialog,
  gridSearchRef,
  gridEvents,
} from "./App";
import { nextTick, inject } from "vue";
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject("Emitter") as any).on("function-complete", () => {
  reset({ dealApplyId: Page.getMenuData().id });
});

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  reset({ dealApplyId: Page.getMenuData().id });
});
console.log("Page.getMenuData()=", Page.getMenuData());
</script>
<template>
  <n-layout has-sider class="nw-layout-full">
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区头部 start -->
      <n-layout-header class="nw-layout-header">
        <n-space :size="5" style="padding: 0 5px">
          <!--放功能按钮的地方-->
          <NwFunctionPredefine
            code="assetAppraisalFormAdd"
            :params="paramsArray"
          />
        </n-space>
        <n-space :size="5" style="padding: 0 5px">
          <!-- <n-button title="筛选" @click="gridSearchRef?.toggle()">
            <template #icon>
              <nw-icon name="icon-n-y-shaixuan" />
            </template>
          </n-button>
          <NwGridControl
            v-model:bind-options="bind"
            v-model:grid-events="gridEvents"
          /> -->
          <n-input-group>
            <n-input
              :value="filterData.code || ''"
              @update:value="(d: string) => filterData.code = d"
              placeholder="编号"
              :style="{ width: '150px' }"
              style="margin-right: 10px"
            />
            <n-input
              :value="filterData.auditSuccessTiem || ''"
              @update:value="(d: string) => filterData.auditSuccessTiem = d"
              placeholder="审批通过时间"
              :style="{ width: '150px' }"
              style="margin-right: 10px"
            />

            <n-button type="primary" @click="query()"> 搜索 </n-button>
          </n-input-group>
          <n-button title="重置" type="warning" @click="refresh()">
            <template #icon>
              <nw-icon name="icon-n-y-refresh" />
            </template>
          </n-button>
          <n-button title="导入">
            <template #icon>
              <nw-icon name="icon-n-y-import" />
            </template>
          </n-button>
          <n-button title="导出">
            <template #icon>
              <nw-icon name="icon-n-y-export" />
            </template>
          </n-button>
          <n-button title="打印" @click="gridRef?.print()">
            <template #icon>
              <nw-icon name="icon-n-y-print" />
            </template>
          </n-button>
          <n-button>
            <template #icon>
              <nw-icon name="icon-n-y-column" />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <NwGridSearch
        ref="gridSearchRef"
        :options="[
          {
            name: '鉴定单号',
            field: 'code',
            vtype: 'string',
          },
          {
            name: '申请人',
            field: 'createUserName',
            vtype: 'string',
          },
          {
            name: '申请时间',
            field: 'applyTime',
            vtype: 'date',
          },
        ]"
      >
      </NwGridSearch>
      <!-- 内容区头部 end -->
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" ref="gridRef"> </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
</template>
