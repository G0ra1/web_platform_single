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
  NDatePicker,
  useMessage,
} from "naive-ui";
import { FormModal } from "./App";
import { ref, onMounted, defineComponent } from "vue";
import { NwFieldGrid, Page } from "@platform/main";
import DoubleList from "../../components/double-list/index.vue";
import { FormPermissionEnum, NwDic } from "@platform/main";
import AssetPurchaseStorageDetail from "./modelDetail";
import { getDict } from "./api";
import { MyAssetDto } from "./model";
import warehousePick from "../../components/warehousePick/index.vue";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";

const { formRef, dataModel, rules, columns, dataPermits, doubleListCols } =
  new FormModal();
const inventoryDetailShow = ref<boolean>(false);
const taxRateList = ref([]);
const choose = () => {
  if (!dataModel.value.assetSource) {
    message.error("请选择物资来源");
    return;
  }
  inventoryDetailShow.value = !inventoryDetailShow.value;
  dataModel.value.assetParams.id = dataModel.value.deployId;
};
const message = useMessage();

const callAsset = (data: Array<any>) => {
  dataModel.value.detailList = data.map((item) => {
    if (!item.useUserId) {
      item.createUserId = dataModel.value.applyUserId;
      item.createUserName = dataModel.value.applyUserName;
      item.createUserParentOrgId = dataModel.value.applyUserOrgId;
      item.createUserParentOrgName = dataModel.value.applyUserOrgName;
      item.createUserParentDeptId = dataModel.value.applyUserDeptId;
      item.createUserParentDeptName = dataModel.value.applyUserDeptName;
    }
    return new AssetPurchaseStorageDetail(item);
  });
};
const styleColumnOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 300,
};
onMounted(() => {
  /* wuziType().then((res) => {
        wuziTypeList.value = res;
      }); */
  /* getDict("ASSETS_TAX_RATE").then((res) => {
    console.log("税率", res);
    taxRateList.value = res;
    console.log("税率11", taxRateList.value);
  }); */
});
</script>
<template>
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
    <n-grid :cols="12" :x-gap="6">
      <n-form-item-gi :span="12" label="" path="">
        <h3 class="card-title">基本信息</h3>
      </n-form-item-gi>
      <n-form-item-gi
        :span="6"
        label="申请编号"
        path="code"
        v-if="dataPermits.code !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="申请编号"
          v-model:value="dataModel.code"
          :disabled="dataPermits.code === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>

      <n-form-item-gi
        :span="6"
        label="申请人名称"
        path="applyUserName"
        v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="申请人名称"
          v-model:value="dataModel.applyUserName"
          disabled
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="6"
        label="申请人机构名称"
        path="applyUserOrgName"
        v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="申请人机构名称"
          v-model:value="dataModel.applyUserOrgName"
          disabled
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="6"
        label="申请人部门名称"
        path="applyUserDeptName"
        v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="申请人部门名称"
          v-model:value="dataModel.applyUserDeptName"
          disabled
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="6"
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
        :span="6"
        label="物资来源"
        path="assetSource"
        v-if="dataPermits.assetSource !== FormPermissionEnum.HIDE"
      >
        <NwDic
          dictCode="asset_wzly"
          placeholder="请选择"
          v-model:value="dataModel.assetSource"
          v-model:label="dataModel.assetSourceName"
        ></NwDic>
      </n-form-item-gi>
      <!-- <n-form-item-gi
        :span="6"
        label="合计申请数量"
        path="sumTotalNumber"
        v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE"
      >
        <n-input-number
          placeholder="合计申请数量"
          v-model:value="dataModel.sumTotalNumber"
          :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi> -->
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
      <n-form-item-gi :span="12" label="" path="">
        <h3 class="card-title">调拨入库信息</h3>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="入库明细">
        <n-button type="primary" size="small" @click="choose"
          >选择物资</n-button
        >
      </n-form-item-gi>
      <n-form-item-gi :span="12">
        <NwFieldGrid
          v-bind="styleColumnOptions"
          v-model:value="dataModel.detailList"
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
              :value="dataModel.detailList.map((item) => item.assetsId)"
              :url="[
                '/asset/materialDelivery/getDetailList',
                '/asset/materialDelivery/getByIds',
              ]"
              :params="dataModel.assetParams"
              @callback="callAsset"
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
          <template #assetsCode="{ row }">
            <n-input v-model:value="row.assetsCode"></n-input>
          </template>
          <template #unitName="{ row }">
            <n-input v-model:value="row.unitName"></n-input>
          </template>
          <template #specs="{ row }">
            <n-input v-model:value="row.specs"></n-input>
          </template>
          <template #supplierName="{ row }">
            <n-input v-model:value="row.supplierName"></n-input>
          </template>
          <template #contractCode="{ row }">
            <n-input v-model:value="row.contractCode"></n-input>
          </template>
          <template #billCodes="{ row }">
            <n-input v-model:value="row.billCodes"></n-input>
          </template>
          <template #notStorageNumber="{ row }">
            <n-input v-model:value="row.notRegisterNum"></n-input>
          </template>
          <template #storageNumber="{ row }">
            <n-input-number
              :disabled="
                dataPermits.storageNumber === FormPermissionEnum.READONLY
              "
              button-placement="both"
              v-model:value="row.storageNumber"
              :bordered="false"
              :autofocus="true"
              placeholder="请输入入库数量"
              status="warning"
              size="tiny"
              min="1"
              v-model:max="row.notStorageNumber"
            ></n-input-number>
          </template>
          <template #storageAmount="{ row }">
            <n-input-number v-model:value="row.storageAmount"></n-input-number>
          </template>
          <template #storageTaxRate="{ row }">
            <nw-dic
              :selectOptions="{ 'consistent-menu-width': false }"
              dictCode="ASSETS_TAX_RATE"
              v-model:value="row.storageTaxRate"
              v-model:label="row.storageTaxRate"
              size="small"
              placeholder="请选择税率"
            />
          </template>
          <template #warehouseName="{ row }">
            <warehousePick
              v-model:value="row.warehouseName"
              v-model:id="row.warehouseId"
            ></warehousePick>
          </template>
          <template #shelfName="{ row }">
            <warehouseShelfPick
              v-model:value="row.shelfName"
              :warehouseId="row.warehouseId"
              :warehouseName="row.warehouseName"
              v-model:id="row.shelfId"
            />
          </template>
          <template #storageTime="{ row }">
            <n-date-picker
              v-model:formatted-value="row.storageTime"
              v-model:value="row.storageTime"
              type="date"
              clearable
              value-format="yyyy-MM-dd "
              placeholder="请选择日期"
            />
          </template>
          <template #classifyTypeName="{ row }">
            <nw-dic
              :selectOptions="{ 'consistent-menu-width': false }"
              dictCode="asset_classify_type"
              v-model:value="row.classifyTypeCode"
              v-model:label="row.classifyTypeName"
              size="small"
              placeholder="请选择资产类型"
            />
          </template>
          <template #itemType="{ row }">
            <nw-dic
              :selectOptions="{ 'consistent-menu-width': false }"
              dictCode="asset_type"
              v-model:value="row.itemType"
              v-model:label="row.itemTypeName"
              size="small"
              placeholder="请选择"
            />
          </template>
        </NwFieldGrid>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>
