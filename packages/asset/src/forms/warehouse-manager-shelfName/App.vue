<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NSelect,
  SelectOption,
  NInputGroup,
  NButton,
} from "naive-ui";
import { NwEmployeePick } from "@platform/main";
import { FormModal } from "./App";
import { ref } from "vue";
import { houseType } from "../../lib/constant/Constant";
import {
  FormPermissionEnum,
  NwFieldGrid,
  NwFunctionPredefine,
} from "@platform/main";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  columns,
  gridRefs,
  gridRules,
  gridDataPermits,
} = new FormModal();

//子表滚动样式
const styleByDetail = {
  border: false,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 400,
  size: "large",
};
</script>
<template>
  <n-form
    ref="formRef"
    :model="dataModel"
    :rules="rules"
    size="medium"
    label-placement="top"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-grid :cols="8" :x-gap="1">
      <n-form-item-gi
        :label="dataModel.warehouseName"
        :span="8"
        path="shelfList"
      >
        <NwFieldGrid
          v-bind="styleByDetail"
          :is-readonly="dataPermits['shelfList'] === 'readonly'"
          :ref="(d: any) => gridRefs['shelfList'] = d"
          v-model:value="dataModel.shelfList"
          style="width: 100%"
          :rules="gridRules['shelfList']"
          :data-permits="gridDataPermits['shelfList']"
          :columns="columns"
          size="small"
          :default-value="{
            warehouseName: dataModel.warehouseName,
          }"
        >
          <template #shelfName="{ row }">
            <n-input v-model:value="row.shelfName"></n-input>
          </template>
          <template #warehouseName="{ row }">
            {{ row.warehouseName }}
          </template>
        </NwFieldGrid>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>