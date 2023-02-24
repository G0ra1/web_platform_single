<script lang="ts" setup>
import { NForm, NInput, NFormItem,NScrollbar, NCard,NGrid,NDivider,NDatePicker,NSelect,NTabPane,NTabs,NFormItemGi,NButton, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum,NwFieldGrid } from "@platform/main"
const { formRef, dataModel, rules, dataPermits,finalTypeOptions,settleCount } = new FormModal();

const footerMethod = ({ columns, data }:any) => {
            return [
            columns.map((column :any, columnIndex :any) => {
                if (columnIndex === 0) {
                return '-'
                }
                if (columnIndex === 1) {
                return ''
                }
                if (column.field === 'total') {
                   const sum = data.map((d :any)=>{
                        return d.attendanceHour + d.overtimeHour + d.vacateHour + d.allotHour + d.filialeWpnCost + d.filialeAssessCost +d.filialeFestivalCost+d.filialeRewardPunishCost+d.suppTravelCost+d.suppNucleicAcidCot+d.suppExaminationCost
                    }).reduce((t:any,d:any)=> t+d,0)
                    dataModel.value.amountNowSettle = sum.toFixed(2);
                    return dataModel.value.amountNowSettle
                }
                return data.map((d :any)=>d[column.field]).reduce((t:any,d:any)=> t+d,0).toFixed(2)
            })
            ]
        }

