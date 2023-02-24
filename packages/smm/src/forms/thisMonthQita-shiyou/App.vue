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
        <h5 class="card-title">销售量</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <n-tabs
          v-model:value="tabv"
          :addable="true"
          type="card"
          tab-style="min-width: 80px;"
          @add="handleAdd"
          @update:value="()=>{}"
        >
        <n-tab-pane v-for="(item,index) in dataModel.productList" :name="item.code" :tab="item.name" :key="item.code">
          <vxe-grid
            ref="setkehuGrid"
            v-bind="kehuListOption"
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
              <span>{{row.kehuName }}</span>
            </template>
            <template #kehu_edit="{ row, column }">
              <nw-dic
                :request="{ XHR: qitaKehuLists, params: item.id }"
                v-model:value="row.kehuCode"
                v-model:label="row.kehuName"
                placeholder
                size="small"
                :response="{
                  dataMethod: (r: any) =>{
                    return r.smmHebooilProductDetailList.map((d: any) => ({
                        value: d.clientCode,
                        label: d.clientName,
                    }))
                  
                  }
                }"
              />
            </template>
            <template #shangpinliang_default="{ row, column }">
              <span>{{row.shangpinliang }}</span>
            </template>
            <template #shangpinliang_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.shangpinliang"
              ></n-input-number>
            </template>
             <template #beizhu_default="{ row, column }">
              <span>{{row.beizhu }}</span>
            </template>
            <template #beizhu_edit="{ row, column }">
              <n-input
                placeholder=""
                v-model:value="row.beizhu"
              ></n-input>
            </template>
          </vxe-grid>
          <div style='height:20px'></div>
          <vxe-grid
            ref="setkucunGrid"
            v-bind="kucunOption"
            style="moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select: none;
              -khtml-user-select: none;
              -webkit-user-select: none;
              -ms-user-select: none;
              user-select: none;
              width: 100%;"
          >
           
            <template #qichuKucun_default="{ row, column }">
              <span>{{row.qichuKucun }}</span>
            </template>
            <template #qichuKucun_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.qichuKucun"
              ></n-input-number>
            </template>
            
            <template #qimoKucun_default="{ row, column }">
              <span>{{row.qimoKucun }}</span>
            </template>
            <template #qimoKucun_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.qimoKucun"
              ></n-input-number>
            </template>
            
            <template #kucunZengliang_default="{ row, column }">
              <span>{{row.kucunZengliang }}</span>
            </template>
            <template #kucunZengliang_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.kucunZengliang"
              ></n-input-number>
            </template>
            
            <template #ziyongliang_default="{ row, column }">
              <span>{{row.ziyongliang }}</span>
            </template>
            <template #ziyongliang_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.ziyongliang"
              ></n-input-number>
            </template>
            
            <template #yingbochengben_default="{ row, column }">
              <span>{{row.yingbochengben }}</span>
            </template>
            <template #yingbochengben_edit="{ row, column }">
              <n-input-number
                placeholder=""
                v-model:value="row.yingbochengben"
              ></n-input-number>
            </template>
            
          </vxe-grid>
        </n-tab-pane>
      </n-tabs>
      </n-form-item-gi>
      <n-form-item-gi :span="24"  :label-width="40" label="备注" path="beizhu" class="LFormTable">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.beizhu"
        />
      </n-form-item-gi>
    </n-grid>
    <ChooseProduct 
      :value="dataModel.productList ? dataModel.productList :[]"
      @callback="callback"
      ref="chooseProduct"
    ></ChooseProduct>
  </n-form>
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
import { dictItemLists,smmHebooilProducts, qitaKehuLists } from "../../api/index.js";
import ChooseProduct from "../../components/qitaProduct/index.vue";

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
  NTab,
  NTabPane,
  NTabs,
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
    NTab,
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
    ChooseProduct,
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
    const kehuGrid: Ref<Array<any>> = ref([]);
    const kucunGrid: Ref<Array<any>> = ref([]);

    const  setkehuGrid = (el: any) => {
      if(el) {
        kehuGrid.value.push(el)
      }
    }
     const setkucunGrid = (el: any) => {
      if(el) {
        kucunGrid.value.push(el)
      }
    }
    const chooseProduct  = ref();

    const tabv = ref('');
    const handleAdd = () =>{
      if (chooseProduct.value) {
        chooseProduct.value.show()
      }
     
    }
    const callback = ( id: any, name: any, code: any)=> {
      const index = dataModel.value.productList.findIndex((d:any) => d.code === code)
      if (index >= 0){
        dataModel.value.productList.splice(index, 1)
      } else {
        dataModel.value.productList.push({
          id,
          name,
          code
        })
        dataModel.value.kucunList.push({
          id,
          productName:name,
          productCode:code
        })
      }

      tabv.value = dataModel.value.productList[0].code
    }
    const kehuListOption = computed<VxeGridProps<any>>(()=>{
       return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.kehuList.filter((d: any)=>d.productCode == tabv.value),
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
                    if (!dataModel.value.kehuList) {
                      dataModel.value.kehuList = [];
                    }
                    dataModel.value.kehuList.push({
                      id: `${new Date().getTime()}`,
                      productCode: dataModel.value.productList.filter((d:any)=>d.code == tabv.value)[0].code,
                      productName: dataModel.value.productList.filter((d:any)=>d.code == tabv.value)[0].name,
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
            field: "kehu",
            showOverflow: "title",
            minWidth: 200,
            editRender: {},
            slots: { default: "kehu_default", edit: "kehu_edit" },
          },

          {
            title: "商品量(吨)",
            field: "shangpinliang",
            minWidth: 150,
            editRender: {},
            slots: {
              default: "shangpinliang_default",
              edit: "shangpinliang_edit",
            },
          },
           {
            title: "备注",
            field: "beizhu",
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
                        dataModel.value.kehuList.push({
                          id: `${new Date().getTime()}`,
                          productCode: dataModel.value.productList.filter((d:any)=>d.code == tabv.value)[0].code,
                          productName: dataModel.value.productList.filter((d:any)=>d.code == tabv.value)[0].name,
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
                        dataModel.value.kehuList.map((d:any,index:number)=>{
                          if(rowIndex == index) {
                            dataModel.value.kehuList.splice(rowIndex, 1);
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
            if (column.field === "shangpinliang") {
              sums.push(Number(sumNum(data, "shangpinliang")));
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
    const kucunOption = computed<VxeGridProps<any>>(()=>{
      return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.kucunList.filter((d: any)=>d.productCode == tabv.value),
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3>
                商品量(吨)
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
            title: "期初库存",
            field: "qichuKucun",
            showOverflow: "title",
            minWidth: 200,
            editRender: {},
            slots: { default: "qichuKucun_default", edit: "qichuKucun_edit" },
          },

          {
            title: "期末库存",
            field: "qimoKucun",
            minWidth: 150,
            editRender: {},
            slots: {
              default: "qimoKucun_default",
              edit: "qimoKucun_edit",
            },
          },
          {
            title: "库存增量",
            field: "kucunZengliang",
            minWidth: 150,
            editRender: {},
            slots: {
              default: "kucunZengliang_default",
              edit: "kucunZengliang_edit",
            },
          },
          {
            title: "自用量",
            field: "ziyongliang",
            minWidth: 150,
            editRender: {},
            slots: {
              default: "ziyongliang_default",
              edit: "ziyongliang_edit",
            },
          },
          {
            title: "应拨成本",
            field: "yingbochengben",
            minWidth: 150,
            editRender: {},
            slots: {
              default: "yingbochengben_default",
              edit: "yingbochengben_edit",
            },
          },
        ],
    }})
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
         if(!dataModel.value.productList) {
          dataModel.value.kehuList = []
          dataModel.value.productList = []
          dataModel.value.kucunList = []
          smmHebooilProducts({}).then((r: any)=>{
            r.map((d: any)=>{
              dataModel.value.productList.push({
                id:d.id,
                name:d.productName,
                code:d.productCode
              })
              dataModel.value.kucunList.push({
                id:d.id,
                productName:d.productName,
                productCode:d.productCode
              })
            })
            tabv.value = dataModel.value.productList[0].code
          })
            
        } else {
            tabv.value = dataModel.value.productList[0]?  dataModel.value.productList[0].code : ''
        }
      });
    });

    return {
      formRef,
      dataModel,
      rules,
      brules,
      tabv,
      chooseProduct,
      callback,
      setkehuGrid,
      setkucunGrid,
      kehuGrid,
      kucunGrid,
      handleAdd,
      validate,
      sumNum,
      kehuListOption,
      kucunOption,
      dictItemLists,
      qitaKehuLists
     
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
