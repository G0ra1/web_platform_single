
<template>
    <div class="wrapper-menu" style="padding-left: 24px; padding-top: 10px;">
        <nw-home :isActive="ActiveApp === 'portalframe'" />
    <!-- <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'home'//SiderMenuAction === 'home'
        }" @click="handleHome">
            <nw-icon name="icon-n-n-home" :size="24" />
                                                                                                                          </div> -->
        <!-- 有消息数量气泡 -->
        <n-badge :value="messageNum" :max="99">
            <div :class="{
                'wrapper-menu-item': true,
                'action': ActiveApp === 'task'//SiderMenuAction === 'home'
            }" @click="handleTask">

                <nw-icon name="icon-n-n-renwu" :size="24" />

                任务
            </div>
        </n-badge>

        <!-- 无消息数量气泡 -->
    <!-- <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'task'//SiderMenuAction === 'home'
        }" @click="handleTask">

            <nw-icon name="icon-n-n-renwu" :size="24" />

            任务
                                        </div> -->


    <!-- <div
            :class="{
                // 特殊选项弹出菜单
                'wrapper-menu-app-in': true,
                'action': AppInAction
            }"
            @click="AppInAction = !AppInAction"
        >
            <nw-icon name="icon-n-y-3box" :size="24" />
                                                                                                                            </div> -->


    <!-- <div :class="{
            'wrapper-menu-item': true,
            'action': ActiveApp === 'date'//SiderMenuAction === 'home'
        }" @click="handleDate">
            <nw-icon name="icon-w_calendar" :size="24" />
            日程
                                                                                                                            </div> -->
    <!-- <div :class="{
            'wrapper-menu-item': true
        }" @click="handleStudy">
            <nw-icon name="icon-w_calendar" :size="24" />
            学习系统
                                                                                                                            </div> -->
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
            <nw-icon name="icon-n-y-files" :size="24" />
                                                                                                                            </div> -->
        <n-scrollbar>
            <template v-for="item in AppItemSort" :key="item.appCode">
                <template v-if="item.type === 'group'">
                    <div :class="{
                        'wrapper-menu-item': true,
                        'action': ActiveApp === item.appCode
                    }" :title="item.appName" @click="handleApp(item)">
                        <nw-icon :name="item.icon" :size="24" />
                        {{ item.appName.substring(0, 4) }}
                    </div>

                </template>
                <template v-else-if="item.type === 'iframe-inner'">
                    <div :class="{
                        'wrapper-menu-item': true,
                        'action': ActiveApp === item.appCode
                    }" :title="item.appName" @click="handleIframeInner(item)">
                        <nw-icon :name="item.icon" :size="24" />
                        {{ item.appName.substring(0, 4) }}
                    </div>
                </template>
                <template v-else-if="item.type === 'iframe-modal'">
                    <div :class="{
                        'wrapper-menu-item': true
                    }" :title="item.appName" @click="handleIframeModal(item)">
                        <nw-icon :name="item.icon" :size="24" />
                        {{ item.appName.substring(0, 4) }}
                    </div>
                </template>
                <template v-else-if="item.type === 'new-window'">
                    <div :class="{
                        'wrapper-menu-item': true
                    }" :title="item.appName" @click="handleNewWindow(item)">
                        <nw-icon :name="item.icon" :size="24" />
                        {{ item.appName.substring(0, 4) }}
                    </div>
                </template>
            </template>
            <!-- 这里判断类型 -->
        </n-scrollbar>
    </div>
    <n-modal v-model:show="FrameModalVisible" style="padding: 0;background:#fff;" :show-icon="true" :mask-closable="true"
        :closable="true" bordered>
        <div class="wf-run-frame nw-model-media">
            <nw-icon name="icon-n-y-close" style="position: absolute;right: 10px; top: 10px;cursor: pointer"
                @click="FrameModalVisible = false" />
            <iframe style="border:none;width: 100%;height:100%;" :src="FrameModalUrl" />
        </div>

    </n-modal>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick, computed } from 'vue'
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
    NModal,
    useMessage,
    NBadge
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import { AppItems, setMenuHash, ActiveApp, activeTick, setMenuHashIframeInner } from './store'
import { wftodotaskCount, unreadNumber } from '../api'

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
            if (e.newURL && e.newURL.indexOf('frame/date-manage') > 0) {
                ActiveApp.value = 'date'
            } else if (e.newURL && e.newURL.indexOf('frame/task') > 0) {
                ActiveApp.value = 'task'
            }
        }
        if (window.location.hash === '#frame/task') {
            ActiveApp.value = 'task'
        }
        const messageNum = ref<number>(0)
        const getMessageNum = () => {
            wftodotaskCount().then(n => {
                messageNum.value += Number(n)
            })
            unreadNumber().then(n => {
                messageNum.value += Number(n)
            })
        }
        // 获取消息数量
        // getMessageNum()
        const FrameModalVisible = ref(false)
        const FrameModalUrl = ref('')
        return {
            FrameModalVisible,
            FrameModalUrl,
            ActiveApp,
            AppItems,
            messageNum,
            AppItemSort: computed(() => {
                return AppItems.value.sort((a, b) => a.sort - b.sort)
            }),
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
            },
            handleIframeInner(app: any) {
                ActiveApp.value = app.appCode
                setMenuHashIframeInner(app)
            },
            handleIframeModal(app: any) {
                FrameModalVisible.value = true
                FrameModalUrl.value = app.url
            },
            handleNewWindow(app: any) {
                window.open(
                    app.url,
                    '_blank',
                    'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
                )
            }
        }
    }
})

</script>

<style scoped></style>
