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
        <n-form-item-gi :span="6" label="报废编号" path="code">
          <n-input placeholder="报废编号" v-model:value="dataModel.code" disabled />
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
        <n-form-item-gi :span="6" label="合计金额" path="sumTotalAmount">
          <n-input placeholder="合计金额" v-model:value="dataModel.sumTotalAmount" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="说明" v-if="brules['explanation'] !== 'hide'" path="title">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">报废详情</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">报废详情</span>
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
              <nw-icon name="icon-n-y-add" :size="15" />
            </n-button>
            <vxe-table ref="detailTable" show-overflow border :data="assetsList" :column-config="{ resizable: true }"
              :row-config="{ keyField: 'rowId' }" :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }" @cell-click="editIemRow">
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-table-column field="assetsCode" width="135" title="资产编号"></vxe-table-column>
              <vxe-table-column field="itemName" width="135" title="物资名称"></vxe-table-column>
              <vxe-table-column field="itemClass" width="135" title="物资类别"></vxe-table-column>
              <vxe-table-column field="descshort" width="135" title="物资描述"></vxe-table-column>
              <vxe-column field="specs" width="135" title="物资规格"></vxe-column>
              <vxe-table-column field="standard" width="135" title="物资标准"></vxe-table-column>
              <vxe-table-column field="productionDate" width="135" title="生产日期"></vxe-table-column>
              <vxe-table-column field="factoryDate" width="135" title="出厂日期"></vxe-table-column>
              <vxe-table-column field="serviceLife" width="135" title="规定使用年限"></vxe-table-column>
              <vxe-table-column field="assetsAmount" width="135" title="资产原值"></vxe-table-column>
              <vxe-table-column field="stockNumber" width="135" title="库存数量"></vxe-table-column>
              <vxe-column field="scrapNumber" width="135" title="申请报废数量" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.scrapNumber" type="number" @change="dataChangeEvent({ row, column })" :min="0" :max="row.stockNumber">
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="cause" width="135" title="申请报废原因" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.cause" type="text"></vxe-input>
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
  <scrapPick ref="scrapPickRef" @update:callback="callbackSetItem" :applyUserId="dataModel.applyUserId">
  </scrapPick>
  <employeePick ref="employeePickRef" @update:callback="getUsers" :multiple="false" :showSide="false"
    :propsOrgId="dataModel.applyUserDeptId"></employeePick>
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
  scrapPickRef,
  callbackSetItem,
  activeItemType,
  assetsList,
  unitList,
  delIemRow,
} from "./itemtable.js";
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic } from '@platform/main'

import scrapPick from "../../components/assteScrapApplyPick/index.vue";
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
    scrapPick,
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
    const employeePickRef = ref(null);
    const rowIndex = ref(0)
    const selectUser = ($rowIndex) => {
      rowIndex.value = $rowIndex
      employeePickRef.value.sonFn();
    };
    const taxRateList = ref([]);
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
      console.log(d, 'dataModel.value.applyId')
      assetsList.value = assetsList.value.filter(e => {
        console.log(e, 'applyId')
        return d.indexOf(e.applyId) >= 0
      })
      console.log(assetsList.value, ' assetsList.value assetsList.value')
      detailTable.value.loadData(assetsList.value)
    })
    const getUsers = ([user = {}]) => {
      console.log(user, "useruseruseruseruser");
      assetsList.value[rowIndex.value].assetUserName = user.userNameCh
      assetsList.value[rowIndex.value].assetUserId = user.id || "";
      detailTable.value.loadData(assetsList.value)
    };
    return {
      dataModel,
      brules,
      rules,
      pOptions,
      formRef,
      rules: {},
      employeePickRef,
      tabsChange,
      detailList,
      dataChangeEvent,
      editIemRow,
      detailTable,
      addAsset,
      scrapPickRef,
      callbackSetItem,
      activeItemType,
      assetsList,
      unitList,
      delIemRow,
      taxRateList,
      message,
      getUsers,
      selectUser,
      rowIndex
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
  height: 640px;
  overflow: auto;

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
