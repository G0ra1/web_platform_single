<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        接口配置
      </template>
      <!-- 这里使用步骤 -->
      <n-form ref="formRef" label-width="auto" label-align="left" label-placement="left" style="width: 600px;padding:50px 0;margin: 0 auto">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" label="新增接口" path="inputValue">
            <!-- <n-input placeholder="输入Url" style="margin-right: 5px;" /> -->
            <n-input-group>
              <n-input placeholder="输入编码" v-model:value="formData.formSaveUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.formSaveMethodType}}</n-input-group-label>
            </n-input-group>
            <NwOpenapiPick @callback="addCallback" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="删除接口" path="inputValue">
            <n-input-group>
              <n-input placeholder="输入编码" v-model:value="formData.formDeleteUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.formDeleteMethodType}}</n-input-group-label>
            </n-input-group>
            <n-button style="visibility: hidden;margin-left: 5px;" @click="active = false">
              选择
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="编辑接口" path="inputValue">
            <n-input-group>
              <n-input placeholder="输入编码" v-model:value="formData.formUpdateUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.formUpdateMethodType}}</n-input-group-label>
            </n-input-group>
            <n-button style="visibility: hidden;margin-left: 5px;" @click="active = false">
              选择
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="查询接口" path="inputValue">
            <n-input-group>
              <n-input placeholder="输入编码" v-model:value="formData.formGetUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.formGetMethodType}}</n-input-group-label>
            </n-input-group>
            <n-button style="visibility: hidden;margin-left: 5px;" @click="active = false">
              选择
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="流程查询接口" path="inputValue">
            <n-input-group>
              <n-input placeholder="输入编码" v-model:value="formData.procViewUrl" />
              <n-input-group-label style="width: 70px;text-align: center">{{formData.procViewMethodType}}</n-input-group-label>
            </n-input-group>
            <n-button style="visibility: hidden;margin-left: 5px;" @click="active = false">
              选择
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="开启数据转换" path="inputValue">
            <n-switch
              :checked-value="1"
              :unchecked-value="0"
              v-model:value="formData.isTransform"
            >
              <template #checked>
                开启
              </template>
              <template #unchecked>
                关闭
              </template>
            </n-switch>
          </n-form-item-gi>
        </n-grid>
        <NwCodeMirror
          :disabled="false"
          :value="formData.interfaceJsonSchema"
          @update:value="d => formData.interfaceJsonSchema = d"
        />
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
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
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
import { query } from '../api'
import {
  NwIcon,
  NwSchemaEditor,
  NwOpenapiPick,
  NwCodeMirror,
  RequestPaging,
  VxeHelper
} from '@platform/main'
import { add, edit, detail } from '../api'

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
    NwOpenapiPick,
    NwCodeMirror
  },
  emits: [ 'callback' ],
  setup(props, context) {
    const action = ref<'create' | 'edit'>('create')
    const active = ref<boolean>(false)
    const x = ref<string>('')
    const basicFormData:FormModel = {
      pageName: '',
      pageCode: '',
      pageType: '',
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
    const show = (id: string) => {
      active.value = true
      formData.value = {}
      detail(id).then(r => {
        formData.value = r
      })
      // if (id) {
      //   // 编辑
      //   action.value = 'edit'
        
      // } else {
      //   // 新建
      //   action.value = 'create'
      //   formData.value = cloneDeep(basicFormData)
      // }
    }
    const cancel = () => {
      active.value = false
    }
    const submit = () => {
      edit(formData.value).then(r => {
        console.log('====r====', r)
        active.value = false
      }).finally(() => {
        context.emit('callback')
      })
    }

    return {
      x,
      show,
      submit,
      cancel,
      active,
      formData,
      addCallback (obj: any, schema: any) {
        // 接口配置
        formData.value.formSaveUrl = obj.mthPath
        formData.value.formSaveMethodType = obj.mthMethod

        formData.value.formDeleteUrl = `${obj.mthPath}/{id}`
        formData.value.formDeleteMethodType = 'DELETE'

        formData.value.formUpdateUrl = obj.mthPath
        formData.value.formUpdateMethodType = 'PUT'

        formData.value.formGetUrl = `${obj.mthPath}/{id}`
        formData.value.formGetMethodType = 'GET'

        formData.value.procViewUrl = `${obj.mthPath}/proc/view/{procinsId}`
        formData.value.procViewMethodType = 'GET'

        // schema
        const properties: any = (Object.values(schema.resolved.paths)[0] as any )
        .post
        .requestBody
        .content['application/json']
        .schema
        .properties

        formData.value.interfaceJsonSchema =  JSON.stringify(properties, null, 4)
        console.log('==properties==', JSON.stringify(properties))
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
