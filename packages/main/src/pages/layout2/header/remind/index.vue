
<template>
    <n-popover :show="visible" :themeOverrides="{
        padding: '0'
    }" placement="bottom" trigger="click" @update:show="handleShow">
        <template #trigger>
            <n-badge :value="Count" :max="99" class="my-badge">
                <div style="width: 40px;text-align: center;">
                    <n-button title="提醒" text style="display: flex; align-items: center">
                        <nw-icon color="#4C90F0" :size="20" name="icon-n-y-xinfeng" />
                    </n-button>
                </div>
            </n-badge>
        </template>
        <n-spin class="remind" :show="false">
            <n-tabs :tabs-padding="10" size="small" type="line" animated :themeOverrides="{
                panePaddingSmall: '0'
            }" class="remind-tabs" pane-class="remind-tab-pane" :pane-style="{
    height: '100%'
}">
                <n-tab-pane name="task" tab="消息">
                    <div style="height: 100%;">
                        <task />
                    </div>
                </n-tab-pane>
                <!-- <n-tab-pane name="msg" tab="任务">
                    消息
                </n-tab-pane> -->
                <!-- <n-tab-pane name="jay chou" tab="周杰伦">
                七里香
            </n-tab-pane> -->
            </n-tabs>
            <n-button text style="position: absolute; right: 8px; top: 10px;" @click="visible = false">
                <nw-icon color="#888" :size="12" name="icon-n-y-close" />
            </n-button>
        </n-spin>
    </n-popover>
    
    <wf-run-modal ref="WfRunModalRef" />
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

import { WfRunModal } from '@platform/wf'

import Task from './task/index.vue'

import { init, Count, loadMsg, WfRunModalRef } from './store'

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
        Task,
        WfRunModal
    },
    setup(props) {
        const visible = ref<boolean>(false)
        init()
        return {
            WfRunModalRef,
            Count,
            visible,
            theme: {
                padding: '0'
            },
            // handle () {
            //     ChatRef.value.show()
            // },
            handleShow() {
                visible.value = true
                loadMsg()
            }
        }
    }
})

</script>

<style lang="less">
.my-badge {
    .n-badge-sup {
        left: 66%;
    }
}

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

    &-tab-pane {}
}
</style>
