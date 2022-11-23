
<template>
    <n-popover
        :show="visible"
        :themeOverrides="{
            padding: '0'
        }"
        placement="bottom"
        trigger="click"
        @update:show="handleShow"
    >
      <template #trigger>
        <n-badge :value="Count" :max="99">
            <n-button title="提醒" text style="display: flex; align-items: center">
                <nw-icon color="#4C90F0" :size="26" name="icon-n-n-lingdang" />
            </n-button>
        </n-badge>
      </template>
      <n-spin class="remind" :show="false">
        <n-tabs
            :tabs-padding="10"
            size="small"
            type="line"
            animated
            :themeOverrides="{
                panePaddingSmall: '0'
            }"
            class="remind-tabs"
            pane-class="remind-tab-pane"
            :pane-style="{
                height: '100%'
            }"
        >
            <n-tab-pane name="task" tab="任务">
                <div style="height: 100%;">
                    <task />
                </div>
            </n-tab-pane>
            <n-tab-pane name="msg" tab="消息">
                消息
            </n-tab-pane>
            <!-- <n-tab-pane name="jay chou" tab="周杰伦">
                七里香
            </n-tab-pane> -->
        </n-tabs>
        <n-button
            text
            style="position: absolute; right: 8px; top: 10px;"
            @click="visible = false"
        >
            <nw-icon color="#888" :size="12" name="icon-n-y-close" />
        </n-button>
      </n-spin>
    </n-popover>
</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NButton,
    NPopover,
    NTabs,
    NTabPane,
    NSpin,
    NBadge
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import Task from './task/index.vue'

import { init, Count } from './store'

export default defineComponent({
    // props: {
    // },
    components: {
        NButton,
        NPopover,
        NTabs,
        NTabPane,
        NSpin,
        NBadge,
        NwIcon,
        Task
    },
    setup (props) {
        const visible = ref<boolean>(false)
        init()
        return {
            Count,
            visible,
            theme: {
                padding: '0'
            },
            // handle () {
            //     ChatRef.value.show()
            // },
            handleShow () {
                visible.value = true
                init()
            }
        }
    }
})

</script>

<style lang="less">
    .remind {
        &.n-spin-container {
            width: 300px;
            height: 360px;
            >.n-spin-content {
                height: 100%;
            }
        }
        &-tabs {
            height: 100%;
            display: flex;
            flex-direction: column;
            >.n-tabs-pane-wrapper {
                flex: 1;
            }
        }
        &-tab-pane {

        }
    }
</style>
