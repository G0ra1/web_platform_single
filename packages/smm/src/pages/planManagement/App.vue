<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" @click="show({})">
          <template #icon>
            <nw-icon name="icon-n-y-add" :size="14" />
          </template>
          新建
        </n-button>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-input-group>
          <n-input
            :value="filterData.formNameCh || ''"
            @update:value="(d: string) => filterData.formNameCh = d"
            placeholder="输入查询文本"
            :style="{ width: '150px' }"
          />
          <n-button type="primary" @click="query()" :style="{ height: '36px' }"> 搜索 </n-button>
        </n-input-group>
        <n-button title="重置" type="warning" @click="reset()" :style="{ height: '36px' }">
          <template #icon>
            <nw-icon name="icon-n-y-refresh" />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <vxe-grid v-bind="bind" ref="gridRef"> </vxe-grid>
    </n-layout-content>
    <ActionModel ref="actionModel"/>
  </n-layout>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from "vue";
import type { ComponentPublicInstance, Ref, ReactiveEffect } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { del  } from "./api";
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
  NPopconfirm
} from "naive-ui";
import {
  NwIcon,
  RequestPaging,
  VxeHelper,
  NwFunctionPredefine,
} from "@platform/main";
import {  inject } from "vue";
import ActionModel from './actionModel.vue'

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
    ActionModel,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NPopconfirm,
    NwFunctionPredefine,
  },
  setup() {
    const actionModel = ref()
    const show = (row?:any) => {
      actionModel.value.sonFn(row);      
    }
    
    const handDel = (id?:any)=>{
        del(id).then(res=>{
          reset({})
        })
    }
    const { bind, gridRef, filterData, query, reset } =
      new VxeHelper.VxeGridPaging<any>(
        {
          columns: [
            { type: "seq", width: 50, minWidth: 50 },
            { field: "factoryName", title: "厂名称", showHeaderOverflow: true,
              slots: {
                default: ({ row }) => {
                  return [
                    <div style='width:100%;color:#2d8cf0;cursor: pointer;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;' onClick={(e)=>{
                          show(row)
                          }
                        }>{row.factoryName}
                      </div>,
                  ];
                },
              }
            },
            {
              field: "createUserParentDeptName",
              title: "填报单位",
              showHeaderOverflow: true,
            },
            {
              field: "sumJingkouNumber",
              title: "填报人",
              showHeaderOverflow: true,
            },
            {
              field: "factoryName",
              title: "创建时间",
              showHeaderOverflow: true,
            },
            
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                slots: {
                    default: ({ row }) => {
                      
                        return [
                          <div>
                            <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={(e)=>{show(row)}}>{"编辑"}</a>
                            <NPopconfirm
                              onPositive-click={()=>{handDel(row.id)}}
                              positive-text="确定"
                              negative-text="取消"
                            
                            >
                              {{
                                trigger:()=>  <a style="color:#C91019;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                                default:()=> '是否删除当前选项?'
                              }}
                            
                            </NPopconfirm>
                          </div>
                        ]
                    }
                },
            }
          ],
        },
        new RequestPaging("/smm/smmHboilSellPlan/page", "post")
      );
      nextTick().then(() => {
        reset({
          
        })
      });
    
    return {
      bind,
      gridRef,
      filterData,
      query,
      reset,
      actionModel,
      show,
      handDel

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
