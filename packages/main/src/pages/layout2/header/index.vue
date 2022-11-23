
<template>
    <div class="header" >
        <!-- 这里可能有标题 -->
        <div class="header-menulevel2" v-if="EnableMenuLevel2">
            <div class="title" @click="handleParentMenu">
                {{ActiveMenu.label}}
            </div>
            <div class="comp">
                <data-pick />
            </div>
        </div>
        <nw-menu></nw-menu>
    </div>
    <n-space align="center" >
        <real-time />
        <remind />
        <logout />
    </n-space>
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

import NwMenu from './menu/index.vue'
import Logout from './logout.vue'
import Remind from './remind/index.vue'
import RealTime from './real-time/index.vue'
import DataPick from './dataPick/index.vue'
import {
    registerListener,
    EnableMenuLevel2,
    ActiveMenu,
    handleParentMenu
} from './store'

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
        NDrawerContent,
        Logout,
        Remind,
        RealTime,
        NwMenu,
        DataPick
    },
    setup (props) {
        registerListener()
        return {
            EnableMenuLevel2,
            ActiveMenu,
            handleParentMenu
        }
    }
})

</script>

<style scoped lang="less">
.header {
    display: flex;
    height: 100%;
    &-menulevel2 {
        display: flex;
        align-items: center;
        padding-right: 10px;
        >.title {
            padding: 0 10px;
            font-size: 18px;
            border-right: 1px solid var(--gray5);
            margin-right: 10px;
            cursor: pointer;
        }
    }
}
</style>
