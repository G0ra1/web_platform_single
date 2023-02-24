<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInput,
  NSelect,
  NInputGroup,
  useDialog,
  NButton,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
} from "naive-ui";
import {
  bind,
  gridRef,
  filterData,
  query,
  refresh,
  reset,
  paramsArray,
  initDialog,
  orgnameOptions,
  majorOptions,
  ext10Options,
  downLinkStatusOptions,
  breakWriteStatusOptions,
  dxCountOptions,
  workNatureOptions,
} from "./App";
import { nextTick, inject } from "vue";
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject("Emitter") as any).on("function-complete", () => {
  reset({});
});

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  reset({});
});
</script>
<template>
  <n-layout has-sider class="nw-layout-full">
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区头部 start -->
      <n-layout-header class="nw-layout-header" style="height: auto">
        <n-space :size="5" style="padding: 0 5px">
          <!--放功能按钮的地方-->
          <NwFunctionPredefine
            code="labourWorkOrderInfoForm_add"
            :params="paramsArray"
          />
        </n-space>
      </n-layout-header>

      <n-layout-header class="nw-layout-header" style="height: auto">

          <n-form label-placement="left" :show-feedback="false" style="width:100%" label-width="auto">
            <n-grid :cols="24" :x-gap="24" y-gap="5">
              <n-form-item-gi label="年份" :span="8">
                <n-input
                  :value="filterData.workNumber || ''"
                  @update:value="(d) => (filterData.workNumber = d)"
                  placeholder="年份"
                  style="margin-right: 10px"
                />
              </n-form-item-gi>
              <n-form-item-gi label="月份" :span="8">
                <n-input
                  :value="filterData.workNumber || ''"
                  @update:value="(d) => (filterData.workNumber = d)"
                  placeholder="月份"
                  style="margin-right: 10px"
                />
              </n-form-item-gi>
              <n-form-item-gi label="工单号" :span="8">
                <n-input
                  :value="filterData.workNumber || ''"
                  @update:value="(d) => (filterData.workNumber = d)"
                  placeholder="工单号"
                  style="margin-right: 10px"
                />
              </n-form-item-gi>
              <n-form-item-gi label="工时下发单位" :span="8">
                <n-select
                    placeholder="工时下发单位"
                    :value="filterData.orgname || ''"
                    :options="orgnameOptions"
                    @update:value="(d)=>{filterData.orgname = d }"
                    :style="{
                        width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="工作内容" :span="8">
                <n-input
                  :value="filterData.workContent || ''"
                  @update:value="(d) => (filterData.workContent = d)"
                  placeholder="工作内容"
                  style="margin-right: 10px"
                />
              </n-form-item-gi>
           
              <n-form-item-gi label="专业" :span="8">
                <n-select
                    placeholder="专业"
                    :value="filterData.major || ''"
                    :options="majorOptions"
                    @update:value="(d)=>{filterData.major = d }"
                    :style="{
                        width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="技能专业" :span="8">
                <n-select
                    placeholder="技能专业"
                    :value="filterData.ext10 || ''"
                    :options="ext10Options"
                    @update:value="(d)=>{filterData.ext10 = d }"
                    :style="{
                        width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="下发审批状态" :span="8">
                <n-select
                    placeholder="下发审批状态"
                    :value="filterData.downLinkStatus || ''"
                    :options="downLinkStatusOptions"
                    @update:value="(d)=>{filterData.downLinkStatus = d }"
                    :style="{
                       width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="回填审批状态" :span="8">
                <n-select
                    placeholder="回填审批状态"
                    :value="filterData.breakWriteStatus || ''"
                    :options="breakWriteStatusOptions"
                    @update:value="(d)=>{filterData.breakWriteStatus = d }"
                    :style="{
                        width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="结算年月" :span="8">
                <n-input
                  :value="filterData.workNumber || ''"
                  @update:value="(d) => (filterData.workNumber = d)"
                  placeholder="工作票号"
                  
                />
              </n-form-item-gi>
              <n-form-item-gi label="大修轮次" :span="8">
                <n-select
                    placeholder="大修轮次"
                    :value="filterData.dxCount || ''"
                    :options="dxCountOptions"
                    @update:value="(d)=>{filterData.dxCount = d }"
                    :style="{
                        width: '100%' 
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi label="工作负责人" :span="8">
                <n-input
                  :value="filterData.workPerson || ''"
                  @update:value="(d) => (filterData.workPerson = d)"
                  placeholder="工作负责人"
                  style="margin-right: 10px"
                />
              </n-form-item-gi>
              <n-form-item-gi label="工作性质" :span="8">
                <n-select
                    placeholder="工作性质"
                    :value="filterData.workNature || ''"
                    :options="workNatureOptions"
                    @update:value="(d)=>{filterData.workNature = d }"
                    :style="{
                      
                    }"
                    @select="(d)=>{}"
                    >   
                </n-select>
              </n-form-item-gi>
              
              <n-form-item-gi :span="24" >
                <div style=" width: 100%; display: flex; justify-content: end; padding: 10px 0;" >
                    <n-button type="primary" @click="query()"> 搜索 </n-button>
                    <n-button title="重置" type="warning" @click="refresh()">
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
            </div>
              </n-form-item-gi>
            </n-grid>
          </n-form>
      </n-layout-header>

      <!-- 内容区头部 end -->
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" ref="gridRef"> </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
</template>