</script>
<template>
    <n-scrollbar style="height: 100%">
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-card title="基本信息" :hoverable="true" :embedded="true">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="8" label="需求计划id" path="planId" v-if="dataPermits.planId !== FormPermissionEnum.HIDE" style="display:none">
                    <n-input placeholder="需求计划id" v-model:value="dataModel.planId"  disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="计划名称" path="planName" v-if="dataPermits.planName !== FormPermissionEnum.HIDE">
                    <n-input placeholder="计划名称" v-model:value="dataModel.planName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="采购合同名称" path="contractPurchaseName" v-if="dataPermits.contractPurchaseName !== FormPermissionEnum.HIDE">
                    <n-input placeholder="采购合同名称" v-model:value="dataModel.contractPurchaseName" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="采购合同编码" path="contractPurchaseCode" v-if="dataPermits.contractPurchaseCode !== FormPermissionEnum.HIDE">
                    <n-input placeholder="采购合同编码" v-model:value="dataModel.contractPurchaseCode" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="关联采购合同id" path="contractPurchaseId" v-if="dataPermits.contractPurchaseId !== FormPermissionEnum.HIDE" style="display:none">
                    <n-input placeholder="关联采购合同id" v-model:value="dataModel.contractPurchaseId"
                        :disabled="dataPermits.contractPurchaseId === FormPermissionEnum.READONLY" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="虚拟采购订单Id" path="virtualPurchaseId" v-if="dataPermits.virtualPurchaseId !== FormPermissionEnum.HIDE" style="display:none">
                    <n-input placeholder="虚拟采购订单Id" v-model:value="dataModel.virtualPurchaseId"
                        :disabled="dataPermits.virtualPurchaseId === FormPermissionEnum.READONLY" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="框架合同编码" path="purchaseFrameCode" v-if="dataPermits.purchaseFrameCode !== FormPermissionEnum.HIDE">
                    <n-input placeholder="框架合同编码" v-model:value="dataModel.purchaseFrameCode" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="本次结算金额" path="amountNowSettle" v-if="dataPermits.amountNowSettle !== FormPermissionEnum.HIDE">
                    <n-input-number placeholder="本次结算金额" v-model:value="dataModel.amountNowSettle" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="本次结算金额(大写)" path="amountNowSettleUpper" v-if="dataPermits.amountNowSettleUpper !== FormPermissionEnum.HIDE">
                    <n-input placeholder="本次结算金额(大写)" v-model:value="dataModel.amountNowSettleUpper" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="框架合同名称" path="purchaseFrameId" v-if="dataPermits.purchaseFrameId !== FormPermissionEnum.HIDE">
                    <n-input placeholder="框架合同名称" v-model:value="dataModel.purchaseFrameId" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label=" 已经结算金额" path="amountSettle" v-if="dataPermits.amountSettle !== FormPermissionEnum.HIDE">
                    <n-input-number placeholder=" 已经结算金额" v-model:value="dataModel.amountSettle" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="已经结算金额(大写)" path="amountSettleUpper" v-if="dataPermits.amountSettleUpper !== FormPermissionEnum.HIDE">
                    <n-input placeholder="已经结算金额(大写)" v-model:value="dataModel.amountSettleUpper" disabled />
                </n-form-item-gi>
                <n-form-item :span="8" label="框架合同id" path="purchaseFrameName" v-if="dataPermits.purchaseFrameName !== FormPermissionEnum.HIDE" style="display:none">
                    <n-input placeholder="框架合同id" v-model:value="dataModel.purchaseFrameName"
                        :disabled="dataPermits.purchaseFrameName === FormPermissionEnum.READONLY" />
                </n-form-item>
                <!-- <n-form-item-gi :span="8" label="结算编号" path="settleCode" v-if="dataPermits.settleCode !== FormPermissionEnum.HIDE">
                    <n-input placeholder="结算编号" v-model:value="dataModel.settleCode"
                        :disabled="dataPermits.settleCode === FormPermissionEnum.READONLY" />
                </n-form-item-gi> -->
                <n-form-item-gi :span="8" label=" 订单结算次数" path="settleNumber" v-if="dataPermits.settleNumber !== FormPermissionEnum.HIDE">
                    <n-input-number placeholder=" 订单结算次数" v-model:value="dataModel.settleNumber" disabled />
                </n-form-item-gi>

                <n-form-item-gi :span="8" label="结算类型" path="finalType" v-if="dataPermits.finalType !== FormPermissionEnum.HIDE">
                        <n-select
                            placeholder="结算类型"  v-model:value="dataModel.finalType"  :disabled="dataPermits.finalType === FormPermissionEnum.READONLY"
                            :options="finalTypeOptions"  @select="(d)=>{}"
                        />    
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="结算截止时间" path="cutOffTime" v-if="dataPermits.cutOffTime !== FormPermissionEnum.HIDE">
                    <n-date-picker v-model:formatted-value="dataModel.cutOffTime" type="date" clearable
                        value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.cutOffTime === FormPermissionEnum.READONLY"
                        placeholder="请选择日期" />
                </n-form-item-gi>
            </n-grid>
        </n-card>
        <n-card :cols="24" :x-gap="24">
            <n-button type="primary" @click="settleCount()">开始计算</n-button>
            <NwFieldGrid
                    is-readonly
                    v-model:value="dataModel.labourSettleUserTotalList"
                    style="width: 100%"
                    :default-value="{isHour:1}"
                    :showFooter = "true"
                    :footerMethod ="footerMethod"
                    :columns="[
                    {
                        field: 'suppUserName',
                        title: '人员名称',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'idCard',
                        title: '身份证号',
                        editRender: { enabled: false },
                        width: '160px',
                    },
                    {
                        field: 'attendanceHour',
                        title: '考勤',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'overtimeHour',
                        title: '加班',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'vacateHour',
                        title: '请假',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'allotHour',
                        title: '工时',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'filialeWpnCost',
                        title: '水电网费',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'filialeAssessCost',
                        title: '激励费用',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'filialeFestivalCost',
                        title: '过节费',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'filialeRewardPunishCost',
                        title: '其他扣款',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'suppTravelCost',
                        title: '差旅费',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'suppNucleicAcidCot',
                        title: '核酸检测费',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'suppExaminationCost',
                        title: '体检费',
                        editRender: { enabled: false },
                    },
                    {   
                        field: 'total',
                        title: '合计',
                        editRender: { enabled: false },
                        slots: { default: 'total' },
                    },
                    ]"
                >
                    <template #buttons>

                    </template>
                    <!-- <template #suppUserName_edit="{ row }">
                        <n-input v-model:value="row.suppUserName"></n-input>
                    </template>
                    <template #idCard_edit="{ row }">
                        <n-input v-model:value="row.idCard"></n-input>
                    </template>
                    <template #banName="{ row }">
                            {{row.banName}}
                    </template>
                    <template #attendanceHour_edit="{ row }">
                        <n-input v-model:value="row.attendanceHour"></n-input>
                    </template>
                    <template #overtimeHour_edit="{ row }">
                        <n-input v-model:value="row.overtimeHour"></n-input>
                    </template>
                    <template #vacateHour_edit="{ row }">
                        <n-input v-model:value="row.vacateHour"></n-input>
                    </template>
                    <template #allotHour_edit="{ row }">
                        <n-input v-model:value="row.allotHour"></n-input>
                    </template>
                    <template #filialeWpnCost_edit="{ row }">
                        <n-input v-model:value="row.filialeWpnCost"></n-input>
                    </template>
                    <template #filialeAssessCost_edit="{ row }">
                        <n-input v-model:value="row.filialeAssessCost"></n-input>
                    </template>
                    <template #filialeFestivalCost_edit="{ row }">
                        <n-input v-model:value="row.filialeFestivalCost"></n-input>
                    </template>
                    <template #filialeRewardPunishCost_edit="{ row }">
                        <n-input v-model:value="row.filialeRewardPunishCost"></n-input>
                    </template>
                    <template #suppTravelCost_edit="{ row }">
                        <n-input v-model:value="row.suppTravelCost"></n-input>
                    </template>
                    <template #suppNucleicAcidCot_edit="{ row }">
                        <n-input v-model:value="row.suppNucleicAcidCot"></n-input>
                    </template>
                    <template #suppExaminationCost_edit="{ row }">
                        <n-input v-model:value="row.suppExaminationCost"></n-input>
                    </template> -->
                    <template #total="{ row }">
                        {{(row.attendanceHour + row.overtimeHour + row.vacateHour + row.allotHour + row.filialeWpnCost + row.filialeAssessCost +row.filialeFestivalCost+row.filialeRewardPunishCost+row.suppTravelCost+row.suppNucleicAcidCot+row.suppExaminationCost).toFixed(2)}}
                    </template>
                </NwFieldGrid>
        </n-card>
        

        <!-- <n-form-item label="关联采购合同名称" path="contractPurchaseName" v-if="dataPermits.contractPurchaseName !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购合同名称" v-model:value="dataModel.contractPurchaseName"
                :disabled="dataPermits.contractPurchaseName === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="关联采购合同code" path="contractPurchaseCode" v-if="dataPermits.contractPurchaseCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购合同code" v-model:value="dataModel.contractPurchaseCode"
                :disabled="dataPermits.contractPurchaseCode === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="关联采购合同id" path="contractPurchaseId" v-if="dataPermits.contractPurchaseId !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购合同id" v-model:value="dataModel.contractPurchaseId"
                :disabled="dataPermits.contractPurchaseId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟采购订单Id" path="virtualPurchaseId" v-if="dataPermits.virtualPurchaseId !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟采购订单Id" v-model:value="dataModel.virtualPurchaseId"
                :disabled="dataPermits.virtualPurchaseId === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="stage阶段性结算;final最终结算;" path="finalType" v-if="dataPermits.finalType !== FormPermissionEnum.HIDE">
            <n-input placeholder="stage阶段性结算;final最终结算;" v-model:value="dataModel.finalType"
                :disabled="dataPermits.finalType === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="结算截止时间" path="cutOffTime" v-if="dataPermits.cutOffTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="结算截止时间" v-model:value="dataModel.cutOffTime"
                :disabled="dataPermits.cutOffTime === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="结算书编号" path="settleCode" v-if="dataPermits.settleCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="结算书编号" v-model:value="dataModel.settleCode"
                :disabled="dataPermits.settleCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="本次结算金额" path="amountNowSettle" v-if="dataPermits.amountNowSettle !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="本次结算金额" v-model:value="dataModel.amountNowSettle"
                :disabled="dataPermits.amountNowSettle === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="本次结算金额(大写)" path="amountNowSettleUpper" v-if="dataPermits.amountNowSettleUpper !== FormPermissionEnum.HIDE">
            <n-input placeholder="本次结算金额(大写)" v-model:value="dataModel.amountNowSettleUpper"
                :disabled="dataPermits.amountNowSettleUpper === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="已结算金额" path="amountSettle" v-if="dataPermits.amountSettle !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="已结算金额" v-model:value="dataModel.amountSettle"
                :disabled="dataPermits.amountSettle === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="已结算金额(大写)" path="amountSettleUpper" v-if="dataPermits.amountSettleUpper !== FormPermissionEnum.HIDE">
            <n-input placeholder="已结算金额(大写)" v-model:value="dataModel.amountSettleUpper"
                :disabled="dataPermits.amountSettleUpper === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="关联采购 框架合同名称" path="purchaseFrameId" v-if="dataPermits.purchaseFrameId !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购 框架合同名称" v-model:value="dataModel.purchaseFrameId"
                :disabled="dataPermits.purchaseFrameId === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- <n-form-item label="关联采购 框架合同code" path="purchaseFrameCode" v-if="dataPermits.purchaseFrameCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购 框架合同code" v-model:value="dataModel.purchaseFrameCode"
                :disabled="dataPermits.purchaseFrameCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="关联采购 框架合同id" path="purchaseFrameName" v-if="dataPermits.purchaseFrameName !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购 框架合同id" v-model:value="dataModel.purchaseFrameName"
                :disabled="dataPermits.purchaseFrameName === FormPermissionEnum.READONLY" />
        </n-form-item> -->
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</n-scrollbar>
</template>