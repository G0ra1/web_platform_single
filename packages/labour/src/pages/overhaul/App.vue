<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      <n-space :size="5" style="padding: 0 5px">
        <NwFunctionPredefine code="CODE2" descr="左上预留位置按钮1"/>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-button title="筛选" @click="gridSearchRef?.toggle()">
          <template #icon>
            <nw-icon name="icon-n-y-shaixuan" />
          </template>
        </n-button>
        <n-button title="重置" type="warning" @click="refresh()">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" />
      </n-space>
    </n-layout-header>
    <NwGridSearch ref="gridSearchRef" :options="[
        {
          name: '大修轮次',
          field: 'overhaulRotation',
          vtype: 'string',
        },      
      ]">
    </NwGridSearch>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :row-config="{isCurrent: true, isHover: true}">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
  import { NwIcon, NwGridSearch, NwGridControl } from "@platform/main"
  import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup} from 'naive-ui'
  import { bind, gridRef, filterData, query, refresh, reset, gridSearchRef, gridEvents} from "./App"
  import { nextTick, inject } from 'vue'

  //只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
  (inject('Emitter') as any).on('function-complete', () => {
    reset({})
  })

  //页面加载完成后，调用的重置方法
  nextTick().then(() => {
    reset({})
  })

</script>