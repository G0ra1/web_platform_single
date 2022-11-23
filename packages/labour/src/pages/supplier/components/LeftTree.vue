<script lang="ts" setup>
import { NSpin, NTree, useDialog } from 'naive-ui'
import { leftTreeInstance, initDialog } from './LeftTree'
const { data, isLoadingRef, nodeProps } = leftTreeInstance;
initDialog(useDialog());
</script>
<template>
    <n-spin size="small" :show="isLoadingRef">
        <n-tree block-line :data="data" :default-expand-all=true :node-props="nodeProps" />
    </n-spin>
</template>