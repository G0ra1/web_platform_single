<template>
  <n-layout has-sider class="nw-layout-full">

    <n-layout-sider
      bordered
      width="225"
      content-style="padding: 5px;"
      style="margin-right: -1px"
    >
      <nw-app-tree-grid rootName="全部" @callback="handleTree" />
    </n-layout-sider>
    <n-layout class="nw-layout-full">
      <n-layout-header class="nw-layout-header">

        <n-space :size="5" style="padding: 0 5px">
          <!-- <n-button size="small" >编辑</n-button>
        <n-button size="small" disabled type="warning" >编辑</n-button> -->
          <n-button :disabled="!appInfo.appCode" type="primary" @click="modalBasicFormRef?.show('', appInfo)">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建表单
          </n-button>
          <n-button :disabled="!appInfo.appCode" type="primary" @click="modalBasicPageRef?.show('', appInfo)">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建页面
          </n-button>
          <!-- <n-button type="warning" >编辑</n-button> -->
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
  <ModalBasicForm ref="modalBasicFormRef" @callback="refresh" />
  <ModalBasicPage ref="modalBasicPageRef" @callback="refresh" />
  <ModalBasicFormInterface ref="modalBasicFormInterfaceRef" @callback="refresh" />
  <ModalBasicFormTransform ref="modalBasicFormTransformRef" />
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h ,onMounted} from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import Modal from './components/Modal.vue'
import ModalBasicForm from './components/ModalBasicForm.vue'
import ModalBasicPage from './components/ModalBasicPage.vue'
import ModalBasicFormInterface from './components/ModalBasicFormInterface.vue'
import ModalBasicFormTransform from './components/ModalBasicFormInterface/index.vue'
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
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'
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
    Modal,
    ModalBasicForm,
    ModalBasicPage,
    ModalBasicFormInterface,
    ModalBasicFormTransform,
    NwAppTreeGrid
  },
  setup() {
    const md = Page.getMenuData()
    // 这里获取pm 数据
    // const { pm = '' } = Utils.parseQuery(window.location.search.substring(1))
    console.log(Page.getMenuCache())
    const appInfo = ref<any>({
      ...md
    })
    const dialog = useDialog()
    const modalBasicFormRef = ref<typeof ModalBasicForm>()
    const modalBasicPageRef = ref<typeof ModalBasicPage>()
    const modalBasicFormInterfaceRef = ref<typeof ModalBasicFormInterface>()
    const modalBasicFormTransformRef = ref<typeof ModalBasicFormTransform>()
      onMounted(()=>{
  console.log(modalBasicFormRef.value)
  
})
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      columns: [
        { field: 'pageName', title: '名称', showHeaderOverflow: true, width: '180px' },
        { field: 'pageCode', title: '编码', showHeaderOverflow: true, width: '180px' },
        {
          title: '类型', showHeaderOverflow: true, width: '100px',
          slots: {
            default: ({ row }) => {

              if (row.pageType === '1') {
                // 这里判断数据转换
                return [
                  <NTag size="small" type="warning">
                    {{
                      default: () => ['表单']
                    }}
                  </NTag>
                ];
              } else if (row.pageType === '2') {

                return [
                  <NTag size="small" type="success">
                    {{
                      default: () => ['页面']
                    }}
                  </NTag>
                ];
              } else {
                return [
                  <NTag size="small" >
                    {{
                      default: () => ['未知']
                    }}
                  </NTag>
                ]
              }
            },
          }
        },
        {
          title: '来源', showHeaderOverflow: true,
          slots: {
            default: () => {
              return ['外链'];
            },
          }
        },
        {
          title: '数据转换',
          width: 80,
          slots: {
            default: ({ row }: any) => {
              if (row.pageType === '1') {
                  
                if (row.isTransform) {
                  return [ '已开启' ]
                } else {
                  
                  return ['已关闭'];
                }
              } else {
                return ['-']
              }
            },
          }
        },
        {
          title: '操作',
          showHeaderOverflow: true,
          width: '230px',
          slots: {
            default: ({ row }) => {
              if (row.pageType === '1') {
                return [
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    onClick={() => {
                      modalBasicFormRef.value?.show(row.id)
                    }}
                  >{{
                    default: () => '编辑'
                  }}</NButton>,
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    onClick={() => {
                      modalBasicFormInterfaceRef.value?.show(row.id)
                    }}
                  >{{
                    default: () => '配置接口'
                  }}</NButton>,
                  (row.isTransform ? <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    onClick={() => {

                      modalBasicFormTransformRef.value?.show(row.id)
                    }}
                  >{{
                    default: () => '数据转换'
                  }}</NButton> : <span></span>),
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
              } else {
                return [
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    onClick={() => {
                      modalBasicPageRef.value?.show(row.id)
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
                ]
              }
            },
          }
        }
      ]
    }, new RequestPaging(
      '/main/page/list',
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
      modalBasicFormInterfaceRef,
      modalBasicFormTransformRef,
      modalBasicPageRef,
      bind,
      gridRef,
      filterData,
      query,
      appInfo,
      handleTree (d: any) {
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
