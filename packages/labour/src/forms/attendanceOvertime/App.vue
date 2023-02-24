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
        <n-form-item label="劳务人员id" path="suppUserId" v-if="dataPermits.suppUserId !== FormPermissionEnum.HIDE">
            <n-input placeholder="劳务人员id" v-model:value="dataModel.suppUserId"
                :disabled="dataPermits.suppUserId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="劳务人员名称" path="suppUserName" v-if="dataPermits.suppUserName !== FormPermissionEnum.HIDE">
            <n-input placeholder="劳务人员名称" v-model:value="dataModel.suppUserName"
                :disabled="dataPermits.suppUserName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所在班组id" path="banId" v-if="dataPermits.banId !== FormPermissionEnum.HIDE">
            <n-input placeholder="所在班组id" v-model:value="dataModel.banId"
                :disabled="dataPermits.banId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所在班组名称" path="banName" v-if="dataPermits.banName !== FormPermissionEnum.HIDE">
            <n-input placeholder="所在班组名称" v-model:value="dataModel.banName"
                :disabled="dataPermits.banName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所在劳务公司id" path="labourCompanyId" v-if="dataPermits.labourCompanyId !== FormPermissionEnum.HIDE">
            <n-input placeholder="所在劳务公司id" v-model:value="dataModel.labourCompanyId"
                :disabled="dataPermits.labourCompanyId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="所在劳务公司名称" path="labourCompanyName" v-if="dataPermits.labourCompanyName !== FormPermissionEnum.HIDE">
            <n-input placeholder="所在劳务公司名称" v-model:value="dataModel.labourCompanyName"
                :disabled="dataPermits.labourCompanyName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="加班日期" path="overtimeDate" v-if="dataPermits.overtimeDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="加班日期" v-model:value="dataModel.overtimeDate"
                :disabled="dataPermits.overtimeDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="上午开始-时" path="amStartH" v-if="dataPermits.amStartH !== FormPermissionEnum.HIDE">
            <n-input placeholder="上午开始-时" v-model:value="dataModel.amStartH"
                :disabled="dataPermits.amStartH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="上午开始-分" path="amStartM" v-if="dataPermits.amStartM !== FormPermissionEnum.HIDE">
            <n-input placeholder="上午开始-分" v-model:value="dataModel.amStartM"
                :disabled="dataPermits.amStartM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="上午结束-时" path="amEndH" v-if="dataPermits.amEndH !== FormPermissionEnum.HIDE">
            <n-input placeholder="上午结束-时" v-model:value="dataModel.amEndH"
                :disabled="dataPermits.amEndH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="上午结束分" path="amEndM" v-if="dataPermits.amEndM !== FormPermissionEnum.HIDE">
            <n-input placeholder="上午结束分" v-model:value="dataModel.amEndM"
                :disabled="dataPermits.amEndM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="下午开始-时" path="pmStartH" v-if="dataPermits.pmStartH !== FormPermissionEnum.HIDE">
            <n-input placeholder="下午开始-时" v-model:value="dataModel.pmStartH"
                :disabled="dataPermits.pmStartH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="下午开始-分" path="pmStartM" v-if="dataPermits.pmStartM !== FormPermissionEnum.HIDE">
            <n-input placeholder="下午开始-分" v-model:value="dataModel.pmStartM"
                :disabled="dataPermits.pmStartM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="下午结束-时" path="pmEndH" v-if="dataPermits.pmEndH !== FormPermissionEnum.HIDE">
            <n-input placeholder="下午结束-时" v-model:value="dataModel.pmEndH"
                :disabled="dataPermits.pmEndH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="下午结束分" path="pmEndM" v-if="dataPermits.pmEndM !== FormPermissionEnum.HIDE">
            <n-input placeholder="下午结束分" v-model:value="dataModel.pmEndM"
                :disabled="dataPermits.pmEndM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="晚上开始-时" path="nightStartH" v-if="dataPermits.nightStartH !== FormPermissionEnum.HIDE">
            <n-input placeholder="晚上开始-时" v-model:value="dataModel.nightStartH"
                :disabled="dataPermits.nightStartH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="晚上开始-分" path="nightStartM" v-if="dataPermits.nightStartM !== FormPermissionEnum.HIDE">
            <n-input placeholder="晚上开始-分" v-model:value="dataModel.nightStartM"
                :disabled="dataPermits.nightStartM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="晚上结束-时" path="nightEndH" v-if="dataPermits.nightEndH !== FormPermissionEnum.HIDE">
            <n-input placeholder="晚上结束-时" v-model:value="dataModel.nightEndH"
                :disabled="dataPermits.nightEndH === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="晚上结束分" path="nightEndM" v-if="dataPermits.nightEndM !== FormPermissionEnum.HIDE">
            <n-input placeholder="晚上结束分" v-model:value="dataModel.nightEndM"
                :disabled="dataPermits.nightEndM === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="加班时长" path="overLength" v-if="dataPermits.overLength !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="加班时长" v-model:value="dataModel.overLength"
                :disabled="dataPermits.overLength === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="备注" path="remark" v-if="dataPermits.remark !== FormPermissionEnum.HIDE">
            <n-input placeholder="备注" v-model:value="dataModel.remark"
                :disabled="dataPermits.remark === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="状态：1未办理、2已同意、3已拒绝" path="overtimeState" v-if="dataPermits.overtimeState !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="状态：1未办理、2已同意、3已拒绝" v-model:value="dataModel.overtimeState"
                :disabled="dataPermits.overtimeState === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="班长备注" path="monitorRemark" v-if="dataPermits.monitorRemark !== FormPermissionEnum.HIDE">
            <n-input placeholder="班长备注" v-model:value="dataModel.monitorRemark"
                :disabled="dataPermits.monitorRemark === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同id" path="contractWorkId" v-if="dataPermits.contractWorkId !== FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同id" v-model:value="dataModel.contractWorkId"
                :disabled="dataPermits.contractWorkId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同编号" path="contractWorkCode" v-if="dataPermits.contractWorkCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同编号" v-model:value="dataModel.contractWorkCode"
                :disabled="dataPermits.contractWorkCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同名称" path="contractWorkName" v-if="dataPermits.contractWorkName !== FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同名称" v-model:value="dataModel.contractWorkName"
                :disabled="dataPermits.contractWorkName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同预计成本" path="estimatesettlementamount" v-if="dataPermits.estimatesettlementamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="承包合同预计成本" v-model:value="dataModel.estimatesettlementamount"
                :disabled="dataPermits.estimatesettlementamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同实际成本" path="estimateinitamountnotax" v-if="dataPermits.estimateinitamountnotax !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="承包合同实际成本" v-model:value="dataModel.estimateinitamountnotax"
                :disabled="dataPermits.estimateinitamountnotax === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟订单id" path="virtualPurchaseId" v-if="dataPermits.virtualPurchaseId !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单id" v-model:value="dataModel.virtualPurchaseId"
                :disabled="dataPermits.virtualPurchaseId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟订单编号" path="virtualPurchaseCode" v-if="dataPermits.virtualPurchaseCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单编号" v-model:value="dataModel.virtualPurchaseCode"
                :disabled="dataPermits.virtualPurchaseCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟订单名称" path="virtualPurchaseName" v-if="dataPermits.virtualPurchaseName !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单名称" v-model:value="dataModel.virtualPurchaseName"
                :disabled="dataPermits.virtualPurchaseName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同预计履约金额" path="estimateexecamount" v-if="dataPermits.estimateexecamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="采购合同预计履约金额" v-model:value="dataModel.estimateexecamount"
                :disabled="dataPermits.estimateexecamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购合同实际履约金额" path="actualexecamount" v-if="dataPermits.actualexecamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="采购合同实际履约金额" v-model:value="dataModel.actualexecamount"
                :disabled="dataPermits.actualexecamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="结算状态-1未结算-2结算中-3已结算" path="settlementState" v-if="dataPermits.settlementState !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="结算状态-1未结算-2结算中-3已结算" v-model:value="dataModel.settlementState"
                :disabled="dataPermits.settlementState === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="结算时间" path="settlementDate" v-if="dataPermits.settlementDate !== FormPermissionEnum.HIDE">
            <n-input placeholder="结算时间" v-model:value="dataModel.settlementDate"
                :disabled="dataPermits.settlementDate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="结算单id" path="statementId" v-if="dataPermits.statementId !== FormPermissionEnum.HIDE">
            <n-input placeholder="结算单id" v-model:value="dataModel.statementId"
                :disabled="dataPermits.statementId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="结算单名称" path="statementName" v-if="dataPermits.statementName !== FormPermissionEnum.HIDE">
            <n-input placeholder="结算单名称" v-model:value="dataModel.statementName"
                :disabled="dataPermits.statementName === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>