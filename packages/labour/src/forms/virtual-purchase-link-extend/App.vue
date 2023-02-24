<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="关联虚拟订单id" path="purchaseLinkId" v-if="dataPermits.purchaseLinkId !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联虚拟订单id" v-model:value="dataModel.purchaseLinkId"
                :disabled="dataPermits.purchaseLinkId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="税率" path="taxrateName" v-if="dataPermits.taxrateName !== FormPermissionEnum.HIDE">
            <n-input placeholder="税率" v-model:value="dataModel.taxrateName"
                :disabled="dataPermits.taxrateName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="税率" path="taxrate" v-if="dataPermits.taxrate !== FormPermissionEnum.HIDE">
            <n-input placeholder="税率" v-model:value="dataModel.taxrate"
                :disabled="dataPermits.taxrate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="发票类型" path="invoiceTypeName" v-if="dataPermits.invoiceTypeName !== FormPermissionEnum.HIDE">
            <n-input placeholder="发票类型" v-model:value="dataModel.invoiceTypeName"
                :disabled="dataPermits.invoiceTypeName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="发票类型" path="invoiceType" v-if="dataPermits.invoiceType !== FormPermissionEnum.HIDE">
            <n-input placeholder="发票类型" v-model:value="dataModel.invoiceType"
                :disabled="dataPermits.invoiceType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请日期" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请日期" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="工时时薪" path="workHourAmount" v-if="dataPermits.workHourAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="工时时薪" v-model:value="dataModel.workHourAmount"
                :disabled="dataPermits.workHourAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="加班时薪" path="overtimeHourAmount" v-if="dataPermits.overtimeHourAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="加班时薪" v-model:value="dataModel.overtimeHourAmount"
                :disabled="dataPermits.overtimeHourAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="工作日加班倍数" path="workdayOvertimeCoefficient" v-if="dataPermits.workdayOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="工作日加班倍数" v-model:value="dataModel.workdayOvertimeCoefficient"
                :disabled="dataPermits.workdayOvertimeCoefficient === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="休息日加班倍数" path="dayOffOvertimeCoefficient" v-if="dataPermits.dayOffOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="休息日加班倍数" v-model:value="dataModel.dayOffOvertimeCoefficient"
                :disabled="dataPermits.dayOffOvertimeCoefficient === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="法定休假日加班倍数" path="legalDayOffOvertimeCoefficient" v-if="dataPermits.legalDayOffOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="法定休假日加班倍数" v-model:value="dataModel.legalDayOffOvertimeCoefficient"
                :disabled="dataPermits.legalDayOffOvertimeCoefficient === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同名称" path="contractname" v-if="dataPermits.contractname !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同名称" v-model:value="dataModel.contractname"
                :disabled="dataPermits.contractname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同code" path="contractcode" v-if="dataPermits.contractcode !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同code" v-model:value="dataModel.contractcode"
                :disabled="dataPermits.contractcode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="甲方单位" path="partaname" v-if="dataPermits.partaname !== FormPermissionEnum.HIDE">
            <n-input placeholder="甲方单位" v-model:value="dataModel.partaname"
                :disabled="dataPermits.partaname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求计划id" path="planId" v-if="dataPermits.planId !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求计划id" v-model:value="dataModel.planId"
                :disabled="dataPermits.planId === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>