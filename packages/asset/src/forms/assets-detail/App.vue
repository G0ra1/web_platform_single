<script lang="ts" setup>
import { NForm, NInput, NFormItemGi, NGrid, NScrollbar, NDivider } from "naive-ui";
import { SearchOutline } from '@vicons/ionicons5';
import { NwEmployeePick } from "@platform/main";
import { FormModal } from "./App";
import warehousePick from "../../components/warehousePick/index.vue";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";
const { formRef, dataModel, rules } = new FormModal();

</script>
<template>
    <n-scrollbar style="max-height: 100%">
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="8" label="分类编码">
                    {{ dataModel.classifyCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="分类名称">
                    {{ dataModel.classifyName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资编码">
                    {{ dataModel.itemCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资名称">
                    {{ dataModel.itemName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资长描述">
                    {{ dataModel.desclong }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资短描述">
                    {{ dataModel.descshort }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资分类全路径">
                    {{ dataModel.routeName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资单位编码">
                    {{ dataModel.unitCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资单位名称">
                    {{ dataModel.unitName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资材质">
                    {{ dataModel.materialQuality }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资标准">
                    {{ dataModel.standard }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资规格">
                    {{ dataModel.specs }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产编号">
                    <n-input placeholder="资产编号" v-model:value="dataModel.assetsCode" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产自编码">
                    <n-input placeholder="资产自编码" v-model:value="dataModel.assetSelfCode" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="财务编码">
                    <n-input placeholder="财务编码" v-model:value="dataModel.assetFinanceCode" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产所属机构">
                    {{ dataModel.assetOrgName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产所属部门">
                    {{ dataModel.assetDeptName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产所属人">
                    <!-- {{ dataModel.assetUserName }} -->
                    <n-input placeholder="使用人" v-model:value="dataModel.assetUserName" :disabled="true" />
                    <NwEmployeePick :value="dataModel.assetUserId" :expreParamValueText="dataModel.assetUserName"
                        @updateExpreParamValueText="(value: any) => dataModel.assetUserName = value"
                        @updateValue="(value: any) => dataModel.assetUserId = value" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用人所在机构">
                    {{ dataModel.useUserOrgName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用人所在部门">
                    {{ dataModel.useUserOrgName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用人">
                    <n-input placeholder="使用人" v-model:value="dataModel.useUserName" :disabled="true" />
                    <!-- <n-space justify="end">
                        <n-button ghost quaternary>
                            <n-icon size="24" style="margin:0 auto">
                                <SearchOutline />
                            </n-icon>
                        </n-button>
                    </n-space> -->
                    <NwEmployeePick :value="dataModel.useUserId" :expreParamValueText="dataModel.useUserName"
                        @updateExpreParamValueText="(value: any) => dataModel.useUserName = value"
                        @updateValue="(value: any) => dataModel.useUserId = value" />
                </n-form-item-gi>
                <!-- <n-form-item-gi :span="8" label="资产分类编码">
                    {{ dataModel.classifyTypeCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产分类名称">
                    {{ dataModel.classifyTypeName }}
                </n-form-item-gi> -->
                <n-form-item-gi :span="8" label="仓库地点">
                        <warehousePick  v-model:id="dataModel.warehouseId" v-model:value="dataModel.warehouseName" :orgId="dataModel.assetOrgId"/>
                    <!-- <n-input placeholder="仓库地点" v-model:value="dataModel.warehouseName" /> -->
                    <!-- {{ dataModel.warehouseName }} -->
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="货架号">
                    <!-- {{ dataModel.shelfName }} -->
                        <warehouseShelfPick v-model:id="dataModel.shelfId" v-model:value="dataModel.shelfName" :warehouseId="dataModel.warehouseId"/>
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="供应商">
                    {{ dataModel.supplierName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="合同号">
                    {{ dataModel.contractCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="订单编号">
                    {{ dataModel.orderCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="发票号">
                    {{ dataModel.billCodes }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="资产标签">
                    {{ dataModel.assetsLabel }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="质保等级">
                    {{ dataModel.qualityAssuranceLevel }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="生产商">
                    {{ dataModel.manufacturer }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="生产日期">
                    {{ dataModel.productionDate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用年限">
                    {{ dataModel.serviceLife }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="有效期">
                    {{ dataModel.validPeriod }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="验收日期">
                    {{ dataModel.acceptanceDate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="出厂日期">
                    {{ dataModel.factoryDate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="出厂编号">
                    {{ dataModel.factoryCode }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="进场日期">
                    {{ dataModel.approachDate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="入账日期">
                    {{ dataModel.rzDate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="税率">
                    {{ dataModel.taxRate }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="总数量">
                    {{ dataModel.assetsNumber }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值单价">
                    {{ dataModel.assetsAmount }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值单价-未税">
                    {{ dataModel.assetsUntaxedAmount }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值税额">
                    {{ dataModel.assetsTaxAmount }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值总价">
                    {{ dataModel.assetsSumAmount }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值总价-未税">
                    {{ dataModel.assetsSumUntaxedAmount }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资原值总税额">
                    {{ dataModel.assetsSumTaxAmount }}
                </n-form-item-gi>
                
                <n-form-item-gi :span="8" label="物资类型">
                    {{ dataModel.itemType }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="物资来源">
                    {{ dataModel.assetSource }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="序列号">
                    {{ dataModel.seriesNumber }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="采购登记人">
                    {{ dataModel.registerUserName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="验收人">
                    {{ dataModel.acceptUserName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用机构">
                    {{ dataModel.useUserOrgName }}
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="使用部门">
                    {{ dataModel.useUserDeptName }}
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>

</template>