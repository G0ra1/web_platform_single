<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine,NwGridControl,NwGridSearch } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, useDialog, NButton,NForm,NFormItem  } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents,planOrgNameOptions,auditStatusOptions,planTypeOptions,isGenOrderOptions } from "./App"
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
                    <NwFunctionPredefine code="labourPlanForm_add" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-form label-placement="left" :show-feedback="false" inline>
                        <n-form-item label="需求计划名称:">
                            <n-input :value="filterData.planName || ''" @update:value="(d) => filterData.planName = d"
                            placeholder="" :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <!-- 所属机构名称 -->
                        <n-form-item label="所属机构名称:">
                            <n-select 
                                placeholder="所属机构名称"
                                :value="filterData.planOrgName"
                                :options="planOrgNameOptions"
                                @update:value="(d)=>{filterData.planOrgName = d }"
                                :style="{
                                    width: '150px' 
                                }"
                                @select="(d)=>{}"
                            >
                            </n-select>
                        </n-form-item>
                        <!-- 需求类别 -->
                        <n-form-item label="需求类别:">
                            <n-select 
                                placeholder="需求类别"
                                :value="filterData.planType"
                                :options="planTypeOptions"
                                @update:value="(d)=>{filterData.planType = d }"
                                :style="{
                                    width: '150px' 
                                }"
                                @select="(d)=>{}"
                            >
                            </n-select>
                        </n-form-item>
                        <!-- 审核状态 -->
                        <n-form-item label="审核状态:">
                            <n-select 
                                placeholder="审核状态"
                                :value="filterData.auditStatus"
                                :options="auditStatusOptions"
                                @update:value="(d)=>{filterData.auditStatus = d }"
                                :style="{
                                    width: '150px' 
                                }"
                                @select="(d)=>{}"
                            >
                            </n-select>
                        </n-form-item>
                        <!-- 是否生成正式数据 -->
                        <n-form-item label="是否生成正式数据:">
                            <n-select 
                                placeholder="是否生成正式数据"
                                :value="filterData.isGenOrder"
                                :options="isGenOrderOptions"
                                @update:value="(d)=>{filterData.isGenOrder = d }"
                                :style="{
                                    width: '150px' 
                                }"
                                @select="(d)=>{}"
                            >
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