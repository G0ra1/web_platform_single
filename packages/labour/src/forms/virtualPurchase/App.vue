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
        <n-form-item label="需求计划id" path="planId" v-if="dataPermits.planId !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求计划id" v-model:value="dataModel.planId"
                :disabled="dataPermits.planId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟订单名称" path="virtualPurchaseName" v-if="dataPermits.virtualPurchaseName !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单名称" v-model:value="dataModel.virtualPurchaseName"
                :disabled="dataPermits.virtualPurchaseName === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="虚拟订单code" path="virtualPurchaseCode" v-if="dataPermits.virtualPurchaseCode !== FormPermissionEnum.HIDE">
            <n-input placeholder="虚拟订单code" v-model:value="dataModel.virtualPurchaseCode"
                :disabled="dataPermits.virtualPurchaseCode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="关联采购合同id" path="contractPurchaseId" v-if="dataPermits.contractPurchaseId !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联采购合同id" v-model:value="dataModel.contractPurchaseId"
                :disabled="dataPermits.contractPurchaseId === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="数据类型" path="datatype" v-if="dataPermits.datatype !== FormPermissionEnum.HIDE">
            <n-input placeholder="数据类型" v-model:value="dataModel.datatype"
                :disabled="dataPermits.datatype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="数据范围" path="datascope" v-if="dataPermits.datascope !== FormPermissionEnum.HIDE">
            <n-input placeholder="数据范围" v-model:value="dataModel.datascope"
                :disabled="dataPermits.datascope === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="框架编号" path="framecode" v-if="dataPermits.framecode !== FormPermissionEnum.HIDE">
            <n-input placeholder="框架编号" v-model:value="dataModel.framecode"
                :disabled="dataPermits.framecode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同编号" path="contractcode" v-if="dataPermits.contractcode !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同编号" v-model:value="dataModel.contractcode"
                :disabled="dataPermits.contractcode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同初始金额" path="initamount" v-if="dataPermits.initamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合同初始金额" v-model:value="dataModel.initamount"
                :disabled="dataPermits.initamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="已支付金额" path="alreadypayamount" v-if="dataPermits.alreadypayamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="已支付金额" v-model:value="dataModel.alreadypayamount"
                :disabled="dataPermits.alreadypayamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="最终金额" path="finalamount" v-if="dataPermits.finalamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="最终金额" v-model:value="dataModel.finalamount"
                :disabled="dataPermits.finalamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="变更金额;变更金额汇总" path="changeamout" v-if="dataPermits.changeamout !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="变更金额;变更金额汇总" v-model:value="dataModel.changeamout"
                :disabled="dataPermits.changeamout === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同总额;初始金额+变更金额" path="contractamount" v-if="dataPermits.contractamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="合同总额;初始金额+变更金额" v-model:value="dataModel.contractamount"
                :disabled="dataPermits.contractamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="订单执行总额含税;子合同/子订单合计金额" path="exectotalamount" v-if="dataPermits.exectotalamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="订单执行总额含税;子合同/子订单合计金额" v-model:value="dataModel.exectotalamount"
                :disabled="dataPermits.exectotalamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="预计履约执行金额" path="estimateexecamount" v-if="dataPermits.estimateexecamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="预计履约执行金额" v-model:value="dataModel.estimateexecamount"
                :disabled="dataPermits.estimateexecamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="实际履约执行金额" path="actualexecamount" v-if="dataPermits.actualexecamount !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="实际履约执行金额" v-model:value="dataModel.actualexecamount"
                :disabled="dataPermits.actualexecamount === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求部门Id" path="requirementunitid" v-if="dataPermits.requirementunitid !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求部门Id" v-model:value="dataModel.requirementunitid"
                :disabled="dataPermits.requirementunitid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求单位" path="requirementunit" v-if="dataPermits.requirementunit !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求单位" v-model:value="dataModel.requirementunit"
                :disabled="dataPermits.requirementunit === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="甲方单位" path="partaname" v-if="dataPermits.partaname !== FormPermissionEnum.HIDE">
            <n-input placeholder="甲方单位" v-model:value="dataModel.partaname"
                :disabled="dataPermits.partaname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="乙方单位" path="partbname" v-if="dataPermits.partbname !== FormPermissionEnum.HIDE">
            <n-input placeholder="乙方单位" v-model:value="dataModel.partbname"
                :disabled="dataPermits.partbname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="签订时间" path="signdate" v-if="dataPermits.signdate !== FormPermissionEnum.HIDE">
            <n-input placeholder="签订时间" v-model:value="dataModel.signdate"
                :disabled="dataPermits.signdate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购单位Id" path="purchaseunitid" v-if="dataPermits.purchaseunitid !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购单位Id" v-model:value="dataModel.purchaseunitid"
                :disabled="dataPermits.purchaseunitid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购单位" path="purchaseunit" v-if="dataPermits.purchaseunit !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购单位" v-model:value="dataModel.purchaseunit"
                :disabled="dataPermits.purchaseunit === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购方式" path="purchasemethodname" v-if="dataPermits.purchasemethodname !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购方式" v-model:value="dataModel.purchasemethodname"
                :disabled="dataPermits.purchasemethodname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购方式;字典编码zhjx_pcpmethod" path="purchasemethod" v-if="dataPermits.purchasemethod !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购方式;字典编码zhjx_pcpmethod" v-model:value="dataModel.purchasemethod"
                :disabled="dataPermits.purchasemethod === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购形式" path="purchaseformname" v-if="dataPermits.purchaseformname !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购形式" v-model:value="dataModel.purchaseformname"
                :disabled="dataPermits.purchaseformname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购形式;字典编码zhjx_pcpform" path="purchaseform" v-if="dataPermits.purchaseform !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购形式;字典编码zhjx_pcpform" v-model:value="dataModel.purchaseform"
                :disabled="dataPermits.purchaseform === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同状态" path="contractstatusname" v-if="dataPermits.contractstatusname !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同状态" v-model:value="dataModel.contractstatusname"
                :disabled="dataPermits.contractstatusname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同状态;字典编码zhjx_contractstatus" path="contractstatus" v-if="dataPermits.contractstatus !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同状态;字典编码zhjx_contractstatus" v-model:value="dataModel.contractstatus"
                :disabled="dataPermits.contractstatus === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="项目类型" path="projecttypename" v-if="dataPermits.projecttypename !== FormPermissionEnum.HIDE">
            <n-input placeholder="项目类型" v-model:value="dataModel.projecttypename"
                :disabled="dataPermits.projecttypename === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="项目类型;字典编码zhjx_pctype" path="projecttype" v-if="dataPermits.projecttype !== FormPermissionEnum.HIDE">
            <n-input placeholder="项目类型;字典编码zhjx_pctype" v-model:value="dataModel.projecttype"
                :disabled="dataPermits.projecttype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同名称" path="contractname" v-if="dataPermits.contractname !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同名称" v-model:value="dataModel.contractname"
                :disabled="dataPermits.contractname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同关闭时间" path="closedate" v-if="dataPermits.closedate !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同关闭时间" v-model:value="dataModel.closedate"
                :disabled="dataPermits.closedate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="项目名称;字典编码zhjx_purchasename" path="projectname" v-if="dataPermits.projectname !== FormPermissionEnum.HIDE">
            <n-input placeholder="项目名称;字典编码zhjx_purchasename" v-model:value="dataModel.projectname"
                :disabled="dataPermits.projectname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="关联承包合同id" path="workcontractid" v-if="dataPermits.workcontractid !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联承包合同id" v-model:value="dataModel.workcontractid"
                :disabled="dataPermits.workcontractid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="关联承包合同Name" path="workcontractname" v-if="dataPermits.workcontractname !== FormPermissionEnum.HIDE">
            <n-input placeholder="关联承包合同Name" v-model:value="dataModel.workcontractname"
                :disabled="dataPermits.workcontractname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="承包合同编号" path="workcontractcode" v-if="dataPermits.workcontractcode !== FormPermissionEnum.HIDE">
            <n-input placeholder="承包合同编号" v-model:value="dataModel.workcontractcode"
                :disabled="dataPermits.workcontractcode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="数据来源;1线上2线下" path="datasource" v-if="dataPermits.datasource !== FormPermissionEnum.HIDE">
            <n-input placeholder="数据来源;1线上2线下" v-model:value="dataModel.datasource"
                :disabled="dataPermits.datasource === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="agreenebtcide" path="agreenebtcide" v-if="dataPermits.agreenebtcide !== FormPermissionEnum.HIDE">
            <n-input placeholder="agreenebtcide" v-model:value="dataModel.agreenebtcide"
                :disabled="dataPermits.agreenebtcide === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="单位" path="organ" v-if="dataPermits.organ !== FormPermissionEnum.HIDE">
            <n-input placeholder="单位" v-model:value="dataModel.organ"
                :disabled="dataPermits.organ === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="机构名称" path="organname" v-if="dataPermits.organname !== FormPermissionEnum.HIDE">
            <n-input placeholder="机构名称" v-model:value="dataModel.organname"
                :disabled="dataPermits.organname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="部门Id" path="childorgan" v-if="dataPermits.childorgan !== FormPermissionEnum.HIDE">
            <n-input placeholder="部门Id" v-model:value="dataModel.childorgan"
                :disabled="dataPermits.childorgan === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="部门名称" path="childorganname" v-if="dataPermits.childorganname !== FormPermissionEnum.HIDE">
            <n-input placeholder="部门名称" v-model:value="dataModel.childorganname"
                :disabled="dataPermits.childorganname === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="台账Id" path="ledgerid" v-if="dataPermits.ledgerid !== FormPermissionEnum.HIDE">
            <n-input placeholder="台账Id" v-model:value="dataModel.ledgerid"
                :disabled="dataPermits.ledgerid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购类型;1物资2工程3服务" path="purchasetype" v-if="dataPermits.purchasetype !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购类型;1物资2工程3服务" v-model:value="dataModel.purchasetype"
                :disabled="dataPermits.purchasetype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="采购子类型;1框架合同2常规合同3项下订单" path="purchasesubtype" v-if="dataPermits.purchasesubtype !== FormPermissionEnum.HIDE">
            <n-input placeholder="采购子类型;1框架合同2常规合同3项下订单" v-model:value="dataModel.purchasesubtype"
                :disabled="dataPermits.purchasesubtype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="备注" path="remark" v-if="dataPermits.remark !== FormPermissionEnum.HIDE">
            <n-input placeholder="备注" v-model:value="dataModel.remark"
                :disabled="dataPermits.remark === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="attachmentid1" path="attachmentid1" v-if="dataPermits.attachmentid1 !== FormPermissionEnum.HIDE">
            <n-input placeholder="attachmentid1" v-model:value="dataModel.attachmentid1"
                :disabled="dataPermits.attachmentid1 === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="删除标记" path="isvalidate" v-if="dataPermits.isvalidate !== FormPermissionEnum.HIDE">
            <n-input placeholder="删除标记" v-model:value="dataModel.isvalidate"
                :disabled="dataPermits.isvalidate === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="数据是否允许编辑;0不允许编辑" path="ableedit" v-if="dataPermits.ableedit !== FormPermissionEnum.HIDE">
            <n-input placeholder="数据是否允许编辑;0不允许编辑" v-model:value="dataModel.ableedit"
                :disabled="dataPermits.ableedit === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="目标成本" path="targetcost" v-if="dataPermits.targetcost !== FormPermissionEnum.HIDE">
            <n-input-number placeholder="目标成本" v-model:value="dataModel.targetcost"
                :disabled="dataPermits.targetcost === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="质量得分" path="qualityscore" v-if="dataPermits.qualityscore !== FormPermissionEnum.HIDE">
            <n-input placeholder="质量得分" v-model:value="dataModel.qualityscore"
                :disabled="dataPermits.qualityscore === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="供应/施工/组织得分" path="organizescore" v-if="dataPermits.organizescore !== FormPermissionEnum.HIDE">
            <n-input placeholder="供应/施工/组织得分" v-model:value="dataModel.organizescore"
                :disabled="dataPermits.organizescore === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="支持配合得分" path="supportscore" v-if="dataPermits.supportscore !== FormPermissionEnum.HIDE">
            <n-input placeholder="支持配合得分" v-model:value="dataModel.supportscore"
                :disabled="dataPermits.supportscore === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合计得分" path="sumscore" v-if="dataPermits.sumscore !== FormPermissionEnum.HIDE">
            <n-input placeholder="合计得分" v-model:value="dataModel.sumscore"
                :disabled="dataPermits.sumscore === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="框架合同id" path="contractid" v-if="dataPermits.contractid !== FormPermissionEnum.HIDE">
            <n-input placeholder="框架合同id" v-model:value="dataModel.contractid"
                :disabled="dataPermits.contractid === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="attachmentid2" path="attachmentid2" v-if="dataPermits.attachmentid2 !== FormPermissionEnum.HIDE">
            <n-input placeholder="attachmentid2" v-model:value="dataModel.attachmentid2"
                :disabled="dataPermits.attachmentid2 === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求类型" path="needtypename" v-if="dataPermits.needtypename !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求类型" v-model:value="dataModel.needtypename"
                :disabled="dataPermits.needtypename === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求类型;字典编码zhjx_needtype" path="needtype" v-if="dataPermits.needtype !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求类型;字典编码zhjx_needtype" v-model:value="dataModel.needtype"
                :disabled="dataPermits.needtype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求子类型" path="needsubtypename" v-if="dataPermits.needsubtypename !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求子类型" v-model:value="dataModel.needsubtypename"
                :disabled="dataPermits.needsubtypename === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="需求子类型;字典编码zhjx_needsubtype" path="needsubtype" v-if="dataPermits.needsubtype !== FormPermissionEnum.HIDE">
            <n-input placeholder="需求子类型;字典编码zhjx_needsubtype" v-model:value="dataModel.needsubtype"
                :disabled="dataPermits.needsubtype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="协议编码" path="agreementcode" v-if="dataPermits.agreementcode !== FormPermissionEnum.HIDE">
            <n-input placeholder="协议编码" v-model:value="dataModel.agreementcode"
                :disabled="dataPermits.agreementcode === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="审批通过时间" path="transittime" v-if="dataPermits.transittime !== FormPermissionEnum.HIDE">
            <n-input placeholder="审批通过时间" v-model:value="dataModel.transittime"
                :disabled="dataPermits.transittime === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="centralbuying" path="centralbuying" v-if="dataPermits.centralbuying !== FormPermissionEnum.HIDE">
            <n-input placeholder="centralbuying" v-model:value="dataModel.centralbuying"
                :disabled="dataPermits.centralbuying === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="iscontract" path="iscontract" v-if="dataPermits.iscontract !== FormPermissionEnum.HIDE">
            <n-input placeholder="iscontract" v-model:value="dataModel.iscontract"
                :disabled="dataPermits.iscontract === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="付款合同合同类型" path="paycontracttype" v-if="dataPermits.paycontracttype !== FormPermissionEnum.HIDE">
            <n-input placeholder="付款合同合同类型" v-model:value="dataModel.paycontracttype"
                :disabled="dataPermits.paycontracttype === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="付款合同实施单位" path="paycontractunit" v-if="dataPermits.paycontractunit !== FormPermissionEnum.HIDE">
            <n-input placeholder="付款合同实施单位" v-model:value="dataModel.paycontractunit"
                :disabled="dataPermits.paycontractunit === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="合同有效时间" path="validdate" v-if="dataPermits.validdate !== FormPermissionEnum.HIDE">
            <n-input placeholder="合同有效时间" v-model:value="dataModel.validdate"
                :disabled="dataPermits.validdate === FormPermissionEnum.READONLY" />
        </n-form-item>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>