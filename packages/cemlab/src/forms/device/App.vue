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
  NScrollbar
} from "naive-ui";
import { FormModal } from "./App";
import { defineComponent, ref } from "vue";
import { FormPermissionEnum, NwDic, Page } from "@platform/main";
const { formRef, dataModel, rules, dataPermits, orgTree, deviceStatusOptions } =
  new FormModal();
//保养规则选项
const maintainRulesOptions = [
  {
    label: "月保养",
    value: 1,
  },
  {
    label: "年保养",
    value: 2,
  },
];
</script>
<template>
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
        <h3 class="card-title">设备信息</h3>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="设备名称"
        path="deviceName"
        v-if="dataPermits.deviceName !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="设备名称"
          v-model:value="dataModel.deviceName"
          :disabled="dataPermits.deviceName === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="自编号"
        path="deviceCode"
        v-if="dataPermits.deviceCode !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="自编号"
          v-model:value="dataModel.deviceCode"
          :disabled="dataPermits.deviceCode === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="规格型号"
        path="specifications"
        v-if="dataPermits.specifications !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="规格型号"
          v-model:value="dataModel.specifications"
          :disabled="dataPermits.specifications === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="生产厂家"
        path="manufacturer"
        v-if="dataPermits.manufacturer !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="生产厂家"
          v-model:value="dataModel.manufacturer"
          :disabled="dataPermits.manufacturer === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="出厂编号"
        path="factoryNumber"
        v-if="dataPermits.factoryNumber !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="出厂编号"
          v-model:value="dataModel.factoryNumber"
          :disabled="dataPermits.factoryNumber === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="投产日期"
        path="productionTime"
        v-if="dataPermits.productionTime !== FormPermissionEnum.HIDE"
      >
        <n-date-picker
          placeholder="请选择日期"
          size="large"
          v-model:formatted-value="dataModel.productionTime"
          value-format="yyyy-MM-dd"
          type="date"
          clearable
          :disabled="dataPermits.productionTime === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="所属单位"
        path="orgId"
        v-if="dataPermits.parentName !== FormPermissionEnum.HIDE"
      >
        <n-tree-select
          :options="orgTree"
           :show-path="true"
          label-field="orgName"
          key-field="id"
          children-field="kids"
          v-model:value="dataModel.orgId"
          @update:value="(d,op:any)=>{dataModel.orgId=op.id;dataModel.orgName=op.orgName}"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="校准日期"
        path="approvalTime"
        v-if="dataPermits.approvalTime !== FormPermissionEnum.HIDE"
      >
        <!-- <n-date-picker
          placeholder="请选择日期"
          size="large"
          v-model:formatted-value="dataModel.approvalTime"
          value-format="yyyy-MM-dd"
          type="date"
          clearable
          :disabled="dataPermits.approvalTime === FormPermissionEnum.READONLY"
        /> -->
        <n-input v-model:value="dataModel.approvalTime" disabled />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="设备状态"
        path="deviceStatus"
        v-if="dataPermits.deviceStatus !== FormPermissionEnum.HIDE"
      >
        <n-select
          v-model:value="dataModel.deviceStatus"
          :options="deviceStatusOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="保养规则"
        path="maintainRules"
        v-if="dataPermits.maintainRules !== FormPermissionEnum.HIDE"
      >
        <n-select
          v-model:value="dataModel.maintainRules"
          :options="maintainRulesOptions"
          :disabled="dataPermits.maintainRules === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
   <!-- <n-divider dashed> 调试信息 </n-divider>
  <pre>{{
    JSON.stringify(
   dataModel, null, 2 
    )
  }}</pre> -->
</template>