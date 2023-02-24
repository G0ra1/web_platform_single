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
                    <NwFunctionPredefine code="labourVirtualPurchaseLinkPriceFormAdd" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.purchaseLinkId || ''" @update:value="(d: string) => filterData.purchaseLinkId = d"
                            placeholder="虚拟订单id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractName || ''" @update:value="(d: string) => filterData.contractName = d"
                            placeholder="合同名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractCode || ''" @update:value="(d: string) => filterData.contractCode = d"
                            placeholder="合同code" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.outerDisciplineId || ''" @update:value="(d: string) => filterData.outerDisciplineId = d"
                            placeholder="专业(规格型号);字典编码outer_discipline" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.outerDisciplineName || ''" @update:value="(d: string) => filterData.outerDisciplineName = d"
                            placeholder="专业名称(规格型号)" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.restMode || ''" @update:value="(d: string) => filterData.restMode = d"
                            placeholder="休息方式;1单休2双休3不休" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.unit || ''" @update:value="(d: string) => filterData.unit = d"
                            placeholder="单位;1人/天2人/月" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.number || ''" @update:value="(d: string) => filterData.number = d"
                            placeholder="数量" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.price || ''" @update:value="(d: string) => filterData.price = d"
                            placeholder="价格" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.priceNotax || ''" @update:value="(d: string) => filterData.priceNotax = d"
                            placeholder="价格不含税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.totalAmount || ''" @update:value="(d: string) => filterData.totalAmount = d"
                            placeholder="总价含税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.totalAmountNotax || ''" @update:value="(d: string) => filterData.totalAmountNotax = d"
                            placeholder="总价不含税" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请日期" :style="{ width: '150px' }" style="margin-right: 10px" />
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