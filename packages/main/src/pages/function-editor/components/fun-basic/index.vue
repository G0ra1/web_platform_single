<template>

<n-form
    :model="basic"
    ref="formRef"
    label-placement="top"
    :label-width="60"
    size="small"
    style="padding: 5px 10px"
>
    <n-grid :cols="24" :x-gap="24" >
      <n-form-item-gi :span="12" label="功能全称" path="fullName">
        <n-input 
          placeholder=""
          v-model:value="basic.fullName"

        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="功能简称" path="shortName">
        <n-input 
          placeholder=""
          v-model:value="basic.shortName"

        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="功能编码" path="code">
         <n-input 
          placeholder=""
          v-model:value="basic.code"

        />
      </n-form-item-gi> 
      <n-form-item-gi :span="12" label="所属应用" path="code">
        {{basic.appName}} ({{basic.appCode}})
      </n-form-item-gi> 
      <!-- <n-form-item-gi :span="12" label="功能类型" path="icon">
        
      </n-form-item-gi> -->

      <n-form-item-gi :span="12" label="图标" path="icon">
        <nw-icon-pick v-model:value="basic.icon" />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="展示方式" path="icon">
        <n-radio-group v-model:value="basic.viewMode" name="radiogroup">
          <n-radio value="drawer">
            抽屉
          </n-radio>
          <n-radio value="modal">
            模态
          </n-radio>
        </n-radio-group>
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="宽度" path="icon">
        <n-input 
          placeholder=""
          v-model:value="basic.width"

        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="高度 (只有在浮动框或对话框模式下起作用)" path="icon">
        <n-input 
          placeholder=""
          v-model:value="basic.height"

        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="remarks">
        <n-input
          type="textarea"
          placeholder=""
          v-model:value="basic.remarks"
        />
      </n-form-item-gi>
    </n-grid>
</n-form>
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

import { basic } from '../../store/index'

import { NwIconPick } from '@platform/main'

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
    NwIconPick
  },
  setup() {
    return {
      basic
    }
  },
})
</script>

<style lang="less" scoped>
</style>
