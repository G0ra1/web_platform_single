<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine , NwGridSearch, NwGridControl} from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup, NTabs, NTab ,NForm,NFormItem,NSelect} from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, contractTypeQuery,gridEvents,exportTemplate,downloadPurchase,datastatsOpention,partanameOptions,partbnameOptions } from "./App"
import { nextTick, inject } from 'vue'
import  Purchase  from './data/Purchase'

//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
  reset({})
})


//页面加载完成后，调用的重置方法
nextTick().then(() => {
  reset({})
})

</script>
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
          常规合同
        </n-tab>
        <n-tab name="3">
          项下订单
        </n-tab>
      </n-tabs>
    </n-layout-header>
    <n-layout-header class="nw-layout-header" style="height: auto">
      <n-space :size="5" style="padding: 0 0 5px 0; width:100%;" justify="space-between" align="center" >
        <!--放功能按钮的地方-->
        <div>
        <NwFunctionPredefine code="syncPurchaseContractDate" />
        <NwFunctionPredefine code="syncPurchaseContractCode" />
        </div>
      <!-- </n-space>
      <n-space :size="5" style="padding: 0 5px"> -->
        <n-form label-placement="left" :show-feedback="false" inline>
          <n-form-item label="合同名称:">
              <n-input :value="filterData.contractname || ''" @update:value="(d) => filterData.contractname = d"
              placeholder="合同名称" :style="{ width: '120px' }" style="margin-right: 10px" />
          </n-form-item>
          <n-form-item label="合同编号:">
          <n-input :value="filterData.contractcode || ''" @update:value="(d) => filterData.contractcode = d"
            placeholder="合同编号" :style="{ width: '120px' }" />
          </n-form-item>
          <n-form-item label="数据完善状态:" >
            <n-select placeholder="数据完善状态"
              :value="filterData.datastatus"
              :options="datastatsOpention"
              @update:value="(d)=>{filterData.datastatus = d }"
              :style="{
                  width: '120px' 
              }"
              @select="(d)=>{}"
              > 
            </n-select>
            </n-form-item>
            <n-form-item label="甲方单位:" >
              <n-select
            placeholder="甲方单位"
            :consistent-menu-width="false"
            :value="filterData.partaname || ''"
            :options="partanameOptions"
            @update:value="(d)=>{filterData.partaname = d }"
            :style="{
              width: '120px' 
            }"
            @select="(d)=>{}"
            >
            </n-select>
            </n-form-item>
            <n-form-item label="乙方单位:" >
              <n-input :value="filterData.partbname || ''" @update:value="(d) => filterData.partbname = d"
              placeholder="乙方单位" :style="{ width: '120px' }" style="margin-right: 10px" />
              <!-- <n-select
            placeholder="乙方单位"
            :consistent-menu-width="false"
            :value="filterData.partbname || ''"
            :options="partbnameOptions"
            @update:value="(d)=>{filterData.partbname = d }"
            :style="{
              width: '120px' 
            }"
            @select="(d)=>{}"
            >
            </n-select> -->
            </n-form-item>
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
        <n-button title="重置" type="warning" @click="refresh()">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <n-button title="导出">
          <template #icon>
            <nw-icon name="icon-n-y-export" @click="downloadPurchase" />
          </template>
        </n-button>
        </n-form>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" v-on="gridEvents" ref="gridRef">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
