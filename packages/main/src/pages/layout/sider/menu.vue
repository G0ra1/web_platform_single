
<template>
    <div class="wrapper-menu">
        <nw-home :isActive="ActiveApp === 'portalframe'" />
        <!-- <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'home'//SiderMenuAction === 'home'
        }" @click="handleHome">
            <nw-icon name="icon-n-n-home" :size="26" />
        </div> -->
        <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'task'//SiderMenuAction === 'home'
        }" @click="handleTask">
            <nw-icon name="icon-w_biji-" :size="26" />
            任务
        </div>
        <!-- <div
            :class="{
                // 特殊选项弹出菜单
                'wrapper-menu-app-in': true,
                'action': AppInAction
            }"
            @click="AppInAction = !AppInAction"
        >
            <nw-icon name="icon-n-y-3box" :size="26" />
        </div> -->


        <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'date'//SiderMenuAction === 'home'
        }" @click="handleDate">
            <nw-icon name="icon-w_calendar" :size="26" />
            日程
        </div>
        <div :class="{
            'wrapper-menu-item': true
        }" @click="handleStudy">
            <nw-icon name="icon-w_calendar" :size="26" />
            学习系统
        </div>
    </div>
    <div class="wrapper-menu app-menu">
        <div :class="{
            'app-menu-btn': true,
        }">
            <nw-icon name="icon-n-n-up" :size="18" color="#ccc" />
        </div>
        <!-- <div
            :class="{
                'wrapper-menu-item': true,
                'action': SiderMenuAction === 'files'
            }"
            @click="SiderMenuAction = 'files'"
        >
            <nw-icon name="icon-n-y-files" :size="26" />
        </div> -->
        <n-scrollbar>
            <div v-for="item in AppItems" :key="item.appCode" :class="{
                'wrapper-menu-item': true,
                'action': ActiveApp === item.appCode
            }" :title="item.appName" @click="handleApp(item)">
                <nw-icon :name="item.icon" :size="26" />
                {{item.appName.substring(0,4)}}
            </div>
        </n-scrollbar>
    </div>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NConfigProvider,
    NSpace,
    NTag,
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
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NPopover,
    NScrollbar,
    useMessage,
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import { AppItems, setMenuHash, ActiveApp, activeTick } from './store'

import NwHome from './home.vue'

export default defineComponent({

    components: {
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NButton,
        NSpace,
        NwIcon,
        NInput,
        NInputGroup,
        NDrawer,
        NDrawerContent,
        NPopover,
        NScrollbar,
        NwHome
    },
    setup() {
        activeTick()
        window.onhashchange = function (e) {
            if (e.newURL.indexOf('frame/date-manage') > 0) {
                ActiveApp.value = 'date'
            }
        }
        return {
            ActiveApp,
            AppItems,
            handleHome() {
                ActiveApp.value = 'home'
                window.location.hash = '#frame/portal'
            },
            handleApp(App: any) {
                // window.location.hash = '#frame/date-manage'
                setMenuHash(App)
            },
            handleDate() {
                ActiveApp.value = 'date'
                window.location.hash = '#frame/date-manage'
            },
            handleTask() {
                ActiveApp.value = 'task'
                window.location.hash = '#frame/task'
            },
            handleStudy() {
                window.open(
                `/web-study/pages/study-students.html#/homePage`,
                '_blank',
                'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
                )
            }
        }
    }
})

</script>

<style scoped>

</style>
