<template>
  <NScrollbar>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" style="padding:20px 30px">
      <n-card title="基本信息" :hoverable="true" :embedded="true">
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
          <n-form-item-gi :span="6" label="批量选择承包合同:">
            <n-select placeholder="请选择承包合同" :value="dataModel.workcontractname" @update:value="contractWork"
              :options="contractWorkOptions" />
            <!-- <n-gradient-text type="info">{{ dataModel.overhaulCode }}</n-gradient-text> -->
          </n-form-item-gi>
        </n-grid>
      </n-card>
      <n-card title="劳务人员信息" :hoverable="true" :embedded="true" style="margin-top: 20px;">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" path="approachPersonList">
            <NwFieldGrid style="width: 100%;" v-bind="ApproachPersonOptions" :ref="(d) => gridRefs['priceList'] = d"
              v-model:value="dataModel.approachPersonList" :rules="gridRules['approachPersonList']"
              :data-permits="gridDataPermits['approachPersonList']" :edit-enabled="true" :columns="ApproachPersonColumn"
              @checkboxChange="checkboxChange">
              <template #buttons>
                <!-- <NwPickAny rowKey="suppUserId" button-label="选择" modal-title="劳务人员" :width="1000" :height="600"
                  :gridColumns="ApproachPersonChooseColumn" 
                  :value="dataModel.approachPersonList?.map((person) => {
                    person.id = person.planReferralId;
                    return person;
                  })" 
                  @update:value="(d) => { addApproachPerson(d) }" 
                  requestUrl="/labour/labourPlanReferral/page"
                  :requestParam="{
                    isApproach: 1,
                    planId: dataModel.planId,
                    userReferralStatus: 'stay_entrance',
                    planReferralIds: dataModel.approachPersonList?.map(person => person.planReferralId).join(',')
                  }"
                  >
                   <template #search="{ searchData }">
                    <n-input v-model:value="searchData.suppOrgName" placeholder="供应商名称" size="medium" />
                    <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                  </template> 
                </NwPickAny> -->
                <!-- <n-button @click="(showDelModal = true)">选择承包合同</n-button>   -->
              </template>
              <template #outerDisciplineName_edit="{ row }">
                <n-select :options="outerDisciplineOptions" placeholder="选择岗位"  :value="row.outerDisciplineId" @update:value="(d,obj)=>{ updateOuterDiscipline(row,d,obj) }" :consistent-menu-width="false" :style="{width: '150px',float:'right'}"></n-select>
              </template>
              <template #postRankName_edit="{row}">
                <n-select :options="postRankOptions" placeholder="选择专业"  :value="row.postRankName" @update:value="(d,obj)=>{ updatePostRank(row,d,obj) }" :consistent-menu-width="false" :style="{width: '150px',float:'right'}"></n-select>
              </template>
              <template #ban_edit="{row}">
                <n-tree-select :options="orgTree" :consistent-menu-width="false" label-field="orgName" :value="row.banId"  children-field="kids" key-field="id" @update:value="(d:any,op:any)=>{updateOrgTree(row,d,op)}" /> 
              </template>
              <template #workcontractname_edit="{row}">
                <n-select 
                :options="contractWorkOptions" 
                placeholder="选择岗位"  
                :value="row.workcontractid" 
                @update:value="(d, b:any)=>{ 
                    row.workcontractid = d
                    row.workcontractname = b.label
                    row.workcontractcode = b.code
                    c_changeContractWork.value(d, b,  FormModal.selectedData.value)
                 }" 
                :consistent-menu-width="false" 
                :style="{width: '150px',float:'right'}"></n-select>
              </template>
            </NwFieldGrid>
          </n-form-item-gi>
        </n-grid>
      </n-card>
    </n-form>

  </NScrollbar>

    <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" title="选择承包合同" positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" >
      <n-select placeholder="请选择承包合同" :value="dataModel.workcontractname" @update:value="contractWorkOne" :style="{  width: '200px', margin: '0 auto',padding:'20px 0'}"  :options="contractWorkOptions" />
    </n-modal> 
</template>

<script lang="ts" setup>
import { NForm, NInput, NCard, NGrid, NFormItemGi, NSelect, NInputNumber, NDivider, NGradientText, NScrollbar, NButton,NModal,NTreeSelect,useDialog, useMessage, } from "naive-ui";
import { nextTick } from 'vue'
import { NwFieldGrid, NwDic, NwPickAny } from '@platform/main'
import { FormModal,outerDisciplineOptions,postRankOptions,initDialog } from "./App";
import { ApproachPersonColumn, ApproachPersonChooseColumn, ApproachPersonOptions, checkboxChange, c_changeContractWork } from './constant'
import { planTypeArray } from "../../lib/constant/Constant";

console.log('-=======app.vue内的===new FormModal')
const { formRef, dataModel, rules, gridRefs, gridRules, gridDataPermits, addApproachPerson, contractWork, changeContractWork,showDelModal,onPositiveClick,contractWorkOne,updateOuterDiscipline,updatePostRank,orgTree,updateOrgTree } = new FormModal();
console.log('-=======app.vue内的===new FormModal 完成')
const contractWorkOptions = FormModal.contractWorkOptions

nextTick().then(() => {
  c_changeContractWork.value = changeContractWork
})

initDialog(useDialog(), useMessage())
</script>