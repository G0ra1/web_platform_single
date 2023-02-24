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
  NTabs,
  NTabPane,
  NScrollbar,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NTimePicker,
  NSpace,
  NSelect,
} from "naive-ui";

import { FormModal } from "./App";
import { NwFieldGrid, NwDic } from "@platform/main";
import { getExperimentProcess } from "./api";
import { VxeGridProps } from "vxe-table";
const {
  formRef,
  dataModel,
  experimentTaskDataModel,
  specimenColumns,
  specimenSonColumns,
  itemsColumns,
  conditionColumns,
  testItemColumns,
  experimentSpecimenColumns,
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
//获取试验单信息
const showTable = ref<number>(1);
//实验结果 自动填入 表单
const actualBind = reactive<VxeGridProps>({
  align: "center",
  border: true,
  keepSource: true,
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
  border: true,
  keepSource: true,
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
const mixedCementSlurryBind = reactive<VxeGridProps>({
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
const func = (id: string) => {
  getExperimentProcess(id).then((d) => {
    experimentTaskDataModel.value = d;
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
    cementSlurryBind.columns = [
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

if (dataModel.value.experimentSpecimenList.length == 0) {
  dataModel.value.experimentSpecimenList = [
    {
      isDel: 0,
      type: 1,
    },
  ];
}
if (dataModel.value.cemlabExperimentConditionList.length == 0) {
  dataModel.value.cemlabExperimentConditionList = [
    {
      isDel: 0,
    },
  ];
}
</script>
<template>
  <n-scrollbar style="height: 100%">
    <n-form
      ref="formRef"
      :model="dataModel"
      size="medium"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      style="padding: 20px 50px"
    >
      <n-tabs
        type="bar"
        animated
        @update:value="(value:number)=>{showTable = value; showGrid = false}"
      >
        <n-tab-pane :name="1" tab="任务信息">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">样品信息</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <NwFieldGrid
                v-model:value="dataModel.experimentSpecimenList"
                style="width: 100%"
                :columns="specimenColumns"
                :is-readonly="true"
              >
              </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">附带样品信息</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="dataModel.experimentSpecimenSonList"
                style="width: 100%"
                :columns="specimenSonColumns"
              >
              </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">实验条件</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="实验温度(°C)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0]
                    .experimentTemperature
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="实验压力(MPa)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0].experimentPressure
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="升温时间(min)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0].heatingTime
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="养护温度(°C)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0].curingTemperature
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="养护压力(MPa)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0].curingPressure
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="养护时间(min)">
              <n-input
                placeholder=""
                v-model:value="
                  dataModel.cemlabExperimentConditionList[0].curingTime
                "
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="">
              <h3 class="card-title">检测项目</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="dataModel.cemlabExperimentItemsList"
                style="width: 100%"
                :columns="itemsColumns"
              >
              </NwFieldGrid>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="备注" path="remark">
              <n-input
                :readonly="true"
                style="height: 80px"
                placeholder=""
                type="textarea"
                v-model:value="dataModel.remark"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="完成日期" path="finishDate">
              <n-input
                :readonly="true"
                placeholder=""
                v-model:value="dataModel.finishDate"
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
                      @click="
                        {
                          func(row.id), (showTable = 3);
                        }
                      "
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
                placeholder=""
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
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <h3 class="card-title">污染实验</h3>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label=""
              path="cemlabExperimentSpecimenList"
              v-if="experimentTaskDataModel.experimentType === 2"
            >
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="
                  experimentTaskDataModel.cemlabExperimentProcessContaminateSpecimenList
                "
                style="width: 100%"
                :columns="experimentSpecimenColumns"
                size="small"
              >
              </NwFieldGrid>
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

            <n-form-item-gi :span="24">
              <h3 class="card-title">实验结果</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24">
              <vxe-grid v-bind="actualBind" style="width: 100%"> </vxe-grid>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <NwFieldGrid
                :is-readonly="true"
                v-model:value="
                  experimentTaskDataModel.cemlabExperimentProcessResultList
                "
                style="width: 100%"
                :columns="testItemColumns"
                size="small"
              >
              </NwFieldGrid>
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
            <!-- 水泥浆 -->
            <n-form-item-gi
              :span="24"
              label=""
              path=""
              v-if="experimentTaskDataModel.experimentType === 1"
            >
              <vxe-grid
                v-bind="cementSlurryBind"
                ref="cementSlurryGrid"
                v-if="showGrid"
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
            <n-form-item-gi :span="24" label="" path="">
              <h3 class="card-title">图表结果</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="仪器">
              <n-input
                v-model:value="experimentTaskDataModel.deviceName"
                :readonly="true"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="自编号">
              <n-input
                :readonly="true"
                v-model:value="experimentTaskDataModel.deviceCode"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="釜体" path="futi">
              <n-select
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
      <!-- :ref="d => gridRefs.push(d)" -->
    </n-form>

    <!-- <n-divider dashed> 调试信息 </n-divider>
      <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>
