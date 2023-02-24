<template>

  <n-config-provider
    abstract
    :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1600px; padding: 0"
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
        计划管理
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <n-spin :show="isLoading">
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
            <n-grid :cols="24" :x-gap="24" style="padding-top:10px">
                <n-form-item-gi :span="12" label="地区" path="diareaCode" >
                  <nw-dic
                      :request="{ XHR: dictItemLists, params: 'smm-area' }"
                      v-model:value="dataModel.areaCode"
                      v-model:label="dataModel.areaName"
                      placeholder
                      size="small"
                      :response="{
                          dataMethod: (r) =>{
                            return r.map((d) => ({
                                value: d.dictItemCode,
                                label: d.dictItemName,
                            }))
                          
                          }
                        }"
                  />
              </n-form-item-gi>
              <n-form-item-gi :span="12" label="销售方" path="sellCode" >
                  <nw-dic
                      :request="{ XHR: dictItemLists, params: 'smm_sellf' }"
                      v-model:value="dataModel.sellCode"
                      v-model:label="dataModel.sellName"
                      placeholder
                      size="small"
                      :response="{
                          dataMethod: (r) =>{
                            return r.map((d) => ({
                                value: d.dictItemCode,
                                label: d.dictItemName,
                            }))
                          
                          }
                        }"
                  />
              </n-form-item-gi>
              <n-form-item-gi :span="24" label="备注" path="explanation" >
                <n-input
                  placeholder="备注"
                  type="textarea"
                  v-model:value="dataModel.explanation"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="24" label="" path="code" >
                <vxe-grid
                  ref="smmSxGasDailyOutsourcingListGrid"
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
                  <template #kehu_default="{ row, column }">
                    <span>{{ row.oilClientName }}</span>
                  </template>
                  <template #kehu_edit="{ row, column }">
                    <nw-dic
                      :request="{ XHR: dictItemLists, params: 'smm_eldqkh' }"
                      v-model:value="row.oilClientCode"
                      v-model:label="row.oilClientName"
                      placeholder
                      size="small"
                      :response="{
                          dataMethod: (r) =>{
                            return r.map((d) => ({
                                value: d.dictItemCode,
                                label: d.dictItemName,
                            }))
                          
                          }
                        }"
                    />
                  </template>
                  <template #xian_default="{ row, column }">
                    <span>{{ row.typeOfShippingName }}</span>
                  </template>
                  <template #xian_edit="{ row, column }">
                    <nw-dic
                      :request="{ XHR: dictItemLists, params: 'smm_typeOfShipping' }"
                      v-model:value="row.typeOfShippingCode"
                      v-model:label="row.typeOfShippingName"
                      placeholder
                      size="small"
                      :response="{
                          dataMethod: (r) =>{
                            return r.map((d) => ({
                                value: d.dictItemCode,
                                label: d.dictItemName,
                            }))
                          
                          }
                        }"
                    />
                  </template>
                  <template #yiyue_default="{ row, column }">
                    <span>{{ row.janNumber }}</span>
                  </template>
                  <template #yiyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.janNumber"></n-input-number>
                  </template>
                  <template #eryue_default="{ row, column }">
                    <span>{{ row.febNumber }}</span>
                  </template>
                  <template #eryue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.febNumber"></n-input-number>
                  </template>
                  <template #sanyue_default="{ row, column }">
                    <span>{{ row.marchNumber }}</span>
                  </template>
                  <template #sanyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.marchNumber"></n-input-number>
                  </template>
                  <template #siyue_default="{ row, column }">
                    <span>{{ row.aprilNumber }}</span>
                  </template>
                  <template #siyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.aprilNumber"></n-input-number>
                  </template>
                  <template #wuyue_default="{ row, column }">
                    <span>{{ row.mayNumber }}</span>
                  </template>
                  <template #wuyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.mayNumber"></n-input-number>
                  </template>
                  <template #liuyue_default="{ row, column }">
                    <span>{{ row.junNumber }}</span>
                  </template>
                  <template #liuyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.junNumber"></n-input-number>
                  </template>
                  <template #qiyue_default="{ row, column }">
                    <span>{{ row.julyNumber }}</span>
                  </template>
                  <template #qiyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.julyNumber"></n-input-number>
                  </template>
                  <template #bayue_default="{ row, column }">
                    <span>{{ row.augNumber }}</span>
                  </template>
                  <template #bayue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.augNumber"></n-input-number>
                  </template>
                  <template #jiuyue_default="{ row, column }">
                    <span>{{ row.sepNumber }}</span>
                  </template>
                  <template #jiuyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.sepNumber"></n-input-number>
                  </template>
                  <template #shiyue_default="{ row, column }">
                    <span>{{ row.octNumber }}</span>
                  </template>
                  <template #shiyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.octNumber"></n-input-number>
                  </template>
                  <template #shiyiyue_default="{ row, column }">
                    <span>{{ row.novNumber }}</span>
                  </template>
                  <template #shiyiyue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.novNumber"></n-input-number>
                  </template>

                  <template #shieryue_default="{ row, column }">
                    <span>{{ row.decNumber }}</span>
                  </template>
                  <template #shieryue_edit="{ row, column }">
                    <n-input-number placeholder="" @blur="clearActive" v-model:value="row.decNumber"></n-input-number>
                  </template>
                </vxe-grid>
              </n-form-item-gi>
              
            </n-grid>
          </n-form>
        </div>
    </n-spin>
    <div class="nw-modal-action">
      <n-button size="small" type="default" style="margin-right: 5px" @click="visible = false">取消</n-button>

      <n-button size="small" type="info" @click="onPositiveClick" :disabled="btloading">保存</n-button>

      
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
import { NwIcon,NwDic } from '@platform/main'
import { dictItemLists,creat, edit, detailForm } from './api/index'
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
    NwDic,
  },
  props:{
  },
  setup(props, context){
    const visible = ref(false)
    const dataModel = ref({})
    const formRef = ref()
    const isLoading = ref(false)
    const sonFn = (row={}) =>{
        visible.value = true
        if(row.id){
          isLoading.value = true
          detailForm(row.id).then((r)=>{
            isLoading.value = false
            dataModel.value = {...r}
          })
        } else {
          dataModel.value = {...row}
        }
       
    }
    const smmSxGasDailyOutsourcingListGrid = ref()
    const clearActive = () => {
      smmSxGasDailyOutsourcingListGrid.value && smmSxGasDailyOutsourcingListGrid.value.clearEdit();
    };
   
    const smmSxGasDailyOutListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHboilSellPlanDetailList,
      showFooter: false,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }) => {
            return [
              <NButton type="primary" onClick={function () {
                if (!dataModel.value.smmHboilSellPlanDetailList) {
                  dataModel.value.smmHboilSellPlanDetailList = []
                }
                dataModel.value.smmHboilSellPlanDetailList.push({
                  id: `${new Date().getTime()}`
                })
                $grid.reloadData(dataModel.value.smmHboilSellPlanDetailList)
              }}>{{
                default: () => '新增'
              }}</NButton>
            ]
          }
        }
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        autoClear: false
      },
      columns: [
        {
          title: "客户",
          field: "oilClientName",
          minWidth: 60,
          editRender: {},
          slots: {
            default: "kehu_default",
            edit: 'kehu_edit'
          },
        },
        {
          title: "线/运输方式",
          field: "typeOfShippingName",
          showOverflow: "title",
          minWidth: 60,
          editRender: {},
          slots: { default: "xian_default", edit: 'xian_edit' },
        },

        
        {
          title: "1月",
          field: "janNumber",
          editRender: {},
          slots: {
            default: "yiyue_default",
            edit: 'yiyue_edit'
          },
        },
        {
          title: "2月",
          field: "febNumber",
          editRender: {},
          slots: {
            default: "eryue_default",
            edit: 'eryue_edit'
          },
        },
        {
          title: "3月",
          field: "marchNumber",
          editRender: {},
          slots: {
            default: "sanyue_default",
            edit: 'sanyue_edit'
          },
        },
        {
          title: "4月",
          field: "aprilNumber",
          editRender: {},
          slots: {
            default: "siyue_default",
            edit: 'siyue_edit'
          },
        },
        {
          title: "5月",
          field: "mayNumber",
          editRender: {},
          slots: {
            default: "wuyue_default",
            edit: 'wuyue_edit'
          },
        },
        {
          title: "6月",
          field: "junNumber",
          editRender: {},
          slots: {
            default: "liuyue_default",
            edit: 'liuyue_edit'
          },
        },
        {
          title: "7月",
          field: "julyNumber",
          editRender: {},
          slots: {
            default: "qiyue_default",
            edit: 'qiyue_edit'
          },
        },
        {
          title: "8月",
          field: "augNumber",
          editRender: {},
          slots: {
            default: "bayue_default",
            edit: 'bayue_edit'
          },
        },
        {
          title: "9月",
          field: "sepNumber",
          editRender: {},
          slots: {
            default: "jiuyue_default",
            edit: 'jiuyue_edit'
          },
        },
        {
          title: "10月",
          field: "octNumber",
          editRender: {},
          slots: {
            default: "shiyue_default",
            edit: 'shiyue_edit'
          },
        },
        {
          title: "11月",
          field: "novNumber",
          editRender: {},
          slots: {
            default: "shiyiyue_default",
            edit: 'shiyiyue_edit'
          },
        },
        {
          title: "12月",
          field: "decNumber",
          editRender: {},
          slots: {
            default: "shieryue_default",
            edit: 'shieryue_edit'
          },
        },
        {
          title: '操作',
          width: 70,
          fixed: 'right',
          slots: {
            default: ({ $table, rowIndex }) => {
              return [
                <NButton
                  size="small"
                  type="error"
                  onClick={function () {
                    dataModel.value.smmHboilSellPlanDetailList.splice(rowIndex, 1)
                    $table.reloadData(dataModel.value.smmHboilSellPlanDetailList)
                  }}
                >{{
                  default: () => '删除'
                }}</NButton>
              ]
            }
          }
        }
      ],
    
    })
    watch(() => dataModel.value.smmHboilSellPlanDetailList, (d) => {
      if (smmSxGasDailyOutsourcingListGrid.value) {
        smmSxGasDailyOutsourcingListGrid.value.loadData(d)
      }


    })
    return {
        visible,
        dataModel,
        sonFn,
        dictItemLists,
        clearActive,
        formRef,
        isLoading,
        smmSxGasDailyOutListOption,
        smmSxGasDailyOutsourcingListGrid,
        onPositiveClick() {
         const fn = !dataModel.value.id ? creat : edit
          formRef.value.validate((errors) => {
            if (!errors) {
              isLoading.value = true
              fn(dataModel.value).then((res) => {
                if (res) {
                  context.emit('update:callback');
                  visible.value = false
                }
              }).finally(r => {
                isLoading.value = false
              })
            }
          })

        },
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


</style>