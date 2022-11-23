<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      
      <n-space :size="5" style="padding: 0 5px">
        <n-button @click="handleCreate" size="small" type="primary" >新建流程</n-button>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.formNameCh || ''" @update:value="(d: string) => filterData.formNameCh = d" placeholder="输入查询文本" :style="{ width: '150px' }" />
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
        </n-input-group>
        <n-button  title="重置" type="warning" @click="reset()">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <n-button  title="导入" >
          <template #icon>
            <nw-icon name="icon-n-y-import" />
          </template>
        </n-button>
        <n-button  title="导出" >
          <template #icon>
            <nw-icon name="icon-n-y-export" />
          </template>
        </n-button>
        <n-button  title="打印" @click="gridRef?.print()" >
          <template #icon>
            <nw-icon name="icon-n-y-print" />
          </template>
        </n-button>
        <n-button  >
          <template #icon>
            <nw-icon name="icon-n-y-column" />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid
        v-bind="bind"
        ref="gridRef"
      >
      </vxe-grid>
    </n-layout-content>
  </n-layout>
  
  <version-modal ref="VersionModalRef" @callback="callbackModal" />
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import type { SearchForm } from './model.d'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  useDialog,
  useMessage
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'

import { del } from './api/index'

import VersionModal from './versionModal.vue'

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwFunctionAccess,
    NwFunctionPredefine,
    VersionModal
  },
  setup () {
    const dialog = useDialog()
    const message = useMessage()
    const VersionModalRef = ref()
    const sendDeleteTemplate = (row: any) => {

        const delDialog = dialog.warning({
        title: '删除警告',
        content: () => '确定删除该流程？',
        positiveText: '确认',
        onPositiveClick: () => {
          delDialog.loading = true
          return new Promise((resolve) => {
            del(row.id).then(res => {
              if (res) {
                message.success('删除成功')
              } else {
                message.error('删除失败')
              }
            }).catch(err => {
              message.error('删除失败')
            }).finally(() => {
              delDialog.loading = false
              
            })
          })
        }
      })
      }
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
        columns: [
          { field: 'procdefTypeName', title: '流程分类'},
          { field: 'procdefName', title: '流程名称'},
          { field: 'procdefNameAbbr', title: '流程全称'},
          { field: 'versionTag', title: '版本'},
          
          { field: '', title: '表单'},
          {
            title: '操作',
            showHeaderOverflow: true,
            width: '140px',
            slots: {
              default: ({row}) => {
                return [
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type="primary"
                    text
                    title="新建版本"
                    onClick={() => {
                      window.location.href = `/web-wf/pages/procdef-editor.html?action=createVersion&camundaProcdefId=${row.camundaProcdefId}`
                    }}
                  >{{
                    default: () => [
                      <NwIcon size={20} name="icon-n-y-newversion" />
                    ]
                  }}</NButton>,
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type="warning"
                    title="编辑"
                    text
                    onClick={() => {
                      window.location.href = `/web-wf/pages/procdef-editor.html?action=edit&procDefId=${row.id}&camundaProcdefId=${row.camundaProcdefId}`
                    }}
                  >{{
                    default: () => [
                      <NwIcon size={20} name="icon-n-y-editpage" />
                    ]
                  }}</NButton>,
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type="warning"
                    title="复制"
                    text
                    onClick={() => {
                      window.location.href = `/web-wf/pages/procdef-editor.html?action=clone&camundaProcdefId=${row.camundaProcdefId}`
                    }}
                  >{{
                    default: () => [
                      <NwIcon size={20} name="icon-n-y-copy" />
                    ]
                  }}</NButton>,
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type="warning"
                    title="版本"
                    text
                    onClick={() => {
                      
                      VersionModalRef.value.show(row.camundaProcdefKey)
                    }}
                  >{{
                    default: () => [
                      <NwIcon size={20} name="icon-n-y-version" />
                    ]
                  }}</NButton>,
                  <NButton

                  size="tiny"
                  type="error"
                  title="删除"
                  text
                  onClick={() => {
                    // sendDeleteTemplate(row)
                    sendDeleteTemplate(row)
                  }}
                >
                  {{
                    default: () => [
                      <NwIcon size={20} name="icon-n-y-shanchu" />
                    ]
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>
                ];
              },
            }
          }
        ]
      }, new RequestPaging(
          '/wf/wfprocdef/list',
          'post'
      )
    )
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      })
    })
    return {
      VersionModalRef,
      bind,
      gridRef,
      filterData,
      query,
      reset,
      handleCreate () {
        window.location.href = '/web-wf/pages/procdef-editor.html?action=create'
      },
      callbackModal () {
        reset({})
      }
    }
  }
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
