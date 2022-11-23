<template>
  <div class="my-form-box">
    <!-- <n-anchor :show-rail="false" :show-background="false">
      <n-anchor-link title="基本信息" href="#basic" />
      <n-anchor-link title="物资计划信息" href="#ignore-gap" />
      <n-anchor-link title="附件" href="#affix" />
    </n-anchor> -->
    <n-form
      :model="dataModel"
      :rules="rules"
      ref="formRef"
      label-placement="left"
      label-align="left"
      :label-width="90"
      size="small"
      :style="{ padding: '28px 84px', width: '1200px', margin: '0 auto' }"
    >
      <n-grid :cols="12" :x-gap="24">
        <n-form-item-gi :span="12" label="" path="code">
          <h5 class="card-title">基本信息</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请单号" path="code">
          <n-input
            placeholder="申请单号"
            v-model:value="dataModel.code"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请人" path="applyUserName">
          <n-input-group>
            <n-input
              v-model:value="dataModel.applyUserName"
              class="selectedInput"
              disabled
            />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请部门" path="applyUserDeptName">
          <n-input
            placeholder="申请部门"
            v-model:value="dataModel.applyUserDeptName"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请机构" path="applyUserOrgName">
          <n-input
            placeholder="申请机构"
            v-model:value="dataModel.applyUserOrgName"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="申请时间" path="applyTime">
          <n-input
            placeholder="申请时间"
            v-model:value="dataModel.applyTime"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="总金额" path="sumTotalAmount">
          <n-input
            placeholder="总金额"
            v-model:value="dataModel.sumTotalAmount"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="总数量" path="sumTotalNumber">
          <n-input
            placeholder="总数量"
            v-model:value="dataModel.sumTotalNumber"
            disabled
          />
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="购置类型" path="warehouseName">
          <NwDic
            dictCode="asset_type"
            v-model:value="dataModel.itemType"
            v-model:label="dataModel.itemTypeName"
            isSort
            type="checkbox"
          ></NwDic>
        </n-form-item-gi>
        <!-- <n-form-item-gi :span="6" label="计划年度" path="planYear">
          <n-date-picker
            style="width: 100%"
            placeholder="请选择计划年度"
            v-model:value="dataModel.planYear"
            value-format="yyyy"
            format="yyyy"
            type="year"
            clearable
          />
        </n-form-item-gi> -->

        <n-form-item-gi
          :span="12"
          label="说明"
          v-if="brules['explanation'] !== 'hide'"
          path="title"
        >
          <n-input
            :disabled="brules['explanation'] === 'readonly'"
            type="textarea"
            placeholder="请输入说明"
            v-model:value="dataModel.explanation"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label=""
          path=""
          v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0"
        >
          <h5 class="card-title">物资计划信息</h5>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label=""
          path=""
          v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0"
        >
          <n-tabs
            class="card-tabs"
            :default-value="
              dataModel.itemTypeName ? dataModel.itemTypeName[0] : ''
            "
            size="large"
            animated
            style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
            :on-update:value="tabsChange"
          >
            <n-tab-pane
              v-for="item in dataModel.itemTypeName"
              :key="item"
              :name="item"
              :tab="item"
            >
            </n-tab-pane>
          </n-tabs>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label=""
          path=""
          v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0"
        >
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">物资信息</span>
            <n-button
              style="
                height: 24px;
                width: 24px;
                line-height: 24px;
                margin-left: 10px;
              "
              @click="
                () => {
                  addAsset();
                }
              "
              circle
              type="info"
            >
              <nw-icon name="icon-add-bold" :size="15" />
            </n-button>
            <vxe-table
              ref="detailTable"
              show-overflow
              border
              :data="itemListMap[activeItemType]"
              :column-config="{ resizable: true }"
              :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }"
              @cell-click="editIemRow"
            >
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-column field="itemName" width="135" title="物项名称">
              </vxe-column>
              <vxe-column field="itemCode" width="135" title="物项编码">
              </vxe-column>
              <vxe-column
                field="unitName"
                title="计量单位"
                width="135"
                :edit-render="{}"
              >
                <template #edit="{ row }">
                  <vxe-select v-model="row.unitName" transfer>
                    <vxe-option
                      v-for="item in unitList"
                      :key="item.unitName"
                      :value="item.unitName"
                      :label="item.unitName"
                    ></vxe-option>
                  </vxe-select>
                </template>
              </vxe-column>
              <vxe-column
                field="applyNumber"
                title="申请数量"
                :edit-render="{}"
                width="135"
              >
                <template #edit="{ row, column }">
                  <vxe-input
                    v-model="row.applyNumber"
                    type="text"
                    @change="dataChangeEvent({ row, column })"
                  ></vxe-input>
                </template>
              </vxe-column>
              <vxe-column
                field="applyAmount"
                width="135"
                title="单价"
                :edit-render="{}"
              >
                <template #edit="{ row, column }">
                  <vxe-input
                    v-model="row.applyAmount"
                    type="text"
                    @change="dataChangeEvent({ row, column })"
                  ></vxe-input>
                </template>
              </vxe-column>
              <vxe-column
                field="taxRate"
                width="135"
                title="税率"
                :edit-render="{}"
              >
                <template #edit="{ row }">
                  <vxe-select
                    v-model="row.taxRate"
                    @change="dataChangeEvent({ row, column })"
                    transfer
                  >
                    <vxe-option
                      v-for="item in taxRateList"
                      :key="item.dictItemCode"
                      :value="item.dictItemCode"
                      :label="item.dictItemName"
                    ></vxe-option>
                  </vxe-select>
                </template>
                <template #default="{ row }">
                  <span>{{ row.taxRate ? row.taxRate + "%" : "" }}</span>
                </template>
              </vxe-column>
              <vxe-column field="applySumAmount" width="135" title="总价">
              </vxe-column>
              <vxe-column
                field="explanation"
                width="135"
                title="备注"
                :edit-render="{}"
              >
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
                  <span
                    style="
                      cursor: pointer;
                      color: #e62525;
                      margin-right: 15px;
                      font-size: 12px;
                    "
                    @click="
                      () => {
                        delIemRow(row);
                      }
                    "
                    >删除</span
                  >
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
  <assetsPick
    ref="assetsPickRef"
    @update:callback="callbackSetItem"
  ></assetsPick>
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
import { dataModel, brules, rules, detailList, formRef } from "./store.js";
import {
  dataChangeEvent,
  editIemRow,
  detailTable,
  addAsset,
  assetsPickRef,
  callbackSetItem,
  activeItemType,
  itemListMap,
  unitList,
  delIemRow,
} from "./itemtable.js";
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic } from '@platform/main'

import assetsPick from "../../components/assetsPick/index.vue";
import fileInfo from "../../components/fileInfo/index.vue";
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
    assetsPick,
    NSpin,
    NUpload,
    fileInfo,
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
      console.log(dataModel.value.itemType);
      console.log(dataModel.value.itemTypeName);
      console.log(itemListMap.value);
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
      editIemRow,
      detailTable,
      addAsset,
      assetsPickRef,
      callbackSetItem,
      activeItemType,
      itemListMap,
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
