<template>
  <n-layout class="nw-layout-full nw-sprite" >
    <n-layout-header bordered class="nw-layout-header" >
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" @click="() => { ModalRef.show() }">新建</n-button>
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
        <n-button  title="查询" @click="() => {GridSearchRef.toggle()}" >
          <template #icon>
            <nw-icon name="icon-n-n-eye" />
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
  <Modal ref="ModalRef" @callback="callback" />
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, inject } from 'vue'
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
  NTabs,
  NTab
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine, Page, NwGridSearch } from '@platform/main'
import Modal from './modal.vue'
import { del } from './api'
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
    Modal,
    NTabs,
    NTab,
    NwGridSearch
  },
  setup () {
    const GridSearchRef = ref<any>()

    const ModalRef = ref<any>();
    (inject('Emitter') as any).on('function-complete', () => {
      reset({})
    })

    // const columns = []
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
        columns: [
          { field: 'code', title: '业务入口名称', showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                
                return <a href="javascript:void()" onClick={() => {
                  // alert(window.parent.location.hash)
                  // 这里需要封装一个统一函数
                  Page.toLevel2Menu('code', row.code, 'name', row.name)
                  // window.parent.location.hash = `${window.parent.location.hash}/${row.id}`
                }}>
                  { row.name }
                </a>
              }
            },
            visible: true
          },
          { field: 'code', title: '业务入口编码', showHeaderOverflow: true,
            visible: true },
          { field: 'sort', title: '排序', showHeaderOverflow: true,
            visible: true },
          
          {
                    title: '操作',
                    showHeaderOverflow: true,
                    width: '120px',
                    slots: {
                        default: ({ row }) => {
                            return [
                                <NButton
                                    size="tiny"
                                    style="margin-right: 5px;"
                                    onClick={() => {
                                      ModalRef.value.show(row)
                                    }}
                                >{{
                                    default: () => '编辑'
                                }}</NButton>,
                                <NButton
                                    size="tiny"
                                    type="error"
                                    onClick={() => {

                                      (window as any).NaiveDialog.error({
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
                                              reset({})
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
          '/main/mdmBizMenu/page',
          'post'
      )
    )
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      })
    })
    return {
      GridSearchRef,
      ModalRef,
      bind,
      gridRef,
      filterData,
      query,
      reset,
      callback () {
        reset({
          //formNameCh: '测试'
        })
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
