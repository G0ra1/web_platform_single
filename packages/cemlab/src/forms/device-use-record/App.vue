<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NFormItemGi,
  NRadio,
  NRadioGroup,
  NScrollbar,
   NTimePicker,
  NGrid,
  NSpace,
  NSelect,
} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum, NwFieldGrid } from "@platform/main";
import { size } from "lodash";
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
  height: 500,
  size: "large",
};
//使用前后状态
const songs = [
  {
    value: 1,
    label: "正常",
  },
  {
    value: 2,
    label: "异常",
  },
].map((s) => {
  s.value = s.value;
  return s;
});
const disablePreviousDate = (ts: number) => {
  return ts + 86400000 < Date.now();
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
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="" path="cemlabDeviceUseRecordList">
        <NwFieldGrid
          :is-readonly="true"
          :ref="(d: any) => gridRefs['cemlabDeviceUseRecordList'] = d"
          v-model:value="dataModel.cemlabDeviceUseRecordList"
          style="width: 100%"
          :rules="gridRules['cemlabDeviceUseRecordList']"
          :columns="columns"
          size="small"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
        >
          <template #deviceName="{ row }">
            <n-select v-model:value="row.deviceName"> </n-select>
          </template>
          <template #deviceCode="{ row }">
            {{ row.deviceCode }}
          </template>
          <template #useTimes="{ row }">
            {{row.useStartHours}} ~ {{row.useEndHours}}
          </template>
          <template #useBeforeStatus="{ row }">
              <n-radio
                :checked="row.useBeforeStatus === 1"
                value="正常"
                name="正常"
              >
                正常
              </n-radio>
              <n-radio
                :checked="row.useBeforeStatus === 2"
                value="异常"
                name="异常"
              >
                异常
              </n-radio>
          </template>
          <template #useAfterStatus="{ row }">
              <n-radio
                :checked="row.useAfterStatus === 1"
                value="正常"
                name="正常"
              >
                正常
              </n-radio>
              <n-radio
                :checked="row.useAfterStatus === 2"
                value="异常"
                name="异常"
              >
                异常
              </n-radio>
          </template>

          <template #rearks="{ row }">
            {{ row.rearks }}
          </template>
        </NwFieldGrid>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-divider dashed> 调试信息 </n-divider>
  <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>