<template>
  <n-form :model="dataModel" 
    :rules="rules" ref="formRef" 
    label-placement="left" :label-width="100" size="small" 
    class="LForm"
  >
    <n-grid :cols="24" :x-gap="24" class="LFormNg">
      <n-form-item-gi :span="24" label="" path="">
        <h5 class="card-title">基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="填报日期" path="tianbaoshijian" class="LFormTable">
        <n-date-picker style="width:100%" v-model:formatted-value="dataModel.tianbaoshijian" value-format="yyyy-MM-dd" type="date" />
      </n-form-item-gi>
     
      <n-form-item-gi :span="12" label="填报人" path="tianbaoren" class="LFormTable">
        <n-input placeholder="填报人" disabled v-model:value="dataModel.tianbaoren" />
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="12" label="库存" path="kucun" class="LFormTable">
        <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_stock' }"
              v-model:value="dataModel.kucunCode"
              v-model:label="dataModel.kucunName"
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
      </n-form-item-gi> -->
      <n-form-item-gi :span="24" label="备注" path="beizhu">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.beizhu"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="" class="LFormTable">
        <vxe-grid ref="detailVxeGrid" v-bind="detailListGridOption" style="
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
              width: 100%;
          ">
          <template #chuyoudanwei_default="{ row, column }">
            <span>{{row.chuyoudanwei_name}}</span>
          </template>
          <template #chuyoudanwei_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: smmHboilDepots, params: {} }"
              v-model:value="row.chuyoudanwei_code"
              v-model:label="row.chuyoudanwei_name"
              placeholder
              size="small"
              :response="{
                  dataMethod: (r: any) =>{
                    return r.map((d: any) => ({
                        value: d.dictitemCode,
                        label: d.dictitemName,
                    }))
                  
                  }
                }"
            />
          </template>
          <template #chuyoudizhi_default="{ row, column }">
            <span>{{row.chuyoudizhi_name}}</span>
          </template>
          <template #chuyoudizhi_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: smmHboilDepotDet, params: row.chuyoudanwei_code }"
              v-model:value="row.chuyoudizhi_code"
              v-model:label="row.chuyoudizhi_name"
              placeholder
              size="small"
              :response="{
                  dataMethod: (r: any) =>{
                    return r.smmHboilDepotDetailList.map((d: any) => ({
                        value: d.dictCode,
                        label: d.dictName,
                    }))
                  
                  }
                }"
            />
          </template>

          <template #anquankucun_default="{ row, column }">
            <span>{{ row.anquankucun_name }}</span>
          </template>
          <template #anquankucun_edit="{ row, column }">
            <n-input-number placeholder="请输入安全库存" @blur="clearActive" :min="0" v-model:value="row.anquankucun_name"></n-input-number>
          </template>
          <template #kucun_default="{ row, column }">
            <span>{{ row.kucun_name }}</span>
          </template>
          <template #kucun_edit="{ row, column }">
            <n-input-number placeholder="请输入库存" @blur="clearActive" :min="0" :max="row.anquankucun_name" v-model:value="row.kucun_name"></n-input-number>
          </template>

          <template #keyongkucun_default="{ row, _rowIndex, }">
            <span>{{ countAmount(row,_rowIndex) }} </span>
          </template>
         
        </vxe-grid>
      </n-form-item-gi>

 
    </n-grid>
  </n-form>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h, watch, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { Db } from '@platform/main'
import { format } from "date-fns";
import { cloneDeep } from 'lodash'
import { dictItemLists,smmHboilDepots,smmHboilDepotDet } from "../../api/index.js"
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
import { request,  NwIcon, NwDic  } from '@platform/main'
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
    NwDic,
    NwIcon
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
      setRules
    } = new FormModal()
 
    const detailVxeGrid: Ref<VxeGridInstance | null> = ref(null)
    
    const detailListGridOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: false,
      // height: '500px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.detailList,
      showFooter: false,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton type="primary" onClick={function () {
                if (!dataModel.value.detailList) {
                  dataModel.value.detailList = []
                }
                dataModel.value.detailList.push({
                  id: `${new Date().getTime()}`,
                  anquankucun_name:0,
                  kucun_name:0

                })
                $grid.reloadData(dataModel.value.detailList)
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
          title: '储油单位',
          field: 'chuyoudanwei_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'chuyoudanwei_default',
            edit: 'chuyoudanwei_edit'
          }
        },
        {
          title: '储油地址',
          field: 'chuyoudizhi_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'chuyoudizhi_default',
            edit: 'chuyoudizhi_edit'
          }
        },
        {
          title: '安全库存(吨)',
          field: 'anquankucun_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'anquankucun_default',
            edit: 'anquankucun_edit'
          }
        },
        {
          title: '库存(吨)',
          field: 'kucun_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'kucun_default',
            edit: 'kucun_edit'
          }
        },
        {
          title: '可用库存(吨)',
          field: 'keyongkucun_name',
          showOverflow: 'title',
          minWidth: 200,
          slots: {
            default: 'keyongkucun_default',
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
                    dataModel.value.detailList!.splice(rowIndex, 1)
                    $table.reloadData(dataModel.value.detailList)
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
    const countAmount = (row:any,_rowIndex:any) =>{
      row.keyongkucun_name = (row.anquankucun_name - row.kucun_name) ?  (row.anquankucun_name - row.kucun_name) : 0
     
      dataModel.value.detailList?.map((d,i)=>{
        if(_rowIndex == i) {
          d.keyongkucun_name = row.keyongkucun_name
        }
        return d
      })
      console.log(dataModel.value.detailList,'-=-=-=-=-=-=')

      return row.keyongkucun_name
    }
    const clearActive = () => {
      
      detailVxeGrid.value && detailVxeGrid.value.clearEdit();
    }
   
  
    watch(() => dataModel.value.detailList, (d: any) => {
      if (detailVxeGrid.value) {
        
        detailVxeGrid.value.loadData(d)
      }
    })
   

    onMounted(() => {
      Db.get('userInfo').then((res: any) => {
        if (!dataModel.value.tianbaorenId) {
       
          dataModel.value.tianbaoren = res.userNameCh
          dataModel.value.tianbaorenId = res.id
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd")
        }


      })
     
 
    })
    return {
      formRef,
      dataModel,
      rules,
      brules,
      detailVxeGrid,
      dictItemLists,
      smmHboilDepots,
      smmHboilDepotDet,
      validate,
      clearActive,
      countAmount,
      detailListGridOption,

    }
  }
})

</script>

<style scoped>
.heji {
  font-weight: 600;
  margin-right: 15px;

}

.heji .label {
  margin-right: 8px;
}
</style>
