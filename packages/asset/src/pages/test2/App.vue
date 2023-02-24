

<script lang="ts" setup>
import DoubleList from "../../components/double-list/index.vue";
import { NForm, NInput, NFormItem, NDivider, NScrollbar, NButton } from "naive-ui";
import { FormModal } from "./App";
import { NwFieldGrid } from "@platform/main";
import { Table as TTable } from "tdesign-vue-next";
import { ref, nextTick } from 'vue';
import { MyAsset, MyAssetDetail } from "./model";
import { OrgTree, OrgVo } from "@platform/mdm";

const form = new FormModal();
const { dataModel, columns, formRef, doubeList, colDetails, doubleListCols, userClos } = form;
const inventoryShow = ref<boolean>(false);
const orgShow = ref<boolean>(false);
const inventoryDetailShow = ref<boolean>(false);
const otherShow = ref<boolean>(false);

const orgTreeRef = ref<typeof OrgTree>();
/**
 * 如果这里提前加载，那么子组件上绑定的属性就不起作用了；
 * 参数如下：
 * 查的层级，如果传值，后台根据层级查，如果不传值，查整棵树，这样做的目的
 * 是为了让前端分步的自动异步请求，让用户感知效果更好；
 * level!: number;
 * 
 * 不传值代表所有，1：组织；2：部门
 * orgType!: number;
 */

nextTick(() => {
    //示例
    orgTreeRef?.value?.initItems();
});

const treeChoose = (node: OrgVo) => {
    dataModel.value.assetOrgId = node.id;
    dataModel.value.assetOrgName = node.orgName;
};

const delAssetDetails = (context: { text: any; row: MyAssetDetail }) => {
    dataModel.value.assetDetailSub = dataModel.value.assetDetailSub.filter(
        (item) => item.assetsDetailId !== context.row.assetsDetailId
    );
};

const callAssetDetails = (data: Array<any>) => {
    dataModel.value.assetDetailSub = data.map((item) => new MyAssetDetail(item))
}
const callAsset = (data: Array<any>) => {
    dataModel.value.assetSub = data.map((item) => new MyAsset(item))
}
const callUser = (data: Array<any>) => {
    console.log("userList:", data);
}

</script>
<template>
    <n-scrollbar style="height: 100%">
        <n-form ref="formRef" size="medium" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-form-item label="组织信息选择" :style="{ width: '500px' }">
                <n-button type="primary" size="small" @click="() => orgShow = !orgShow">选择组织</n-button>
                <!-- <OrgTree v-model:show="orgShow" :org-type="1" :level="2" :expand-level="1" ref="orgTreeRef"
                    @choose="handleChoose" /> -->
                <OrgTree v-model:show="orgShow" ref="orgTreeRef" @choose="treeChoose" />
            </n-form-item>
            <n-form-item label="组织信息显示" :style="{ width: '500px' }">
                {{ dataModel.assetOrgId }} {{ dataModel.assetOrgName }}
            </n-form-item>
            <n-form-item label="选择库存台账">
                <n-button type="primary" size="small" @click="() => inventoryShow = !inventoryShow">选择库存台账</n-button>
            </n-form-item>
            <!-- <n-form-item label="选择其他业务示例">
                <n-button type="primary" size="small" @click="() => otherShow = !otherShow">选择其他业务示例</n-button>
                <DoubleList v-model:show="otherShow" :columns="userClos" :requestUrl="['/main/mdmUser/list',]"
                    :params="dataModel.userParams" @callback="callUser" />
            </n-form-item> -->
            <n-form-item label="物资台账-内置组件">
                <n-scrollbar style="max-height: 300px">
                    <NwFieldGrid v-model:value="dataModel.assetSub" style="width: 1000px" :edit-enabled="true"
                        :columns="columns"
                        :edit-config="{ trigger: 'click', mode: 'row', autoClear: false, showIcon: false }">
                        <template #buttons>
                            <DoubleList v-model:show="inventoryShow" :columns="doubeList"
                                :value="dataModel.assetSub.map((item) => item.assetsId)"
                                :url="['/asset/assetAssets/list', '/asset/assetAssets/getByIds']"
                                :params="dataModel.assetParams" @callback="callAsset" />
                        </template>
                        <template #itemCode="{ row }">
                            <n-input v-model:value="row.itemCode"></n-input>
                        </template>
                        <template #itemName="{ row }">
                            <n-input v-model:value="row.itemName"></n-input>
                        </template>
                        <template #desclong="{ row }">
                            <n-input v-model:value="row.desclong"></n-input>
                        </template>
                        <template #assetOrgName="{ row }">
                            <n-input v-model:value="row.assetOrgName"></n-input>
                        </template>
                        <template #assetDeptName="{ row }">
                            <n-input v-model:value="row.assetDeptName"></n-input>
                        </template>
                    </NwFieldGrid>
                </n-scrollbar>
            </n-form-item>

            <n-form-item label="选择库存明细账">
                <n-button type="primary" size="small"
                    @click="() => inventoryDetailShow = !inventoryDetailShow">选择库存明细账</n-button>
            </n-form-item>
            <DoubleList v-model:show="inventoryDetailShow" :columns="doubleListCols"
                :value="dataModel.assetDetailSub.map((item) => item.assetsDetailId)"
                :url="['/asset/assetAssetsDetail/list', '/asset/assetAssetsDetail/getByIds']"
                :params="dataModel.assetDetailParams" @callback="callAssetDetails" />
            <n-form-item label="物资明细账" :style="{ width: '1600px' }">
                <t-table :data="dataModel.assetDetailSub" :columns="colDetails" :row-key="'id'" bordered stripe
                    size="small">
                    <template #operation="slotProps">
                        <NButton type="primary" size="tiny" secondary @click="delAssetDetails(slotProps)">删除
                        </NButton>
                    </template>
                </t-table>
            </n-form-item>
        </n-form>
        <n-scrollbar style="max-height: 300px">
            <n-divider dashed>调试信息</n-divider>
            <pre>{{ JSON.stringify(dataModel.assetDetailSub.map((item) => `id：${item.id} assetsDetailId：${item.assetsDetailId} itemName：${item.itemName}`), null, 2) }}</pre>
        </n-scrollbar>
    </n-scrollbar>

</template>