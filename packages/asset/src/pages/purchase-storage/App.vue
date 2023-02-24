<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, Page } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    reset({applyId:Page.getMenuData().id})
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    reset({applyId:Page.getMenuData().id})
})

</script>
<template>
    <n-layout has-sider class="nw-layout-full">
        <!-- 右侧内容区 start -->
        <n-layout class="nw-layout-full">
            <!-- 内容区头部 start -->
            <n-layout-header class="nw-layout-header">
                <n-space :size="5" style="padding: 0 5px">
                    <!--放功能按钮的地方-->
                    <NwFunctionPredefine code="assetPurchaseStorageFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.code || ''" @update:value="(d: string) => filterData.code = d"
                            placeholder="申请编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <!-- <n-input :value="filterData.applyUserId || ''" @update:value="(d: string) => filterData.applyUserId = d"
                            placeholder="申请人ID" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserName || ''" @update:value="(d: string) => filterData.applyUserName = d"
                            placeholder="申请人名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserOrgId || ''" @update:value="(d: string) => filterData.applyUserOrgId = d"
                            placeholder="申请人机构ID" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserOrgName || ''" @update:value="(d: string) => filterData.applyUserOrgName = d"
                            placeholder="申请人机构名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserDeptId || ''" @update:value="(d: string) => filterData.applyUserDeptId = d"
                            placeholder="申请人部门ID" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserDeptName || ''" @update:value="(d: string) => filterData.applyUserDeptName = d"
                            placeholder="申请人部门名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalAmount || ''" @update:value="(d: string) => filterData.sumTotalAmount = d"
                            placeholder="合计金额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalUntaxedAmount || ''" @update:value="(d: string) => filterData.sumTotalUntaxedAmount = d"
                            placeholder="合计金额-未税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalTaxAmount || ''" @update:value="(d: string) => filterData.sumTotalTaxAmount = d"
                            placeholder="合计金额-税额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalNumber || ''" @update:value="(d: string) => filterData.sumTotalNumber = d"
                            placeholder="合计申请数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumAcceptanceNumber || ''" @update:value="(d: string) => filterData.sumAcceptanceNumber = d"
                            placeholder="购置验收数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.acceptanceCode || ''" @update:value="(d: string) => filterData.acceptanceCode = d"
                            placeholder="购置验收编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.acceptanceId || ''" @update:value="(d: string) => filterData.acceptanceId = d"
                            placeholder="购置验收Id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.explanation || ''" @update:value="(d: string) => filterData.explanation = d"
                            placeholder="说明" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.purchaseType || ''" @update:value="(d: string) => filterData.purchaseType = d"
                            placeholder="物资购置类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetSource || ''" @update:value="(d: string) => filterData.assetSource = d"
                            placeholder="物项来源" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetSourceName || ''" @update:value="(d: string) => filterData.assetSourceName = d"
                            placeholder="物项来源名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.fileIds || ''" @update:value="(d: string) => filterData.fileIds = d"
                            placeholder="附件ids" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.deployId || ''" @update:value="(d: string) => filterData.deployId = d"
                            placeholder="调拨申请Id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.type || ''" @update:value="(d: string) => filterData.type = d"
                            placeholder="类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.typeName || ''" @update:value="(d: string) => filterData.typeName = d"
                            placeholder="类型名称" :style="{ width: '150px' }" style="margin-right: 10px" /> -->
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <n-button title="重置" type="warning" @click="refresh()">
                        <template #icon>
                            <nw-icon name="icon-n-y-refresh" />
                        </template>
                    </n-button>
                    <!-- <n-button title="导入">
                        <template #icon>
                            <nw-icon name="icon-n-y-import" />
                        </template>
                    </n-button>
                    <n-button title="导出">
                        <template #icon>
                            <nw-icon name="icon-n-y-export" />
                        </template>
                    </n-button>
                    <n-button title="打印" @click="gridRef?.print()">
                        <template #icon>
                            <nw-icon name="icon-n-y-print" />
                        </template>
                    </n-button> -->
                    <n-button>
                        <template #icon>
                            <nw-icon name="icon-n-y-column" />
                        </template>
                    </n-button>
                </n-space>
            </n-layout-header>
            <!-- 内容区头部 end -->
            <!-- 内容区列表 start -->
            <n-layout-content>
                <vxe-grid v-bind="bind" :ref="(d: any) => gridRef = d">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>
</template>