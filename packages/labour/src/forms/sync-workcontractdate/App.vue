<template>
  <n-form ref="formRef" :model="dataModel" :rules="rules as any" size="medium" label-placement="left" label-width="auto"
    equire-mark-placement="right-hanging" style="padding:20px 30px">
    <n-form-item label="操作日期" path="date">
      <n-date-picker v-model:formatted-value="dataModel.date" placement="top" value-format="yyyy-MM-dd" type="date" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
  import { NForm, NDatePicker, NFormItem } from "naive-ui";
  import { FormModal } from "./App";
  const { formRef, dataModel, rules } = new FormModal();
</script>