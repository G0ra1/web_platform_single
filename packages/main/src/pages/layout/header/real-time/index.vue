
<template>
    <div class="realtime" >
        <n-button title="提醒" text @click="handle" style="display: flex; align-items: center">
            <nw-icon color="#4C90F0" :size="26" name="icon-n-y-xinhao" />
        </n-button>
        <div class="state">
            <nw-icon v-if="false" class="state loading" :size="14" name="icon-n-y-xinhao" />
            <nw-icon v-if="false" class="error"  :size="14" name="icon-n-n-error" />
            <nw-icon class="state success" :size="14" name="icon-n-n-yes" />
        </div>
    </div>
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
    useDialog
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper, Db } from '@platform/main'

import { Ws } from './store.ts'

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
        NDrawerContent
    },
    setup (props) {
        const {
            state
        } = new Ws(useDialog())

        return {
            state,
            handle () {
            }
        }
    }
})

</script>

<style scoped lang="less">
.realtime {
    position: relative;
    .state {
        position: absolute;
        right: -2px;
        bottom: -2px;
        display: block;
        font-size: 0;
        background-color: #fff;
        .loading {

        }
        .error {
            color: var(--n-red2)
        }
        .success {
            
            color: var(--n-green2)
        }
    }
}
</style>
