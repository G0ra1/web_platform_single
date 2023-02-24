<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine, NwGridSearch, NwGridControl } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton,NDatePicker,NForm,NFormItem} from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,companyOptions,orgnameOptions,userTypeOptions, gridSearchRef, gridEvents } from "./App"
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
                    <NwFunctionPredefine code="labourHourAllotForm_add" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-form label-placement="left" :show-feedback="false" inline>
                        <n-form-item label="姓名:">
                            <n-input :value="filterData.username || ''" @update:value="(d) => filterData.username = d"
                            placeholder="姓名" :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <n-form-item label="员工所属单位:">
                            <n-select
                            placeholder="员工所属单位"
                            :value="filterData.company || ''"
                            :options="companyOptions"
                            @update:value="(d)=>{filterData.company = d }"
                            :style="{
                                width: '150px' 
                            }"
                            @select="(d)=>{}"
                        >   
                        </n-select> 
                        </n-form-item>
                        <n-form-item label="工时发放单位:">
                            <n-select
                            placeholder="工时发放单位"
                            :value="filterData.orgname || ''"
                            :options="orgnameOptions"
                            @update:value="(d)=>{filterData.orgname = d }"
                            :style="{
                                width: '150px' 
                            }"
                            @select="(d)=>{}"
                            >   
                            </n-select>
                        </n-form-item>
                        <n-form-item label="人员类型:">
                            <n-select
                            placeholder="人员类型"
                            :value="filterData.userType || ''"
                            :options="userTypeOptions"
                            @update:value="(d)=>{filterData.userType = d }"
                            :style="{
                                width: '150px' 
                            }"
                            @select="(d)=>{}"
                        >   
                        </n-select>
                        </n-form-item>
                        <n-form-item label="结算年月:">
                            <n-date-picker 
                            type="month"
                            :value="filterData.allotDate"
                            placeholder="结算年月"
                            :style="{ width: '150px'  }"
                            >
                            </n-date-picker>
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
                <vxe-grid v-bind="bind"  ref="gridRef">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>

</template>