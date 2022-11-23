<template>
  <div>
    <n-form
      :model="content"
      ref="formRef"
      label-placement="top"
      :label-width="60"
      size="small"
      style="padding: 5px 10px"
    >
    <n-grid :cols="24" :x-gap="24" >
      <n-form-item-gi :span="12" label="内容类型" path="fullName">
          <n-radio-group v-model:value="content.type" name="radiogroup">
              <n-radio value="form">
                表单
              </n-radio>
              <n-radio value="dialog">
                文字
              </n-radio>
          </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi v-if="content.type === 'form'" :span="12" label="表单" path="fullName">
        <nw-pick-form
          v-model:value="content.formId"
          :formNameCh="content.formNameCh"
          @update:pageUrl="d => content.formUrl = d"
          @update:pageCode="d => content.formName = d"
          @update:pageName="d => content.formNameCh = d"
        />
        
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Url" path="fullName">
        <n-input 
          placeholder=""
          v-model:value="content.formUrl"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import {

  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NTabs,
  NTabPane,
  NSteps,
  NStep,
  NGrid,
  NTree,
  NButton,
  NConfigProvider,
  NModal,
  NForm,
  NFormItem,
  NFormItemGi,
  NInput,
  NSelect,
  NTreeSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
  NDivider
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { content } from '../../store/index'

import { NwIconPick, NwPickForm } from '@platform/main'

export default defineComponent({
  name: "Basic",
  components: {
      
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NTabs,
    NTabPane,
    NSteps,
    NStep,
    NGrid,
    NTree,
    NButton,
    NConfigProvider,
    NModal,
    NForm,
    NFormItem,
    NFormItemGi,
    NInput,
    NSelect,
    NTreeSelect,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NSpin,
    NDivider,
    NwIconPick,
    NwPickForm
  },
  setup() {
    return {
      content
    }
  },
})
</script>

<style lang="less" scoped>
</style>
