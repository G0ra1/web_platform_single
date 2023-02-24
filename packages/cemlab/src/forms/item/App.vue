<script lang="ts" setup>
import { NForm, NInput, NFormItem,NGrid, NDivider,
    NSwitch, NText, NGridItem, NSelect,
    NFormItemGi,
    NInputNumber, } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main"
const { formRef, dataModel, rules, dataPermits } = new FormModal();
//是否启用
const isEnable = [
    {
        label: "是",
        value: 1,
    },
    {
        label: "否",
        value: 0,
    },
];
</script>
<template>
<n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="top" label-width="auto"
    require-mark-placement="right-hanging" style="padding: 0px 20px">
    <n-grid x-gap="8" :cols="1">
        <!-- <n-grid-item>
        <n-form-item :span="8" label="id" path="id">
          {{ dataModel.id }}
        </n-form-item>
        //return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
      </n-grid-item> -->

        <n-grid-item>
            <n-form-item :span="8" label="字典项" path="dictItemName" v-if="dataPermits.dictItemName !== FormPermissionEnum.HIDE">
                <n-input placeholder="请输入" size="small" v-model:value="dataModel.dictItemName"
                    :disabled="dataPermits.dictItemName === FormPermissionEnum.READONLY" />
            </n-form-item>
        </n-grid-item>
        <n-grid-item>
            <n-form-item :span="8" label="字典编码" path="dictItemCode"
                v-if="dataPermits.dictItemCode !== FormPermissionEnum.HIDE">
                <n-input placeholder="请输入" size="small" v-model:value="dataModel.dictItemCode"
                    :disabled="dataPermits.dictItemCode === FormPermissionEnum.READONLY" />
            </n-form-item>
        </n-grid-item>
          <n-grid-item>
            <n-form-item :span="8" label="是否启用" path="isEnable"
                v-if="dataPermits.isEnable !== FormPermissionEnum.HIDE">
                <n-select v-model:value="dataModel.isEnable" :options="isEnable" />
            </n-form-item>
        </n-grid-item>
        <n-grid-item>
            <n-form-item :span="8" label="排序" path="sort" v-if="dataPermits.sort !== FormPermissionEnum.HIDE">
                <n-input-number :style="{ width: '100%' }" placeholder="请输入" size="small" v-model:value="dataModel.sort"
                    :show-button="false" :disabled="dataPermits.sort === FormPermissionEnum.READONLY" />
            </n-form-item>
        </n-grid-item>
        <n-grid-item>
            <n-form-item :span="8" label="备注" path="remark" v-if="dataPermits.remark !== FormPermissionEnum.HIDE">
                <n-input size="small" placeholder="请输入" v-model:value="dataModel.remark"
                    :disabled="dataPermits.remark === FormPermissionEnum.READONLY" />
            </n-form-item>
        </n-grid-item>
    </n-grid>
</n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>