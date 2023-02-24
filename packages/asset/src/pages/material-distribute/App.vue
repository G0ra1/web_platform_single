<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, Page } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    reset({sourceId : Page.getMenuData().id})
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    reset({sourceId : Page.getMenuData().id})
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
                    <NwFunctionPredefine code="assetMaterialDistributeFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.code || ''" @update:value="(d: string) => filterData.code = d"
                            placeholder="编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <!-- <n-input :value="filterData.sumTotalAmount || ''" @update:value="(d: string) => filterData.sumTotalAmount = d"
                            placeholder="合计金额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalUntaxedAmount || ''" @update:value="(d: string) => filterData.sumTotalUntaxedAmount = d"
                            placeholder="合计金额-未税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalTaxAmount || ''" @update:value="(d: string) => filterData.sumTotalTaxAmount = d"
                            placeholder="合计金额-税额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.type || ''" @update:value="(d: string) => filterData.type = d"
                            placeholder="业务类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.auditSuccessTiem || ''" @update:value="(d: string) => filterData.auditSuccessTiem = d"
                            placeholder="审批通过时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.camundaTaskId || ''" @update:value="(d: string) => filterData.camundaTaskId = d"
                            placeholder="camunda流程任务ID" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.distributeType || ''" @update:value="(d: string) => filterData.distributeType = d"
                            placeholder="派发类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.fileIds || ''" @update:value="(d: string) => filterData.fileIds = d"
                            placeholder="附件ids" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyUserId || ''" @update:value="(d: string) => filterData.applyUserId = d"
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
                        <n-input :value="filterData.sourceId || ''" @update:value="(d: string) => filterData.sourceId = d"
                            placeholder="来源id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sourceCode || ''" @update:value="(d: string) => filterData.sourceCode = d"
                            placeholder="来源code" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.sumTotalNumber || ''" @update:value="(d: string) => filterData.sumTotalNumber = d"
                            placeholder="合计申请数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.notSignNumber || ''" @update:value="(d: string) => filterData.notSignNumber = d"
                            placeholder="未签收数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.status || ''" @update:value="(d: string) => filterData.status = d"
                            placeholder="状态" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.explanation || ''" @update:value="(d: string) => filterData.explanation = d"
                            placeholder="说明" :style="{ width: '150px' }" style="margin-right: 10px" /> -->
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