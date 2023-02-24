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
        <n-form-item label="合计申请数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计申请数量" v-model:value="dataModel.sumTotalNumber"
                :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="审批通过时间" path="auditSuccessTiem" v-if="dataPermits.auditSuccessTiem !== FormPermissionEnum.HIDE">
            <n-input placeholder="审批通过时间" v-model:value="dataModel.auditSuccessTiem"
                :disabled="dataPermits.auditSuccessTiem === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="camunda流程任务ID" path="camundaTaskId" v-if="dataPermits.camundaTaskId !== FormPermissionEnum.HIDE">
            <n-input placeholder="camunda流程任务ID" v-model:value="dataModel.camundaTaskId"
                :disabled="dataPermits.camundaTaskId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人" path="applyUserId" v-if="dataPermits.applyUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人" v-model:value="dataModel.applyUserId"
                :disabled="dataPermits.applyUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人名称" path="applyUserName" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人名称" v-model:value="dataModel.applyUserName"
                :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构" path="applyUserOrgId" v-if="dataPermits.applyUserOrgId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构" v-model:value="dataModel.applyUserOrgId"
                :disabled="dataPermits.applyUserOrgId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人机构名称" path="applyUserOrgName" v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人机构名称" v-model:value="dataModel.applyUserOrgName"
                :disabled="dataPermits.applyUserOrgName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门" path="applyUserDeptId" v-if="dataPermits.applyUserDeptId !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门" v-model:value="dataModel.applyUserDeptId"
                :disabled="dataPermits.applyUserDeptId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人部门名称" path="applyUserDeptName" v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请人部门名称" v-model:value="dataModel.applyUserDeptName"
                :disabled="dataPermits.applyUserDeptName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="说明" path="explanation" v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
            <n-input placeholder="说明" v-model:value="dataModel.explanation"
                :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="计划年度" path="planYear" v-if="dataPermits.planYear !== FormPermissionEnum.HIDE">
            <n-input placeholder="计划年度" v-model:value="dataModel.planYear"
                :disabled="dataPermits.planYear === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="购置申请id;购置申请id" path="applyId" v-if="dataPermits.applyId !== FormPermissionEnum.HIDE">
            <n-input placeholder="购置申请id;购置申请id" v-model:value="dataModel.applyId"
                :disabled="dataPermits.applyId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="购置申请code" path="applyCode" v-if="dataPermits.applyCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="购置申请code" v-model:value="dataModel.applyCode"
                :disabled="dataPermits.applyCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同id" path="contractId" v-if="dataPermits.contractId !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购合同id" v-model:value="dataModel.contractId"
                :disabled="dataPermits.contractId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同code" path="contractCode" v-if="dataPermits.contractCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购合同code" v-model:value="dataModel.contractCode"
                :disabled="dataPermits.contractCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同签订时间" path="contractTime" v-if="dataPermits.contractTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购合同签订时间" v-model:value="dataModel.contractTime"
                :disabled="dataPermits.contractTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同附件ids" path="contractFileIds" v-if="dataPermits.contractFileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购合同附件ids" v-model:value="dataModel.contractFileIds"
                :disabled="dataPermits.contractFileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="供应商id" path="supplierId" v-if="dataPermits.supplierId !== FormPermissionEnum.HIDE">
            <n-input placeholder="供应商id" v-model:value="dataModel.supplierId"
                :disabled="dataPermits.supplierId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="供应商" path="supplierName" v-if="dataPermits.supplierName !== FormPermissionEnum.HIDE">
            <n-input placeholder="供应商" v-model:value="dataModel.supplierName"
                :disabled="dataPermits.supplierName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同附件名称" path="contractFileName" v-if="dataPermits.contractFileName !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购合同附件名称" v-model:value="dataModel.contractFileName"
                :disabled="dataPermits.contractFileName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="验收状态" path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="验收状态" v-model:value="dataModel.status"
                :disabled="dataPermits.status === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="未验收金额" path="notAcceptanceAmount" v-if="dataPermits.notAcceptanceAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="未验收金额" v-model:value="dataModel.notAcceptanceAmount"
                :disabled="dataPermits.notAcceptanceAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="验收数量" path="acceptanceNumber" v-if="dataPermits.acceptanceNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="验收数量" v-model:value="dataModel.acceptanceNumber"
                :disabled="dataPermits.acceptanceNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="未验收数量" path="notAcceptanceNumber" v-if="dataPermits.notAcceptanceNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="未验收数量" v-model:value="dataModel.notAcceptanceNumber"
                :disabled="dataPermits.notAcceptanceNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>