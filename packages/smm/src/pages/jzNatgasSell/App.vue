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

        <NwFunctionPredefine
          code="TOP_LEFT_1"
          descr="左上预留位置按钮1"
        />
        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input :value="filterData.formNameCh || ''" @update:value="(d: string) => filterData.formNameCh = d"
            placeholder="输入查询文本" :style="{ width: '150px' }" />
          <n-button type="primary" @click="query()" :style="{ height: '36px' }">
            搜索
          </n-button>
        </n-input-group>
        <n-button title="重置" type="warning" @click="reset()" :style="{ height: '36px' }">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
        <!-- <n-button title="导入">
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
        </n-button> -->
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef">
      </vxe-grid>
    </n-layout-content>
    <Detail ref="detailForm"/>
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

} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwFunctionPredefine } from '@platform/main'
import {  inject } from "vue";
import Detail from './detail.vue'

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
    Detail,
    NwFunctionPredefine
  },
  setup() {
    const detailForm = ref()
    const show = (row?:any) => {
      detailForm.value.sonFn(row);      
    };
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      columns: [

        { type: "seq", width: 50, minWidth: 50 },
        { field: 'titleName', title: '报表名称', showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       show(row)
                      }
                    }>{row.titleName}</a>
                  </span>,
              ];
            },
          }
        },
        { field: 'createUserParentDeptName', title: '填报单位', showHeaderOverflow: true, },
        { field: 'sourceNumber', title: '来源气量（方）', showHeaderOverflow: true, },
        { field: 'sumNatgasTypeName', title: '天然气类型', showHeaderOverflow: true, },
        { field: 'sumNatgasSellNumber', title: '来源气量（方）', showHeaderOverflow: true, },
        { field: 'fillTime', title: '填报日期', showHeaderOverflow: true, },
        { field: 'createUserName', title: '填报人', showHeaderOverflow: true, },
        {
        field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '120px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              {
                  size: "small", type: ["error","info", "success", ,"warning", , ''][row.auditStatus], round: "round", class: "grid-ntag"
              } as {},
              {
                  default: () =>["草稿", "审批中", "审批通过", "审批未通过"][row.auditStatus] ,
                  icon: () => h(
                      NwIcon,
                      {
                          name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.auditStatus]
                      }
                  )

              }
          )] as JSX.Element[]
        }
      },
        { field: 'createTime', title: '创建时间', showHeaderOverflow: true, },
        // {
        //   title: '操作',
        //   showHeaderOverflow: true,
        //   width: '230px',
        //   slots: {
        //     default: ({ row }) => {
        //       return [
        //         <NwFunctionPredefine
        //           code="COLUMN_CONTROL_1"
        //           descr="操作列占位1"
        //           params={[row]}
        //         />,
        //         <NwFunctionPredefine
        //           code="COLUMN_CONTROL_2"
        //           descr="操作列占位2"
        //           params={[row]}
        //         />,
        //         <NwFunctionPredefine
        //           code="COLUMN_CONTROL_3"
        //           descr="操作列占位3"
        //           params={[row]}
        //         />
              
        //       ];
        //     },
        //   }
        // }
      ]
    }, new RequestPaging(
      '/smm/jzNatgasSell/page',
      'post'
    )
    )
    
    nextTick().then(() => {
      reset({
       
      })
      
    });
    
    (inject("Emitter") as any).on("function-complete", () => {
      reset({});
    });
    return {
      bind,
      gridRef,
      filterData,
      query,
      detailForm,
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
