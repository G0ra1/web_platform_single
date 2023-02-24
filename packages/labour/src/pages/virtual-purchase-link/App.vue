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
                    <NwFunctionPredefine code="labourVirtualPurchaseLinkFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.planId || ''" @update:value="(d: string) => filterData.planId = d"
                            placeholder="需求计划id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.planName || ''" @update:value="(d: string) => filterData.planName = d"
                            placeholder="需求计划名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseName || ''" @update:value="(d: string) => filterData.virtualPurchaseName = d"
                            placeholder="虚拟订单名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseCode || ''" @update:value="(d: string) => filterData.virtualPurchaseCode = d"
                            placeholder="虚拟订单code" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseId || ''" @update:value="(d: string) => filterData.virtualPurchaseId = d"
                            placeholder="虚拟订单id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractPurchaseId || ''" @update:value="(d: string) => filterData.contractPurchaseId = d"
                            placeholder="关联采购合同id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractPurchaseCode || ''" @update:value="(d: string) => filterData.contractPurchaseCode = d"
                            placeholder="采购合同code" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractPurchaseName || ''" @update:value="(d: string) => filterData.contractPurchaseName = d"
                            placeholder="采购合同name" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <n-button title="重置" type="warning" @click="refresh()">
                        <template #icon>
                            <nw-icon name="icon-n-y-refresh" />
                        </template>
                    </n-button>
                    <n-button title="导入">
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