<template>
  <n-form :model="dataModel" 
    :rules="rules" ref="formRef" 
    label-placement="left" :label-width="90" size="small" 
    class="LForm"
  >
    <n-grid :cols="24" :x-gap="24" class="LFormNg">
      <n-form-item-gi :span="24" label="" path="">
        <h5 class="card-title">基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="填报日期" path="tianbaoshijian" class="LFormTable">
        <n-date-picker style="width:100%" v-model:formatted-value="dataModel.tianbaoshijian" value-format="yyyy-MM-dd" type="date" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="填报厂别" path="tianbaochangbie" class="LFormTable">
        <n-input placeholder="填报厂别" disabled v-model:value="dataModel.tianbaochangbie" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="填报人" path="tianbaoren" class="LFormTable">
        <n-input placeholder="填报人" disabled v-model:value="dataModel.tianbaoren" />
      </n-form-item-gi>
    
      <n-form-item-gi :span="8" label="期初库存" path="openingStock" class="LFormTable">
        <n-input-number :min='0' style="width:100%" placeholder=""  v-model:value="dataModel.openingStock" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="期末库存" path="endingStock" class="LFormTable">
        <n-input-number :min='0' :max='dataModel.openingStock' style="width:100%" placeholder=""  v-model:value="dataModel.endingStock" />
      </n-form-item-gi>
       <n-form-item-gi :span="8" label="库存差" path="kucuncha" class="LFormTable">
        <n-input-number  style="width:100%" placeholder="" disabled :value="dataModel.openingStock-dataModel.endingStock ? dataModel.openingStock-dataModel.endingStock: '0'" />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" path="code">
        <h5 class="card-title">销售量</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" class="LFormTable">
       
        <vxe-grid ref="sourceVxeGrid"  v-bind="sourceListGridOption" style="
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
              width: 100%;
          ">
          <template #laiyuan_default="{ row, column }">
            <span>{{row.clientName}}</span>
          </template>
          <template #laiyuan_edit="{ row, column }">
              <nw-dic
                  :request="{ XHR: dictItemLists, params: 'smm-area' }"
                  v-model:value="dataModel.clientCode"
                  v-model:label="dataModel.clientName"
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
          <template #yunxiaoliang_default="{ row, column }">
            <span>{{row.sales}}</span>
          </template>
          <template #yunxiaoliang_edit="{ row, column }">
            <n-input-number placeholder="请输入运销量" @blur="clearActive" v-model:value="row.sales"></n-input-number>
          </template>
          <template #beizhu_default="{ row, column }">
            <span>{{row.explanation}}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input placeholder="请输入备注" @blur="clearActive" v-model:value="row.explanation"></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>
     

    
    </n-grid>
  </n-form>
  <!-- <n-button @click="testshow">Test</n-button> -->
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h, watch, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { Db } from '@platform/main'
import { format } from "date-fns";
import { cloneDeep } from 'lodash'

import { dictItemLists, commonStationList, commomPgtCustomList, commonCustomList } from "../../api/index.js"
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NTreeSelect,
  TreeSelectOption,
} from 'naive-ui'
import { request,NwIcon, NwDic } from '@platform/main'
import { FormModal } from './store'


export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NDatePicker,
    NSelect,
    NTreeSelect,
    NwIcon,
    NwDic
  },
  setup() {
    const {
      formRef,
      dataModel,
      rules,
      brules,
      setValue,
      getValue,
      setRules
    } = new FormModal()
    const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0
      let count: number = 0
      list.forEach((item: any) => {
        console.log(item)
        console.log(field)
        if (item[field]) {
          count += Number(item[field])
        }
      })
      return count
    }
    const sourceVxeGrid: Ref<VxeGridInstance | null> = ref(null)
    const sourceListGridOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmNaturalGasStockList,
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
                    if (!dataModel.value.smmNaturalGasStockList) {
                      dataModel.value.smmNaturalGasStockList = [];
                    }
                    dataModel.value.smmNaturalGasStockList.push({
                      id: `${new Date().getTime()}`,
                    });
                  }}
                />
              </h3>,
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
          title: '客户',
          field: 'clientName',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'laiyuan_default', edit: 'laiyuan_edit' }
        },
        {
          title: '商品量(立方米)',
          field: 'sales',
          minWidth: 190,
          editRender: {},
          slots: {
            default: 'yunxiaoliang_default', edit: 'yunxiaoliang_edit'
          }
        },
        {
          title: '备注',
          field: 'explanation',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          }
        },
        {
          title: '操作',
          width: 70,
          fixed: 'right',
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <NButton
                  size="small"
                  type="error"
                  onClick={function () {
                    dataModel.value.smmNaturalGasStockList!.splice(rowIndex, 1)
                    $table.reloadData(dataModel.value.smmNaturalGasStockList)
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
   

  

    watch(() => dataModel.value.smmNaturalGasStockList, (d: any) => {
      if (sourceVxeGrid.value) {
        sourceVxeGrid.value.loadData(d)
      }


    })
  
    onMounted(() => {
      Db.get('userInfo').then((res: any) => {
        if (!dataModel.value.tianbaochangbie) {
          dataModel.value.tianbaochangbie = res.parentDeptName
          dataModel.value.tianbaochangbieId = res.parentDeptId
          dataModel.value.tianbaorendanwei = res.orgFullName
          dataModel.value.tianbaorendanweiId = res.orgFullId
          dataModel.value.tianbaoren = res.userNameCh
          dataModel.value.tianbaorenId = res.id
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd")
        }


      })
    })

    const clearActive = () => {
      sourceVxeGrid.value && sourceVxeGrid.value.clearEdit()
    }

    return {
      formRef,
      dataModel,
      rules,
      brules,
    
      sourceListGridOption,
      sourceVxeGrid,
     
      clearActive,
      sumNum

    }
  }
})

</script>

<style scoped>

</style>
