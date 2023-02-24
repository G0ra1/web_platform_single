<script lang="ts" setup>
import { NScrollbar, NLayout, NLayoutHeader, NLayoutContent } from "naive-ui";
import { columns, data, FormModal, vxeTableRef } from "./App";
import { Loading as TLoading } from "tdesign-vue-next"
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
const _vxeTableRef = vxeTableRef;
const { } = new FormModal();
</script>
<template>
    <n-layout has-sider class="nw-layout-full">
        <!-- 右侧主体内容 -->
        <n-layout class="nw-layout-full">
            <n-layout-content style="padding: 0 15px">
                <vxe-grid border round show-overflow :data="data" :columns="(columns as any)" size="mini"
                    highlight-hover-row height="100%" ref="_vxeTableRef">
                </vxe-grid>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>