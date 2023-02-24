<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
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
        <n-form-item label="请假表id" path="vacateId" v-if="dataPermits.vacateId !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假表id" v-model:value="dataModel.vacateId"
                :disabled="dataPermits.vacateId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假日期" path="vacateDate" v-if="dataPermits.vacateDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="请假日期" v-model:value="dataModel.vacateDate"
                :disabled="dataPermits.vacateDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="请假时长：1全天、2上午、3下午" path="vacateLenth" v-if="dataPermits.vacateLenth !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="请假时长：1全天、2上午、3下午" v-model:value="dataModel.vacateLenth"
                :disabled="dataPermits.vacateLenth === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>