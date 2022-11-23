<template>
    <error v-if="ErrorMsg.flag" :text="ErrorMsg.text" :icon="ErrorMsg.icon" />
    <n-layout v-else has-sider class="nw-layout-full">
        <n-layout-sider v-if="LayoutType === 'app'" bordered width="140" content-style="padding: 0;"
            style="margin-right: -1px" show-trigger collapse-mode="width" :collapsed-width="0">
            <SideMenu />
        </n-layout-sider>
        <n-layout-content>
            <iframe class="app-frame" :src="FrameUrl" />
        </n-layout-content>
    </n-layout>
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

import { registerListener, init, FrameUrl, ErrorMsg, LayoutType } from './store'

import Error from './error.vue'

registerListener()
init()
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
            LayoutType,
            FrameUrl,
            ErrorMsg
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
</style>
