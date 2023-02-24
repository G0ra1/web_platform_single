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
import { ref } from "vue";
import { NwFieldGrid } from "@platform/main";
import { OrgTree, OrgVo } from "@platform/mdm";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
import AssetMaterialDeployDetail from "./modelDetail";
import fileUploadButton from "../../components/fileUploadButton/index.vue";
const inventoryShow = ref<boolean>(false);
const choose = () => {
  dataModel.value.assetParams.assetOrgId = dataModel.value.deployUnitId;
  if (!dataModel.value.deployUnitId) {
    message.error("请选择调出单位");
    return;
  }
  inventoryShow.value = !inventoryShow.value;
};
const chooseOrg = () => {
  orgShow.value = !orgShow.value;
};
const orgShow = ref<boolean>(false);
const message = useMessage();
const { dataModel, doubeList, columns, formRef, rules, dataPermits } =
  new FormModal();
const orgTreeRef = ref<typeof OrgTree>();
/* watch(
  () => dataModel.value.detailList,
  (newData) => {
    console.log(newData);
    dataModel.value.detailList = newData.map((d: any) => {
      d.x = d.a;
      return d;
    });
  }
); */
const handleChoose = (node: OrgVo) => {
  dataModel.value.deployUnitId = node.id;
  dataModel.value.deployUnit = node.orgName;
};
const MaterialDeployColumnOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 300,
};

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
    return new AssetMaterialDeployDetail(item);
  });
  /*  dataModel.value.detailList = data.map(
    (item) => new AssetMaterialDeployDetail(item)
  ); */
};
</script>
<template>
  <n-scrollbar style="max-height: 100%">
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="small" label-placement="left" label-width="auto"
      label-align="left" require-mark-placement="right-hanging"
      :style="{ padding: '28px 84px', width: '1200px', margin: '0 auto' }">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">基本信息</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="编号" path="code">
          <n-input placeholder="编号" v-model:value="dataModel.code" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请时间" path="applyTime"
          v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
          <n-input placeholder="申请时间" v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请人名称" path="applyUserName"
          v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
          <n-input placeholder="申请人名称" v-model:value="dataModel.applyUserName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请人机构名称" path="applyUserOrgName"
          v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE">
          <n-input placeholder="申请人机构名称" v-model:value="dataModel.applyUserOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请人部门名称" path="applyUserDeptName"
          v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE">
          <n-input placeholder="申请人部门名称" v-model:value="dataModel.applyUserDeptName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="调出单位" path="deployUnit"
          v-if="dataPermits.deployUnit !== FormPermissionEnum.HIDE">
          <n-input placeholder="调出单位" v-model:value="dataModel.deployUnit" @click="chooseOrg">选择组织</n-input>
          <OrgTree v-model:show="orgShow" :org-type="1" :level="2" :expand-level="1" ref="orgTreeRef"
            @choose="handleChoose" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="调出单位资产管理人" path="deployUser"
          v-if="dataPermits.deployUser !== FormPermissionEnum.HIDE">
          <n-input placeholder="调出单位资产管理人" v-model:value="dataModel.deployUser"
            :disabled="dataPermits.deployUser === FormPermissionEnum.READONLY" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="说明" path="explanation"
          v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
          <n-input placeholder="说明" v-model:value="dataModel.explanation" type="textarea"
            :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="fileIds" v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
          <template #label>
            <span style="text-align: center;">采购合同附件</span>
            <!-- <span style="color: red;display: block;font-size: 12px;">
              请上传审核手签调拨单
            </span> -->
          </template>
          <fileUploadButton v-model:fileName="dataModel.fileNames" v-model:fileId="dataModel.fileIds">
            <n-button class="uploadbtn" v-if="!dataModel.fileNames" size="small" type="primary">
              <span>请上传审核手签调拨单</span>
              <!-- <span style="color: red;display: block;font-size: 12px;">
              请上传审核手签调拨单
            </span> -->
            </n-button>
          </fileUploadButton>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">调拨明细</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="详情信息">
          <n-button type="primary" size="small" @click="choose">点击选择</n-button>
        </n-form-item-gi>

        <n-form-item-gi :span="24">
          <NwFieldGrid v-model:value="dataModel.detailList" style="width: 100%" v-bind="MaterialDeployColumnOptions"
            :edit-enabled="true" :columns="columns" :edit-config="{
              trigger: 'click',
              mode: 'row',
              autoClear: false,
              showIcon: true,
            }">
            <template #buttons>
              <DoubleList v-model:show="inventoryShow" :columns="doubeList"
                :value="dataModel.detailList.map((item) => item.assetsId)" :url="[
                  '/asset/assetAssets/list',
                  '/asset/assetAssets/getByIds',
                ]" :params="dataModel.assetParams" @callback="callAsset" />
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
              <n-input-number :min="0" v-model:max="row.usableNumber" v-model:value="row.deployNumber"></n-input-number>
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
