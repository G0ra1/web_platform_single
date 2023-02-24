<script lang="ts" setup>
import {  NwIcon, NwFunctionPredefine, NwPickAny, NwFieldGrid, NwDic,} from "@platform/main";
import {  NForm,  NInput,  NFormItem, NDivider, NSwitch, NText,  NInputNumber,  NGradientText,  NSelect,  NGrid,  NFormItemGi,  NDatePicker,  NCard,  NScrollbar,} from "naive-ui";
import { FormModal,purchaseNameOptions,purchaseCodeOptions,purchasePartanameOptions,purchasePartbnameOptions,purchasesubtypeOptions,outerDisciplineNameOptions } from "./App";
import {  RestModeOptions,  RestModeArry,  UnitOptions,  UnitArry,  InvoiceInfoColumn,  UnitInfoColumn,PurchaseColumns} from "./constant";
import { FormPermissionEnum } from "@platform/main";
const {  formRef,  dataModel,  rules,  dataPermits,  purchaseByContractId,  gridRefs,  gridRules,  gridDataPermits,} = new FormModal();
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form ref="formRef"  :model="dataModel"  :rules="rules" size="medium"  label-placement="left"  label-width="auto"  require-mark-placement="right-hanging"  style="padding: 20px 30px">
      <n-card title="基本信息">
        <n-grid :cols="24" :x-gap="24">

          <n-form-item-gi :span="8" label="需求计划名称:">
            <n-gradient-text type="info">{{  dataModel.planName  }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求计划名称:" style="display:none">
            <n-gradient-text type="info">{{  dataModel.planId  }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="9" label="虚拟订单名称:">
            <n-gradient-text type="info">{{  dataModel.virtualPurchaseName  }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="9" label="虚拟订单id:" style="display:none">
            <n-gradient-text type="info">{{  dataModel.virtualPurchaseId  }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="9" label="虚拟订单code:" style="display:none">
            <n-gradient-text type="info">{{  dataModel.virtualPurchaseCode  }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="" path="">
            <h5 class="card-title">
              合同信息
              <NwPickAny style="padding: 0px 50px"  rowKey="contractcode"  button-label="选择采购合同"  modal-title="采购合同"  :value="dataModel.contractPurchaseCode"  isSingle
                @update:value="
                  (d) => {
                    dataModel.contractPurchaseName = d.contractname;
                    dataModel.contractPurchaseId = d.id;
                    dataModel.contractPurchaseCode = d.contractcode;
                    purchaseByContractId(d.id, d);
                  }
                "
                :gridColumns="PurchaseColumns"
                requestUrl="/purchasecontract/purchase/contract/querycontract"
                requestMethod="post"
              >
                <template #search="{ searchData }">
                  <n-form label-placement="left" :show-feedback="false" inline>
                    <n-form-item label="合同名称:">
                      <n-input v-model:value="searchData.contractname" placeholder="合同名称" size="medium" />
                    </n-form-item>
                    <n-form-item label="合同编码:">
                      <n-input v-model:value="searchData.contractcode" placeholder="合同编码" size="medium" />
                    </n-form-item>
                    <n-form-item label="甲方:">
                      <n-select
                            placeholder="甲方"
                            :consistent-menu-width="false"
                            :value="searchData.partaname || ''"
                            :options="purchasePartanameOptions"
                            @update:value="(d)=>{searchData.partaname = d }"
                            :style="{
                                width: '80px' 
                            }"
                            @select="(d)=>{}"
                        >
                        </n-select> 
                    </n-form-item>
                    <n-form-item label="乙方:">
                      <n-select
                            placeholder="乙方"
                            :consistent-menu-width="false"
                            :value="searchData.partbname || ''"
                            :options="purchasePartbnameOptions"
                            @update:value="(d)=>{searchData.partbname = d }"
                            :style="{
                                width: '80px' 
                            }"
                            @select="(d)=>{}"
                        >
                        </n-select> 
                    </n-form-item>
                    <n-form-item label="合同类型:">
                      <n-select
                            placeholder="合同类型"
                            :consistent-menu-width="false"
                            :value="searchData.purchasesubtype || ''"
                            :options="purchasesubtypeOptions"
                            @update:value="(d)=>{searchData.purchasesubtype = d }"
                            :style="{
                                width: '80px' 
                            }"
                            @select="(d)=>{}"
                        >
                        </n-select> 
                    </n-form-item>
                  </n-form>
                </template>
              </NwPickAny>
            </h5>
          </n-form-item-gi>
          <n-form-item-gi :span="12" class="LFormTable" label="合同名称">
            <n-input v-model:value="dataModel.contractPurchaseName" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" class="LFormTable" label="合同编号">
            <n-input v-model:value="dataModel.contractPurchaseCode" />
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
          <n-form-item-gi  :span="24"  label=""  path=""  v-if="dataPermits.purchaseExtend !== FormPermissionEnum.HIDE" >
            <h5 class="card-title">发票信息</h5>
          </n-form-item-gi>
          <n-form-item-gi  class="LFormTable"  :span="24"  path="labourVirtualPurchaseLinkExtendList"  v-if="dataPermits.labourVirtualPurchaseLinkExtendList !== FormPermissionEnum.HIDE">
            <NwFieldGrid
              :ref="(d) => gridRefs['labourVirtualPurchaseLinkExtendList'] = d"
              v-model:value="dataModel.labourVirtualPurchaseLinkExtendList"
              style="width: 100%"
              :rules="gridRules['labourVirtualPurchaseLinkExtendList']"
              :editEnabled="dataModel.isEditPurchaseExtend"
              :is-readonly="
                dataModel.labourVirtualPurchaseLinkExtendList  ? dataModel.labourVirtualPurchaseLinkExtendList.length > 0  : false"
              :data-permits="gridDataPermits['labourVirtualPurchaseLinkExtendList']"
              :columns="InvoiceInfoColumn"
            >
              <template #taxrate_edit="{ row }">
                <nw-dic :selectOptions="{ 'consistent-menu-width': false }"  dictCode="rate"  v-model:value="row.taxrate"  v-model:label="row.taxrateName"  size="small"  placeholder="请选择税率"/>
              </template>
              <template #invoiceType_edit="{ row }">
                <nw-dic  :selectOptions="{ 'consistent-menu-width': false }"  dictCode="invoice_type"  v-model:value="row.invoiceType"  v-model:label="row.invoiceTypeName"  size="small" placeholder="请选择发票类型"/>
              </template>
              <template #invoiceType_view="{ row }">
                {{ row.invoiceTypeName }}
              </template>
              <template #workHourAmount_edit="{ row }">
                <nw-dic  :selectOptions="{ 'consistent-menu-width': false }"  dictCode="hourlyWage"  v-model:value="row.workHourAmount"  v-model:label="row.workHourAmountCode"   size="small" placeholder="请选择工时时薪"/>
                <!-- <n-input-number  placeholder="请输入"   :min="1" v-model:value="row.workHourAmount"></n-input-number> -->
              </template>
              <template #overtimeHourAmount_edit="{ row }">
                <n-input-number  placeholder="请输入" :min="1"  v-model:value="row.overtimeHourAmount"></n-input-number>
              </template>
              <template #workdayOvertimeCoefficient_edit="{ row }">
                <n-input-number placeholder="请输入" :min="1"  v-model:value="row.workdayOvertimeCoefficient"></n-input-number>
              </template>
              <template #dayOffOvertimeCoefficient_edit="{ row }">
                <n-input-number  placeholder="请输入" :min="1"  v-model:value="row.dayOffOvertimeCoefficient"></n-input-number>
              </template>
              <template #legalDayOffOvertimeCoefficient_edit="{ row }">
                <n-input-number  placeholder="请输入"  :min="1"  v-model:value="row.legalDayOffOvertimeCoefficient"  ></n-input-number>
              </template>
            </NwFieldGrid>
          </n-form-item-gi>

          <n-form-item-gi  :span="24"  label=""  path=""  v-if="dataPermits.labourVirtualPurchaseLinkPriceList !== FormPermissionEnum.HIDE">
            <h5 class="card-title">单价信息</h5>
          </n-form-item-gi>
          <n-form-item-gi  class="LFormTable"  :span="24"  path="labourVirtualPurchaseLinkPriceList"  v-if="dataPermits.labourVirtualPurchaseLinkPriceList !== FormPermissionEnum.HIDE">
            <!-- :ref="d => gridRefs.push(d)" -->
            <NwFieldGrid
              :ref="(d) => gridRefs['labourVirtualPurchaseLinkPriceList'] = d"
              v-model:value="dataModel.labourVirtualPurchaseLinkPriceList"
              style="width: 100%"
              :rules="gridRules['labourVirtualPurchaseLinkPriceList']"
              :data-permits="gridDataPermits['labourVirtualPurchaseLinkPriceList']"
              :editEnabled="dataModel.isEditPurchasePrice"
              :columns="UnitInfoColumn"

            >
              <template #outerDisciplineName_edit="{ row }">
                <n-select placeholder="人员类型" :value="row.outerDisciplineId || ''" :options="outerDisciplineNameOptions"  @update:value="(d,obj:any)=>{row.outerDisciplineName = obj.label;row.outerDisciplineId = obj.value}"  @select="(d)=>{}">
                </n-select>
                <!-- <nw-dic  :selectOptions="{ 'consistent-menu-width': false }" dictCode="post" v-model:value="row.outerDisciplineName"  v-model:label="row.outerDisciplineName"  size="small"  placeholder="请选择岗位"/> -->
              </template>
              <template #restMode_edit="{ row }">
                <n-select  placeholder="请选择"  v-model:value="row.restMode"  :options="RestModeOptions"/>
              </template>
              <template #restMode_view="{ row }">
                {{ RestModeArry[row.restMode] }}
              </template>
              <template #unit_edit="{ row }">
                <n-select  placeholder="请选择"  v-model:value="row.unit"  :options="UnitOptions"/>
              </template>
              <template #unit_view="{ row }">
                {{ UnitArry[row.unit] }}
              </template>
              <template #price_edit="{ row }">
                <n-input-number  placeholder="请输入"  :min="1"  v-model:value="row.price"></n-input-number>
              </template>
              <template #price_view="{ row }">
                {{ row.price }}
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