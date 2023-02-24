<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NTreeSelect,
  NFormItemGi,
  NDivider,
  NSwitch,
  NGrid,
  NText,
  NInputNumber,
  NDatePicker,
  NSelect,
} from "naive-ui";
import { FormModal } from "./App";
import { defineComponent, ref } from "vue";
import { FormPermissionEnum, NwDic } from "@platform/main";
import {
  deviceStatus,
  maintainRulesOptions,
} from "../../lib/constant/Constant";
const { formRef, dataModel } = new FormModal();
</script>
<template>
  <n-form
    ref="formRef"
    :model="dataModel"
    size="medium"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    style="padding: 20px 30px"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="" path="">
        <h3 class="card-title">设备信息</h3>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="设备名称" path="deviceName">
        <n-input v-model:value="dataModel.deviceName" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="自编号" path="deviceCode">
        <n-input v-model:value="dataModel.deviceCode" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="规格型号" path="specifications">
        <n-input v-model:value="dataModel.specifications" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="生产厂家" path="manufacturer">
        <n-input v-model:value="dataModel.manufacturer" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="出厂编号" path="factoryNumber">
        <n-input v-model:value="dataModel.factoryNumber" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="投产日期" path="productionTime">
        <n-input v-model:value="dataModel.productionTime" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="所属单位" path="orgName">
        <n-input v-model:value="dataModel.orgName" readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="校准日期" path="approvalTime">
        <n-input
          v-model:value="dataModel.approvalTime"
          placeholder=""
          readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="设备状态" path="deviceStatus">
        <n-input
          v-model:value="deviceStatus[dataModel.deviceStatus]"
          readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="保养规则" path="maintainRules">
        <n-input
          v-model:value="maintainRulesOptions[dataModel.maintainRules]"
          readonly="true"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>