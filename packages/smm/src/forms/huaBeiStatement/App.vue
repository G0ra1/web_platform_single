<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="180"
    size="small"
    class="LForm"
  >
    <n-grid :cols="24" :x-gap="24" class="LFormNg">
      <n-form-item-gi :span="24" label="" path="">
        <h5 class="card-title">基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="填报日期" path="fillInTime" class="LFormTable">
        <n-date-picker
          style="width: 100%"
          v-model:formatted-value="dataModel.fillInTime"
          value-format="yyyy-MM-dd"
          type="date"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="填报人" path="createUserName" class="LFormTable">
        <n-input
          placeholder="填报人"
          disabled
          v-model:value="dataModel.createUserName"
        />
      </n-form-item-gi>

      
      <n-form-item-gi :span="24" label="" path="code">
        <h5 class="card-title">输气量汇总</h5>
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="24" label="处理中心进气量(Nm3/d)" path="processCenterInGas" class="LFormTable">
       
        <n-input-number
          placeholder="0"
          style="width: 100%"
          v-model:value="dataModel.processCenterInGas"
        />
      </n-form-item-gi> -->

      <n-form-item-gi label="炳然代输气量(Nm3/d)" path="bingranOutGas" :span="24" class="LFormTable">
        <n-input-number
          placeholder="0"
          style="width: 100%"
          v-model:value="dataModel.bingranOutGas"
        />
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="smmSxGasDailyOutGrid"
          v-bind="smmSxGasDailyOutListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
          <template #outName_default="{ row, column }">
            <span>{{ row.outName }}</span>
          </template>
          <template #outName_edit="{ row, column }">
          
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_depot' }"
              v-model:value="row.outCode"
              v-model:label="row.outName"
              placeholder
              size="small"
              :response="{
                dataMethod: (r: any) =>{
                  return r.map((d: any) => ({
                      value: d.dictItemCode,
                      label: d.dictItemName,
                  }))
                
                }
              }"
            />
          </template>
          <template #outGasNumber_default="{ row, column }">
            <span>{{ row.outGasNumber }}</span>
          </template>
          <template #boutGasNumber_edit="{ row, column }">
            <n-input-number
              placeholder="请输入气量"
              @blur="clearActive1"
              v-model:value="row.outGasNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi> -->
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="smmSxGasDailyOutsourcingListGrid"
          v-bind="smmSxGasDailyOutsourcingListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
          <template #outsourcingName_default="{ row, column }">
            <span>{{ row.outsourcingName }}</span>
          </template>
          <template #outsourcingName_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_outsourcing' }"
              v-model:value="row.outsourcingCode"
              v-model:label="row.outsourcingName"
              placeholder
              size="small"
              :response="{
                        dataMethod: (r: any) =>{
                          return r.map((d: any) => ({
                              value: d.dictItemCode,
                              label: d.dictItemName,
                          }))
                        
                        }
                      }"
            />
          </template>
          <template #outsourcingGasNumber_default="{ row, column }">
            <span>{{ row.outsourcingGasNumber }}</span>
          </template>
          <template #outsourcingGasNumber_edit="{ row, column }">
            <n-input-number
              placeholder="请输入运销量"
              @blur="clearActive2"
              v-model:value="row.outsourcingGasNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="" path="" class="LFormTable">
        <vxe-grid
          ref="smmSxGasDailyCooperateListGrid"
          v-bind="smmSxGasDailyCooperateListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
          <template #cooperateName_default="{ row, column }">
            <span>{{ row.cooperateName }}</span>
          </template>
          <template #cooperateName_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_cooperate' }"
              v-model:value="row.cooperateCode"
              v-model:label="row.cooperateName"
              placeholder
              size="small"
              :response="{
                        dataMethod: (r: any) =>{
                          return r.map((d: any) => ({
                              value: d.dictItemCode,
                              label: d.dictItemName,
                          }))
                        
                        }
                      }"
            />
          </template>
          <template #cooperateGasNumber_default="{ row, column }">
            <span>{{ row.cooperateGasNumber }}</span>
          </template>
          <template #cooperateGasNumber_edit="{ row, column }">
            <n-input-number
              placeholder="请输入运销量"
              @blur="clearActive3"
              v-model:value="row.cooperateGasNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="" path="" class="LFormTable">
        <vxe-grid
          ref="smmSxGasDailySelfListGrid"
          v-bind="smmSxGasDailySelfListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
          <template #selfName_default="{ row, column }">
            <span>{{ row.selfName }}</span>
          </template>
          <template #selfName_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_self' }"
              v-model:value="row.selfCode"
              v-model:label="row.selfName"
              placeholder
              size="small"
              :response="{
                dataMethod: (r: any) =>{
                  return r.map((d: any) => ({
                      value: d.dictItemCode,
                      label: d.dictItemName,
                  }))
                
                }
              }"
            />
          </template>
          <template #selfGasNumber_default="{ row, column }">
            <span>{{ row.selfGasNumber }}</span>
          </template>
          <template #selfGasNumber_edit="{ row, column }">
            <n-input-number
              placeholder="请输入运销量"
              @blur="clearActive4"
              v-model:value="row.selfGasNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="smmSxGasDailySellListGrid"
          v-bind="smmSxGasDailySellListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
          <template #sellName_default="{ row, column }">
            <span>{{ row.sellName }}</span>
          </template>
          <template #sellName_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_sell' }"
              v-model:value="row.sellCode"
              v-model:label="row.sellName"
              placeholder
              size="small"
              :response="{
                  dataMethod: (r: any) =>{
                    return r.map((d: any) => ({
                        value: d.dictItemCode,
                        label: d.dictItemName,
                    }))
                  
                  }
                }"
            />
          </template>
          <template #sellGasNumber_default="{ row, column }">
            <span>{{ row.sellGasNumber }}</span>
          </template>
          <template #sellGasNumber_edit="{ row, column }">
            <n-input-number
              placeholder="请输入运销量"
              @blur="clearActive5"
              v-model:value="row.sellGasNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-button @click="testshow">Test</n-button> -->
