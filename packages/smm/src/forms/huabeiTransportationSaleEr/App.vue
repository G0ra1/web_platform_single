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
      <!-- <n-form-item-gi :span="12" label="地区" path="diqu" class="LFormTable">
        <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm-area' }"
              v-model:value="dataModel.diquCode"
              v-model:label="dataModel.diquName"
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
      <n-form-item-gi :span="24"   label="实产量(吨)" path="shichanliang" class="LFormTable">
        <n-input-number placeholder="请输入实产量" style="width:100%" v-model:value="dataModel.shichanliang"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="beizhu" class="LFormTable">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.beizhu"
        />
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="24" label="" path="code">
        <h5 class="card-title">华北油田冀中自产气</h5>
      </n-form-item-gi> -->
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
          <template #yunshufangshi_default="{ row, column }">
            <span>{{row.yunshufangshi_name}}</span>
          </template>
          <template #yunshufangshi_edit="{ row, column }">
            <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_typeOfShipping' }"
              v-model:value="row.yunshufangshi_code"
              v-model:label="row.yunshufangshi_name"
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
          <template #kehu_default="{ row, column }">
            <span>{{row.kehu_name}}</span>
          </template>
          <template #kehu_edit="{ row, column }">
            <!-- <nw-dic
              :request="{ XHR: dictItemLists, params: 'smm_oilClient' }"
              v-model:value="row.kehu_code"
              v-model:label="row.kehu_name"
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
            /> -->
            <nw-dic
              
              :request="{ XHR: dictItemLists, params: 'smm_eldqkh' }"
              v-model:value="row.kehu_code"
              v-model:label="row.kehu_name"
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

         

          <template #rixiaoliang_default="{ row, column }">
            <span>{{row.rixiaoliang_name}}</span>
          </template>
          <template #rixiaoliang_edit="{ row, column }">
            <n-input-number placeholder="请输入日销量" @blur="clearActive" v-model:value="row.rixiaoliang_name"></n-input-number>
          </template>

          <template #yueleiji_default="{ row, column }">
            <span>{{row.yueleiji_name}}</span>
          </template>
          <template #yueleiji_edit="{ row, column }">
            <n-input-number placeholder="请输入月累计" @blur="clearActive" v-model:value="row.yueleiji_name"></n-input-number>
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
import { dictItemLists, } from "../../api/index.js"
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
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton type="primary" onClick={function () {
                if (!dataModel.value.detailList) {
                  dataModel.value.detailList = []
                }
                dataModel.value.detailList.push({
                  id: `${new Date().getTime()}`
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
          title: '线/运输方式',
          field: 'yunshufangshi_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'yunshufangshi_default',
            edit: 'yunshufangshi_edit'
          }
        },
        {
          title: '客户',
          field: 'kehu_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'kehu_default',
            edit: 'kehu_edit'
          }
        },
        {
          title: '日销量(吨)',
          field: 'rixiaoliang_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'rixiaoliang_default',
            edit: 'rixiaoliang_edit'
          }
        },
        {
          title: '月累计(吨)',
          field: 'yueleiji_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'yueleiji_default',
            edit: 'yueleiji_edit'
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
    const clearActive = () => {
      detailVxeGrid.value && detailVxeGrid.value.clearEdit();
    };
   

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
      validate,
      clearActive,
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
