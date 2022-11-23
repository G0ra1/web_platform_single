<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="160"
    size="small"
    :style="{
        padding: '45px'
    }"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="系统编码" path="sysCode">
        <n-input placeholder="Input" v-model:value="dataModel.sysCode" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="系统名称" path="sysName">
        <n-input placeholder="Input" v-model:value="dataModel.sysName" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="系统图标" path="sysIcon">
        <n-input placeholder="Input" v-model:value="dataModel.sysIcon" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="状态" path="status">
        <n-switch :checked-value="1" :unchecked-value="0"  placeholder="Input" v-model:value="dataModel.status" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="排序" path="sort">
        <n-input-number placeholder="Input" v-model:value="dataModel.sort" />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NSwitch
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'
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
    NSwitch
  },
  setup () {
    const {
      formRef,
      dataModel,
      rules,
      setValue,
      getValue,
      validate,
      setRules
    } = new FormModal()
    setRules({
      sumBudgetExecuteAmount: {
        powerCode: 'required',
        nameCh: '测试',
        dbType: 'string'
      }
    })
    return {
      formRef,
      dataModel,
      rules,
      validate
    }
  }
})

</script>

<style scoped>
</style>
