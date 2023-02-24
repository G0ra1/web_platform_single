<script lang="ts" setup>
import { NForm, NInput,NCard, NGrid, NFormItemGi,NSelect, NGradientText, NFormItem, NDivider, NSwitch, NText, NInputNumber,NDatePicker } from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum ,NwFieldGrid,NwPickAny} from "@platform/main"
import { DispatchPersionsColumn ,ApproachPersonChooseColumn} from './constant'
const { formRef, dataModel, rules, dataPermits,addApproachPerson,planTypeOptions } = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <!-- <n-card title="基本信息" :hoverable="true" :embedded="true">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="6" label="需求名称:">
            <n-gradient-text type="info">{{ dataModel.planName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="需求类别:">
            <n-gradient-text type="info">{{ planTypeArray[dataModel.planType] }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="需求单位:">
            <n-gradient-text type="info">{{ dataModel.planOrgName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="承包合同:">
            <n-select placeholder="请选择承包合同" :value="dataModel.workcontractname" @update:value="contractWork"
              :options="contractWorkOptions" />
          </n-form-item-gi>
        </n-grid>
      </n-card> -->
        <n-form-item :span="24"  label="" path="">
                <h5 class="card-title">基本信息</h5>    
            </n-form-item >
        <n-form-item label="" path="dispatchCategory" v-if="dataPermits.dispatchCategory === FormPermissionEnum.HIDE" >
            <n-input placeholder="" v-model:value="dataModel.dispatchCategory"
                :disabled="dataPermits.dispatchCategory === FormPermissionEnum.READONLY"/>
        </n-form-item>
        <n-form-item label="派遣类别" path="dispatchTypeName" v-if="dataPermits.dispatchTypeName !== FormPermissionEnum.HIDE">
           
           <n-select
                   placeholder="Select" :value="dataModel.dispatchTypeName"
                   @update:value="(d: any, p: any)=>{
                       // dataModel.dispatchTypeName = d.label
                       dataModel.dispatchType = d
                       dataModel.dispatchTypeName = p.label
                   }"
                   :options="planTypeOptions"  @select="(d)=>{}"
               /> 
       </n-form-item>
        <n-form-item label="大修id" path="daxiuid" v-if="dataPermits.daxiuid === FormPermissionEnum.HIDE">
            <n-input placeholder="大修id" v-model:value="dataModel.daxiuid"
                :disabled="dataPermits.daxiuid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="大修名称" path="daxiuname" v-if=" dataModel.dispatchType==1 ? dataPermits.daxiuname !== FormPermissionEnum.HIDE : dataPermits.daxiuname === FormPermissionEnum.HIDE">
            <n-input placeholder="大修名称" v-model:value="dataModel.daxiuname"
                :disabled="dataPermits.daxiuname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同id" path="workcontractid" v-if="dataPermits.workcontractid === FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同id" v-model:value="dataModel.workcontractid"
                :disabled="dataPermits.workcontractid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同名称" path="workcontractname" v-if="dataPermits.workcontractname !== FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同名称" v-model:value="dataModel.workcontractname"
                :disabled="dataPermits.workcontractname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人名称" path="applyName" v-if="dataPermits.applyName === FormPermissionEnum.HIDE">
            <n-input placeholder="申请人名称" v-model:value="dataModel.applyName"
                :disabled="dataPermits.applyName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请人id" path="applyId" v-if="dataPermits.applyId === FormPermissionEnum.HIDE">
            <n-input placeholder="申请人id" v-model:value="dataModel.applyId"
                :disabled="dataPermits.applyId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime" v-if="dataPermits.applyTime === FormPermissionEnum.HIDE">
            <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="派遣日期" path="dispatchDate" v-if="dataPermits.dispatchDate !== FormPermissionEnum.HIDE">
            <n-date-picker style="width:100%" v-model:formatted-value="dataModel.dispatchDate"  type="date" clearable
                    value-format="yyyy-MM-dd" 
                    placeholder="请选择日期" />
        </n-form-item>

        <n-form-item label="派遣类别标识 1-大修 2-日常 3-专项" path="dispatchType" v-if="dataPermits.dispatchType === FormPermissionEnum.HIDE">
            <n-input-number placeholder="派遣类别标识 1-大修 2-日常 3-专项" v-model:value="dataModel.dispatchType"
                :disabled="dataPermits.dispatchType === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="大修编码" path="daxiucode" v-if="dataPermits.daxiucode === FormPermissionEnum.HIDE">
            <n-input placeholder="大修编码" v-model:value="dataModel.daxiucode"
                :disabled="dataPermits.daxiucode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同编码" path="workcontractcode" v-if="dataPermits.workcontractcode === FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同编码" v-model:value="dataModel.workcontractcode"
                :disabled="dataPermits.workcontractcode === FormPermissionEnum.READONLY" />
        </n-form-item>

        <n-form-item :span="24"  label="" path="">
                <h5 class="card-title">人员信息</h5>    
            </n-form-item >

        <n-form-item :span="24" path="labourDispatchPersionList">
            <NwFieldGrid :height="300" v-model:value="dataModel.labourDispatchPersionList" style="width: 100%" :columns="DispatchPersionsColumn">
                <template #buttons>
                <NwPickAny rowKey="suppUserId" button-label="选择" modal-title="劳务人员" :width="1000" :height="600"
                  :gridColumns="ApproachPersonChooseColumn" :value="dataModel.labourDispatchPersionList" 
                  @update:value="(d) => { addApproachPerson(d) }" requestUrl="/labour/labourDispatchPersion/personMobilizationPage"
                  :requestParam="{

                  }"
                  >


                  <template #search="{ searchData }">
                    <n-input v-model:value="searchData.idCard" placeholder="身份证号" size="medium" />
                    <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                  </template>
                </NwPickAny>
                <!-- <n-button @click="(showDelModal = true)">选择承包合同</n-button>   -->
              </template>
            </NwFieldGrid>

        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>