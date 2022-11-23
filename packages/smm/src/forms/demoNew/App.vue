<template>
  <n-scrollbar style="height: 100%">
    <n-form
      :model="dataModel"
      :rules="rules"
      ref="formRef"
      label-placement="left"
      :label-width="160"
      size="small"
      :style="{
        padding: '45px',
      }"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi
          v-if="dataPermits.taskTitle !== 'hide'"
          :span="12"
          label="任务标题"
          path="taskTitle"
        >
          <n-input
            :disabled="dataPermits.taskTitle === 'readonly'"
            placeholder="Input"
            v-model:value="dataModel.taskTitle"
          />
        </n-form-item-gi>
        <n-form-item-gi
          v-if="dataPermits.taskName !== 'hide'"
          :span="12"
          label="任务名称"
          path="taskName"
        >
          <n-input
            :disabled="dataPermits.taskName === 'readonly'"
            placeholder="Input"
            v-model:value="dataModel.taskName"
          />
        </n-form-item-gi>
        <n-form-item-gi
          v-if="dataPermits.taskType !== 'hide'"
          :span="12"
          label="任务类型"
          path="taskType"
        >
          <n-select
            :disabled="dataPermits.taskType === 'readonly'"
            v-model:value="dataModel.taskType"
            :options="[
              { label: '任务类型1', value: 1 },
              { label: '任务类型2', value: 2 },
            ]"
          />
        </n-form-item-gi>
        <n-form-item-gi
          v-if="dataPermits.taskLevel !== 'hide'"
          :span="12"
          label="任务级别"
          path="taskLevel"
        >
          <n-input-number
            :disabled="dataPermits.taskLevel === 'readonly'"
            placeholder="Input"
            v-model:value="dataModel.taskLevel"
          />
        </n-form-item-gi>

        <!-- <n-form-item-gi :span="24" label="任务详情" path="taskInfoDetailList" >
        <vxe-grid
          ref="gridRef"
          v-bind="gridOption"
          style="
              width: 100%;
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
          "
        >
        </vxe-grid>
      </n-form-item-gi> -->

        <n-form-item-gi :span="24" path="taskInfoDetailList">
          <template #label> 测试 </template>
        </n-form-item-gi>

        <n-form-item-gi :span="24" path="taskInfoDetailList">
          <template #label> 测试单选 </template>

          <NwPickAny
            button-label="业务选择"
            modal-title="业务选择"
            @update:value="
              (d) => {
                dataModel.testObject = d;
              }
            "
            :gridColumns="[
              { field: 'pageName', title: '名称' },
              { field: 'pageCode', title: '编码' },
            ]"
            requestUrl="/main/page/list"
            :requestParam="{
              appCode: dataModel.taskTitle,
            }"
            isSingle
            :width="1000"
            :height="200"
          />
        </n-form-item-gi>
        <n-form-item-gi label="测试Grid" :span="24" path="taskInfoDetailList">
          <NwFieldGrid
            v-model:value="dataModel.testGrid"
            style="width: 400px"
            :edit-enabled="false"
            :columns="[
              { field: 'name', title: '名称' },
              { field: 'code', title: '编码' },
            ]"
          >
            <template #buttons>
              <NwPickAny
                rowKey="pageCode"
                button-label="业务选择"
                modal-title="业务选择"
                :value="
                  (dataModel.testGrid || []).map((d) => ({
                    pageCode: d.code,
                    pageName: d.name,
                  }))
                "
                @update:value="(d) => {dataModel.testGrid = d.map((m: any) => ({ name: m.pageName, code: m.pageCode }))}"
                :gridColumns="[
                  { field: 'pageName', title: '名称' },
                  { field: 'pageCode', title: '编码' },
                ]"
                requestUrl="/main/page/list"
                :requestParam="{
                  appCode: dataModel.taskTitle,
                }"
              />
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi label="测试Grid1" :span="24" path="testGrid1">
          <NwFieldGrid
            v-model:value="dataModel.testGrid1"
            style="width: 400px"
            :edit-enabled="true"
            :rules="gridRules['testGrid1']"
            :data-permits="gridDataPermits['testGrid1']"
            :columns="[
              {
                field: 'name',
                title: '名称',
                slots: { edit: 'name_edit' },
              },
              {
                field: 'code',
                title: '编码',
                slots: { edit: 'code_edit' },
              },
            ]"
          >
            <template #buttons>
              <NwPickAny
                rowKey="pageCode"
                button-label="业务选择"
                modal-title="业务选择"
                :value="
                  (dataModel.testGrid1 || []).map((d) => ({
                    pageCode: d.code,
                    pageName: d.name,
                  }))
                "
                @update:value="(d) => {dataModel.testGrid1 = d.map((m: any) => ({ name: m.pageName, code: m.pageCode }))}"
                :gridColumns="[
                  { field: 'pageName', title: '名称' },
                  { field: 'pageCode', title: '编码' },
                ]"
                requestUrl="/main/page/list"
                :requestParam="{
                  appCode: dataModel.taskTitle,
                }"
              />
            </template>
            <template #name_edit="{ row }">
              <n-input v-model:value="row.name"></n-input>
            </template>
            <template #code_edit="{ row }">
              <n-input v-model:value="row.code"></n-input>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi
          label="测试edit Grid1"
          :span="24"
          path="taskInfoDetailList"
        >
          <!-- :ref="d => gridRefs.push(d)" -->
          <NwFieldGrid
            :ref="(d: any) => gridRefs['taskInfoDetailList'] = d"
            v-model:value="dataModel.taskInfoDetailList"
            style="width: 400px"
            :rules="gridRules['taskInfoDetailList']"
            :data-permits="gridDataPermits['taskInfoDetailList']"
            :columns="[
              {
                field: 'detailName',
                title: '名称',
                editRender: { enabled: true },
                slots: { edit: 'detailNamea_edit' },
              },
              {
                field: 'detailType',
                title: '类型',
                editRender: { enabled: true },
                slots: { edit: 'detailType_edit' },
              },
              {
                field: 'detailDatetime',
                title: '日期',
                editRender: { enabled: true },
                slots: { edit: 'detailDatetime_edit' },
              },
            ]"
          >
            <template #detailNamea_edit="{ row }">
              <n-input v-model:value="row.detailName"></n-input>
            </template>
            <template #detailType_edit="{ row }">
              <n-input v-model:value="row.detailType"></n-input>
            </template>
            <template #detailDatetime_edit="{ row }">
              <n-input v-model:value="row.detailDatetime"></n-input>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>
        <n-form-item-gi
          label="测试edit Grid2"
          :span="24"
          path="taskInfoDetailList"
        >
          <!-- :ref="d => gridRefs.push(d)" -->
          <NwFieldGrid
            :ref="(d: any) => gridRefs['taskInfoDetailList1'] = d"
            v-model:value="dataModel.taskInfoDetailList1"
            style="width: 400px"
            :rules="gridRules['taskInfoDetailList1']"
            :data-permits="gridDataPermits['taskInfoDetailList1']"
            :columns="[
              {
                field: 'detailName',
                title: '名称',
                editRender: { enabled: true },
                slots: { edit: 'detailNamea_edit' },
              },
              {
                field: 'detailType',
                title: '类型',
                editRender: { enabled: true },
                slots: { edit: 'detailType_edit' },
              },
              {
                field: 'detailDatetime',
                title: '日期',
                editRender: { enabled: true },
                slots: { edit: 'detailDatetime_edit' },
              },
            ]"
          >
            <template #detailNamea_edit="{ row }">
              <n-input v-model:value="row.detailName"></n-input>
            </template>
            <template #detailType_edit="{ row }">
              <div>{{row.detailType}}</div>
              <n-input  :value="row.detailType"></n-input>
            </template>
            <template #detailDatetime_edit="{ row }">
              <n-input v-model:value="row.detailDatetime"></n-input>
            </template>
          </NwFieldGrid>
        </n-form-item-gi>

        <n-form-item-gi :span="24" path="taskInfoDetailList">
          <n-button @click="setRules">设置字段权限1</n-button>
          <n-button @click="validate">验证</n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-scrollbar>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from "vue";
