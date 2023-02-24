<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
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
      <n-layout-header class="nw-layout-header" style="height: auto">
        <n-space :size="5" style="padding: 0 0 5px 0; width:100%;" justify="space-between" align="center" >
        <!--放功能按钮的地方-->
         <div>
         <NwFunctionPredefine code="sync-workcontractdate" />
         <NwFunctionPredefine code="sync-workcontractcode" />
         </div>
        <!-- </n-space>
      <n-space :size="5" style="padding: 0 5px"> -->
        <n-form label-placement="left" :show-feedback="false" inline>
          <n-form-item label="合同名称:">
              <n-input :value="filterData.contractname || ''" @update:value="(d) => filterData.contractname = d"
              placeholder="合同名称" :style="{ width: '150px' }" style="margin-right: 10px" />
          </n-form-item>
          <n-form-item label="合同编号:">
          <n-input :value="filterData.contractcode || ''" @update:value="(d) => filterData.contractcode = d"
            placeholder="合同编号" :style="{ width: '150px' }" />
          </n-form-item>
          <n-form-item label="机构:">
          <!-- <n-input :value="filterData.organname || ''" @update:value="(d) => filterData.organname = d"
            placeholder="机构" :style="{ width: '150px' }" /> -->
            <n-select
            placeholder="机构"
            :value="filterData.organname || ''"
            :options="organnameOptions"
            :consistent-menu-width="false"
            @update:value="(d)=>{filterData.organname = d }"
            :style="{
              width: '200px' 
            }"
            @select="(d)=>{}"
            >
            </n-select>
          </n-form-item>
          <n-form-item label="业主单位:">
            <n-select
            placeholder="业主单位"
            :value="filterData.ownercompanyname || ''"
            :consistent-menu-width="false"
            :options="ownercompanynameOptions"
            @update:value="(d)=>{filterData.ownercompanyname = d }"
            :style="{
              width: '200px' 
            }"
            @select="(d)=>{}"
            >
            </n-select>
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
            <nw-icon name="icon-n-y-export"  @click="downloadWorkContract"/>
          </template>
        </n-button>
        <!-- <n-button title="打印" @click="gridRef?.print()">
          <template #icon>
            <nw-icon name="icon-n-y-print" />
          </template>
        </n-button>
        <n-button>
          <template #icon>
            <nw-icon name="icon-n-y-column" />
          </template>
        </n-button>
        <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" /> -->
      </n-form>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" v-on="gridEvents" ref="gridRef">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine,NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup, NTabs, NTab,NFormItem,NSelect,NForm } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, contractTypeQuery ,gridEvents, gridSearchRef,downloadWorkContract,organnameOptions,ownercompanynameOptions} from "./App"
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