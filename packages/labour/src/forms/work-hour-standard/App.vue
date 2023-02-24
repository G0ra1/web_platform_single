<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="工时结算时薪" path="hourSalary" >
            <n-input-number placeholder="工时结算时薪" v-model:value="dataModel.hourSalary" />
        </n-form-item>
        <n-form-item label="每日工作时长" path="workHour">
            <n-input-number placeholder="每日工作时长" v-model:value="dataModel.workHour" />
        </n-form-item>
        <n-form-item label="加班系数" path="coefficient">
            <n-input-number placeholder="加班系数" v-model:value="dataModel.coefficient" />
        </n-form-item>
        <n-form-item label="说明" path="remark">
            <n-input placeholder="说明" type="textarea" v-model:value="dataModel.remark" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>
<script lang="ts" setup>
  import { NForm, NInput, NFormItem, NInputNumber } from "naive-ui";
  import { FormModal } from "./App";
  const { formRef, dataModel, rules } = new FormModal();
</script>