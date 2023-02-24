<template>
  <NScrollbar>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" style="padding:20px 30px">
      <n-card title="基本信息" :hoverable="true" :embedded="true">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="需求计划:" >
            <n-gradient-text type="info" disabled>{{ dataModel.planName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求类别:" >
            <n-gradient-text type="info" disabled>{{ planTypeArray[dataModel.planType] }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求单位:" >
            <n-gradient-text type="info" disabled>{{ dataModel.planOrgName }}</n-gradient-text>
          </n-form-item-gi>
        </n-grid>
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="大修计划:" >
            <n-gradient-text type="info" disabled>{{ dataModel.overhaulName }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="虚拟订单:" >
            <n-gradient-text type="info" disabled >{{ dataModel.virtualPurchaseCode }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="填报时间:" path="fillDateTime"
            v-if="dataPermits.fillDateTime !== FormPermissionEnum.HIDE" >
            <NDatePicker placeholder="填报时间" :="dataPermits.fillDateTime === FormPermissionEnum.READONLY" 
              type="date" format='yyyy-MM-dd' :formattedValue="dataModel.fillDateTime" 
              @update:formatted-value="(val) => dataModel.fillDateTime = val" disabled />
          </n-form-item-gi>
        </n-grid>
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="16" label="承包合同:" path="contractWorkName"
            v-if="dataPermits.contractWorkName !== FormPermissionEnum.HIDE" >
            <n-select placeholder="承包合同" filterable :render-option="contractWorkRender"
              :="dataPermits.contractWorkName === FormPermissionEnum.READONLY"
              v-model:value="dataModel.contractWorkName" label-field="workContractName" value-field="workContractName"
              :options="contractWorkArray" @update-value="upContractWorkMeth" disabled />
          </n-form-item-gi>
        </n-grid>
      </n-card>
      <n-card title="费用信息" :hoverable="true" :embedded="true" style="margin-top: 20px;">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24">
            <n-tabs type="line" animated>
              <n-tab-pane name="travelList" tab="差旅费" display-directive="show">
                <NwFieldGrid v-bind="SubColumnOptions" :columns="TravelColumn" 
                  :tooltip-config="{ showAll: true, enterable: true }" :ref="(d) => gridRefs['travelList'] = d"
                  v-model:value="dataModel.travelList" :rules="gridRules['travelList']" :edit-enabled="true"
                  :data-permits="gridDataPermits['travelList']">
                  <template #buttons>
                   
                  </template>
                  <template #vehicle_view="{ row }">
                    <n-tag v-if="(row.vehicle === '飞机')"> 飞机 </n-tag>
                    <n-tag  v-else-if="(row.vehicle === '火车')"> 火车 </n-tag>
                    <n-tag  v-else-if="(row.vehicle === '高铁')"> 高铁 </n-tag>
                    <n-tag  v-else-if="(row.vehicle === '轮船')"> 轮船 </n-tag>
                    <n-tag  v-else-if="(row.vehicle === '大巴')"> 大巴 </n-tag>
                    <n-tag  v-else-if="(row.vehicle === '其他')"> 其他 </n-tag>
                  </template>
                  <template #vehicle_edit="{ row }">
                    <n-select 
                    :consistent-menu-width="false"
                     placeholder="Select"  v-model:value="row.vehicle"  :options="[{ label: '飞机', value: '飞机' }, { label: '火车', value: '火车' }, { label: '高铁', value:'高铁' }, { label: '轮船', value: '轮船' }, { label: '大巴', value: '大巴' }, { label: '其他', value: '其他' }]"  @select="(d) => {}"/>
                  </template>
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(',', ' ') }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload :attachment="row.attachment" :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)" />
                  </template>
                </NwFieldGrid>
              </n-tab-pane>
              <n-tab-pane name="nucleicacidList" tab="核酸检测费" display-directive="show">
                <NwFieldGrid v-bind="SubColumnOptions" :columns="NucleicacidColumn" 
                  :tooltip-config="{ showAll: true, enterable: true }"
                  :ref="(d) => gridRefs['nucleicacidList'] = d" v-model:value="dataModel.nucleicacidList"
                  :rules="gridRules['nucleicacidList']" :edit-enabled="true"
                  :data-permits="gridDataPermits['nucleicacidList']">
                  <template #buttons>
                  
                  </template>
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(',', ' ') }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload :attachment="row.attachment" :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)" />
                  </template>
                </NwFieldGrid>
              </n-tab-pane>
              <n-tab-pane name="examinationList" tab="体检费" display-directive="show" >
                <NwFieldGrid v-bind="SubColumnOptions" :columns="ExaminationColumn"
                  :tooltip-config="{ showAll: true, enterable: true }"
                  :ref="(useDialog) => gridRefs['examinationList'] = useDialog" v-model:value="dataModel.examinationList"
                  :rules="gridRules['examinationList']" :edit-enabled="true"
                  :data-permits="gridDataPermits['examinationList']">
                  <template #buttons>
                    
                  </template>
                  <template #attachment_view="{ row }">
                    <n-badge :value="attachmentCon(row.attachment)" />
                    {{ row.attachment?.replaceAll(',', ' ') }}
                  </template>
                  <template #attachment_edit="{ row }">
                    <sub-upload :attachment="row.attachment" :attachmentids="row.attachmentids"
                      @callback="(data) => uploadSuccess(data, row)" />
                  </template>
                </NwFieldGrid>
              </n-tab-pane>
            </n-tabs>
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
import { NForm, NCard, NGrid, NFormItemGi, NSelect, NDivider, NGradientText, NScrollbar, NTabs, NTabPane, NDatePicker, NUpload, NButton, NBadge } from "naive-ui";
import { nextTick, watch, computed } from 'vue'
import { NwFieldGrid, NwPickAny } from '@platform/main'
import { FormModal } from "./App";
import { SuppUserChooseColumn, ExaminationColumn, TravelColumn, NucleicacidColumn, SubColumnOptions, AddPersonReqUrl } from './constant'
import { planTypeArray } from "../../lib/constant/Constant";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum"
import subUpload from "./components/sub-upload.vue";

const { formRef, dataModel, dataPermits, rules, gridRefs, gridRules, gridDataPermits,
  contractWorkArray, contractWorkRender, upContractWorkMeth, addPerson, uploadSuccess } = new FormModal();

nextTick().then(() => {
})

watch(() => dataModel.value.examinationList, (newVal, oldVal) => {
})

let attachmentCon = (attachment: string): number => {
  let num: number = 0;
  if (attachment) {
    //如果存在，可能是个“”或者是一个也或者是多个
    let _num = attachment.match(/,/g)?.length || 0;
    //如果是多个需要加1因为数据存储是这样子 "1,2"，需要返回两个文件
    num = _num >= 1 ? _num + 1 : 1
  }
  return num;
}

</script>