<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table';
import { NForm, NInput, NGrid, NFormItemGi, NDatePicker, NScrollbar, NSelect, NSpace, NTimePicker, NPopover, NButton, NModal } from "naive-ui";
import { FormModal, cementSlurryBind, cementTypeBind } from "./App";
import { request, NwDic } from "@platform/main"
const { formRef, dataModel, rules, slurryFormulation } = new FormModal();

const xGrid = ref<VxeGridInstance>();//污染实验配方弹出框里的表单
const formulationData: any = ref([]);//污染实验配方回显数据
let showModal = ref(false);//污染实验配方弹出框显示隐藏
//污染实验配方弹出框显示
const formulationShow = () => {
    showModal.value = true;
    if (dataModel.value.processContaminateFormulationList) {
        formulationData.value = dataModel.value.processContaminateFormulationList
    } else {
        formulationData.value = []
    }
}
//污染实验配方弹出框里新增事件
const formulationAdd = () => {
    const $grid = xGrid.value
    $grid?.insert({})
}
//污染实验配方弹出框里删除事件
const formulationDelete = () => {
    const $grid = xGrid.value
    $grid?.remove($grid?.getCheckboxRecords())
}
//污染实验配方选择提交事件
const formulationSubmit = () => {
    showModal.value = false;
    const $grid = xGrid.value
    dataModel.value.processContaminateFormulationList = $grid?.getTableData().fullData;
    let formulation = "";
    $grid?.getTableData().fullData.map((item) => {
        formulation = formulation + item.recipeQuantity + "%" + item.recipeMaterials + "+"
    })
    dataModel.value.contaminateFormula = formulation.substring(0, formulation.length - 1);
}
//设备列表数据
let deviceNameList: any = ref([]);
//加载设备
request({
    url: `/cemlab/cemlabDevice/list`,
    method: 'post',
    data: {}
}).then((res) => {
    if (res) {
        deviceNameList.value = res
    }
});
//釜体类型
const futiType = [{ label: "左釜", value: 1, }, { label: "右釜", value: 2, }];
//浆体类型
const slurryTypeEnum = ["", "领浆", "中间浆", "尾桨"]
//污染实验列表
const contaminateBind = reactive<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row'
    },
    columns: [
        { field: 'slurryType', title: '浆体类型', editRender: {}, slots: { default: 'slurryType_default', edit: 'slurryType_default' } },
        { field: 'contaminateQuantity', title: '加量(%)', editRender: {}, slots: { default: 'contaminateQuantity_default', edit: 'contaminateQuantity_edit' } },
        { field: 'contaminateFormula', title: '污染实验配方', editRender: {}, slots: { default: 'contaminateFormula_default', edit: 'contaminateFormula_default' } },
    ],
    data: [
        {
            slurryType: dataModel.value.slurryType,
            contaminateQuantity: dataModel.value.contaminateQuantity,
            contaminateFormula: dataModel.value.contaminateFormula
        }
    ]
})
//实验结果 自动填入 表单
const actualBind = reactive<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row'
    },
    columns: [
        { field: 'actualExperimentTemperature', title: '实际实验温度(°C)', editRender: {}, slots: { edit: 'actualExperimentTemperature_edit', default: 'actualExperimentTemperature_default' } },
        { field: 'actualExperimentPressure', title: '实际实验压力(MPa)', editRender: {}, slots: { edit: 'actualExperimentPressure_edit', default: 'actualExperimentPressure_default' } },
        { field: 'actualHeatingTime', title: '实际升温时间(min)', editRender: {}, slots: { edit: 'actualHeatingTime_edit', default: 'actualHeatingTime_default' } },
    ],
    data: [
        {
            actualExperimentTemperature: dataModel.value.actualExperimentTemperature,
            actualExperimentPressure: dataModel.value.actualExperimentPressure,
            actualHeatingTime: dataModel.value.actualHeatingTime,
        }
    ],
})
const actualChange = (v: any, column: any) => {
    if (column.field == "actualExperimentTemperature") {
        dataModel.value.actualExperimentTemperature = v.value;
    }
    if (column.field == "actualExperimentPressure") {
        dataModel.value.actualExperimentPressure = v.value;
    }
    if (column.field == "actualHeatingTime") {
        dataModel.value.actualHeatingTime = v.value;
    }
}
//混合液体列表变更
const cementSlurryChange = (v: any, row: any, column: any) => {
    if (column.field == "cementSlurrySpeed3") {
        dataModel.value.cementSlurrySpeed3 = v.value;
        row.cementSlurrySpeed3 = v.value;
    }
    if (column.field == "cementSlurrySpeed6") {
        dataModel.value.cementSlurrySpeed6 = v.value;
        row.cementSlurrySpeed6 = v.value;
    }
    if (column.field == "cementSlurrySpeed100") {
        dataModel.value.cementSlurrySpeed100 = v.value;
        row.cementSlurrySpeed100 = v.value;
    }
    if (column.field == "cementSlurrySpeed200") {
        dataModel.value.cementSlurrySpeed200 = v.value;
        row.cementSlurrySpeed200 = v.value;
    }
    if (column.field == "cementSlurrySpeed300") {
        dataModel.value.cementSlurrySpeed300 = v.value;
        row.cementSlurrySpeed300 = v.value;
    }
    if (column.field == "cementSlurrySpeed600") {
        dataModel.value.cementSlurrySpeed600 = v.value;
        row.cementSlurrySpeed600 = v.value;
    }

    if (dataModel.value.cementSlurrySpeed300 && dataModel.value.cementSlurrySpeed100) {
        //流性指数
        dataModel.value.cementSlurryLiquidity = Number(Number(2.096 * Math.log10(Number(dataModel.value.cementSlurrySpeed300) / Number(dataModel.value.cementSlurrySpeed100))).toFixed(3))
        cementSlurryBind.value.data && (cementSlurryBind.value.data[1].cementSlurrySpeed3 = dataModel.value.cementSlurryLiquidity)
        //稠度系数
        dataModel.value.cementSlurryConsistencyCoefficient = Number(Number(0.511 * Number(dataModel.value.cementSlurrySpeed300) / (511 ** Number(dataModel.value.cementSlurryLiquidity))).toFixed(3))
        cementSlurryBind.value.data && (cementSlurryBind.value.data[2].cementSlurrySpeed3 = dataModel.value.cementSlurryConsistencyCoefficient)
    }
    if (!dataModel.value.cementSlurrySpeed300 || !dataModel.value.cementSlurrySpeed100) {
        dataModel.value.cementSlurryLiquidity = 0
        cementSlurryBind.value.data && (cementSlurryBind.value.data[1].cementSlurrySpeed3 = 0)
        dataModel.value.cementSlurryConsistencyCoefficient = 0
        cementSlurryBind.value.data && (cementSlurryBind.value.data[2].cementSlurrySpeed3 = 0)
    }
}
</script>
<template>
    <n-scrollbar>
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="实验名称">
                    <n-input placeholder="实验名称" v-model:value="dataModel.experimentName" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="实验时间">
                    <n-date-picker placeholder="实验时间" v-model:formatted-value="dataModel.experimentDate"
                        value-format="yyyy-MM-dd" type="date" style="width:100%" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">污染实验</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <vxe-grid v-bind="contaminateBind" style="width:100%">
                        <template #slurryType_default>
                            <n-popover trigger="hover" placement="bottom">
                                <template #trigger>
                                    <span> {{ slurryTypeEnum[dataModel.slurryType] }}</span>
                                </template>
                                <span>{{ slurryFormulation }}</span>
                            </n-popover>
                        </template>
                        <template #contaminateQuantity_edit>
                            <vxe-input v-model="dataModel.contaminateQuantity" type="number" />
                        </template>
                        <template #contaminateQuantity_default>
                            {{ dataModel.contaminateQuantity }}
                        </template>
                        <template #contaminateFormula_default>
                            <span>{{ dataModel.contaminateFormula }}</span>
                            <n-button @click="formulationShow" style="float:right">选择</n-button>
                        </template>
                    </vxe-grid>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">实验结果</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <vxe-grid v-bind="actualBind" style="width:100%">
                        <template #actualExperimentTemperature_edit="{ column }">
                            <vxe-input v-model="dataModel.actualExperimentTemperature"
                                @change="(v: any) => actualChange(v, column)"></vxe-input>
                        </template>
                        <template #actualExperimentTemperature_default>
                            {{ dataModel.actualExperimentTemperature }}
                        </template>
                        <template #actualExperimentPressure_edit="{ column }">
                            <vxe-input v-model="dataModel.actualExperimentPressure"
                                @change="(v: any) => actualChange(v, column)"></vxe-input>
                        </template>
                        <template #actualExperimentPressure_default>
                            {{ dataModel.actualExperimentPressure }}
                        </template>
                        <template #actualHeatingTime_edit="{ column }">
                            <vxe-input v-model="dataModel.actualHeatingTime"
                                @change="(v: any) => actualChange(v, column)"></vxe-input>
                        </template>
                        <template #actualHeatingTime_default>
                            {{ dataModel.actualHeatingTime }}
                        </template>
                    </vxe-grid>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <vxe-grid v-bind="cementSlurryBind" style="width:100%">
                        <template #cementSlurrySpeed3_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed3"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed6_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed6"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed100_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed100"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed200_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed200"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed300_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed300"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed600_edit="{ row, column }">
                            <vxe-input v-model="row.cementSlurrySpeed600"
                                @change="(v: any) => cementSlurryChange(v, row, column)" type="number"></vxe-input>
                        </template>
                        <template #cementSlurrySpeed3_defalut="{ row }">
                            {{ row.cementSlurrySpeed3 }}
                        </template>
                        <template #cementSlurrySpeed6_defalut="{ row }">
                            {{ row.cementSlurrySpeed6 }}
                        </template>
                        <template #cementSlurrySpeed100_defalut="{ row }">
                            {{ row.cementSlurrySpeed100 }}
                        </template>
                        <template #cementSlurrySpeed200_defalut="{ row }">
                            {{ row.cementSlurrySpeed200 }}
                        </template>
                        <template #cementSlurrySpeed300_defalut="{ row }">
                            {{ row.cementSlurrySpeed300 }}
                        </template>
                        <template #cementSlurrySpeed600_defalut="{ row }">
                            {{ row.cementSlurrySpeed600 }}
                        </template>
                    </vxe-grid>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="实验结果">
                    <n-input type="textarea" style="height: 100px" v-model:value="dataModel.experimentResult" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="实验现象">
                    <n-input type="textarea" style="height: 100px" v-model:value="dataModel.experimentPhenomena" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">图表结果</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="仪器">
                    <n-select :options="deviceNameList" labelField="deviceName" valueField="id"
                        v-model:value="dataModel.deviceId"
                        @update-value="(d, op: any) => { dataModel.deviceCode = op.deviceCode, dataModel.deviceName = op.deviceName }"></n-select>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="自编号">
                    <n-input placeholder="自编号" v-model:value="dataModel.deviceCode" disabled />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="釜体">
                    <n-select v-model:value="dataModel.futi" :options="futiType" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="数据获取时间">
                    <n-space>
                        <n-time-picker v-model:formatted-value="dataModel.dataStartTime" value-format="h:mm" />
                        <n-time-picker v-model:formatted-value="dataModel.dataEndTime" value-format="h:mm" />
                    </n-space>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="图表名称">
                    <n-input placeholder="图表名称" v-model:value="dataModel.chartName" />
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog" style="width:60%;">
            <template #header>
                <div>污染实验配方选择</div>
            </template>
            <n-button type="primary" @click="formulationAdd" style="margin-left:10px;">新增</n-button>
            <n-button type="error" @click="formulationDelete" style="margin-left:10px;">删除</n-button>
            <vxe-grid ref="xGrid" v-bind="cementTypeBind" :data="formulationData">
                <template #recipeMaterialsDict_edit="{ row }">
                    <NwDic dictCode="CONTAMINATE_TYPE" v-model:value="row.recipeMaterialsDict"
                        v-model:label="row.recipeMaterials"></NwDic>
                </template>
                <template #density_edit="{ row }">
                    <vxe-input v-model="row.recipeQuantity" type="number"></vxe-input>
                </template>
            </vxe-grid>
            <template #action>
                <n-button @click="formulationSubmit" type="primary">
                    提交
                </n-button>
            </template>
        </n-modal>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
</template>