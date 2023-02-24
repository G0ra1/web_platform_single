<template>
  <n-form :model="dataModel" 
    :rules="rules" ref="formRef" 
    label-placement="left" :label-width="160" size="small" 
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
      <n-form-item-gi :span="12" label="开井数(口)" path="kaijingshu" class="LFormTable">
        <n-input-number style="width:100%" placeholder="请输入开井数" v-model:value="dataModel.kaijingshu"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="卸东来库(车)" path="xiedonglai" class="LFormTable">
        <n-input-number style="width:100%" placeholder="请输入卸东来库" v-model:value="dataModel.xiedonglai"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="综合含水(%)" path="zonghehanshui" class="LFormTable">
        <n-input-number style="width:100%" placeholder="请输入综合含水" v-model:value="dataModel.zonghehanshui"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="日产量(吨)" path="richanliang" class="LFormTable">
        <n-input-number style="width:100%" placeholder="请输入日产量" v-model:value="dataModel.richanliang"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="含盐量(mg/L)" path="hanyanliang" class="LFormTable">
        <n-input-number placeholder="请输入含盐量" style="width:100%"  v-model:value="dataModel.hanyanliang"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="beizhu" class="LFormTable">
        <n-input placeholder="请输入备注" v-model:value="dataModel.beizhu"></n-input>
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
      dictItemLists,
      validate,

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
