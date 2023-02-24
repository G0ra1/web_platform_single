<template>
      <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" 
        :label-width="160" size="small" 
        class="LForm" 
      >
        <n-grid :cols="24" :x-gap="24" class="LFormNg">
          <n-form-item-gi :span="24" label="" path="">
              <h5 class="card-title">基本信息</h5>
          </n-form-item-gi>
          <n-form-item-gi span="12" label="填报日期" path="tianbaoshijian">
            <n-date-picker style='width:100%' v-model:formatted-value="dataModel.tianbaoshijian" value-format="yyyy-MM-dd" type="date" />
          </n-form-item-gi>
          
          <n-form-item-gi span="12" label="填报人" path="tianbaoren">
            <n-input placeholder="填报人" disabled v-model:value="dataModel.tianbaoren" />
          </n-form-item-gi>

          <n-form-item-gi span="24" label="备注" path="beizhu">
            <n-input placeholder="备注"   type="textarea" v-model:value="dataModel.beizhu" />
          </n-form-item-gi>
         
          <n-form-item-gi :span="24" label="" path="code">
              <h5 class="card-title">交接信息</h5>
          </n-form-item-gi>
           
          <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
              <vxe-grid ref="changjiListGrid"  v-bind="changjiListOption" style="
                  moz-user-select: -moz-none;
                  -moz-user-select: none;
                  -o-user-select:none;
                  -khtml-user-select:none;
                  -webkit-user-select:none;
                  -ms-user-select:none;
                  user-select:none;
                  width: 100%;
              ">
                <template #jiaojiedian_name_default="{ row, column }">
                  <span>{{row.jiaojiedian_name}}</span>
                </template>
                <template #jiaojiedian_name_edit="{ row, column }">
                  
                    <nw-dic
                      :request="{XHR:dictItemLists, params: 'smm_cjJointPointName',}"
                      v-model:value="row.jiaojiedian_code"
                      v-model:label="row.jiaojiedian_name"
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
                <template #banci_name_default="{ row, column }">
                  <span>{{row.banci_name}}</span>
                </template>
                <template #banci_name_edit="{ row, column }">
                  
                    <nw-dic
                      :request="{XHR:dictItemLists, params: 'smm_classesName',}"
                      v-model:value="row.banci_code"
                      v-model:label="row.banci_name"
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
                <template #guanshuliang_default="{ row, column }">
                  <span>{{row.guanshuliang}}</span>
                </template>
                <template #guanshuliang_edit="{ row, column }">
                  <n-input-number placeholder=""  v-model:value="row.guanshuliang"></n-input-number>
                </template>
                <template #hanshuilv_default="{ row, column }">
                  <span>{{row.hanshuilv}}</span>
                </template>
                <template #hanshuilv_edit="{ row, column }">
                  <n-input placeholder="" v-model:value="row.hanshuilv"></n-input>
                </template>
                
              
              </vxe-grid>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="" path="" class="LFormTable">
              <vxe-grid ref="waixiaoListGrid"  v-bind="waixiaoListOption" style="
                  moz-user-select: -moz-none;
                  -moz-user-select: none;
                  -o-user-select:none;
                  -khtml-user-select:none;
                  -webkit-user-select:none;
                  -ms-user-select:none;
                  user-select:none;
                  width: 100%;
              ">
                 <template #jiaojiedian_name_default="{ row, column }">
                  <span>{{row.jiaojiedian_name}}</span>
                </template>
                <template #jiaojiedian_name_edit="{ row, column }">
                  
                    <nw-dic
                      :request="{XHR:dictItemLists, params: 'smm_wxJointPointName',}"
                      v-model:value="row.jiaojiedian_code"
                      v-model:label="row.jiaojiedian_name"
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
                <template #banci_name_default="{ row, column }">
                  <span>{{row.banci_name}}</span>
                </template>
                <template #banci_name_edit="{ row, column }">
                  
                    <nw-dic
                      :request="{XHR:dictItemLists, params: 'smm_classesName',}"
                      v-model:value="row.banci_code"
                      v-model:label="row.banci_name"
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
                <template #guanshuliang_default="{ row, column }">
                  <span>{{row.guanshuliang}}</span>
                </template>
                <template #guanshuliang_edit="{ row, column }">
                  <n-input-number placeholder=""  v-model:value="row.guanshuliang"></n-input-number>
                </template>
                <template #hanshuilv_default="{ row, column }">
                  <span>{{row.hanshuilv}}</span>
                </template>
                <template #hanshuilv_edit="{ row, column }">
                  <n-input placeholder="" v-model:value="row.hanshuilv"></n-input>
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
import { dictItemLists,  } from "../../api/index.js"
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
} from 'naive-ui'
import { request,NwIcon, NwDic } from '@platform/main'
import { FormModal } from './store'


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
      setRules
    } = new FormModal()
     const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0
      let count: number = 0
      list.forEach((item: any) => {
       
        if (item[field]) {
          count += Number(item[field])
        }
      })
      return count
    }
    const waixiaoListGrid: Ref<VxeGridInstance | null> = ref(null)
    const changjiListGrid: Ref<VxeGridInstance | null> = ref(null)
    
    const changjiListOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.changjiList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3 >
                厂际交接
                <NwIcon style="margin-left:10px;font-size:19px;color:#C91019"  name="icon-n-y-circleadd" size="24" onClick={function () {
                  if (!dataModel.value.changjiList) {
                    dataModel.value.changjiList = []
                  }
                  dataModel.value.changjiList.push({
                    id: `${new Date().getTime()}`
                  })
                  $grid.reloadData(dataModel.value.changjiList)
                }} />
              </h3>
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
          title: '厂际交接点',
          field: 'jiaojiedian_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'jiaojiedian_name_default', edit: 'jiaojiedian_name_edit' }
        },
       
        {
          title: '班次',
          field: 'banci_name',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "banci_name_default",
            edit: "banci_name_edit",
          }
        },
         {
          title: '管输量',
          field: 'guanshuliang',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "guanshuliang_default",
            edit: "guanshuliang_edit",
          }
        },
         {
          title: '含水率',
          field: 'hanshuilv',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "hanshuilv_default",
            edit: "hanshuilv_edit",
          }
        },
        {
          title: '操作',
          width: 150,
          fixed: 'right',
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                   <NButton
                    size="small"
                    quaternary 
                    type="primary"
                    onClick={function () {
                      dataModel.value.changjiList.push({
                        id: `${new Date().getTime()}`
                      })
                      $table.reloadData(dataModel.value.changjiList)
                    }}
                  >{{
                    default: () => '添加'
                  }}</NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style='margin-left:5px'
                    onClick={function () {
                      dataModel.value.changjiList!.splice(rowIndex, 1)
                      $table.reloadData(dataModel.value.changjiList)
                    }}
                  >{{
                    default: () => '删除'
                  }}</NButton>
                </div>
              ]
            }
          }
        }
      ],
    
    })
    const waixiaoListOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.waixiaoList,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <h3 >
                外销交接
                <NwIcon style="margin-left:10px;font-size:19px;color:#C91019"  name="icon-n-y-circleadd" size="24" onClick={function () {
                  if (!dataModel.value.waixiaoList) {
                    dataModel.value.waixiaoList = []
                  }
                  dataModel.value.waixiaoList.push({
                    id: `${new Date().getTime()}`
                  })
                  $grid.reloadData(dataModel.value.waixiaoList)
                }} />
              </h3>
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
          title: '外销交接点',
          field: 'jiaojiedian_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'jiaojiedian_name_default', edit: 'jiaojiedian_name_edit' }
        },
       
        {
          title: '班次',
          field: 'banci_name',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "banci_name_default",
            edit: "banci_name_edit",
          }
        },
         {
          title: '管输量',
          field: 'guanshuliang',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "guanshuliang_default",
            edit: "guanshuliang_edit",
          }
        },
         {
          title: '含水率',
          field: 'hanshuilv',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "hanshuilv_default",
            edit: "hanshuilv_edit",
          }
        },
        {
          title: '操作',
          width: 150,
          fixed: 'right',
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <div>
                   <NButton
                    size="small"
                    quaternary 
                    type="primary"
                    onClick={function () {
                      dataModel.value.waixiaoList.push({
                        id: `${new Date().getTime()}`
                      })
                      $table.reloadData(dataModel.value.waixiaoList)
                    }}
                  >{{
                    default: () => '添加'
                  }}</NButton>
                  <NButton
                    size="small"
                    quaternary
                    type="error"
                    style='margin-left:5px'
                    onClick={function () {
                      dataModel.value.waixiaoList!.splice(rowIndex, 1)
                      $table.reloadData(dataModel.value.waixiaoList)
                    }}
                  >{{
                    default: () => '删除'
                  }}</NButton>
                </div>
              ]
            }
          }
        }
      ],
    })
 
    
    
    watch(() => dataModel.value.waixiaoList, (d: any) => {
      if (waixiaoListGrid.value) {
        waixiaoListGrid.value.loadData(d)
      }


    })
    watch(() => dataModel.value.changjiList, (d: any) => {
      if (changjiListGrid.value) {
        changjiListGrid.value.loadData(d)
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

   
   
    return {
      formRef,
      dataModel,
      rules,
      brules,
      validate,
      sumNum,
      dictItemLists,
      
      waixiaoListOption,
      changjiListOption,
      
      changjiListGrid,
      waixiaoListGrid,
     
    }
  }
})

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
