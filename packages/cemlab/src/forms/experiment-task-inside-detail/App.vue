<script lang="ts" setup>
import { ref } from 'vue'
import { VxeGridProps } from 'vxe-table'
import { NForm, NInput, NInputNumber, NScrollbar, NGrid, NFormItemGi, NDatePicker, NTimePicker, NCard, NSelect, NTreeSelect, NSpace, NTabs, NTabPane } from "naive-ui";
import { FormModal, bind } from "./App";
import { NwFieldGrid, request } from "@platform/main"

const { formRef, dataModel, rules, processColumns, processConditionColumns, processResultColumns } = new FormModal();

let processType = ref<number>(1);
const bindGrid = ref();//水泥浆性能要求 表单
let cementTypeOptions: any = [];//实验条件中的水泥型号
//加载水泥型号树形下拉框
request({
    url: `/main/dictTree/list?parentCode=CEMENT_TYPE`,
    method: 'get',
}).then((res) => {
    res.map((d: any) => (
        cementTypeOptions.push({
            label: d.dictName,
            key: d.dictCode,
            children: d.kids.map((c: any) => ({
                label: c.dictName,
                key: c.dictCode,
                parentName: d.dictName
            }))
        })
    ));
});
const sampleTypeEnum = [{},{ label: "小样", value: 1 }, { label: "大样", value: 2 }, { label: "半大样", value: 3 }]
const slurryTypeEnum = [{},{ label: "领浆", value: 1 }, { label: "中间浆", value: 2 }, { label: "尾桨", value: 3 }]
const futiType = [ { label: "左釜", value: 1, }, { label: "右釜", value: 2, } ];
const actualBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row'
    },
    columns: [
        { field: 'actualExperimentTemperature', title: '实际实验温度(°C)' },
        { field: 'actualExperimentPressure', title: '实际实验压力(MPa)' },
        { field: 'actualHeatingTime', title: '实际升温时间(min)' },
    ],
    data: [],
})
const cementSlurryBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row',
        beforeEditMethod({ rowIndex }) {
            if (rowIndex != 0) {
                return false
            }
            return true
        }
    },
    columns: [
        {
            title: '类型',
            children: [
                { field: 'six', title: '六转速(r/min)' },
            ]
        },
        {
            title: '水泥浆',
            children: [
                { field: 'cementSlurrySpeed3', title: '3', },
                { field: 'cementSlurrySpeed6', title: '6', },
                { field: 'cementSlurrySpeed100', title: '100', },
                { field: 'cementSlurrySpeed200', title: '200', },
                { field: 'cementSlurrySpeed300', title: '300', },
                { field: 'cementSlurrySpeed600', title: '600', },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
const slurryBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row',
        beforeEditMethod({ rowIndex }) {
            if (rowIndex != 0) {
                return false
            }
            return true
        }
    },
    columns: [
        {
            title: '类型',
            children: [
                { field: 'six', title: '六转速(r/min)' },
            ]
        },
        {
            title: '泥浆',
            children: [
                { field: 'slurrySpeed3', title: '3', },
                { field: 'slurrySpeed6', title: '6', },
                { field: 'slurrySpeed100', title: '100', },
                { field: 'slurrySpeed200', title: '200', },
                { field: 'slurrySpeed300', title: '300', },
                { field: 'slurrySpeed600', title: '600', },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
const prepadBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row',
        beforeEditMethod({ rowIndex }) {
            if (rowIndex != 0) {
                return false
            }
            return true
        }
    },
    columns: [
        {
            title: '类型',
            children: [
                { field: 'six', title: '六转速(r/min)' },
            ]
        },
        {
            title: '前置液',
            children: [
                { field: 'prepadSpeed3', title: '3', editRender: {}, },
                { field: 'prepadSpeed6', title: '6', editRender: {}, },
                { field: 'prepadSpeed100', title: '100', editRender: {}, },
                { field: 'prepadSpeed200', title: '200', editRender: {}, },
                { field: 'prepadSpeed300', title: '300', editRender: {}, },
                { field: 'prepadSpeed600', title: '600', editRender: {}, },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
const processDetai = (id: string) => {
    request({
        url: `/cemlab/cemlabExperimentProcess/${id}`,
        method: 'get',
    }).then((res) => {
        dataModel.value.cemlabExperimentProcess = res
        actualBind.value.data = [{
            actualExperimentTemperature: dataModel.value.cemlabExperimentProcess.actualExperimentTemperature,
            actualExperimentPressure: dataModel.value.cemlabExperimentProcess.actualExperimentPressure,
            actualHeatingTime: dataModel.value.cemlabExperimentProcess.actualHeatingTime
        }]
        cementSlurryBind.value.data = [
            {
                six: '平均转速(r/min)',
                cementSlurrySpeed3: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed3,
                cementSlurrySpeed6: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed6,
                cementSlurrySpeed100: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed100,
                cementSlurrySpeed200: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed200,
                cementSlurrySpeed300: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed300,
                cementSlurrySpeed600: dataModel.value.cemlabExperimentProcess.cementSlurrySpeed600
            },
            { six: '塑性粘度(Pa·s)', cementSlurrySpeed3: dataModel.value.cemlabExperimentProcess.cementSlurryPlasticViscosity },
            { six: '动切力(Pa)', cementSlurrySpeed3: dataModel.value.cemlabExperimentProcess.cementSlurryYieldVal },
            { six: '流性指数n', cementSlurrySpeed3: dataModel.value.cemlabExperimentProcess.cementSlurryLiquidity },
            { six: '稠度系数k(Pa·sn)', cementSlurrySpeed3: dataModel.value.cemlabExperimentProcess.cementSlurryConsistencyCoefficient },
        ]
        slurryBind.value.data = [
            {
                six: '平均转速(r/min)',
                slurrySpeed3: dataModel.value.cemlabExperimentProcess.slurrySpeed3,
                slurrySpeed6: dataModel.value.cemlabExperimentProcess.slurrySpeed6,
                slurrySpeed100: dataModel.value.cemlabExperimentProcess.slurrySpeed100,
                slurrySpeed200: dataModel.value.cemlabExperimentProcess.slurrySpeed200,
                slurrySpeed300: dataModel.value.cemlabExperimentProcess.slurrySpeed300,
                slurrySpeed600: dataModel.value.cemlabExperimentProcess.slurrySpeed600
            },
            { six: '塑性粘度(Pa·s)', slurrySpeed3: dataModel.value.cemlabExperimentProcess.slurryPlasticViscosity },
            { six: '动切力(Pa)', slurrySpeed3: dataModel.value.cemlabExperimentProcess.slurryYieldVal },
            { six: '流性指数n', slurrySpeed3: dataModel.value.cemlabExperimentProcess.slurryLiquidity },
            { six: '稠度系数k(Pa·sn)', slurrySpeed3: dataModel.value.cemlabExperimentProcess.slurryConsistencyCoefficient },
        ]
        prepadBind.value.data = [
            {
                six: '平均转速(r/min)',
                prepadSpeed3: dataModel.value.cemlabExperimentProcess.prepadSpeed3,
                prepadSpeed6: dataModel.value.cemlabExperimentProcess.prepadSpeed6,
                prepadSpeed100: dataModel.value.cemlabExperimentProcess.prepadSpeed100,
                prepadSpeed200: dataModel.value.cemlabExperimentProcess.prepadSpeed200,
                prepadSpeed300: dataModel.value.cemlabExperimentProcess.prepadSpeed300,
                prepadSpeed600: dataModel.value.cemlabExperimentProcess.prepadSpeed600
            },
            { six: '塑性粘度(Pa·s)', prepadSpeed3: dataModel.value.cemlabExperimentProcess.prepadPlasticViscosity },
            { six: '动切力(Pa)', prepadSpeed3: dataModel.value.cemlabExperimentProcess.prepadYieldVal },
            { six: '流性指数n', prepadSpeed3: dataModel.value.cemlabExperimentProcess.prepadLiquidity },
            { six: '稠度系数k(Pa·sn)', prepadSpeed3: dataModel.value.cemlabExperimentProcess.prepadConsistencyCoefficient },
        ]
    });
}
</script>
<template>
    <n-scrollbar style="height:100%;">
        <n-tabs type="bar" :animated="true" @update:value="processType = 1" style="padding:20px 30px">
            <n-tab-pane name="task" tab="任务信息">
                <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left"
                    label-width="140" require-mark-placement="right-hanging">
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">任务基础信息</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="化验报告单编码">
                            <n-input placeholder="化验报告单编码" v-model:value="dataModel.labReportCode" disabled />
                        </n-form-item-gi>
                    </n-grid>
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="12" label="队号">
                            <n-input placeholder="队号" v-model:value="dataModel.duiHao" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="任务来源">
                            <n-input placeholder="任务来源" v-model:value="dataModel.taskSource" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="取样人" path="samplingUserName">
                            <n-input placeholder="取样人" v-model:value="dataModel.samplingUserName" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="取样地点">
                            <n-input placeholder="取样地点" v-model:value="dataModel.samplingSpot" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="取样日期（灰）">
                            <n-date-picker placeholder="取样日期（灰）" v-model:formatted-value="dataModel.samplingAshDate"
                                value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="水样来源">
                            <n-input placeholder="水样来源" v-model:value="dataModel.waterSampleSource" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="水样桶号">
                            <n-input placeholder="水样桶号" v-model:value="dataModel.waterSampleBarrelNumber" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="取样日期（水）">
                            <n-date-picker placeholder="取样日期（水）" v-model:formatted-value="dataModel.samplingWaterDate"
                                value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" disabled />
                        </n-form-item-gi>
                    </n-grid>
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">井基础信息</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="构造区块">
                            <n-input placeholder="构造区块" v-model:value="dataModel.structuralBlock" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="井号">
                            <n-input placeholder="井号" v-model:value="dataModel.wellsNumber" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="完成日期">
                            <n-date-picker placeholder="完成日期" v-model:formatted-value="dataModel.finishDate"
                                value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="井深(m)">
                            <n-input-number v-model:value="dataModel.wellsDepth" :min="0" style="width:100%"
                                placeholder="井深(m)" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="垂深(m)">
                            <n-input-number v-model:value="dataModel.verticalDepth" :min="0" style="width:100%"
                                placeholder="垂深(m)" disabled></n-input-number>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="套管尺寸(mm)">
                            <n-input-number v-model:value="dataModel.casingSize" :min="0" style="width:100%"
                                placeholder="套管尺寸(mm)" disabled></n-input-number>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="固井方式" path="cementingMode">
                            <n-input placeholder="固井方式" v-model:value="dataModel.cementingMode" disabled />
                        </n-form-item-gi>
                    </n-grid>
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">实验条件</h3>
                        </n-form-item-gi>
                    </n-grid>
                    <n-card style="width:100%;margin-top: 10px;" title=" "
                        v-for="item, index of dataModel.cemlabExperimentConditionList">
                        <n-grid :cols="24" :x-gap="24">
                            <n-form-item-gi :span="12" label="样品类型">
                                <n-input placeholder="样品类型" :value="sampleTypeEnum[item.sampleType].label" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="浆体类型">
                                <n-input placeholder="浆体类型" :value="slurryTypeEnum[item.slurryType].label" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="水泥型号">
                                <n-tree-select :options="cementTypeOptions" placeholder="水泥型号"
                                    v-model:value="item.cementType" :show-path="true" disabled>
                                </n-tree-select>
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="加量">
                                <n-input-number :min="0" style="width:100%" placeholder="加量"
                                    v-model:value="item.cementQuantity" disabled></n-input-number>
                            </n-form-item-gi>
                            <n-form-item-gi :span="24" label="水泥配方">
                                <n-input placeholder="水泥配方" v-model:value="item.slurryFormulation" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="实验温度">
                                <n-input placeholder="实验温度" v-model:value="item.experimentTemperature" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="实验压力">
                                <n-input placeholder="实验压力" v-model:value="item.experimentPressure" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="升温时间">
                                <n-input placeholder="升温时间" v-model:value="item.heatingTime" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="养护温度(°C)">
                                <n-input placeholder="养护温度(°C)" v-model:value="item.curingTemperature" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="养护压力(MPa)">
                                <n-input placeholder="养护压力(MPa)" v-model:value="item.curingPressure" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="养护时间(h)">
                                <n-input placeholder="养护时间(h)" v-model:value="item.curingTime" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="静止温度(°C)">
                                <n-input placeholder="静止温度(°C)" v-model:value="item.staticTemperature" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="系数">
                                <n-input placeholder="系数" v-model:value="item.coefficient" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="水泥浆密度(g/cm³)">
                                <n-input placeholder="水泥浆密度(g/cm³)" v-model:value="item.cementDensity" disabled />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="水灰比">
                                <n-input placeholder="水灰比" v-model:value="item.waterCementRatio" disabled />
                            </n-form-item-gi>
                        </n-grid>
                    </n-card>
                    <n-grid :cols="24" :x-gap="24" style="margin-top:10px;">
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">水泥浆性能要求</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <n-scrollbar x-scrollable>
                                <vxe-grid ref="bindGrid" v-bind="bind"
                                    :data="dataModel.cemlabExperimentSlurryDemandList">
                                    <template #slurryType_default="{ row }">
                                        <vxe-select v-model="row.slurryType" disabled>
                                            <vxe-option v-for="item in slurryTypeEnum" :key="item.value"
                                                :value="item.value" :label="item.label"></vxe-option>
                                        </vxe-select>
                                    </template>
                                    <template #density_edit="{ row }">
                                        <vxe-input v-model="row.density"></vxe-input>
                                    </template>
                                    <template #filterLoss_edit="{ row }">
                                        <vxe-input v-model="row.filterLoss"></vxe-input>
                                    </template>
                                    <template #freeFluid_edit="{ row }">
                                        <vxe-input v-model="row.freeFluid"></vxe-input>
                                    </template>
                                    <template #cementConsistency_edit="{ row }">
                                        <vxe-input v-model="row.cementConsistency"></vxe-input>
                                    </template>
                                    <template #thickeningTime_edit="{ row }">
                                        <vxe-input v-model="row.thickeningTime"></vxe-input>
                                    </template>
                                    <template #compressiveStrength_edit="{ row }">
                                        <vxe-input v-model="row.compressiveStrength"></vxe-input>
                                    </template>
                                    <template #compressiveStrengthTime_edit="{ row }">
                                        <vxe-input v-model="row.compressiveStrengthTime"></vxe-input>
                                    </template>
                                    <template #fluidity_edit="{ row }">
                                        <vxe-input v-model="row.fluidity"></vxe-input>
                                    </template>
                                </vxe-grid>
                            </n-scrollbar>
                        </n-form-item-gi>
                    </n-grid>
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="24" label="备注">
                            <n-input placeholder="备注" type="textarea" v-model:value="dataModel.remark" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="实验人员">
                            <n-input placeholder="实验人员" v-model:value="dataModel.experimentUserName" disabled />
                        </n-form-item-gi>
                    </n-grid>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="process" tab="实验信息">
                <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left"
                    label-width="140" require-mark-placement="right-hanging" v-if="processType === 1">
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="24">
                            <NwFieldGrid v-model:value="dataModel.experimentProcessList" style="width: 100%"
                                :columns="processColumns" :is-readonly="true">
                                <template #processDetail="{ row }">
                                    <vxe-button type="text" style="color:red" content="查看"
                                        @click="processDetai(row.id),processType = 2"></vxe-button>
                                </template>
                            </NwFieldGrid>
                        </n-form-item-gi>
                    </n-grid>
                </n-form>
                <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left"
                    label-width="140" require-mark-placement="right-hanging" v-if="processType === 2">
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="12" label="实验名称">
                            <n-input placeholder="实验名称" :value="dataModel.cemlabExperimentProcess.experimentName"
                                disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="实验时间">
                            <n-date-picker placeholder="实验时间"
                                :formatted-value="dataModel.cemlabExperimentProcess.experimentDate"
                                value-format="yyyy-MM-dd" type="date" style="width:100%" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">增加实验条件</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <NwFieldGrid :value="dataModel.cemlabExperimentProcess.cemlabExperimentProcessConditionList"
                                style="width: 100%" :columns="processConditionColumns" :editEnabled="false"
                                :isReadonly="true">
                            </NwFieldGrid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">实验结果</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <vxe-grid v-bind="actualBind" style="width:100%">
                            </vxe-grid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <NwFieldGrid
                                v-model:value="dataModel.cemlabExperimentProcess.cemlabExperimentProcessResultList"
                                style="width: 100%" :columns="processResultColumns" :editEnabled="false"
                                :isReadonly="true">
                            </NwFieldGrid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <vxe-grid v-bind="cementSlurryBind" style="width:100%">
                            </vxe-grid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <vxe-grid v-bind="slurryBind" style="width:100%">
                            </vxe-grid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24">
                            <vxe-grid v-bind="prepadBind" style="width:100%">
                            </vxe-grid>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24" label="">
                            <h3 class="card-title">图表结果</h3>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="仪器">
                            <n-input placeholder="仪器" :value="dataModel.cemlabExperimentProcess.deviceName" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="自编号">
                            <n-input placeholder="自编号" :value="dataModel.cemlabExperimentProcess.deviceCode" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="釜体">
                            <n-input placeholder="釜体" :value="futiType[dataModel.cemlabExperimentProcess.futi].label" disabled />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="数据获取时间">
                            <n-space>
                                <n-time-picker v-model:formatted-value="dataModel.cemlabExperimentProcess.dataStartTime"
                                    value-format="h:mm" disabled/>
                                <n-time-picker v-model:formatted-value="dataModel.cemlabExperimentProcess.dataEndTime"
                                    value-format="h:mm" disabled/>
                            </n-space>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="图表名称">
                            <n-input placeholder="图表名称" v-model:value="dataModel.cemlabExperimentProcess.chartName" disabled/>
                        </n-form-item-gi>
                    </n-grid>
                </n-form>
            </n-tab-pane>
        </n-tabs>
        <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
</template>