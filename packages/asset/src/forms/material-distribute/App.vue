<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="编号" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
            <n-input placeholder="编号" v-model:value="dataModel.code"
                :disabled="dataPermits.code === FormPermissionEnum.READONLY" />
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
        <n-form-item label="业务类型" path="type" v-if="dataPermits.type !== FormPermissionEnum.HIDE">
            <n-input placeholder="业务类型" v-model:value="dataModel.type"
                :disabled="dataPermits.type === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="审批通过时间" path="auditSuccessTiem" v-if="dataPermits.auditSuccessTiem !== FormPermissionEnum.HIDE">
            <n-input placeholder="审批通过时间" v-model:value="dataModel.auditSuccessTiem"
                :disabled="dataPermits.auditSuccessTiem === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="camunda流程任务ID" path="camundaTaskId" v-if="dataPermits.camundaTaskId !== FormPermissionEnum.HIDE">
            <n-input placeholder="camunda流程任务ID" v-model:value="dataModel.camundaTaskId"
                :disabled="dataPermits.camundaTaskId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="派发类型" path="distributeType" v-if="dataPermits.distributeType !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="派发类型" v-model:value="dataModel.distributeType"
                :disabled="dataPermits.distributeType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
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
        <n-form-item label="来源id" path="sourceId" v-if="dataPermits.sourceId !== FormPermissionEnum.HIDE">
            <n-input placeholder="来源id" v-model:value="dataModel.sourceId"
                :disabled="dataPermits.sourceId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="来源code" path="sourceCode" v-if="dataPermits.sourceCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="来源code" v-model:value="dataModel.sourceCode"
                :disabled="dataPermits.sourceCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计申请数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计申请数量" v-model:value="dataModel.sumTotalNumber"
                :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="未签收数量" path="notSignNumber" v-if="dataPermits.notSignNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="未签收数量" v-model:value="dataModel.notSignNumber"
                :disabled="dataPermits.notSignNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="状态" path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="状态" v-model:value="dataModel.status"
                :disabled="dataPermits.status === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="说明" path="explanation" v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
            <n-input placeholder="说明" v-model:value="dataModel.explanation"
                :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>