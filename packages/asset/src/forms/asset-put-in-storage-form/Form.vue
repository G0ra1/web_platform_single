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
        <n-form-item-gi :span="12" label="">
          <h5 class="card-title">基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="入库编号" path="code">
          <n-input placeholder="入库编号" v-model:value="dataModel.code" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请人" path="applyUserName">
          <n-input-group>
            <n-input placeholder="申请人" v-model:value="dataModel.applyUserName" class="selectedInput" disabled />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="编制部门" path="applyUserDeptName">
          <n-input placeholder="编制部门" v-model:value="dataModel.applyUserDeptName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="单位" path="applyUserOrgName">
          <n-input placeholder="单位" v-model:value="dataModel.applyUserOrgName" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请时间" path="applyTime">
          <n-input placeholder="申请时间" v-model:value="dataModel.applyTime" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="入库金额" path="sumTotalAmount">
          <n-input placeholder="入库金额" v-model:value="dataModel.sumTotalAmount" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资来源" path="assetSource">
          <NwDic dictCode="asset_wzly" placeholder="请选择" v-model:value="dataModel.assetSource"
            v-model:label="dataModel.assetSourceName"></NwDic>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收信息" v-if="dataModel.assetSource == 1" path="assetSource">
          <yanshouPick ref="yanshouPickRef" v-model:id="dataModel.acceptanceId"
            v-model:value="dataModel.acceptanceCode"></yanshouPick>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="说明" v-if="brules['explanation'] !== 'hide'" path="title">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">物资验收待入库信息</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">物资验收待入库信息</span>
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
            <vxe-table ref="detailTable" show-overflow border row-id="rowId" :data="detailList"
              :column-config="{ resizable: true }" :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
                autoClear: false,
              }" @cell-click="editIemRow" @edit-actived="editActived">
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-column field="assetsCode" width="135" title="资产编号">
              </vxe-column>
              <vxe-column field="itemCode" width="135" title="物资编号">
              </vxe-column>
              <vxe-column field="itemType" v-if="dataModel.assetSource == 1" width="135" title="物资类别">
                <template v-slot="{ row }">
                  <span>{{
                      wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                        row.itemType).dictItemName : ""
                  }}</span>
                </template>
              </vxe-column>
              <vxe-column field="itemType" v-else title="物资类别" width="135" :edit-render="{}" transfer>
                <template #edit="{ row }">
                  <NwDic dictCode="asset_type" v-model:value="row.itemType" v-model:label="row.itemTypeName"
                    @change="(type) => itemTypeChange(type, { row, column })">
                  </NwDic>
                </template>
                <template #default="{ row }">
                  <span>{{
                      wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                        row.itemType).dictItemName : ""
                  }}</span>
                </template>
              </vxe-column>
              <vxe-column field="itemName" width="135" title="物资名称">
              </vxe-column>
              <vxe-column field="descshort" width="135" title="物资描述">
              </vxe-column>
              <vxe-column field="specs" width="135" title="规格">
              </vxe-column>
              <vxe-column field="supplierName" width="135" title="供应商" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.supplierName" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="contractCode" width="135" title="合同号" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.contractCode" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="billCodes" width="135" title="发票号" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.billCodes" type="text">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="unitName" width="135" title="单位">
              </vxe-column>
              <!-- <vxe-column field="accpetanceTime" width="135" title="验收时间">
              </vxe-column>
              <vxe-column field="accpetanceCode" width="135" title="验收编号">
              </vxe-column> -->
              <vxe-column field="storageNumber" width="135" title="入库数量" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.storageNumber" type="number" @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="stotageTaxRate" title="入库税率" width="135" :edit-render="{}" transfer>
                <template #edit="{ row }">
                  <vxe-select v-model="row.stotageTaxRate" @change="dataChangeEvent({ row, column })" transfer>
                    <vxe-option v-for="item in taxRateList" :key="item.dictItemCode" :value="item.dictItemCode"
                      :label="item.dictItemName"></vxe-option>
                  </vxe-select>
                </template>
                <template #default="{ row }">
                  <span>{{ row.stotageTaxRate ? row.stotageTaxRate + "%" : "" }}</span>
                </template>
              </vxe-column>
              <vxe-column field="storageAmount" width="135" title="入库单价" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.storageAmount" type="number" @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column>

              <!-- <vxe-column field="storageUntaxedAmount" width="135" title="入库未税金额" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.storageUntaxedAmount" type="number"
                    @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column> -->

              <vxe-column field="storageTime" width="135" title="入库日期" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.storageTime" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="warehouseName" width="135" title="仓库" :edit-render="{}">
                <template #edit="{ row, column }">
                  <warehousePick v-model:value="row.warehouseName" v-model:id="row.warehouseId"></warehousePick>
                </template>
              </vxe-column>
              <vxe-column field="shelfName" title="货架号" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <warehouseShelfPick v-model:value="row.shelfName" :warehouseId="row.warehouseId"
                    :warehouseName="row.warehouseName" v-model:id="row.shelfId" />
                </template>
              </vxe-column>
              <vxe-column field="file" title="图片预览" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <div style="display: flex">
                    <n-image width="30" height="30" v-if="row.fileIds" :src="getUrl(row.fileIds)" />
                    <fileUploadButton v-model:fileIds="row.fileIds" :showFileList="false">
                      <n-button text>
                        <nw-icon name="icon-add-bold" :size="25" />
                      </n-button>
                    </fileUploadButton>
                  </div>
                </template>
                <template #default="{ row }">
                  <n-image width="30" height="30" v-if="row.fileIds" :src="getUrl(row.fileIds)" />
                </template>
              </vxe-column>
              <vxe-column field="file" title="验收资料" width="135" :edit-render="{}">
                <template #edit="{ row, column }">
                  <div style="display: flex">
                    <fileUploadButton ref="fileUploadButtonRef" v-model:fileIds="row.document" :showFileList="false"
                      :showLookOver="true" :multiple="true">
                      <n-button text>
                        <nw-icon name="icon-add-bold" :size="25" />
                      </n-button>
                    </fileUploadButton>
                  </div>
                </template>
                <template #default="{ row }">
                  <n-button text @click="() => { fileUploadButtonRef.fileModalShow() }">
                    查看
                  </n-button>
                </template>
              </vxe-column>
              <!-- <vxe-column field="storageSumUntaxedAmount" width="160" title="资产原值总价（未税）">
              </vxe-column>
              <vxe-column field="storageSumAmount" width="160" title="资产原值总价（含税）">
              </vxe-column> -->
              <vxe-column title="操作" fixed="right" show-overflow width="120">
                <template #default="{ row }">
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
  <stockPending ref="stockPendingRef" :acceptanceId="dataModel.acceptanceId" @callback="callbackSetItem"></stockPending>
  <assetsPick ref="assetsPickRef" @update:callback="callbackSetItem"></assetsPick>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import fileUploadButton from "../../components/fileUploadButton/index.vue";
