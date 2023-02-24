<script lang="ts" setup>
import DoubleList from "../../components/double-list/index.vue";
import { FormPermissionEnum } from "@platform/main";
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NGrid,
  NInputNumber,
  NFormItemGi,
  NButton,
  NScrollbar,
} from "naive-ui";
import { FormModal } from "./App";
import { ref } from "vue";
import { NwFieldGrid, Page } from "@platform/main";
import { MyAssetDetail } from "./model";
const inventoryDetailShow = ref<boolean>(false);
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  doubleListCols,
  columns,
  totalNum,
} = new FormModal();
const choose = () => {
  inventoryDetailShow.value = !inventoryDetailShow.value;
  dataModel.value.assetDetailParams.id = dataModel.value.dealApplyId;
};
const callAssetDetails = (data: Array<any>) => {
  dataModel.value.assetDealRegisterDetailList = data.map(
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
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      :rules="rules"
      size="small"
      label-placement="left"
      label-width="auto"
      label-align="left"
      require-mark-placement="right-hanging"
      style="padding: 20px 30px"
    >
      <n-grid :cols="12" :x-gap="6">
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
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
        <n-form-item-gi :span="6" label="申请人" path="createUserName">
          <n-input
            v-model:value="dataModel.createUserName"
            class="selectedInput"
            v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
          label="申请人机构"
          path="createUserParentOrgName"
          v-if="dataPermits.createUserParentOrgName !== FormPermissionEnum.HIDE"
        >
          <n-input v-model:value="dataModel.createUserParentOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
          label="申请人部门"
          path="createUserParentDeptName"
          v-if="
            dataPermits.createUserParentDeptName !== FormPermissionEnum.HIDE
          "
        >
          <n-input
            v-model:value="dataModel.createUserParentDeptName"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
          label="申请时间"
          path="applyTime"
          v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE"
        >
          <n-input v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
          label="登记数量"
          path="registerNumber"
          v-if="dataPermits.registerNumber !== FormPermissionEnum.HIDE"
        >
          <!-- <n-input-number
          placeholder="登记数量"
          v-model:value="dataModel.registerNumber"
          :disabled="dataPermits.registerNumber === FormPermissionEnum.READONLY"
        /> -->
          {{ totalNum }}
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="说明"
          path="explanation"
          v-if="dataPermits.explanation !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="说明"
            type="textarea"
            v-model:value="dataModel.explanation"
            :disabled="dataPermits.explanation === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <!-- <n-form-item label="计划年度" path="planYear" v-if="dataPermits.planYear !== FormPermissionEnum.HIDE">
            <n-input placeholder="计划年度" v-model:value="dataModel.planYear"
                :disabled="dataPermits.planYear === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件ids" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="附件names" path="fileNames" v-if="dataPermits.fileNames !== FormPermissionEnum.HIDE">
            <n-input placeholder="附件names" v-model:value="dataModel.fileNames"
                :disabled="dataPermits.fileNames === FormPermissionEnum.READONLY" />
        </n-form-item>
        <n-form-item label="申请日期" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
            <n-input placeholder="申请日期" v-model:value="dataModel.applyTime"
                :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
        </n-form-item> -->
        <!-- 展示选择物资的表格信息 -->
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">物资计划信息</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="">
          <n-button type="primary" size="small" @click="choose"
            >选择物资</n-button
          >
        </n-form-item-gi>
        <n-form-item-gi :span="12">
          <NwFieldGrid
            v-bind="styleByDetail"
            v-model:value="dataModel.assetDealRegisterDetailList"
            style="width: 100%"
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
                  dataModel.assetDealRegisterDetailList.map(
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

            <template #itemType="{ row }">
              <n-input v-model:value="row.itemType"></n-input>
            </template>
            <template #unitName="{ row }">
              <n-input v-model:value="row.unitName"></n-input>
            </template>
            <template #specs="{ row }">
              <n-input v-model:value="row.specs"></n-input>
            </template>
            <template #warehouseName="{ row }">
              <n-input v-model:value="row.warehouseName"></n-input>
            </template>
            <template #notRegisterNum="{ row }">
              <n-input v-model:value="row.notRegisterNum"></n-input>
            </template>
            <template #registerNum="{ row }">
              <n-input-number
                :disabled="
                  dataPermits.registerNum === FormPermissionEnum.READONLY
                "
                button-placement="both"
                v-model:value="row.registerNum"
                :bordered="false"
                :autofocus="true"
                placeholder="请输入登记数量"
                status="warning"
                size="tiny"
                min="1"
                v-model:max="row.notRegisterNum"
              ></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
      <!-- 
       <n-divider dashed> 调试信息 </n-divider>
      <pre>{{
      JSON.stringify(dataModel, null, 2) +
      "===+===================" +
      Page.getMenuData().id
    }}</pre> -->
    </n-form>
  </n-scrollbar>
</template>