import type {
  ComponentPublicInstance,
  Ref,
  ReactiveEffect,
  ComputedRef,
} from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NSwitch,
  NSelect,
  NDatePicker,
  NScrollbar,
} from "naive-ui";
import {
  NwIcon,
  RequestPaging,
  VxeHelper,
  NwPickAny,
  NwFieldGrid,
} from "@platform/main";
import { FormModal } from "./store";
import type { TaskInfoDetail } from "./conf";
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3";
const timeFormat = d3TimeFormat("%Y-%m-%d");

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NSwitch,
    NSelect,
    NDatePicker,
    NwPickAny,
    NwFieldGrid,
    NScrollbar,
  },
  setup() {
    const fm = new FormModal();
    const {
      formRef,
      dataModel,
      rules,
      gridRules,
      dataPermits,
      gridDataPermits,
      gridRefs,
      gridOption,
    } = fm;

    return {
      formRef,
      dataModel,
      rules,
      gridRules,
      dataPermits,
      gridDataPermits,
      // brules,
      gridRefs,
      gridOption,
      setRules() {
        fm.setRules({
          taskTitle: {
            dbType: "string",
            powerCode: "required",
            nameCh: "任务名称",
          },

          "testGrid1.code": {
            dbType: "string",
            powerCode: "readonly",
            nameCh: "编码",
          },
          "taskInfoDetailList1.detailName": {
            dbType: "string",
            powerCode: "required",
            nameCh: "名称",
          },
          "taskInfoDetailList.detailName": {
            dbType: "string",
            powerCode: "required",
            nameCh: "名称",
          },
          "taskInfoDetailList.detailDatetime": {
            dbType: "string",
            powerCode: "required",
            nameCh: "日期",
          },
          "taskInfoDetailList.detailType": {
            dbType: "string",
            powerCode: "hide",
            nameCh: "类型",
          },
        });
        // gridRef.value?.validate()
        // getValue().then(r => {
        //   console.log(r)
        // })
      },
      validate() {
        // gridRef.value?.validate()
        fm.validate().then((r) => {
          console.log(r);
          if (r.length) {
            alert(r.join("\n"));
          } else {
            alert("验证成功");
          }
        });
      },
    };
  },
});
</script>

<style scoped></style>
