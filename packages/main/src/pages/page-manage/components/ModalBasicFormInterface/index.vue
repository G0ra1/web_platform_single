<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        数据转换
      </template>
      <n-spin class="nw-spin-full" :show="SpinFlag">
        <n-layout class="nw-layout-full" >
          <n-layout-content>
            <div
              v-show="mode === 'view'"
              ref="GraphRef" style="height: 100%; width: 100%;">
            </div>
            <div
              v-show="mode === 'json'"
            >
              <NwCodeMirror
                :disabled="true"
                :value="formData.interfaceJsonSchema"
              />
            </div>
          </n-layout-content>
        </n-layout>
      </n-spin>
      <template #footer>
        <div style="display: flex;justify-content: space-between;width: 100%">
          <div>
          <n-button @click="mode = (mode === 'view' ? 'json' : 'view')" type="primary" style="margin-right: 5px;">
            连线
          </n-button>
          </div>
          <div>
          <n-button @click="test()" type="primary" style="margin-right: 5px;">
            Test
          </n-button>
          <n-button @click="submit()" type="primary" style="margin-right: 5px;">
            提交
          </n-button>
          <n-button @click="active = false">
            &nbsp;取消&nbsp;
          </n-button>
          </div>
        </div>
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
  NLayoutContent,
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
  NSwitch
} from 'naive-ui'
import {
  NwIcon,
  NwSchemaEditor,
  NwOpenapiPick,
  NwCodeMirror,
  RequestPaging,
  VxeHelper
} from '@platform/main'
import { add, edit, detail } from '../../api'

import type {
  FormModel
} from '../../model.d'

import { Graph, toSchema, generateScript } from './graph'
import type { GraphInstance } from './graph'

export default defineComponent({
  components: {
    NLayout,
    NLayoutContent,
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
    NwOpenapiPick,
    NwCodeMirror
  },
  setup() {
    let graph: GraphInstance;
    const SpinFlag = ref<boolean>(false)
    const GraphRef = ref<Element>()

    const mode = ref<'view' | 'json'>('view')
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
    //
    const interfaceJsonSchema = ref<object>({})
    // 展现
    const show = async (id: string) => {
      active.value = true
      SpinFlag.value = true
      formData.value = {}

      await nextTick().then(r => {
        graph = new Graph(GraphRef.value!, () => {
          formData.value.interfaceJsonSchema = toSchema(formData.value.interfaceJsonSchema!)
        })
      })

      await detail(id).then(r => {
        formData.value = r
        SpinFlag.value = false
        interfaceJsonSchema.value = JSON.parse(formData.value.interfaceJsonSchema!)
        graph.loadData(JSON.parse(formData.value.jsonSchema!), interfaceJsonSchema.value)
      })

    }
    const cancel = () => {
      active.value = false
    }
    const submit = () => {
      console.log('====interfaceJsonSchema.value====', interfaceJsonSchema.value)
      formData.value.interfaceJsonSchema = toSchema(formData.value.interfaceJsonSchema!)
      
      SpinFlag.value = true
      edit(formData.value).then(r => {
        console.log('====r====', r)
        active.value = false
      }).finally(() => {
        SpinFlag.value = false
      })
    }



    // 
    return {
      mode,
      SpinFlag,
      GraphRef,
      x,
      show,
      submit,
      cancel,
      active,
      formData,
      test () {
        const funStr = generateScript(formData.value.interfaceJsonSchema!, true)
        console.log('======script===', funStr)
        const fun = new Function('d', funStr)

        console.log('======script===', fun({
          agentUserName: 'agentUserNamexx',
          agentUserId: 'agentUserIdxx'
        }))
        // console.log('====toSchema(formData.value.interfaceJsonSchema!)====', toSchema(formData.value.interfaceJsonSchema!))
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
