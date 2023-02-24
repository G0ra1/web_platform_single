<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NFormItemGi,
  NGrid,
  NButton,
  NScrollbar,
  NInputNumber,
} from "naive-ui";
import DoubleList from "../../components/double-list/index.vue";
import { ref, nextTick } from "vue";
import { FormModal } from "./App";
import { Table as TTable } from "tdesign-vue-next";
import { NwFieldGrid, Page } from "@platform/main";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
import { parseJSON } from "date-fns";
import { MyAssetDetail } from "./model";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  columns,
  doubleListCols,
  totalNum,
} = new FormModal();
const inventoryDetailShow = ref<boolean>(false);
const choose = () => {
  inventoryDetailShow.value = !inventoryDetailShow.value;
  dataModel.value.assetDetailParams.id = dataModel.value.dealApplyId;
};

const callAssetDetails = (data: Array<any>) => {
  dataModel.value.assetDealAppraisalDetailList = data.map(
    (item) => new MyAssetDetail(item)
  );
};

//子表滚动样式
const styleByDetail = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 400,
};
nextTick(() => {});
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
      label-align="left"
      require-mark-placement="right-hanging"
      style="padding: 20px 30px"
    >
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="24" label="" path="">
          <h5 class="card-title">基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="编号"
          path="code"
          v-if="dataPermits.code !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="编号"
            v-model:value="dataModel.code"
            :disabled="dataPermits.code === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请时间"
          path="applyTime"
          v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请时间"
            v-model:value="dataModel.applyTime"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请人"
          path="createUserName"
          v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE"
        >
          <n-input v-model:value="dataModel.createUserName" disabled />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请人机构"
          path="createUserParentOrgName"
          v-if="dataPermits.createUserParentOrgName !== FormPermissionEnum.HIDE"
        >
          <n-input v-model:value="dataModel.createUserParentOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请人部门"
          path="createUserParentDeptName"
          v-if="dataPermits.sumAppraisalTotal !== FormPermissionEnum.HIDE"
        >
          <n-input
            v-model:value="dataModel.createUserParentDeptName"
            disabled
          />
        </n-form-item-gi>

        <n-form-item-gi
          :span="12"
          label="鉴定数量"
          path="sumAppraisalTotal"
          v-if="dataPermits.sumAppraisalTotal !== FormPermissionEnum.HIDE"
        >
          {{ totalNum }}
        </n-form-item-gi>
        <n-form-item-gi
          :span="24"
          label="说明"
          path="explanation"
          v-if="dataPermits.explanation !== FormPermissionEnum.HIDE"
        >
          <n-input
            type="textarea"
            placeholder="请输入说明"
            v-model:value="dataModel.explanation"
            :disabled="dataPermits.explanation === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="" path="">
          <h5 class="card-title">物资信息</h5>
        </n-form-item-gi>

        <!-- 展示选择物资的表格信息 -->
        <n-form-item-gi label="">
          <n-button type="primary" size="small" @click="choose"
            >选择处置明细账</n-button
          >
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <n-scrollbar style="max-height: 100%">
            <NwFieldGrid
              v-bind="styleByDetail"
              v-model:value="dataModel.assetDealAppraisalDetailList"
              style="width: 100%"
              :rules="rules"
              :edit-enabled="true"
              :columns="columns"
              :edit-config="{
                trigger: 'click',
                mode: 'row',
                autoClear: false,
                showIcon: true,
              }"
            >
              <template #buttons>
                <DoubleList
                  v-model:show="inventoryDetailShow"
                  :columns="doubleListCols"
                  :value="
                    dataModel.assetDealAppraisalDetailList.map(
                      (item) => item.assetsDetailId
                    )
                  "
                  :url="[
                    '/asset/assetDealDetail/lists',
                    '/asset/assetDealDetail/getByIds',
                  ]"
                  :params="dataModel.assetDetailParams"
                  @callback="callAssetDetails"
                />
              </template>
              <template #itemCode="{ row }">
                <n-input v-model:value="row.itemCode"></n-input>
              </template>
              <template #itemName="{ row }">
                <n-input v-model:value="row.itemName"></n-input>
              </template>
              <template #desclong="{ row }">
                <n-input v-model:value="row.desclong"></n-input>
              </template>

              <template #specs="{ row }">
                <n-input v-model:value="row.specs"></n-input>
              </template>
              <template #warehouseName="{ row }">
                <n-input v-model:value="row.warehouseName"></n-input>
              </template>
              <template #dealNum="{ row }">
                <n-input v-model:value="row.dealNum"></n-input>
              </template>
              <template #totalAppraisalNum="{ row }">
                <n-input v-model:value="row.totalAppraisalNum"></n-input>
              </template>
              <template #notAppraisalNum="{ row }">
                <n-input v-model:value="row.notAppraisalNum"></n-input>
              </template>

              <template #appraisalResult="{ row }">
                <n-input v-model:value="row.appraisalResult"></n-input>
              </template>
              <template #appraisalAmount="{ row }">
                <n-input v-model:value="row.appraisalAmount"></n-input>
              </template>

              <template
                #appraisalNum="{ row }"
                v-if="dataPermits.appraisalNum !== FormPermissionEnum.REQUIRED"
              >
                <n-input-number
                  button-placement="both"
                  v-model:value="row.appraisalNum"
                  :bordered="false"
                  :autofocus="true"
                  placeholder="请输入鉴定数量"
                  status="warning"
                  size="tiny"
                  min="0"
                  v-model:max="row.notAppraisalNum"
                  :disabled="
                    dataPermits.appraisalNum === FormPermissionEnum.REQUIRED
                  "
                ></n-input-number>
              </template>
            </NwFieldGrid>
          </n-scrollbar>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-scrollbar>
</template>
