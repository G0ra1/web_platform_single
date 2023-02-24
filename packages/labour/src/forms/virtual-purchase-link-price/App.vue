<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="虚拟订单id" path="purchaseLinkId" v-if="dataPermits.purchaseLinkId !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单id" v-model:value="dataModel.purchaseLinkId"
                :disabled="dataPermits.purchaseLinkId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同名称" path="contractName" v-if="dataPermits.contractName !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同名称" v-model:value="dataModel.contractName"
                :disabled="dataPermits.contractName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同code" path="contractCode" v-if="dataPermits.contractCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同code" v-model:value="dataModel.contractCode"
                :disabled="dataPermits.contractCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="专业(规格型号);字典编码outer_discipline" path="outerDisciplineId" v-if="dataPermits.outerDisciplineId !== FormPermissionEnum.HIDE">
            <n-input placeholder="专业(规格型号);字典编码outer_discipline" v-model:value="dataModel.outerDisciplineId"
                :disabled="dataPermits.outerDisciplineId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="专业名称(规格型号)" path="outerDisciplineName" v-if="dataPermits.outerDisciplineName !== FormPermissionEnum.HIDE">
            <n-input placeholder="专业名称(规格型号)" v-model:value="dataModel.outerDisciplineName"
                :disabled="dataPermits.outerDisciplineName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="休息方式;1单休2双休3不休" path="restMode" v-if="dataPermits.restMode !== FormPermissionEnum.HIDE">
            <n-input placeholder="休息方式;1单休2双休3不休" v-model:value="dataModel.restMode"
                :disabled="dataPermits.restMode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="单位;1人/天2人/月" path="unit" v-if="dataPermits.unit !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="单位;1人/天2人/月" v-model:value="dataModel.unit"
                :disabled="dataPermits.unit === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="数量" path="number" v-if="dataPermits.number !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="数量" v-model:value="dataModel.number"
                :disabled="dataPermits.number === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="价格" path="price" v-if="dataPermits.price !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="价格" v-model:value="dataModel.price"
                :disabled="dataPermits.price === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="价格不含税" path="priceNotax" v-if="dataPermits.priceNotax !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="价格不含税" v-model:value="dataModel.priceNotax"
                :disabled="dataPermits.priceNotax === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="总价含税" path="totalAmount" v-if="dataPermits.totalAmount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="总价含税" v-model:value="dataModel.totalAmount"
                :disabled="dataPermits.totalAmount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="总价不含税" path="totalAmountNotax" v-if="dataPermits.totalAmountNotax !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="总价不含税" v-model:value="dataModel.totalAmountNotax"
                :disabled="dataPermits.totalAmountNotax === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请日期" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请日期" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
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