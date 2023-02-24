<script setup lang="ts">
import { nextTick } from "vue"
import { Input as TInput, InputAdornment as TInputAdornment, Tree as TTree, TreeNodeModel, Loading as TLoading, InputGroup as TInputGroup } from "tdesign-vue-next";
import { items, filterText, search, handleFilterByText, handleClick, protocolSelect, selectKey, expandLevelRef, handleExpand, initItems, isLoading } from "./CommTree";
import { SearchOutline } from '@vicons/ionicons5';
import { NButton, NIcon, NSpace } from 'naive-ui';
import TreeVo from "../vo/TreeVo";
import MdmOrgVo from "../vo/MdmOrgVo";
import { TreeType } from "../model/Porps";

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
//定义组件接受的类型
interface Porps {
    orgType?: number;
    level?: number;
    expandLevel?: number;
    treeType?: TreeType;
}

const porps = defineProps<Porps>();

const emit = defineEmits<{
    (e: 'click', value: string | MdmOrgVo): void;
    (e: 'choose', value: MdmOrgVo): void;
}>();

const _handleClick = (context: { node: TreeNodeModel<TreeVo>; e: MouseEvent }) => {
    const value = handleClick(context);
    if (value) {
        emit('click', value);
    }
}

nextTick(async () => {
    await initItems(porps.orgType, porps.level, porps.expandLevel, porps.treeType);
});
</script>
<template>
    <t-loading size="small" style="height:100%" :loading="isLoading">
        <div class="tdesign-tree-base">

            <t-input-group style="display: flex;background: #fff;">
                <t-input-adornment :prepend="protocolSelect">
                    <t-input v-model="filterText" :placeholder="selectKey" clearable />
                </t-input-adornment>
                <n-button type="primary" ghost @click="search">
                    <template #icon>
                        <n-icon>
                            <SearchOutline />
                        </n-icon>
                    </template>
                </n-button>
            </t-input-group>
            <div class="tree-box">
                <t-tree :data="items" :height="500" :filter="handleFilterByText" hover line
                    :expandLevel="expandLevelRef" @click="_handleClick" @expand="handleExpand" expandMutex
                    :transition="false" :activable="true" />
            </div>

        </div>
    </t-loading>
</template>
<style lang="less">
body {
    --td-brand-color: rgb(189, 31, 31);
    --td-brand-color-focus: #fff;
    --td-brand-color-light: #C910191A;
}

.tdesign-tree-base {
    padding: 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .t-input-group {
        height: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding: 5px;
        border-bottom: 1px solid #ccc;

        .t-input {
            height: 30px;
        }
    }

    .t-input-adornment {
        flex: 1;
    }

    .tree-box {
        height: ~"calc(100vh - 90px)";
        overflow: auto;
    }

    .t-tree {
        background: #fff;
        min-height: 100%;
        height: 100%;
        flex: 1;
        overflow: auto;
        overflow-x: hidden;
        font-size: 12px;
    }
}
</style>