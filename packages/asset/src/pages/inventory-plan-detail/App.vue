<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main";
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
  inventoryPlanId
} from "./App";
import { nextTick, inject } from "vue";
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject("Emitter") as any).on("function-complete", () => {
  reset({'inventoryPlanId' : inventoryPlanId})
});

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  reset({'inventoryPlanId' : inventoryPlanId})
});
</script>
<template>
  <n-layout has-sider class="nw-layout-full">
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区头部 start -->
      <n-layout-header class="nw-layout-header">
        <n-space :size="5" style="padding: 0 5px">
            <n-button title="筛选" @click="gridSearchRef?.toggle()">
                <template #icon>
                    <nw-icon name="icon-n-y-shaixuan" />
                </template>
            </n-button>
            <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" />
        </n-space>
        <NwGridSearch ref="gridSearchRef" :options="[
                {
                    name: '任务标题',
                    field: 'taskTitle',
                    vtype: 'string',
                },
                {
                    name: '任务名称',
                    field: 'taskName',
                    vtype: 'string',
                },
                {
                    name: '任务类型',
                    field: 'taskType',
                    vtype: 'dic',
                    dictCode: 'asset_type',
                },
            
            ]">
            </NwGridSearch>
      </n-layout-header>
      <!-- 内容区头部 end -->
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" v-on="gridEvents" :ref="(d: any) => gridRef = d" > </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
</template>