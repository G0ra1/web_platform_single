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
        <h3 class="card-title">保养信息</h3>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="设备名称" path="deviceName">
        <n-input v-model:value="dataModel.deviceName" :readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="自编号" path="deviceCode">
        <n-input v-model:value="dataModel.deviceCode" :readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="规格型号" path="specifications">
        <n-input v-model:value="dataModel.specifications" :readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="生产厂家" path="manufacturer">
        <n-input v-model:value="dataModel.manufacturer" :readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="所属单位" path="orgName">
        <n-input v-model:value="dataModel.orgName" :readonly="true" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="校准日期" path="approvalTime">
        <n-date-picker
          size="large"
          v-model:formatted-value="dataModel.approvalTime"
          value-format="yyyy-MM-dd"
          type="date"
          :input-readonly="true"
          :show="false"
          placeholder=""
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="设备状态" path="deviceStatus">
        <n-input
          v-model:value="deviceStatus[dataModel.deviceStatus]"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="保养规则" path="maintainRules">
        <n-input
          v-model:value="maintainRulesOptions[dataModel.deviceStatus]"
          :readonly="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="保养类型" path="maintainType">
        <n-space>
          <n-radio
            :checked="dataModel.maintainType === 1"
            value="保养"
            name="保养"
          >
            保养
          </n-radio>
          <n-radio
            :checked="dataModel.maintainType === 2"
            value="校准"
            name="校准"
          >
            校准
          </n-radio>
        </n-space>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="保养详情" path="maintainDetails">
        <n-input
          type="textarea"
          style="height: 100px"
          v-model:value="dataModel.maintainDetails"
          :readonly="true"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="备注" path="remarks">
        <n-input
          type="textarea"
          style="height: 100px"
          v-model:value="dataModel.remarks"
          :readonly="true"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>