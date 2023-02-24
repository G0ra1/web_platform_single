<script lang="ts" setup>
import { watch, ref, onMounted } from 'vue'
import {
    NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber, NGrid, NFormItemGi, useMessage, NTabs,
    NTabPane, NButton
} from "naive-ui";
import { FormModal, taxRateList } from "./App";
import { FormPermissionEnum, NwDic, NwIcon } from "@platform/main"
import assetsPick from './assetsPick/index.vue'
import {
    dataChangeEvent,
    editIemRow,
    detailTable,
    addAsset,
    callbackSetItem,
    activeItemType,
    delIemRow,
    initData,
    tabsChange
} from "./itemtable.js";
import { dictItemLists } from './api'
const { formRef, dataModel, rules, dataPermits } = new FormModal();
const itemListMap = ref<{ [a: string]: any }>({});
const unitList = ref<Array<{ [a: string]: any }>>([]);
const assetsPickRef = ref()
initData(dataModel, itemListMap, unitList, assetsPickRef);

watch(
    () => dataModel.value.itemType,
    (d) => {
        console.log(dataModel.value.itemType, dataModel.value.itemTypeName);
        if (!activeItemType.value) {
            activeItemType.value = d[0];
        }
    }
);
onMounted(() => {
    dictItemLists("ASSETS_TAX_RATE").then((res) => {
        taxRateList.value = res;
    });
});
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi span="24" label="编号" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input placeholder="编号" v-model:value="dataModel.code"
                    :disabled="dataPermits.code === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="申请人" path="applyUserName"
                v-if="dataPermits.applyUserName !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请人" v-model:value="dataModel.applyUserName"
                    :disabled="dataPermits.applyUserName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="申请人机构" path="applyUserOrgName"
                v-if="dataPermits.applyUserOrgName !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请人机构" v-model:value="dataModel.applyUserOrgName"
                    :disabled="dataPermits.applyUserOrgName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="申请人部门" path="applyUserDeptName"
                v-if="dataPermits.applyUserDeptName !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请人部门" v-model:value="dataModel.applyUserDeptName"
                    :disabled="dataPermits.applyUserDeptName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="申请时间" path="applyTime"
                v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请时间" v-model:value="dataModel.applyTime"
                    :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="合计金额" path="sumTotalAmount"
                v-if="dataPermits.sumTotalAmount !== FormPermissionEnum.HIDE">
                <n-input-number placeholder="合计金额" v-model:value="dataModel.sumTotalAmount"
                    :disabled="dataPermits.sumTotalAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="合计金额-未税" path="sumTotalUntaxedAmount"
                v-if="dataPermits.sumTotalUntaxedAmount !== FormPermissionEnum.HIDE">
                <n-input-number placeholder="合计金额-未税" v-model:value="dataModel.sumTotalUntaxedAmount"
                    :disabled="dataPermits.sumTotalUntaxedAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="合计金额-税额" path="sumTotalTaxAmount"
                v-if="dataPermits.sumTotalTaxAmount !== FormPermissionEnum.HIDE">
                <n-input-number placeholder="合计金额-税额" v-model:value="dataModel.sumTotalTaxAmount"
                    :disabled="dataPermits.sumTotalTaxAmount === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="合计申请数量" path="sumTotalNumber"
                v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
                <n-input-number placeholder="合计申请数量" v-model:value="dataModel.sumTotalNumber"
                    :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="申请类型" path="itemType"
                v-if="dataPermits.itemType !== FormPermissionEnum.HIDE">
                <NwDic dictCode="asset_type" v-model:value="dataModel.itemType" v-model:label="dataModel.itemTypeName"
                    isSort type="checkbox" :disabled="dataPermits.itemTypeName === FormPermissionEnum.READONLY"></NwDic>
            </n-form-item-gi>
            <n-form-item-gi span="24" label="说明" path="explanation"
                v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
                <n-input placeholder="说明" v-model:value="dataModel.explanation"
                    :disabled="dataPermits.explanation === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi span="24" label="附件ids" path="fileIds"
                v-if="dataPermits.fileIds !== FormPermissionEnum.HIDE">
                <n-input placeholder="附件ids" v-model:value="dataModel.fileIds"
                    :disabled="dataPermits.fileIds === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="" path=""
                v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0">
                <h5 class="card-title">物资计划信息</h5>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="" path=""
                v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0">
                <n-tabs class="card-tabs" :default-value="
    dataModel.itemTypeName ? dataModel.itemTypeName[0] : ''
