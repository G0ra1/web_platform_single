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
        日报详情
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <div style="height:700px">
      <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" 
        :label-width="160" size="small" 
        class="LForm" 
      >
        <n-grid :cols="24" :x-gap="24" class="LFormNg">
          <n-form-item-gi :span="24" label="" path="">
              <h5 class="card-title">基本信息</h5>
          </n-form-item-gi>
          <n-form-item-gi span="12" label="填报日期" path="fillTime">
            <n-date-picker style='width:100%' disabled v-model:formatted-value="dataModel.fillTime" value-format="yyyy-MM-dd" type="date" />
          </n-form-item-gi>
          
          <n-form-item-gi span="12" label="填报人" path="createUserName">
            <n-input placeholder="填报人" disabled v-model:value="dataModel.createUserName" />
          </n-form-item-gi>

          <n-form-item-gi span="24" label="备注" path="explanation">
            <n-input placeholder="备注" disabled  type="textarea" v-model:value="dataModel.explanation" />
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
                  <span>{{row.cjJointPointName}}</span>
                </template>
                <template #banci_name_default="{ row, column }">
                  <span>{{row.classesName}}</span>
                </template>
               
                <template #guanshuliang_default="{ row, column }">
                  <span>{{row.cjPipelineRun}}</span>
                </template>
               
                <template #hanshuilv_default="{ row, column }">
                  <span>{{row.cjWaterContent}}</span>
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
                      <span>{{row.wxJointPointName}}</span>
                    </template>
                   
                    <template #banci_name_default="{ row, column }">
                      <span>{{row.classesName}}</span>
                    </template>
                    
                    <template #guanshuliang_default="{ row, column }">
                      <span>{{row.wxPipelineRun}}</span>
                    </template>
                    
                    <template #hanshuilv_default="{ row, column }">
                      <span>{{row.wxWaterContent}}</span>
                    </template>
                   
                </vxe-grid>
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
    const sonFn = (row) =>{
        visible.value = true
        detailForm(row.camundaProcinsId).then((r)=>{
            dataModel.value = {...r}
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
    const changjiListOption = ref({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmMoistureContentCjList,
      showFooter: true,
      toolbarConfig: null,
      columns: [
        {
          title: '厂际交接点',
          field: 'cjJointPointName',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'jiaojiedian_name_default', 
           }
        },
       
        {
          title: '班次',
          field: 'classesName',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "banci_name_default",
          }
        },
         {
          title: '管输量(t)',
          field: 'cjPipelineRun',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "guanshuliang_default",
          }
        },
         {
          title: '含水率(%)',
          field: 'cjWaterContent',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "hanshuilv_default",
          }
        },
        
      ],
    
    })
    const waixiaoListOption = ref({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmMoistureContentWxList,
      toolbarConfig: null,
     
      columns: [
        {
          title: '外销交接点',
          field: 'wxJointPointName',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'jiaojiedian_name_default', 
           }
        },
       
        {
          title: '班次',
          field: 'classesName',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "banci_name_default",
          }
        },
         {
          title: '管输量(t)',
          field: 'wxPipelineRun',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "guanshuliang_default",
          }
        },
         {
          title: '含水率(%)',
          field: 'wxWaterContent',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "hanshuilv_default",
          }
        },
        
      ],
    })
 
    const waixiaoListGrid = ref()
    const changjiListGrid = ref()
    watch(() => dataModel.value.smmMoistureContentWxList, (d) => {
      if (waixiaoListGrid.value) {
        waixiaoListGrid.value.loadData(d)
      }


    })
    watch(() => dataModel.value.smmMoistureContentCjList, (d) => {
      if (changjiListGrid.value) {
        changjiListGrid.value.loadData(d)
      }
    })
    return {
        visible,
        dataModel,
        sonFn,
        waixiaoListOption,
        changjiListOption,
        waixiaoListGrid,
        changjiListGrid,
       
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