<script setup lang="ts">
import { NLayout, NLayoutSider, NDrawer, NDrawerContent, } from 'naive-ui';
import CommTree from "./components/CommTree.vue";
import { currentOrgId, handleClick } from "./App";

</script>
<template>
    <n-drawer :show="true" width="100%" :placement="'right'">
        <n-drawer-content>
            <n-layout has-sider class="nw-layout-full">
                <n-layout-sider bordered width="360" collapse-mode="transform">
                    <CommTree @click="handleClick" />
                </n-layout-sider>
                <!-- 右侧主体内容 -->
                <n-layout class="nw-layout-full">
                    {{ currentOrgId }}
                </n-layout>
            </n-layout>
        </n-drawer-content>
    </n-drawer>
</template>

