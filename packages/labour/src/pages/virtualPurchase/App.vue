<template>
    <n-layout has-sider class="nw-layout-full">
        <!-- 右侧内容区 start -->
        <n-layout class="nw-layout-full">
            <!-- 内容区头部 start -->
            <n-layout-header class="nw-layout-header">
                <n-space :size="5" style="padding: 0 5px">
                    <!--放功能按钮的地方-->
                    <NwFunctionPredefine code="labourVirtualPurchaseForm_add" :params="paramsArray" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-form label-placement="left" :show-feedback="false" inline>
                        <n-form-item label="订单名称:">
                            <n-input :value="filterData.virtualPurchaseName || ''" @update:value="(d) => filterData.virtualPurchaseName = d"
                            placeholder="订单名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        </n-form-item>
                        <n-form-item label="订单code:">
                            <n-input :value="filterData.virtualPurchaseCode || ''" @update:value="(d) => filterData.virtualPurchaseCode = d"
                            placeholder="订单code" :style="{ width: '150px' }" style="margin-right: 10px" />
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
                    <template #contaler="{row}">
                    <n-space>
                    <!-- <NwPickAny rowKey="contractcode" button-label="关联采购合同" 
                        :buttonOptions="{disabled: row.isLinkPurchase == 1, type: 'primary',}"
                        modal-title="关联采购合同"
                        isSingle
                        :isShowIcon="false"
                        :value="row.contractcode"
                        @update:value="(d)=>{
                            showDelModal = true 
                            purchaseContract = d
                            virtualPurchaseid = row.id 
                        }"
                        :gridColumns="[
                        { field: 'contractcode', title: '合同编码' },
                        { field: 'contractname', title: '合同名称' },
                        ]"
                        requestUrl="/purchasecontract/purchase/contract/querycontract"
                        requestMethod="post"
                    >
                        <template #search="{ searchData }">
                         <n-input v-model:value="searchData.contractcode" placeholder="合同编码" size="medium"/>
                         <n-input v-model:value="searchData.contractname" placeholder="合同名称" size="medium" />
                        </template>  
                    </NwPickAny> -->
                    
                        <NwFunctionPredefine code="statement" v-if="row.isLinkPurchase===1" :params="[row]" :pid = "row.id"/>
                        <NwFunctionPredefine code="laboursettleRecord" :params="[row]" :pid = "row.id"/>
                        <NwFunctionPredefine code="virtualPurchaseForm" :params="[row]" :pid="row.id" :disabled="row.isLinkPurchase == 1" />

                    </n-space>
                    </template>
                </vxe-grid>
            </n-layout-content>

            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>

    <!-- <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" title="确认" content="选择当前采购合同后，无法二次修改，是否继续吗？"
         positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick" /> -->
</template>


<script lang="tsx" setup>
import { NwIcon, NwFunctionPredefine,NwPickAny } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, useDialog, NButton ,NModal,NForm,NFormItem} from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,showDelModal,onPositiveClick,onNegativeClick,virtualPurchaseid,purchaseContract,gridEvents } from "./App"
import { nextTick, inject } from 'vue'
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject('Emitter') as any).on('function-complete', () => {
    refresh()
})

//页面加载完成后，调用的重置方法
nextTick().then(() => {
    refresh()
});

</script>