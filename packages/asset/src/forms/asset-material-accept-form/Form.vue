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
        <n-form-item-gi :span="6" label="领用编号" path="code">
          <n-input placeholder="领用编号" v-model:value="dataModel.code" disabled />
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
        <n-form-item-gi :span="6" label="领用人" path="assetUserName">
          <n-input placeholder="领用人" v-model:value="dataModel.assetUserName" disabled />
          <NwEmployeePick :value="dataModel.assetUserId" :expreParamValueText="dataModel.assetUserName"
                        @updateExpreParamValueText="(value) => dataModel.assetUserName = value"
                        @updateValue="(value) => dataModel.assetUserId = value" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="说明" v-if="brules['explanation'] !== 'hide'" path="title">
          <n-input :disabled="brules['explanation'] === 'readonly'" type="textarea" placeholder="请输入说明"
            v-model:value="dataModel.explanation" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <h5 class="card-title">库存数据</h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="" path="">
          <div style="width: 100%">
            <span style="height: 24px; line-height: 24px">库存数据</span>
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
            <vxe-table ref="detailTable" show-overflow border :data="detailList" :column-config="{ resizable: true }"
              :edit-config="{
  trigger: 'click',
  mode: 'row',
  enabled: true,
  showIcon: true,
}" @cell-click="editIemRow">
              <vxe-column type="seq" title="序号" width="60"></vxe-column>
              <vxe-column field="classifyCode" width="135" title="分类编码">
              </vxe-column>
              <vxe-column field="classifyName" width="135" title="分类名称">
              </vxe-column>
              <vxe-column field="itemCode" width="135" title="物资编码">
              </vxe-column>
              <vxe-column field="itemName" width="135" title="物资名称">
              </vxe-column>
              <vxe-column field="descshort" title="物资描述" width="135">
              </vxe-column>
              <vxe-column field="itemType" title="物资类型" width="135">
                <template v-slot="{ row }">
                  <span>{{ wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d =>
                              d.dictItemCode ==
                              row.itemType).dictItemName : ""
                          }}
                  </span>
                </template>
              </vxe-column>
              <vxe-column field="specs" width="135" title="规格">
              </vxe-column>
              <vxe-column field="materialQuality" width="135" title="材质">
              </vxe-column>
              <vxe-column field="unitName" width="135" title="单位">
              </vxe-column>
              <vxe-column field="usableNumber" width="135" title="可用数量">
              </vxe-column>
              <vxe-column field="acceptNumber" width="135" title="领用数量" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.acceptNumber" type="number" @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column>
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
  <acceptAssetsPick ref="acceptAssetsPickRef" @callback="callbackSetItem"></acceptAssetsPick>
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
  acceptAssetsPickRef,
  callbackSetItem,
  itemListMap,
  unitList,
  delIemRow,
} from "./itemtable.js";
import warehousePick from "../../components/warehousePick/index.vue";
import { dictItemLists } from "./api/index.js";
import employeePick from "../../components/employeePick/index.vue";
import { NwIcon, NwDic, NwEmployeePick } from '@platform/main'


import acceptAssetsPick from "../../components/acceptAssetsPick/index.vue";
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
    acceptAssetsPick,
    NSpin,
    NUpload,
    fileInfo,
    warehousePick,
    NwEmployeePick
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

      }
    );
    const wuziTypeList = ref([])
    onMounted(() => {
      dictItemLists("asset_type").then((res) => {
        wuziTypeList.value = res;
      });
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
      acceptAssetsPickRef,
      callbackSetItem,
      itemListMap,
      unitList,
      delIemRow,
      taxRateList,
      message,
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
