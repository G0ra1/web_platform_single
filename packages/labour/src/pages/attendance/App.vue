<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents, checkboxChangeEvent, checkBoxUser } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    reset({})
    checkBoxUser.value = []
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
                    <!-- 新增 -->
                    <NwFunctionPredefine code="labourAttendanceForm_add" :params="paramsArray" />
                    <!-- 批量审批 -->
                    <NwFunctionPredefine code="labourAttendanceForm_batch" :params="checkBoxUser"
                        :disabled="!checkBoxUser.length" />
                    <!-- 批量审批 -->
                    <NwFunctionPredefine code="labourAttendanceForm_batch_test" :params="checkBoxUser"
                        :disabled="!checkBoxUser.length" />
                    <!-- 考核审批 -->
                    <NwFunctionPredefine code="labourAttendanceForm_approve" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-button title="筛选" @click="gridSearchRef?.toggle()">
                        <template #icon>
                            <nw-icon name="icon-n-y-shaixuan" />
                        </template>
                    </n-button>
                    <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" />
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
            <NwGridSearch ref="gridSearchRef" :options="[
                {
                    name: '任务标题',
                    field: 'taskTitle',
                    vtype: 'string',
                },
                {
                    name: '任务名称',
                    field: 'taskName',
                    vtype: 'string',
                },
                {
                    name: '任务类型',
                    field: 'taskType',
                    vtype: 'dic',
                    dictCode: 'asset_type',
                },

            ]">
            </NwGridSearch>
            <!-- 内容区头部 end -->
            <!-- 内容区列表 start -->
            <n-layout-content>
                <vxe-grid v-bind="bind" v-on="gridEvents" ref="gridRef" :stripe="true"
                    @checkbox-change="checkboxChangeEvent" @checkbox-all="checkboxChangeEvent">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>
</template>