
<template>
    <div class="header-menu">
        <!-- <n-tabs size="small" type="line" pane-class="hide-pane" pane-style="display:none;background:red">
            <n-tab-pane v-for="item in menuItems" :name="item.menuName" :key="item.id">
            </n-tab-pane>
        </n-tabs> -->
        <div
            :title="item.label"
            v-for="item in menuItems"
            :class="{
                'menu-item': true,
                'active': (EnableMenuLevel2 ? ActiveMenuLevel2.key : ActiveMenu.key) === item.key
            }"
            :key="item.key"
            @click="() => handleMenu(item)"
        >
            <div class="text">{{item.label}}</div>
        </div>
    </div>
</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NConfigProvider,
    NSpace,
    NTag,
    NDivider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInputGroupLabel,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NScrollbar,
    useMessage,
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import {
    menuItems,
    handleMenu,
    ActiveMenu,
    ActiveMenuLevel2,
    EnableMenuLevel2
} from '../store'

export default defineComponent({
    // props: {
    // },
    components: {
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NDivider,
        NButton,
        NSpace,
        NwIcon,
        NInput,
        NInputGroup,
        NInputGroupLabel,
        NDrawer,
        NScrollbar,
        NDrawerContent
    },
    setup (props) {
        return {
            menuItems,
            handleMenu,
            ActiveMenu,
            ActiveMenuLevel2,
            EnableMenuLevel2
        }
    }
})

</script>

<style scoped lang="less">
.hide-pane {
    display: none;
}
.header-menu {
    display: flex;
    height: 100%;
    >.menu-item {
        display: flex;
        align-items: center;
        line-height: 1;
        padding: 0 10px;
        max-width: 100px;
        border-top: 4px solid #fff;
        cursor: pointer;
        &:hover {
            background: var(--light-gray4)
        }
        &.active {
            border-top: 4px solid var(--layout-header-menu-border-top-color);
            background: var(--light-gray4);
            >.text {
                // font-weight: bold;
                color: var(--layout-header-menu-border-top-color);
            }
        }
        >.text {
            font-size: 14px;
            color: var(--gray1);
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
