<script lang="ts" setup>
import { spinDark } from 'naive-ui';
import { NForm, NInput,NTreeSelect,NDropdown,NCard,NSpin,NAlert, NDivider,NInputGroup,NScrollbar, NSwitch, NSelect, NGrid, NFormItemGi, NDatePicker, NUpload, useDialog, useMessage, NButton } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
import {NwPickAny,NwFieldGrid,NwDic } from '@platform/main'
const { formRef, dataModel,labourPlanPersonList, rules, reverse,pGridOption,gridRefs,gridRules,gridDataPermits,show } = new FormModal();
</script>
<template>
<n-scrollbar style="height: 100%">
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-spin :show="show">
        <n-card title="" :hoverable="true" :embedded="true">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi
                label=""
                :span="24"
                path="labourPlanPersonList"
                >
                <!-- :ref="d => gridRefs.push(d)" -->
                <NwFieldGrid
                    is-readonly
                    :ref="(d: any) => gridRefs['labourPlanPersonList'] = d"
                    v-model:value="labourPlanPersonList"
                    style="width: 100%"
                    :rules="gridRules['labourPlanPersonList']"
                    :data-permits="gridDataPermits['labourPlanPersonList']"
                    :columns="[
                    {
                        field: 'planName',
                        title: '需求计划名称',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'contractPurchaseName',
                        title: '采购合同名称',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'finalType',
                        title: '结算类型',
                        editRender: { enabled: false },
                        slots: {default:'finalType_view' },
                    },
                    {
                        field: 'settleCode',
                        title: '结算书编号',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'cutOffTime',
                        title: '结算截止时间',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'amountNowSettle',
                        title: '本次结算金额',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'amountSettle',
                        title: '已结算金额',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'auditStatus',
                        title: '审批状态',
                        editRender: { enabled: false },
                        slots: { default:'auditStatus_view' }
                    },
                    {
                        field: 'createTime',
                        title: '创建时间',
                        editRender: { enabled: false },
                    },
                    {
                        field: 'isReverse',
                        title: '是否已反结算',
                        editRender: { enabled: false },
                        slots: { default:'reverse_view' }
                    },
                    {
                        title: '操作',
                        editRender: { enabled: false },
                        slots: { default:'handle_view' },
                    },
                    ]"
                >
                <template #finalType_view="{ row }">
                    {{row.finalType==='stage'?'阶段结算':'最终结算'}}
                </template>
                <template #auditStatus_view="{ row }">
                    {{row.auditStatus===2?'审批通过':'审批中'}}
                </template>
                <template #reverse_view="{ row }">
                    {{row.isReverse===1?'是':'否'}}
                </template>
                <template #handle_view="{ _rowIndex , row}">
                    <n-button type="primary" v-if="row.auditStatus === 2 && row.isReverse===0 && _rowIndex == 0" @click="reverse(row.id)">
                        反结算
                    </n-button>
                </template>
                </NwFieldGrid>
                </n-form-item-gi>
        </n-grid>
    </n-card>
</n-spin>
       <!-- {{dataModel}} @click="reverse(row.id) -->
        <!-- <n-data-table :columns="__columns" :data="__data" /> -->
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</n-scrollbar>
</template>