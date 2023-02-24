<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main"
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, checkboxChangeEvent, checkboxConfig, approveParamsArry, notApproveParamsArry, editEvent, updataC, isLoading, contractworkArry } from "./App"
import { nextTick, inject, ref } from 'vue'
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
                    <NwFunctionPredefine code="labourAttendanceOvertimeForm_add" :params="paramsArray" />
                    <NwFunctionPredefine code="labourAttendanceOvertimeForm_approve_agree"
                        :params="approveParamsArry" />
                    <NwFunctionPredefine code="labourAttendanceOvertimeForm_approve_notAgree"
                        :params="notApproveParamsArry" />
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.suppUserName || ''"
                            @update:value="(d: string) => filterData.suppUserName = d" placeholder="申请人"
                            :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <!-- <n-input-group>
                        <n-input :value="filterData.suppUserId || ''" @update:value="(d: string) => filterData.suppUserId = d"
                            placeholder="劳务人员id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.suppUserName || ''" @update:value="(d: string) => filterData.suppUserName = d"
                            placeholder="劳务人员名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.banId || ''" @update:value="(d: string) => filterData.banId = d"
                            placeholder="所在班组id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.banName || ''" @update:value="(d: string) => filterData.banName = d"
                            placeholder="所在班组名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.labourCompanyId || ''" @update:value="(d: string) => filterData.labourCompanyId = d"
                            placeholder="所在劳务公司id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.labourCompanyName || ''" @update:value="(d: string) => filterData.labourCompanyName = d"
                            placeholder="所在劳务公司名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.overtimeDate || ''" @update:value="(d: string) => filterData.overtimeDate = d"
                            placeholder="加班日期" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.amStartH || ''" @update:value="(d: string) => filterData.amStartH = d"
                            placeholder="上午开始-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.amStartM || ''" @update:value="(d: string) => filterData.amStartM = d"
                            placeholder="上午开始-分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.amEndH || ''" @update:value="(d: string) => filterData.amEndH = d"
                            placeholder="上午结束-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.amEndM || ''" @update:value="(d: string) => filterData.amEndM = d"
                            placeholder="上午结束分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.pmStartH || ''" @update:value="(d: string) => filterData.pmStartH = d"
                            placeholder="下午开始-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.pmStartM || ''" @update:value="(d: string) => filterData.pmStartM = d"
                            placeholder="下午开始-分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.pmEndH || ''" @update:value="(d: string) => filterData.pmEndH = d"
                            placeholder="下午结束-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.pmEndM || ''" @update:value="(d: string) => filterData.pmEndM = d"
                            placeholder="下午结束分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.nightStartH || ''" @update:value="(d: string) => filterData.nightStartH = d"
                            placeholder="晚上开始-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.nightStartM || ''" @update:value="(d: string) => filterData.nightStartM = d"
                            placeholder="晚上开始-分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.nightEndH || ''" @update:value="(d: string) => filterData.nightEndH = d"
                            placeholder="晚上结束-时" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.nightEndM || ''" @update:value="(d: string) => filterData.nightEndM = d"
                            placeholder="晚上结束分" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.overLength || ''" @update:value="(d: string) => filterData.overLength = d"
                            placeholder="加班时长" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.remark || ''" @update:value="(d: string) => filterData.remark = d"
                            placeholder="备注" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.overtimeState || ''" @update:value="(d: string) => filterData.overtimeState = d"
                            placeholder="状态：1未办理、2已同意、3已拒绝" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.monitorRemark || ''" @update:value="(d: string) => filterData.monitorRemark = d"
                            placeholder="班长备注" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractWorkId || ''" @update:value="(d: string) => filterData.contractWorkId = d"
                            placeholder="承包合同id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractWorkCode || ''" @update:value="(d: string) => filterData.contractWorkCode = d"
                            placeholder="承包合同编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.contractWorkName || ''" @update:value="(d: string) => filterData.contractWorkName = d"
                            placeholder="承包合同名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.estimatesettlementamount || ''" @update:value="(d: string) => filterData.estimatesettlementamount = d"
                            placeholder="承包合同预计成本" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.estimateinitamountnotax || ''" @update:value="(d: string) => filterData.estimateinitamountnotax = d"
                            placeholder="承包合同实际成本" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseId || ''" @update:value="(d: string) => filterData.virtualPurchaseId = d"
                            placeholder="虚拟订单id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseCode || ''" @update:value="(d: string) => filterData.virtualPurchaseCode = d"
                            placeholder="虚拟订单编号" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.virtualPurchaseName || ''" @update:value="(d: string) => filterData.virtualPurchaseName = d"
                            placeholder="虚拟订单名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.estimateexecamount || ''" @update:value="(d: string) => filterData.estimateexecamount = d"
                            placeholder="采购合同预计履约金额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.actualexecamount || ''" @update:value="(d: string) => filterData.actualexecamount = d"
                            placeholder="采购合同实际履约金额" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.settlementState || ''" @update:value="(d: string) => filterData.settlementState = d"
                            placeholder="结算状态-1未结算-2结算中-3已结算" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.settlementDate || ''" @update:value="(d: string) => filterData.settlementDate = d"
                            placeholder="结算时间" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.statementId || ''" @update:value="(d: string) => filterData.statementId = d"
                            placeholder="结算单id" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-input :value="filterData.statementName || ''" @update:value="(d: string) => filterData.statementName = d"
                            placeholder="结算单名称" :style="{ width: '150px' }" style="margin-right: 10px" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group> -->
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
                <vxe-grid v-bind="bind" ref="gridRef" :stripe="true" :row-config="{ isCurrent: true, isHover: true }"
                    @checkbox-change="checkboxChangeEvent" @checkbox-all="checkboxChangeEvent"
                    :checkbox-config="checkboxConfig">
                    <template #approveState_edit="{ row }">
                        <n-select v-if="!isLoading" v-model:value="row.contractWorkId"
                            :on-update-value="(v: string, o: any) => updataC(v, o, row)" value-field="workContractId"
                            label-field="workContractName" placeholder="请选择" :options="contractworkArry"
                            :disabled="row.overtimeStateName==='已同意' ? true : row.overtimeStateName==='已拒绝' ? true : false "></n-select>
                        <NwIcon v-else name="icon-y-loading" :size="20"></NwIcon>

                    </template>
                    <template #contractWorkId_default="{ row }">
                        <span @click="() => editEvent(row)" style="width:160px;height:15px;display: inline-block;">{{
                                row.contractWorkName
                        }}</span>
                    </template>
                </vxe-grid>
            </n-layout-content>
            <!-- 内容区列表 end -->
        </n-layout>
        <!-- 右侧内容区 end -->
    </n-layout>

</template>