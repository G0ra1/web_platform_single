<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import Details from './details.vue'
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, useMessage, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, initMessage, gridSearchRef, gridEvents, delNews } from "./App"
import { nextTick, inject, ref } from 'vue'
const refDetails = ref()
initDialog(useDialog(), refDetails);
initMessage(useMessage());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    reset({})
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    reset({})
})
const selectData = ref<Array<any>>([])
const checkChange = (d: any) => {
    selectData.value = d.records
}
</script>
<template>
    <n-layout has-sider class="nw-layout-full">
        <!-- 右侧内容区 start -->
        <n-layout class="nw-layout-full">
            <!-- 内容区头部 start -->
            <n-layout-header class="nw-layout-header">
                <n-space :size="5" style="padding: 0 5px">
                    <!--放功能按钮的地方-->
                    <n-button title="删除" type="primary" :disabled="selectData.length <= 0"
                        @click="() => delNews(selectData)">
                        删除
                    </n-button>
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.contractcode || ''"
                            @update:value="(d: string) => filterData.contractcode = d" placeholder=""
                            :style="{ width: '150px', height: '30px' }" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <!-- <n-button title="筛选" @click="gridSearchRef?.toggle()">
                        <template #icon>
                            <nw-icon name="icon-n-y-shaixuan" />
                        </template>
                    </n-button> -->
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
                    <NwGridControl v-model:bind-options="bind" v-model:grid-events="gridEvents" />
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
                <vxe-grid v-bind="bind" v-on="gridEvents" @checkbox-change="checkChange" @checkbox-all="checkChange"
                    ref="gridRef">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>
    <Details ref="refDetails" @update:callback="() => { query() }"></Details>

</template>