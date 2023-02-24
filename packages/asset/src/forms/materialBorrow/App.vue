<script lang="ts" setup>
import DoubleList from "../../components/double-list/index.vue";
import { NForm, NInput, NGrid, NFormItemGi, NButton , NScrollbar, useMessage, NInputNumber } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid } from "@platform/main";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum"
import { ref } from "vue";
import { OrgTree, OrgVo } from "@platform/mdm";
import { MyAsset } from "./model";

const form = new FormModal();
const { formRef, dataModel, rules, dataPermits, columns, doubeList} = form;
const orgShow = ref<boolean>(false);
const message = useMessage();
const inventoryShow = ref<boolean>(false);

//选择借出单位按钮
const chooseOrg = () => {
    orgShow.value = !orgShow.value;
}
//选择借出单位详情
const handleChoose = (node: OrgVo) => {
    dataModel.value.borrowOrgId = node.id;
    dataModel.value.borrowOrgName = node.orgName;
};
//选择库存台账按钮
const choose = () => {
    if (!dataModel.value.borrowOrgId) {
        message.error("请选择借出单位");
        return;
    }
    inventoryShow.value = !inventoryShow.value;
};
//库存台账返回值
const callAsset = (data: Array<any>) => {
    dataModel.value.materialBorrowDetailList = data.map((item) => new MyAsset(item))
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
                    <n-input placeholder="申请人" v-model:value="dataModel.createUserName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请人机构" path="createUserParentOrgName">
                    <n-input placeholder="申请人机构" v-model:value="dataModel.createUserParentOrgName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请人部门" path="createUserParentDeptName">
                    <n-input placeholder="申请人部门" v-model:value="dataModel.createUserParentDeptName" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="申请时间" path="createTime">
                    <n-input placeholder="申请时间" v-model:value="dataModel.createTime" disabled/>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="借出单位" path="borrowOrgId" v-if="dataModel.borrowOrgId !== FormPermissionEnum.HIDE">
                    <n-input placeholder="借出单位名称" v-model:value="dataModel.borrowOrgName" disabled/>
                    <n-button type="primary" size="small" @click="chooseOrg">选择单位</n-button>
                    <OrgTree v-model:show="orgShow" ref="orgTreeRef" @choose="handleChoose" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="说明" path="explanation" 
                    v-if="dataPermits.explanation !== FormPermissionEnum.HIDE">
                    <n-input placeholder="说明" v-model:value="dataModel.explanation" type="textarea"/>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="" path="">
                    <h3 class="card-title">借用明细</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-button type="primary" size="small" @click="choose">选择库存台账</n-button>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-scrollbar style="max-height: 300px">
                        <NwFieldGrid v-model:value="dataModel.materialBorrowDetailList" style="width: 100%" :edit-enabled="true"
                            :columns="columns"
                            :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                            <template #buttons>
                                <DoubleList v-model:show="inventoryShow" :columns="doubeList"
                                :value="dataModel.materialBorrowDetailList.map((item) => item.assetsId)"
                                :url="['/asset/assetAssets/list', '/asset/assetAssets/getByIds']"
                                :params="dataModel.assetParams" @callback="callAsset" />
                            </template>
                            <template #itemCode="{ row }">
                                {{ row.itemCode }}
                            </template>
                            <template #itemName="{ row }">
                                {{ row.itemName }}
                            </template>
                            <template #desclong="{ row }">
                                {{ row.desclong }}
                            </template>
                            <template #assetOrgName="{ row }">
                                {{ row.assetOrgName }}
                            </template>
                            <template #assetDeptName="{ row }">
                                {{ row.assetDeptName }}
                            </template>
                            <template #usableNumber="{ row }">
                                {{ row.usableNumber }}
                            </template>
                            <template #borrowNumber="{ row }">
                                <n-input-number
                                    :min="0"
                                    v-model:max="row.usableNumber"
                                    v-model:value="row.borrowNumber"
                                ></n-input-number>
                            </template>
                        </NwFieldGrid>
                    </n-scrollbar>
                </n-form-item-gi>
            </n-grid>
        </n-form>
    </n-scrollbar>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>