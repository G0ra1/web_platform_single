<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <!--放功能按钮的地方-->
        <NwFunctionPredefine code="expenses-supp-form_add" :params="addArryParams" />
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-form label-placement="left" :show-feedback="false" inline>
          <n-form-item label="承包合同名称:">
            <n-input :value="filterData.contractWorkName  || ''" @update:value="(d) => filterData.contractWorkName  = d"
              placeholder="承包合同名称" :style="{ width: '150px' }" style="margin-right: 10px" />
          </n-form-item>
          <n-form-item label="虚拟订单名称:">
            <n-input :value="filterData.virtualPurchaseName  || ''" @update:value="(d) => filterData.virtualPurchaseName  = d"
              placeholder="虚拟订单名称" :style="{ width: '150px' }" style="margin-right: 10px" />
          </n-form-item>
          <n-button type="primary" @click="query()"> 
            搜索
          </n-button>
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
          <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" />
        </n-form>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind"  ref="gridRef" :stripe="true" :row-config="{ isCurrent: true, isHover: true }">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine,NwGridControl,NwGridSearch } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NTabs, NTab,NForm,NFormItem} from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, addArryParams, gridSearchRef, gridEvents } from "./App"
import { nextTick, inject } from 'vue'

//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
  refresh()
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  refresh()
})

</script>