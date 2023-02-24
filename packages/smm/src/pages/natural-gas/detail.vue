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

          
         <n-form-item-gi :span="24" label="" path="code">
        <h5 class="card-title">销售量</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
        <n-tabs
          v-model:value="tabv"
          :addable="false"
          type="card"
          tab-style="min-width: 80px;"
        >
            <n-tab-pane v-for="(item,index) in dataModel.smmHebooilOtherProjectList" :name="item.projectCode" :tab="item.projectName" :key="item.projectCode">
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
                  <span>{{row.clientName }}</span>
                </template>
                
                <template #shangpinliang_default="{ row, column }">
                  <span>{{row.goodsNumber }}</span>
                </template>
               
                <template #beizhu_default="{ row, column }">
                  <span>{{row.explanation }}</span>
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
                  <span>{{row.openingStock }}</span>
                </template>
                
                <template #qimoKucun_default="{ row, column }">
                  <span>{{row.closingStock }}</span>
                </template>
               
                <template #kucunZengliang_default="{ row, column }">
                  <span>{{row.nglstockIncr }}</span>
                </template>
                <template #ziyongliang_default="{ row, column }">
                  <span>{{row.selfUse }}</span>
                </template>
                
                <template #yingbochengben_default="{ row, column }">
                  <span>{{row.adjustTotal }}</span>
                </template>
              </vxe-grid>
            </n-tab-pane>
          </n-tabs>
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
import { ref, reactive, nextTick, h, computed, watch } from 'vue'
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
    const kehuGrid = ref([]);
    const kucunGrid = ref([]);

    const  setkehuGrid = (el) => {
      if(el) {
        kehuGrid.value.push(el)
      }
    }
     const setkucunGrid = (el) => {
      if(el) {
        kucunGrid.value.push(el)
      }
    }
    const tabv = ref('');
    const sonFn = (row) =>{
        visible.value = true
        detailForm(row.camundaProcinsId).then((r)=>{
           dataModel.value = {...r}
           tabv.value = dataModel.value.smmHebooilOtherProjectList[0]?  dataModel.value.smmHebooilOtherProjectList[0].projectCode : ''
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
   
    const kehuListOption = computed(()=>{
       return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilOtherDetailList.filter((d)=>d.productCode == tabv.value),
      showFooter: true,
      columns: [
          {
            title: "客户",
            field: "kehu",
            showOverflow: "clientName",
            minWidth: 200,
            slots: { default: "kehu_default", },
          },

          {
            title: "商品量(吨)",
            field: "goodsNumber",
            minWidth: 150,
            slots: {
              default: "shangpinliang_default",
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
    const kucunOption = computed(()=>{
      return {
      
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilOtherQuantityList.filter((d)=>d.productCode == tabv.value),
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }) => {
            return [
              <h3>
                商品量(吨)
              </h3>,
            ];
          },
        },
      },
      
        columns: [
          {
            title: "期初库存",
            field: "openingStock",
            showOverflow: "title",
            minWidth: 200,
            slots: { default: "qichuKucun_default", },
          },

          {
            title: "期末库存",
            field: "closingStock",
            minWidth: 150,
            slots: {
              default: "qimoKucun_default",
            },
          },
          {
            title: "库存增量",
            field: "nglstockIncr",
            minWidth: 150,
            slots: {
              default: "kucunZengliang_default",
            
            },
          },
          {
            title: "自用量",
            field: "selfUse",
            minWidth: 150,
            slots: {
              default: "ziyongliang_default",
            },
          },
          {
            title: "应拨成本",
            field: "adjustTotal",
            minWidth: 150,
            slots: {
              default: "yingbochengben_default",
            },
          },
        ],
    }})
   
    return {
        visible,
        dataModel,
        sonFn,
        tabv,
        setkehuGrid,
        setkucunGrid,
        kehuGrid,
        kucunGrid,
        sumNum,
        kehuListOption,
        kucunOption,
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