<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NSelect,
  SelectOption,
  NInputGroup,
  NButton,
} from "naive-ui";
import { NwEmployeePick, NwDic } from "@platform/main";
import { FormModal } from "./App";
import { ref } from "vue";
import { houseType } from "../../lib/constant/Constant";
import {
  FormPermissionEnum,
  NwFieldGrid,
  NwFunctionPredefine,
  NwPickAny,
} from "@platform/main";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  columns,
  gridRefs,
  gridRules,
  gridDataPermits,
} = new FormModal();

//子表滚动样式
const styleByDetail = {
  border: false,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 400,
  size: "large",
};
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
    style="padding: 0px 30px"
  >
    <n-grid :cols="24" :x-gap="12">
      <n-form-item-gi :span="24" label="" path="">
        <h4 class="card-title">基本信息</h4>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="类型"
        path="houseType"
        v-if="dataPermits.houseType !== FormPermissionEnum.HIDE"
      >
        <NwDic
          dictCode="asset_warehouse"
          placeholder="请选择"
          v-model:value="dataModel.houseType"
          v-model:label="houseType[dataModel.houseType]"
        ></NwDic>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="仓库名称"
        path="warehouseName"
        v-if="dataPermits.warehouseName !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="仓库名称"
          v-model:value="dataModel.warehouseName"
          :disabled="dataPermits.warehouseName === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="责任主体"
        path="orgName"
        v-if="dataPermits.orgName !== FormPermissionEnum.HIDE"
        style="color: #1d7ced; cursor: pointer"
      >
        {{ dataModel.orgName }}
      </n-form-item-gi>

      <n-form-item-gi
        :span="12"
        label="责任部门"
        path="deptName"
        v-if="dataPermits.deptName !== FormPermissionEnum.HIDE"
        style="color: #1d7ced; cursor: pointer"
      >
        {{ dataModel.deptName }}
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="责任人"
        path="respondUserName"
        v-if="dataPermits.respondUserName !== FormPermissionEnum.HIDE"
      >
        <n-input-group>
          <n-input
            placeholder="责任人"
            v-model:value="dataModel.respondUserName"
            :disabled="true"
          />
          <NwPickAny
            :buttonOptions="{ type: 'small' }"
            button-label="选择人员"
            modal-title="选择人员"
            @update:value="
              (d) => {
                dataModel.respondUserName = d.userNameCh;
              }
            "
            :gridColumns="[
              { field: 'userNameCh', title: '人员名称' },
              { field: 'dutyName', title: '岗位名称' },
              { field: 'parentDeptName', title: '所属部门' },
            ]"
            requestUrl="/mdm/mdmUser/page"
            :requestParam="{
              isCheckOwn: false,
              parentDeptId: dataModel.deptId,
            }"
            isSingle
            :width="800"
            :height="200"
          >
            <template #search="{ searchData }">
              <n-input
                v-model:value="searchData.userNameCh"
                placeholder="人员名称"
                size="medium"
              />
            </template>
          </NwPickAny>
        </n-input-group>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="仓库地点"
        path="address"
        v-if="dataPermits.address !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="仓库地点"
          v-model:value="dataModel.address"
          :disabled="dataPermits.address === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>

      <n-form-item-gi
        :span="24"
        label="备注"
        path="remark"
        v-if="dataPermits.remark !== FormPermissionEnum.HIDE"
      >
        <n-input
          type="textarea"
          placeholder="备注"
          v-model:value="dataModel.remark"
          :disabled="dataPermits.remark === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="24" label="" path="">
        <h4>仓库货架</h4>
      </n-form-item-gi> -->
      <n-form-item-gi
        label="仓库货架"
        :span="24"
        path="shelfList"
        v-if="dataModel.houseType == 1"
      >
        <NwFieldGrid
          v-bind="styleByDetail"
          :is-readonly="dataPermits['shelfList'] === 'readonly'"
          :ref="(d: any) => gridRefs['shelfList'] = d"
          v-model:value="dataModel.shelfList"
          style="width: 100%"
          :rules="gridRules['shelfList']"
          :data-permits="gridDataPermits['shelfList']"
          :columns="columns"
          size="small"
          :default-value="{
            warehouseName: dataModel.warehouseName,
          }"
        >
          <template #shelfName="{ row }">
            <n-input v-model:value="row.shelfName"></n-input>
          </template>
          <template #warehouseName="{ row }">
            <n-input v-model:value="row.warehouseName"></n-input>
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