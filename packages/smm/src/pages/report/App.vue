<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">

      <n-space :size="5" style="padding: 0 5px">
        <!-- <n-button size="small" >编辑</n-button>
        <n-button size="small" disabled type="warning" >编辑</n-button> -->
        <!-- <n-button type="primary" @click="">
          <template #icon>
            <nw-icon name="icon-n-y-add" :size="14" />
          </template>
          新建
        </n-button> -->
<!--
        <n-date-picker type="daterange" v-modal:value="range"  clearable/>
-->
        <n-date-picker v-model:value="range" type="daterange" placeholder="查询日期" clearable />
<!--         <pre>{{ JSON.stringify(range) }}</pre>-->
        <n-button size="small" type="primary" @click="search">查询</n-button>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">

      </n-space>
    </n-layout-header>
    <n-layout-content>
      <iframe :src="fUrl" style="width: 100%;height: 100%;border:none; display:block">
      </iframe>
    </n-layout-content>
  </n-layout>
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
  NDatePicker
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'
import { format } from "date-fns";
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
    NDatePicker
  },
  setup() {

    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      columns: [
        {
          field: 'sysName', title: '系统名称', showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <NwFunctionPredefine
                  code="CODE4"
                  descr="左上预留位置按钮4"
                >
                  {{
                    auth: (fn: any) => <a href="javascript:void" onClick={fn}>{row.sysName}</a>,
                    unauth: () => row.sysName
                  }}
                </NwFunctionPredefine>,]
            }
          }
        },
        { field: 'sysCode', title: '系统code', showHeaderOverflow: true },
        { field: 'sort', title: '排序', showHeaderOverflow: true, width: '180px' },

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
                  code="CODE3"
                  descr="左上预留位置按钮1"
                />,
                <NwFunctionAccess
                  fnCode="demoForm_edit"
                  params={[{
                    id: row.id
                  }]}
                  btnOption={{
                    size: 'tiny',
                    type: 'warning'
                  }}
                  onComplete={() => {
                    reset({})
                  }}
                />,
                <NwFunctionAccess
                  fnCode="demoForm_del"
                  params={[{
                    id: row.id
                  }]}
                  btnOption={{
                    size: 'tiny',
                    type: 'error'
                  }}
                  onComplete={() => {
                    reset({})
                  }}
                />,
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
      '/main/mdmSys/list',
      'post'
    )
    )
    const range = ref<[number, number]>([+new Date(), +new Date()])
    const fUrl = ref<string>(`http://192.168.0.196:8992/webroot/ReportServer?reportlet=WorkBook2.cpt&op=view&__showtoolbar__=false&startTime=${format(new Date(range.value[0]), 'yyyy-MM-dd')}&endTime=${format(new Date(range.value[1]), 'yyyy-MM-dd')}`)

    const search = () => {
       fUrl.value = `http://192.168.0.196:8992/webroot/ReportServer?reportlet=WorkBook2.cpt&op=view&__showtoolbar__=false&startTime=${format(new Date(range.value[0]), 'yyyy-MM-dd')}&endTime=${format(new Date(range.value[1]), 'yyyy-MM-dd')}`

    }
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
      range,
      search,
      fUrl
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