" size="large" animated style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
                    :on-update:value="tabsChange">
                    <n-tab-pane v-for="item in dataModel.itemTypeName" :key="item" :name="item" :tab="item">
                    </n-tab-pane>
                </n-tabs>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="" path=""
                v-if="dataModel.itemTypeName && dataModel.itemTypeName.length > 0">
                <div style="width: 100%">
                    <span style="height: 24px; line-height: 24px">物资信息</span>
                    <n-button style="height: 24px;width: 24px;line-height: 24px;margin-left: 10px;"
                        @click="() => { addAsset(); }" circle type="info">
                        <nw-icon name="icon-n-y-add" :size="15" />
                    </n-button>
                    <vxe-table ref="detailTable" show-overflow border :data="itemListMap[activeItemType]"
                        :column-config="{ resizable: true }" :edit-config="{
    trigger: 'click',
    mode: 'row',
    enabled: true,
    showIcon: true,
}" @cell-click="editIemRow">
                        <vxe-column type="seq" title="序号" width="60"></vxe-column>
                        <vxe-column field="itemName" width="135" title="物项名称">
                        </vxe-column>
                        <vxe-column field="itemCode" width="135" title="物项编码">
                        </vxe-column>
                        <vxe-column field="unitName" title="计量单位" width="135" :edit-render="{}">
                            <template #edit="{ row }">
                                <vxe-select v-model="row.unitName" transfer>
                                    <vxe-option v-for="item in unitList" :key="item.unitName" :value="item.unitName"
                                        :label="item.unitName"></vxe-option>
                                </vxe-select>
                            </template>
                        </vxe-column>
                        <vxe-column field="applyNumber" title="申请数量" :edit-render="{}" width="135">
                            <template #edit="{ row, column }">
                                <vxe-input v-model="row.applyNumber" type="text"
                                    @change="dataChangeEvent({ row, column })"></vxe-input>
                            </template>
                        </vxe-column>
                        <vxe-column field="applyAmount" width="135" title="单价" :edit-render="{}">
                            <template #edit="{ row, column }">
                                <vxe-input v-model="row.applyAmount" type="text"
                                    @change="dataChangeEvent({ row, column })"></vxe-input>
                            </template>
                        </vxe-column>
                        <vxe-column field="taxRate" width="135" title="税率" :edit-render="{}">
                            <template #edit="{ row, column }">
                                <vxe-select v-model="row.taxRate" @change="dataChangeEvent({ row, column })" transfer>
                                    <vxe-option v-for="(item) in taxRateList" :key="item.dictItemCode"
                                        :value="item.dictItemCode" :label="item.dictItemName"></vxe-option>
                                </vxe-select>
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.taxRate ? row.taxRate + "%" : "" }}</span>
                            </template>
                        </vxe-column>
                        <vxe-column field="applySumAmount" width="135" title="总价">
                        </vxe-column>
                        <vxe-column field="explanation" width="135" title="备注" :edit-render="{}">
                            <template #edit="{ row, column }">
                                <vxe-input v-model="row.explanation" type="text"></vxe-input>
                            </template>
                        </vxe-column>
                        <vxe-column title="操作" fixed="right" show-overflow width="135">
                            <template #default="{ row }">
                                <span style="cursor: pointer; color: #e62525;margin-right: 15px;font-size: 12px;"
                                    @click="() => { delIemRow(row); }">删除1</span>
                            </template>
                        </vxe-column>
                    </vxe-table>
                </div>
            </n-form-item-gi>
        </n-grid>
    </n-form>
    <assetsPick ref="assetsPickRef" @update:callback="callbackSetItem"></assetsPick>
</template>