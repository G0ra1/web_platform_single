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
                    <NwFunctionPredefine code="labourVirtualPurchaseLinkExtendFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.purchaseLinkId || ''" @update:value="(d: string) => filterData.purchaseLinkId = d"
                            placeholder="关联虚拟订单id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.taxrateName || ''" @update:value="(d: string) => filterData.taxrateName = d"
                            placeholder="税率" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.taxrate || ''" @update:value="(d: string) => filterData.taxrate = d"
                            placeholder="税率" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.invoiceTypeName || ''" @update:value="(d: string) => filterData.invoiceTypeName = d"
                            placeholder="发票类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.invoiceType || ''" @update:value="(d: string) => filterData.invoiceType = d"
                            placeholder="发票类型" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请日期" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.workHourAmount || ''" @update:value="(d: string) => filterData.workHourAmount = d"
                            placeholder="工时时薪" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.overtimeHourAmount || ''" @update:value="(d: string) => filterData.overtimeHourAmount = d"
                            placeholder="加班时薪" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.workdayOvertimeCoefficient || ''" @update:value="(d: string) => filterData.workdayOvertimeCoefficient = d"
                            placeholder="工作日加班倍数" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.dayOffOvertimeCoefficient || ''" @update:value="(d: string) => filterData.dayOffOvertimeCoefficient = d"
                            placeholder="休息日加班倍数" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.legalDayOffOvertimeCoefficient || ''" @update:value="(d: string) => filterData.legalDayOffOvertimeCoefficient = d"
                            placeholder="法定休假日加班倍数" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractname || ''" @update:value="(d: string) => filterData.contractname = d"
                            placeholder="合同名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractcode || ''" @update:value="(d: string) => filterData.contractcode = d"
                            placeholder="合同code" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.partaname || ''" @update:value="(d: string) => filterData.partaname = d"
                            placeholder="甲方单位" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.planId || ''" @update:value="(d: string) => filterData.planId = d"
                            placeholder="需求计划id" :style="{ width: '150px' }" style="margin-right: 10px" />
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