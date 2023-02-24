<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NTreeSelect,
  NFormItemGi,
  NDivider,
  NSwitch,
  NGrid,
  NText,
  NInputNumber,
  NDatePicker,
  NSelect,
  NScrollbar,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInputGroup,
  useDialog,
  NButton,
} from "naive-ui";
import {
  FormModal, bind, gridRef, filterData, reset, initDialog, queryData, intQueryData
} from "./App";
import { NwIcon, FormPermissionEnum } from "@platform/main";
import { nextTick, inject } from "vue";
const { formRef, dataModel, rules, dataPermits } = new FormModal();

initDialog(useDialog());

//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject("Emitter") as any).on("function-complete", () => {
  intQueryData(dataModel);
  reset(queryData.value);
});

//页面加载完成后，调用的重置方法
nextTick().then(() => { });
</script>
<template>
  <n-grid :cols="24" :x-gap="24">
    <n-form-item-gi :span="24" label="" path="">
      <h3 class="card-title">检测结果</h3>
    </n-form-item-gi>
  </n-grid>
  <n-layout has-sider class="nw-layout-full">
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" :ref="(d: any) => gridRef = d"> </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
</template>