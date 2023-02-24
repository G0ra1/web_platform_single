<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="申请人id" path="applyUserId" v-if="dataPermits.applyUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人id" v-model:value="dataModel.applyUserId"
                :disabled="dataPermits.applyUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人名称" path="applyUserName" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人名称" v-model:value="dataModel.applyUserName"
                :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假类型" path="applyType" v-if="dataPermits.applyType !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="请假类型" v-model:value="dataModel.applyType"
                :disabled="dataPermits.applyType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假天数" path="applyDay" v-if="dataPermits.applyDay !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="请假天数" v-model:value="dataModel.applyDay"
                :disabled="dataPermits.applyDay === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假原因" path="applyReason" v-if="dataPermits.applyReason !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假原因" v-model:value="dataModel.applyReason"
                :disabled="dataPermits.applyReason === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假开始时间" path="applyStartDate" v-if="dataPermits.applyStartDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假开始时间" v-model:value="dataModel.applyStartDate"
                :disabled="dataPermits.applyStartDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假结束时间" path="applyEndDate" v-if="dataPermits.applyEndDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假结束时间" v-model:value="dataModel.applyEndDate"
                :disabled="dataPermits.applyEndDate === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>