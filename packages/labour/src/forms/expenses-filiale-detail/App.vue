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
      <n-card title="基本信息" :hoverable="true" :embedded="true">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi
            :span="8"
            label="需求计划"
            path="planName"
            v-if="dataPermits.planName !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="需求计划"
              v-model:value="dataModel.planName"
              disabled
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="需求类别"
            path="planType"
            v-if="dataPermits.planType !== FormPermissionEnum.HIDE"
          >
          <n-input  placeholder="需求类别" v-if="(dataModel.planType == '1')"  value="大修"  disabled/>
          <n-input  placeholder="需求类别" v-else-if="(dataModel.planType == '2')"  value="日常"  disabled/>
          <n-input  placeholder="需求类别" v-else-if="(dataModel.planType == '3')"  value="专项"  disabled/>
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="需求单位"
            path="planOrgName"
            v-if="dataPermits.planOrgName !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="需求单位"
              v-model:value="dataModel.planOrgName"
              disabled
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="大修计划"
            path="overhaulName"
            v-if="
              dataPermits.overhaulName !== FormPermissionEnum.HIDE &&
              dataPermits.overhaulName === null
            "
          >
            <n-input
              placeholder="大修计划"
              v-model:value="dataModel.overhaulName"
              disabled
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="承包合同"
            path="contractWorkName"
            v-if="dataPermits.contractWorkName !== FormPermissionEnum.HIDE"
          >
            <n-select
              placeholder="请选择承包合同"
              :value="dataModel.contractWorkName"
              @update:value="contractWork"
              :options="contractWorkOptions"
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="虚拟订单"
            path="virtualPurchaseName"
            v-if="dataPermits.virtualPurchaseName !== FormPermissionEnum.HIDE"
          >
            <n-select
              placeholder="请选择虚拟订单"
              v-model:value="dataModel.virtualPurchaseName"
              :options="virtualPurchaseOptions"
              @update:value="virtualPurchase"
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="填报时间"
            path="fillDateTime"
            v-if="dataPermits.fillDateTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              v-model:formatted-value="dataModel.fillDateTime"
              type="date"
              clearable
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="
                dataPermits.fillDateTime === FormPermissionEnum.READONLY
              "
              placeholder="请选择日期"
            />
          </n-form-item-gi>
          <n-form-item-gi
            :span="8"
            label="总金额"
            path="totalAmount"
            v-if="dataPermits.totalAmount !== FormPermissionEnum.HIDE"
          >
            {{ calculatedAmount }}
          </n-form-item-gi>
          <n-form-item-gi :span="24" path="labourExpensesFilialeWpnList">
            <n-tabs type="line" animated>
              <n-tab-pane
                name="labourExpensesFilialeWpnList"
                tab="水电网费费用"
                display-directive="show"
              >
                <NwFieldGrid
                  :ref="(d) => (gridRefs['labourExpensesFilialeWpnList'] = d)"
                  v-model:value="dataModel.labourExpensesFilialeWpnList"
                  style="width: 100%"
                  v-bind="ApproachPersonOptions"
                  :rules="gridRules['labourExpensesFilialeWpnList']"
                  :data-permits="
                    gridDataPermits['labourExpensesFilialeWpnList']
                  "
                  :edit-enabled="true"
                  :columns="ExpensesFilialeWpnColumn"
                >
                  <template #buttons>
                    <NwPickAny
                      rowKey="id"
                      button-label="选择"
                      :buttonOptions="{
                        disabled: !dataModel.virtualPurchaseId,
                        type: 'primary',
                      }"
                      modal-title="劳务人员"
                      :gridColumns="LabourPersonChooseColumn"
                      :width="1000"
                      :height="600"
                      :value="
                        (dataModel.labourExpensesFilialeWpnList || []).map(
                          (d) => ({
                            id: d.suppUserId,
                            suppUserName: d.suppUserName,
                            idCard: d.idCard,
                            banId: d.banId,
                            banName: d.banName,
                            suppOrgId: d.suppOrgId,
                            suppOrgCode: d.suppOrgCode,
                            suppOrgName: d.suppOrgName,
                            startDateTime: d.startDateTime,
                            endDateTime: d.endDateTime,
                            stayLength: d.stayLength,
                            electricityCost: d.electricityCost,
                            waterCost: d.waterCost,
                            netCost: d.netCost,
                            total: d.total,
                            remark: d.remark,
                            attachmentids: d.attachmentids,
                            attachment: d.attachment,
                          })
                        )
                      "
                      @update:value="
                        (d) => {
                          addFilialeWpnUser(d);
                        }
                      "
                      requestUrl="/labour/labourVirtualPurchaseUser/page"
                      :requestParam="{
                        virtualPurchaseId: dataModel.virtualPurchaseId,
                      }"
                    >
                    <template #search = "{ searchData }">
                            <n-input v-model:value="searchData.suppOrgName" placeholder="供应商名称" size="medium" />
                            <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                        </template>
                  </NwPickAny>
                  </template>
                  <!-- 开始时间 -->
                  <template #startDateTime_view="{ row }">
                    {{ row.startDateTime }}
                  </template>
                  <template #startDateTime_edit="{ row }">
                    <n-date-picker
                      type="date"
                      valueFormat="yyyy-MM-dd"
                      v-model:formattedValue="row.startDateTime"
                    />
                  </template>
                  <!-- 结束时间 -->
                  <template #endDateTime_view="{ row }">
                    {{ row.endDateTime }}
                  </template>
                  <template #endDateTime_edit="{ row }">
                    <n-date-picker
                      type="date"
                      valueFormat="yyyy-MM-dd"
                      v-model:formattedValue="row.endDateTime"
                    />
                  </template>
                  <!-- 住宿天数 -->
                  <template #stayLength_view="{ row }">
                    {{ row.stayLength }}
                  </template>
                  <template #stayLength_edit="{ row }">
                    <n-input-number
                      placeholder="输入天数"
                      v-model:value="row.stayLength"
                    />
                  </template>
                  <!-- 电费 -->
                  <template #electricityCost_view="{ row }">
                    {{ row.electricityCost }}
                  </template>
                  <template #electricityCost_edit="{ row }">
                    <n-input-number
                      placeholder=""
                      :precision="2"
                      v-model:value="row.electricityCost"
                    />
                  </template>
                  <!-- 水费 -->
                  <template #waterCost_view="{ row }">
                    {{ row.waterCost }}
                  </template>
                  <template #waterCost_edit="{ row }">
                    <n-input-number
                      placeholder=""
                      :precision="2"
                      v-model:value="row.waterCost"
                    />
                  </template>
                  <!-- 网费 -->
                  <template #netCost_view="{ row }">
                    {{ row.netCost }}
                  </template>
                  <template #netCost_edit="{ row }">
                    <n-input-number
                      placeholder=""
                      :precision="2"
                      v-model:value="row.netCost"
                    />
                  </template>
                  <!-- 备注 -->
                  <template #remark_view="{ row }">
                    {{ row.remark }}
                  </template>
                  <template #remark_edit="{ row }">
                    <n-input placeholder="" v-model:value="row.remark" />
                  </template>
                  <!-- 附件信息文件上传 -->
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(",", " ") }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload
                      :attachment="row.attachment"
                      :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)"
                    />
                  </template>
                </NwFieldGrid>
                <!-- :ref="d => gridRefs.push(d)" -->
              </n-tab-pane>
              <n-tab-pane
                display-directive="show"
                name="labourExpensesFilialeAssessList"
                tab="考核激励费用"
              >
                <!-- :ref="d => gridRefs.push(d)" -->
                <NwFieldGrid
                  :edit-enabled="true"
                  :ref="
                    (d) => (gridRefs['labourExpensesFilialeAssessList'] = d)
                  "
                  v-model:value="dataModel.labourExpensesFilialeAssessList"
                  style="width: 100%"
                  v-bind="ApproachPersonOptions"
                  :rules="gridRules['labourExpensesFilialeAssessList']"
                  :data-permits="
                    gridDataPermits['labourExpensesFilialeAssessList']
                  "
                  :default-value="{ isHour: 1 }"
                  :columns="ExpensesFilialeAssessColumn"
                >
                  <template #buttons>
                    <NwPickAny
                      rowKey="id"
                      button-label="选择"
                      :buttonOptions="{
                        disabled: !dataModel.virtualPurchaseId,
                        type: 'primary',
                      }"
                      modal-title="劳务人员"
                      :gridColumns="LabourPersonChooseColumn"
                      :width="1000"
                      :height="600"
                      :value="
                        (dataModel.labourExpensesFilialeAssessList || []).map(
                          (d) => ({
                            id: d.suppUserId,
                            suppUserName: d.suppUserName,
                            idCard: d.idCard,
                            banId: d.banId,
                            banName: d.banName,
                            suppOrgId: d.suppOrgId,
                            suppOrgCode: d.suppOrgCode,
                            suppOrgName: d.suppOrgName,
                            entranceValidity: d.entranceValidity,
                            checkupValidity: d.checkupValidity,
                            total: d.total,
                            remark: d.remark,
                            attachmentids: d.attachmentids,
                            attachment: d.attachment,
                          })
                        )
                      "
                      @update:value="
                        (d) => {
                          addAssessUser(d);
                        }
                      "
                      requestUrl="/labour/labourVirtualPurchaseUser/page"
                      :requestParam="{
                        virtualPurchaseId: dataModel.virtualPurchaseId,
                      }"
                    >
                    <template #search = "{ searchData }">
                            <n-input v-model:value="searchData.suppOrgName" placeholder="供应商名称" size="medium" />
                            <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                        </template>
                    </NwPickAny
                  ></template>
                  <!-- 入场有效性 -->
                  <template #entranceValidity_view="{ row }">
                    <n-tag type="success" v-if="(row.entranceValidity == 1)">已选中</n-tag>
                    <n-tag type="success" v-else-if="(row.entranceValidity == 0)">未选中</n-tag>
                  </template>
                  <template #entranceValidity_edit="{ row }">
                    <n-checkbox
                      :checked="row.entranceValidity==1"
                      @update:checked="
                        (d) => {
                          d
                            ? (row.entranceValidity = 1)
                            : (row.entranceValidity = 0);
                        }
                      "
                    >
                    </n-checkbox>
                  </template>
                  <!-- 体检有效性 -->
                  <template #checkupValidity_view="{ row }">
                    <n-tag type="success" v-if="(row.checkupValidity == 1)">已选中</n-tag>
                    <n-tag type="success" v-else-if="(row.checkupValidity == 0)">未选中</n-tag>
                  </template>
                  <template #checkupValidity_edit="{ row }">
                    <n-checkbox
                      :checked="row.checkupValidity==1"
                      @update:checked="
                        (d) => {
                          d
                            ? (row.checkupValidity = 1)
                            : (row.checkupValidity = 0);
                        }
                      "
                    >
                    </n-checkbox>
                  </template>
                  <!-- 备注 -->
                  <template #remark_view="{ row }">
                    {{ row.remark }}
                  </template>
                  <template #remark_edit="{ row }">
                    <n-input placeholder="" v-model:value="row.remark" />
                  </template>
                  <!-- 附件信息文件上传 -->
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(",", " ") }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload
                      :attachment="row.attachment"
                      :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)"
                    />
                  </template>
                </NwFieldGrid>
                <!-- </n-form-item-gi> -->
              </n-tab-pane>
              <n-tab-pane
                name="labourExpensesFilialeFestivalList"
                tab="过节费"
                display-directive="show"
              >
                <NwFieldGrid
                  :ref="
                    (d) => (gridRefs['labourExpensesFilialeFestivalList'] = d)
                  "
                  v-model:value="dataModel.labourExpensesFilialeFestivalList"
                  style="width: 100%"
                  v-bind="ApproachPersonOptions"
                  :rules="gridRules['labourExpensesFilialeFestivalList']"
                  :data-permits="
                    gridDataPermits['labourExpensesFilialeFestivalList']
                  "
                  :default-value="{ isHour: 1 }"
                  :columns="ExpensesFilialeFestival"
                >
                  <template #buttons>
                    <NwPickAny
                      rowKey="id"
                      button-label="选择"
                      :buttonOptions="{
                        disabled: !dataModel.virtualPurchaseId,
                        type: 'primary',
                      }"
                      modal-title="劳务人员"
                      :gridColumns="LabourPersonChooseColumn"
                      :width="1000"
                      :height="600"
                      :value="
                        (dataModel.labourExpensesFilialeFestivalList || []).map(
                          (d) => ({
                            id: d.suppUserId,
                            suppUserName: d.suppUserName,
                            banId: d.banId,
                            idCard: d.idCard,
                            banName: d.banName,
                            suppOrgId: d.suppOrgId,
                            suppOrgCode: d.suppOrgCode,
                            suppOrgName: d.suppOrgName,
                            festivalCost: d.festivalCost,
                            total: d.total,
                            remark: d.remark,
                            attachmentids: d.attachmentids,
                            attachment: d.attachment,
                          })
                        )
                      "
                      @update:value="
                        (d) => {
                          addFestivalUser(d);
                        }
                      "
                      requestUrl="/labour/labourVirtualPurchaseUser/page"
                      :requestParam="{
                        virtualPurchaseId: dataModel.virtualPurchaseId,
                      }"
                    >
                    <template #search = "{ searchData }">
                            <n-input v-model:value="searchData.suppOrgName" placeholder="供应商名称" size="medium" />
                            <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                        </template>
                    </NwPickAny
                  ></template>
                  <!--  过节费金额 -->
                  <template #festivalCost_view="{ row }">
                    {{ row.festivalCost || 1000.0 }}
                  </template>
                  <template #festivalCost_edit="{ row }">
                    <n-input-number
                      :precision="2"
                      :default-value="1000.0"
                      v-model:value="row.festivalCost"
                    />
                  </template>
                  <!-- 备注 -->
                  <template #remark_view="{ row }">
                    {{ row.remark }}
                  </template>
                  <template #remark_edit="{ row }">
                    <n-input placeholder="" v-model:value="row.remark" />
                  </template>
                  <!-- 附件信息文件上传 -->
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(",", " ") }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload
                      :attachment="row.attachment"
                      :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)"
                    />
                  </template>
                </NwFieldGrid>
              </n-tab-pane>
              <n-tab-pane
                name="labourExpensesFilialeRewardPunishList"
                tab="奖惩-其他扣款"
                display-directive="show"
              >
                <NwFieldGrid
                  :edit-enabled="true"
                  :ref="
                    (d) =>
                      (gridRefs['labourExpensesFilialeRewardPunishList'] = d)
                  "
                  v-model:value="
                    dataModel.labourExpensesFilialeRewardPunishList
                  "
                  style="width: 100%"
                  v-bind="ApproachPersonOptions"
                  :rules="gridRules['labourExpensesFilialeRewardPunishList']"
                  :data-permits="
                    gridDataPermits['labourExpensesFilialeRewardPunishList']
                  "
                  :default-value="{ isHour: 1 }"
                  :columns="ExpensesFilialeRewardPunish"
                >
                  <template #buttons>
                    <NwPickAny
                      rowKey="id"
                      button-label="选择"
                      :buttonOptions="{
                        disabled: !dataModel.virtualPurchaseId,
                        type: 'primary',
                      }"
                      modal-title="劳务人员"
                      :gridColumns="LabourPersonChooseColumn"
                      :width="1000"
                      :height="600"
                      :value="
                        (
                          dataModel.labourExpensesFilialeRewardPunishList || []
                        ).map((d) => ({
                          id: d.suppUserId,
                          suppUserName: d.suppUserName,
                          idCard: d.idCard,
                          banId: d.banId,
                          banName: d.banName,
                          suppOrgId: d.suppOrgId,
                          suppOrgCode: d.suppOrgCode,
                          suppOrgName: d.suppOrgName,
                          rewardCost: d.rewardCost,
                          punishmentCost: d.punishmentCost,
                          otherDeductionsCost: d.otherDeductionsCost,
                          total: d.total,
                          remark: d.remark,
                          attachmentids: d.attachmentids,
                          attachment: d.attachment,
                        }))
                      "
                      @update:value="
                        (d) => {
                          addRewardPunishUser(d);
                        }
                      "
                      requestUrl="/labour/labourVirtualPurchaseUser/page"
                      :requestParam="{
                        virtualPurchaseId: dataModel.virtualPurchaseId,
                      }"
                    >
                    <template #search = "{ searchData }">
                            <n-input v-model:value="searchData.suppOrgName" placeholder="供应商名称" size="medium" />
                            <n-input v-model:value="searchData.suppUserName" placeholder="人员名称" size="medium" />
                        </template>
                  </NwPickAny>
                  </template>
                  <!-- 奖励费用 -->
                  <template #rewardCost_view="{ row }">
                    {{ row.rewardCost || 0 }}
                  </template>
                  <template #rewardCost_edit="{ row }">
                    <n-input-number
                      :precision="2"
                      :default-value="0"
                      v-model:value="row.rewardCost"
                    />
                  </template>
                  <!-- 惩罚费用 -->
                  <template #punishmentCost_view="{ row }">
                    {{ row.punishmentCost || 0 }}
                  </template>
                  <template #punishmentCost_edit="{ row }">
                    <n-input-number
                      :precision="2"
                      :default-value="0"
                      v-model:value="row.punishmentCost"
                    />
                  </template>
                  <!-- 其他扣款 -->
                  <template #otherDeductionsCost_view="{ row }">
                    {{ row.otherDeductionsCost || 0 }}
                  </template>
                  <template #otherDeductionsCost_edit="{ row }">
                    <n-input-number
                      :precision="2"
                      :default-value="0"
                      v-model:value="row.otherDeductionsCost"
                    />
                  </template>
                  <!-- 备注 -->
                  <template #remark_view="{ row }">
                    {{ row.remark }}
                  </template>
                  <template #remark_edit="{ row }">
                    <n-input placeholder="" v-model:value="row.remark" />
                  </template>
                  <!-- 附件信息文件上传 -->
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(",", " ") }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload
                      :attachment="row.attachment"
                      :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)"
                    />
                  </template>
                </NwFieldGrid>
              </n-tab-pane>
            </n-tabs>
          </n-form-item-gi>
        </n-grid>
      </n-card>
      <!-- <n-divider dashed> 调试信息 </n-divider>
      <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-form>
  </n-scrollbar>
