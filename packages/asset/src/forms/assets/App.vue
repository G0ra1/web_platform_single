<script lang="ts" setup>
import { NScrollbar, NDivider } from "naive-ui";
import { columns, _data, isLoading } from "./App";
import { NwFieldGrid } from "@platform/main"
import { Loading as TLoading } from "tdesign-vue-next"
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
</script>
<template>
    <t-loading size="small" :loading="isLoading">
        <n-scrollbar style="max-height: 300px">
            <NwFieldGrid v-model:value="_data" style="width: 1000px" :columns="columns" />
        </n-scrollbar>
    </t-loading>
    <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(_data, null, 2) }}</pre>
</template>