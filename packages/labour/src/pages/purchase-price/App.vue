<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <NwFunctionPredefine code="purchase-price-form_add" :params="addParamsArry" />
        <NwFunctionPredefine code="purchase-price-form_edit" :params="editParamsArry" :disabled ="editParamsArry[0].records<=0" />
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.contractName || ''" @update:value="(d) => filterData.contractName = d"
            placeholder="合同编号" :style="{ width: '150px' }" />
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
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
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :row-config="{ isCurrent: true, isHover: true }"
        @checkbox-change="checkboxChangeEvent" @checkbox-all="checkboxChangeEvent" :checkbox-config="checkboxConfig">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, checkboxChangeEvent, addParamsArry, editParamsArry, checkboxConfig, gridSearchRef, gridEvents  } from "./App"
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