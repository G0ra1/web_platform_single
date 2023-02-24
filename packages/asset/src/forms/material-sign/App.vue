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
        <n-form-item label="签收类型;派发签收、" path="signType" v-if="dataPermits.signType !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="签收类型;派发签收、" v-model:value="dataModel.signType"
                :disabled="dataPermits.signType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="任务id" path="taskId" v-if="dataPermits.taskId !== FormPermissionEnum.HIDE">
            <n-input placeholder="任务id" v-model:value="dataModel.taskId"
                :disabled="dataPermits.taskId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="对应业务id;派发id、或其他业务id" path="businessId" v-if="dataPermits.businessId !== FormPermissionEnum.HIDE">
            <n-input placeholder="对应业务id;派发id、或其他业务id" v-model:value="dataModel.businessId"
                :disabled="dataPermits.businessId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人id" path="signUserId" v-if="dataPermits.signUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人id" v-model:value="dataModel.signUserId"
                :disabled="dataPermits.signUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人姓名" path="signUserName" v-if="dataPermits.signUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人姓名" v-model:value="dataModel.signUserName"
                :disabled="dataPermits.signUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人父级机构id" path="signUserParentOrgId" v-if="dataPermits.signUserParentOrgId !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人父级机构id" v-model:value="dataModel.signUserParentOrgId"
                :disabled="dataPermits.signUserParentOrgId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人父级机构名称" path="signUserParentOrgName" v-if="dataPermits.signUserParentOrgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人父级机构名称" v-model:value="dataModel.signUserParentOrgName"
                :disabled="dataPermits.signUserParentOrgName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人父级部门id" path="signUserParentDeptId" v-if="dataPermits.signUserParentDeptId !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人父级部门id" v-model:value="dataModel.signUserParentDeptId"
                :disabled="dataPermits.signUserParentDeptId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人父级部门名称" path="signUserParentDeptName" v-if="dataPermits.signUserParentDeptName !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人父级部门名称" v-model:value="dataModel.signUserParentDeptName"
                :disabled="dataPermits.signUserParentDeptName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收人父级组织全路径id" path="signUserOrgFullId" v-if="dataPermits.signUserOrgFullId !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收人父级组织全路径id" v-model:value="dataModel.signUserOrgFullId"
                :disabled="dataPermits.signUserOrgFullId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签收时间" path="signTime" v-if="dataPermits.signTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="签收时间" v-model:value="dataModel.signTime"
                :disabled="dataPermits.signTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
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
        <n-form-item label="派发类型" path="distributeType" v-if="dataPermits.distributeType !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="派发类型" v-model:value="dataModel.distributeType"
                :disabled="dataPermits.distributeType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="来源id；领用id" path="sourceId" v-if="dataPermits.sourceId !== FormPermissionEnum.HIDE">
            <n-input placeholder="来源id；领用id" v-model:value="dataModel.sourceId"
                :disabled="dataPermits.sourceId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="来源code" path="sourceCode" v-if="dataPermits.sourceCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="来源code" v-model:value="dataModel.sourceCode"
                :disabled="dataPermits.sourceCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="说明" path="explanation" v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
            <n-input placeholder="说明" v-model:value="dataModel.explanation"
                :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合计数量" v-model:value="dataModel.sumTotalNumber"
                :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>