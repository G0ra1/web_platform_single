<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NFormItemGi,
  NGrid,
  NLayout,
  NLayoutContent,
  NScrollbar,
  NLayoutHeader,
} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum } from "@platform/main";
import { houseType } from "../../lib/constant/Constant";
const { formRef, dataModel, rules, dataPermits, columns } = new FormModal();
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
    <n-grid :x-gap="6" :cols="24">
      <n-form-item-gi :span="24" label="" path="">
        <h5>基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="仓库名称" path="warehouseName">
        {{ dataModel.warehouseName }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="仓库类型" path="houseType">
        {{ houseType[dataModel.houseType] }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="所属机构" path="orgName">
        {{ dataModel.orgName }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="责任部门" path="deptName">
        {{ dataModel.deptName }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="责任人" path="respondUserName">
        {{ dataModel.respondUserName }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="仓库地点" path="address">
        {{ dataModel.address }}
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="备注" path="remark">
        {{ dataModel.remark }}
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="">
        <h5>货架信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24">
        <n-layout class="nw-layout-full">
          <n-layout-content style="padding: 0 0">
            <vxe-grid
              border
              round
              show-overflow
              :data="dataModel.shelfList"
              :columns="(columns as any)"
              size="mini"
              highlight-hover-row
            >
            </vxe-grid>
          </n-layout-content>
        </n-layout>
      </n-form-item-gi>
    </n-grid>
  </n-form>

  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>