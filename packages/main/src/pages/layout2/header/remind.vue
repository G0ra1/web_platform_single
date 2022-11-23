
<template>
    <n-button title="提醒" text @click="handle" style="display: flex; align-items: center">
        <nw-icon color="#4C90F0" :size="26" name="icon-n-n-lingdang" />
    </n-button>
    <chat ref="ChatRef" />
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

import Chat from '../components/real-time-msg/index.vue'

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
        Chat
    },
    setup (props) {
        const ChatRef = ref()
        return {
            ChatRef,
            handle () {
                ChatRef.value.show()
            }
        }
    }
})

</script>

<style scoped lang="less">
</style>
