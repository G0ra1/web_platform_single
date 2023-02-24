<script setup lang="ts">
import { Input as TInput, InputAdornment as TInputAdornment, Tree as TTree, TreeNodeModel, Loading as TLoading } from "tdesign-vue-next";
import { items, filterText, search, handleFilterByText, handleClick, selectKey, expandLevelRef, handleExpand, initItems, isLoading } from "./OrgTree";
import { SearchOutline } from '@vicons/ionicons5';
import { NButton, NIcon, NSpace, NModal, NScrollbar } from 'naive-ui';
import TreeVo from "../vo/TreeVo";
import OrgVo from "../vo/OrgVo";
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

//定义组件接受的类型
interface Porps {
    show: boolean;
    orgType?: number;
    level?: number;
    expandLevel?: number;
}

const porps = withDefaults(defineProps<Porps>(), {
    show: false
})

const emit = defineEmits<{
    (e: 'click', value: OrgVo): void;
    (e: 'update:show', value: boolean): void;
    (e: 'choose', value: OrgVo): void;
}>();

const _handleClick = (context: { node: TreeNodeModel<TreeVo>; e: MouseEvent }) => {
    const value = handleClick(context);
    if (value) {
        emit('click', value);
    }
}

const update = (d: boolean) => {
    emit('update:show', d);
}

/* const submit = () => {
    emit('update:show', false);
}; */

const choose = (node: any) => {
    const orgVo: OrgVo = JSON.parse(node.value);
    orgVo.orgName = node.label;
    emit('choose', orgVo);
    emit('update:show', false);
};

defineExpose({ initItems });
</script>
<template>

    <n-modal :show="porps.show" @update:show="(d) => update(d)" preset="dialog" :mask-closable="true" :closable="true"
        style="width: 600px; height: 720px; padding: 0" title="请选择组织机构"
        @after-enter="async () => await initItems(porps.orgType, porps.level, porps.expandLevel)">
        <t-loading size="small" :loading="isLoading">
            <div class="tdesign-tree-base">
                <n-space :size=0>
                    <t-input-adornment prepend="组织名称">
                        <t-input v-model="filterText" :style="{ 'width': '470px' }" :placeholder="selectKey"
                            clearable />
                    </t-input-adornment>
                    <n-button type="primary" ghost @click="search">
                        <template #icon>
                            <n-icon>
                                <SearchOutline />
                            </n-icon>
                        </template>
                    </n-button>
                </n-space>
                <n-scrollbar style="max-height: 640px; height: 640px">
                    <t-tree :data="items" :filter="handleFilterByText" hover line :expandLevel="expandLevelRef"
                        @click="_handleClick" @expand="handleExpand" expandMutex :transition="false" z-index="99"
                        :expand-on-click-node="true" style="padding: 10px;">
                        <template #operations="{ node }">
                            <n-button type="primary" size="tiny" quaternary @click="() => choose(node)"
                                style="margin-right: 10px;">
                                选择
                            </n-button>
                        </template>
                    </t-tree>
                </n-scrollbar>
                <!-- <n-space justify="end" style="margin-right: 10px;">
                    <n-button type="primary" @click="submit">
                        提交
                    </n-button>
                </n-space> -->
            </div>
        </t-loading>
    </n-modal>
</template>
<style>
body {
    --td-brand-color: rgb(189, 31, 31);
    --td-brand-color-focus: #fff;
}
</style>