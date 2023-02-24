<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <NwFunctionPredefine code="approach_add" :params="addParamsArry" />
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
        </n-input-group>
        <n-button title="重置" type="warning" @click="reset()">
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
      <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :row-config="{ isCurrent: true, isHover: true }">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, addParamsArry } from "./App"
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