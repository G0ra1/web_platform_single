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
import { FormModal, cementSlurryBind, actualBind  ,deviceNameList } from "./App";
import { Column, VxeGridProps, VxeTablePropTypes } from "vxe-table";
import { FormPermissionEnum, NwFieldGrid, NwDic, NwIcon } from "@platform/main";
const {
  formRef,
  dataModel,
  rules,
  dataPermits,
  gridDataPermits,
  gridRefs,
  experimentSpecimenColumns,
  actualExperimentConditionColumns,
  gridRules,
 
} = new FormModal();
//实验条件滚动样式
const experimentSpecimenStyleByDetail = {
  border: false,
  resizable: true,
  showOverflow: true,
  loading: false,
  size: "small",
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
};
//混合液体变动（也就是水泥浆）
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
          <h3 class="card-title">污染实验</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="cemlabExperimentProcessContaminateSpecimenList">
          <NwFieldGrid
            :is-readonly="true"
            v-model:value="dataModel.cemlabExperimentProcessContaminateSpecimenList"
            style="width: 100%"
            :columns="experimentSpecimenColumns"
             :row-style="{height:'30px'}"
          :cell-style="{padding:'6px'}"
          size="small"
          >
            <template #specimenName="{ row }">
              {{ row.specimenName }}
            </template>
            <template #recipeQuantity="{ row }">
                <n-input-number v-model:value="row.recipeQuantity" size="medium">
                </n-input-number>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">实验结果</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <vxe-grid v-bind="actualBind" style="width: 100%">
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
        <!-- 混合液体 -->
        <n-form-item-gi :span="24" label="" path="">
            <vxe-grid v-bind="cementSlurryBind" style="width:100%">
              <template #cementSlurrySpeed3_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed3" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
              </template>
              <template #cementSlurrySpeed6_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed6" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
              </template>
              <template #cementSlurrySpeed100_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed100" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
              </template>
              <template #cementSlurrySpeed200_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed200" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
              </template>
              <template #cementSlurrySpeed300_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed300" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
              </template>
              <template #cementSlurrySpeed600_edit="{ row, column }">
                <vxe-input v-model="row.cementSlurrySpeed600" @change="(v: any) => cementSlurryChange(v, row, column)"
                  type="number"></vxe-input>
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
        <n-form-item-gi :span="24" label="实验结果" path="experimentResult">
          <n-input
            type="textarea"
            style="height: 100px"
            v-model:value="dataModel.experimentResult"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="实验现象" path="experimentPhenomena">
          <n-input
            type="textarea"
            style="height: 100px"
            v-model:value="dataModel.experimentPhenomena"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="" path="">
          <h3 class="card-title">图表结果</h3>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="仪器"
          path="deviceName"
          v-if="dataPermits.deviceName !== FormPermissionEnum.HIDE"
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

    <!-- <n-divider dashed> 调试信息 </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->

  </n-scrollbar>
</template>
