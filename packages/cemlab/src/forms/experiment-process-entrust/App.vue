<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NScrollbar,
  NDataTable,
  NSelect,
  NSpace,
  NTimePicker,
  NImage,
} from "naive-ui";
import { FormModal, actualBind, cementSlurryBind, slurryBind, prepadBind, deviceNameList } from "./App";
import { Column, VxeGridProps, VxeTablePropTypes } from "vxe-table";
import { rowDark } from "naive-ui/es/legacy-grid/styles";
import { FormPermissionEnum, NwFieldGrid, NwDic, NwIcon } from "@platform/main";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  gridDataPermits,
  gridRefs,
  conditionColumns,
  experimentConditionColumns,
  testItemColumns,
  cementPasteColumns,
  gridRules,
} = new FormModal();

//釜体类型
const futiType = [
  {
    label: "左釜",
    value: 1,
  },
  {
    label: "右釜",
    value: 2,
  },
];
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
//水泥浆列表变动
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
        //塑性粘度
        dataModel.value.cementSlurryPlasticViscosity = 0.0015 * (dataModel.value.cementSlurrySpeed300 - dataModel.value.cementSlurrySpeed100)
        cementSlurryBind.value.data && (cementSlurryBind.value.data[1].cementSlurrySpeed3 = dataModel.value.cementSlurryPlasticViscosity)
        //动切力
        dataModel.value.cementSlurryYieldVal = Number(Number(0.511 * Number(dataModel.value.cementSlurrySpeed300) - 511 * Number(dataModel.value.cementSlurryPlasticViscosity)).toFixed(2))
        cementSlurryBind.value.data && (cementSlurryBind.value.data[2].cementSlurrySpeed3 = dataModel.value.cementSlurryYieldVal)
        //流性指数
        dataModel.value.cementSlurryLiquidity = Number(Number(2.096 * Math.log10(Number(dataModel.value.cementSlurrySpeed300) / Number(dataModel.value.cementSlurrySpeed100))).toFixed(3))
        cementSlurryBind.value.data && (cementSlurryBind.value.data[3].cementSlurrySpeed3 = dataModel.value.cementSlurryLiquidity)
        //稠度系数
        dataModel.value.cementSlurryConsistencyCoefficient = Number(Number(0.511 * Number(dataModel.value.cementSlurrySpeed300) / (511 ** Number(dataModel.value.cementSlurryLiquidity))).toFixed(3))
        cementSlurryBind.value.data && (cementSlurryBind.value.data[4].cementSlurrySpeed3 = dataModel.value.cementSlurryConsistencyCoefficient)
    }
    if (!dataModel.value.cementSlurrySpeed300 || !dataModel.value.cementSlurrySpeed100) {
        dataModel.value.cementSlurryPlasticViscosity = 0;
        cementSlurryBind.value.data && (cementSlurryBind.value.data[1].cementSlurrySpeed3 = 0)
        dataModel.value.cementSlurryYieldVal = 0
        cementSlurryBind.value.data && (cementSlurryBind.value.data[2].cementSlurrySpeed3 = 0)
        dataModel.value.cementSlurryLiquidity = 0
        cementSlurryBind.value.data && (cementSlurryBind.value.data[3].cementSlurrySpeed3 = 0)
        dataModel.value.cementSlurryConsistencyCoefficient = 0
        cementSlurryBind.value.data && (cementSlurryBind.value.data[4].cementSlurrySpeed3 = 0)
    }
}
//泥浆列表变动
const slurryChange = (v: any, row: any, column: any) => {
    if (column.field == "slurrySpeed3") {
        dataModel.value.slurrySpeed3 = v.value;
        row.slurrySpeed3 = v.value;
    }
    if (column.field == "slurrySpeed6") {
        dataModel.value.slurrySpeed6 = v.value;
        row.slurrySpeed6 = v.value;
    }
    if (column.field == "slurrySpeed100") {
        dataModel.value.slurrySpeed100 = v.value;
        row.slurrySpeed100 = v.value;
    }
    if (column.field == "slurrySpeed200") {
        dataModel.value.slurrySpeed200 = v.value;
        row.slurrySpeed200 = v.value;
    }
    if (column.field == "slurrySpeed300") {
        dataModel.value.slurrySpeed300 = v.value;
        row.slurrySpeed300 = v.value;
    }
    if (column.field == "slurrySpeed600") {
        dataModel.value.slurrySpeed600 = v.value;
        row.slurrySpeed600 = v.value;
    }

    if (dataModel.value.slurrySpeed300 && dataModel.value.slurrySpeed600) {
        //塑性粘度
        dataModel.value.slurryPlasticViscosity = Number(Number(1 * (dataModel.value.slurrySpeed600 - dataModel.value.slurrySpeed300)).toFixed(2))
        slurryBind.value.data && (slurryBind.value.data[1].slurrySpeed3 = dataModel.value.slurryPlasticViscosity)
        //动切力
        dataModel.value.slurryYieldVal = Number(Number(0.511 * (Number(dataModel.value.slurrySpeed300) -  Number(dataModel.value.slurrySpeed600 - dataModel.value.slurrySpeed300))).toFixed(2))
        slurryBind.value.data && (slurryBind.value.data[2].slurrySpeed3 = dataModel.value.slurryYieldVal)
        //流性指数
        dataModel.value.slurryLiquidity = Number(Number(3.322 * Math.log10(Number(dataModel.value.slurrySpeed600) / Number(dataModel.value.slurrySpeed300))).toFixed(3))
        slurryBind.value.data && (slurryBind.value.data[3].slurrySpeed3 = dataModel.value.slurryLiquidity)
        //稠度系数
        dataModel.value.slurryConsistencyCoefficient = Number(Number(0.511 * Number(dataModel.value.slurrySpeed300) / (511 ** Number(dataModel.value.slurryLiquidity))).toFixed(3))
        slurryBind.value.data && (slurryBind.value.data[4].slurrySpeed3 = dataModel.value.slurryConsistencyCoefficient)
    }
    if (!dataModel.value.slurrySpeed300 || !dataModel.value.slurrySpeed600) {
        dataModel.value.slurryPlasticViscosity = 0;
        slurryBind.value.data && (slurryBind.value.data[1].slurrySpeed3 = 0)
        dataModel.value.slurryYieldVal = 0;
        slurryBind.value.data && (slurryBind.value.data[2].slurrySpeed3 = 0)
        dataModel.value.slurryLiquidity = 0;
        slurryBind.value.data && (slurryBind.value.data[3].slurrySpeed3 = 0)
        dataModel.value.slurryConsistencyCoefficient = 0;
        slurryBind.value.data && (slurryBind.value.data[4].slurrySpeed3 = 0)
    }
}
//前置液列表变动
const prepadChange = (v: any, row: any, column: any) => {
    if (column.field == "prepadSpeed3") {
        dataModel.value.prepadSpeed3 = v.value;
        row.prepadSpeed3 = v.value;
    }
    if (column.field == "prepadSpeed6") {
        dataModel.value.prepadSpeed6 = v.value;
        row.prepadSpeed6 = v.value;
    }
    if (column.field == "prepadSpeed100") {
        dataModel.value.prepadSpeed100 = v.value;
        row.prepadSpeed100 = v.value;
    }
    if (column.field == "prepadSpeed200") {
        dataModel.value.prepadSpeed200 = v.value;
        row.prepadSpeed200 = v.value;
    }
    if (column.field == "prepadSpeed300") {
        dataModel.value.prepadSpeed300 = v.value;
        row.prepadSpeed300 = v.value;
    }
    if (column.field == "prepadSpeed600") {
        dataModel.value.prepadSpeed600 = v.value;
        row.prepadSpeed600 = v.value;
    }

    if (dataModel.value.prepadSpeed300 && dataModel.value.prepadSpeed600) {
        //塑性粘度
        dataModel.value.prepadPlasticViscosity = Number(Number(1 * (dataModel.value.prepadSpeed600 - dataModel.value.prepadSpeed300)).toFixed(2))
        prepadBind.value.data && (prepadBind.value.data[1].prepadSpeed3 = dataModel.value.prepadPlasticViscosity)
        //动切力
        dataModel.value.prepadYieldVal = Number(Number(0.511 * (Number(dataModel.value.prepadSpeed300) -  Number(dataModel.value.prepadSpeed600 - dataModel.value.prepadSpeed300))).toFixed(2))
        prepadBind.value.data && (prepadBind.value.data[2].prepadSpeed3 = dataModel.value.prepadYieldVal)
        //流性指数
        dataModel.value.prepadLiquidity = Number(Number(3.322 * Math.log10(Number(dataModel.value.prepadSpeed600) / Number(dataModel.value.prepadSpeed300))).toFixed(3))
        prepadBind.value.data && (prepadBind.value.data[3].prepadSpeed3 = dataModel.value.prepadLiquidity)
        //稠度系数
        dataModel.value.prepadConsistencyCoefficient = Number(Number(0.511 * Number(dataModel.value.prepadSpeed300) / (511 ** Number(dataModel.value.prepadLiquidity))).toFixed(3))
        prepadBind.value.data && (prepadBind.value.data[4].prepadSpeed3 = dataModel.value.prepadConsistencyCoefficient)
    }
    if (!dataModel.value.prepadSpeed300 || !dataModel.value.prepadSpeed600) {
        dataModel.value.prepadPlasticViscosity = 0;
        prepadBind.value.data && (prepadBind.value.data[1].prepadSpeed3 = 0)
        dataModel.value.prepadYieldVal = 0;
        prepadBind.value.data && (prepadBind.value.data[2].prepadSpeed3 = 0)
        dataModel.value.prepadLiquidity = 0;
        prepadBind.value.data && (prepadBind.value.data[3].prepadSpeed3 = 0)
        dataModel.value.prepadConsistencyCoefficient = 0;
        prepadBind.value.data && (prepadBind.value.data[4].prepadSpeed3 = 0)
    }
}
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      :rules="rules"
      size="medium"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      style="padding: 20px 50px"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">实验名称</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="实验名称"
          path="experimentName"
          v-if="dataPermits.experimentName !== FormPermissionEnum.HIDE"
        >
          <n-input
            placeholder="实验名称"
            v-model:value="dataModel.experimentName"
            :disabled="
              dataPermits.experimentName === FormPermissionEnum.READONLY
            "
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="实验时间"
          path="experimentDate"
          v-if="dataPermits.experimentDate !== FormPermissionEnum.HIDE"
        >
          <n-date-picker
          :input-readonly="true"
            v-model:formatted-value="dataModel.experimentDate"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">增加实验条件</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="24"
          path="cemlabExperimentProcessConditionList"
        >
          <NwFieldGrid
            v-model:value="dataModel.cemlabExperimentProcessConditionList"
            style="width: 100%"
            size="small"
            :columns="conditionColumns"
            :cell-style="{padding:'6px'}"
           :edit-enabled="true"
          >
            <template #conditionItem="{ row }">
              <nw-dic
                :selectOptions="{ 'consistent-menu-width': false }"
                dictCode="PROCESS_CONDITION"
                v-model:label="row.conditionItem"
                v-model:value="row.conditionItemDict"
                size="small"
                placeholder="请选择类型"
              />
            </template>
            <template #conditionItemDefault="{ row }">
              {{ row.conditionItem }}
            </template>
            <template #conditionVal="{ row }">
              <n-input v-model:value="row.conditionVal"></n-input>
            </template>
             <template #conditionValDefault="{ row }">
             {{row.conditionVal}}
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">实验结果</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
            <vxe-grid v-bind="actualBind" style="width:100%">
              <template #actualExperimentTemperature_edit="{ row,column }">
                <vxe-input v-model="row.actualExperimentTemperature" @change="(v: any) => actualChange(v, column)"></vxe-input>
              </template>
              <template #actualExperimentTemperature_defalut="{ row }">
                {{ row.actualExperimentTemperature }}
              </template>
              <template #actualExperimentPressure_edit="{ row,column }">
                <vxe-input v-model="row.actualExperimentPressure" @change="(v: any) => actualChange(v, column)"></vxe-input>
              </template>
              <template #actualExperimentPressure_defalut="{ row }">
                {{ row.actualExperimentPressure }}
              </template>
              <template #actualHeatingTime_edit="{ row,column }">
                <vxe-input v-model="row.actualHeatingTime" @change="(v: any) => actualChange(v, column)"></vxe-input>
              </template>
              <template #actualHeatingTime_defalut="{ row }">
                {{ row.actualHeatingTime }}
              </template>
            </vxe-grid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="cemlabExperimentItemsList">
          <NwFieldGrid
            v-model:value="dataModel.cemlabExperimentItemsList"
            style="width: 100%"
            :columns="testItemColumns"
            size="small"
            :cell-style="{padding:'6px'}"
          >
            <template #detectionItem="{ row }">
              <nw-dic
                :selectOptions="{ 'consistent-menu-width': false }"
                dictCode="DETECTION_ITEM"
                v-model:label="row.detectionItem"
                v-model:value="row.detectionItemDict"
                size="small"
                placeholder="请选择类型"
              />
            </template>
             <template #detectionItemDefault="{ row }">
             {{row.detectionItem}}
            </template>
            <template #detectionVal="{ row }">
              <n-input-number
                v-model:value="row.detectionVal"
                :show-button="false"
              />
            </template>
            <template #detectionValDefault="{ row }">
             {{row.detectionVal}}
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
<!-- 水泥浆 -->
        <n-form-item-gi :span="24" label="" path="">
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
        <!-- 泥浆 -->
        <n-form-item-gi :span="24" label="" path="">
          <vxe-grid v-bind="slurryBind" style="width:100%">
            <template #slurrySpeed3_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed3" @change="(v: any) => slurryChange(v, row, column)" type="number"></vxe-input>
            </template>
            <template #slurrySpeed6_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed6" @change="(v: any) => slurryChange(v, row, column)" type="number"></vxe-input>
            </template>
            <template #slurrySpeed100_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed100" @change="(v: any) => slurryChange(v, row, column)"
                type="number"></vxe-input>
            </template>
            <template #slurrySpeed200_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed200" @change="(v: any) => slurryChange(v, row, column)"
                type="number"></vxe-input>
            </template>
            <template #slurrySpeed300_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed300" @change="(v: any) => slurryChange(v, row, column)"
                type="number"></vxe-input>
            </template>
            <template #slurrySpeed600_edit="{ row, column }">
              <vxe-input v-model="row.slurrySpeed600" @change="(v: any) => slurryChange(v, row, column)"
                type="number"></vxe-input>
            </template>
            <template #slurrySpeed3_defalut="{ row }">
              {{ row.slurrySpeed3 }}
            </template>
            <template #slurrySpeed6_defalut="{ row }">
              {{ row.slurrySpeed6 }}
            </template>
            <template #slurrySpeed100_defalut="{ row }">
              {{ row.slurrySpeed100 }}
            </template>
            <template #slurrySpeed200_defalut="{ row }">
              {{ row.slurrySpeed200 }}
            </template>
            <template #slurrySpeed300_defalut="{ row }">
              {{ row.slurrySpeed300 }}
            </template>
            <template #slurrySpeed600_defalut="{ row }">
              {{ row.slurrySpeed600 }}
            </template>
          </vxe-grid>
        </n-form-item-gi>
        <!-- 前置液表格 -->
        <n-form-item-gi :span="24" label="" path="">
        <vxe-grid v-bind="prepadBind" style="width:100%">
          <template #prepadSpeed3_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed3" @change="(v: any) => prepadChange(v, row, column)" type="number"></vxe-input>
          </template>
          <template #prepadSpeed6_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed6" @change="(v: any) => prepadChange(v, row, column)" type="number"></vxe-input>
          </template>
          <template #prepadSpeed100_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed100" @change="(v: any) => prepadChange(v, row, column)"
              type="number"></vxe-input>
          </template>
          <template #prepadSpeed200_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed200" @change="(v: any) => prepadChange(v, row, column)"
              type="number"></vxe-input>
          </template>
          <template #prepadSpeed300_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed300" @change="(v: any) => prepadChange(v, row, column)"
              type="number"></vxe-input>
          </template>
          <template #prepadSpeed600_edit="{ row, column }">
            <vxe-input v-model="row.prepadSpeed600" @change="(v: any) => prepadChange(v, row, column)"
              type="number"></vxe-input>
          </template>
          <template #prepadSpeed3_defalut="{ row }">
            {{ row.prepadSpeed3 }}
          </template>
          <template #prepadSpeed6_defalut="{ row }">
            {{ row.prepadSpeed6 }}
          </template>
          <template #prepadSpeed100_defalut="{ row }">
            {{ row.prepadSpeed100 }}
          </template>
          <template #prepadSpeed200_defalut="{ row }">
            {{ row.prepadSpeed200 }}
          </template>
          <template #prepadSpeed300_defalut="{ row }">
            {{ row.prepadSpeed300 }}
          </template>
          <template #prepadSpeed600_defalut="{ row }">
            {{ row.prepadSpeed600 }}
          </template>
        </vxe-grid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">图表结果</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="仪器"
          path="deviceName"
        >
          <n-select
            v-if="dataPermits.deviceName !== FormPermissionEnum.HIDE"
            :options="deviceNameList"
            labelField="deviceName"
            valueField="deviceName"
            v-model:value="dataModel.deviceName"
            @update-value="(d, op: any) => { dataModel.deviceCode = op.deviceCode; dataModel.deviceId = op.id }"
          >
          </n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="自编号" path="deviceCode">
          <n-input
          :readonly="true"
            placeholder="自编号"
            v-model:value="dataModel.deviceCode"
            :disabled="dataPermits.deviceCode === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="釜体" path="futi">
          <n-select v-model:value="dataModel.futi" :options="futiType" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="数据获取时间">
          <n-space>
            <n-time-picker
             placeholder="开始时间"
              v-model:formatted-value="dataModel.dataStartTime"
              value-format="HH:mm"
            />
            <n-time-picker
             placeholder="结束时间"
              v-model:formatted-value="dataModel.dataEndTime"
              value-format="HH:mm"
            />
          </n-space>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="图表名称"
          path="chartName"
          v-if="dataPermits.chartName !== FormPermissionEnum.HIDE"
        >
          <n-input
            v-model:value="dataModel.chartName"
            :disabled="dataPermits.chartName === FormPermissionEnum.READONLY"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :span="24"
          label="图表"
          path="chartName"
          v-if="dataPermits.chartName !== FormPermissionEnum.HIDE"
        >
          <n-image
            width="100"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            :previewed-img-props="{ style: { border: '8px solid white' } }"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
<!-- 
    <n-divider dashed> 调试信息 </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->

  </n-scrollbar>
</template>
