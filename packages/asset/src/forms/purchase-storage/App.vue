<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="申请编号" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请编号" v-model:value="dataModel.code"
                :disabled="dataPermits.code === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人ID" path="applyUserId" v-if="dataPermits.applyUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人ID" v-model:value="dataModel.applyUserId"
                :disabled="dataPermits.applyUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人名称" path="applyUserName" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人名称" v-model:value="dataModel.applyUserName"
                :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构ID" path="applyUserOrgId" v-if="dataPermits.applyUserOrgId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构ID" v-model:value="dataModel.applyUserOrgId"
                :disabled="dataPermits.applyUserOrgId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构名称" path="applyUserOrgName" v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构名称" v-model:value="dataModel.applyUserOrgName"
                :disabled="dataPermits.applyUserOrgName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门ID" path="applyUserDeptId" v-if="dataPermits.applyUserDeptId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门ID" v-model:value="dataModel.applyUserDeptId"
                :disabled="dataPermits.applyUserDeptId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门名称" path="applyUserDeptName" v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门名称" v-model:value="dataModel.applyUserDeptName"
                :disabled="dataPermits.applyUserDeptName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计金额" path="sumTotalAmount" v-if="dataPermits.sumTotalAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计金额" v-model:value="dataModel.sumTotalAmount"
                :disabled="dataPermits.sumTotalAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计金额-未税" path="sumTotalUntaxedAmount" v-if="dataPermits.sumTotalUntaxedAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计金额-未税" v-model:value="dataModel.sumTotalUntaxedAmount"
                :disabled="dataPermits.sumTotalUntaxedAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计金额-税额" path="sumTotalTaxAmount" v-if="dataPermits.sumTotalTaxAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计金额-税额" v-model:value="dataModel.sumTotalTaxAmount"
                :disabled="dataPermits.sumTotalTaxAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计申请数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计申请数量" v-model:value="dataModel.sumTotalNumber"
                :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="购置验收数量" path="sumAcceptanceNumber" v-if="dataPermits.sumAcceptanceNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="购置验收数量" v-model:value="dataModel.sumAcceptanceNumber"
                :disabled="dataPermits.sumAcceptanceNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="购置验收编号" path="acceptanceCode" v-if="dataPermits.acceptanceCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="购置验收编号" v-model:value="dataModel.acceptanceCode"
                :disabled="dataPermits.acceptanceCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="购置验收Id" path="acceptanceId" v-if="dataPermits.acceptanceId !== FormPermissionEnum.HIDE">
            <n-input placeholder="购置验收Id" v-model:value="dataModel.acceptanceId"
                :disabled="dataPermits.acceptanceId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="说明" path="explanation" v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
            <n-input placeholder="说明" v-model:value="dataModel.explanation"
                :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="物资购置类型" path="purchaseType" v-if="dataPermits.purchaseType !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="物资购置类型" v-model:value="dataModel.purchaseType"
                :disabled="dataPermits.purchaseType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="物项来源" path="assetSource" v-if="dataPermits.assetSource !== FormPermissionEnum.HIDE">
            <n-input placeholder="物项来源" v-model:value="dataModel.assetSource"
                :disabled="dataPermits.assetSource === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="物项来源名称" path="assetSourceName" v-if="dataPermits.assetSourceName !== FormPermissionEnum.HIDE">
            <n-input placeholder="物项来源名称" v-model:value="dataModel.assetSourceName"
                :disabled="dataPermits.assetSourceName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="调拨申请Id" path="deployId" v-if="dataPermits.deployId !== FormPermissionEnum.HIDE">
            <n-input placeholder="调拨申请Id" v-model:value="dataModel.deployId"
                :disabled="dataPermits.deployId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="类型" path="type" v-if="dataPermits.type !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="类型" v-model:value="dataModel.type"
                :disabled="dataPermits.type === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="类型名称" path="typeName" v-if="dataPermits.typeName !== FormPermissionEnum.HIDE">
            <n-input placeholder="类型名称" v-model:value="dataModel.typeName"
                :disabled="dataPermits.typeName === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>