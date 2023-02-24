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
          新建表单
        </n-button> -->

        <!-- <NwFunctionAccess fnCode="jzNatgasSell_add" @complete="reset" /> -->

        <NwFunctionPredefine code="TOP_LEFT_1" descr="左上预留位置按钮1" />
        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input
            :value="filterData.formNameCh || ''"
            @update:value="(d: string) => filterData.formNameCh = d"
            placeholder="输入查询文本"
            :style="{ width: '150px' }"
          />
          <n-button type="primary" @click="query()" :style="{ height: '36px' }">
            搜索
          </n-button>
        </n-input-group>
        <n-button
          title="重置"
          type="warning"
          @click="reset()"
          :style="{ height: '36px' }"
        >
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef"> </vxe-grid>
    </n-layout-content>
    <Detail ref="detailForm" />
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
  NwFunctionPredefine,
} from "@platform/main";
import { inject } from "vue";
import Detail from "./detail.vue";

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
    Detail,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwFunctionPredefine,
  },
  setup() {
    const detailForm = ref();
    const show = (row?: any) => {
      detailForm.value.sonFn(row);
    };
    const { bind, gridRef, filterData, query, reset } =
      new VxeHelper.VxeGridPaging<any>(
        {
          columns: [
            { type: "seq", width: 50, minWidth: 50 },
            {
              field: "titleName",
              title: "报表名称",
              showHeaderOverflow: true,
              slots: {
                default: ({ row }) => {
                  return [
                    <div
                      style="width:100%;color:#2d8cf0;cursor: pointer;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;"
                      onClick={(e) => {
                        show(row);
                      }}
                    >
                      {row.titleName}
                    </div>,
                  ];
                },
              },
            },
            {
              field: "createUserParentDeptName",
              title: "填报单位",
              showHeaderOverflow: true,
            },
            {
              field: "createUserName",
              title: "填报人",
              showHeaderOverflow: true,
            },
            /* {
              field: "sumJingkouNumber",
              title: "总井数（口）",
              showHeaderOverflow: true,
            },
            {
              field: "sumSpjJingkouGas",
              title: "井口产气量(nm3/d)",
              showHeaderOverflow: true,
            },
            {
              field: "sumOutGasNumber",
              title: "集气站外输气量(nm3/d)",
              showHeaderOverflow: true,
            },
            {
              field: "processCenterInGas",
              title: "处理中心进气量(nm3/d)",
              showHeaderOverflow: true,
            }, */
            {
              field: "bingranOutGas",
              title: "炳然代输气量（Nm³/d）",
              showHeaderOverflow: true,
            },
            {
              field: "sumOutsourcingGasNumber",
              title: "外购气量（Nm³/d）",
              showHeaderOverflow: true,
            },
            {
              field: "sumCooperateGasNumber",
              title: "合作气量（Nm³/d）",
              showHeaderOverflow: true,
            },
            {
              field: "sumSelfGasNumber",
              title: "自产气量（Nm³/d）",
              showHeaderOverflow: true,
            },
            {
              field: "sumSellGasNumber",
              title: "销售气量（Nm³/d）",
              showHeaderOverflow: true,
            },
            {
              field: "auditStatus",
              title: "审批状态",
              showHeaderOverflow: true,
              width: "120px",
              align: "center",
              slots: {
                default: ({ row }) =>
                  [
                    h(
                      NTag,
                      {
                        size: "small",
                        type: ["error", "info", "success", , "warning", , ""][
                          row.auditStatus
                        ],
                        round: "round",
                        class: "grid-ntag",
                      } as {},
                      {
                        default: () =>
                          ["草稿", "审批中", "审批通过", "审批未通过"][
                            row.auditStatus
                          ],
                        icon: () =>
                          h(NwIcon, {
                            name: [
                              "icon-n-n-error",
                              "icon-n-n-mark",
                              "icon-n-n-check_fill",
                              "icon-n-n-warning",
                              "icon-n-n-mark",
                            ][row.auditStatus],
                          }),
                      }
                    ),
                  ] as JSX.Element[],
              },
            },
          ],
        },
        new RequestPaging("/smm/smmSxGasDaily/page", "post")
      );
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      });
    });
    (inject("Emitter") as any).on("function-complete", () => {
      reset({});
    });
    return {
      bind,
      gridRef,
      filterData,
      query,
      reset,
      detailForm,
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
