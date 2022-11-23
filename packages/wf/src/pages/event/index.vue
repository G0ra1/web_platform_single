<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      
      <n-space :size="5" style="padding: 0 5px">
        <n-button @click="handleCreate" size="small" type="primary" >新建事件</n-button>
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
  
  <EventAction ref="eventAction"   @update:callback="refresh"></EventAction>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
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
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'

import { del } from "./api";
import EventAction from './eventAction.vue'
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
    EventAction
  },
  setup () {
    
    const dialog = useDialog()
    const eventAction = ref()
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
        columns: [
          { field: "procdefTypeName", title: "流程分类" },
          { field: "listenerName", title: "事件名称" },
          {
            title: '事件分类',
            width: '140px',
            slots: {
              default: ({row}) => {
                return [row.eventType == 1 ? '执行事件' : '任务事件']
              },
            }
          },
          { field: "listenerId", title: "事件ID", showOverflow: true,},
          { field: "selectSign", title: "默认事件", showOverflow: true,
              slots: {
                  default: ({row}) => {
                    return [row.selectSign ? "是" : "否"]
                  },
              }
          
          },
          {
            title: '操作',
            showHeaderOverflow: true,
            width: '140px',
            slots: {
              default: ({row}) => {
                return [
                  <NButton
                  type="warning"
                  size="tiny"
                  style="margin-right: 5px;"
                  onClick={() => {
                    eventAction.value.sonFn(row)
                  }}
                  >编辑</NButton>,
                  <NButton
                    size="tiny"
                    type="error"
                    onClick={() => {
                      dialog.error({
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
                            reset()
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
          '/wf/wfevent/list',
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
      eventAction,
      query,
      reset,
      handleCreate () {
        eventAction.value.sonFn()
      },
      refresh () {
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
