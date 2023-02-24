<template>
  <NScrollbar>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" style="padding:20px 30px">
      <n-card title="基本信息" :hoverable="true" :embedded="true" v-show="false">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="6" label="需求名称:">
            <n-gradient-text type="info">{{ dataModel.planName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="需求类别:">
            <n-gradient-text type="info">{{ planTypeArray[dataModel.planType] }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="需求单位:">
            <n-gradient-text type="info">{{ dataModel.planOrgName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="大修轮次:">
            <n-gradient-text type="info">{{ dataModel.overhaulCode }}</n-gradient-text>
          </n-form-item-gi>
        </n-grid>
      </n-card>
      <n-card title="劳务人员信息" :hoverable="true" :embedded="true" style="margin-top: 20px;">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" path="departurehPersonList">
            <NwFieldGrid style="width: 100%;" v-bind="DeparturehPersonOptions"
              :ref="(d: any) => gridRefs['departurehPersonList'] = d" v-model:value="dataModel.departurehPersonList"
              :rules="gridRules['departurehPersonList']" :data-permits="gridDataPermits['departurehPersonList']"
              :edit-enabled="true" :columns="DeparturehPersonColumn">
              <template #buttons>
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
  </NScrollbar>
</template>

<script lang="ts" setup>
import { NForm, NInput, NCard, NGrid, NFormItemGi, NSelect, NInputNumber, NDivider, NGradientText, NScrollbar } from "naive-ui";
import { nextTick } from 'vue'
import { NwFieldGrid, NwDic, NwPickAny } from '@platform/main'
import { FormModal } from "./App";
import { DeparturehPersonColumn, DeparturehPersonOptions, DeparturehPersonChooseColumn } from './constant'
import { planTypeArray } from "../../lib/constant/Constant";

const { formRef, dataModel, rules, gridRefs, gridRules, gridDataPermits } = new FormModal();


</script>