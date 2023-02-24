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
  NGrid,
  NSelect,
  NRadio,
  NRadioGroup,
  NSpace,
  NDatePicker,
} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main";
const { formRef, dataModel, rules, dataPermits } = new FormModal();
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
//设备状态选项
const deviceStatusOptions = [
  {
    label: "在用",
    value: 1,
  },
  {
    label: "停用",
    value: 2,
  },
  {
    label: "报废",
    value: 3,
  },
];
//保养内容选项
const songs = [
  {
    value: 1,
    label: "保养",
  },
  {
    value: 2,
    label: "校准",
  },
].map((s) => {
  s.value = s.value;
  return s;
});
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
        <h3 class="card-title">保养信息</h3>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="设备名称"
        path="deviceName"
        v-if="dataPermits.deviceName !== FormPermissionEnum.HIDE"
      >
        <!-- {{ dataModel.deviceName }} -->
        <n-input
          placeholder="设备名称"
          v-model:value="dataModel.deviceName"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="自编号"
        path="deviceCode"
        v-if="dataPermits.deviceCode !== FormPermissionEnum.HIDE"
      >
        <!-- {{ dataModel.deviceCode }} -->
        <n-input
          placeholder="自编号"
          v-model:value="dataModel.deviceCode"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="规格型号"
        path="specifications"
        v-if="dataPermits.specifications !== FormPermissionEnum.HIDE"
      >
        <!-- {{ dataModel.specifications }} -->
        <n-input
          placeholder="规格型号"
          v-model:value="dataModel.specifications"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="生产厂家"
        path="manufacturer"
        v-if="dataPermits.manufacturer !== FormPermissionEnum.HIDE"
      >
        <!-- {{ dataModel.manufacturer }} -->
        <n-input
          placeholder="生产厂家"
          v-model:value="dataModel.manufacturer"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="所属单位"
        path="orgName"
        v-if="dataPermits.orgName !== FormPermissionEnum.HIDE"
      >
        <!-- {{ dataModel.orgName }} -->
        <n-input
          placeholder="所属单位"
          v-model:value="dataModel.orgName"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="校准日期"
        path="approvalTime"
        v-if="dataModel.maintainType == 2"
      >
        <n-date-picker
          placeholder="请选择日期"
          size="large"
          v-model:formatted-value="dataModel.approvalTime"
          value-format="yyyy-MM-dd"
          type="date"
          clearable
          :disabled="dataPermits.approvalTime === FormPermissionEnum.READONLY"
        />
        <!-- <n-input
          placeholder="校准日期"
          v-model:value="dataModel.approvalTime"
          :disabled="dataPermits.approvalTime === FormPermissionEnum.READONLY"
        /> -->
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
          :disabled="dataPermits.deviceStatus === FormPermissionEnum.READONLY"
        />
        <!-- <n-input-number
          placeholder="设备状态"
          v-model:value="dataModel.deviceStatus"
          :disabled="dataPermits.deviceStatus === FormPermissionEnum.READONLY"
        /> -->
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
        <!-- <n-input-number
          placeholder="保养规则;1月保养2年保养"
          v-model:value="dataModel.maintainRules"
          :disabled="dataPermits.maintainRules === FormPermissionEnum.READONLY"
        /> -->
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="保养类型"
        path="maintainType"
        v-if="dataPermits.maintainType !== FormPermissionEnum.HIDE"
      >
        <n-radio-group
          v-model:value="dataModel.maintainType"
          :disabled="dataPermits.maintainRules === FormPermissionEnum.READONLY"
        >
          <n-space>
            <!-- <n-radio :checked="dataModel.maintainType === 1" value="1">
              保养
            </n-radio>
            <n-radio :checked="dataModel.maintainType === 2" value="2">
              校准
            </n-radio> -->
            <n-radio
              v-for="song in songs"
              :key="song.value"
              :value="song.value"
            >
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi
        :span="24"
        label="保养详情"
        path="maintainDetails"
        v-if="dataPermits.maintainDetails !== FormPermissionEnum.HIDE"
      >
        <n-input
          type="textarea"
          style="height: 100px"
          placeholder="保养详情"
          v-model:value="dataModel.maintainDetails"
          :disabled="
            dataPermits.maintainDetails === FormPermissionEnum.READONLY
          "
        />
      </n-form-item-gi>

      <n-form-item-gi
        :span="24"
        label="备注"
        path="remarks"
        v-if="dataPermits.remarks !== FormPermissionEnum.HIDE"
      >
        <n-input
          type="textarea"
          style="height: 100px"
          placeholder="备注"
          v-model:value="dataModel.remarks"
          :disabled="dataPermits.remarks === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-divider dashed> 调试信息 </n-divider>
  <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>