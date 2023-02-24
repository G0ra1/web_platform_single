<script lang="ts" setup>
import ChooseList from "../../components/double-list/index.vue";
import { NForm, NInput, NGrid, NFormItemGi , NScrollbar, NButton, NInputNumber, NDatePicker } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid,NwDic} from "@platform/main";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum"
import { ref } from "vue";
import PurchaseBorrowStorageDetail from "./detailModel";
import warehousePick from "../../components/warehousePick/index.vue";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";

const { formRef, dataModel, rules, dataPermits, chooseColumns, detailColumns} = new FormModal();
const chooseShow = ref<boolean>(false);
const choose = () => {
    dataModel.value.assetParams.deployId = dataModel.value.deployId;
    chooseShow.value = !chooseShow.value;
}
//回显选择框信息
const callBorrowStorage = (data: Array<any>) => {
    dataModel.value.detailList = data.map((item) => new PurchaseBorrowStorageDetail(item))
}
const styleColumnOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 300,
};
</script>
<template>
    <n-scrollbar style="height:100%;">
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">基本信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="编号" path="code" v-if="dataModel.code !== FormPermissionEnum.HIDE">
                    <n-input placeholder="编号" v-model:value="dataModel.code" :disabled="dataPermits.code ===  FormPermissionEnum.READONLY"/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请人" path="createUserName">
                    <n-input placeholder="申请人" v-model:value="dataModel.applyUserName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请人机构" path="createUserParentOrgName">
                    <n-input placeholder="申请人机构" v-model:value="dataModel.applyUserOrgName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请人部门" path="createUserParentDeptName">
                    <n-input placeholder="申请人部门" v-model:value="dataModel.applyUserDeptName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请时间" path="createTime">
                    <n-input placeholder="申请时间" v-model:value="dataModel.applyTime" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="说明" path="explanation" 
                    v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
                    <n-input placeholder="说明" v-model:value="dataModel.explanation" type="textarea"/>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">入库信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-button type="primary" size="small" @click="choose">选择入库明细</n-button>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <NwFieldGrid v-bind="styleColumnOptions"
                        v-model:value="dataModel.detailList"
                        style="width: 100%" 
                        :edit-enabled="true"
                        :columns="detailColumns"
                        :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: true }">
                            <template #buttons>
                                <ChooseList v-model:show="chooseShow" :columns="chooseColumns"
                                :value="dataModel.detailList.map((item) => item.assetsDetailId)"
                                :url="['/asset/materialBorrowDelivery/getDetailList',
                                        '/asset/materialBorrowDelivery/getDetailByIds']"
                                :params="dataModel.assetParams" @callback="callBorrowStorage" />
                            </template>
                            <template #assetsCode="{ row }">
                                <n-input v-model:value="row.assetsCode"></n-input>
                            </template>
                            <template #itemCode="{ row }">
                                {{ row.itemCode }}
                            </template>
                            <template #classifyTypeName="{ row }">
                                <nw-dic
                                :selectOptions="{ 'consistent-menu-width': false }"
                                dictCode="asset_classify_type"
                                v-model:value="row.classifyTypeName"
                                v-model:label="row.classifyTypeName"
                                size="small"
                                placeholder="请选择资产类型"
                                />
                            </template>
                            <template #itemName="{ row }">
                                {{ row.itemName }}
                            </template>
                            <template #descshort="{ row }">
                                {{ row.descshort }}
                            </template>
                            <template #desclong="{ row }">
                                {{ row.desclong }}
                            </template>
                            <template #specs="{ row }">
                                {{ row.specs }}
                            </template>
                            <template #supplierName="{ row }">
                                <n-input v-model:value="row.supplierName"></n-input>
                            </template>
                            <template #contractCode="{ row }">
                                <n-input v-model:value="row.contractCode"></n-input>
                            </template>
                            <template #billCodes="{ row }">
                                <n-input v-model:value="row.billCodes"></n-input>
                            </template>
                            <template #unitName="{ row }">
                                {{ row.unitName }}
                            </template>
                            <template #deliveryNumber="{ row }">
                                {{ row.deliveryNumber }}
                            </template>
                            <template #storageNumber="{ row }">
                                <n-input-number
                                    :min="0"
                                    v-model:max="row.deliveryNumber"
                                    v-model:value="row.storageNumber"
                                ></n-input-number>
                            </template>
                            <template #storageAmount="{ row }">
                                <n-input-number v-model:value="row.assetsAmount"></n-input-number>
                            </template>
                            <template #storageTaxRate="{ row }">
                                <nw-dic
                                :selectOptions="{ 'consistent-menu-width': false }"
                                dictCode="ASSETS_TAX_RATE"
                                v-model:value="row.storageTaxRate"
                                v-model:label="row.storageTaxRate"
                                size="small"
                                placeholder="请选择税率"
                                />
                            </template>
                            <template #storageTime="{ row }">
                                <n-date-picker
                                v-model:formatted-value="row.storageTime"
                                v-model:value="row.storageTime"
                                type="date"
                                clearable
                                value-format="yyyy-MM-dd "
                                placeholder="请选择日期"
                                />
                            </template>
                            <template #warehouseName="{ row }">
                                <warehousePick
                                v-model:value="row.warehouseName"
                                v-model:id="row.warehouseId"
                                ></warehousePick>
                            </template>
                            <template #shelfName="{ row }">
                                <warehouseShelfPick
                                v-model:value="row.shelfName"
                                :warehouseId="row.warehouseId"
                                :warehouseName="row.warehouseName"
                                v-model:id="row.shelfId"
                                />
                            </template>
                            <template #remark="{ row }">
                                <n-input v-model:value="row.remark"></n-input>
                            </template>
                        </NwFieldGrid>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
    
</template>