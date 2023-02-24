<script setup lang="ts">
import { NLayout, NLayoutSider, NDrawer, NDrawerContent, } from 'naive-ui';
import { CommTree } from '@platform/mdm'
import { handleClick } from "./components/List";
import List from "./components/List.vue";
import DetailList from './DetailList.vue'
</script>
<template>
    <n-drawer :show="true" width="100%" :placement="'right'">
        <n-drawer-content>
            <n-layout has-sider class="nw-layout-full">
                <n-layout-sider bordered width="360" collapse-mode="transform">
                    <CommTree :treeType="'All'" :org-type="1" :expand-level="0" @click="handleClick" />
                </n-layout-sider>
                <!-- 右侧主体内容 -->
                <n-layout class="nw-layout-full">
                    <!--{{ currentNodeId }}-->
                    <List />
                </n-layout>
            </n-layout>
        </n-drawer-content>
    </n-drawer>
</template>

