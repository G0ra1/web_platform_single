<template>
  <n-layout class="fe-card">
    <n-layout-header class="fe-card-header">
      <div class="fe-card-edit fe-card-action" style="width: 200px">
        <div style="margin-right: 5px;">标题</div>
        <nw-icon name="icon-bianji1" :size="18" />
      </div>
    </n-layout-header>
    <n-layout-content
      class="fe-card-content"
      content-style="width: 100%;overflow: visible;"
    >
      <div class="fe-card-edit fe-card-form fe-card-action" >
        <div style="margin-right: 5px;">表单页面</div>
        <nw-icon name="icon-bianji1" :size="18" />
      </div>
    </n-layout-content>
    <n-layout-footer class="fe-card-footer">
      <div class="fe-card-edit fe-card-btn fe-card-btn-left fe-card-action" style="width: 50%;margin-right: 10px;">
        添加左按钮
      </div>
      <div class="fe-card-edit fe-card-btn fe-card-btn-right fe-card-action" style="width: 50%">
        添加右按钮
      </div>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NSpin
} from 'naive-ui'

import { NwIcon } from '@platform/main'

export default defineComponent({
  name: "DSplitterDemoDirection",
  components: {
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NSpin,
    NwIcon
  },
  setup() {
    return {
    }
  },
})
</script>

<style lang="less" scoped> 
.fe-card {
  flex: 0 0 360px;
  margin: 0 auto;
  border: 1px solid #333;
  box-shadow: 1px 1px 4px 1px rgb(143, 143, 143);
  &-header {
    display: flex;
    justify-content: start;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    padding: 10px;
  }
  &-form {
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    margin-right: 5px;
    height: 350px;
    box-sizing: border-box;
    justify-content: center;
  }
  &-edit {
    display: flex;
    align-items: center;
    border: 2px dashed rgb(172, 172, 172);
    padding: 0 5px;
    cursor: pointer;
    // box-shadow: 1px 1px 11px 1px #01579b;
  }
  &-action:hover {
    border: 2px solid rgb(156, 156, 156);
    box-shadow: 1px 1px 11px 1px #01579b;
  }
  &-btn {
    justify-content: center;
    &-left {

    }
    &-right {

    }
    &-empty:hover {
      border: 2px solid rgb(156, 156, 156);
      box-shadow: 1px 1px 11px 1px #01579b;
    }
  }
}
</style>
