<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NCard,
  NGrid,
  NScrollbar,
  NFormItemGi,
  NTag,
} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main";
const { formRef, dataModel, rules, dataPermits } = new FormModal();
</script>
<template>
<n-scrollbar style="height: 100%">
  <n-form
    ref="formRef"
    :model="dataModel"
    :rules="rules"
    size="medium"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    style="padding: 20px 30px"
  >
    <n-card title="" :hoverable="true" :embedded="true">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi
        :span="8" label="父级机构名称" path="parentOrgName" v-if="dataPermits.parentOrgName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="父级机构名称"  v-model:value="dataModel.parentOrgName" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="用户姓名" path="userNameCh" v-if="dataPermits.userNameCh !== FormPermissionEnum.HIDE">
          <n-input placeholder="用户姓名"  v-model:value="dataModel.userNameCh" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="国籍" path="nationality" v-if="dataPermits.nationality !== FormPermissionEnum.HIDE">
          <n-input placeholder="国籍" v-model:value="dataModel.nationality" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="证件类型" path="cardType" v-if="dataPermits.cardType !== FormPermissionEnum.HIDE">
          <n-input-number  placeholder="证件类型" v-model:value="dataModel.cardType" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="性别" path="sex"  v-if="dataPermits.sex !== FormPermissionEnum.HIDE">
          <n-tag v-if="(dataModel.sex == 1)"> 男 </n-tag>
          <n-tag v-else-if="(dataModel.sex == 2)"> 女 </n-tag>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="证件号" path="idCard" v-if="dataPermits.idCard !== FormPermissionEnum.HIDE">
          <n-input placeholder="证件号" v-model:value="dataModel.idCard"  disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="生日" path="birthday" v-if="dataPermits.birthday !== FormPermissionEnum.HIDE">
          <n-input placeholder="生日" v-model:value="dataModel.birthday" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="籍贯" path="nativePlace"  v-if="dataPermits.nativePlace !== FormPermissionEnum.HIDE">
          <n-input placeholder="籍贯" v-model:value="dataModel.nativePlace" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="民族" path="nation" v-if="dataPermits.nation !== FormPermissionEnum.HIDE">
          <n-input placeholder="民族" v-model:value="dataModel.nation" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="婚姻状况" path="marriageStatus" v-if="dataPermits.marriageStatus !== FormPermissionEnum.HIDE">
          <n-input  placeholder="婚姻状况" v-model:value="dataModel.marriageStatus" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="手机号"  path="phoneNum" v-if="dataPermits.phoneNum !== FormPermissionEnum.HIDE">
          <n-input placeholder="手机号" v-model:value="dataModel.phoneNum" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="办公电话" path="officePhone" v-if="dataPermits.officePhone !== FormPermissionEnum.HIDE">
          <n-input  placeholder="办公电话" v-model:value="dataModel.officePhone" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="邮箱" path="email" v-if="dataPermits.email !== FormPermissionEnum.HIDE">
          <n-input placeholder="邮箱" v-model:value="dataModel.email" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="微信"  path="wechat"  v-if="dataPermits.wechat !== FormPermissionEnum.HIDE">
          <n-input placeholder="微信" v-model:value="dataModel.wechat" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="家庭住址" path="addr"  v-if="dataPermits.addr !== FormPermissionEnum.HIDE">
          <n-input  placeholder="家庭住址"  v-model:value="dataModel.addr" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="现居地址"  path="nowAddr"  v-if="dataPermits.nowAddr !== FormPermissionEnum.HIDE">
          <n-input placeholder="现居地址" v-model:value="dataModel.nowAddr" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="状态"  path="status" v-if="dataPermits.status !== FormPermissionEnum.HIDE">
          <n-tag  type="warning" v-if="(dataModel.status == 0)"> 停用 </n-tag>
          <n-tag type="error" v-else-if="(dataModel.status == 2)"> 启用 </n-tag>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="状态原因" path="statusReason"  v-if="dataPermits.statusReason !== FormPermissionEnum.HIDE">
          <n-input  placeholder="状态原因"  v-model:value="dataModel.statusReason" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="户口所在地" path="birthAddr"  v-if="dataPermits.birthAddr !== FormPermissionEnum.HIDE">
          <n-input   placeholder="户口所在地"   v-model:value="dataModel.birthAddr"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="出生地"  path="birthPlace"  v-if="dataPermits.birthPlace !== FormPermissionEnum.HIDE">
          <n-input  placeholder="出生地" v-model:value="dataModel.birthPlace"  disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="毕业院校" path="school"  v-if="dataPermits.school !== FormPermissionEnum.HIDE">
          <n-input  placeholder="毕业院校" v-model:value="dataModel.school" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="所在单位"  path="unitName"   v-if="dataPermits.unitName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="所在单位"  v-model:value="dataModel.unitName" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工序列"  path="suite"  v-if="dataPermits.suite !== FormPermissionEnum.HIDE">
          <n-input  placeholder="员工序列" v-model:value="dataModel.suite" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="用工形式" path="shape" v-if="dataPermits.shape !== FormPermissionEnum.HIDE">
          <n-input placeholder="用工形式"  v-model:value="dataModel.shape"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="岗位字典名称"  path="postRankName" v-if="dataPermits.postRankName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="岗位字典名称"   v-model:value="dataModel.postRankName"  disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="从事专业名称" path="outerDisciplineName" v-if="dataPermits.outerDisciplineName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="从事专业名称" v-model:value="dataModel.outerDisciplineName" disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="工作时间" path="jobDate"  v-if="dataPermits.jobDate !== FormPermissionEnum.HIDE" >
          <n-input placeholder="工作时间"  v-model:value="dataModel.jobDate"  disabled/>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="入职时间" path="inDate"  v-if="dataPermits.inDate !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="入职时间"  v-model:value="dataModel.inDate"  disabled   />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="是否管理员"  path="isAdmin"  v-if="dataPermits.isAdmin !== FormPermissionEnum.HIDE" >
          <n-tag>{{(dataModel.isAdmin == 0 ? '否' : '是')}}</n-tag>
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="备注"  path="remark"  v-if="dataPermits.remark !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="备注"   v-model:value="dataModel.remark"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="所属班名称"  path="banName"  v-if="dataPermits.banName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="所属班名称"  v-model:value="dataModel.banName"   disabled />
        </n-form-item-gi>
        <n-form-item-gi  :span="8"  label="最近一次参加大修单位名称" path="lastOverunitName" v-if="dataPermits.lastOverunitName !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="最近一次参加大修单位名称"  v-model:value="dataModel.lastOverunitName" disabled  />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="员工意外伤害险开始时间"  path="insuresTartTime"  v-if="dataPermits.insuresTartTime !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="员工意外伤害险开始时间"  v-model:value="dataModel.insuresTartTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工意外伤害险结束时间" path="insureEndTime" v-if="dataPermits.insureEndTime !== FormPermissionEnum.HIDE">
          <n-input  placeholder="员工意外伤害险结束时间"  v-model:value="dataModel.insureEndTime"   disabled  />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工体检开始时间" path="examStartTime"  v-if="dataPermits.examStartTime !== FormPermissionEnum.HIDE">
          <n-input  placeholder="员工体检开始时间"  v-model:value="dataModel.examStartTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工体检结束时间"  path="examEndTime"  v-if="dataPermits.examEndTime !== FormPermissionEnum.HIDE">
          <n-input  placeholder="员工体检结束时间"   v-model:value="dataModel.examEndTime"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="是否管理员"  path="isBlackList"  v-if="dataPermits.isBlackList !== FormPermissionEnum.HIDE">
          <n-tag v-if="(dataModel.isBlackList == 0)"> 否 </n-tag>
          <n-tag v-else-if="(dataModel.isBlackList == 1)"> 是 </n-tag>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="用户名" path="username" v-if="dataPermits.username !== FormPermissionEnum.HIDE">
          <n-input  placeholder="用户名"  v-model:value="dataModel.username"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="用户密码" path="password"  v-if="dataPermits.password !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="用户密码"  v-model:value="dataModel.password"  disabled/>
        </n-form-item-gi>
        <n-form-item-gi  :span="8"  label="最高学历字典名称"  path="educationName" v-if="dataPermits.educationName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="最高学历字典名称"  v-model:value="dataModel.educationName"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="所在单位部门名称"  path="partName" v-if="dataPermits.partName !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="所在单位部门名称" v-model:value="dataModel.partName" disabled  />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="数据来源" path="source" v-if="dataPermits.source !== FormPermissionEnum.HIDE">
          <n-tag v-if="(dataModel.source === 'self_build')"> 自建 </n-tag>
          <n-tag v-else-if="(dataModel.source === 'cnijx_portal')"> 人力管理系统 </n-tag>
          <n-tag v-else-if="(dataModel.source === 'cnijx_contract')"> 商法系统 </n-tag>
          <n-tag v-else-if="(dataModel.source === 'cnijx_ems')"> 工时系统 </n-tag>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="合同附件名称"  path="contractFileName" v-if="dataPermits.contractFileName !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="合同附件名称"  v-model:value="dataModel.contractFileName"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工意外伤害险附件名称"  path="insureFileName" v-if="dataPermits.insureFileName !== FormPermissionEnum.HIDE" >
          <n-input  placeholder="员工意外伤害险附件名称" v-model:value="dataModel.insureFileName"  disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8"  label="员工体检附件名称"  path="examFileName" v-if="dataPermits.examFileName !== FormPermissionEnum.HIDE">
          <n-input placeholder="员工体检附件名称"  v-model:value="dataModel.examFileName"  disabled  />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="身份证附件名称" path="idCardFileName" v-if="dataPermits.idCardFileName !== FormPermissionEnum.HIDE">
          <n-input  placeholder="身份证附件名称"  v-model:value="dataModel.idCardFileName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="关联的平台供应商用户信息"  path="linkUserId" v-if="dataPermits.linkUserId !== FormPermissionEnum.HIDE">
          <n-input  placeholder="关联的平台供应商用户信息"  v-model:value="dataModel.linkUserId"  disabled />
        </n-form-item-gi>
      </n-grid>
    </n-card>
  </n-form>
</n-scrollbar>
  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>