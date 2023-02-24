<template>

  <n-config-provider
    abstract
    :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1500px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
  
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-bumen2" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        报表详情
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <div style="height:700px">
      <n-form
        :model="dataModel"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
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
              disabled
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
              <template #scatteredChukucun_default="{ row, column }">
                <span>{{row.spreadOpeningStock }}</span>
              </template>
              <template #beizhu_default="{ row, column }">
                <span>{{row.explanation }}</span>
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
              <template #scatteredChukucun_default="{ row, column }">
                <span>{{row.spreadClosingStock }}</span>
              </template>
              <template #beizhu_default="{ row, column }">
                <span>{{row.explanation }}</span>
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
              <template #scatteredkucun_default="{ row, column }">
                <span>{{row.spreadStockIncr }}</span>
              </template>
              <template #beizhu_default="{ row, column }">
                <span>{{row.explanation }}</span>
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
              tab-style="min-width: 80px;"
              
            >
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
                    <template #shangpunliang_default="{ row, column }">
                      <span>{{row.goodsNumber }}</span>
                    </template>
                    <template #beizhu_default="{ row, column }">
                      <span>{{row.explanation }}</span>
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
              <template #shangpinliang_default="{ row, column }">
                <span>{{row.goodsNumber }}</span>
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
            <template #shangpinliang_default="{ row, column }">
              <span>{{row.goodsNumber }}</span>
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
           
            <template #shangpinliang_default="{ row, column }">
              <span>{{row.goodsNumber }}</span>
            </template>
          </vxe-grid>
        </n-form-item-gi>
        <n-form-item-gi :span="24"  :label-width="40" label="备注" path="explanation" class="LFormTable">
          <n-input
            placeholder="备注"
            type="textarea"
            disabled
            v-model:value="dataModel.explanation"
          />
          </n-form-item-gi> 
        </n-grid>
      </n-form>
    </div>
    <div class="nw-modal-action">
      
      <n-button  size="small"
      @click="visible = false" >关闭</n-button>
    </div>
  </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, watch, onMounted, } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NBadge,
  NSpin,
  NModal,
  NSelect,
  NSwitch,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NDatePicker,
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { detailForm } from './api/index'

