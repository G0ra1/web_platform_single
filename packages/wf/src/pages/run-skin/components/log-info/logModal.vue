<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    bordered
  >
    <template #icon>
      <nw-icon name="icon-y-log" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>流程日志</div>
    </template>
    <div class="handle-body" style="height: 400px">
      <vxe-grid
        v-bind="gridOptions"
        ref="xGrid"
      ></vxe-grid>
    </div>

    <template #action>
      <div style="padding: 5px">
        <n-button size="small" @click="visible = false">关闭</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h, getCurrentInstance } from "vue";

import { NwIcon, request } from "@platform/main";
import { NTime } from 'naive-ui'
export default {
  components: {
   
  },
  props: {},
  emits: ["callback"],
  setup(props: any, context: any) {
    // const NTime = getCurrentInstance()!.appContext.components.NTime
    const visible = ref<boolean>(false)
    const LogData = ref<Array<any>>([])
    const gridOptions = reactive<any>({
      size: "small",
      stripe: true,
      border: false,
      height: "auto",
      align: null,
      data: LogData,
      columns: [
        {
          field: "nodeName", title: "节点名称", minWidth: 120, showOverflow: true,
        },
        {
          title: "办理状态",
          minWidth: 80,
          slots: {
            default: ({ row }: any) => {

                if (row.type === 0) {
                  return [
                    <span style="color: var(--n-orange3)">办理中</span>
                  ]
                } else if (row.type === 1) {
                  return [
                    <span style="color: var(--n-green3)">办理完成</span>
                  ]
                } else if (row.type === 2) {
                  return [
                    <span style="color: var(--n-red3)">已驳回</span>
                  ]
                }
                return '-'
            }
          }
        },
        {
          field: "userNameCh", title: "办理人", minWidth: 120, showOverflow: 'title',
        },
        // {
        //   field: "orgName", title: "机构", minWidth: 120, showOverflow: 'title',
        // },
        // {
        //   field: "deptName", title: "部门", minWidth: 120, showOverflow: 'title',
        // },
        {
          field: "description", title: "办理意见", minWidth: 120, showOverflow: 'title',
        },
        {
          title: "办理时间",
          minWidth: 160,
          showOverflow: 'title',
          slots: {
            default: ({ row }: any) => {
                // return [
                //   <NTime to={new Date(row.startTime)} type="relative" />
                // ]

                return [row.startTime]
            }
          }
        }
        ],
      columnConfig: {
        resizable: true,
      },
      rowConfig: {
        keyField: props.rowKey,
        isCurrent: true,
        isHover: true,
      }
    })
    return {
      visible,
      gridOptions,
      show (data = []) {
        visible.value = true
        LogData.value = data
      }
    };
  },
};
</script>

<style lang="less" scoped></style>
