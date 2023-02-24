<script lang="ts" setup>
import {
  NForm,
  NScrollbar,
  NGrid,
  NFormItemGi,
  NInput,
  NDatePicker,
} from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid, NwDic } from "@platform/main";
const {
  formRef,
  dataModel,
  specimenColumns,
  specimenSonColumns,
  itemsColumns,
} = new FormModal();

if (dataModel.value.experimentSpecimenList.length == 0) {
  dataModel.value.experimentSpecimenList = [
    {
      isDel: 0,
      type: 1,
    },
  ];
}
if (dataModel.value.cemlabExperimentConditionList.length == 0) {
  dataModel.value.cemlabExperimentConditionList = [
    {
      isDel: 0,
    },
  ];
}
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      size="medium"
      label-placement="left"
      label-width="140"
      style="padding: 20px 30px"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">样品信息</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <NwFieldGrid
            v-model:value="dataModel.experimentSpecimenList"
            style="width: 100%"
            :columns="specimenColumns"
            :is-readonly="true"
          >
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">附带样品信息</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <NwFieldGrid
            v-model:value="dataModel.experimentSpecimenSonList"
            style="width: 100%"
            :is-readonly="true"
            :columns="specimenSonColumns"
          >
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">实验条件</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="实验温度(°C)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].experimentTemperature
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="实验压力(MPa)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].experimentPressure
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="升温时间(min)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].heatingTime
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="养护温度(°C)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].curingTemperature
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="养护压力(MPa)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].curingPressure
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="养护时间(min)">
          <n-input
            placeholder=""
            v-model:value="
              dataModel.cemlabExperimentConditionList[0].curingTime
            "
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">检测项目</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <NwFieldGrid
            v-model:value="dataModel.cemlabExperimentItemsList"
            style="width: 100%"
            :is-readonly="true"
            :columns="itemsColumns"
          >
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="备注" path="remark">
          <n-input
            style="height: 80px"
            placeholder=""
            type="textarea"
            v-model:value="dataModel.remark"
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="完成日期" path="finishDate">
          <n-date-picker
            placeholder=""
            v-model:formatted-value="dataModel.finishDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            style="width: 100%"
            :input-readonly="true"
            :show="false"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="实验人员" path="experimentUserName">
          <n-input
            placeholder=""
            v-model:value="dataModel.experimentUserName"
            :readonly="true"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>