import { wuziType } from "./api/index.js";
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
  NImage
} from "naive-ui";
import { dataModel, brules, rules, detailList, filesSons, formRef } from "./store.js";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";
import {
  dataChangeEvent,
  editIemRow,
  detailTable,
  addAsset,
  stockPendingRef,
  callbackSetItem,
  itemListMap,
  unitList,
  delIemRow,
  assetsPickRef
} from "./itemtable.js";
import warehousePick from "../../components/warehousePick/index.vue";
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic, Cookies } from '@platform/main'

import stockPending from "../../components/stockPending/index.vue";
import fileInfo from "../../components/fileInfo/index.vue";
import assetsPick from "../../components/assetsPick1/index.vue";
import yanshouPick from "../../components/yanshouPick/index.vue";

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
    stockPending,
    NSpin,
    NUpload,
    fileInfo,
    warehousePick,
    assetsPick,
    yanshouPick,
    warehouseShelfPick,
    fileUploadButton,
    NImage
  },
  setup() {
    const message = useMessage();
    const token = Cookies.get("token");
    window.$message = message
    const pOptions = ref([]);
    const employeePick = ref(null);
    const taxRateList = ref([]);
    watch(
      () => dataModel.value.itemType,
      (d) => {
        console.log(dataModel.value.itemType, dataModel.value.itemTypeName);

      }
    );
    watch(
      () => dataModel.value.acceptanceId,
      (d, od) => {
        if (od) detailList.value = []
      }
    );
    watch(
      () => dataModel.value.assetSource,
      (d, od) => {
        if (od) detailList.value = []
      }
    );

    const itemTypeChange = (type, { row, column }) => {
    }
    const getUrl = (id) => {
      return `${window.apiBaseURL}/main/fileinfo/stream?id=${id}&access_token=${token}`
    }
    const editActived = ({ $rowIndex, row }) => {
      if ($rowIndex == 0) return true
      if (row.supplierName) return true
      if (!detailList.value[$rowIndex - 1].supplierName) return true
      if (row.itemCode != detailList.value[$rowIndex - 1].itemCode) return true
      let { supplierName, contractCode, billCodes, storageNumber, stotageTaxRate, storageAmount, storageTime, warehouseName, shelfName, fileIds, document } = detailList.value[$rowIndex - 1]
      detailList.value[$rowIndex] = { ...row, supplierName, contractCode, billCodes, storageNumber, stotageTaxRate, storageAmount, storageTime, warehouseName, shelfName, fileIds, document }
      detailTable.value.loadData(detailList.value)
      // detailTable.value.setEditRow(row)
    }
    const wuziTypeList = ref([])

    onMounted(() => {
      wuziType().then(res => {
        wuziTypeList.value = res
      })
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
      detailList,
      dataChangeEvent,
      editIemRow,
      detailTable,
      addAsset,
      stockPendingRef,
      callbackSetItem,
      itemListMap,
      unitList,
      delIemRow,
      taxRateList,
      message,
      assetsPickRef,
      itemTypeChange,
      getUrl,
      editActived,
      wuziTypeList
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
