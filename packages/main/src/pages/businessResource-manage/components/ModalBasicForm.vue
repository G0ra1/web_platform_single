<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        权限配置
      </template>
      <!-- 这里使用步骤 -->
      <n-spin :show="loading">
        <n-form ref="formRef" :model="formData" label-width="auto" label-align="left" label-placement="left"
          style="width: 600px;padding:50px 0;margin: 0 auto" :rules="rules">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="业务台账" path="pageName">
              <n-input placeholder="选择业务台账" v-model:value="formData.pageName" />
              <nw-pick-page @update:value="(d: string, o: any) => updateForm(d, o)"
                @update:pageCode="(d: string) => formData.pageCode = d"
                @update:pageName="(d: string) => formData.pageName = d"></nw-pick-page>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="所属应用" path="appCode">
              <n-input disabled style="width: 50%" placeholder="输入App名称" v-model:value="formData.appName" />
              <n-input disabled style="width: 50%" placeholder="输入App编码" v-model:value="formData.appCode" />
              <!-- {{formData.appName}} ({{formData.appCode}}) -->
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="选择角色" path="roleName">
              <n-input placeholder="选择角色" v-model:value="formData.roleName" />
              <pick-role @update:value="(d: string, o: any) => updateRole(d, o)"></pick-role>
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="表达式" path="conditionalExpression">
              <!-- <n-input type="textarea" placeholder="表达式" v-model:value="formData.conditionalExpression" /> -->
              <calc v-model:value="formData.targetList" ref="refCalc" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label=" ">

            </n-form-item-gi>
          </n-grid>
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
import { add, edit, detail, getInterfacesDetailByMthPath } from '../api'
import {
  NwIcon,
  NwSchemaEditor,
  RequestPaging,
  VxeHelper,
  NwCodeMirror,
  NwPickPage
} from '@platform/main'
import PickRole from './PickRole/index.vue'

import type {
  FormModel
} from '../model.d'

import Calc from './calc/index.vue'

import { getParamList } from '../store'



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
    NwCodeMirror,
    NwPickPage,
    PickRole,
    Calc
  },
  setup(props, context) {
    const loading = ref<boolean>(false)
    const formRef = ref<FormInst>()
    const iframeActive = ref<boolean>(false)
    const iframeUrl = ref<string>('')
    const iframeRef = ref<HTMLIFrameElement>()
    const action = ref<'create' | 'edit'>('create')
    const active = ref<boolean>(false)
    const basicFormData: FormModel = {

    }
    const refCalc = ref()
    // const pageUrl = computed(() => {
    //   return `/htmlx/${formData.value.appCode}/${formData.value.pageCode}`
    // })
    const formData = ref<FormModel>({})
    // 展现
    const show = (row?: any, appInfo?: any) => {
      active.value = true
      if (row) {
        // 编辑
        action.value = 'edit'
        formData.value = row
        detail(row.id).then(r => {
          formData.value = r
          getInterfaces(r.formListMethodType, r.formListUrl)
        })
      } else {
        // 新建
        console.log(appInfo, 'appInfo')
        action.value = 'create'
        formData.value = cloneDeep(basicFormData)
        formData.value.appCode = appInfo.appCode
        formData.value.appName = appInfo.appName
        formData.value.appId = appInfo.appId
      }
    }
    const cancel = () => {
      active.value = false
    }
    const getInterfaces = (formListMethodType: string, formListUrl: string) => {
      getInterfacesDetailByMthPath(formListMethodType, formListUrl).then(res => {
        console.log(JSON.parse(res.content), 'JSON.parse(res.content)')
        getParamList(res.content)
      })
    }
    const updateForm = (d: string, o: any) => {
      formData.value.formListUrl = o.formListUrl
      formData.value.formListMethodType = o.formListMethodType
      formData.value.pageId = o.id
      getInterfaces(o.formListMethodType, o.formListUrl)

    }
    const updateRole = (d: string, o: any) => {
      formData.value.roleName = o.roleName
      formData.value.roleCode = o.roleCode
      formData.value.roleId = o.id
    }
    const submit = async () => {
      console.log(refCalc.value.getExpData(), 'refCalc.value.getExpData()')
      formData.value.targetList = refCalc.value.getExpData()
      formData.value.conditionalExpression = formData.value.targetList?.map((d: any) => {
        return d.type == 'string' ? `"${d.code}"` : d.code
      }).join(' ')
      formRef.value!.validate().then((...r: any) => {
        loading.value = true
        if (action.value === 'create') {
          console.log('====formData======', formData.value)
          // formData.value.pageUrl
          add(formData.value).then(r => {
            console.log('====r====', r)
            active.value = false
            context.emit('callback')
          }).finally(() => {
            loading.value = false
          })
        } else if (action.value === 'edit') {
          edit(formData.value).then(r => {
            console.log('====r====', r)
            active.value = false
            context.emit('callback')
          }).finally(() => {
            loading.value = false
          })
        }
      })

    }

    return {
      loading,
      formRef,
      refCalc,
      getInterfaces,
      rules: {
        pageName: {
          required: true,
          message: '请选择业务台账',
          trigger: ['input', 'blur']
        },
      },
      show,
      submit,
      cancel,
      active,
      formData,
      iframeActive,
      iframeUrl,
      iframeRef,
      updateForm,
      updateRole
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
