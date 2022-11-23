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
        <n-form-item-gi :span="6" label="验收编号" path="code">
          <n-input placeholder="验收编号" v-model:value="dataModel.code" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收人" path="applyUserName">
          <n-input-group>
            <n-input placeholder="验收人" v-model:value="dataModel.applyUserName" class="selectedInput" disabled />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收部门" path="applyUserDeptName">
          <n-input placeholder="验收部门" v-model:value="dataModel.applyUserDeptName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收法人" path="applyUserOrgName">
          <n-input placeholder="验收法人" v-model:value="dataModel.applyUserOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收时间" path="applyTime">
          <n-input placeholder="验收时间" v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="采购登记" path="registerId">
          <purchaseRegistrationPick v-model:value="dataModel.registerId" v-model:code="dataModel.registerCode">
          </purchaseRegistrationPick>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="验收说明" v-if="brules['explanation'] !== 'hide'" path="explanation">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入验收说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">验收明细</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">验收明细</span>
            <n-button style="
                height: 24px;
                width: 24px;
                line-height: 24px;
                margin-left: 10px;
              " @click="
                () => {
                  addAsset();
                }
              " circle type="info">
              <nw-icon name="icon-add-bold" :size="15" />
            </n-button>
            <acceptanceDetails ref="acceptanceDetailsRef"></acceptanceDetails>
            <!-- <vxe-table ref="detailTable" show-overflow border :data="assetsList" :column-config="{ resizable: true }"
              :row-config="{ keyField: 'rowId' }" :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }">
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-column field="itemName" title="物项名称" width="135">
              </vxe-column>
              <vxe-column field="itemCode" title="物项编码" width="135">
              </vxe-column>
              <vxe-column field="itemCode" title="物项属性" width="135">
              </vxe-column>
              <vxe-column field="registerNumber" title="采购数量" width="135">
              </vxe-column>
              <vxe-column field="unitName" title="计量单位" width="135">
              </vxe-column>
              <vxe-column field="acceptanceNumber" title="验收数量" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.acceptanceNumber" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="status" title="状态" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.status" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="exteriorCheck" title="物资外观" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.exteriorCheck" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="qualityAcceptance" title="质量" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.qualityAcceptance" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="document" title="资料" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.document" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="acceptanceAmount" title="验收单价" width="135">
              </vxe-column>
              <vxe-column field="acceptanceTaxRate" title="验收税率" width="135">
              </vxe-column>
              <vxe-column field="acceptanceSumAmount" width="135" title="总价">
              </vxe-column>
              <vxe-column field="explanation" width="135" title="备注">
              </vxe-column>
              <vxe-column title="操作" fixed="right" show-overflow width="135">
                <template #default="{ row }">
                  <span style="
                      cursor: pointer;
                      color: #6b84fc;
                      margin-right: 12px;
                      font-size: 12px;
                    " @click="
                      () => {
                        assetsAcceptance(row);
                      }
                    ">验收</span>
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
            </vxe-table> -->
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
  <acceptancePick ref="assetsPickRef" :registerId="dataModel.registerId" @update:callback="callbackSetItem">
  </acceptancePick>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import purchaseRegistrationPick from "../../components/purchaseRegistrationPick/index.vue";
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
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import acceptancePick from "../../components/acceptancePick/index.vue";
import fileInfo from "../../components/fileInfo/index.vue";
import acceptanceDetails from "./acceptanceDetails.vue";

import { NwIcon } from '@platform/main'

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
    NTabs,
    NTabPane,
    NTooltip,
    acceptancePick,
    NSpin,
    NUpload,
    fileInfo,
    acceptanceDetails,
    purchaseRegistrationPick
  },
  setup() {
    message.value = useMessage();

    const pOptions = ref([]);
    const employeePick = ref(null);
    const taxRateList = ref([]);
    watch(
      () => dataModel.value.itemType,
      (d) => {
        console.log(dataModel.value.itemType, dataModel.value.itemTypeName);
        if (!activeItemType.value) {
          activeItemType.value = d[0];
        }
      }
    );
    watch(
      () => dataModel.value.registerId,
      (d, od) => {
        if(od) acceptanceDetailsRef.value.setTableValue()
      }
    );
    const tabsChange = (v) => {
      activeItemType.value =
        dataModel.value.itemType[dataModel.value.itemTypeName.indexOf(v)];
      console.log(dataModel.value.itemType);
      console.log(dataModel.value.itemTypeName);
    };
    onMounted(() => {
      dictItemLists("ASSETS_TAX_RATE").then((res) => {
        console.log(res);
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
      acceptanceDetailsRef
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
