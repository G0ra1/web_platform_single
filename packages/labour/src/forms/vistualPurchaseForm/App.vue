<script lang="ts" setup>
import {
  NwIcon,
  NwFunctionPredefine,
  NwPickAny,
  NwFieldGrid,
  NwDic,
} from "@platform/main";
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NGradientText,
  NSelect,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NCard,
  NScrollbar,
} from "naive-ui";
import {
  RestModeOptions,
  RestModeArry,
  UnitOptions,
  UnitArry,
} from "./constant";
import { FormModal } from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  purchaseByContractId,
  gridRefs,
  gridRules,
  gridDataPermits,
} = new FormModal();
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      :rules="rules"
      size="medium"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      style="padding: 20px 30px"
    >
      <n-card title="基本信息">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="需求计划名称:">
            <n-gradient-text type="info">{{
              dataModel.planName
            }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="9" label="虚拟订单名称:">
            <n-gradient-text type="info">{{
              dataModel.virtualPurchaseName
            }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="" path="">
            <h5 class="card-title">
              合同信息
              <NwPickAny
                style="padding: 0px 50px"
                rowKey="contractcode"
                button-label="选择采购合同"
                modal-title="采购合同"
                :value="dataModel.contractcode"
                isSingle
                @update:value="
                  (d) => {
                    dataModel.contractname = d.contractname;
                    dataModel.contractid = d.id;
                    dataModel.contractcode = d.contractcode;
                    purchaseByContractId(d.id, d);
                  }
                "
                :gridColumns="[
                  { field: 'contractcode', title: '合同编码' },
                  { field: 'contractname', title: '合同名称' },
                ]"
                requestUrl="/purchasecontract/purchase/contract/querycontract"
                requestMethod="post"
              >
                <template #search="{ searchData }">
                  <n-input
                    v-model:value="searchData.contractcode"
                    placeholder="合同编号"
                    size="medium"
                  />
                  <n-input
                    v-model:value="searchData.contractname"
                    placeholder="合同名称"
                    size="medium"
                  />
                </template>
              </NwPickAny>
            </h5>
          </n-form-item-gi>
          <n-form-item-gi :span="12" class="LFormTable" label="合同名称">
            <n-input v-model:value="dataModel.contractname" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" class="LFormTable" label="合同编号">
            <n-input v-model:value="dataModel.contractcode" />
          </n-form-item-gi>
          <!-- <n-form-item-gi  :span="24" class="LFormTable">
                <NwFieldGrid
                    style="width: 100%"
                    :edit-enabled="false"
                    :columns="[
                    // { field: 'workContractId', title: '合同ID' },
                    { field: 'contractcode', title: '合同编码' },
                    { field: 'contractname', title: '合同名称' },
                    ]"
                > <template #buttons>
                    
                    </template>
                </NwFieldGrid>
            </n-form-item-gi> -->
          <n-form-item-gi
            :span="24"
            label=""
            path=""
            v-if="dataPermits.purchaseExtend !== FormPermissionEnum.HIDE"
          >
            <h5 class="card-title">发票信息</h5>
          </n-form-item-gi>
          <n-form-item-gi
            class="LFormTable"
            :span="24"
            path="purchaseExtend"
            v-if="dataPermits.purchaseExtend !== FormPermissionEnum.HIDE"
          >
            <NwFieldGrid
              :ref="(d: any) => gridRefs['purchaseExtend'] = d"
              v-model:value="dataModel.purchaseExtend"
              style="width: 100%"
              :rules="gridRules['purchaseExtend']"
              :editEnabled="dataModel.isEditPurchaseExtend"
              :is-readonly="
                dataModel.purchaseExtend
                  ? dataModel.purchaseExtend.length > 0
                  : false
              "
              :data-permits="gridDataPermits['purchaseExtend']"
              :columns="[
                {
                  field: 'taxrate',
                  title: '税率',
                  editRender: { enabled: true },
                  slots: { edit: 'taxrate_edit' },
                },
                {
                  field: 'invoiceType',
                  title: '发票类型',
                  editRender: { enabled: true },
                  slots: {
                    edit: 'invoiceType_edit',
                    default: 'invoiceType_view',
                  },
                },
                {
                  field: 'workHourAmount',
                  title: '工时时薪',
                  editRender: { enabled: true },
                  slots: { edit: 'workHourAmount_edit' },
                },
                {
                  field: 'overtimeHourAmount',
                  title: '加班时薪',
                  editRender: { enabled: true },
                  slots: { edit: 'overtimeHourAmount_edit' },
                },
                {
                  field: 'workdayOvertimeCoefficient',
                  title: '工作日加班倍数',
                  editRender: { enabled: true },
                  slots: { edit: 'workdayOvertimeCoefficient_edit' },
                },
                {
                  field: 'dayOffOvertimeCoefficient',
                  title: '休息日加班倍数',
                  editRender: { enabled: true },
                  slots: { edit: 'dayOffOvertimeCoefficient_edit' },
                },
                {
                  field: 'legalDayOffOvertimeCoefficient',
                  title: '法定休假日加班倍数',
                  editRender: { enabled: true },
                  slots: { edit: 'legalDayOffOvertimeCoefficient_edit' },
                },
              ]"
            >
              <template #taxrate_edit="{ row }">
                <nw-dic
                  :selectOptions="{ 'consistent-menu-width': false }"
                  dictCode="rate"
                  v-model:value="row.taxrate"
                  v-model:label="row.taxrateName"
                  size="small"
                  placeholder="请选择税率"
                />
              </template>
              <template #invoiceType_edit="{ row }">
                <nw-dic
                  :selectOptions="{ 'consistent-menu-width': false }"
                  dictCode="invoice_type"
                  v-model:value="row.invoiceType"
                  v-model:label="row.invoiceTypeName"
                  size="small"
                  placeholder="请选择发票类型"
                />
              </template>
              <template #invoiceType_view="{ row }">
                {{ row.invoiceTypeName }}
              </template>
              <template #workHourAmount_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.workHourAmount"
                ></n-input-number>
              </template>
              <template #overtimeHourAmount_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.overtimeHourAmount"
                ></n-input-number>
              </template>
              <template #workdayOvertimeCoefficient_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.workdayOvertimeCoefficient"
                ></n-input-number>
              </template>
              <template #dayOffOvertimeCoefficient_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.dayOffOvertimeCoefficient"
                ></n-input-number>
              </template>
              <template #legalDayOffOvertimeCoefficient_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.legalDayOffOvertimeCoefficient"
                ></n-input-number>
              </template>
            </NwFieldGrid>
          </n-form-item-gi>

          <n-form-item-gi
            :span="24"
            label=""
            path=""
            v-if="dataPermits.purchasePrice !== FormPermissionEnum.HIDE"
          >
            <h5 class="card-title">单价信息</h5>
          </n-form-item-gi>
          <n-form-item-gi
            class="LFormTable"
            :span="24"
            path="purchasePrice"
            v-if="dataPermits.purchasePrice !== FormPermissionEnum.HIDE"
          >
            <!-- :ref="d => gridRefs.push(d)" -->
            <NwFieldGrid
              :ref="(d: any) => gridRefs['purchasePrice'] = d"
              v-model:value="dataModel.purchasePriceList"
              style="width: 100%"
              :rules="gridRules['purchasePrice']"
              :data-permits="gridDataPermits['purchasePrice']"
              :editEnabled="dataModel.isEditPurchasePrice"
              :columns="[
                {
                  field: 'outerDisciplineName',
                  title: '岗位名称',
                  editRender: { enabled: true },
                  slots: { edit: 'outerDisciplineName_edit' },
                },
                {
                  field: 'restMode',
                  title: '休息方式',
                  editRender: { enabled: true },
                  slots: { edit: 'restMode_edit', default: 'restMode_view' },
                },
                {
                  field: 'unit',
                  title: '单位',
                  editRender: { enabled: true },
                  slots: { edit: 'unit_edit', default: 'unit_view' },
                },
                {
                  field: 'price',
                  title: '价格',
                  editRender: { enabled: true },
                  slots: { edit: 'price_edit' },
                },
              ]"
            >
              <template #outerDisciplineName_edit="{ row }">
                <nw-dic
                  :selectOptions="{ 'consistent-menu-width': false }"
                  dictCode="post"
                  v-model:value="row.outerDisciplineId"
                  v-model:label="row.outerDisciplineName"
                  size="small"
                  placeholder="请选择岗位"
                />
              </template>
              <template #restMode_edit="{ row }">
                <n-select
                  placeholder="请选择"
                  v-model:value="row.restMode"
                  :options="RestModeOptions"
                />
              </template>
              <template #restMode_view="{ row }">
                {{ RestModeArry[row.restMode] }}
              </template>
              <template #unit_edit="{ row }">
                <n-select
                  placeholder="请选择"
                  v-model:value="row.unit"
                  :options="UnitOptions"
                />
              </template>
              <template #unit_view="{ row }">
                {{ UnitArry[row.unit] }}
              </template>
              <template #price_edit="{ row }">
                <n-input-number
                  placeholder="请输入"
                  :min="1"
                  v-model:value="row.overtimeHourAmount"
                ></n-input-number>
              </template>
            </NwFieldGrid>
          </n-form-item-gi>
        </n-grid>
      </n-card>
    </n-form>
  </n-scrollbar>
  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>