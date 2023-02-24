<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup, NTabs, NTab, NForm, NFormItem, NSelect } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, gridEvents, normTypeQuery } from "./App"
import { nextTick, inject } from 'vue'

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
    <n-layout class="nw-layout-full">
        <n-layout-header class="nw-layout-header">
            <n-tabs type="line" trigger="click" @update:value="normTypeQuery">
                <n-tab name="">
                    全部
                </n-tab>
                <n-tab name="1">
                    仪器操作保养规范
                </n-tab>
                <n-tab name="2">
                    实验操作规范
                </n-tab>
                <n-tab name="3">
                    成果资料管理
                </n-tab>
            </n-tabs>
        </n-layout-header>
        <n-layout-header class="nw-layout-header" style="height: auto">
            <n-space :size="5" style="padding: 0 0 5px 0; width:100%;" justify="space-between" align="center">
                <div>
                    <NwFunctionPredefine code="cemlabExperimentProcNormFormAdd" />
                </div>
                <n-form label-placement="left" :show-feedback="false" inline>
                    <n-form-item label="">
                        <n-input :value="filterData.title || ''"
                            @update:value="(d) => filterData.title = d" placeholder="文档名称"
                            :style="{ width: '120px' }" style="margin-right: 10px" />
                    </n-form-item>
                    <n-button type="primary" @click="query()">
                        搜索
                    </n-button>
                    <n-button title="重置" type="warning" @click="refresh()">
                        <template #icon>
                            <nw-icon name="icon-n-y-refresh" />
                        </template>
                    </n-button>
                </n-form>
            </n-space>
        </n-layout-header>
        <n-layout-content>
            <vxe-grid v-bind="bind" :ref="(d: any) => gridRef = d">
                 </vxe-grid>
        </n-layout-content>
    </n-layout>
</template>
