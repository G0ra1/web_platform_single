<script setup lang="ts">
import { NLayout, NLayoutSider, NDrawer, NDrawerContent, } from 'naive-ui';
import { CommTree } from '@platform/mdm'
import { handleClick } from "./components/DetailList";
import DetailList from "./components/DetailList.vue";

</script>
<template>
    <n-drawer :show="true" width="100%" :placement="'right'">
        <n-drawer-content>
            <n-layout has-sider class="nw-layout-full">
                <n-layout-sider bordered width="360" collapse-mode="transform">
                    <CommTree :treeType="'All'" :org-type="1"  @click="handleClick" />
                </n-layout-sider>
                <!-- 右侧主体内容 -->
                <n-layout class="nw-layout-full">
                    <!--{{ currentNodeId }}-->
                    <DetailList />
                </n-layout>
            </n-layout>
        </n-drawer-content>
    </n-drawer>
</template>