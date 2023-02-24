<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NFormItemGi,
  NRadio,
  NGrid,
  NScrollbar,
} from "naive-ui";
import { FormModal } from "./App";
import {  NwFieldGrid } from "@platform/main";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  gridRefs,
  columns,
  gridRules,
  gridDataPermits,
  deviceNameList,
} = new FormModal();
//子表滚动样式
const styleByDetail = {
  border: false,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 600,
  size: "large",
};
</script>
<template>
  <n-scrollbar style="height: 100%">
  <n-form
    ref="formRef"
    :model="dataModel"
    :rules="rules"
    size="medium"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    style="padding: 20px 30px"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="" path="">
        <h3 class="card-title">使用记录</h3>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="cemlabDeviceUseRecordList">
        <NwFieldGrid
          :is-readonly="true"
          :ref="(d: any) => gridRefs['cemlabDeviceUseRecordList'] = d"
          v-model:value="dataModel.cemlabDeviceUseRecordList"
          style="width: 100%"
          :columns="columns"
          size="small"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
          :bordered="false"
        >
          <template #deviceName="{ row }">
            {{ row.deviceName }}
          </template>
          <template #deviceCode="{ row }">
            {{ row.deviceCode }}
          </template>
           <template #useTimes="{ row }">
            {{row.useStartHours}} ~ {{row.useEndHours}}
          </template>
          <template #useBeforeStatus="{ row }">
              <n-radio :checked="row.useBeforeStatus === 1" >
                正常
              </n-radio>
              <n-radio :checked="row.useBeforeStatus === 2"> 异常 </n-radio>
          </template>
          <template #useAfterStatus="{ row }">
              <n-radio :checked="row.useBeforeStatus === 1"> 正常 </n-radio>
              <n-radio :checked="row.useBeforeStatus === 2"> 异常 </n-radio>
          </template>

          <template #rearks="{ row }">
            {{ row.rearks }}
          </template>
          <template #useTime="{ row }">
            {{ row.useTime }}
          </template>
          <template #useUserName="{ row }">
            {{ row.useUserName }}
          </template>
        </NwFieldGrid>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-divider dashed> 调试信息 </n-divider>
  <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>