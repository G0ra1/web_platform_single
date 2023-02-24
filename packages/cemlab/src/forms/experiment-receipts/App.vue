<script lang="ts" setup>
import { ref } from 'vue'
import { NForm, NInput, NDivider, NInputNumber, NScrollbar, NGrid, NFormItemGi, NDatePicker, NButton, NCard, NSelect, NTreeSelect, NModal } from "naive-ui";
import { FormModal, bind, cementTypeBind } from "./App";
import { FormPermissionEnum, NwDic, request } from "@platform/main"
import { VxeGridInstance } from "vxe-table"
import EmployeePick from "../../components/employeePick/index.vue";
const { formRef, sonForms, dataModel, rules, sonRules ,dataPermits } = new FormModal();

const bindGrid = ref();//水泥浆性能要求 表单
const xGrid = ref<VxeGridInstance>();//水泥配方弹出框里的表单
let showModal = ref(false);//水泥配方弹出框显示隐藏
let cementTypeOptions: any = [];//实验条件中的水泥型号
const slurryFormulationData: any = ref([]);//水泥配方回显数据
let conditionNum: number;//实验条件下标
const employeePickRef = ref();
const samplingPickRef = ref();
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
//添加实验条件
const addCondition = () => {
    dataModel.value.cemlabExperimentConditionList?.push({
        isDel : 0
    });
    if (dataModel.value.cemlabExperimentConditionList[0].sampleType) {
        dataModel.value.cemlabExperimentConditionList.forEach(item => {
            item.sampleType = dataModel.value.cemlabExperimentConditionList[0].sampleType;
        })
    }
    dataModel.value.cemlabExperimentSlurryDemandList?.push({
        isDel : 0
    });
    bindGrid.value.loadData(dataModel.value.cemlabExperimentSlurryDemandList)
}
//删除实验条件
const deleteCondition = (num: number) => {
    dataModel.value.cemlabExperimentConditionList.splice(num, 1);
    dataModel.value.cemlabExperimentSlurryDemandList.splice(num, 1);
    bindGrid.value.loadData(dataModel.value.cemlabExperimentSlurryDemandList)
}
//样品类型变更
const updateSampleType = (num: number) => {
    const sampleType = dataModel.value.cemlabExperimentConditionList[num].sampleType;
    dataModel.value.cemlabExperimentConditionList.forEach(item => {
        item.sampleType = sampleType;
    })
    dataModel.value.sampleType = sampleType;
}
//浆体类型变更
const updateSlurryType = (num: number) => {
    dataModel.value.cemlabExperimentSlurryDemandList[num].slurryType = dataModel.value.cemlabExperimentConditionList[num].slurryType;
}
//水泥配方弹出框显示
const slurryFormulationShow = (num: number) => {
    conditionNum = num;
    showModal.value = true;
    if (dataModel.value.cemlabExperimentConditionList[num].cemlabExperimentSlurryFormulaList) {
        slurryFormulationData.value = dataModel.value.cemlabExperimentConditionList[num].cemlabExperimentSlurryFormulaList
    } else {
        slurryFormulationData.value = []
    }
}
//水泥配方弹出框里新增事件
const slurryFormulationAdd = () => {
    const $grid = xGrid.value
    $grid?.insert({})
}
//水泥配方弹出框里删除事件
const slurryFormulationDelete = () => {
    const $grid = xGrid.value
    $grid?.remove($grid?.getCheckboxRecords())
}
//水泥配方选择提交事件
const slurryFormulationSubmit = () => {
    showModal.value = false;
    const $grid = xGrid.value
    dataModel.value.cemlabExperimentConditionList[conditionNum].cemlabExperimentSlurryFormulaList = $grid?.getTableData().fullData;
    let slurryFormulation = "";
    $grid?.getTableData().fullData.map((item)=>{
        slurryFormulation = slurryFormulation + item.recipeMaterials + "+" + item.recipeQuantity + "%" + "+"
    })
    dataModel.value.cemlabExperimentConditionList[conditionNum].slurryFormulation = slurryFormulation.substring(0,slurryFormulation.length-1);
}
//水泥配方弹出框-配方材料变更
const recipeMaterialsDictChange = (value: any, e: any, row: any) => {
    if (e.parentName){
        row.recipeMaterials = e.parentName + "+" +e.label
    }else {
        row.recipeMaterials = e.label
    }
    row.isDel = 0;
}
//选择实验人员
const getUsers = (user:any) =>{
    dataModel.value.experimentUserName = user[0].userNameCh;
    dataModel.value.experimentUserid = user[0].id;
}
//选择取样人
const getSamplingUsers = (user:any) =>{
    dataModel.value.samplingUserName = user[0].userNameCh;
    dataModel.value.samplingUserid = user[0].id;
}
const sampleTypeEnum = [{ label: "小样", value: 1 }, { label: "大样", value: 2 }, { label: "半大样", value: 3 }]
const slurryTypeEnum = [{ label: "领浆", value: 1 }, { label: "中间浆", value: 2 }, { label: "尾桨", value: 3 }]
</script>
<template>
    <n-scrollbar style="height:100%;">
        <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="140"
            require-mark-placement="right-hanging" style="padding:20px 30px">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">任务基础信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="化验报告单编码" path="labReportCode"
                    v-if="dataModel.labReportCode !== FormPermissionEnum.HIDE">
                    <NwDic dictCode="LAB_REPORT" v-model:value="dataModel.labReportDict"
                        v-model:label="dataModel.labReportCode"></NwDic>
                </n-form-item-gi>
            </n-grid>
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="队号" path="duiHao">
                    <n-input placeholder="队号" v-model:value="dataModel.duiHao" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="任务来源" path="taskSource"
                    v-if="dataModel.taskSource !== FormPermissionEnum.HIDE">
                    <NwDic dictCode="TASK_SOURCE" v-model:value="dataModel.taskSourceDict"
                        v-model:label="dataModel.taskSource"></NwDic>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="取样人" path="samplingUserName">
                    <n-input placeholder="取样人" v-model:value="dataModel.samplingUserName" disabled />
                    <n-button type="primary" @click="samplingPickRef?.sonFn()">选择</n-button>
                    <EmployeePick ref="samplingPickRef" @update:callback="getSamplingUsers" :multiple="false"></EmployeePick>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="取样地点" path="samplingSpot"
                    v-if="dataModel.samplingSpot !== FormPermissionEnum.HIDE">
                    <n-input placeholder="取样地点" v-model:value="dataModel.samplingSpot"
                        :disabled="dataPermits.duiHsamplingSpotao === FormPermissionEnum.READONLY" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="取样日期（灰）" path="samplingAshDate"
                    v-if="dataModel.samplingAshDate !== FormPermissionEnum.HIDE">
                    <n-date-picker placeholder="取样日期（灰）" v-model:formatted-value="dataModel.samplingAshDate"
                        value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="水样来源" path="waterSampleSource"
                    v-if="dataModel.waterSampleSource !== FormPermissionEnum.HIDE">
                    <n-input placeholder="水样来源" v-model:value="dataModel.waterSampleSource"
                        :disabled="dataPermits.waterSampleSource === FormPermissionEnum.READONLY" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="水样桶号" path="waterSampleBarrelNumber"
                    v-if="dataModel.waterSampleBarrelNumber !== FormPermissionEnum.HIDE">
                    <n-input placeholder="水样桶号" v-model:value="dataModel.waterSampleBarrelNumber"
                        :disabled="dataPermits.waterSampleBarrelNumber === FormPermissionEnum.READONLY" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="取样日期（水）" path="samplingWaterDate"
                    v-if="dataModel.samplingWaterDate !== FormPermissionEnum.HIDE">
                    <n-date-picker placeholder="取样日期（水）" v-model:formatted-value="dataModel.samplingWaterDate"
                        value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" />
                </n-form-item-gi>
            </n-grid>
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">井基础信息</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="构造区块" path="structuralBlock"
                    v-if="dataModel.structuralBlock !== FormPermissionEnum.HIDE">
                    <NwDic dictCode="STRUCTURAL_BLOCK" v-model:value="dataModel.structuralBlockDict"
                        v-model:label="dataModel.structuralBlock"></NwDic>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="井号" path="wellsNumber"
                    v-if="dataModel.structuralBlock !== FormPermissionEnum.HIDE">
                    <NwDic dictCode="WELLS_NUMBER" v-model:value="dataModel.wellsNumberDict"
                        v-model:label="dataModel.wellsNumber"></NwDic>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="完成日期" path="finishDate"
                    v-if="dataModel.finishDate !== FormPermissionEnum.HIDE">
                    <n-date-picker placeholder="完成日期" v-model:formatted-value="dataModel.finishDate"
                        value-format="yyyy-MM-dd HH:mm:ss" type="date" style="width:100%" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="井深(m)" path="wellsDepth">
                    <n-input-number v-model:value="dataModel.wellsDepth" :min="0" style="width:100%" placeholder="井深(m)" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="垂深(m)" path="verticalDepth">
                    <n-input-number v-model:value="dataModel.verticalDepth" :min="0" style="width:100%"
                        placeholder="垂深(m)"></n-input-number>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="套管尺寸(mm)" path="casingSize">
                    <n-input-number v-model:value="dataModel.casingSize" :min="0" style="width:100%"
                        placeholder="套管尺寸(mm)"></n-input-number>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="固井方式" path="cementingMode">
                    <NwDic dictCode="CEMENTING_MODE" v-model:value="dataModel.cementingModeDict"
                        v-model:label="dataModel.cementingMode"></NwDic>
                </n-form-item-gi>
            </n-grid>
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">实验条件</h3>
                    <n-button type="primary" style="margin-left:10px;" @click="addCondition">添加</n-button>
                </n-form-item-gi>
            </n-grid>
            <n-card style="width:100%;margin-top: 10px;" title=" "
                v-for="item, index of dataModel.cemlabExperimentConditionList">
                <template #header-extra>
                    <n-button type="error" style="float:right" @click="deleteCondition(index)">删除</n-button>
                </template>
                <n-form :ref="(d)=>{sonForms.push(d)}" :model="item" :rules="sonRules" size="medium" label-placement="left" label-width="140"
                    require-mark-placement="right-hanging" style="padding:20px 30px">
                    <n-grid :cols="24" :x-gap="24">
                        <n-form-item-gi :span="12" label="样品类型" path="sampleType">
                            <n-select :options="sampleTypeEnum" placeholder="浆体类型" v-model:value="item.sampleType"
                                @update:value="updateSampleType(index)" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="浆体类型" path="slurryType">
                            <n-select :options="slurryTypeEnum" placeholder="浆体类型" v-model:value="item.slurryType"
                                @update:value="updateSlurryType(index)" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="水泥型号" path="cementType">
                            <n-tree-select :options="cementTypeOptions" placeholder="水泥型号" v-model:value="item.cementType"
                                :show-path="true">
                            </n-tree-select>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="加量" path="cementQuantity">
                            <n-input-number :min="0" style="width:100%" placeholder="加量"
                                v-model:value="item.cementQuantity"></n-input-number>
                        </n-form-item-gi>
                        <n-form-item-gi :span="24" label="水泥配方" path="slurryFormulation">
                            <n-input placeholder="水泥配方" disabled v-model:value="item.slurryFormulation" />
                            <n-button @click="slurryFormulationShow(index)" type="primary">
                                选择
                            </n-button>
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="实验温度" path="experimentTemperature">
                            <n-input placeholder="实验温度" v-model:value="item.experimentTemperature" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="实验压力" path="experimentPressure">
                            <n-input placeholder="实验压力" v-model:value="item.experimentPressure" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="升温时间" path="heatingTime">
                            <n-input placeholder="升温时间" v-model:value="item.heatingTime" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="养护温度(°C)" path="curingTemperature">
                            <n-input placeholder="养护温度(°C)" v-model:value="item.curingTemperature" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="养护压力(MPa)" path="curingPressure">
                            <n-input placeholder="养护压力(MPa)" v-model:value="item.curingPressure" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="养护时间(h)" path="curingTime">
                            <n-input placeholder="养护时间(h)" v-model:value="item.curingTime" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="静止温度(°C)" path="staticTemperature">
                            <n-input placeholder="静止温度(°C)" v-model:value="item.staticTemperature" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="系数" path="coefficient">
                            <n-input placeholder="系数" v-model:value="item.coefficient" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="水泥浆密度(g/cm³)" path="cementDensity">
                            <n-input placeholder="水泥浆密度(g/cm³)" v-model:value="item.cementDensity" />
                        </n-form-item-gi>
                        <n-form-item-gi :span="12" label="水灰比" path="waterCementRatio">
                            <n-input placeholder="水灰比" v-model:value="item.waterCementRatio" />
                        </n-form-item-gi>
                    </n-grid>
                </n-form>
                
            </n-card>
            <n-grid :cols="24" :x-gap="24" style="margin-top:10px;">
                <n-form-item-gi :span="24" label="">
                    <h3 class="card-title">水泥浆性能要求</h3>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-scrollbar x-scrollable>
                        <vxe-grid ref="bindGrid" v-bind="bind" :data="dataModel.cemlabExperimentSlurryDemandList">
                            <template #slurryType_default="{ row }">
                                <vxe-select v-model="row.slurryType" disabled>
                                    <vxe-option v-for="item in slurryTypeEnum" :key="item.value" :value="item.value"
                                        :label="item.label"></vxe-option>
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
                <n-form-item-gi :span="24" label="备注" path="remark">
                    <n-input placeholder="备注" type="textarea" v-model:value="dataModel.remark" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="实验人员" path="experimentUserName">
                    <n-input placeholder="实验人员" v-model:value="dataModel.experimentUserName"/>
                    <n-button type="primary" @click="employeePickRef?.sonFn()">选择</n-button>
                    <EmployeePick ref="employeePickRef" @update:callback="getUsers" :multiple="false"></EmployeePick>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog" style="width:60%;">
            <template #header>
                <div>水泥配方选择</div>
            </template>
            <n-button type="primary" @click="slurryFormulationAdd" style="margin-left:10px;">新增</n-button>
            <n-button type="error" @click="slurryFormulationDelete" style="margin-left:10px;">删除</n-button>
            <vxe-grid ref="xGrid" v-bind="cementTypeBind" :data="slurryFormulationData">
                <template #recipeMaterialsDict_edit="{ row }">
                    <n-tree-select :options="cementTypeOptions" placeholder="水泥型号"
                        v-model:value="row.recipeMaterialsDict"
                        @update:value="(value: any, e: any) => recipeMaterialsDictChange(value, e, row)" :show-path="true">
                    </n-tree-select>
                </template>
                <template #density_edit="{ row }">
                    <vxe-input v-model="row.recipeQuantity" type="number"></vxe-input>
                </template>
            </vxe-grid>
            <template #action>
                <n-button @click="slurryFormulationSubmit" type="primary">
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