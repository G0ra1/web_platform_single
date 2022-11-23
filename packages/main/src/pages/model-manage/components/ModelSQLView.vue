<script lang="ts" setup>
import { NText, NH2, NLayout, NLayoutHeader, NSpace, NCode, NModal, NConfigProvider } from "naive-ui"
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import { isView, sqlRef } from "./ModelSQLView.ts"
hljs.registerLanguage('sql', sql);
</script>
<template>
    <n-modal v-model:show="isView" preset="dialog" :mask-closable="true" :closable="true"
        style="width: 1000px; height: 500px; padding: 0">
        <div style="height: 500px; position: relative">
            <n-layout position="absolute">
                <n-layout-header>
                    <n-space justify="start" style="margin-left: 30px">
                        <n-h2 prefix="bar" align-text>
                            <n-text type="primary">
                                SQL预览
                            </n-text>
                        </n-h2>
                    </n-space>

                </n-layout-header>

                <n-layout has-sider position="absolute" style="top: 35px; bottom: 10px">
                    <n-layout content-style="padding: 24px;">
                        <n-config-provider :hljs="hljs">
                            <n-space vertical :size="16">
                                <n-code :code="sqlRef" language="sql" />
                            </n-space>
                        </n-config-provider>
                    </n-layout>
                </n-layout>
            </n-layout>
        </div>
    </n-modal>
</template>