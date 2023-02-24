<script lang="ts" setup>
import { NForm, NInput, NFormItem, NDivider, NSwitch, NText, NInputNumber, NLayout, NLayoutContent } from "naive-ui";
import { FormModal, vxeTableRef, data } from "./App";
import { FormPermissionEnum } from "@platform/main"
import { Loading as TLoading } from "tdesign-vue-next"
const { formRef, rules, dataPermits,columns } = new FormModal();
const _vxeTableRef = vxeTableRef;
</script>
<template>
    <n-layout has-sider class="nw-layout-full">
        <!-- 右侧主体内容 -->
        <n-layout class="nw-layout-full">
            <n-layout-content style="padding: 0 15px">
                <vxe-grid border round show-overflow :data="data" :columns="(columns as any)" size="mini"
                    :scroll-x={enabled:true}
                    highlight-hover-row height="100%" ref="_vxeTableRef">
                </vxe-grid>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>