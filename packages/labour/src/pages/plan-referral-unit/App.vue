<script lang="ts" setup>
import { NwIcon, NwGridSearch, NwGridControl } from '@platform/main'
import {nextTick,inject} from 'vue'
import { NLayout,NModal,NCard,NTabs,NTab,NLayoutSider, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, useDialog, NButton,NForm,NFormItem } from 'naive-ui'
import  LeftTree  from "./components/LeftTree.vue"
import { bind, gridRef, filterData, query, refresh, reset, paramsArray,outerDisciplineId,disciplineQuery,labourPlanPersons, gridSearchRef, gridEvents } from "./App"
//import SupplierFormComponet from "./components/SupplierForm.vue"
//import { showOrgFromRef, showAddRef } from "./components/SupplierForm"
nextTick().then(()=>{refresh()});
(inject("Emitter") as any).on("function-complete", () => {
    refresh();
});
</script>
<template>
        <n-layout has-sider class="nw-layout-full">
            <n-layout-sider bordered width="150" collapse-mode="transform">
            <LeftTree />
        </n-layout-sider>
        <!-- 右侧内容区 start -->
        <n-layout class="nw-layout-full">
            <!-- 内容区头部 start -->
            <!-- <n-layout-header class="nw-layout-header">
                <n-tabs closable type="line" trigger="click" @update:value="disciplineQuery">
                    <n-tab name="all">
                        全部
                    </n-tab>
                    <n-tab v-for="p in labourPlanPersons" :name="p.id" :key="p.id">
                    {{p.outerDisciplineName}}({{p.referralNo ||0}}/{{p.needNo}})
                    </n-tab>
                </n-tabs>
            </n-layout-header> -->
            <n-layout-header class="nw-layout-header">
                <n-space :size="5" style="padding: 0 5px">
                    <!--放功能按钮的地方-->
                    <NwFunctionPredefine code="" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-form label-placement="left" :show-feedback="false" inline>
                        <n-form-item label="劳务人员名称:">
                            <n-input :value="filterData.suppUserName  || ''" @update:value="(d) => filterData.suppUserName  = d"
                            placeholder="劳务人员名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <n-form-item label="身份证号:">
                            <n-input :value="filterData.idCard || ''" @update:value="(d) => filterData.idCard = d"
                            placeholder="身份证号" :style="{ width: '150px' }" style="margin-right: 10px" />
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
                <!-- {{labourUsers.labourPlanReferralList }} -->
                <vxe-grid v-bind="bind" ref="gridRef">
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>

</template>