</template>
<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NCard,
  NSwitch,
  NText,
  NInputNumber,
  NScrollbar,
  NSelect,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NUpload,
  useDialog,
  useMessage,
  NButton,
  NTabs,
  NTabPane,
  NGradientText,
  NTag,
  NCheckbox,
} from "naive-ui";
import { FormModal } from "./App";
import { nextTick, watch, computed } from "vue";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
import { NwPickAny, NwFieldGrid, NwDic } from "@platform/main";
import subUpload from "./components/sub-upload.vue";
import {
  ExpensesFilialeWpnColumn,
  ExpensesFilialeAssessColumn,
  ExpensesFilialeFestival,
  ExpensesFilialeRewardPunish,
  LabourPersonChooseColumn,
  ApproachPersonOptions,
} from "./constant";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  gridRefs,
  gridRules,
  gridDataPermits,
  planTypeOptions,
  contractWorkOptions,
  virtualPurchaseOptions,
  admissionOptions,
  calculatedAmount,
  addFilialeWpnUser,
  addAssessUser,
  addFestivalUser,
  addRewardPunishUser,
  contractWork,
  virtualPurchase,
  uploadSuccess,
} = new FormModal();

nextTick().then(() => {});

let attachmentCon = (attachment: string): number => {
  let num: number = 0;
  if (attachment) {
    let _num = attachment.match(/,/g)?.length || 0;
    //如果是多个需要加1因为数据存储是这样子 "1,2"，需要返回两个文件
    num = _num >= 1 ? _num + 1 : 1;
  }
  return num;
};
</script>