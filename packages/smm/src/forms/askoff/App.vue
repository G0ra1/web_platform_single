<script lang="ts" setup>
import { NForm, NInput, NFormItem, NSelect, NText, NDatePicker, NDivider } from "naive-ui";
import { FormModal, rangeNum, rangeStr, applyTypeOptions } from "./App.ts";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum"
const { formRef, dataModel, rules, dataPermits, changeDate } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="申请人姓名" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
            <n-text type="default">
                {{ dataModel.applyUserName }}
            </n-text>
        </n-form-item>
        <n-form-item label="请假类型" path="applyType" v-if="dataPermits.applyType !== FormPermissionEnum.HIDE">
            <n-select v-model:value="dataModel.applyType" :default-value="0" :options="applyTypeOptions"
                style="width: 150px;" :disabled="dataPermits.applyType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假开始结束时间" path="applyStartDate"
            v-if="dataPermits.applyStartDate !== FormPermissionEnum.HIDE">
            <n-date-picker v-model:value="rangeNum" v-model:formatted-value="rangeStr" type="datetimerange" clearable
            value-format="yyyy-MM-dd" :on-update-value="changeDate"
                :disabled="dataPermits.applyStartDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假天数" path="applyDay" v-if="dataPermits.applyDay !== FormPermissionEnum.HIDE">
            <n-text type="default">
                {{ dataModel.applyDay }}天
            </n-text>
        </n-form-item>
        <n-form-item label="请假原因" path="applyReason" v-if="dataPermits.applyReason !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假原因" v-model:value="dataModel.applyReason" type="textarea"
                :disabled="dataPermits.applyReason === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre>
</template>