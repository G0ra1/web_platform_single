<script lang="ts" setup>
import { ref } from "vue";
import {
  NForm,
  NInput,
  NDivider,
  NInputNumber,
  NScrollbar,
  NGrid,
  NFormItemGi,
  NDatePicker,
  NButton,
  NCard,
  NSelect,
  NTreeSelect,
  NModal,
} from "naive-ui";
import { FormModal, bind, cementTypeBind } from "./App";
import { request } from "@platform/main";
const { formRef, sonForms, dataModel, rules, sonRules, dataPermits } =
  new FormModal();

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
const updateSampleType = (num: number) => {
  const sampleType =
    dataModel.value.cemlabExperimentConditionList[num].sampleType;
  dataModel.value.cemlabExperimentConditionList.forEach((item) => {
    item.sampleType = sampleType;
  });
  dataModel.value.sampleType = sampleType;
};
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
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="">
          <h3 class="card-title">任务基础信息</h3>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="化验报告单编码" path="labReportCode">
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
            placeholder=""
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
        <n-form-item-gi :span="12" label="水样来源" path="waterSampleSource">
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
            <n-form-item-gi :span="12" label="养护时间(h)" path="curingTime">
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
            <n-form-item-gi :span="12" label="水灰比" path="waterCementRatio">
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
            placeholder="备注"
            type="textarea"
            v-model:value="dataModel.remark"
            :readonly="true"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="实验人员" path="experimentUserName">
          <n-input
            placeholder="实验人员"
            v-model:value="dataModel.experimentUserName"
            :readonly="true"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <!-- <n-divider dashed>
            调试信息
        </n-divider>
        <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
  </n-scrollbar>
</template>
