<script lang="ts" setup>
import DoubleList from "../../components/double-list/index.vue";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
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
import { FormModal } from "./App";
import { NwFieldGrid, Page } from "@platform/main";
import { Table as TTable } from "tdesign-vue-next";
import { computed, ref, watch } from "vue";
import { MyAssetDetail } from "./model";
import { cloneDeep } from "lodash";
const inventoryDetailShow = ref<boolean>(false);
const {
  formRef,
  dataModel,
  rules,
  doubleListCols,
  columns,
  dataPermits,
  totalNum,
} = new FormModal();
//子表滚动样式
const styleByDetail = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 400,
};
const callAssetDetails = (data: Array<any>) => {
  const map = new Map<string, MyAssetDetail>();
  const myList = cloneDeep(dataModel.value.assetDealDetailList);
  myList.map((item) => {
    map.set(item.assetsDetailId, item);
  });
  data.map((item) => {
    if (!map.has(item.id)) {
      myList.push(new MyAssetDetail(item));
    }
  });
  dataModel.value.assetDealDetailList = myList;
};
const choose = () => {
  dataModel.value.assetDetailParams.assetOrgId =
    dataModel.value.createUserParentOrgId;
  inventoryDetailShow.value = !inventoryDetailShow.value;
};
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
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">基本信息</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="编号"
          path="code"
          v-if="dataPermits.code !== FormPermissionEnum.HIDE"
        >
          <n-input
            v-model:value="dataModel.code"
            :disabled="dataPermits.code === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请人" path="createUserName">
          <n-input
            v-model:value="dataModel.createUserName"
            class="selectedInput"
            v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE"
            disabled
          />
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
          :span="12"
          label="申请时间"
          path="applyTime"
          v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE"
        >
          <n-input v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="合计申请数量"
          path="sumTotalNumber"
          v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE"
        >
          <!-- <n-input v-model:value="totalNum" /> -->
          {{ totalNum }}
          <!-- {{ dataModel.sumTotalNumber }} -->
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
          <h3 class="card-title">物资计划信息</h3>
        </n-form-item-gi>

        <!-- 展示选择物资的表格信息 -->
        <n-form-item-gi :span="24" label="">
          <n-button type="primary" size="small" @click="choose"
            >选择库存明细账</n-button
          >
        </n-form-item-gi>
        <n-form-item-gi
          :span="24"
          v-if="dataPermits.assetDealDetailList !== FormPermissionEnum.HIDE"
        >
          <NwFieldGrid
            v-bind="styleByDetail"
            v-model:value="dataModel.assetDealDetailList"
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
                  dataModel.assetDealDetailList.map(
                    (item) => item.assetsDetailId
                  )
                "
                :url="[
                  '/asset/assetAssetsDetail/list',
                  '/asset/assetAssetsDetail/getByIds',
                ]"
                :params="dataModel.assetDetailParams"
                @callback="callAssetDetails"
              />
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
            <template #usableNumber="{ row }">
              <n-input v-model:value="row.usableNumber"></n-input>
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

            <template #dealNum="{ row }">
              <n-input-number
                :disabled="dataPermits.dealNum === FormPermissionEnum.REQUIRED"
                button-placement="both"
                v-model:value="row.dealNum"
                :bordered="false"
                :autofocus="true"
                placeholder="请输入处置数量"
                status="warning"
                size="tiny"
                min="0"
                v-model:max="row.usableNumber"
              ></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
      <!-- <n-divider dashed>调试信息 @update-value="handleChange"</n-divider>
    <pre>{{
      JSON.stringify(
        dataModel.assetDealDetailList.map(
          (item) =>
            `id：${item.id} assetsDetailId：${item.assetsDetailId} itemName：${item.itemName} usableNumber：${item.dealNum}`
        ),
        null,
        2
      )
    }}</pre> -->
    </n-form>
  </n-scrollbar>
</template>
