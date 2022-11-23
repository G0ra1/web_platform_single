<script lang="ts" setup>
import { NButton, NForm, NInput, NSwitch, useMessage, NGrid, NFormItemGi, NGi, NInputNumber, NDivider } from "naive-ui";
import { supplierFormInstance, initDialog } from "./SupplierForm";
const { formRef, orgModelRef, rules, submit } = supplierFormInstance;
const rulesLocal = rules as any;
const formRefLocal = formRef;
//由于inject限定只能使用于setup中，所以，只能这样传递一下，不能直接在ts中使用；
initDialog(useMessage());
</script>

<template>
    <n-form ref="formRefLocal" :model="orgModelRef" :rules="rulesLocal" size="medium" label-placement="left"
        label-width="auto" require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="机构名称" path="orgName">
                <n-input v-model:value="orgModelRef.orgName" placeholder="请输入机构名称" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="机构简称" path="orgShortName">
                <n-input v-model:value="orgModelRef.orgShortName" placeholder="请输入机构简称" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="机构代码" path="orgCode">
                <n-input v-model:value="orgModelRef.orgCode" placeholder="请输入机构代码" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="是否启用" path="status">
                <!-- <n-select v-model:value="orgModelRef.status" :options="<any>statusOption" /> -->
                <n-switch :round="false" v-model:value="orgModelRef.status" :checked-value=1 :unchecked-value=0>
                    <template #checked> 是 </template>
                    <template #unchecked> 否 </template>
                </n-switch>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="排序" path="sort">
                <n-input-number v-model:value="orgModelRef.sort" placeholder="请输入序号" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="管理员账号" path="username">
                <n-input v-model:value="orgModelRef.username" placeholder="请输入管理员账号" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="密码" path="password">
                <n-input v-model:value="orgModelRef.password" type="password" placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="备注" path="remark">
                <n-input v-model:value="orgModelRef.remark" type="textarea" placeholder="请输入备注" :autosize="{
                    minRows: 3,
                    maxRows: 5
                }" />
            </n-form-item-gi>
            <n-gi :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <n-button type="primary" @click="submit">
                        提交
                    </n-button>
                </div>
            </n-gi>
        </n-grid>
    </n-form>
    <!-- <n-divider dashed>调试信息</n-divider>
    <pre>{{ JSON.stringify(orgModelRef, null, 2) }}</pre> -->
</template>