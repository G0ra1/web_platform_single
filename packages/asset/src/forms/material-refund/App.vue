<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NGrid,
  NFormItemGi,
  NButton,
  NScrollbar,
} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main";
import { ref } from "vue";
import { NwFieldGrid } from "@platform/main";
import SelAssetList from "../../components/double-list/index.vue";
import AssetMaterialRefundDetail from "./detailModel";
import AssetMaterialRefund from "./model";
import { cloneDeep } from "lodash";
const { formRef, dataModel, rules, dataPermits, columns, assetList } =
  new FormModal();

const detailListShow = ref<boolean>(false);
const choose = () => {
  dataModel.value.assetParams.assetOrgId = dataModel.value.applyUserOrgId;
  detailListShow.value = !detailListShow.value;
};
const callAsset = (data: Array<any>) => {
  console.log("data ==== {}", data);
  //选择新物资不覆盖原来的
  const map = new Map<string, AssetMaterialRefundDetail>();
  const myList = cloneDeep(dataModel.value.detailList);
  myList.map((item) => {
    map.set(item.assetsDetailId, item);
  });
  data.map((item) => {
    if (!map.has(item.id)) {
      myList.push(new AssetMaterialRefundDetail(item));
    }
  });
  dataModel.value.detailList = myList;
  //   dataModel.value.detailList = data.map((item) => {
  //     delete item.id;
  //     delete item.createUserId;
  //     delete item.createUserName;
  //     delete item.createUserParentOrgId;
  //     delete item.createUserParentOrgName;
  //     delete item.createUserParentDeptId;
  //     delete item.createUserParentDeptName;
  //     return new AssetMaterialRefundDetail(item);
  //   });
  console.log("detailList ==== {}", dataModel.value.detailList);
};
//子表滚动样式
const styleByDetail = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 300,
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
          label="申请人"
          path="applyUserName"
          v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请人"
            v-model:value="dataModel.applyUserName"
            :disabled="
              dataPermits.applyUserName === FormPermissionEnum.READONLY
            "
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请机构"
          path="applyUserOrgName"
          v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请机构"
            v-model:value="dataModel.applyUserOrgName"
            :disabled="
              dataPermits.applyUserOrgName === FormPermissionEnum.READONLY
            "
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请人部门"
          path="applyUserDeptName"
          v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请人部门"
            v-model:value="dataModel.applyUserDeptName"
            :disabled="
              dataPermits.applyUserDeptName === FormPermissionEnum.READONLY
            "
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
            :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="" path="">
          <h5 class="card-title">物资退还明细</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="">
          <n-button type="primary" size="small" @click="choose"
            >选择退还物资</n-button
          >
        </n-form-item-gi>

        <n-form-item-gi label="" :span="24">
          <NwFieldGrid
            v-model:value="dataModel.detailList"
            v-bind="styleByDetail"
            style="width: 100%"
            :edit-enabled="true"
            :columns="columns"
            :edit-config="{
              trigger: 'click',
              mode: 'row',
              autoClear: false,
              showIcon: false,
            }"
          >
            <template #buttons>
              <SelAssetList
                v-model:show="detailListShow"
                :columns="assetList"
                :value="dataModel.detailList.map((item) => item.assetsDetailId)"
                :params="dataModel.assetParams"
                @callback="callAsset"
                :url="[
                  '/asset/materialBorrow/getRefundDetailByBorrowId',
                  '/asset/purchaseStorageDetail/getByIds',
                ]"
              />
            </template>
            <template #itemCode="{ row }">
              {{ row.itemCode }}
            </template>
            <template #itemName="{ row }">
              {{ row.itemName }}
            </template>
            <template #desclong="{ row }">
              {{ row.desclong }}
            </template>
            <template #unitCode="{ row }">
              {{ row.unitCode }}
            </template>
            <template #unitName="{ row }">
              {{ row.unitName }}
            </template>
            <template #materialQuality="{ row }">
              {{ row.materialQuality }}
            </template>
            <template #standard="{ row }">
              {{ row.standard }}
            </template>
            <template #specs="{ row }">
              {{ row.specs }}
            </template>
            <template #notRefundNumber="{ row }">
              {{ row.notRefundNumber }}
            </template>
            <template #refundNumber="{ row }">
              <n-input-number
                :min="0"
                v-model:max="row.notRefundNumber"
                v-model:value="row.refundNumber"
              ></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-scrollbar>
  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>