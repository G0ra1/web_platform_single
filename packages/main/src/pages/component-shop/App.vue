<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      <n-space :size="5" style="padding: 0 5px">
        <span></span>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.widgetName || ''" @update:value="(d: string) => filterData.widgetName = d" placeholder="输入查询文本" :style="{ width: '150px' }" />
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
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

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
  NEllipsis,
  NPopconfirm,
  useMessage
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'
import { updateByIdAndIsPutaway } from './api/index'

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NEllipsis,
    NwIcon,
    NTag,
    NInput,
    NPopconfirm,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwFunctionAccess,
    NwFunctionPredefine
  },
  setup () {
    const message = useMessage();
   
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
        columns: [
          { field: 'widgetName', title: '组件名称', showHeaderOverflow: true,},
          { field: 'widgetUrl', title: '组件路径', showHeaderOverflow: true,  },
          { field: 'widgetTypeName', title: '组件类型', showHeaderOverflow: true,  },
          { field: 'isPutaway', title: '是否上架', showHeaderOverflow: true,
            slots:{
               default: ({ row }) => {
                 return [
                  row.isPutaway == 0 ? '否' : '是'
                 ]
               }
            }
          },
          { field: 'createTime', title: '创建人', showHeaderOverflow: true },
          { field: 'createUserName', title: '创建日期', showHeaderOverflow: true },
          {
            field: "",
            title: "操作",
            fixed:'right',
            width:120,
            showHeaderOverflow: true,
            slots: {
              default: ({row} :any) => {
                return [
                  <div>
                    <NPopconfirm
                      onPositive-click={()=>{
                          updateByIdAndIsPutaway({...row,isPutaway:row.isPutaway == 0 ? 1 : 0}).then((r)=>{
                            if(r) {
                              message.success("操作成功");
                              query()
                            } else {
                              message.error("操作失败,请联系管理员");
                            }
                          })
                      }}
                      positive-text="确定"
                      negative-text="取消"
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:8px">{row.isPutaway == 0 ? "上架" : "下架"}</a>,
                        default:()=> `是否${row.isPutaway == 0 ? "上架" : "下架"}当前选项?`
                      }}
                      
                    </NPopconfirm>
                  </div>
                  
                ];
              },
            },
          },
        ]
      }, new RequestPaging(
          '/portal/portalWidgetsStore/page',
          'post'
      )
    )
    nextTick().then(() => {
      reset({
        
      })
    })
    return {
      bind,
      gridRef,
      filterData,
      query,
      reset,
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
