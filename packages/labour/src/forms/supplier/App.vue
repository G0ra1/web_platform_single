<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App.ts";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-form-item label="创建人" v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE">
            <n-text type="default">
                {{ dataModel.createUserName }}
            </n-text>
        </n-form-item>
        <n-form-item label="创建人机构" v-if="dataPermits.createUserParentOrgName !== FormPermissionEnum.HIDE">
            <n-text type="default">
                {{ dataModel.createUserParentOrgName }}
            </n-text>
        </n-form-item>
        <n-form-item label="机构名称" path="orgName" v-if="dataPermits.orgName !== FormPermissionEnum.HIDE">
            <n-input placeholder="机构名称" v-model:value="dataModel.orgName"
                :disabled="dataPermits.orgName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="机构简称" path="orgShortName" v-if="dataPermits.orgShortName !== FormPermissionEnum.HIDE">
            <n-input placeholder="机构简称" v-model:value="dataModel.orgShortName"
                :disabled="dataPermits.orgShortName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="机构编码" path="orgCode" v-if="dataPermits.orgCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="机构编码" v-model:value="dataModel.orgCode"
                :disabled="dataPermits.orgCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="是否启用" path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
            <n-switch :round="false" v-model:value="dataModel.status" :checked-value=1 :unchecked-value=3
                :disabled="dataPermits.orgCode === FormPermissionEnum.READONLY">
                <template #checked> 是 </template>
                <template #unchecked> 否 </template>
            </n-switch>
        </n-form-item>
        <n-form-item label="排序" path="sort" v-if="dataPermits.sort !== FormPermissionEnum.HIDE">
            <n-input-number v-model:value="dataModel.sort" placeholder="请输入排序"
                :disabled="dataPermits.sort === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="联系人" path="userNameCh" v-if="dataPermits.userNameCh !== FormPermissionEnum.HIDE">
            <n-input v-model:value="dataModel.userNameCh" placeholder="请输入联系人姓名"
                :disabled="dataPermits.userNameCh === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="联系人电话" path="phoneNum" v-if="dataPermits.phoneNum !== FormPermissionEnum.HIDE">
            <n-input v-model:value="dataModel.phoneNum" placeholder="请输入联系人手机号"
                :disabled="dataPermits.phoneNum === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="联系人邮箱" path="email" v-if="dataPermits.email !== FormPermissionEnum.HIDE">
            <n-input v-model:value="dataModel.email" placeholder="请输入联系人邮箱"
                :disabled="dataPermits.email === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="备注" path="remark" v-if="dataPermits.remark !== FormPermissionEnum.HIDE">
            <n-input v-model:value="dataModel.remark" type="textarea" placeholder="请输入备注" :autosize="{
                minRows: 3,
                maxRows: 5
            }" :disabled="dataPermits.remark === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>