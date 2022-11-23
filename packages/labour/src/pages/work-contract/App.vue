<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      <n-tabs type="line" trigger="click" @update:value="contractTypeQuery">
        <n-tab name="">
          全部
        </n-tab>
        <n-tab name="1">
          框架合同
        </n-tab>
        <n-tab name="2">
          非框架合同
        </n-tab>
        <n-tab name="3">
          子合同
        </n-tab>
        <n-tab name="4">
          子订单
        </n-tab>
      </n-tabs>
    </n-layout-header>
    <n-layout-header class="nw-layout-header" >
      <n-space :size="5" style="padding: 0 5px">
        <!--放功能按钮的地方-->
        <NwFunctionPredefine code="sync-workcontractdate"/>
        <NwFunctionPredefine code="sync-workcontractcode"/>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.contractcode || ''" @update:value="(d: string) => filterData.contractcode = d" placeholder="合同编号" :style="{ width: '150px' }" />
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
        </n-input-group>
        <n-button  title="重置" type="warning" @click="refresh()">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <n-button  title="导入" >
          <template #icon>
            <nw-icon name="icon-n-y-import" />
          </template>
        </n-button>
        <n-button  title="导出" >
          <template #icon>
            <nw-icon name="icon-n-y-export" />
          </template>
        </n-button>
        <n-button  title="打印" @click="gridRef?.print()" >
          <template #icon>
            <nw-icon name="icon-n-y-print" />
          </template>
        </n-button>
        <n-button  >
          <template #icon>
            <nw-icon name="icon-n-y-column" />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :row-config="{isCurrent: true, isHover: true}">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
  import { NwIcon, NwFunctionPredefine } from "@platform/main"
  import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup, NTabs, NTab} from 'naive-ui'
  import { bind, gridRef, filterData, query, refresh, reset, contractTypeQuery} from "./App"
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