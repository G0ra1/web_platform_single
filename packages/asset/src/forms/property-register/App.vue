<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber,NGrid,NFormItemGi, NDatePicker } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum,  NwDic, chooseDept2, NwEmployeePick} from "@platform/main"
import { OrgTree } from "@platform/mdm";
const { formRef, dataModel, rules, dataPermits, orgShow, chooseOrg, deptShow, chooseDept, handleChooseOrg, handleChooseDept, validPeriodPick} = new FormModal();
</script>
<style lang="less">
    .n-date-picker{
        width: 100%;
    }
</style>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="知识产权编号" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input placeholder="知识产权编号" v-model:value="dataModel.code"
                    :disabled="dataPermits.code === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="知识产权名称" path="name" v-if="dataPermits.name !== FormPermissionEnum.HIDE">
                <n-input placeholder="知识产权名称" v-model:value="dataModel.name"
                    :disabled="dataPermits.name === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="类别" path="type" v-if="dataPermits.typeCode !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="类别" v-model:value="dataModel.type"
                    :disabled="dataPermits.type === FormPermissionEnum.READONLY" /> -->
                <NwDic dictCode="asset_property_type" selectFirst=true
                    v-model:value="dataModel.typeCode" v-model:label="dataModel.typeName"></NwDic>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="获得形式" path="type" v-if="dataPermits.methodCode !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="类别" v-model:value="dataModel.type"
                    :disabled="dataPermits.type === FormPermissionEnum.READONLY" /> -->
                <NwDic dictCode="asset_acquire_method" selectFirst=true
                    v-model:value="dataModel.methodCode" v-model:label="dataModel.methodName"></NwDic>
            </n-form-item-gi>
            <!-- <n-form-item-gi :span="12" label="发明人名称" path="inventUserName" v-if="dataPermits.inventUserName !== FormPermissionEnum.HIDE">
                <n-input placeholder="发明人名称" v-model:value="dataModel.inventUserName"
                    :disabled="dataPermits.inventUserName === FormPermissionEnum.READONLY" />
            </n-form-item-gi> -->
            <n-form-item-gi :span="12" label="发明人" path="inventUserName" v-if="dataPermits.inventUserName !== FormPermissionEnum.HIDE" >
              <n-input placeholder="发明人" v-model:value="dataModel.inventUserName" 
                    :disabled="dataPermits.inventUserName === FormPermissionEnum.READONLY" />
                    <NwEmployeePick :value="dataModel.inventUserId" :expreParamValueText="dataModel.inventUserName"
                        @updateExpreParamValueText="(value: any) => dataModel.inventUserName = value"
                        @updateValue="(value: any) => dataModel.inventUserId = value" />
            </n-form-item-gi>
            <!-- <n-form-item-gi :span="12" label="产权人名称" path="propertyUserName" v-if="dataPermits.propertyUserName !== FormPermissionEnum.HIDE">
                <n-input placeholder="产权人名称" v-model:value="dataModel.propertyUserName"
                    :disabled="dataPermits.propertyUserName === FormPermissionEnum.READONLY" />
            </n-form-item-gi> -->
            <n-form-item-gi :span="12" label="产权人"  path="propertyUserName" v-if="dataPermits.propertyUserName !== FormPermissionEnum.HIDE" >
                <n-input placeholder="产权人" v-model:value="dataModel.propertyUserName" @click="chooseOrg" 
                    :disabled="dataPermits.propertyUserName === FormPermissionEnum.READONLY">选择组织</n-input>
                <!-- <OrgTree v-model:show="orgShow" :org-type="1" :level="2" :expand-level="1" :select-level="2" ref="orgTreeRef" @choose="handleChooseOrg" /> -->
                <chooseDept2 :isShowSearch="true" :orgUserName="''" :value="dataModel.propertyUserId" :showSide="false" :selectOrgType="'1'" @update:callback="handleChooseOrg"></chooseDept2>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="编制单位" path="applyUnitName" v-if="dataPermits.applyUnitName !== FormPermissionEnum.HIDE">
                <n-input placeholder="编制单位" v-model:value="dataModel.applyUnitName"  @click="chooseDept" 
                    :disabled="dataPermits.applyUnitName === FormPermissionEnum.READONLY" />
                <!-- <OrgTree v-model:show="deptShow" :org-type="1" :level="3" :expand-level="2" ref="orgTreeRef" :select-org-type="'1'" @choose="handleChooseDept" /> -->
                <chooseDept2 :isShowSearch="true" :orgUserName="''" :value="dataModel.applyUnitId" :showSide="false" @update:callback="handleChooseDept"></chooseDept2>
  
                </n-form-item-gi>
            
            <!-- <n-form-item-gi :span="12" label="申请人名称" path="applyUserName" v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请人名称" v-model:value="dataModel.applyUserName"
                    :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
            </n-form-item-gi> -->
            <n-form-item-gi :span="12" label="申请日期" path="applyDate" v-if="dataPermits.applyDate !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="申请日期" v-model:value="dataModel.applyDate"
                    :disabled="dataPermits.applyDate === FormPermissionEnum.READONLY" /> -->
                <n-date-picker v-model:formatted-value="dataModel.applyDate" value-format="yyyy-MM-dd" type="date"
                    :disabled="dataPermits.applyDate === FormPermissionEnum.READONLY" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="授权日期" path="authDate" v-if="dataPermits.authDate !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="授权日期" v-model:value="dataModel.authDate"
                    :disabled="dataPermits.authDate === FormPermissionEnum.READONLY" /> -->
                <n-date-picker v-model:formatted-value="dataModel.authDate" value-format="yyyy-MM-dd" type="date"
                    :disabled="dataPermits.authDate === FormPermissionEnum.READONLY" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="有效期" path="validPeriod" v-if="dataPermits.validPeriod !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="有效期" v-model:value="dataModel.validPeriod"
                    :disabled="dataPermits.validPeriod === FormPermissionEnum.READONLY" /> -->
                <n-date-picker v-model:formatted-value="dataModel.validPeriod" value-format="yyyy-MM-dd" type="date" :shortcuts="validPeriodPick"
                    :disabled="dataPermits.validPeriod === FormPermissionEnum.READONLY" clearable />
            </n-form-item-gi>
        </n-grid>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>