<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="派遣单id" path="dispatchid" v-if="dataPermits.dispatchid !== FormPermissionEnum.HIDE">
            <n-input placeholder="派遣单id" v-model:value="dataModel.dispatchid"
                :disabled="dataPermits.dispatchid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="人员ID" path="suppUserId" v-if="dataPermits.suppUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="人员ID" v-model:value="dataModel.suppUserId"
                :disabled="dataPermits.suppUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="人员姓名" path="suppUserName" v-if="dataPermits.suppUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="人员姓名" v-model:value="dataModel.suppUserName"
                :disabled="dataPermits.suppUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="身份证号码" path="idCard" v-if="dataPermits.idCard !== FormPermissionEnum.HIDE">
            <n-input placeholder="身份证号码" v-model:value="dataModel.idCard"
                :disabled="dataPermits.idCard === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="岗位id（字典类型为outer_discipline）" path="outerDisciplineId" v-if="dataPermits.outerDisciplineId !== FormPermissionEnum.HIDE">
            <n-input placeholder="岗位id（字典类型为outer_discipline）" v-model:value="dataModel.outerDisciplineId"
                :disabled="dataPermits.outerDisciplineId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="岗位名称（字典类型为outer_discipline_name）" path="outerDisciplineName" v-if="dataPermits.outerDisciplineName !== FormPermissionEnum.HIDE">
            <n-input placeholder="岗位名称（字典类型为outer_discipline_name）" v-model:value="dataModel.outerDisciplineName"
                :disabled="dataPermits.outerDisciplineName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="专业id（字典类型为post_rank_id）" path="postRankId" v-if="dataPermits.postRankId !== FormPermissionEnum.HIDE">
            <n-input placeholder="专业id（字典类型为post_rank_id）" v-model:value="dataModel.postRankId"
                :disabled="dataPermits.postRankId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="人员岗位" path="postRankName" v-if="dataPermits.postRankName !== FormPermissionEnum.HIDE">
            <n-input placeholder="人员岗位" v-model:value="dataModel.postRankName"
                :disabled="dataPermits.postRankName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="是否工时制;是否工时制（0否；1是）" path="isHour" v-if="dataPermits.isHour !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="是否工时制;是否工时制（0否；1是）" v-model:value="dataModel.isHour"
                :disabled="dataPermits.isHour === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="人员手机号" path="suppUserPhone" v-if="dataPermits.suppUserPhone !== FormPermissionEnum.HIDE">
            <n-input placeholder="人员手机号" v-model:value="dataModel.suppUserPhone"
                :disabled="dataPermits.suppUserPhone === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>