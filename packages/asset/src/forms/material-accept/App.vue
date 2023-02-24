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
        <n-form-item label="申请人" path="applyUserId" v-if="dataPermits.applyUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人" v-model:value="dataModel.applyUserId"
                :disabled="dataPermits.applyUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人" path="applyUserName" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人" v-model:value="dataModel.applyUserName"
                :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构" path="applyUserOrgId" v-if="dataPermits.applyUserOrgId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构" v-model:value="dataModel.applyUserOrgId"
                :disabled="dataPermits.applyUserOrgId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构" path="applyUserOrgName" v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构" v-model:value="dataModel.applyUserOrgName"
                :disabled="dataPermits.applyUserOrgName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门" path="applyUserDeptId" v-if="dataPermits.applyUserDeptId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门" v-model:value="dataModel.applyUserDeptId"
                :disabled="dataPermits.applyUserDeptId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门" path="applyUserDeptName" v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门" v-model:value="dataModel.applyUserDeptName"
                :disabled="dataPermits.applyUserDeptName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
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
        <n-form-item label="审批通过时间" path="auditSuccessTiem" v-if="dataPermits.auditSuccessTiem !== FormPermissionEnum.HIDE">
            <n-input placeholder="审批通过时间" v-model:value="dataModel.auditSuccessTiem"
                :disabled="dataPermits.auditSuccessTiem === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="camunda流程任务ID" path="camundaTaskId" v-if="dataPermits.camundaTaskId !== FormPermissionEnum.HIDE">
            <n-input placeholder="camunda流程任务ID" v-model:value="dataModel.camundaTaskId"
                :disabled="dataPermits.camundaTaskId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="说明" path="explanation" v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
            <n-input placeholder="说明" v-model:value="dataModel.explanation"
                :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="任务实例Id" path="taskInstId" v-if="dataPermits.taskInstId !== FormPermissionEnum.HIDE">
            <n-input placeholder="任务实例Id" v-model:value="dataModel.taskInstId"
                :disabled="dataPermits.taskInstId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="父任务节点Id" path="parentTaskNodeId" v-if="dataPermits.parentTaskNodeId !== FormPermissionEnum.HIDE">
            <n-input placeholder="父任务节点Id" v-model:value="dataModel.parentTaskNodeId"
                :disabled="dataPermits.parentTaskNodeId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="当前节点Id" path="taskId" v-if="dataPermits.taskId !== FormPermissionEnum.HIDE">
            <n-input placeholder="当前节点Id" v-model:value="dataModel.taskId"
                :disabled="dataPermits.taskId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收数量" path="signNumber" v-if="dataPermits.signNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="签收数量" v-model:value="dataModel.signNumber"
                :disabled="dataPermits.signNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="未签收数量" path="notSignNumber" v-if="dataPermits.notSignNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="未签收数量" v-model:value="dataModel.notSignNumber"
                :disabled="dataPermits.notSignNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="派发数量" path="distributeNumber" v-if="dataPermits.distributeNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="派发数量" v-model:value="dataModel.distributeNumber"
                :disabled="dataPermits.distributeNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="未派发数量" path="notDistributeNumber" v-if="dataPermits.notDistributeNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="未派发数量" v-model:value="dataModel.notDistributeNumber"
                :disabled="dataPermits.notDistributeNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计申请数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计申请数量" v-model:value="dataModel.sumTotalNumber"
                :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人" path="assetUserId" v-if="dataPermits.assetUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人" v-model:value="dataModel.assetUserId"
                :disabled="dataPermits.assetUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人" path="assetUserName" v-if="dataPermits.assetUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人" v-model:value="dataModel.assetUserName"
                :disabled="dataPermits.assetUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人部门" path="assetDeptId" v-if="dataPermits.assetDeptId !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人部门" v-model:value="dataModel.assetDeptId"
                :disabled="dataPermits.assetDeptId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人部门" path="assetDeptName" v-if="dataPermits.assetDeptName !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人部门" v-model:value="dataModel.assetDeptName"
                :disabled="dataPermits.assetDeptName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人单位" path="assetOrgId" v-if="dataPermits.assetOrgId !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人单位" v-model:value="dataModel.assetOrgId"
                :disabled="dataPermits.assetOrgId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="使用人单位" path="assetOrgName" v-if="dataPermits.assetOrgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="使用人单位" v-model:value="dataModel.assetOrgName"
                :disabled="dataPermits.assetOrgName === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>