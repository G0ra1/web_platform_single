<script lang="ts" setup>
import { defineComponent } from "vue";
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
import { FormPermissionEnum, NwFieldGrid } from "@platform/main";
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
  height: 200,
  size: "large",
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
      <n-grid :x-gap="6" :cols="24">
        <n-form-item-gi :span="24" label="" path="">
          <h5>基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="分类名称"
          path="classifyName"
          v-if="dataPermits.classifyName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="分类名称"
            v-model:value="dataModel.classifyName"
            :disabled="dataPermits.classifyName === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="分类编码"
          path="classifyCode"
          v-if="dataPermits.classifyCode !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="分类编码"
            v-model:value="dataModel.classifyCode"
            :disabled="dataPermits.classifyCode === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="物资名称"
          path="itemName"
          v-if="dataPermits.itemName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="物资名称"
            v-model:value="dataModel.itemName"
            :disabled="dataPermits.itemName === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="物资编码"
          path="itemCode"
          v-if="dataPermits.itemCode !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="物资编码"
            v-model:value="dataModel.itemCode"
            :disabled="dataPermits.itemCode === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>

        <n-form-item-gi
          :span="12"
          label="长描述"
          path="desclong"
          v-if="dataPermits.desclong !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="长描述"
            v-model:value="dataModel.desclong"
            :disabled="dataPermits.desclong === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="短描述"
          path="descshort"
          v-if="dataPermits.descshort !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="短描述"
            v-model:value="dataModel.descshort"
            :disabled="dataPermits.descshort === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="基本计量单位编码"
          path="unitCode"
          v-if="dataPermits.unitCode !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="基本计量单位编码"
            v-model:value="dataModel.unitCode"
            :disabled="dataPermits.unitCode === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="基本计量单位名称"
          path="unitName"
          v-if="dataPermits.unitName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="基本计量单位名称"
            v-model:value="dataModel.unitName"
            :disabled="dataPermits.unitName === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="状态"
          path="state"
          v-if="dataPermits.state !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="状态"
            v-model:value="dataModel.state"
            :disabled="dataPermits.state === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="规格"
          path="specs"
          v-if="dataPermits.specs !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="规格"
            v-model:value="dataModel.specs"
            :disabled="dataPermits.specs === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="标准"
          path="standard"
          v-if="dataPermits.standard !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="标准"
            v-model:value="dataModel.standard"
            :disabled="dataPermits.standard === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="材质"
          path="materialQuality"
          v-if="dataPermits.materialQuality !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="材质"
            v-model:value="dataModel.materialQuality"
            :disabled="
              dataPermits.materialQuality === FormPermissionEnum.READONLY
            "
          />
        </n-form-item-gi>

        <!-- <n-form-item-gi
        :span="12"
        label="是否验证完毕"
        path="isCheck"
        v-if="dataPermits.isCheck !== FormPermissionEnum.HIDE"
      >
        <n-input-number
          placeholder="是否验证完毕"
          v-model:value="dataModel.isCheck"
          :disabled="dataPermits.isCheck === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi> -->
        <n-form-item-gi
          :span="12"
          label="验证说明"
          path="checkExplanation"
          v-if="dataPermits.checkExplanation !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="验证说明"
            v-model:value="dataModel.checkExplanation"
            :disabled="
              dataPermits.checkExplanation === FormPermissionEnum.READONLY
            "
          />
        </n-form-item-gi>
        <!-- <n-form-item-gi
        :span="12"
        label="验证修改时间"
        path="isAssetNumber"
        v-if="dataPermits.isAssetNumber !== FormPermissionEnum.HIDE"
      >
        <n-input
          placeholder="验证修改时间"
          v-model:value="dataModel.isAssetNumber"
          :disabled="dataPermits.isAssetNumber === FormPermissionEnum.READONLY"
        />
      </n-form-item-gi>

      <n-form-item-gi
        :span="12"
        label="是否多计量"
        path="isUnit"
        v-if="dataPermits.isUnit !== FormPermissionEnum.HIDE"
      >
        <n-input-number
          placeholder="是否多计量"
          v-model:value="dataModel.isUnit"
          :disabled="dataPermits.isUnit === FormPermissionEnum.READONLY"
        /> 
      </n-form-item-gi>-->
        <n-form-item-gi :span="24" label="" path="">
          <h5>SKU属性</h5>
        </n-form-item-gi>
        <n-form-item-gi label="SKU属性" :span="24" path="skuList">
          <NwFieldGrid
            :is-readonly="dataPermits['skuList'] === 'readonly'"
            :ref="(d: any) => gridRefs['skuList'] = d"
            v-model:value="dataModel.skuList"
            style="width: 100%"
            :data-permits="gridDataPermits['skuList']"
            :columns="columns"
            size="small"
          >
            <template #skuName="{ row }">
              <n-input v-model:value="row.skuName"></n-input>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>