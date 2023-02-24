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
                    <NwFunctionPredefine code="labourAttendanceApproveForm_add" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.attendanceApplyDate || ''" @update:value="(d: string) => filterData.attendanceApplyDate = d"
                            placeholder="申请时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.attendanceDate || ''" @update:value="(d: string) => filterData.attendanceDate = d"
                            placeholder="考勤日期" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.attendanceInfo || ''" @update:value="(d: string) => filterData.attendanceInfo = d"
                            placeholder="出勤情况：1全天、2上午、3下午" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.remark || ''" @update:value="(d: string) => filterData.remark = d"
                            placeholder="备注" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.late || ''" @update:value="(d: string) => filterData.late = d"
                            placeholder="迟到" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.leaveEarly || ''" @update:value="(d: string) => filterData.leaveEarly = d"
                            placeholder="早退" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.monitorRemark || ''" @update:value="(d: string) => filterData.monitorRemark = d"
                            placeholder="班长备注" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.applyTime || ''" @update:value="(d: string) => filterData.applyTime = d"
                            placeholder="申请日期" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <n-button title="重置" type="warning" @click="refresh()">
                        <template #icon>
                            <nw-icon name="icon-n-y-refresh" />
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
                <vxe-grid v-bind="bind" ref="gridRef">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>

</template>