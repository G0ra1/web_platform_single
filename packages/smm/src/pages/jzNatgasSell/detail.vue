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
        <n-form :model="dataModel" 
            ref="formRef" 
            label-placement="left" :label-width="160" size="small" 
            class="LForm"
        >
          <n-grid :cols="24" :x-gap="24" class="LFormNg">
            <n-form-item-gi :span="24" label="" path="">
                <h5 class="card-title">基本信息</h5>
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="填报日期" path="fillTime" class="LFormTable">
                <n-date-picker style="width:100%" disabled v-model:formatted-value="dataModel.fillTime" value-format="yyyy-MM-dd" type="date" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="填报厂别" path="createUserParentDeptName" class="LFormTable">
                <n-input placeholder="填报厂别" disabled v-model:value="dataModel.createUserParentDeptName" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="填报人" path="createUserName" class="LFormTable">
                <n-input placeholder="填报人" disabled v-model:value="dataModel.createUserName" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="" path="code">
                <h5 class="card-title">河北销售管输气</h5>
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
                    <span>{{row.sourceName}}</span>
                </template>
             
                <template #yunxiaoliang_default="{ row, column }">
                    <span>{{row.sourceNatgasNumber}}</span>
                </template>
              
                <template #beizhu_default="{ row, column }">
                    <span>{{row.explanation}}</span>
                </template>
               
                </vxe-grid>
            </n-form-item-gi>
          
            <n-form-item-gi :span="24" label="" path="code">
                <h5 class="card-title">华北油田冀中自产气</h5>
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
                <template #changzhan_default="{ row, column }">
                    <span>{{row.depotName}}</span>
                </template>
               
                <template #tianranqileixing_default="{ row, column }">
                    <span>{{row.natgasTypeName}}</span>
                </template>
                

                <template #yonghu_default="{ row, column }">
                    <span>{{row.clientName}}</span>
                </template>
                

                <template #yunxiaoliang_default="{ row, column }">
                    <span>{{row.natgasNumber}}</span>
                </template>
              


                <template #beizhu_default="{ row, column }">
                    <span>{{row.explanation}}</span>
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
    const detailListGridOption = ref({
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
      toolbarConfig: null,
      columns: [
        {
          title: '场站',
          field: 'depotName',
          showOverflow: 'title',
          minWidth: 200,
          slots: {
            default: 'changzhan_default',
            edit: 'changzhan_edit'
          }
        },
        {
          title: '天然气类型',
          field: 'natgasTypeName',
          showOverflow: 'title',
          minWidth: 200,
          slots: {
            default: 'tianranqileixing_default',
            edit: 'tianranqileixing_edit'
          }
        },
        {
          title: '用户',
          field: 'clientName',
          showOverflow: 'title',
          minWidth: 200,
          slots: {
            default: 'yonghu_default',
            edit: 'yonghu_edit'
          }
        },
        {
          title: '运销量',
          field: 'natgasNumber',
          minWidth: 190,
          slots: {
            default: 'yunxiaoliang_default',
            edit: 'yunxiaoliang_edit'
          }
        },
        {
          title: '备注',
          field: 'explanation',
          minWidth: 150,
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          }
        },
        
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "natgasNumber") {
              sums.push(Number(sumNum(data, "natgasNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    })
    const sourceListGridOption = ref({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.sourceList,
      showFooter: true,
      toolbarConfig:null,
      
      columns: [
        {
          title: '来源',
          field: 'sourceName',
          showOverflow: 'title',
          minWidth: 200,
          slots: { default: 'laiyuan_default', edit: 'laiyuan_edit' }
        },
        {
          title: '运销量',
          field: 'sourceNatgasNumber',
          minWidth: 190,
          slots: {
            default: 'yunxiaoliang_default', edit: 'yunxiaoliang_edit'
          }
        },
        {
          title: '备注',
          field: 'explanation',
          minWidth: 150,
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
          }
        },
       
      ],
      footerMethod({ columns, data }) {
        const sums = []
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push('合计')
          } else {
            if (column.field === 'sourceNatgasNumber') {
              sums.push(Number(sumNum(data, 'sourceNatgasNumber')))
              // dataModel.value.sourceList
            } else {
              sums.push('-')
            }
          }
        })
        // 返回一个二维数组的表尾合计
        return [sums]
      }
    })
    const detailVxeGrid = ref()
    const sourceVxeGrid = ref()
    watch(() => dataModel.value.detailList, (d) => {
      if (detailVxeGrid.value) {
        detailVxeGrid.value.loadData(d)
      }


    })
    watch(() => dataModel.value.sourceList, (d) => {
      if (sourceVxeGrid.value) {
        sourceVxeGrid.value.loadData(d)
      }
    })
    return {
        visible,
        dataModel,
        sonFn,
        detailVxeGrid,
        sourceVxeGrid,
        detailListGridOption,
        sourceListGridOption
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