
<template>
    <div >
        <!-- <collection /> -->
    </div>
    <n-space align="center" >
        <collection />
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

import { AppInAction } from '../store'

import Collection from '../../layout2/header/collection.vue'

import Logout from './logout.vue'
import Remind from './remind/index.vue'
import RealTime from './real-time/index.vue'

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
        Collection,
        Logout,
        Remind,
        RealTime
    },
    setup (props) {
        return {
            AppInAction
        }
    }
})

</script>

<style scoped lang="less">
</style>
