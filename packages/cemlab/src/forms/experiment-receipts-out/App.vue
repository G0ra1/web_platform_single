<script lang="ts" setup>
import { ref } from 'vue'
import { NForm,  NDivider, NScrollbar, NGrid, NFormItemGi, NInput, NDatePicker, NButton } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid, NwDic } from "@platform/main"
import EmployeePick from "../../components/employeePick/index.vue";
const { formRef, dataModel, rules, specimenColumns, specimenSonColumns, itemsColumns } = new FormModal();

const employeePickRef = ref();

if (dataModel.value.experimentSpecimenList.length == 0){
    dataModel.value.experimentSpecimenList = [{
        isDel:0,
        type:1
    }]
}
if (dataModel.value.cemlabExperimentConditionList.length == 0){
    dataModel.value.cemlabExperimentConditionList = [{
        isDel:0
    }]
}

//选择实验人员
const getUsers = (user:any) =>{
    dataModel.value.experimentUserName = user[0].userNameCh;
    dataModel.value.experimentUserid = user[0].id;
}
</script>
<template>
    <n-scrollbar style="height:100%;">
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="140"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">样品信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24" >
                    <NwFieldGrid v-model:value="dataModel.experimentSpecimenList" style="width: 100%" 
                            :columns="specimenColumns"
                            :is-readonly="true"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                        <template #customerNameDict="{ row }">
                            <NwDic dictCode="CUSTOMER" v-model:value="row.customerNameDict"
                                v-model:label="row.customerName"></NwDic>
                        </template>
                        <template #detectionMethodDict="{ row }">
                            <NwDic dictCode="DETECTION_METHOD" v-model:value="row.detectionMethodDict"
                                v-model:label="row.detectionMethod"></NwDic>
                        </template>
                        <template #specimenName="{ row }">
                            <n-input placeholder="样品名称" v-model:value="row.specimenName" />
                        </template>
                        <template #specimenCode="{ row }">
                            <n-input placeholder="样品编号" v-model:value="row.specimenCode" />
                        </template>
                        <template #specimenMaterial="{ row }">
                            <n-input placeholder="样品材质" v-model:value="row.specimenMaterial" />
                        </template>
                    </NwFieldGrid>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">附带样品信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24" >
                    <NwFieldGrid v-model:value="dataModel.experimentSpecimenSonList" style="width: 100%"
                            :defaultValue="{type:2,isDel:0}"
                            :columns="specimenSonColumns"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                        <template #specimenName="{ row }">
                            <n-input placeholder="样品名称" v-model:value="row.specimenName" />
                        </template>
                        <template #specimenAttribute="{ row }">
                            <n-input placeholder="样品属性" v-model:value="row.specimenAttribute" />
                        </template>
                    </NwFieldGrid>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">实验条件</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="实验温度(°C)">
                    <n-input placeholder="实验温度(°C)" v-model:value="dataModel.cemlabExperimentConditionList[0].experimentTemperature" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="实验压力(MPa)">
                    <n-input placeholder="实验压力(MPa)" v-model:value="dataModel.cemlabExperimentConditionList[0].experimentPressure" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="升温时间(min)">
                    <n-input placeholder="升温时间(min)" v-model:value="dataModel.cemlabExperimentConditionList[0].heatingTime" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="养护温度(°C)">
                    <n-input placeholder="养护温度(°C)" v-model:value="dataModel.cemlabExperimentConditionList[0].curingTemperature" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="养护压力(MPa)">
                    <n-input placeholder="养护压力(MPa)" v-model:value="dataModel.cemlabExperimentConditionList[0].curingPressure" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="养护时间(min)">
                    <n-input placeholder="养护时间(min)" v-model:value="dataModel.cemlabExperimentConditionList[0].curingTime" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">检测项目</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24" >
                    <NwFieldGrid v-model:value="dataModel.cemlabExperimentItemsList" :defaultValue="{isDel:0}" style="width: 100%"
                            :columns="itemsColumns"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                        <template #detectionItemDict="{ row }">
                            <NwDic dictCode="DETECTION_ITEM" v-model:value="row.detectionItemDict"
                                v-model:label="row.detectionItem"></NwDic>
                        </template>
                        <template #detectionVal="{ row }">
                            <n-input placeholder="数值" v-model:value="row.detectionVal" />
                        </template>
                    </NwFieldGrid>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="备注" path="remark">
                    <n-input placeholder="备注" type="textarea" v-model:value="dataModel.remark" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="完成日期" path="finishDate">
                    <n-date-picker placeholder="完成日期" v-model:formatted-value="dataModel.finishDate"
                        value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="实验人员" path="experimentUserName">
                    <n-input placeholder="实验人员" v-model:value="dataModel.experimentUserName"/>
                    <n-button type="primary" @click="employeePickRef?.sonFn()">选择</n-button>
                    <EmployeePick ref="employeePickRef" @update:callback="getUsers" :multiple="false"></EmployeePick>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
</template>