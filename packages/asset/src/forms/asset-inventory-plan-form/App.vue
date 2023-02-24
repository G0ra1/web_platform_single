<script lang="ts" setup>
import { NForm, NInput, NGrid, NFormItemGi, NFormItem, NDivider, NSwitch, NText,NSpace, NSelect,
         NInputNumber,NDatePicker,NScrollbar, NButton } from "naive-ui";
import { FormModal  } from "./App";
import { NwFieldGrid } from "@platform/main";
import { ref, nextTick } from 'vue';
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
import SelAssetList from "../../components/double-list/index.vue";
import InventoryPlanDetail from "./detailModel";

const { formRef, dataModel, rules, dataPermits, columns, assetList, inventoryTypeOptions,inventoryTypeChange } = new FormModal();
const isFaaa = ref<boolean>(false);
const detailListShow = ref<boolean>(false);
const choose = () => {
    detailListShow.value = !detailListShow.value;
};
const callAsset = (data: Array<any>) => {
    console.log("data ==== {}",data)
    dataModel.value.detailList = data.map((item) => {
            console.log("assetsId => {}",item.assetsId);
            item.assetsDetailId = item.id;
            item.paperNumber = item.assetsNumber;
            if(!item.useUserId){
                item.useUserId = dataModel.value.createUserId;
                item.useUserName = dataModel.value.createUserName;
                item.useUserOrgId = dataModel.value.createUserParentOrgId;
                item.useUserOrgName = dataModel.value.createUserParentOrgName;
                item.useUserDeptId = dataModel.value.createUserParentDeptId;
                item.useUserDeptName = dataModel.value.createUserParentDeptName;
            }
            delete item.id;
            delete item.createUserId;
            delete item.createUserName;
            delete item.createUserParentOrgId;
            delete item.createUserParentOrgName;
            delete item.createUserParentDeptId;
            delete item.createUserParentDeptName;
            return new InventoryPlanDetail(item);
        }
    )
    console.log("detailList ==== {}",dataModel.value.detailList)
}

</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" 
    label-placement="left" label-width="auto"
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
                <n-input placeholder="申请日期" v-model:value="dataModel.applyTime" 
                    :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY" clearable/>
            
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="盘点年度" path="inventoryYear" v-if="dataPermits.inventoryYear !== FormPermissionEnum.HIDE">
                    <n-date-picker
                        v-model:formatted-value="dataModel.inventoryYear" value-format="yyyy" type="year"
                            :disabled="dataPermits.inventoryYear === FormPermissionEnum.READONLY" clearable/>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="盘点类型" path="inventoryTypeCode" v-if="dataPermits.inventoryTypeCode !== FormPermissionEnum.HIDE">
                <n-select placeholder="盘点类型" v-model:value="dataModel.inventoryTypeCode" :options="inventoryTypeOptions" 
                    @update-value="inventoryTypeChange"
                    :disabled="dataPermits.inventoryTypeCode === FormPermissionEnum.READONLY" clearable />
            </n-form-item-gi>

            
            <!-- <n-form-item-gi :span="12" label="计划总数量" path="sumTotalNumber" v-if="dataPermits.sumTotalNumber !== FormPermissionEnum.HIDE">
                <n-input-number placeholder="计划总数量" v-model:value="dataModel.sumTotalNumber"
                    :disabled="dataPermits.sumTotalNumber === FormPermissionEnum.READONLY" />
            </n-form-item-gi> -->
        </n-grid>
        <!-- <n-form-item label="选择盘点明细">
            <n-button type="primary" size="small" @click="choose">选择盘点明细</n-button>
        </n-form-item>

        <n-form-item label="物资台账-内置组件">
            <n-scrollbar style="max-height: 100%;">
                <NwFieldGrid v-model:value="dataModel.detailList" style="width: 100%" :edit-enabled="true"
                    :columns="columns"
                    :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                    <template #buttons>
                        <SelAssetList v-model:show="detailListShow" :columns="assetList"
                                :value="dataModel.detailList.map((item) => item.assetsDetailId)"
                                :params="dataModel.assetParams" @callback="callAsset" 
                                :url="['/asset/assetAssetsDetail/list','/asset/assetAssetsDetail/getByIds']"/>
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
                    <template #paperNumber="{ row }">
                        {{ row.paperNumber}}
                    </template>
                    <template #useUserName="{ row }">
                        {{ row.useUserName}}
                    </template>
                </NwFieldGrid>
            </n-scrollbar>
        </n-form-item> -->
    </n-form>
    <!-- <n-scrollbar style="max-height: 300px">
        <n-divider dashed>调试信息</n-divider>
        <pre>{{ JSON.stringify(dataModel.detailList.map((item) => `id：${item.id} assetsDetailId：${item.assetsId} itemName：${item.itemName}`), null, 2) }}</pre>
    </n-scrollbar> -->
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>