<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, useDialog, NButton,NForm,NFormItem } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents,unitNameOptions,parentOrgNameOptions } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    //reset({})
    refresh()
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    
    refresh()
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
                    <NwFunctionPredefine code="labourSuppUserForm_add" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-form label-placement="left" :show-feedback="false" inline>
                        <n-form-item label="姓名:">
                            <n-input :value="filterData.userNameCh || ''"
                            @update:value="(d) => filterData.userNameCh = d" placeholder="姓名"
                            :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <n-form-item label="身份证号:">
                            <n-input :value="filterData.idCard || ''"
                            @update:value="(d) => filterData.idCard = d" placeholder="身份证号"
                            :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <n-form-item label="所在单位:">
                            <n-select v-model:value="filterData.unitName" :options="unitNameOptions"
                                @update:value="(d) => filterData.unitName = d" placeholder="请选择状态"
                                :style="{ width: '250px' }">
                            </n-select>
                        </n-form-item>
                        <n-form-item label="劳务供方公司:">
                            <n-select v-model:value="filterData.parentOrgName" :options="parentOrgNameOptions"
                                @update:value="(d) => filterData.parentOrgName = d" placeholder="请选择状态"
                                :style="{ width: '250px' }">
                            </n-select>
                        </n-form-item>
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
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
                    </n-form>
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