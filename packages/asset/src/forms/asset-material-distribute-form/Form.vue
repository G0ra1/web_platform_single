<template>
  <div class="my-form-box">
    <!-- <n-anchor :show-rail="false" :show-background="false">
      <n-anchor-link title="基本信息" href="#basic" />
      <n-anchor-link title="物资计划信息" href="#ignore-gap" />
      <n-anchor-link title="附件" href="#affix" />
    </n-anchor> -->
    <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" label-align="left" :label-width="90"
      size="small" :style="{ padding: '28px 84px', width: '1200px', margin: '0 auto' }">
      <n-grid :cols="12" :x-gap="24">
        <n-form-item-gi :span="12" label="" path="code">
          <h5 class="card-title">基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="派发编号" path="code">
          <n-input placeholder="派发编号" v-model:value="dataModel.code" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请人" path="applyUserName">
          <n-input-group>
            <n-input placeholder="申请人" v-model:value="dataModel.applyUserName" class="selectedInput" disabled />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请部门" path="applyUserDeptName">
          <n-input placeholder="申请部门" v-model:value="dataModel.applyUserDeptName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请单位" path="applyUserOrgName">
          <n-input placeholder="申请单位" v-model:value="dataModel.applyUserOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请时间" path="applyTime">
          <n-input placeholder="申请时间" v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资领用" path="sourceId">
          <materialAcceptPick v-model:value="dataModel.sourceId" v-model:code="dataModel.sourceCode"
            @onChange="sourceChange">
          </materialAcceptPick>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="申请说明" v-if="brules['explanation'] !== 'hide'" path="explanation">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入申请说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">派发明细</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">派发明细</span>
            <!-- <acceptanceDetails ref="acceptanceDetailsRef"></acceptanceDetails> -->
            <vxe-table ref="detailTable" show-overflow border :data="assetsList" :column-config="{ resizable: true }"
              :row-config="{ keyField: 'rowId' }" :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }">
              <vxe-column type="seq" title="序号" fixed="left" width="60"></vxe-column>
              <vxe-column field="itemCode" title="物资编码" width="135">
              </vxe-column>
              <vxe-column field="itemName" title="物资名称" width="135">
              </vxe-column>
              <vxe-column field="descshort" title="物资描述" width="135">
              </vxe-column>
              <vxe-column field="itemType" title="物资类型" width="135">
                <template v-slot="{ row }">
                  <span>{{
                      wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                        row.itemType).dictItemName : ""
                  }}</span>
                </template>
              </vxe-column>
              <vxe-column field="descshort" title="规格" width="135">
              </vxe-column>
              <vxe-column field="materialQuality" title="材质" width="135">
              </vxe-column>
              <vxe-column field="applyUserOrgName" title="申请单位" width="135">
              </vxe-column>
              <vxe-column field="applyUserDeptName" title="申请部门" width="135">
              </vxe-column>
              <vxe-column field="applyUserName" title="申请人" width="135">
              </vxe-column>
              <vxe-column field="unitName" title="单位" width="135">
              </vxe-column>
              <vxe-column field="applyNumber" title="申请数量" width="135">
              </vxe-column>
              <vxe-column field="distributeNumber" title="派发数量" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.distributeNumber" type="number">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column title="操作" fixed="right" show-overflow width="135">
                <template #default="{ row, rowIndex }" >
                  <span v-if="row && row.itemCode" style="
                      cursor: pointer;
                      color: #6b84fc;
                      margin-right: 12px;
                      font-size: 12px;
                    " @click="
                      () => {
                        assetsAcceptance(row, rowIndex);
                      }
                    ">选择资产</span>
                  <span style="
                      cursor: pointer;
                      color: #e62525;
                      margin-right: 15px;
                      font-size: 12px;
                    " @click="
                      () => {
                        delIemRow(row);
                      }
                    ">删除</span>
                </template>
              </vxe-column>
            </vxe-table>
          </div>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">附件</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <fileInfo v-model:value="dataModel.fileIds"></fileInfo>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
  <assetsApplyPick ref="assetsPickRef" @update:callback="callbackSetItem">
  </assetsApplyPick>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import materialAcceptPick from "../../components/materialAcceptPick/index.vue";
import {
  useMessage,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInputGroup,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NInputGroupLabel,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NRate,
  NButton,
  NAnchor,
  NAnchorLink,
  NTabs,
  NTabPane,
  NTooltip,
  NSpin,
  NUpload,
} from "naive-ui";
import { dataModel, brules, rules, detailList, filesSons, formRef } from "./store.js";
import {
  dataChangeEvent,
  assetsAcceptance,
  detailTable,
  addAsset,
  assetsPickRef,
  callbackSetItem,
  activeItemType,
  unitList,
  delIemRow,
  assetsList,
  acceptanceDetailsRef,
  message
} from "./itemtable.js";
import { dictItemLists, getAssetsList } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic, Utils } from '@platform/main'

import assetsApplyPick from "./assetsApplyPick/index.vue";
import fileInfo from "../../components/fileInfo/index.vue";
import acceptanceDetails from "./acceptanceDetails.vue";

const { reduceData,enlargeData} = Utils

export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInputGroup,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NInputGroupLabel,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NRate,
    employeePick,
    NwIcon,
    NButton,
    NAnchor,
    NAnchorLink,
    NwDic,
    NTabs,
    NTabPane,
    NTooltip,
    assetsApplyPick,
    NSpin,
    NUpload,
    fileInfo,
    acceptanceDetails,
    materialAcceptPick
  },
  setup() {
    message.value = useMessage();

    const pOptions = ref([]);
    const employeePick = ref(null);
    const taxRateList = ref([]);
    const sourceChange = (id) => {
      getAssetsList({ sourceId: id, distributeType: 0 }).then(res => {
        console.log(res, 'getAssetsList')
        assetsList.value = enlargeData(res)
      })
    }
    const tabsChange = (v) => {
      activeItemType.value =
        dataModel.value.itemType[dataModel.value.itemTypeName.indexOf(v)];
      console.log(dataModel.value.itemType);
      console.log(dataModel.value.itemTypeName);
    };
    const wuziTypeList = ref([])
    onMounted(() => {
      dictItemLists("asset_type").then((res) => {
        wuziTypeList.value = res;
      });
      dictItemLists("ASSETS_TAX_RATE").then((res) => {
        taxRateList.value = res;
      });
    });
    return {
      dataModel,
      brules,
      rules,
      pOptions,
      formRef,
      rules: {},
      employeePick,
      tabsChange,
      detailList,
      dataChangeEvent,
      assetsAcceptance,
      detailTable,
      addAsset,
      assetsPickRef,
      callbackSetItem,
      activeItemType,
      unitList,
      delIemRow,
      taxRateList,
      message,
      assetsList,
      acceptanceDetailsRef,
      wuziTypeList,
      sourceChange
    };
  },
});
</script>
<style lang="less">
.selectedInput.n-input.n-input--disabled .n-input__input-el {
  cursor: pointer;
}

.my-form-box {
  box-sizing: border-box;
  position: relative;
  background: #f8f8f8;
  min-height: 100vh;

  .n-anchor {
    position: absolute;
    text-align: right;
    top: 64px;
    left: 200px;
  }

  .n-form {
    box-sizing: border-box;
    background: #fff;
    min-height: calc(100vh - 50px);
  }

  .card-title {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    border-left: 2px solid #6b84fc;
    margin: 0;
    height: 19px;
    line-height: 19px;
    padding-left: 16px;
    margin-top: 20px;
  }
}
</style>
