<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        新建表单
      </template>
      <!-- 这里使用步骤 -->
      <n-spin :show="loading">
        <n-form
          ref="formRef"
          :model="formData"
          label-width="auto"
          label-align="left"
          label-placement="left"
          style="width: 600px;padding:50px 0;margin: 0 auto"
          :rules="rules"
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
            <n-form-item-gi :span="12" label="名称" path="pageName" >
              <n-input placeholder="输入名称" v-model:value="formData.pageName" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="所属应用" path="appCode" >
              <n-input disabled style="width: 50%" placeholder="输入App名称" v-model:value="formData.appName" />
              <n-input disabled style="width: 50%" placeholder="输入App编码" v-model:value="formData.appCode" />
              <!-- {{formData.appName}} ({{formData.appCode}}) -->
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="是否启用" >
              <!-- <n-switch
                :value="!!formData.isEnable"
                @update:value="(d: boolean) => formData.isEnable = isEnable(d)"
              /> -->
              <n-switch
              :checked-value="1"
              :unchecked-value="0"
              v-model:value="formData.isEnable" />
        
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="访问Url" path="pageCode">
              <n-input-group>
                <n-input-group-label>/{{formData.appCode}}/</n-input-group-label>
                <n-input placeholder="输入编码" v-model:value="formData.pageCode" />
              </n-input-group>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="目标页面Url" path="targetUrl">
              <n-input placeholder="输入Url" v-model:value="formData.targetUrl" />
              <n-button :disabled="!formData.targetUrl" @click="preview" type="primary" style="margin-right: 5px;">
                获取字段描述
              </n-button>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="备注" path="remark">
              <n-input
                type="textarea"
                placeholder="输入备注"
                v-model:value="formData.remark"
              />
            </n-form-item-gi>
          </n-grid>
          <!-- NwSchemaEditor -->
          <n-divider title-placement="left">
            字段配置
          </n-divider>
          <NwCodeMirror
            :disabled="false"
            :value="formData.jsonSchema"
            @update:value="(d: string) => formData.jsonSchema = d"
          />
          <!-- <nw-schema-editor v-model:value="formData.jsonSchema" /> -->
        </n-form>
      </n-spin>
      <template #footer>
        <n-button @click="submit()" type="primary" style="margin-right: 5px;">
          提交
        </n-button>
        <n-button @click="active = false">
          取消
        </n-button>
      </template>
      <n-drawer v-model:show="iframeActive" :width="800">
        <n-drawer-content title="预览表单">
          <iframe ref="iframeRef" :src="iframeUrl" style="display: block;width: 100%;height: 100%;border: none" />
          <template #footer>
            <n-button @click="iframeActive = false">
              关闭
            </n-button>
          </template>
        </n-drawer-content>
      </n-drawer>
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
  NSpin,
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
  FormInst
} from 'naive-ui'
import { add, edit, detail } from '../api'
import {
  NwIcon,
  NwSchemaEditor,
  RequestPaging,
  VxeHelper,
  NwCodeMirror
} from '@platform/main'

import type {
  FormModel
} from '../model.d'

export default defineComponent({
  components: {
    NLayout,
    NButton,
    NSpace,
    NSpin,
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
    NwCodeMirror
  },
  setup() {
    const loading = ref<boolean>(false)
    const formRef = ref<FormInst>()
    const iframeActive = ref<boolean>(false)
    const iframeUrl = ref<string>('')
    const iframeRef = ref<HTMLIFrameElement>()
    const action = ref<'create' | 'edit'>('create')
    const active = ref<boolean>(false)
    const basicFormData:FormModel = {
      pageName: '',
      pageCode: '',
      pageType: '1',
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
        formData.value.isTransform = 0
      }
    }
    const cancel = () => {
      active.value = false
    }
    const submit = async () => {
      // console.log('======formData.value=======', formData.value)
      formRef.value!.validate().then((...r: any) => {
        loading.value = true
        formData.value.pageUrl = `/${formData.value.appCode}/${formData.value.pageCode}`
        if (action.value === 'create') {
          console.log('====formData======', formData.value)
          // formData.value.pageUrl
          add(formData.value).then(r => {
            console.log('====r====', r)
            active.value = false
          }).finally(() => {
            loading.value = false
          })
        } else if (action.value === 'edit') {
          edit(formData.value).then(r => {
            console.log('====r====', r)
            active.value = false
          }).finally(() => {
            loading.value = false
          })
        }
      })
      
    }

    return {
      loading,
      formRef,
      rules: {
        pageName: {
          required: true,
          message: '请输入表单名称',
          trigger: ['input', 'blur']
        },
        pageCode: {
          required: true,
          message: '请输入表单编码',
          trigger: ['input', 'blur']
        },
        targetUrl: {
          required: true,
          message: '请输入目标页面Url',
          trigger: ['input', 'blur']
        }
      },
      show,
      submit,
      cancel,
      active,
      formData,
      iframeActive,
      iframeUrl,
      iframeRef,
      preview () {
        iframeActive.value = true
        iframeUrl.value = formData.value.targetUrl!
        nextTick().then(() => {
          iframeRef.value!.onload = () => {
            // 监听
            window.addEventListener('message',(e) => {
              if (e.data.cmd === 'INIT_COMPLETE') {
                iframeRef.value!.contentWindow!.postMessage({
                  cmd: 'GET_SCHEMA'
                }, '*')

              } else if (e.data.cmd === 'GET_SCHEMA') {
                // alert(JSON.stringify(e.data.value))
                formData.value.jsonSchema = JSON.stringify(e.data.value, null, 4)
              }
            })
            
          }
        })
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