</template>

<script lang="tsx">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  h,
  watch,
  onMounted,
} from "vue";
import type { ComponentPublicInstance, Ref, ReactiveEffect } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { Db } from "@platform/main";
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { dictItemLists } from "../../api/index.js";
import {
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NCard,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NLayout,
  NMenu,
  NDivider,
  NLayoutSider,
  NLayoutContent,
  NTreeSelect,
  TreeSelectOption,
} from "naive-ui";
import { request, NwIcon, NwDic } from "@platform/main";
import { FormModal } from "./store";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NCard,
    NDatePicker,
    NSelect,
    NTreeSelect,
    NwIcon,
    NwDic,
    NLayout,
    NMenu,
    NDivider,
    NLayoutSider,
    NLayoutContent,
  },
  setup() {
    const {
      formRef,
      dataModel,
      rules,
      brules,
      setValue,
      getValue,
      validate,
      setRules,
    } = new FormModal();
    const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0;
      let count: number = 0;
      list.forEach((item: any) => {
        if (item[field]) {
          count += Number(item[field]);
        }
      });
      return count;
    };
    const smmSxGasDailyOutGrid: Ref<VxeGridInstance | null> = ref(null);
    const smmSxGasDailyOutsourcingListGrid: Ref<VxeGridInstance | null> =
      ref(null);
    const smmSxGasDailyCooperateListGrid: Ref<VxeGridInstance | null> =
      ref(null);
    const smmSxGasDailySelfListGrid: Ref<VxeGridInstance | null> = ref(null);
    const smmSxGasDailySellListGrid: Ref<VxeGridInstance | null> = ref(null);

    

    const smmSxGasDailyOutListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyOutList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                集气站外输气量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmSxGasDailyOutList) {
                      dataModel.value.smmSxGasDailyOutList = [];
                    }
                    dataModel.value.smmSxGasDailyOutList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmSxGasDailyOutList);
                  }}
                />
              </h3>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: 'cell',
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "场站",
          field: "outName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "outName_default", edit: "outName_edit" },
        },

        {
          title: "气量(Nm3/d)",
          field: "outGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "outGasNumber_default",
            edit: "boutGasNumber_edit",
          },
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                  <NButton
                    size="small"
                    quaternary
                    type="primary"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyOutList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmSxGasDailyOutList);
                    }}
                  >
                    {{
                      default: () => "添加",
                    }}
                  </NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style="margin-left:5px"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyOutList!.splice(rowIndex, 1);
                      $table.reloadData(dataModel.value.smmSxGasDailyOutList);
                    }}
                  >
                    {{
                      default: () => "删除",
                    }}
                  </NButton>
                </div>,
              ];
            },
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "outGasNumber") {
              sums.push(Number(sumNum(data, "outGasNumber")));
              dataModel.value.sumOutGasNumber = Number(
                sumNum(data, "outGasNumber")
              );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailyOutsourcingListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyOutsourcingList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                外购气量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmSxGasDailyOutsourcingList) {
                      dataModel.value.smmSxGasDailyOutsourcingList = [];
                    }
                    dataModel.value.smmSxGasDailyOutsourcingList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(
                      dataModel.value.smmSxGasDailyOutsourcingList
                    );
                  }}
                />
              </h3>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: 'cell',
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "采购来源  ",
          field: "outsourcingName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            default: "outsourcingName_default",
            edit: "outsourcingName_edit",
          },
        },

        {
          title: "气量(Nm3/d)",
          field: "outsourcingGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "outsourcingGasNumber_default",
            edit: "outsourcingGasNumber_edit",
          },
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                  <NButton
                    size="small"
                    quaternary
                    type="primary"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyOutsourcingList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(
                        dataModel.value.smmSxGasDailyOutsourcingList
                      );
                    }}
                  >
                    {{
                      default: () => "添加",
                    }}
                  </NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style="margin-left:5px"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyOutsourcingList!.splice(
                        rowIndex,
                        1
                      );
                      $table.reloadData(
                        dataModel.value.smmSxGasDailyOutsourcingList
                      );
                    }}
                  >
                    {{
                      default: () => "删除",
                    }}
                  </NButton>
                </div>,
              ];
            },
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "outsourcingGasNumber") {
              sums.push(Number(sumNum(data, "outsourcingGasNumber")));
              dataModel.value.sumOutsourcingGasNumber = Number(
                sumNum(data, "outsourcingGasNumber")
              );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailyCooperateListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyCooperateList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                合作气量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmSxGasDailyCooperateList) {
                      dataModel.value.smmSxGasDailyCooperateList = [];
                    }
                    dataModel.value.smmSxGasDailyCooperateList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(
                      dataModel.value.smmSxGasDailyCooperateList
                    );
                  }}
                />
              </h3>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: 'cell',
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "合作名称",
          field: "cooperateName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            default: "cooperateName_default",
            edit: "cooperateName_edit",
          },
        },

        {
          title: "气量(Nm3/d)",
          field: "cooperateGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "cooperateGasNumber_default",
            edit: "cooperateGasNumber_edit",
          },
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                  <NButton
                    size="small"
                    quaternary
                    type="primary"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyCooperateList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(
                        dataModel.value.smmSxGasDailyCooperateList
                      );
                    }}
                  >
                    {{
                      default: () => "添加",
                    }}
                  </NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style="margin-left:5px"
                    onClick={function () {
                      dataModel.value.smmSxGasDailyCooperateList!.splice(
                        rowIndex,
                        1
                      );
                      $table.reloadData(
                        dataModel.value.smmSxGasDailyCooperateList
                      );
                    }}
                  >
                    {{
                      default: () => "删除",
                    }}
                  </NButton>
                </div>,
              ];
            },
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "cooperateGasNumber") {
              sums.push(Number(sumNum(data, "cooperateGasNumber")));
              dataModel.value.sumCooperateGasNumber = Number(
                sumNum(data, "cooperateGasNumber")
              );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailySelfListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailySelfList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                自产气量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmSxGasDailySelfList) {
                      dataModel.value.smmSxGasDailySelfList = [];
                    }
                    dataModel.value.smmSxGasDailySelfList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmSxGasDailySelfList);
                  }}
                />
              </h3>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: 'cell',
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "区域",
          field: "selfName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "selfName_default", edit: "selfName_edit" },
        },

        {
          title: "气量(Nm3/d)",
          field: "selfGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "selfGasNumber_default",
            edit: "selfGasNumber_edit",
          },
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                  <NButton
                    size="small"
                    quaternary
                    type="primary"
                    onClick={function () {
                      dataModel.value.smmSxGasDailySelfList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmSxGasDailySelfList);
                    }}
                  >
                    {{
                      default: () => "添加",
                    }}
                  </NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style="margin-left:5px"
                    onClick={function () {
                      dataModel.value.smmSxGasDailySelfList!.splice(
                        rowIndex,
                        1
                      );
                      $table.reloadData(dataModel.value.smmSxGasDailySelfList);
                    }}
                  >
                    {{
                      default: () => "删除",
                    }}
                  </NButton>
                </div>,
              ];
            },
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "selfGasNumber") {
              sums.push(Number(sumNum(data, "selfGasNumber")));
              dataModel.value.sumSelfGasNumber = Number(
                sumNum(data, "selfGasNumber")
              );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailySellListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailySellList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                销售气量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmSxGasDailySellList) {
                      dataModel.value.smmSxGasDailySellList = [];
                    }
                    dataModel.value.smmSxGasDailySellList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmSxGasDailySellList);
                  }}
                />
              </h3>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: 'cell',
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "客户",
          field: "sellName",
          minWidth: 200,
          editRender: {},
          slots: { default: "sellName_default", edit: "sellName_edit" },
        },

        {
          title: "气量(Nm3/d)",
          field: "sellGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "sellGasNumber_default",
            edit: "sellGasNumber_edit",
          },
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                  <NButton
                    size="small"
                    quaternary
                    type="primary"
                    onClick={function () {
                      dataModel.value.smmSxGasDailySellList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmSxGasDailySellList);
                    }}
                  >
                    {{
                      default: () => "添加",
                    }}
                  </NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style="margin-left:5px"
                    onClick={function () {
                      dataModel.value.smmSxGasDailySellList!.splice(
                        rowIndex,
                        1
                      );
                      $table.reloadData(dataModel.value.smmSxGasDailySellList);
                    }}
                  >
                    {{
                      default: () => "删除",
                    }}
                  </NButton>
                </div>,
              ];
            },
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "sellGasNumber") {
              sums.push(Number(sumNum(data, "sellGasNumber")));
              dataModel.value.sumSellGasNumber = Number(
                sumNum(data, "sellGasNumber")
              );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
  
    const clearActive1 = () => {
      smmSxGasDailyOutGrid.value && smmSxGasDailyOutGrid.value.clearEdit();
    };
    const clearActive2 = () => {
      smmSxGasDailyOutsourcingListGrid.value &&
        smmSxGasDailyOutsourcingListGrid.value.clearEdit();
    };
    const clearActive3 = () => {
      smmSxGasDailyCooperateListGrid.value &&
        smmSxGasDailyCooperateListGrid.value.clearEdit();
    };
    const clearActive4 = () => {
      smmSxGasDailySelfListGrid.value &&
        smmSxGasDailySelfListGrid.value.clearEdit();
    };
    const clearActive5 = () => {
      smmSxGasDailySellListGrid.value &&
        smmSxGasDailySellListGrid.value.clearEdit();
    };
    const menuOptions = [
      { label: "基本信息", key: 1, value: "basic" },
      { label: "输气量汇总", key: 2, value: "collect" },
    ];
    // const menuSelect = (key:any, item:any) => {
    //   let top = [item.value].value.$el.offsetTop - 24;
    //   content.value.scrollTo({ top, behavior: "smooth" });
    // }
    
    // watch(
    //   () => dataModel.value.smmSxGasDailyOutList,
    //   (d: any) => {
    //     if (smmSxGasDailyOutGrid.value) {
    //       smmSxGasDailyOutGrid.value.loadData(d);
    //     }
    //   }
    // );
    watch(
      () => dataModel.value.smmSxGasDailyOutsourcingList,
      (d: any) => {
        if (smmSxGasDailyOutsourcingListGrid.value) {
          smmSxGasDailyOutsourcingListGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmSxGasDailySelfList,
      (d: any) => {
        if (smmSxGasDailySelfListGrid.value) {
          smmSxGasDailySelfListGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmSxGasDailyCooperateList,
      (d: any) => {
        if (smmSxGasDailyCooperateListGrid.value) {
          smmSxGasDailyCooperateListGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmSxGasDailySellList,
      (d: any) => {
        if (smmSxGasDailySellListGrid.value) {
          smmSxGasDailySellListGrid.value.loadData(d);
        }
      }
    );
    onMounted(() => {
      Db.get("userInfo").then((res: any) => {
        if (!dataModel.value.createUserParentDeptName) {
          dataModel.value.createUserParentDeptName = res.parentDeptName;
          dataModel.value.createUserParentDeptId = res.parentDeptId;
          dataModel.value.createUserParentOrgName = res.orgFullName;
          dataModel.value.createUserParentOrgId = res.orgFullId;
          dataModel.value.createUserName = res.userNameCh;
          dataModel.value.createUserId = res.id;
        }
        if (!dataModel.value.fillInTime) {
          dataModel.value.fillInTime = format(new Date(), "yyyy-MM-dd");
        }
      });
    });

    return {
      formRef,
      dataModel,
      rules,
      brules,
      validate,
      sumNum,
      menuOptions,
      dictItemLists,
      clearActive1,
      clearActive2,
      clearActive3,
      clearActive4,
      clearActive5,
      smmSxGasDailyOutListOption,
      smmSxGasDailyOutsourcingListOption,
      smmSxGasDailyCooperateListOption,
      smmSxGasDailySelfListOption,
      smmSxGasDailySellListOption,
      smmSxGasDailyOutGrid,
      smmSxGasDailyOutsourcingListGrid,
      smmSxGasDailyCooperateListGrid,
      smmSxGasDailySelfListGrid,
      smmSxGasDailySellListGrid,
    };
  },
});
</script>

<style scoped>
/* .heji {
  font-weight: 600;
  margin-right: 15px;

}

.heji .label {
  margin-right: 8px;
} */

.card-title {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  border-left: 2px solid #C91019;
  margin: 0;
  height: 19px;
  line-height: 19px;
  padding-left: 16px;
  margin-top: 20px;
}
</style>
