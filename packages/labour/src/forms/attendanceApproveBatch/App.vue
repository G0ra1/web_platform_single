<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDatePicker, NSelect,NScrollbar } from "naive-ui";
import { NwIcon,RequestPaging,VxeHelper,NwPickAny,NwFieldGrid,NwDic} from "@platform/main";
import { FormModal, updataC } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
import { getSuppUserContractWork } from "./api"
import { ApproveDetailsColumn } from './constant'
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-scrollbar style="height: 100%">
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="申请时间" path="attendanceApplyDate"
            v-if="dataPermits.attendanceApplyDate !== FormPermissionEnum.HIDE">
            <n-date-picker placeholder="申请时间" style="width:100%" v-model:formatted-value="dataModel.attendanceApplyDate"
                value-format="yyyy-MM-dd HH:mm:ss" type="date" clearable
                :disabled="dataPermits.attendanceApplyDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="考勤人员" path="suppUserName" v-if="dataPermits.suppUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="考勤人员" v-model:value="dataModel.suppUserName"
                :disabled="dataPermits.suppUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="考勤月份" path="attendanceYearMonth"
            v-if="dataPermits.attendanceYearMonth !== FormPermissionEnum.HIDE">
            <n-input placeholder="考勤月份" v-model:value="dataModel.attendanceYearMonth"
                :disabled="dataPermits.attendanceYearMonth === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所属劳务公司" path="labourCompanyName"
            v-if="dataPermits.attendanceDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="所属劳务公司" v-model:value="dataModel.labourCompanyName"
                :disabled="dataPermits.labourCompanyName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所属班组" path="banName" v-if="dataPermits.banName !== FormPermissionEnum.HIDE">
            <n-input placeholder="所属班组" v-model:value="dataModel.banName"
                :disabled="dataPermits.banName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <!-- <n-form-item label="承包合同" path="contractWorkName" :rule="{
            required: true,
            message: '请输入承包合同',
            trigger: ['input', 'blur']
        }" v-if="dataPermits.contractWorkName !== FormPermissionEnum.HIDE">
            <NwDic v-if="dataModel.suppUserId"
                selectFirst
                :request="{ XHR: getSuppUserContractWork, params: { suppUserId: dataModel.suppUserId }, }" :response="{
                    dataMethod: (r: any) => {
                        return r.map((d: any) => ({
                            value: d.workContractCode,
                            label: d.workContractName,
                            workContractId: d.workContractId
                        }))
                    }
                }" :reflect="['workContractId']" v-model:value="dataModel.contractWorkCode"
                v-model:label="dataModel.contractWorkName"
                @update:workContractId="(d: string) => { dataModel.contractWorkId = d }">
            </NwDic>
        </n-form-item> -->
        <n-form-item label="备注" path="remark" v-if="dataPermits.remark !== FormPermissionEnum.HIDE">
            <n-input placeholder="备注" v-model:value="dataModel.remark"
                :disabled="dataPermits.remark === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="考勤详情" :span="24" path="labourAttendanceApproveDetailsList">
            <NwFieldGrid v-model:value="dataModel.labourAttendanceApproveDetailsList" style="width: 100%" :columns="ApproveDetailsColumn">
                <template #buttons></template>
                <template #leaveEarly_edit="{ row }">
                    <n-input v-model:value="row.leaveEarly" placeholder="请输入早退情况"></n-input>
                </template>
                <template #late_edit="{ row }">
                    <n-input v-model:value="row.late" placeholder="请输入迟到情况"></n-input>
                </template>
                <template #approveState_edit="{ row }">
                    <n-select v-model:value="row.approveState" placeholder="请选择意见"
                        :on-update-value="(v: string, o: any) => updataC(v, o, row)"
                        :options="[{ label: '同意', value: 1 }, { label: '不同意', value: 2 }]"
                        :consistent-menu-width="false"></n-select>
                </template>
                <template #monitorRemark_edit="{ row }">
                    <n-input v-model:value="row.monitorRemark" placeholder="请输入备注"></n-input>
                </template>
                <template #attendanceInfo_default="{ row }">
                    <span>{{ row.attendanceInfo == 1 ? '全天' : row.attendanceInfo == 2 ? '上午' : '下午' }}</span>
                </template>
                <template #approveState_default="{ row }">
                    <span style="width:160px;height:15px;display: inline-block;">
                    {{ row.approveStateName }}</span>
                </template>

            </NwFieldGrid>
        </n-form-item>
    </n-form>
    <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> 
</n-scrollbar>
    
</template>