<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDatePicker, NSelect, NScrollbar } from "naive-ui";
import { NwFieldGrid } from "@platform/main";
import { FormModal, updataC, detailsColumn, detailsData, attendanceInfoList } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
import { listByBanId } from './api'
import { format } from "date-fns";
import { ApproveDetailsColumn } from './constant';

const { formRef, dataModel, rules, dataPermits } = new FormModal();
const deteChange = (v: any) => {
    let data = {
        attendanceYearMonth: format(v, 'yyyy-MM'),
        banId: dataModel.value.banId,
        labourCompanyId: dataModel.value.labourCompanyId,
        suppUserId: dataModel.value.suppUserId,
    }
    listByBanId(data).then(res => {
        console.log(res, '11111111111111111')
        dataModel.value.labourAttendanceMonthVo = res
        let ad = ApproveDetailsColumn(dataModel.value)
        detailsColumn.value = ad.detailsColumn
        detailsData.value = ad.detailsData
    })
}
const dateDisabled = (ts: number) => {
    return new Date(ts) >= new Date()
}
</script>
<template>
    <n-scrollbar style="height: 100%">
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" style="padding:20px 30px">

            <n-form-item label="申请人员" path="suppUserName" v-if="dataPermits.suppUserName !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请人员" v-model:value="dataModel.suppUserName"
                    :disabled="dataPermits.suppUserName === FormPermissionEnum.READONLY" />
            </n-form-item>
            <n-form-item label="考勤月份" path="attendanceYearMonth"
                v-if="dataPermits.attendanceYearMonth !== FormPermissionEnum.HIDE">
                <n-date-picker placeholder="考勤月份" :is-date-disabled="dateDisabled" style="width:100%"
                    @update:value="deteChange" v-model:formatted-value="dataModel.attendanceYearMonth"
                    value-format="yyyy-MM" type="month" clearable
                    :disabled="dataPermits.attendanceYearMonth === FormPermissionEnum.READONLY" />
            </n-form-item>
            <n-form-item label="是否同意" path="isAgree" v-if="dataPermits.isAgree !== FormPermissionEnum.HIDE">
                <n-select placeholder="请选择是否同意" v-model:value="dataModel.isAgree"
                    :options="[{ label: '同意', value: '1' }, { label: '不同意', value: '2' }]"
                    :consistent-menu-width="false"></n-select>
            </n-form-item>
            <n-form-item label="所属劳务公司" path="labourCompanyName"
                v-if="dataPermits.labourCompanyName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属劳务公司" v-model:value="dataModel.labourCompanyName"
                    :disabled="dataPermits.labourCompanyName === FormPermissionEnum.READONLY" />
            </n-form-item>
            <n-form-item label="所属班组" path="banName" v-if="dataPermits.banName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属班组" v-model:value="dataModel.banName"
                    :disabled="dataPermits.banName === FormPermissionEnum.READONLY" />
            </n-form-item>
            <n-form-item label="出勤情况" :span="24" path="labourAttendanceApproveDetailsList">
                <NwFieldGrid v-if="detailsColumn.length > 0" :height="420" v-model:value="detailsData" style="width: 100%"
                    :columns="detailsColumn" :search-options="{ suppUserName: true }">
                    <template #buttons></template>
                    <template #search="test">
                        <NInput v-model:value="test.value.suppUserName" />
                    </template>
                    <template #attendanceInfo_edit="{ row, column }">
                        <n-select placeholder="请选择出勤情况" v-if="row[column.field]"
                            :value="row[column.field]" :on-update-value="(v: string, o: any) => updataC(v, o, row, column)"
                            :options="[{ label: '全天', value: 1 }, { label: '上午', value: 2 }, { label: '下午', value: 3 }, { label: '缺勤', value: 4 }]"
                            :consistent-menu-width="false"></n-select>
                    </template>
                    <template #attendanceInfo_default="{ row, column }">
                        <span>{{ attendanceInfoList[row[column.field]] }}</span>
                    </template>

                </NwFieldGrid>
                <span v-else style="line-height: 36px;">暂无数据</span>
            </n-form-item>
        </n-form>
    </n-scrollbar>
<!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> --></template>