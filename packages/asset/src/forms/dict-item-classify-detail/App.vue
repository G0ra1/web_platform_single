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
import { NwFieldGrid } from "@platform/main";
const { formRef, dataModel, columns } = new FormModal();
</script>

<template>
  <n-form
    ref="formRef"
    :model="dataModel"
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
      <n-form-item-gi :span="12" label="分类名称:" path="classifyName">
        {{ dataModel.classifyName }}
        <!-- <n-input
          v-model:value="dataModel.classifyName"
          v-if="dataPermits.createUserName !== FormPermissionEnum.HIDE"
          disabled
        /> -->
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="分类编码:" path="classifyCode">
        {{ dataModel.classifyCode }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="物资名称:" path="itemName">
        {{ dataModel.itemName }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="物资编码:" path="itemCode">
        {{ dataModel.itemCode }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="物资规格:" path="specs">
        {{ dataModel.specs }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="材质:" path="materialQuality">
        {{ dataModel.materialQuality }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="标准:" path="standard">
        {{ dataModel.standard }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="计量单位:" path="unitName">
        {{ dataModel.unitName }}
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="长描述:" path="desclong">
        {{ dataModel.desclong }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="短描述:" path="descshort">
        {{ dataModel.descshort }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="是否多计量:" path="isUnit">
        {{ dataModel.isUnit }}
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="状态:" path="state">
        {{ dataModel.state }}
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="">
        <h5>SKU属性</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24">
        <n-layout class="nw-layout-full">
          <n-layout-content style="padding: 0 0">
            <vxe-grid
              border
              round
              show-overflow
              :data="dataModel.skuList"
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