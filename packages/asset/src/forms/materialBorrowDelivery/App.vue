<script lang="ts" setup>
import { NForm, NInput, NGrid, NFormItemGi , NScrollbar, NButton, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid} from "@platform/main";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum"
import { ref } from "vue";
import SelAssetListTest from "../../components/chooseDetailByAsset/index.vue";
import AssetBorrowDeliveryDetail from "./detailModel";

const { formRef, dataModel, rules, dataPermits, columns, assetList, assetDetailColumns, assetDetailList, assetDetailUpdate} = new FormModal();
const sourceData = ref<Array<AssetBorrowDeliveryDetail>>([]);
const borrowShow = ref<boolean>(false);
const choose = () => {
    dataModel.value.assetParams.borrowId = dataModel.value.deployId;
    borrowShow.value = !borrowShow.value;
}
const callAsset = (data: Array<any>) => {
    data.map((item) => {
        if (item.detailList.length > 0) {
            item.assetsId = item.id;
            delete item.id;
            sourceData.value.push(item);
        }
    })
    dataModel.value.detailList = sourceData.value;
}
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
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">出库信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-button type="primary" size="small" @click="choose">选择借用明细</n-button>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-scrollbar style="max-height: 100%;">
                        <NwFieldGrid v-model:value="dataModel.detailList"
                            style="width: 100%" :edit-enabled="true"
                            id="deliveryGrid"
                            :columns="columns"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                            <template #buttons>
                                <SelAssetListTest 
                                    v-model:show="borrowShow" :columns="assetList"
                                    :url="['/asset/materialBorrow/getDeliveryDetailByBorrowId']" :params="dataModel.assetParams"
                                    :title ="'选择明细信息'"
                                    @callback="callAsset" />
                            </template>
                            <template #itemCode="{ row }">
                                {{ row.itemCode}}
                            </template>
                            <template #itemName="{ row }">
                                {{ row.itemName}}
                            </template>
                            <template #desclong="{ row }">
                                {{ row.desclong}}
                            </template>
                            <template #unitCode="{ row }">
                                {{ row.unitCode}}
                            </template>
                            <template #unitName="{ row }">
                                {{ row.unitName}}
                            </template>
                            <template #standard="{ row }">
                                {{ row.standard}}
                            </template>
                            <template #deployNumber="{ row }">
                                {{ row.deployNumber}}
                            </template>
                            <template #deliveryNumber="{ row }">
                                {{ row.deliveryNumber}}
                            </template>
                        </NwFieldGrid>
                    </n-scrollbar>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-scrollbar style="max-height: 100%;">
                        <NwFieldGrid 
                            :value="assetDetailList"
                            style="width: 100%" :edit-enabled="true"
                            :columns="assetDetailColumns"
                            @update:value="assetDetailUpdate"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                            <template #buttons></template>
                            <template #itemCode="{ row }">
                                {{ row.itemCode}}
                            </template>
                            <template #itemName="{ row }">
                                {{ row.itemName}}
                            </template>
                            <template #desclong="{ row }">
                                {{ row.desclong}}
                            </template>
                            <template #unitCode="{ row }">
                                {{ row.unitCode}}
                            </template>
                            <template #unitName="{ row }">
                                {{ row.unitName}}
                            </template>
                            <template #standard="{ row }">
                                {{ row.standard}}
                            </template>
                            <template #assetsNumber="{ row }">
                                {{ row.assetsNumber}}
                            </template>
                            <template #deliveryNumber="{ row }">
                                <n-input-number 
                                :min="0" 
                                :max="row.assetsNumber"
                                v-model:value="row.deliveryNumber"/>
                            </template>
                        </NwFieldGrid>
                    </n-scrollbar>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
    
</template>