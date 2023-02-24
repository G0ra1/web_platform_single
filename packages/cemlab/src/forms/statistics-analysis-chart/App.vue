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
  NScrollbar,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInputGroup,
  useDialog,
  NButton,
} from "naive-ui";
import { FormModal, initDialog, buildChart } from "./App";
import { NwIcon, FormPermissionEnum } from "@platform/main";
import { nextTick, inject, onMounted } from "vue";
import * as echarts from "echarts";
const { formRef, dataModel, rules, dataPermits, chartList } = new FormModal();

initDialog(useDialog());

//页面加载完成后，调用的重置方法
nextTick().then(() => {});

onMounted(() => {
  buildChart();
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
        <h3 class="card-title">检测结果</h3>
      </n-form-item-gi>
      <n-form-item-gi :span="24">
        <div id="chart" :style="{ width: '1500px', height: '500px' }"></div>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>