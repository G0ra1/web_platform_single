<script lang="ts" setup>
import { NForm, NInput, NDivider, NSwitch, NSelect, NGrid, NFormItemGi, NDatePicker, NUpload, useDialog, useMessage, NButton } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
import {NwPickAny } from '@platform/main'
const { formRef, dataModel, rules, dataPermits,pGridOption } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="需求计划名称" path="planName" v-if="dataPermits.planName !== FormPermissionEnum.HIDE">
                <n-input placeholder="需求计划名称" v-model:value="dataModel.planName"
                :disabled="dataPermits.planName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="需求计划编号" path="planNo" v-if="dataPermits.planName !== FormPermissionEnum.HIDE">
                <n-input placeholder="需求计划编号" v-model:value="dataModel.planNo"
                :disabled="dataPermits.planNo === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="需求类别" path="planType" v-if="dataPermits.planType !== FormPermissionEnum.HIDE">
                <n-input placeholder="需求类别" v-model:value="dataModel.planType"
                :disabled="dataPermits.planType === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="所属机构id" path="planOrgId" v-if="dataPermits.planOrgId !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属机构id" v-model:value="dataModel.planOrgId"
                :disabled="dataPermits.planOrgId === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="所属机构名称" path="planOrgName" v-if="dataPermits.planOrgName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属机构名称" v-model:value="dataModel.planOrgName"
                :disabled="dataPermits.planOrgName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="所属部门id" path="planDeptId" v-if="dataPermits.planDeptId !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属部门id" v-model:value="dataModel.planDeptId"
                :disabled="dataPermits.planDeptId === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="所属部门名称" path="planDeptName" v-if="dataPermits.planDeptName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属部门名称" v-model:value="dataModel.planDeptName"
                :disabled="dataPermits.planDeptName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="大修id" path="overhaulId" v-if="dataPermits.overhaulId !== FormPermissionEnum.HIDE">
                <n-input placeholder="大修id" v-model:value="dataModel.overhaulId"
                :disabled="dataPermits.overhaulId === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="预估金额" path="estimateAmount" v-if="dataPermits.estimateAmount !== FormPermissionEnum.HIDE">
                <n-input placeholder="预估金额" v-model:value="dataModel.estimateAmount"
                :disabled="dataPermits.estimateAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="预算金额" path="budgetAmount" v-if="dataPermits.budgetAmount !== FormPermissionEnum.HIDE">
                <n-input placeholder="预算金额" v-model:value="dataModel.budgetAmount"
                :disabled="dataPermits.budgetAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="计划开始时间" path="planStartTime" v-if="dataPermits.planStartTime !== FormPermissionEnum.HIDE">
                <n-input placeholder="计划开始时间" v-model:value="dataModel.planStartTime"
                :disabled="dataPermits.planStartTime === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="计划结束时间" path="planEndTime" v-if="dataPermits.planEndTime !== FormPermissionEnum.HIDE">
                <n-input placeholder="计划结束时间" v-model:value="dataModel.planEndTime"
                :disabled="dataPermits.planEndTime === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="推送截止时间" path="pushOffTime" v-if="dataPermits.pushOffTime !== FormPermissionEnum.HIDE">
                <n-input placeholder="推送截止时间" v-model:value="dataModel.pushOffTime"
                :disabled="dataPermits.pushOffTime === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="8" label="框架协议供应商" path="isFrameSupp" v-if="dataPermits.isFrameSupp !== FormPermissionEnum.HIDE">
                <n-switch :round="false" v-model:value="dataModel.isFrameSupp" :checked-value=2 :unchecked-value=1
                    :disabled="dataPermits.isFrameSupp === FormPermissionEnum.READONLY">
                    <template #checked>否</template>
                    <template #unchecked>是</template>
                </n-switch>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
                <NwPickAny
                button-label="选择承包合同"
                modal-title="选择承包合同"
                :value="(dataModel.labourPlanContractWorkList || []).map(d => ({
                    id: d.workContractId
                }))"
                @update:value="(d) => {
                    dataModel.labourPlanContractWorkList = d.map((x: any) => ({
                        workContractId: x.id,
                        //承包合同id
                        workContractCode: x.contractcode,
                            //承包合同id
                        workContractName: x.contractname
                }))}"
                :gridColumns="[
                    {field: 'contractcode', title: '合同编码'},
                    {field: 'contractname', title: '合同名称'}
                ]"
                requestUrl="/workcontract/page"
                :requestParam="{
                    // appCode: dataModel.planName
                }"
                :isSingle="false"
                />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="需求人员信息" path="labourPlanPersonList" >
            <vxe-grid
                ref="pGridRef"
                v-bind="pGridOption"
                style="width: 100%;
                    moz-user-select: -moz-none;
                    -moz-user-select: none;
                    -o-user-select:none;
                    -khtml-user-select:none;
                    -webkit-user-select:none;
                    -ms-user-select:none;
                    user-select:none;
                "
                >
                </vxe-grid>
            </n-form-item-gi>
            


        </n-grid>

        <n-divider />
        <n-divider />
        {{dataModel}}
        <!-- <n-data-table :columns="__columns" :data="__data" /> -->
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>