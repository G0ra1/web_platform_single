<script lang="ts" setup>
import { NForm, NInput,NTreeSelect,NDropdown,NCard, NDivider,NInputGroup,NScrollbar,NInputNumber, NSwitch, NSelect, NGrid, NFormItemGi, NDatePicker, NUpload, useDialog, useMessage, NButton,NFormItem } from "naive-ui";
import { FormModal ,contractNameOptions,contractCodeOptions,contractOwnercompanynameOptions,contractOrgannameOptions,overhaulOrgnameOptions} from "./App";
import { getDict } from "./api";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
import {NwPickAny,NwFieldGrid,NwDic,NwIcon  } from '@platform/main'
const { formRef, dataModel, rules, dataPermits,pGridOption,gridRefs,gridRules,gridDataPermits,orgTree,planTypeOptions,getOverhaul } = new FormModal();
</script>
<template> 
    <n-form ref="formRef" class="LForm" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="150"
        require-mark-placement="right-hanging">
        <n-grid :cols="24" :x-gap="24" class="LFormNg" >
            <n-form-item-gi :span="24"  label="" path="">
                <h5 class="card-title">基本信息</h5>    
            </n-form-item-gi >
          
            <n-form-item-gi :span="12" label="需求类别" path="planType" v-if="dataPermits.planType !== FormPermissionEnum.HIDE">
                <n-select
                    placeholder="Select" :value="dataModel.planType"
                    @update:value="(d)=>{
                        dataModel.planType = d
                        dataModel.planName = ''
                    }"
                    :options="planTypeOptions"  @select="(d)=>{}"
                />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="需求计划名称" path="planName" v-if="dataPermits.planName !== FormPermissionEnum.HIDE">
                <n-input placeholder="需求计划名称" v-model:value="dataModel.planName" :disabled="dataModel.planType === '1'" />
            </n-form-item-gi>
        
            <!-- <n-form-item-gi :span="12" label="需求计划编号" path="planNo" v-if="false">
                <n-input placeholder="需求计划编号" v-model:value="dataModel.planNo"
                :disabled="dataPermits.planNo === FormPermissionEnum.READONLY" />
            </n-form-item-gi> -->
            <n-form-item-gi :span="12" label="所属机构id"  path="planOrgId" v-if="dataPermits.planOrgId !== FormPermissionEnum.HIDE" style="display:none">
                <n-input placeholder="所属机构id" v-model:value="dataModel.planOrgId"
                :disabled="dataPermits.planOrgId === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="所属机构名称" path="planOrgName"  v-if="dataPermits.planOrgName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属机构名称"  v-model:value="dataModel.planOrgName"
                disabled />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="所属部门id" path="planDeptId" v-if="dataPermits.planDeptId !== FormPermissionEnum.HIDE" style="display:none">
                <n-input placeholder="所属部门id" v-model:value="dataModel.planDeptId"
                disabled />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="所属部门名称" path="planDeptName" v-if="dataPermits.planDeptName !== FormPermissionEnum.HIDE">
                <n-input placeholder="所属部门名称" disabled v-model:value="dataModel.planDeptName" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="大修轮次" path="overhaulId" v-if="dataPermits.overhaulId !== FormPermissionEnum.HIDE && dataModel.planType === '1'">
                <n-input-group>
                    <n-input placeholder="大修轮次" v-model:value="dataModel.overhaulName" disabled/>
                    <NwPickAny
                            rowKey="contractcode"
                            button-label="大修轮次"
                            modal-title="大修轮次"
                            :isShowIcon="false"
                            :buttonOptions="{
                                size: 'small',
                                type: 'primary',
                                quaternary: false,
                            }"          
                            @update:value="(d) => {
                                dataModel.labourPlanPersonList = []
                                dataModel.overhaulId = d.id;
                                dataModel.overhaulName = d.overhaulRotation;
                                dataModel.overhaulCode = d.overhaulCode;
                                if(dataModel.planType === '1'){
                                    getOverhaul(d.overhaulRotation);
                                    dataModel.planName = d.overhaulRotation;
                                    dataModel.planStartTime = d.planStartTime;
                                    dataModel.planEndTime = d.planEndTime;
                                }
                            }"
                            :gridColumns="[
                            { field: 'overhaulRotation', title: '大修轮次', align: 'center', },
                            // { field: 'overhaulName', title: '大修名称' },
                            { field: 'year', title: '年', align: 'center', },
                            { field: 'month', title: '月份' , align: 'center',},
                            { field: 'orgname', title: '单位名称', align: 'center', },
                            ]"
                            requestUrl="/syndata/overhaul/page"
                            is-single
                            :requestParam="{
                            //appCode: dataModel.labourPlanContractWorkList,
                            }"
                        >
                        <template #search = "{ searchData }">
                            <n-form label-placement="left" :show-feedback="false" inline>
                                <n-form-item label="大修轮次:">
                                    <n-input v-model:value="searchData.overhaulRotation" placeholder="大修轮次" size="medium" />
                                </n-form-item>
                                <n-form-item label="分公司:">
                                    <n-select
                                     placeholder="分公司"
                                    :consistent-menu-width="false"
                                    :value="searchData.orgname || ''"
                                    :options="overhaulOrgnameOptions"
                                    @update:value="(d)=>{searchData.orgname = d }"
                                    :style="{
                                        width: '150px' 
                                    }"
                                    @select="(d)=>{}"
                                >   
                                </n-select>   
                                </n-form-item>
                            </n-form>
                        </template>
                    </NwPickAny>
                </n-input-group>                
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="预估金额" path="estimateAmount" v-if="dataPermits.estimateAmount !== FormPermissionEnum.HIDE">
                <n-input placeholder="预估金额" v-model:value="dataModel.estimateAmount"
                :disabled="dataPermits.estimateAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <!-- <n-form-item-gi :span="12" label="预算金额" path="budgetAmount" v-if="dataPermits.budgetAmount !== FormPermissionEnum.HIDE">
                <n-input placeholder="预算金额" v-model:value="dataModel.budgetAmount"
                :disabled="dataPermits.budgetAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="框架协议供应商" path="isFrameSupp" v-if="dataPermits.isFrameSupp !== FormPermissionEnum.HIDE">
                <n-switch :round="false" v-model:value="dataModel.isFrameSupp" :checked-value=1 :unchecked-value=0
                    :disabled="dataPermits.isFrameSupp === FormPermissionEnum.READONLY" size="large">
                    <template #checked>否</template>
                    <template #unchecked>是</template>
                </n-switch>
            </n-form-item-gi> -->

            <n-form-item-gi :span="12" label="计划开始时间" path="planStartTime"
                v-if="dataPermits.planStartTime !== FormPermissionEnum.HIDE" >
                <n-date-picker style="width:100%" v-model:formatted-value="dataModel.planStartTime"  type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.planStartTime === FormPermissionEnum.READONLY || dataModel.planType === '1'"
                    placeholder="请选择日期" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="计划结束时间" path="planEndTime"
                v-if="dataPermits.planEndTime !== FormPermissionEnum.HIDE ">
                <n-date-picker style="width:100%" v-model:formatted-value="dataModel.planEndTime" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.planEndTime === FormPermissionEnum.READONLY  || dataModel.planType === '1'"
                    placeholder="请选择日期" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="供应商推送截止时间" path="pushOffTime"
                v-if="dataPermits.pushOffTime !== FormPermissionEnum.HIDE">
                <n-date-picker style="width:100%" v-model:formatted-value="dataModel.pushOffTime" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.pushOffTime === FormPermissionEnum.READONLY  "
                    placeholder="请选择日期" />
            </n-form-item-gi>
            <n-form-item-gi :span="24"  label="" path="">
                <h5 class="card-title">合同信息</h5>
            </n-form-item-gi >
            <n-form-item-gi  :span="24" path="labourPlanContractWorkChangeList" class="LFormTable">
                <NwFieldGrid
                    v-model:value="dataModel.labourPlanContractWorkChangeList"
                    style="width: 100%"
                    :edit-enabled="false"
                    :columns="[
                    // { field: 'workContractId', title: '合同ID' },
                    { field: 'workContractCode', title: '合同编码' },
                    { field: 'workContractName', title: '合同名称' },
                    ]"
                >
                    <template #buttons>
                        <NwPickAny
                        rowKey="contractcode"
                        button-label="新增"
                        modal-title="承包合同"
                        :value="
                        (dataModel.labourPlanContractWorkChangeList || []).map((d) => ({
                            id: d.workContractId,
                            contractcode: d.workContractCode,
                            contractname: d.workContractName,
                        }))
                        "
                        @update:value="(d) => {
                            dataModel.labourPlanContractWorkChangeList = d.map((m: any) => ({ 
                                workContractCode: m.contractcode,
                                workContractName: m.contractname,
                                workContractId:m.id 
                                })
                            )}"
                                :gridColumns="[
                                { field: 'contractcode', title: '合同编码' , align: 'center'},
                                { field: 'contractname', title: '合同名称', align: 'center' },
                                { field: 'ownercompanyname', title: '业主单位', align: 'center' },
                                { field: 'organname', title: '机构名称', align: 'center' },
                                ]"
                                requestUrl="/workcontract/page"
                                :requestParam="{
                                //appCode: dataModel.labourPlanContractWorkList,
                                }"
                            >
                            <template #search = "{ searchData }">
                                <n-form label-placement="left" :show-feedback="false" inline> 
                                    <n-form-item label="合同名称:">
                                        <n-input v-model:value="searchData.contractname" placeholder="合同名称" size="medium" />
                                    </n-form-item>
                                    <n-form-item label="合同编号:">
                                        <n-input v-model:value="searchData.contractcode" placeholder="合同编码" size="medium" />  
                                    </n-form-item>
                                    <n-form-item label="业主单位:">
                                        <n-select
                                            placeholder="业主单位"
                                            :consistent-menu-width="false"
                                            :value="searchData.ownercompanyname || ''"
                                            :options="contractOwnercompanynameOptions"
                                            @update:value="(d)=>{searchData.ownercompanyname = d }"
                                            :style="{
                                                width: '80px' 
                                            }"
                                            @select="(d)=>{}"
                                        >   
                                        </n-select>   
                                    </n-form-item>
                                    <n-form-item label="机构名称:">
                                        <n-select
                                            placeholder="机构名称"
                                            :consistent-menu-width="false"
                                            :value="searchData.organname || ''"
                                            :options="contractOrgannameOptions"
                                            @update:value="(d)=>{searchData.organname = d }"
                                            :style="{
                                                width: '80px' 
                                            }"
                                            @select="(d)=>{}"
                                        >   
                                        </n-select>   
                                    </n-form-item>
                                </n-form>
                            </template>
                        </NwPickAny>
                    </template>
                </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi :span="24"  label="" path="">
                <h5 class="card-title">供应商信息</h5>
            </n-form-item-gi >
            <n-form-item-gi  :span="24" path="labourPlanSuppOrgList" class="LFormTable">
                <NwFieldGrid
                    v-model:value="dataModel.labourPlanSuppOrgChangeList"
                    style="width: 100%"
                    :edit-enabled="false"
                    :columns="[
                    // { field: 'suppOrgId', title: '供应商Id' },
                    { field: 'suppOrgCode', title: '供应商编码' },
                    { field: 'suppOrgName', title: '供应商名称' },
                    // { field: 'userNameCh', title: '联系人' },
                    ]"
                >
                    <template #buttons>
                        <NwPickAny
                        rowKey="orgCode"
                        button-label="新增"
                        modal-title="供应商"
                        :value="
                        (dataModel.labourPlanSuppOrgChangeList || []).map((d) => ({
                            orgCode: d.suppOrgCode,
                            orgName: d.suppOrgName,
                            // orgShortName:,
                            id: d.suppOrgId,
                        }))
                        "
                        @update:value="(d) => {dataModel.labourPlanSuppOrgChangeList = d.map((m: any) => ({ suppOrgId: m.id, suppOrgCode: m.orgCode, suppOrgName:m.orgName }))}"
                        :gridColumns="[
                        { field: 'orgName', title: '供应商名称', align: 'center', },
                        // { field: 'orgCode', title: '供应商编码' },
                        { field: 'userNameCh', title: '用户ID' , align: 'center',},
                        ]"
                        requestUrl="/labour/labourSuppOrg/page"
                        :requestParam="{
                        //appCode: dataModel.labourPlanContractWorkList,
                        }"
                    >
                    <template #search="{ searchData }">
                         <!-- <n-input v-model:value="searchData.orgCode" placeholder="供应商编码" size="medium"/> -->
                         <n-input v-model:value="searchData.orgName" placeholder="供应商名称" size="medium" />
                        </template>  
                </NwPickAny>
                    </template>
                </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi :span="24"  label="" path="">
            <h5 class="card-title">专业信息</h5>
            </n-form-item-gi >
            <n-form-item-gi
                class="LFormTable"
                :span="24"
                path="labourPlanPersonChangeList"
                
            >
                <NwFieldGrid
                    :height="500"
                    :ref="(d: any) => gridRefs['labourPlanPersonChangeList'] = d"
                    v-model:value="dataModel.labourPlanPersonList"
                    style="width: 100%"
                    :rules="gridRules['labourPlanPersonChangeList']"
                    :data-permits="gridDataPermits['labourPlanPersonChangeList']"
                    :default-value="{isHour:1}"
                    :columns="[
                    {
                        field: 'banId',
                        title: '班组信息',
                        editRender: { enabled: dataModel.planType==='1'? true : true },
                        slots: { edit: 'ban_edit',default:'banName' },
                    },
                    {
                        field: 'postRankName',
                        title: '专业类型',
                        editRender: { enabled: dataModel.planType==='1'? true : true },
                        slots: { edit: 'postRankName_edit'
                        },
                    },
                    {
                        field: 'projectName',
                        title: '项目名称',
                        editRender: { enabled: dataModel.planType==='1'? true : true },
                        slots: { edit: 'projectName_edit' },
                    },
                    {
                        field: 'outerDisciplineName',
                        title: '岗位名称',
                        editRender: { enabled: dataModel.planType==='1'? true : true},
                        slots: { edit: 'outerDisciplineName_edit' },
                    },
                    {
                        field: 'needNo',
                        title: '需求人数',
                        editRender: { enabled: dataModel.planType==='1'? true : true },
                        slots: { edit: 'needNo_edit' },
                    },
                    // {
                    //     field: 'isHour',
                    //     title: '是否工时制',
                    //     editRender: { enabled: dataModel.planType==='1'? true : true },
                    //     slots: { edit: 'isHour_edit', default:'isHour_view' },
                    // },
                    ]"
                >
                    <template #outerDisciplineName_edit="{ row }">
                        <nw-dic 
                        :selectOptions="{'consistent-menu-width': false }" 
                        dictCode="post"
                        v-model:value="row.outerDisciplineId"
                        v-model:label="row.outerDisciplineName"
                        size='small'
                        placeholder="请选择岗位"
                        />
                    </template>
                    <template #ban_edit="{ row }">
                         <n-tree-select :options="orgTree" :consistent-menu-width="false" label-field="orgName" :value="row.banId"  children-field="kids"
                         key-field="id" @update:value="(d,op:any)=>{row.banId=d;row.banName=op.orgName}" /> 
                    </template>
                    <template #banName="{ row }">
                            {{row.banName}}
                    </template>
                    <template #projectName_edit="{ row }">
                    <n-input v-model:value="row.projectName"></n-input>
                    </template>
                    <template #postRankName_edit="{ row }">
                        <nw-dic 
                         :selectOptions="{'consistent-menu-width': false }" 
                        dictCode="professional_type"
                        v-model:value="row.postRankId"
                        v-model:label="row.postRankName"
                        size='small'
                        placeholder="请选择类型"
                        />
                    </template>
                    <template #needNo_edit="{ row }">
                    <n-input v-model:value="row.needNo"></n-input>
                    </template>
                    <!-- <template #isHour_edit="{ row }">
                    <n-switch :round="false" v-model:value="row.isHour" :checked-value=1 :unchecked-value=0>
                        <template #checked> 是 </template>
                        <template #unchecked> 否 </template>
                    </n-switch>
                    </template>
                    <template #isHour_view="{ row }">
                            {{row.isHour===1?'是':'否'}}
                    </template> -->
                </NwFieldGrid>
            </n-form-item-gi>
        </n-grid>
       <!-- {{dataModel}} -->
        <!-- <n-data-table :columns="__columns" :data="__data" /> -->
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>