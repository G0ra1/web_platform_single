<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">

      <n-space :size="5" style="padding: 0 5px">

        <NwFunctionPredefine code="TOP_LEFT_1" descr="左上预留位置按钮1" :params="[{ taskTitle: '测试传参' }]" />
        <NwFunctionPredefine code="TOP_LEFT_2" descr="左上预留位置按钮2" />
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.formNameCh || ''" @update:value="(d: string) => filterData.formNameCh = d"
            placeholder="输入查询文本1" :style="{ width: '150px' }" />
          <n-button type="primary" @click="query()">
            搜索
          </n-button>
        </n-input-group>
        <n-button title="筛选" type="warning" @click="GridSearchRef?.toggle()">
          <template #icon>
            <nw-icon name="icon-n-y-shaixuan" />
          </template>
        </n-button>
        <n-button title="重置" type="warning" @click="reset()">
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
    <NwGridSearch ref="GridSearchRef" :options="[
      {
        name: '合同编号',
        field: 'code',
        vtype: 'string',
      },
      {
        name: '合同金额',
        field: 'sum',
        vtype: 'number',
      }
    ]">
    </NwGridSearch>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef">
      </vxe-grid>
    </n-layout-content>
  </n-layout>
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

} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine, Page, NwGridSearch } from '@platform/main'

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
    NwGridSearch
  },
  setup() {
    (inject('Emitter') as any).on('function-complete', () => {
      reset({})
    })
    const GridSearchRef = ref<any>()
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      columns: [
        {
          field: 'taskTitle', title: '任务标题', showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return <a href="javascript:void()" onClick={() => {
                // alert(window.parent.location.hash)
                // 这里需要封装一个统一函数
                Page.toLevel2Menu('id', row.id, 'taskTitle', row.taskTitle)
                // window.parent.location.hash = `${window.parent.location.hash}/${row.id}`
              }}>
                {row.taskTitle}
              </a>
              return [
                <NwFunctionPredefine
                  code="COLUMN_TITLE_1"
                  descr="标题列"
                >
                  {{
                    auth: (fn: any) => <a href="javascript:void" onClick={fn}>{row.taskTitle}</a>,
                    unauth: () => row.taskTitle
                  }}
                </NwFunctionPredefine>,]
            }
          }
        },
        { field: 'taskName', title: '任务名称', showHeaderOverflow: true },
        { field: 'taskType', title: '任务类型', showHeaderOverflow: true, width: '180px' },

        {
          title: '操作',
          showHeaderOverflow: true,
          width: '140px',
          slots: {
            default: ({ row }) => {
              return [

                // <NwFunctionPredefine
                //   code="CODE3"
                //   descr="左上预留位置按钮2"

                // >
                //   <template #auth="rc">
                //     <NButton type="info" @click="rc">测试</NButton>
                //   </template>
                //   <template #unauth>
                //     <NButton type="error">Test</NButton>
                //   </template>
                // </NwFunctionPredefine>
                <NwFunctionPredefine
                  code="COLUMN_CONTROL_1"
                  descr="操作列按钮1"
                  params={[row]}
                />,

                <NwFunctionPredefine
                  code="COLUMN_CONTROL_2"
                  descr="操作列按钮2"
                  params={[row]}
                />
                // <NButton
                //   size="tiny"
                //   type="error"
                //   onClick={() => {
                //   }}
                // >{{
                //   default: () => '删除'
                // }}</NButton>
              ];
            },
          }
        }
      ]
    }, new RequestPaging(
      '/task/taskInfo/page',
      'post'
    )
    )
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      })
    })
    return {
      bind,
      gridRef,
      filterData,
      query,
      reset,
      GridSearchRef
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
