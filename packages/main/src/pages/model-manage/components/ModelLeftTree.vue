<script lang="ts" setup>
import { NSpin, NTree, useDialog, useMessage } from 'naive-ui'
import { data, isLoadingRef, renderSwitcherIcon, nodeProps, initDialog } from './ModelLeftTree.ts'
import ModelEntityTable from './ModelEntityTable.vue'

/* defineExpose({ initTree }); */
initDialog(useDialog(), useMessage());
</script>
<template>
  <n-spin size="small" :show="isLoadingRef">
    <n-tree block-line :data="data" :default-expand-all=true :render-switcher-icon="renderSwitcherIcon"
      :node-props="nodeProps" />
  </n-spin>
  <ModelEntityTable />
</template>