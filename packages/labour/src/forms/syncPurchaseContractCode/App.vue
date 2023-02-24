<template>
  <n-form ref="formRef" :model="dataModel" :rules="rules as any" size="medium" label-placement="left" label-width="auto"
    equire-mark-placement="right-hanging" style="padding:20px 30px">
    <n-form-item label="合同编号" path="contractCode">
      <n-input placeholder="合同编号" v-model:value="dataModel.contractCode"/>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
  import { NForm, NInput, NFormItem } from "naive-ui";
  import { FormModal } from "./App";
  const { formRef, dataModel, rules } = new FormModal();
</script>