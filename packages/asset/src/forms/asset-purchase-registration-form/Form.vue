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
        <n-form-item-gi :span="6" label="申请单号" path="code">
          <n-input placeholder="申请单号" v-model:value="dataModel.code" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请人" path="applyUserName">
          <n-input-group>
            <n-input v-model:value="dataModel.applyUserName" class="selectedInput" disabled />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请部门" path="applyUserDeptName">
          <n-input placeholder="申请部门" v-model:value="dataModel.applyUserDeptName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请机构" path="applyUserOrgName">
          <n-input placeholder="申请机构" v-model:value="dataModel.applyUserOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请时间" path="applyTime">
          <n-input placeholder="申请时间" v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="购置申请" path="applyId">
          <managApplicationsPick v-model:value="dataModel.applyId" v-model:code="dataModel.applyCode">
          </managApplicationsPick>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="采购合同" path="contractCode">
          <n-input placeholder="采购合同" v-model:value="dataModel.contractCode" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="供应商" path="supplierName">
          <supplierPick v-model:value="dataModel.supplierName" v-model:id="dataModel.supplierId" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="合同签订时间" path="contractTime">
          <n-date-picker style="width: 100%" placeholder="请选择合同签订时间" v-model:value="dataModel.contractTime"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="合计金额" path="sumTotalAmount">
          <n-input placeholder="合计金额" v-model:value="dataModel.sumTotalAmount" disabled />
        </n-form-item-gi>


        <n-form-item-gi :span="12" label="采购合同附件" path="contractFileIds">
          <fileUploadButton v-model:fileName="dataModel.contractFileName" v-model:fileId="dataModel.contractFileIds">
            <n-button class="uploadbtn" v-if="!dataModel.contractFileName" size="small" type="info">
              <span>上传</span>
            </n-button>
          </fileUploadButton>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="说明" v-if="brules['explanation'] !== 'hide'" path="title">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">采购信息登记</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">采购信息</span>
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
            <vxe-table ref="detailTable" show-overflow border :data="assetsList" :column-config="{ resizable: true }"
              :row-config="{ keyField: 'rowId' }" :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }" @cell-click="editIemRow">
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-column field="itemName" title="物资名称" width="135">
              </vxe-column>
              <vxe-column field="itemCode" title="物资编码" width="135">
              </vxe-column>
              <vxe-column field="itemCode" title="物资属性" width="135">
              </vxe-column>
              <vxe-column field="descshort" title="物资描述" width="135">
              </vxe-column>
              <vxe-column field="applyNumber" title="申请数量" width="135">
              </vxe-column>
              <vxe-column field="applyAmount" title="单价" width="135">
              </vxe-column>
              <vxe-column field="unitName" title="计量单位" width="135" :edit-render="{}">
                <template #edit="{ row }">
                  <vxe-select v-model="row.unitName" transfer>
                    <vxe-option v-for="item in unitList" :key="item.unitName" :value="item.unitName"
                      :label="item.unitName"></vxe-option>
                  </vxe-select>
                </template>
              </vxe-column>
              <vxe-column field="registerNumber" title="采购数量" :edit-render="{}" width="135">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.registerNumber" type="text" @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="registerAmount" title="采购单价" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.registerAmount" type="text" @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="registerTaxRate" title="采购税率" width="135" :edit-render="{}">
                <template #edit="{ row }">
                  <vxe-select v-model="row.registerTaxRate" @change="dataChangeEvent({ row, column })" transfer>
                    <vxe-option v-for="item in taxRateList" :key="item.dictItemCode" :value="item.dictItemCode"
                      :label="item.dictItemName"></vxe-option>
                  </vxe-select>
                </template>
                <template #default="{ row }">
                  <span>{{ row.registerTaxRate ? row.registerTaxRate + "%" : "" }}</span>
                </template>
              </vxe-column>
              <vxe-column field="registerSumAmount" width="135" title="总价">
              </vxe-column>
              <vxe-column field="explanation" width="135" title="备注" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.explanation" type="text"></vxe-input>
                </template>
              </vxe-column>
              <vxe-column title="操作" fixed="right" show-overflow width="135">
                <template #default="{ row }">
                  <!-- <span
                    style="
                      cursor: pointer;
                      color: #6b84fc;
                      margin-right: 12px;
                      font-size: 12px;
                    "
                    @click="
                      () => {
                        editIemRow(row);
                      }
                    "
                    >编辑</span
                  > -->
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
  <assetsApplyPick ref="assetsPickRef" @update:callback="callbackSetItem" :applyIds="dataModel"></assetsApplyPick>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
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
  editIemRow,
  detailTable,
  addAsset,
  assetsPickRef,
  callbackSetItem,
  activeItemType,
  assetsList,
  unitList,
  delIemRow,
} from "./itemtable.js";
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic } from '@platform/main'

import assetsApplyPick from "../../components/assetsApplyPick/index.vue";
import fileInfo from "../../components/fileInfo/index.vue";
import fileUploadButton from "../../components/fileUploadButton/index.vue";
import supplierPick from "../../components/supplierPick/index.vue";
import managApplicationsPick from "../../components/managApplicationsPick/index.vue";

import { forEach } from "lodash";
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
    supplierPick,
    fileUploadButton,
    managApplicationsPick
  },
  setup() {
    const message = useMessage();
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
    const tabsChange = (v) => {
      activeItemType.value =
        dataModel.value.itemType[dataModel.value.itemTypeName.indexOf(v)];
    };
    onMounted(() => {
      dictItemLists("ASSETS_TAX_RATE").then((res) => {
        console.log(res);
        taxRateList.value = res;
      });
    });
    watch(() => dataModel.value.applyId, (d) => {
      assetsList.value = assetsList.value.filter(e => {
        return d.indexOf(e.applyId) >= 0 || e.type == "enlarge"
      })
      detailTable.value.loadData(assetsList.value)
    })
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
      editIemRow,
      detailTable,
      addAsset,
      assetsPickRef,
      callbackSetItem,
      activeItemType,
      assetsList,
      unitList,
      delIemRow,
      taxRateList,
      message,
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