import theme from '../../components/theme'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NBadge,
    NwIcon,
    NSwitch,
    NTabs,
    NTabPane,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputNumber,
    NDatePicker,
    NSelect,
  },
  props:{
  },
  setup(props, context){
    const visible = ref(false)
    const dataModel = ref({})
    const qichuGrid = ref(null);
    const qimoGrid = ref(null);
    const kucunGrid = ref(null);
    const qiyeGrid = ref(null);
    const qingjingGrid = ref(null);
    const tiaozhengGrid = ref(null);
    const xiaoGrid = ref([]);
    const tabv = ref('');
    const sonFn = (row) =>{
        visible.value = true
        detailForm(row.camundaProcinsId).then((r)=>{
          
            dataModel.value = {...r}
            tabv.value = dataModel.value.projectList[0]?  dataModel.value.projectList[0].projectCode : ''
        })
    }
    const sumNum = (list, field) => {
      if (list && list.length <= 0) return 0
      let count  = 0
      list.forEach((item) => {
        console.log(item)
        console.log(field)
        if (item[field]) {
          count += Number(item[field])
        }
      })
      return count
    }
   
    const setxiaoGrid = (el) => {
      if(el) {
        xiaoGrid.value.push(el)
      }
    }
     const qichuListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: [],
      showFooter: true,
      mergeFooterItems:[
        { row: 0, col: 1, rowspan: 1, colspan: 3 }
      ],
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }) => {
            return [
              <h3>
                期初库存
              </h3>,
            ];
          },
        },
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
          
          slots: {
            default: "unitChukucun_default",
          },
        },
        {
          title: "零散井期初库存",
          field: "spreadOpeningStock",
          minWidth: 150,
          
          slots: {
            default: "scatteredChukucun_default",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          
          slots: {
            default: "beizhu_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
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
    const qimoListOption = ref({
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
          buttons: ({ $grid }) => {
            return [
              <h3>
                期末库存
                
              </h3>,
            ];
          },
        },
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
          
          slots: {
            default: "unitChukucun_default",
          },
        },
        {
          title: "零散井期初库存",
          field: "spreadClosingStock",
          minWidth: 150,
          
          slots: {
            default: "scatteredChukucun_default",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          
          slots: {
            default: "beizhu_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
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
    const kucunListOption = ref({
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
          buttons: ({ $grid }) => {
            return [
              <h3>
                库存增量
              </h3>,
            ];
          },
        },
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
          slots: {
            default: "unitkucun_default",
          },
        },
        {
          title: " 零散井库存增量",
          field: "spreadStockIncr",
          minWidth: 150,
          slots: {
            default: "scatteredkucun_default",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          slots: {
            default: "beizhu_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        const footerData = [
          columns.map((column, _columnIndex) => {
            if (_columnIndex === 0) {
              return '合计'
            }
            
            if (['spreadStockIncr','stockIncr'].includes(column.field)) {
              return sumNum(data, "stockIncr") + sumNum(data, "spreadStockIncr")
            }
            
            return null
          }),
          
        ]
        return footerData
      },
    })
    const xiaoshouListOption = computed(()=>{
      return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilGoodsSalesList.filter((d)=>d.projectCode == tabv.value),
      showFooter: true,
      columns: [
        {
          title: "客户",
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          
          slots: { default: "kehu_default", },
        },
        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          
          slots: {
            default: "shangpunliang_default",
          },
        },
        {
          title: "备注",
          field: "explanation",
          minWidth: 150,
          
          slots: {
            default: "beizhu_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    }});
    const qiyeListOption = ref({
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
          buttons: ({ $grid }) => {
            return [
              <h3>
                企业自用量列用户明细
              </h3>,
            ];
          },
        },
      },
      columns: [
        {
          title: "客户",
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "kehu_default", edit: "kehu_edit" },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          slots: {
            default: "shangpinliang_default",
            edit: "shangpinliang_edit",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
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
    const qingjingListOption = ref({
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
          buttons: ({ $grid }) => {
            return [
              <h3>
                轻烃库存增量
              </h3>,
            ];
          },
        },
      },
      columns: [
        {
          title: "客户",
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "kehu_default",  },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          slots: {
            default: "shangpinliang_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const tiaozhengOption = ref({
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
          buttons: ({ $grid }) => {
            return [
              <h3>
                调整后应拨成本量
              </h3>,
            ];
          },
        },
      },
      columns: [
        {
          title: "客户",
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          slots: { default: "kehu_default",  },
        },

        {
          title: "商品量(吨)",
          field: "goodsNumber",
          minWidth: 150,
          slots: {
            default: "shangpinliang_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "goodsNumber") {
              sums.push(Number(sumNum(data, "goodsNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    watch(() => dataModel.value.smmHebooilGoodsOpeningList, (d) => {
      if (qichuGrid.value) {
        qichuGrid.value.loadData(d)
      }


    })
    watch(() => dataModel.value.smmHebooilGoodsClosingList, (d) => {
      if (qimoGrid.value) {
        qimoGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmHebooilGoodsStockList, (d) => {
      if (kucunGrid.value) {
        kucunGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmHebooilGoodsSelfList, (d) => {
      if (qiyeGrid.value) {
        qiyeGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmHebooilGoodsNglstockList, (d) => {
      if (qingjingGrid.value) {
        qingjingGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmHebooilGoodsAdjustList, (d) => {
      if (tiaozhengGrid.value) {
        tiaozhengGrid.value.loadData(d)
      }
    })
    return {
        visible,
        sumNum,
        dataModel,
        sonFn,
        tabv,
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
        setxiaoGrid
    }
  }
}
</script>

<style lang='less' scoped>
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}

.nw-spin-full {
  height: 100%;
  
  :deep(.n-spin-content) {
    height: 100%
  }
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