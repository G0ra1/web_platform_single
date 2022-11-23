<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        新建页面
      </template>
      <!-- 这里使用步骤 -->
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
          <n-form-item-gi :span="12" label="所属应用" path="inputValue" >
            <n-input disabled style="width: 50%" placeholder="输入App名称" v-model:value="formData.appName" />
            <n-input disabled style="width: 50%" placeholder="输入App编码" v-model:value="formData.appCode" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="是否启用" path="inputValue" >
            <n-switch
              :value="!!formData.isEnable"
              @update:value="(d: boolean) => formData.isEnable = isEnable(d)"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="访问Url" path="inputValue">
            <n-input-group>
              <n-input-group-label>/{{formData.appCode}}/</n-input-group-label>
              <n-input placeholder="输入编码" v-model:value="formData.pageCode" />
            </n-input-group>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="目标页面Url" path="inputValue">
            <n-input placeholder="输入Url" v-model:value="formData.targetUrl" />
            <n-button @click="preview" type="primary" style="margin-right: 5px;">
              预览
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="数据接口" path="formListUrl">
            <!-- <n-input placeholder="输入Url" style="margin-right: 5px;" /> -->
            <n-input-group>
              <n-input placeholder="输入Url" v-model:value="formData.formListUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.formListMethodType}}</n-input-group-label>
            </n-input-group>
            <NwOpenapiPick @callback="addCallback" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="备注" path="inputValue">
            <n-input
              type="textarea"
              placeholder="输入备注"
              v-model:value="formData.remark"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-button @click="submit()" type="primary" style="margin-right: 5px;">
          提交
        </n-button>
        <n-button @click="active = false">
          取消
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from 'vue'
import type { Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { cloneDeep } from 'lodash'
import {
  NLayout,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NInputGroupLabel,
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
import { add, edit, detail } from '../api'
import {
  NwIcon,
  NwSchemaEditor,
  NwOpenapiPick,
  RequestPaging,
  VxeHelper
} from '@platform/main'

import type {
  FormModel
} from '../model.d'

export default defineComponent({
  components: {
    NLayout,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NInputGroupLabel,
    NSelect,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NDivider,
    NSwitch,
    NwSchemaEditor,
    NwOpenapiPick
  },
  setup() {
    const action = ref<'create' | 'edit'>('create')
    const active = ref<boolean>(false)
    const basicFormData:FormModel = {
      pageName: '',
      pageCode: '',
      pageType: '2',
      targetUrl: '',
      pageUrl: '',
      remark: '',
      isEnable: 0,
      appCode: 'wf',
      appName: '工作流',
      jsonSchema: ''
    }
    // const pageUrl = computed(() => {
    //   return `/htmlx/${formData.value.appCode}/${formData.value.pageCode}`
    // })
    const formData = ref<FormModel>({})
    // 展现
    const show = (id: string, appInfo?: any) => {
      active.value = true
      if (id) {
        // 编辑
        action.value = 'edit'
        detail(id).then(r => {
          formData.value = r
          // formData.value.isEnable = +formData.value.isEnable
        })
      } else {
        // 新建
        action.value = 'create'
        formData.value = cloneDeep(basicFormData)
        formData.value.appCode = appInfo.appCode
        formData.value.appName = appInfo.appName
      }
    }
    const cancel = () => {
      active.value = false
    }
    const submit = () => {
      formData.value.pageUrl = `/${formData.value.appCode}/${formData.value.pageCode}`
      formData.value.isEnable = (+formData.value.isEnable!) as (1 | 0 | undefined)
      if (action.value === 'create') {
        console.log('====formData======', formData.value)
        formData.value.pageUrl
        add(formData.value).then(r => {
          console.log('====r====', r)
          active.value = false
        })
      } else if (action.value === 'edit') {
        edit(formData.value).then(r => {
          console.log('====r====', r)
          active.value = false
        })
      }
    }

    return {
      show,
      submit,
      cancel,
      active,
      formData,
      isEnable (d: boolean) {
        return Number(d) as (0 | 1)
      },
      preview () {
        window.open(
          formData.value.targetUrl,
          '_blank',
          'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
        )
      },
      addCallback (obj: any) {
        formData.value.formListUrl = obj.mthPath
        formData.value.formListMethodType = obj.mthMethod
      }
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
