<script lang="ts" setup>
import { NLayout, NLayoutSider, NDrawer, NDrawerContent, NLayoutContent, NButton, NLayoutHeader, NSpace, NH3, NText } from 'naive-ui'
import ModelLeftTree from "./ModelLeftTree.vue"
import { modelLeftTreeRef, active, close, show, isView } from "./ModelContent.ts"
import ModelFieldTable from "./ModelFieldTable.vue"
import { submitField, addRow, addWfRow, syncField, viewSqlEvent } from "./ModelFieldTable"
import ModelSQLView from "./ModelSQLView.vue"
defineExpose({ show });
</script>
<template>
    <n-drawer v-model:show="active" width="100%" :placement="'right'" :z-index="999">
        <n-drawer-content>
            <n-layout has-sider class="nw-layout-full">
                <!-- 左树 -->
                <n-layout-sider bordered width="220" collapse-mode="transform" show-trigger="arrow-circle">
                    <ModelLeftTree ref="modelLeftTreeRef" />
                </n-layout-sider>
                <!-- 右侧主体内容 -->
                <n-layout class="nw-layout-full">
                    <n-layout-header>
                        <n-space justify="start" style="margin-left: 30px">
                            <n-h3 prefix="bar" align-text>
                                <n-text type="primary">
                                    表字段维护
                                </n-text>
                            </n-h3>
                        </n-space>
                        <n-space justify="end" :inline="true" size="small" style="margin-right: 30px">
                            <n-button type="primary" size="small" @click="addRow" v-if="isView">添加</n-button>
                            <n-button type="primary" size="small" @click="addWfRow" v-if="isView">添加工作流字段</n-button>
                            <n-button type="primary" size="small" @click="syncField" v-if="isView">同步</n-button>
                            <n-button type="primary" size="small" @click="viewSqlEvent" v-if="isView">SQL预览</n-button>
                            <n-button type="primary" size="small" @click="submitField" v-if="isView">提交</n-button>
                            <n-button type="primary" size="small" @click="close">关闭</n-button>
                        </n-space>
                    </n-layout-header>
                    <n-layout-content v-if="isView" style="padding: 0 15px">
                        <ModelFieldTable />
                        <ModelSQLView />
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </n-drawer-content>
    </n-drawer>
</template>