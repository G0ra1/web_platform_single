<script lang="ts" setup>
import {
  NForm,
  NInput,
  NInputNumber,
  NDivider,
  NFormItemGi,
  NSwitch,
  NSelect,
  NGrid,
  NDatePicker,
  NUpload,
  useDialog,
  useMessage,
  NButton,
  NScrollbar,
  UploadFileInfo,
} from "naive-ui";
import { FormModal } from "./App";
import DoubleList from "../../components/double-list/index.vue";
import { ref, watch, nextTick } from "vue";
import { OrgTree, OrgVo } from "@platform/mdm";
import { NwFieldGrid } from "@platform/main";
import SelAssetListTest from "../testcc/index.vue";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
import AssetMaterialDeliveryDetail from "./modelDetail";
const {
  columns,
  details,
  doubeList,
  formRef,
  dataModel,
  rules,
  dataPermits,
  assetDetailList,
  assetDetailUpdate,
} = new FormModal();
const MaterialDeliveryColumnOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 300,
};
const detailListShow = ref<boolean>(false);
const sourceData = ref<Array<AssetMaterialDeliveryDetail>>([]);
const datailData = ref<Array<AssetMaterialDeliveryDetail>>([]);

const message = useMessage();
const choose = () => {
  dataModel.value.assetParams.id = dataModel.value.deployId;
  detailListShow.value = !detailListShow.value;
};
const inventoryDetailShow = ref<boolean>(false);
/* const callAsset = (data: Array<AssetMaterialDeliveryDetail>) => {
  dataModel.value.detailList = data.map((item) => {
    item.deployId = item.id;
    return new AssetMaterialDeliveryDetail(item);
  });
}; */
const callAsset = (data: Array<any>) => {
  data.map((item) => {
    if (item.detailList.length > 0) {
      item.createUserId = dataModel.value.applyUserId;
      item.createUserName = dataModel.value.applyUserName;
      item.createUserParentOrgId = dataModel.value.applyUserOrgId;
      item.createUserParentOrgName = dataModel.value.applyUserOrgName;
      item.createUserParentDeptId = dataModel.value.applyUserDeptId;
      item.createUserParentDeptName = dataModel.value.applyUserDeptName;
      item.assetsId = item.id;
      delete item.id;
      sourceData.value.push(item);
    }
  });
  dataModel.value.detailList = sourceData.value;
  //dataModel.value.assetdetailList = datailData.value;
};
</script>
<template>
  <n-scrollbar style="max-height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      :rules="rules"
      size="small"
      label-placement="left"
      label-width="auto"
      label-align="left"
      require-mark-placement="right-hanging"
      :style="{ padding: '28px 84px', width: '1200px', margin: '0 auto' }"
    >
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">基本信息</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
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
          :span="12"
          label="申请人"
          path="applyUserName"
          v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请人"
            v-model:value="dataModel.applyUserName"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="申请人机构"
          path="applyUserOrgName"
          v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="申请人机构"
            v-model:value="dataModel.applyUserOrgName"
            disabled
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
            disabled
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
          :span="24"
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
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">出库明细</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="详情信息">
          <n-button type="primary" size="small" @click="choose"
            >点击选择</n-button
          >
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <NwFieldGrid
            v-model:value="dataModel.detailList"
            style="width: 100%"
            v-bind="MaterialDeliveryColumnOptions"
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
              <SelAssetListTest
                v-model:show="detailListShow"
                :columns="doubeList"
                :url="['/asset/materialDeploy/getList']"
                :title="'选择明细信息'"
                :params="dataModel.assetParams"
                @callback="callAsset"
              />
            </template>
            <template #itemCode="{ row }">
              <!-- <n-input v-model:value="row.itemCode" :readonly="true"></n-input> -->
              {{ row.itemCode }}
            </template>
            <template #itemName="{ row }">
              {{ row.itemName }}
            </template>
            <template #desclong="{ row }">
              <n-input v-model:value="row.desclong"></n-input>
            </template>
            <template #assetOrgName="{ row }">
              <n-input v-model:value="row.assetOrgName"></n-input>
            </template>
            <template #assetDeptName="{ row }">
              <n-input v-model:value="row.assetDeptName"></n-input>
            </template>
            <template #materialQuality="{ row }">
              <n-input v-model:value="row.materialQuality"></n-input>
            </template>
            <template #unitName="{ row }">
              <n-input v-model:value="row.unitName"></n-input>
            </template>
            <template #usableNumber="{ row }">
              <n-input v-model:value="row.usableNumber"></n-input>
            </template>
            <template #deployNumber="{ row }">
              <n-input v-model:value="row.deployNumber"></n-input>
            </template>
            <template #deliveryNumber="{ row }">
              <n-input-number
                :min="0"
                v-model:max="row.deployNumber"
                v-model:value="row.deliveryNumber"
              ></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <NwFieldGrid
            :value="assetDetailList"
            @update:value="assetDetailUpdate"
            style="width: 100%"
            v-bind="MaterialDeliveryColumnOptions"
            :edit-enabled="true"
            :columns="details"
            :edit-config="{
              trigger: 'click',
              mode: 'row',
              autoClear: false,
              showIcon: true,
            }"
          >
            <template #buttons> </template>
            <template #itemCode="{ row }">
              <!-- <n-input v-model:value="row.itemCode" :readonly="true"></n-input> -->
              {{ row.itemCode }}
            </template>
            <template #itemName="{ row }">
              {{ row.itemName }}
            </template>
            <template #desclong="{ row }">
              <n-input v-model:value="row.desclong"></n-input>
            </template>
            <template #assetOrgName="{ row }">
              <n-input v-model:value="row.assetOrgName"></n-input>
            </template>
            <template #assetDeptName="{ row }">
              <n-input v-model:value="row.assetDeptName"></n-input>
            </template>
            <template #materialQuality="{ row }">
              <n-input v-model:value="row.materialQuality"></n-input>
            </template>
            <template #unitName="{ row }">
              <n-input v-model:value="row.unitName"></n-input>
            </template>
            <template #usableNumber="{ row }">
              <n-input v-model:value="row.usableNumber"></n-input>
            </template>
            <template #deployNumber="{ row }">
              <n-input v-model:value="row.deployNumber"></n-input>
            </template>
            <template #deliveryNumber="{ row }">
              <n-input-number
                :min="0"
                v-model:max="row.deployNumber"
                v-model:value="row.deliveryNumber"
              ></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
      <!--  <n-divider dashed>调试信息</n-divider>
      <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-form>
  </n-scrollbar>
</template>
