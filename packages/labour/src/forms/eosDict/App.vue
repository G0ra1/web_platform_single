<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <!-- 例子 看完删掉它 -->
        <!--<n-form-item label="创建人" v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE">
            <n-text type="default">
                {{ dataModel.createUserName }}
            </n-text>
        </n-form-item>-->
        <!-- 例子 看完删掉它 -->
        <!--<n-form-item label="是否启用" path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
            <n-switch :round="false" v-model:value="dataModel.status" :checked-value=1 :unchecked-value=3
                      :disabled="dataPermits.orgCode === FormPermissionEnum.READONLY">
                <template #checked> 是 </template>
                <template #unchecked> 否 </template>
            </n-switch>
        </n-form-item>-->
        <n-form-item label="字典类型id" path="dicttypeid" v-if="dataPermits.dicttypeid !== FormPermissionEnum.HIDE">
            <n-input placeholder="字典类型id" v-model:value="dataModel.dicttypeid"
                :disabled="dataPermits.dicttypeid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="字典对应的值" path="dictid" v-if="dataPermits.dictid !== FormPermissionEnum.HIDE">
            <n-input placeholder="字典对应的值" v-model:value="dataModel.dictid"
                :disabled="dataPermits.dictid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="字典对应的显示名称" path="dictname" v-if="dataPermits.dictname !== FormPermissionEnum.HIDE">
            <n-input placeholder="字典对应的显示名称" v-model:value="dataModel.dictname"
                :disabled="dataPermits.dictname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="状态" path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="状态" v-model:value="dataModel.status"
                :disabled="dataPermits.status === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="排序序号" path="sortno" v-if="dataPermits.sortno !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="排序序号" v-model:value="dataModel.sortno"
                :disabled="dataPermits.sortno === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="排序" path="ranks" v-if="dataPermits.ranks !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="排序" v-model:value="dataModel.ranks"
                :disabled="dataPermits.ranks === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="字典父id" path="parentid" v-if="dataPermits.parentid !== FormPermissionEnum.HIDE">
            <n-input placeholder="字典父id" v-model:value="dataModel.parentid"
                :disabled="dataPermits.parentid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="排序层级编码" path="seqno" v-if="dataPermits.seqno !== FormPermissionEnum.HIDE">
            <n-input placeholder="排序层级编码" v-model:value="dataModel.seqno"
                :disabled="dataPermits.seqno === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="filter1" path="filter1" v-if="dataPermits.filter1 !== FormPermissionEnum.HIDE">
            <n-input placeholder="" v-model:value="dataModel.filter1"
                :disabled="dataPermits.filter1 === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="filter2" path="filter2" v-if="dataPermits.filter2 !== FormPermissionEnum.HIDE">
            <n-input placeholder="" v-model:value="dataModel.filter2"
                :disabled="dataPermits.filter2 === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>
<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
const { formRef, dataModel, rules, dataPermits,getValue } = new FormModal();
console.log("+++++++++++++++++++++++++++++");
console.log(getValue);
console.log("------------------------------");
</script>