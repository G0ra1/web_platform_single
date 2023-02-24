<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  NForm,
  NInput,
  NDivider,
  NInputNumber,
  NTabs,
  NTabPane,
  NScrollbar,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NTimePicker,
  NSpace,
  NButton,
  NCard,
  NSelect,
  NTreeSelect,
} from "naive-ui";
import { FormModal, bind } from "./App";
import { NwFieldGrid, request } from "@platform/main";
import { getExperimentProcess } from "./api";
import { VxeGridProps } from "vxe-table";
const {
  formRef,
  sonForms,
  dataModel,
  rules,
  sonRules,
  dataPermits,
  experimentTaskDataModel,
  conditionColumns,
  itemsColumns,
  experimentSpecimenColumns,
} = new FormModal();

const showTable = ref<number>(1);
const bindGrid = ref(); //水泥浆性能要求 表单
let cementTypeOptions: any = []; //实验条件中的水泥型号
//加载水泥型号树形下拉框
request({
  url: `/main/dictTree/list?parentCode=CEMENT_TYPE`,
  method: "get",
}).then((res) => {
  res.map((d: any) =>
    cementTypeOptions.push({
      label: d.dictName,
      key: d.dictCode,
      children: d.kids.map((c: any) => ({
        label: c.dictName,
        key: c.dictCode,
        parentName: d.dictName,
      })),
    })
  );
});
//样品类型变更
let updateSampleType = (num: number) => {
  const sampleType =
    dataModel.value.cemlabExperimentConditionList[num].sampleType;
  dataModel.value.cemlabExperimentConditionList.forEach((item) => {
    item.sampleType = sampleType;
  });
  dataModel.value.sampleType = sampleType;
};
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

