<template>
    <error v-if="ErrorMsg.flag" :text="ErrorMsg.text" :icon="ErrorMsg.icon" />
    <template v-if="FrameVisible">
    <n-layout has-sider class="nw-layout-full">
        <n-layout-sider v-if="isShowSider" width="200" content-style="padding: 0;"
            style="margin-right: -1px" show-trigger collapse-mode="width" :collapsed-width="0">
            <SideMenu />
        </n-layout-sider>
        <n-layout-content class="app-content">
            <iframe class="app-frame" :src="FrameUrl" />
        </n-layout-content>
    </n-layout>
    <!-- <iframe class="app-frame" :src="FrameUrl" /> -->
    </template>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, inject } from 'vue'

import {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    useDialog
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwPickPage } from '@platform/main'
import SideMenu from './side-menu.vue'

import { registerListener, init, FrameUrl, ErrorMsg, LayoutType, FrameVisible, isShowSider } from './store'

import Error from './error.vue'

registerListener()
// 
export default defineComponent({
    components: {
        NLayout,
        NLayoutSider,
        NLayoutHeader,
        NLayoutContent,
        NButton,
        NSpace,
        NwIcon,
        NTag,
        NInput,
        NInputGroup,
        NDrawer,
        NDrawerContent,
        NwPickPage,
        SideMenu,
        Error
    },
    setup() {
        
        return {
            isShowSider,
            LayoutType,
            FrameUrl,
            ErrorMsg,
            FrameVisible
        }
    }
})

</script>

<style scoped>
.app-frame {
    display: block;
    border: unset;
    width: 100%;
    height: 100%;
}
.app-content {
    background-color: #f8f8f8;
}

</style>
