<template>
  <n-layout has-sider class="nw-layout-full">

    <n-layout-sider bordered width="225" content-style="padding: 5px;" style="margin-right: -1px">
      <nw-app-tree-grid rootName="全部" @callback="handleTree" />
    </n-layout-sider>
    <n-layout class="nw-layout-full">
      <n-layout-header class="nw-layout-header">

        <n-space :size="5" style="padding: 0 5px">
          <n-button :disabled="!appInfo.appCode" type="primary" @click="modalBasicFormRef?.show('', appInfo)">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新增权限
          </n-button>
        </n-space>
        <n-space :size="5" style="padding: 0 5px">
          <n-input-group>
            <n-input :value="filterData.formNameCh || ''" @update:value="(d: string) => filterData.formNameCh = d"
              placeholder="输入查询文本" :style="{ width: '150px' }" />
            <n-button type="primary" @click="query()">
              搜索
            </n-button>
          </n-input-group>
          <n-button title="重置" type="warning" @click="refresh()">
            <template #icon>
              <nw-icon name="icon-n-y-refresh" />
            </template>
          </n-button>
          <n-button title="导入">
            <template #icon>
              <nw-icon name="icon-n-y-import" />
            </template>
          </n-button>
          <n-button title="导出">
            <template #icon>
              <nw-icon name="icon-n-y-export" />
            </template>
          </n-button>
          <n-button title="打印" @click="gridRef?.print()">
            <template #icon>
              <nw-icon name="icon-n-y-print" />
            </template>
          </n-button>
          <n-button>
            <template #icon>
              <nw-icon name="icon-n-y-column" />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <vxe-grid v-bind="bind" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <ModalBasicForm ref="modalBasicFormRef" @callback="saveSuccess" />
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import ModalBasicForm from './components/ModalBasicForm.vue'
import type { SearchForm } from './model.d'
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  useDialog
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid } from '@platform/main'
import { del } from './api/index'

export default defineComponent({
  components: {
    NLayout,
    NLayoutSider,
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
    ModalBasicForm,
    NwAppTreeGrid
  },
  setup() {
    const appInfo = ref({
      appCode: ''
    })
    const dialog = useDialog()
    const modalBasicFormRef = ref<typeof ModalBasicForm>()
    const saveSuccess = () => {
      query()
    }
    onMounted(() => {

    })
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      columns: [
        { field: 'pageName', title: '业务名称', showHeaderOverflow: true },
        { field: 'pageCode', title: '业务编码', showHeaderOverflow: true },
        { field: 'roleName', title: '角色名称', showHeaderOverflow: true },
        {
          title: '操作',
          showHeaderOverflow: true,
          width: '230px',
          slots: {
            default: ({ row }) => {
              return [
                <NButton
                  size="tiny"
                  style="margin-right: 5px;"
                  onClick={() => {
                    modalBasicFormRef.value?.show(row)
                  }}
                >{{
                  default: () => '编辑'
                }}</NButton>,
                <NButton
                  size="tiny"
                  type="error"
                  onClick={() => {
                    dialog.error({
                      class: 'text-modal-dialog',
                      title: '删除',
                      content: '确定删除？',
                      positiveText: '确定',
                      negativeText: '取消',
                      maskClosable: false,
                      onMaskClick: () => {
                      },
                      onPositiveClick: () => {
                        //
                        del(row.id).then(r => {
                          refresh()
                        })

                      },
                    })
                  }}
                >{{
                  default: () => '删除'
                }}</NButton>
              ];
            },
          }
        }
      ]
    }, new RequestPaging(
      '/permission/businessResource/page',
      'post'
    )
    )
    nextTick().then(() => {
      refresh()
    })


    const refresh = () => {
      reset({
        appCode: appInfo.value.appCode
      })
    }
    return {
      modalBasicFormRef,
      bind,
      gridRef,
      filterData,
      query,
      appInfo,
      saveSuccess,
      handleTree(d: any) {
        if (d.appType === 2) {
          appInfo.value = d
        } else if (d.appType === 0) {
          // root
          appInfo.value = { appCode: '' }
        }
        refresh()
      },
      refresh
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
