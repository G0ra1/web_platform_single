<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    reset({})
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    reset({})
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
                    <NwFunctionPredefine code="assetMaterialAcceptFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.code || ''" @update:value="(d: string) => filterData.code = d"
                            placeholder="编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <!-- <n-input :value="filterData.applyUserId || ''" @update:value="(d: string) => filterData.applyUserId = d"
                            placeholder="申请人" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserName || ''" @update:value="(d: string) => filterData.applyUserName = d"
                            placeholder="申请人" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserOrgId || ''" @update:value="(d: string) => filterData.applyUserOrgId = d"
                            placeholder="申请人机构" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserOrgName || ''" @update:value="(d: string) => filterData.applyUserOrgName = d"
                            placeholder="申请人机构" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserDeptId || ''" @update:value="(d: string) => filterData.applyUserDeptId = d"
                            placeholder="申请人部门" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserDeptName || ''" @update:value="(d: string) => filterData.applyUserDeptName = d"
                            placeholder="申请人部门" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalAmount || ''" @update:value="(d: string) => filterData.sumTotalAmount = d"
                            placeholder="合计金额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalUntaxedAmount || ''" @update:value="(d: string) => filterData.sumTotalUntaxedAmount = d"
                            placeholder="合计金额-未税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalTaxAmount || ''" @update:value="(d: string) => filterData.sumTotalTaxAmount = d"
                            placeholder="合计金额-税额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.auditSuccessTiem || ''" @update:value="(d: string) => filterData.auditSuccessTiem = d"
                            placeholder="审批通过时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.camundaTaskId || ''" @update:value="(d: string) => filterData.camundaTaskId = d"
                            placeholder="camunda流程任务ID" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.fileIds || ''" @update:value="(d: string) => filterData.fileIds = d"
                            placeholder="附件ids" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.explanation || ''" @update:value="(d: string) => filterData.explanation = d"
                            placeholder="说明" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.taskInstId || ''" @update:value="(d: string) => filterData.taskInstId = d"
                            placeholder="任务实例Id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.parentTaskNodeId || ''" @update:value="(d: string) => filterData.parentTaskNodeId = d"
                            placeholder="父任务节点Id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.taskId || ''" @update:value="(d: string) => filterData.taskId = d"
                            placeholder="当前节点Id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.signNumber || ''" @update:value="(d: string) => filterData.signNumber = d"
                            placeholder="签收数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.notSignNumber || ''" @update:value="(d: string) => filterData.notSignNumber = d"
                            placeholder="未签收数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.distributeNumber || ''" @update:value="(d: string) => filterData.distributeNumber = d"
                            placeholder="派发数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.notDistributeNumber || ''" @update:value="(d: string) => filterData.notDistributeNumber = d"
                            placeholder="未派发数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalNumber || ''" @update:value="(d: string) => filterData.sumTotalNumber = d"
                            placeholder="合计申请数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetUserId || ''" @update:value="(d: string) => filterData.assetUserId = d"
                            placeholder="使用人" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetUserName || ''" @update:value="(d: string) => filterData.assetUserName = d"
                            placeholder="使用人" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetDeptId || ''" @update:value="(d: string) => filterData.assetDeptId = d"
                            placeholder="使用人部门" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetDeptName || ''" @update:value="(d: string) => filterData.assetDeptName = d"
                            placeholder="使用人部门" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetOrgId || ''" @update:value="(d: string) => filterData.assetOrgId = d"
                            placeholder="使用人单位" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.assetOrgName || ''" @update:value="(d: string) => filterData.assetOrgName = d"
                            placeholder="使用人单位" :style="{ width: '150px' }" style="margin-right: 10px" /> -->
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
                    </n-button>
                    <n-button>
                        <template #icon>
                            <nw-icon name="icon-n-y-column" />
                        </template>
                    </n-button> -->
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