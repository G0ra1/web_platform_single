<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="100"
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
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="qichuGrid"
          v-bind="qichuListOption"
          style="moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
          "
        >
         
          <template #commodity_default="{ row, column }">
            <span>商品量(吨)</span>
          </template>
          <template #unitChukucun_default="{ row, column }">
            <span>{{row.openingStock }}</span>
          </template>
          <template #unitChukucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive1"
              v-model:value="row.openingStock"
            ></n-input-number>
          </template>
          <template #scatteredChukucun_default="{ row, column }">
            <span>{{row.spreadOpeningStock }}</span>
          </template>
          <template #scatteredChukucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive1"
              v-model:value="row.spreadOpeningStock"
            ></n-input-number>
          </template>
          <template #beizhu_default="{ row, column }">
            <span>{{row.explanation }}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input
              placeholder=""
              @blur="clearActive1"
              v-model:value="row.explanation"
            ></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="qimoGrid"
          v-bind="qimoListOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;"
        >
         
          <template #commodity_default="{ row, column }">
            <span>商品量(吨)</span>
          </template>
          <template #unitChukucun_default="{ row, column }">
            <span>{{row.closingStock }}</span>
          </template>
          <template #unitChukucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive2"
              v-model:value="row.closingStock"
            ></n-input-number>
          </template>
          <template #scatteredChukucun_default="{ row, column }">
            <span>{{row.spreadClosingStock }}</span>
          </template>
          <template #scatteredChukucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive2"
              v-model:value="row.spreadClosingStock"
            ></n-input-number>
          </template>
          <template #beizhu_default="{ row, column }">
            <span>{{row.explanation }}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input
              placeholder=""
              @blur="clearActive2"
              v-model:value="row.explanation"
            ></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="kucunGrid"
          v-bind="kucunListOption"
          style="moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;"
        >
         
          <template #commodity_default="{ row, column }">
            <span>商品量(吨)</span>
          </template>
          <template #unitkucun_default="{ row, column }">
            <span>{{row.stockIncr }}</span>
          </template>
          <template #unitkucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive3"
              v-model:value="row.stockIncr"
            ></n-input-number>
          </template>
          <template #scatteredkucun_default="{ row, column }">
            <span>{{row.spreadStockIncr }}</span>
          </template>
          <template #scatteredkucun_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive3"
              v-model:value="row.spreadStockIncr"
            ></n-input-number>
          </template>
          <template #beizhu_default="{ row, column }">
            <span>{{row.explanation }}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input
              placeholder=""
              @blur="clearActive3"
              v-model:value="row.explanation"
            ></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code">
        <h5 class="card-title">销售量</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        
        <n-tabs
          v-model:value="tabv"
          type="card"
          :addable="true"
          tab-style="min-width: 80px;"
          @update:value="tabChange"
          @add="handleAdd"
        >
          <!-- <template #prefix>
            <nw-icon  style="font-size:19px;color:#C91019;margin-left: 9px;" name="icon-n-y-circleadd" @Click="handleAdd"></nw-icon  >
          </template> -->
        <n-tab-pane v-for="(item,index) in dataModel.projectList" :name="item.projectCode" :tab="item.projectName" :key="item.projectCode">
          <vxe-grid
            :ref="setxiaoGrid"
            v-bind="xiaoshouListOption"
            style="moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select: none;
              -khtml-user-select: none;
              -webkit-user-select: none;
              -ms-user-select: none;
              user-select: none;
              width: 100%;">
              <template #kehu_default="{ row, column }">
                <span>{{ row.clientName }}</span>
              </template>
              <template #kehu_edit="{ row, column }">
                <nw-dic
                  :request="{ XHR: kehuLists, params: item.id }"
                  v-model:value="row.clientCode"
                  v-model:label="row.clientName"
                  placeholder
                  size="small"
                  :response="{
                    dataMethod: (r: any) =>{
                      return r.smmHebooilClientDetailList.map((d: any) => ({
                          value: d.clientCode,
                          label: d.clientName,
                      }))
                    
                    }
                  }"
                />
              </template>
              <template #shangpunliang_default="{ row, column }">
                <span>{{row.goodsNumber }}</span>
              </template>
              <template #shangpunliang_edit="{ row, column }">
                <n-input-number
                  placeholder=""
                  @blur="clearActive4(index)"
                  v-model:value="row.goodsNumber"
                ></n-input-number>
              </template>
              <template #beizhu_default="{ row, column }">
                <span>{{row.explanation }}</span>
              </template>
              <template #beizhu_edit="{ row, column }">
                <n-input
                  placeholder=""
                  @blur="clearActive4(index)"
                  v-model:value="row.explanation"
                ></n-input>
              </template>
          </vxe-grid>
        </n-tab-pane>
        </n-tabs>
       
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="qiyeGrid"
          v-bind="qiyeListOption"
          style="moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;"
        >
         
         
          <template #kehu_default="{ row, column }">
            <span>{{row.clientName }}</span>
          </template>
          <template #kehu_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_qyzylyhmx' }"
              v-model:value="row.clientCode"
              v-model:label="row.clientName"
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
          <template #shangpinliang_default="{ row, column }">
            <span>{{row.goodsNumber }}</span>
          </template>
          <template #shangpinliang_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive5"
              v-model:value="row.goodsNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="qingjingGrid"
          v-bind="qingjingListOption"
          style="moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;"
        >
         
         
          <template #kehu_default="{ row, column }">
            <span>{{row.clientName }}</span>
          </template>
          <template #kehu_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_qtkcz' }"
              v-model:value="row.clientCode"
              v-model:label="row.clientName"
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
          <template #shangpinliang_default="{ row, column }">
            <span>{{row.goodsNumber }}</span>
          </template>
          <template #shangpinliang_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive6"
              v-model:value="row.goodsNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <vxe-grid
          ref="tiaozhengGrid"
          v-bind="tiaozhengOption"
          style="moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;"
        >
         
         
          <template #kehu_default="{ row, column }">
            <span>{{row.clientName }}</span>
          </template>
          <template #kehu_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_tzhybcbl' }"
              v-model:value="row.clientCode"
              v-model:label="row.clientName"
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
          <template #shangpinliang_default="{ row, column }">
            <span>{{row.goodsNumber }}</span>
          </template>
          <template #shangpinliang_edit="{ row, column }">
            <n-input-number
              placeholder=""
              @blur="clearActive7"
              v-model:value="row.goodsNumber"
            ></n-input-number>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24"  :label-width="40" label="备注" path="explanation" class="LFormTable">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.explanation"
        />
      </n-form-item-gi>
    </n-grid>
    <ChooseProject 
      :value="dataModel.projectList ? dataModel.projectList : []"
      @callback="callback"
      ref="chooseProject"
    ></ChooseProject>
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
import type { ComponentPublicInstance, Ref, ReactiveEffect, } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { Db } from "@platform/main";
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { dictItemLists,kehuLists, smmHebooilClients } from "../../api/index.js";
import ChooseProject from "../../components/chooseProject/index.vue";

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
  NTabs,
  NTabPane,
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
    NTabs,
    NTabPane,
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
    ChooseProject,
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
    const qichuGrid: Ref<VxeGridInstance | null> = ref(null);
    const qimoGrid: Ref<VxeGridInstance | null> = ref(null);
    const kucunGrid: Ref<VxeGridInstance | null> = ref(null);
    const qiyeGrid: Ref<VxeGridInstance | null> = ref(null);
    const qingjingGrid: Ref<VxeGridInstance | null> = ref(null);
    const tiaozhengGrid: Ref<VxeGridInstance | null> = ref(null);

    const xiaoGrid: Ref<Array<any>> = ref([]);

    const chooseProject  = ref();
    const tabv = ref('');
    const setxiaoGrid = (el: any) => {
      if(el) {
        xiaoGrid.value.push(el)
      }
    }
    const qichuListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsOpeningList,
      showFooter: true,
      mergeFooterItems:[
        { row: 0, col: 1, rowspan: 1, colspan: 3 }
      ],
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                期初库存
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
          title: "",
          field: "",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "commodity_default", },
        },

        {
          title: "本单位期初库存",
          field: "openingStock",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "unitChukucun_default",
            edit: "unitChukucun_edit",
          },
        },
        {
          title: "零散井期初库存",
          field: "spreadOpeningStock",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "scatteredChukucun_default",
            edit: "scatteredChukucun_edit",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        const footerData = [
        
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '合计'
                  }
                 
                  if (['spreadOpeningStock','openingStock'].includes(column.field)) {
                    dataModel.value.openingStockTotal = Number(
                      sumNum(data, "openingStock") + sumNum(data, "spreadOpeningStock")
                    );
                    return sumNum(data, "openingStock") + sumNum(data, "spreadOpeningStock")
                  }
                 
                  return null
                }),
               
              ]
              return footerData
      },
    });
    const qimoListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsClosingList,
      showFooter: true,
      mergeFooterItems:[
        { row: 0, col: 1, rowspan: 1, colspan: 3 }
      ],
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                期末库存
                
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
          title: "",
          field: "",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "commodity_default", },
        },

        {
          title: "本单位期初库存",
          field: "closingStock",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "unitChukucun_default",
            edit: "unitChukucun_edit",
          },
        },
        {
          title: "零散井期初库存",
          field: "spreadClosingStock",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "scatteredChukucun_default",
            edit: "scatteredChukucun_edit",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        const footerData = [
        
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '合计'
                  }
                 
                  if (['spreadClosingStock','closingStock'].includes(column.field)) {
                    dataModel.value.closingStockTotal = Number(
                      sumNum(data, "closingStock") + sumNum(data, "spreadClosingStock")
                    );
                    return sumNum(data, "closingStock") + sumNum(data, "spreadClosingStock")
                  }
                 
                  return null
                }),
               
              ]
              return footerData
      },
    });
    const kucunListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsStockList,
      showFooter: true,
      mergeFooterItems:[
        { row: 0, col: 1, rowspan: 1, colspan: 3 }
      ],
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                库存增量
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
          title: "",
          field: "",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "commodity_default", },
        },

        {
          title: " 本单库存增量",
          field: "stockIncr",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "unitkucun_default",
            edit: "unitkucun_edit",
          },
        },
        {
          title: " 零散井库存增量",
          field: "spreadStockIncr",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "scatteredkucun_default",
            edit: "scatteredkucun_edit",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums: Array<number | string> = [];
        const footerData = [
        
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '合计'
                  }
                 
                  if (['spreadStockIncr','stockIncr'].includes(column.field)) {
                    dataModel.value.stockIncrTotal = Number(
                      sumNum(data, "stockIncr") + sumNum(data, "spreadStockIncr")
                    );
                    return sumNum(data, "stockIncr") + sumNum(data, "spreadStockIncr")
                  }
                 
                  return null
                }),
               
              ]
              return footerData
      },
    })
    const xiaoshouListOption = computed<VxeGridProps<any>>(()=>{
      return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsSalesList.filter((d: any)=>d.projectCode == tabv.value),
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmHebooilGoodsSalesList) {
                      dataModel.value.smmHebooilGoodsSalesList = [];
                    }
                    dataModel.value.smmHebooilGoodsSalesList.push({
                      id: `${new Date().getTime()}`,
                      projectCode: dataModel.value.projectList.filter((d:any)=>d.projectCode == tabv.value)[0].projectCode,
                      projectName: dataModel.value.projectList.filter((d:any)=>d.projectCode == tabv.value)[0].projectName,
                    });
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
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "kehu_default", edit: "kehu_edit" },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "shangpunliang_default",
            edit: "shangpunliang_edit",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
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
                      dataModel.value.smmHebooilGoodsSalesList.push({
                        id: `${new Date().getTime()}`,
                        projectCode: dataModel.value.projectList.filter((d:any)=>d.projectCode == tabv.value)[0].projectCode,
                        projectName: dataModel.value.projectList.filter((d:any)=>d.projectCode == tabv.value)[0].projectName,
                      });
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
                      dataModel.value.smmHebooilGoodsSalesList.map((d:any,index:number)=>{
                        if(rowIndex == index) {
                          dataModel.value.smmHebooilGoodsSalesList.splice(rowIndex, 1);
                        }
                      });
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
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
              // dataModel.value.sumOutGasNumber = Number(
              //   sumNum(data, "outGasNumber")
              // );
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    }});
    const qiyeListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsSelfList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                企业自用量列用户明细
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmHebooilGoodsSelfList) {
                      dataModel.value.smmHebooilGoodsSelfList = [];
                    }
                    dataModel.value.smmHebooilGoodsSelfList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmHebooilGoodsSelfList);
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
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "kehu_default", edit: "kehu_edit" },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "shangpinliang_default",
            edit: "shangpinliang_edit",
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
                      dataModel.value.smmHebooilGoodsSelfList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmHebooilGoodsSelfList);
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
                      dataModel.value.smmHebooilGoodsSelfList!.splice(rowIndex, 1);
                      $table.reloadData(dataModel.value.smmHebooilGoodsSelfList);
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
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
              dataModel.value.selfUse = Number(
                sumNum(data, "goodsNumber")
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
    const qingjingListOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsNglstockList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                轻烃库存增量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmHebooilGoodsNglstockList) {
                      dataModel.value.smmHebooilGoodsNglstockList = [];
                    }
                    dataModel.value.smmHebooilGoodsNglstockList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmHebooilGoodsNglstockList);
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
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "kehu_default", edit: "kehu_edit" },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "shangpinliang_default",
            edit: "shangpinliang_edit",
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
                      dataModel.value.smmHebooilGoodsNglstockList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmHebooilGoodsNglstockList);
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
                      dataModel.value.smmHebooilGoodsNglstockList!.splice(rowIndex, 1);
                      $table.reloadData(dataModel.value.smmHebooilGoodsNglstockList);
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
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
              dataModel.value.nglstockIncrTotal = Number(
                sumNum(data, "goodsNumber")
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
    const tiaozhengOption = ref<VxeGridProps<any>>({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsAdjustList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                调整后应拨成本量
                <NwIcon
                  style="margin-left:10px;font-size:19px;color:#C91019"
                  name="icon-n-y-circleadd"
                  size="24"
                  onClick={function () {
                    if (!dataModel.value.smmHebooilGoodsAdjustList) {
                      dataModel.value.smmHebooilGoodsAdjustList = [];
                    }
                    dataModel.value.smmHebooilGoodsAdjustList.push({
                      id: `${new Date().getTime()}`,
                    });
                    $grid.reloadData(dataModel.value.smmHebooilGoodsAdjustList);
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
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "kehu_default", edit: "kehu_edit" },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "shangpinliang_default",
            edit: "shangpinliang_edit",
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
                      dataModel.value.smmHebooilGoodsAdjustList.push({
                        id: `${new Date().getTime()}`,
                      });
                      $table.reloadData(dataModel.value.smmHebooilGoodsAdjustList);
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
                      dataModel.value.smmHebooilGoodsAdjustList!.splice(rowIndex, 1);
                      $table.reloadData(dataModel.value.smmHebooilGoodsAdjustList);
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
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
              dataModel.value.adjustTotal = Number(
                sumNum(data, "goodsNumber")
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
      qichuGrid.value && qichuGrid.value.clearEdit();
    };
    const clearActive2 = () => {
      qimoGrid.value && qimoGrid.value.clearEdit();
    };
    const clearActive3 = () => {
      kucunGrid.value && kucunGrid.value.clearEdit();
    };
    const clearActive4 = (index: number) => {
      if( xiaoGrid.value) {
        xiaoGrid.value[index].clearEdit();
      }
    };
    const clearActive5 = () => {
      qiyeGrid.value && qiyeGrid.value.clearEdit();
    };
    const clearActive6 = () => {
      qingjingGrid.value && qingjingGrid.value.clearEdit();
    };
    const clearActive7 = () => {
      tiaozhengGrid.value && tiaozhengGrid.value.clearEdit();
    };
    const tabChange = (v :any) =>{
    }
    const handleAdd = () =>{
      if (chooseProject.value) {
        chooseProject.value.show()
      }
     
    }
    const callback = ( id: any, projectName: any, projectCode: any)=> {
     
      const index = dataModel.value.projectList.findIndex((d:any) => d.projectCode === projectCode)
      if (index >= 0){
        dataModel.value.projectList.splice(index, 1)
      } else {
        dataModel.value.projectList.push({
          id,
          projectName,
          projectCode
        })
      }
      tabv.value = dataModel.value.projectList[0] ? dataModel.value.projectList[0].projectCode : ''
    }
   
    watch(
      () => dataModel.value.smmHebooilGoodsOpeningList,
      (d: any) => {
        if (qichuGrid.value) {
          qichuGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmHebooilGoodsClosingList,
      (d: any) => {
        if (qimoGrid.value) {
          qimoGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmHebooilGoodsStockList,
      (d: any) => {
        if (kucunGrid.value) {
          kucunGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmHebooilGoodsSelfList,
      (d: any) => {
        if (qiyeGrid.value) {
          qiyeGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmHebooilGoodsNglstockList,
      (d: any) => {
        if (qingjingGrid.value) {
          qingjingGrid.value.loadData(d);
        }
      }
    );
    watch(
      () => dataModel.value.smmHebooilGoodsAdjustList,
      (d: any) => {
        if (tiaozhengGrid.value) {
          tiaozhengGrid.value.loadData(d);
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
        
         if (!dataModel.value.smmHebooilGoodsSalesList) {
          dataModel.value.smmHebooilGoodsSalesList = []
        }
        if(!dataModel.value.smmHebooilGoodsOpeningList) {
          dataModel.value.smmHebooilGoodsOpeningList = [{id:new Date().getTime()}]
        }
        if(!dataModel.value.smmHebooilGoodsClosingList) {
          dataModel.value.smmHebooilGoodsClosingList = [{id:new Date().getTime()}]
        }
        if(!dataModel.value.smmHebooilGoodsStockList) {
          dataModel.value.smmHebooilGoodsStockList = [{id:new Date().getTime()}]
        }
       
        if(!dataModel.value.smmHebooilGoodsSelfList) {
            dataModel.value.smmHebooilGoodsSelfList = []
        }
        if(!dataModel.value.smmHebooilGoodsNglstockList) {
            dataModel.value.smmHebooilGoodsNglstockList = []
        }
        if(!dataModel.value.smmHebooilGoodsAdjustList) {
            dataModel.value.smmHebooilGoodsAdjustList = []
        }
        // if(!tabv.value && dataModel.value.projectList) {
        //   tabv.value = dataModel.value.projectList[0] ? dataModel.value.projectList[0].projectCode : ''
        // }

        if(!dataModel.value.projectList) {
          dataModel.value.projectList = []

          smmHebooilClients({}).then((r: any)=>{
            r.splice(0,1).map((d: any)=>{
              dataModel.value.projectList.push({
                id:d.id,
                projectName:d.projectName,
                projectCode:d.projectCode
              })
            })
            tabv.value = dataModel.value.projectList[0].projectCode
          }) 
            
        }else {
            tabv.value = dataModel.value.projectList[0]?  dataModel.value.projectList[0].projectCode : ''
          }
      });
    });

    return {
      formRef,
      dataModel,
      rules,
      brules,
      tabv,
      handleAdd,
      chooseProject,
      tabChange,
      validate,
      sumNum,
      dictItemLists,
      kehuLists,
      clearActive1,
      clearActive2,
      clearActive3,
      clearActive4,
      clearActive5,
      clearActive6,
      clearActive7,
      qichuGrid,
      qimoGrid,
      kucunGrid,
      xiaoGrid,
      qiyeGrid,
      qingjingGrid,
      tiaozhengGrid,
      qiyeListOption,
      xiaoshouListOption,
      qichuListOption,
      qimoListOption,
      qingjingListOption,
      kucunListOption,
      tiaozhengOption,
      callback,
      setxiaoGrid
    };
  },
});
</script>

<style scoped lang='less'>
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

/deep/ .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab {
  border:1px solid white;
}
/deep/  .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-pad {
  border: none !important;
}
/deep/  .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab-pad {
  border-bottom: 1px solid white !important;
}
</style>
