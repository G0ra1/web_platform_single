<script lang="ts" setup>
import { NForm, NInput, NDivider, NSwitch, NSelect, NGrid, NFormItemGi, NDatePicker, NUpload, useDialog, useMessage, NButton } from "naive-ui";
import { FormModal, initDialog, fileUrl, headers, finishType } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
import { UploadFileInfo } from 'naive-ui';
import { timestampToDate } from "../../lib/util/date"

initDialog(useDialog(), useMessage());
const { formRef, dataModel, rules, dataPermits, educationOptions, outerDisciplineOptions, handleDownload,
    contractList, insureList, examList, idCardList, handleFinish, } = new FormModal();
console.log("======", idCardList.value);
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="姓名" path="userNameCh"
                v-if="dataPermits.userNameCh !== FormPermissionEnum.HIDE">
                <n-input placeholder="姓名" v-model:value="dataModel.userNameCh"
                    :disabled="dataPermits.userNameCh === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="性别" path="sex" v-if="dataPermits.sex !== FormPermissionEnum.HIDE">
                <n-switch :round="false" v-model:value="dataModel.sex" :checked-value=2 :unchecked-value=1
                    :disabled="dataPermits.sex === FormPermissionEnum.READONLY">
                    <template #checked>女 </template>
                    <template #unchecked> 男 </template>
                </n-switch>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="工资单位" path="parentOrgName"
                v-if="dataPermits.parentOrgName !== FormPermissionEnum.HIDE">
                {{ dataModel.parentOrgName }}
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="身份证" path="idCard" v-if="dataPermits.idCard !== FormPermissionEnum.HIDE">
                <n-input placeholder="身份证" v-model:value="dataModel.idCard"
                    :disabled="dataPermits.idCard === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="最高学历" path="educationId"
                v-if="dataPermits.educationId !== FormPermissionEnum.HIDE">
                <n-select v-model:value="dataModel.educationId" :options="educationOptions as any"
                    @update:value="(d: string) => dataModel.educationName = d" placeholder="请选择"
                    :disabled="dataPermits.educationId === FormPermissionEnum.READONLY">
                </n-select>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="从事专业" path="outerDisciplineId"
                v-if="dataPermits.outerDisciplineId !== FormPermissionEnum.HIDE">
                <n-select v-model:value="dataModel.outerDisciplineId" :options="outerDisciplineOptions as any"
                    @update:value="(d: string) => dataModel.outerDisciplineName = d" placeholder="请选择"
                    :disabled="dataPermits.outerDisciplineId === FormPermissionEnum.READONLY">
                </n-select>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="出生日期" path="birthday"
                v-if="dataPermits.birthday !== FormPermissionEnum.HIDE">
                <n-date-picker v-model:formatted-value="dataModel.birthday" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.birthday === FormPermissionEnum.READONLY"
                    placeholder="请选择日期" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="手机号" path="phoneNum"
                v-if="dataPermits.phoneNum !== FormPermissionEnum.HIDE">
                <n-input placeholder="手机号" v-model:value="dataModel.phoneNum"
                    :disabled="dataPermits.phoneNum === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="工作时间" path="jobDate"
                v-if="dataPermits.jobDate !== FormPermissionEnum.HIDE">
                <n-date-picker v-model:formatted-value="dataModel.jobDate" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.jobDate === FormPermissionEnum.READONLY"
                    placeholder="请选择日期" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="入职时间" path="inDate" v-if="dataPermits.inDate !== FormPermissionEnum.HIDE">
                <n-date-picker v-model:formatted-value="dataModel.inDate" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.inDate === FormPermissionEnum.READONLY"
                    placeholder="请选择日期" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="合同附件" path="contractFileId"
                v-if="dataPermits.contractFileId !== FormPermissionEnum.HIDE">
                <n-upload :action="fileUrl" :headers="headers" :show-file-list="true" show-download-button
                    @download="(file: UploadFileInfo) => handleDownload(file, 'contract')"
                    @finish="(finish: finishType) => handleFinish(finish, 'contract')" :max="1"
                    :default-file-list="contractList">
                    <n-button>上传合同附件</n-button>
                </n-upload>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="意外伤害" path="insureFileId"
                v-if="dataPermits.insureFileId !== FormPermissionEnum.HIDE">
                <n-upload :action="fileUrl" :headers="headers" :show-file-list="true" show-download-button
                    @download="(file: UploadFileInfo) => handleDownload(file, 'insure')"
                    @finish="(finish: finishType) => handleFinish(finish, 'insure')" :max="1"
                    :default-file-list="insureList">
                    <n-button>上传意外伤害附件</n-button>
                </n-upload>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="员工体检附件" path="examFileId"
                v-if="dataPermits.examFileId !== FormPermissionEnum.HIDE">
                <n-upload :action="fileUrl" :headers="headers" :show-file-list="true" show-download-button
                    @download="(file: UploadFileInfo) => handleDownload(file, 'exam')"
                    @finish="(finish: finishType) => handleFinish(finish, 'exam')" :max="1"
                    :default-file-list="examList">
                    <n-button>上传员工体检附件</n-button>
                </n-upload>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="身份证附件" path="idCardFileId"
                v-if="dataPermits.idCardFileId !== FormPermissionEnum.HIDE">
                <n-upload :action="fileUrl" :headers="headers" :show-file-list="true" show-download-button
                    @download="(file: UploadFileInfo) => handleDownload(file, 'idCard')"
                    @finish="(finish: finishType) => handleFinish(finish, 'idCard')" :max="1"
                    :default-file-list="idCardList">
                    <n-button>上传身份证附件</n-button>
                </n-upload>
            </n-form-item-gi>
        </n-grid>
    </n-form>
    <!-- <n-divider dashed>调试信息</n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>