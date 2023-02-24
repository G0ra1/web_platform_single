<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <!-- <NwFunctionPredefine code="approach-noproc_add" :params="approachAddParamsArry" />
        <NwFunctionPredefine code="departure-noproc_add" :params="departureAddParamsArry" /> -->
         <NwFunctionPredefine code="approach_add" :params="approachAddParamsArry" />
        <NwFunctionPredefine code="departure_add" :params="departureAddParamsArry" /> 
        <NwFunctionPredefine code="dispatchPersion_add" :params="departureAddParamsArry" /> 

      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-form label-placement="left" :show-feedback="false" inline>
          <n-form-item label="人员姓名:">
            <n-input :value="filterData.suppUserName || ''" @update:value="(d) => filterData.suppUserName = d"
            placeholder="人员姓名" :style="{ width: '150px' }" style="margin-right: 10px" />
          </n-form-item>
          <n-form-item label="专业:">
            <n-input :value="filterData.outerDisciplineName || ''" @update:value="(d) => filterData.outerDisciplineName = d"
            placeholder="专业" :style="{ width: '150px' }" style="margin-right: 10px" />
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
      <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :edit-config="{ trigger: 'manual', mode: 'row' }"
        :row-config="{ isCurrent: true, isHover: true }" :checkbox-config="checkboxConfig" @edit-closed="editClose"
        @checkbox-change="checkboxChangeEvent" @checkbox-all="checkboxChangeEvent">
        <template #approachTime_view="{ row }">
          {{ row.approachTime }}
        </template>
        <template #approachTime_edit="{ row }">
          <vxe-input v-model="row.approachTime" type="date" placeholder="请选择日期" transfer  ></vxe-input>
          <!-- <NDatePicker type='date' value-format='yyyy-MM-dd' v-model:formatted-value='row.departureTime'
                    @update:formatted-value="(value: string) => row.departureTime = value" /> -->
        </template>
        <template #departureTime_view="{ row }">
          {{ row.departureTime }}
        </template>
        <template #departureTime_edit="{ row }">
          <vxe-input  v-model="row.departureTime" type="date"   placeholder="请选择日期" transfer ></vxe-input>
          <!-- <NDatePicker type='date' value-format='yyyy-MM-dd' v-model:formatted-value='row.departureTime'
            @update:formatted-value="(value: string) => row.departureTime = value" /> -->
        </template>
        <!-- <template #contaler = "{ row }">
          <NwFunctionPredefine code="personMobilization_edit" :params="[row]">
            <template #auth>
              <n-button @click="editRowEvent(row)" >编辑</n-button>
            </template>
            <template #unauth></template>
          </NwFunctionPredefine>
        </template> -->
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NDatePicker, useMessage,NForm,NFormItem } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, approachAddParamsArry, departureAddParamsArry, checkboxConfig, checkboxChangeEvent, gridSearchRef, gridEvents, editClose, initDialog,editRowEvent } from "./App"
import { nextTick, inject } from 'vue'

const message = useMessage();
initDialog(useMessage());

//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
  refresh()
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  refresh()
})

</script>