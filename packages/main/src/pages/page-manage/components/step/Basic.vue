<template>
  <n-form
      ref="formRef"
      label-width="auto"
      label-align="left"
      label-placement="left"
      style="width: 600px;padding:50px 0;margin: 0 auto"
    >
      <n-grid :cols="24" :x-gap="24">
        <!-- <n-form-item-gi :span="12" label="页面类型" path="inputValue">
          <div class="nw-tile-group">
            <div class="nw-tile active">
              <div class="nw-tile-icon">
                <nw-icon name="icon-y-formpage" :size="25" />
              </div>
              <div class="nw-tile-text">
                表单
              </div>
            </div>
            <div class="nw-tile">
              <div class="nw-tile-icon">
                <nw-icon name="icon-y-formpage" :size="25" />
              </div>
              <div class="nw-tile-text">
                一般页面
              </div>
            </div>
          </div>
        </n-form-item-gi> -->
        <n-form-item-gi :span="12" label="名称" path="inputValue" >
          <n-input placeholder="输入名称" v-model:value="formData.pageName" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="所属App" path="inputValue" >
          <n-input style="width: 50%" placeholder="输入App名称" v-model:value="formData.appName" />
          <n-input style="width: 50%" placeholder="输入App编码" v-model:value="formData.appCode" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="是否启用" path="inputValue" >
          <n-switch
            v-model:value="formData.isEnable"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="访问Url" path="inputValue">
          <n-input-group>
            <n-input-group-label>/htmlx/{{formData.appCode}}/</n-input-group-label>
            <n-input placeholder="输入编码" v-model:value="formData.pageCode" />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="目标页面Url" path="inputValue">
          <n-input placeholder="输入Url" v-model:value="formData.targetUrl" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="备注" path="inputValue">
          <n-input
            type="textarea"
            placeholder="输入备注"
            v-model:value="formData.remark"
          />
        </n-form-item-gi>
      </n-grid>
      <!-- NwSchemaEditor -->
      <n-divider title-placement="left">
        参数配置
      </n-divider>
      <nw-schema-editor v-model:value="formData.jsonSchema" />
    </n-form>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import type { Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NLayout,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NSelect,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NDivider,
  NSwitch
} from 'naive-ui'
import {
  NwIcon,
  NwSchemaEditor,
  RequestPaging,
  VxeHelper
} from '@platform/main'

import type {
  FormModel
} from '../../model.d'
export default defineComponent({
  components: {
    NLayout,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NSelect,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NDivider,
    NSwitch,
    NwSchemaEditor
  },
  setup() {
    
    const formData = ref<FormModel>({})
    return {
      formData
    }
  }
})

</script>

<style lang="less" scoped>
.nw-tile {
  &-group {
    display: flex;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  width: 80px;
  cursor: pointer;
  padding: 5px;
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px
  }
  &-text {
    font-size: 12px;
    text-align: center;
  }
  &.active {
    border: 2px solid #238551;
  }
}
</style>
