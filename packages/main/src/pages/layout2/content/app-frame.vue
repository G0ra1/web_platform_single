<template>
    <error v-if="ErrorMsg.flag" :text="ErrorMsg.text" :icon="ErrorMsg.icon" />
    <template v-if="FrameVisible">
        <n-layout has-sider class="nw-layout-full">
            <n-layout-sider v-if="isShowSider" width="200" content-style="padding: 0;" style="margin-right: -1px;"
                collapse-mode="width" :collapsed-width="0">
                <SideMenu />
            </n-layout-sider>
            <n-layout-content class="app-content">
                <n-layout class="nw-layout-full">
                    <n-layout-content class="app-content">
                        <iframe class="app-frame" :src="FrameUrl" />
                    </n-layout-content>
                </n-layout>
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

<style scoped lang="less">
.app-frame {
    display: block;
    border: unset;
    width: 100%;
    height: 100%;
}

.app-content {
    background-color: #eee;
}

.nw-layout-full.n-layout .n-layout-header.title-header {
    height: 50px;
    font-size: 14px;
    padding-left: 20px;
    border-left: 15px solid #eee;
    border-top: 15px solid #eee;
    border-right: 15px solid #eee;
    

    background: rgba(250, 250, 250, 100);

    .icon-border {
        box-sizing: border-box;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--n-red6);
        text-align: center;
        line-height: 30px;
        color: #fff;
    }
}
</style>
