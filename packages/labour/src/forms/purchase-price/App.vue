<template>
  <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
    require-mark-placement="right-hanging" style="padding:20px 30px">
    <n-card title="基本信息" :hoverable="true" :embedded="true">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="合同名称:">
          <n-gradient-text type="info">{{ dataModel.contractname }}</n-gradient-text>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="合同编号:">
          <n-gradient-text type="info">{{ dataModel.contractcode }}</n-gradient-text>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="合同金额:">
          <n-gradient-text type="info">{{ dataModel.contractamount }}</n-gradient-text>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="甲方:" style="display:none" >
          <n-gradient-text type="info">{{ dataModel.partaname }}</n-gradient-text>
        </n-form-item-gi>
        
      </n-grid>
    </n-card>
    <n-card title="单价信息" :hoverable="true" :embedded="true" style="margin-top: 20px;">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" path="priceList">
          <NwFieldGrid style="width: 100%;" v-bind="PurchasePriceColumnOptions"
            :ref="(d: any) => gridRefs['priceList'] = d" v-model:value="dataModel.priceList"
            :rules="gridRules['priceList']" :data-permits="gridDataPermits['priceList']" :columns="PurchasePriceColumn">
            <template #outerDisciplineName_edit="{ row }">
              <nw-dic 
                  :selectOptions="{'consistent-menu-width': false }" 
                  dictCode="post"
                  v-model:value="row.outerDisciplineId"
                  v-model:label="row.outerDisciplineName"
                  size='small'
                  placeholder="请选择类型"
                  />
            </template>
            <template #restMode_edit="{ row }">
              <n-select placeholder="请选择" v-model:value="row.restMode" :options="RestModeOptions" />
            </template>
            <template #restMode_view="{ row }">
              {{ RestModeArry[row.restMode] }}
            </template>
            <template #unit_edit="{ row }">
              <n-select placeholder="请选择" v-model:value="row.unit" :options="UnitOptions" />
            </template>
            <template #unit_view="{ row }">
              {{ UnitArry[row.unit] }}
            </template>
            <template #price_edit="{ row }">
              <n-input-number placeholder="请输入" :min="1" v-model:value="row.price"></n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
      </n-grid>
    </n-card>
  </n-form>
  <!-- <n-divider dashed>
      调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>

<script lang="ts" setup>
import { NForm, NInput, NCard, NGrid, NFormItemGi, NSelect, NInputNumber, NDivider, NGradientText } from "naive-ui";
import { getDict } from './api/api'
import { nextTick } from 'vue'
import { NwFieldGrid, NwDic } from '@platform/main'
import { FormModal } from "./App";
import { PurchasePriceColumn, RestModeOptions, RestModeArry, UnitOptions, UnitArry, PurchasePriceColumnOptions } from './constant'

const { formRef, dataModel, rules, gridRefs, gridRules, gridDataPermits } = new FormModal();

nextTick().then(() => {

})

</script>