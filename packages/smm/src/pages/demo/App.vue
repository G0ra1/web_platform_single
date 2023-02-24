<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <NwFunctionPredefine code="CODE2" descr="左上预留位置按钮1" />
        {{ menuData }}
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input
            :value="filterData.formNameCh || ''"
            @update:value="(d: string) => filterData.formNameCh = d"
            placeholder="输入查询文本"
            :style="{ width: '150px' }"
          />
          <n-button type="primary" @click="query()"> 搜索 </n-button>
        </n-input-group>
        <n-button title="重置" type="warning" @click="reset()">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <!--   <n-button  title="导入" >
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
        </n-button> -->
        <n-button>
          <template #icon>
            <nw-icon name="icon-n-y-column" />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef"> </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from "vue";
import type { ComponentPublicInstance, Ref, ReactiveEffect } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

import type { SearchForm } from "./model.d";
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
} from "naive-ui";
import {
  NwIcon,
  RequestPaging,
  VxeHelper,
  NwFunctionAccess,
  NwFunctionPredefine,
  Page,
} from "@platform/main";

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
  },
  setup() {
    console.log("Page.getMenuData()=", Page.getMenuData());
    const menuData = ref(Page.getMenuData());
    const { bind, gridRef, filterData, query, reset } =
      new VxeHelper.VxeGridPaging<any>(
        {
          columns: [
            {
              field: "sysName",
              title: "系统名称",
              showHeaderOverflow: true,
              slots: {
                default: ({ row }) => {
                  return [
                    <NwFunctionPredefine code="CODE4" descr="左上预留位置按钮4">
                      {{
                        auth: (fn: any) => (
                          <a href="javascript:void" onClick={fn}>
                            {row.sysName}
                          </a>
                        ),
                        unauth: () => row.sysName,
                      }}
                    </NwFunctionPredefine>,
                  ];
                },
              },
            },
            { field: "sysCode", title: "系统code", showHeaderOverflow: true },
            {
              field: "sort",
              title: "排序",
              showHeaderOverflow: true,
              width: "180px",
            },

            {
              title: "操作",
              showHeaderOverflow: true,
              width: "140px",
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
              },
            },
          ],
        },
        new RequestPaging("/main/mdmSys/list", "post")
      );
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      });
    });
    return {
      menuData,
      bind,
      gridRef,
      filterData,
      query,
      reset,
    };
  },
});
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