//浆体类型变更
const updateSlurryType = (num: number) => {
  dataModel.value.cemlabExperimentSlurryDemandList[num].slurryType =
    dataModel.value.cemlabExperimentConditionList[num].slurryType;
};
const sampleTypeEnum = [
  { label: "小样", value: 1 },
  { label: "大样", value: 2 },
  { label: "半大样", value: 3 },
];
const slurryTypeEnum = [
  { label: "领浆", value: 1 },
  { label: "中间浆", value: 2 },
  { label: "尾桨", value: 3 },
];
const slurryType = ["", "领浆", "中间浆", "尾桨"];
//污染实验列表
const contaminateBind = reactive<VxeGridProps>({
  align: "center",
  keepSource: true,
  border: true,
  editConfig: {
    trigger: "click",
    mode: "row",
  },
  columns: [
    { field: "slurryType", title: "浆体类型" },
    { field: "contaminateQuantity", title: "加量(%)" },
    { field: "contaminateFormula", title: "污染实验配方" },
  ],
  data: [],
});
//实验结果 自动填入 表单
const actualBind = reactive<VxeGridProps>({
  align: "center",
  keepSource: true,
  border: true,
  editConfig: {
    trigger: "click",
    mode: "row",
  },
  columns: [
    { field: "actualExperimentTemperature", title: "实际实验温度(°C)" },
    { field: "actualExperimentPressure", title: "实际实验压力(MPa)" },
    { field: "actualHeatingTime", title: "实际升温时间(min)" },
  ],
  data: [],
});
//水泥浆列表
const cementSlurryBind = reactive<VxeGridProps>({
  align: "center",
  keepSource: true,
  border: true,
  editConfig: {
    trigger: "click",
    mode: "row",
  },
  columns: [
    {
      title: "类型",
      children: [{ field: "six", title: "六转速(r/min)" }],
    },
    {
      title: "水泥浆",
      children: [
        { field: "cementSlurrySpeed3", title: "3" },
        { field: "cementSlurrySpeed6", title: "6" },
        { field: "cementSlurrySpeed100", title: "100" },
        { field: "cementSlurrySpeed200", title: "200" },
        { field: "cementSlurrySpeed300", title: "300" },
        { field: "cementSlurrySpeed600", title: "600" },
      ],
    },
  ],
  data: [],
  mergeCells: [
    { row: 1, col: 1, rowspan: 1, colspan: 6 },
    { row: 2, col: 1, rowspan: 1, colspan: 6 },
    { row: 3, col: 1, rowspan: 1, colspan: 6 },
    { row: 4, col: 1, rowspan: 1, colspan: 6 },
  ],
});
//泥浆列表
const slurryBind = reactive<VxeGridProps>({
  align: "center",
  border: true,
  keepSource: true,
  editConfig: {
    trigger: "click",
    mode: "row",
    beforeEditMethod({ rowIndex }) {
      if (rowIndex != 0) {
        return false;
      }
      return true;
    },
  },
  columns: [
    {
      title: "类型",
      children: [{ field: "six", title: "六转速(r/min)" }],
    },
    {
      title: "泥浆",
      children: [
        { field: "slurrySpeed3", title: "3" },
        { field: "slurrySpeed6", title: "6" },
        { field: "slurrySpeed100", title: "100" },
        { field: "slurrySpeed200", title: "200" },
        { field: "slurrySpeed300", title: "300" },
        { field: "slurrySpeed600", title: "600" },
      ],
    },
  ],
  data: [],
  mergeCells: [
    { row: 1, col: 1, rowspan: 1, colspan: 6 },
    { row: 2, col: 1, rowspan: 1, colspan: 6 },
    { row: 3, col: 1, rowspan: 1, colspan: 6 },
    { row: 4, col: 1, rowspan: 1, colspan: 6 },
  ],
});
//前置液列表
const prepadBind = reactive<VxeGridProps>({
  align: "center",
  border: true,
  keepSource: true,
  editConfig: {
    trigger: "click",
    mode: "row",
    beforeEditMethod({ rowIndex }) {
      if (rowIndex != 0) {
        return false;
      }
      return true;
    },
  },
  columns: [
    {
      title: "类型",
      children: [{ field: "six", title: "六转速(r/min)" }],
    },
    {
      title: "前置液",
      children: [
        { field: "prepadSpeed3", title: "3" },
        { field: "prepadSpeed6", title: "6" },
        { field: "prepadSpeed100", title: "100" },
        { field: "prepadSpeed200", title: "200" },
        { field: "prepadSpeed300", title: "300" },
        { field: "prepadSpeed600", title: "600" },
      ],
    },
  ],
  data: [
    {
      six: "平均转速(r/min)",
      prepadSpeed3: experimentTaskDataModel.value.prepadSpeed3,
      prepadSpeed6: experimentTaskDataModel.value.prepadSpeed6,
      prepadSpeed100: experimentTaskDataModel.value.prepadSpeed100,
      prepadSpeed200: experimentTaskDataModel.value.prepadSpeed200,
      prepadSpeed300: experimentTaskDataModel.value.prepadSpeed300,
      prepadSpeed600: experimentTaskDataModel.value.prepadSpeed600,
    },
    {
      six: "塑性粘度(Pa·s)",
      prepadSpeed3: experimentTaskDataModel.value.prepadPlasticViscosity,
    },
    {
      six: "动切力(Pa)",
      prepadSpeed3: experimentTaskDataModel.value.prepadYieldVal,
    },
    {
      six: "流性指数n",
      prepadSpeed3: experimentTaskDataModel.value.prepadLiquidity,
    },
    {
      six: "稠度系数k(Pa·sn)",
      prepadSpeed3: experimentTaskDataModel.value.prepadConsistencyCoefficient,
    },
  ],
  mergeCells: [
    { row: 1, col: 1, rowspan: 1, colspan: 6 },
    { row: 2, col: 1, rowspan: 1, colspan: 6 },
    { row: 3, col: 1, rowspan: 1, colspan: 6 },
    { row: 4, col: 1, rowspan: 1, colspan: 6 },
  ],
});
//混合液体变动（也就是水泥浆）
let mixedCementSlurryBind = reactive<VxeGridProps>({
  align: "center",
  border: true,
  editConfig: {
    trigger: "click",
    mode: "row",
    beforeEditMethod({ rowIndex }) {
      if (rowIndex != 0) {
        return false;
      }
      return true;
    },
  },
  columns: [
    {
      title: "类型",
      children: [{ field: "six", title: "六转速(r/min)" }],
    },
    {
      title: "混合液体",
      children: [
        { field: "cementSlurrySpeed3", title: "3" },
        { field: "cementSlurrySpeed6", title: "6" },
        { field: "cementSlurrySpeed100", title: "100" },
        { field: "cementSlurrySpeed200", title: "200" },
        { field: "cementSlurrySpeed300", title: "300" },
        { field: "cementSlurrySpeed600", title: "600" },
      ],
    },
  ],
  data: [],
  mergeCells: [
    { row: 1, col: 1, rowspan: 1, colspan: 6 },
    { row: 2, col: 1, rowspan: 1, colspan: 6 },
    { row: 3, col: 1, rowspan: 1, colspan: 6 },
    { row: 4, col: 1, rowspan: 1, colspan: 6 },
  ],
});
const showGrid = ref<boolean>(false);
const cementSlurryGrid = ref();
const slurryGrid = ref();
const prepadGrid = ref();
const mixedCementSlurryGrid = ref();
let func = (id: string) => {
  getExperimentProcess(id).then((d: any) => {
    experimentTaskDataModel.value = d;
    contaminateBind.data = [
      {
        slurryType: slurryType[experimentTaskDataModel.value.slurryType],
        contaminateQuantity: experimentTaskDataModel.value.contaminateQuantity,
        contaminateFormula: experimentTaskDataModel.value.contaminateFormula,
      },
    ];

    actualBind.data = [
      {
        actualExperimentTemperature:
          experimentTaskDataModel.value.actualExperimentTemperature,
        actualExperimentPressure:
          experimentTaskDataModel.value.actualExperimentPressure,
        actualHeatingTime: experimentTaskDataModel.value.actualHeatingTime,
      },
    ];
    cementSlurryBind.data = [
      {
        six: "平均转速(r/min)",
        cementSlurrySpeed3: experimentTaskDataModel.value.cementSlurrySpeed3,
        cementSlurrySpeed6: experimentTaskDataModel.value.cementSlurrySpeed6,
        cementSlurrySpeed100:
          experimentTaskDataModel.value.cementSlurrySpeed100,
        cementSlurrySpeed200:
          experimentTaskDataModel.value.cementSlurrySpeed200,
        cementSlurrySpeed300:
          experimentTaskDataModel.value.cementSlurrySpeed300,
        cementSlurrySpeed600:
          experimentTaskDataModel.value.cementSlurrySpeed600,
      },
      {
        six: "塑性粘度(Pa·s)",
        cementSlurrySpeed3:
          experimentTaskDataModel.value.cementSlurryPlasticViscosity,
      },
      {
        six: "动切力(Pa)",
        cementSlurrySpeed3: experimentTaskDataModel.value.cementSlurryYieldVal,
      },
      {
        six: "流性指数n",
        cementSlurrySpeed3: experimentTaskDataModel.value.cementSlurryLiquidity,
      },
      {
        six: "稠度系数k(Pa·sn)",
        cementSlurrySpeed3:
          experimentTaskDataModel.value.cementSlurryConsistencyCoefficient,
      },
    ];

    slurryBind.data = [
      {
        six: "平均转速(r/min)",
        slurrySpeed3: experimentTaskDataModel.value.slurrySpeed3,
        slurrySpeed6: experimentTaskDataModel.value.slurrySpeed6,
        slurrySpeed100: experimentTaskDataModel.value.slurrySpeed100,
        slurrySpeed200: experimentTaskDataModel.value.slurrySpeed200,
        slurrySpeed300: experimentTaskDataModel.value.slurrySpeed300,
        slurrySpeed600: experimentTaskDataModel.value.slurrySpeed600,
      },
      {
        six: "塑性粘度(Pa·s)",
        slurrySpeed3: experimentTaskDataModel.value.slurryPlasticViscosity,
      },
      {
        six: "动切力(Pa)",
        slurrySpeed3: experimentTaskDataModel.value.slurryYieldVal,
      },
      {
        six: "流性指数n",
        slurrySpeed3: experimentTaskDataModel.value.slurryLiquidity,
      },
      {
        six: "稠度系数k(Pa·sn)",
        slurrySpeed3:
          experimentTaskDataModel.value.slurryConsistencyCoefficient,
      },
    ];
    prepadBind.data = [
      {
        six: "平均转速(r/min)",
        prepadSpeed3: experimentTaskDataModel.value.prepadSpeed3,
        prepadSpeed6: experimentTaskDataModel.value.prepadSpeed6,
        prepadSpeed100: experimentTaskDataModel.value.prepadSpeed100,
        prepadSpeed200: experimentTaskDataModel.value.prepadSpeed200,
        prepadSpeed300: experimentTaskDataModel.value.prepadSpeed300,
        prepadSpeed600: experimentTaskDataModel.value.prepadSpeed600,
      },
      {
        six: "塑性粘度(Pa·s)",
        prepadSpeed3: experimentTaskDataModel.value.prepadPlasticViscosity,
      },
      {
        six: "动切力(Pa)",
        prepadSpeed3: experimentTaskDataModel.value.prepadYieldVal,
      },
      {
        six: "流性指数n",
        prepadSpeed3: experimentTaskDataModel.value.prepadLiquidity,
      },
      {
        six: "稠度系数k(Pa·sn)",
        prepadSpeed3:
          experimentTaskDataModel.value.prepadConsistencyCoefficient,
      },
    ];

    mixedCementSlurryBind.data = [
      {
        six: "平均转速(r/min)",
        cementSlurrySpeed3: experimentTaskDataModel.value.cementSlurrySpeed3,
        cementSlurrySpeed6: experimentTaskDataModel.value.cementSlurrySpeed6,
        cementSlurrySpeed100:
          experimentTaskDataModel.value.cementSlurrySpeed100,
        cementSlurrySpeed200:
          experimentTaskDataModel.value.cementSlurrySpeed200,
        cementSlurrySpeed300:
          experimentTaskDataModel.value.cementSlurrySpeed300,
        cementSlurrySpeed600:
          experimentTaskDataModel.value.cementSlurrySpeed600,
      },
      {
        six: "流性指数n",
        cementSlurrySpeed3: experimentTaskDataModel.value.cementSlurryLiquidity,
      },
      {
        six: "稠度系数k(Pa·sn)",
        cementSlurrySpeed3:
          experimentTaskDataModel.value.cementSlurryConsistencyCoefficient,
      },
    ];
    showGrid.value = true;
  });
};
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      :rules="rules"
      size="medium"
      label-placement="left"
      label-width="140"
      require-mark-placement="right-hanging"
      style="padding: 20px 30px"
    >
      <n-tabs
        type="bar"
        animated
        @update:value="(value:number)=>{showTable = value; showGrid = false}"
      >
        <n-tab-pane :name="1" tab="任务信息">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">任务基础信息</h3>
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="化验报告单编码"
              path="labReportCode"
            >
              <n-input
                placeholder=""
                v-model:value="dataModel.labReportCode"
                :readonly="true"
              ></n-input>
            </n-form-item-gi>
          </n-grid>
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="队号" path="duiHao">
              <n-input
                placeholder=""
                v-model:value="dataModel.duiHao"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="任务来源" path="taskSource">
              <n-input
                v-model:value="dataModel.taskSource"
                :readonly="true"
              ></n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="取样人" path="samplingUserName">
              <n-input
                placeholder=""
                v-model:value="dataModel.samplingUserName"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="取样地点" path="samplingSpot">
              <n-input
                placeholder=""
                v-model:value="dataModel.samplingSpot"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="取样日期（灰）"
              path="samplingAshDate"
            >
              <n-date-picker
                placeholder=""
                v-model:formatted-value="dataModel.samplingAshDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                style="width: 100%"
                :input-readonly="true"
                :show="false"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="水样来源"
              path="waterSampleSource"
            >
              <n-input
                placeholder=""
                v-model:value="dataModel.waterSampleSource"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="水样桶号"
              path="waterSampleBarrelNumber"
            >
              <n-input
                placeholder=""
                v-model:value="dataModel.waterSampleBarrelNumber"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="取样日期（水）"
              path="samplingWaterDate"
            >
              <n-date-picker
                placeholder=""
                v-model:formatted-value="dataModel.samplingWaterDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                style="width: 100%"
                :input-readonly="true"
                :show="false"
              />
            </n-form-item-gi>
          </n-grid>
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">井基础信息</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="构造区块" path="structuralBlock">
              <n-input
                placeholder=""
                v-model:value="dataModel.structuralBlock"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="井号" path="wellsNumber">
              <n-input
                placeholder=""
                v-model:value="dataModel.wellsNumber"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="完成日期" path="finishDate">
              <n-date-picker
                placeholder=""
                v-model:formatted-value="dataModel.finishDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                style="width: 100%"
                :input-readonly="true"
                :show="false"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="井深(m)" path="wellsDepth">
              <n-input-number
                v-model:value="dataModel.wellsDepth"
                :min="0"
                style="width: 100%"
                placeholder=""
                :readonly="true"
                :show-button="false"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="垂深(m)" path="verticalDepth">
              <n-input-number
                v-model:value="dataModel.verticalDepth"
                :min="0"
                style="width: 100%"
                placeholder=""
                :readonly="true"
                :show-button="false"
              ></n-input-number>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="套管尺寸(mm)" path="casingSize">
              <n-input-number
                v-model:value="dataModel.casingSize"
                :min="0"
                style="width: 100%"
                placeholder=""
                :readonly="true"
                :show-button="false"
              ></n-input-number>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="固井方式" path="cementingMode">
              <n-input
                placeholder=""
                v-model:value="dataModel.cementingMode"
                :readonly="true"
              />
            </n-form-item-gi>
          </n-grid>
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">实验条件</h3>
            </n-form-item-gi>
          </n-grid>
          <n-card
            style="width: 100%; margin-top: 10px"
            title=" "
            v-for="(item, index) of dataModel.cemlabExperimentConditionList"
          >
            <n-form
              :ref="
                (d) => {
                  sonForms.push(d);
                }
              "
              :model="item"
              :rules="sonRules"
              size="medium"
              label-placement="left"
              label-width="140"
              require-mark-placement="right-hanging"
              style="padding: 20px 30px"
            >
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="样品类型" path="sampleType">
                  <n-select
                    :options="sampleTypeEnum"
                    placeholder=""
                    v-model:value="item.sampleType"
                    @update:value="updateSampleType(index)"
                    :readonly="true"
                    :show="false"
                    :show-arrow="false"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="浆体类型" path="slurryType">
                  <n-select
                    :options="slurryTypeEnum"
                    placeholder=""
                    v-model:value="item.slurryType"
                    @update:value="updateSlurryType(index)"
                    :readonly="true"
                    :show="false"
                    :show-arrow="false"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="水泥型号" path="cementType">
                  <n-tree-select
                    :options="cementTypeOptions"
                    placeholder=""
                    v-model:value="item.cementType"
                    :show-path="true"
                    :readonly="true"
                    :show="false"
                    :show-arrow="false"
                  >
                  </n-tree-select>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="加量" path="cementQuantity">
                  <n-input-number
                    :min="0"
                    style="width: 100%"
                    placeholder=""
                    v-model:value="item.cementQuantity"
                    :readonly="true"
                    :show-button="false"
                  ></n-input-number>
                </n-form-item-gi>
                <n-form-item-gi
                  :span="24"
                  label="水泥配方"
                  path="slurryFormulation"
                >
                  <n-input
                    placeholder=""
                    :readonly="true"
                    v-model:value="item.slurryFormulation"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="实验温度"
                  path="experimentTemperature"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.experimentTemperature"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="实验压力"
                  path="experimentPressure"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.experimentPressure"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="升温时间" path="heatingTime">
                  <n-input
                    placeholder=""
                    v-model:value="item.heatingTime"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="养护温度(°C)"
                  path="curingTemperature"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.curingTemperature"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="养护压力(MPa)"
                  path="curingPressure"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.curingPressure"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="养护时间(h)"
                  path="curingTime"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.curingTime"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="静止温度(°C)"
                  path="staticTemperature"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.staticTemperature"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="系数" path="coefficient">
                  <n-input
                    placeholder=""
                    v-model:value="item.coefficient"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="水泥浆密度(g/cm³)"
                  path="cementDensity"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.cementDensity"
                    :readonly="true"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="水灰比"
                  path="waterCementRatio"
                >
                  <n-input
                    placeholder=""
                    v-model:value="item.waterCementRatio"
                    :readonly="true"
                  />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
          <n-grid :cols="24" :x-gap="24" style="margin-top: 10px">
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">水泥浆性能要求</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <vxe-grid
                ref="bindGrid"
                v-bind="bind"
                :data="dataModel.cemlabExperimentSlurryDemandList"
              >
                <template #slurryType_default="{ row }">
                  {{ slurryType[row.slurryType] }}
                </template>
              </vxe-grid>
            </n-form-item-gi>
          </n-grid>
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="备注" path="remark">
              <n-input
                style="height: 80px"
                placeholder=""
                type="textarea"
                v-model:value="dataModel.remark"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="实验人员"
              path="experimentUserName"
            >
              <n-input
                placeholder=""
                v-model:value="dataModel.experimentUserName"
                :readonly="true"
              />
            </n-form-item-gi>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane :name="2" tab="实验信息">
          <n-grid :cols="24" :x-gap="24" v-if="showTable === 2">
            <n-form-item-gi :span="24">
              <vxe-table
                keep-source
                border
                auto-resize
                :sync-resize="showTable"
                style="width: 100%"
                show-header-overflow
                :align="'center'"
                show-overflow
                :row-config="{ isHover: true }"
                :data="dataModel.experimentProcessList"
              >
                <vxe-column type="seq" title="序号" width="60"></vxe-column>
                <vxe-column
                  field="experimentName"
                  min-width="200"
                  title="实验名称"
                ></vxe-column>
                <vxe-column
                  field="experimentDate"
                  min-width="200"
                  title="实验时间"
                ></vxe-column>
                <vxe-column title="操作" width="100" show-overflow>
                  <template #default="{ row }">
                    <vxe-button
                      type="text"
                      style="color: red"
                      content="查看"
                      @click="func(row.id), (showTable = 3)"
                    ></vxe-button>
                  </template>
                </vxe-column>
              </vxe-table>
            </n-form-item-gi>
          </n-grid>
          <n-grid
            :cols="24"
            :x-gap="24"
            v-show="showGrid"
            v-if="showTable === 3"
          >
            <n-form-item-gi :span="12" label="实验名称" path="experimentName">
              <n-input
                placeholder="实验名称"
                :value="experimentTaskDataModel.experimentName"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="实验时间" path="experimentDate">
              <n-date-picker
                :input-readonly="true"
                :show="false"
                v-model:formatted-value="experimentTaskDataModel.experimentDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label=""
              path=""
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <h3 class="card-title">实验条件</h3>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              path="cemlabExperimentProcessConditionList"
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="
                  experimentTaskDataModel.cemlabExperimentProcessConditionList
                "
                style="width: 100%"
                :columns="conditionColumns"
              >
              </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label=""
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <h3 class="card-title">污染实验</h3>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <vxe-grid v-bind="contaminateBind" style="width: 100%">
              </vxe-grid>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <h3 class="card-title">实验结果</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <vxe-grid v-bind="actualBind" style="width: 100%"> </vxe-grid>
            </n-form-item-gi>
            <!-- 混合液体 -->
            <n-form-item-gi
              :span="24"
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <vxe-grid
                v-if="showGrid"
                ref="mixedCementSlurryGrid"
                v-bind="mixedCementSlurryBind"
                style="width: 100%"
              >
              </vxe-grid>
            </n-form-item-gi>
            <!-- 检测项目 -->
            <n-form-item-gi
              :span="24"
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="dataModel.cemlabExperimentItemsList"
                style="width: 100%"
                :columns="itemsColumns"
              >
              </NwFieldGrid>
            </n-form-item-gi>
            <!-- 水泥浆 -->
            <n-form-item-gi
              :span="24"
              label=""
              path=""
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <vxe-grid
                ref="cementSlurryGrid"
                v-if="showGrid"
                v-bind="cementSlurryBind"
                style="width: 100%"
              >
              </vxe-grid>
            </n-form-item-gi>
            <!-- 泥浆 -->
            <n-form-item-gi
              :span="24"
              label=""
              path=""
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <vxe-grid
                ref="slurryGrid"
                v-if="showGrid"
                v-bind="slurryBind"
                style="width: 100%"
              >
              </vxe-grid>
            </n-form-item-gi>
            <!-- 前置液表格 -->
            <n-form-item-gi
              :span="24"
              label=""
              path=""
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <vxe-grid
                ref="prepadGrid"
                v-if="showGrid"
                v-bind="prepadBind"
                style="width: 100%"
              >
              </vxe-grid>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label="实验结果"
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <n-input
                placeholder=""
                type="textarea"
                style="height: 100px"
                v-model:value="experimentTaskDataModel.experimentResult"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label="实验现象"
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <n-input
                placeholder=""
                type="textarea"
                style="height: 100px"
                :readonly="true"
                v-model:value="experimentTaskDataModel.experimentPhenomena"
              />
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="" path="">
              <h3 class="card-title">图表结果</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="仪器">
              <n-input
                placeholder=""
                v-model:value="experimentTaskDataModel.deviceName"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="自编号">
              <n-input
                placeholder=""
                :readonly="true"
                v-model:value="experimentTaskDataModel.deviceCode"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="釜体" path="futi">
              <n-select
                placeholder=""
                v-model:value="experimentTaskDataModel.futi"
                :options="futiType"
                :show-arrow="false"
                :show="false"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="数据获取时间">
              <n-input
                pair
                separator="~"
                v-model:value="experimentTaskDataModel.dataTimeArr"
                 :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="图表名称">
              <n-input
                placeholder=""
                v-model:value="experimentTaskDataModel.chartName"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="图表">
              <n-image
                width="100"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                :previewed-img-props="{ style: { border: '8px solid white' } }"
              />
            </n-form-item-gi>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-form>
    <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(experimentTaskDataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>
