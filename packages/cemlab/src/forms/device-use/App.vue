<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NFormItemGi,
  NRadio,
  NRadioGroup,
  NGrid,
  NSpace,
  NTimePicker,
  NDatePicker,
  NScrollbar,
  NSelect,
} from "naive-ui";
import { FormModal } from "./App";
import { cloneDeep } from "lodash";
import { FormPermissionEnum, NwFieldGrid } from "@platform/main";
import { CemlabDevice } from "./model";
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
  size: "large",
  height: 200,
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
  return ts + 86400000 < Date.now() || ts > Date.now();
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
          <h3 class="card-title">仪器设备使用记录</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="cemlabDeviceUseRecordList">
          <NwFieldGrid
            :ref="(d: any) => gridRefs['cemlabDeviceUseRecordList'] = d"
            v-model:value="dataModel.cemlabDeviceUseRecordList"
            style="width: 100%"
             size="small"
            :rules="gridRules['cemlabDeviceUseRecordList']"
            :columns="columns"
            :row-style="{ height: '20px' }"
            :cell-style="{ padding: '0px' }"
          >
            <template #deviceName="{ row }">
              <n-select
                v-if="dataPermits.deviceName !== FormPermissionEnum.HIDE"
                :options="deviceNameList"
                labelField="deviceName"
                valueField="deviceName"
                v-model:value="row.deviceName"
                @update:value="(d, op: any) => { row.deviceName = op.deviceName; row.deviceCode = op.deviceCode; row.deviceId=op.id}"
              >
              </n-select>
              <!-- <n-input v-model:value="row.deviceName"></n-input> -->
            </template>
            <template #deviceCode="{ row }">
              <n-input v-model:value="row.deviceCode"></n-input>
            </template>
            <template #deviceId="{ row }">
              <n-input v-model:value="row.deviceId"></n-input>
            </template>
            <template #useTimes="{ row }">
              <n-space>
                <n-time-picker clearable  placeholder="请选择开始时间" v-model:formatted-value="row.useStartHours" value-format="HH:mm" format="HH:mm" :input-readonly="true"/>
                <n-time-picker clearable placeholder="请选择结束时间"  v-model:formatted-value="row.useEndHours" value-format="HH:mm" format="HH:mm" :input-readonly="true"/>
              </n-space>
            </template>
            <template #useBeforeStatus="{ row }">
              <n-radio-group
                v-model:value="row.useBeforeStatus"
                :disabled="
                  dataPermits.useBeforeStatus === FormPermissionEnum.READONLY
                "
                size="small"
              >
                <n-space>
                  <n-radio
                    v-for="song in songs"
                    :key="song.value"
                    :value="song.value"
                  >
                    {{ song.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
              <!-- <n-input v-model:value="row.useBeforeStatus"></n-input> -->
            </template>
            <template #useAfterStatus="{ row }">
              <n-radio-group
                v-model:value="row.useAfterStatus"
                :disabled="
                  dataPermits.useAfterStatus === FormPermissionEnum.READONLY
                "
              >
                <n-space>
                  <n-radio
                    v-for="song in songs"
                    :key="song.value"
                    :value="song.value"
                  >
                    {{ song.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
              <!-- <n-input v-model:value="row.useAfterStatus"></n-input> -->
            </template>

            <template #rearks="{ row }">
              <n-input v-model:value="row.rearks"></n-input>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <!-- <n-divider dashed> 调试信息 </n-divider>
    <pre>{{
      JSON.stringify(dataModel.cemlabDeviceUseRecordList, null, 1)
    }}</pre> -->
  </n-scrollbar>
</template>
