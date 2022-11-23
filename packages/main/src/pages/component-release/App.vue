<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      <n-space :size="5" style="padding: 0 5px">
        <NwFunctionPredefine
          code="release-component"
          descr="左上预留位置按钮1"  
        />
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
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'

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
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwFunctionAccess,
    NwFunctionPredefine
  },
  setup () {
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
          { field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, 
            slots: {
              default: ({ row }) => {
                let text = "";
                switch (row.auditStatus) {
                   case 0:
                    text = "草稿";
                    break;
                  case 1:
                    text = "运行中";
                    break;
                  case 2:
                    text = "完成";
                    break;
                  case 3:
                    text = "挂起";
                    break;
                  case 4:
                    text = "终止";
                    break;
                  case 5:
                    text = "知会";
                    break;
                }
                return [
                  <span>{text}</span>
                ];
             }
            }
          },
          { field: 'createTime', title: '创建人', showHeaderOverflow: true },
          { field: 'createUserName', title: '创建日期', showHeaderOverflow: true },

          
        ]
      }, new RequestPaging(
          '/portal/portalWidgets/page',
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
      reset
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
