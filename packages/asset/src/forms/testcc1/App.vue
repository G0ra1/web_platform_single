<script lang="ts" setup>
import { NForm, NInput, NGrid, NFormItemGi, NFormItem, NDivider, NSwitch, NText,
         NInputNumber,NDatePicker,NScrollbar, NButton } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid } from "@platform/main";
import { ref, nextTick } from 'vue';
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
import SelAssetList from "../../components/double-list/index.vue";
import SelAssetListTest from "../testcc/index.vue";
import AssetInventoryTaskDetail from "./detailModel";

const { formRef, dataModel, rules, dataPermits, columns, assetList } = new FormModal();
const detailListShow = ref<boolean>(false);
const choose = () => {
    // dataModel.value.assetParams.inventoryPlanId = dataModel.value.inventoryPlanId;

    dataModel.value.assetParams.id = '1602172475163578370';
    detailListShow.value = !detailListShow.value;
};
const callAsset = (data: Array<any>) => {
    dataModel.value.detailList = data.map((item) => new AssetInventoryTaskDetail(item))
}

</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="编号" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input v-model:value="dataModel.code"
                    :disabled="dataPermits.code === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="申请单位" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请单位" v-model:value="dataModel.createUserParentOrgName"
                    :disabled="dataPermits.createUserParentOrgName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="申请部门" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input placeholder="申请部门" v-model:value="dataModel.createUserParentDeptName"
                    :disabled="dataPermits.createUserParentDeptName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="申请人" path="code" v-if="dataPermits.code !== FormPermissionEnum.HIDE">
                <n-input placeholder="编号" v-model:value="dataModel.createUserName"
                    :disabled="dataPermits.createUserName === FormPermissionEnum.READONLY" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="申请日期" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE">
                <!-- <n-input placeholder="申请日期" v-model:value="dataModel.applyTime"
                    :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" /> -->
                <!-- <n-date-picker 
                        v-model:formatted-value="dataModel.applyTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                            :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" clearable/> -->
                <n-input placeholder="申请日期" v-model:value="dataModel.applyTime" 
                    :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" clearable/>
            
            </n-form-item-gi>
        </n-grid>

        <n-form-item label="选择盘点明细">
            <n-button type="primary" size="small" @click="choose">选择</n-button>
        </n-form-item>

        <n-form-item label="">
            <n-scrollbar style="max-height: 100%;">
                <!-- :tree-config="{transform: true, rowField: 'id',accordion :true,
                                     parentField: 'assetsId',children:'detailList',reserve:true}" -->
                <NwFieldGrid v-model:value="dataModel.detailList"
                    
                    style="width: 100%" :edit-enabled="true"
                    :columns="columns"
                    :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                    <template #buttons>
                        <!-- <SelDetailList v-model:show="detailListShow" :assetOrgId="dataModel.createUserParentOrgId"
                            v-model:data="dataModel.detailList" /> -->
                        <!-- <SelAssetList v-model:show="detailListShow" :columns="assetList"
                                :dataIds="dataModel.detailList.map((item) => item.assetsId)"
                                :url="['/asset/inventoryPlan/getDetailByIdAndUser']" :params="dataModel.assetParams"
                                @callback="callAsset" /> -->
                            <SelAssetListTest 
                                v-model:show="detailListShow" :columns="assetList"
                                :url="['/asset/materialDeploy/getListist']" :params="dataModel.assetParams"
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
                    <template #materialQuality="{ row }">
                        {{ row.materialQuality}}
                    </template>
                    <template #standard="{ row }">
                        {{ row.standard}}
                    </template>
                    <template #specs="{ row }">
                        {{ row.specs}}
                    </template>
                    <template #stockNumber="{ row }">
                        {{ row.stockNumber}}
                    </template>
                    <template #acceptNumber="{ row }">
                        {{ row.acceptNumber}}
                    </template>
                </NwFieldGrid>
            </n-scrollbar>
        </n-form-item>


    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>