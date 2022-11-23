<template>
    <div class="error-content">
        <nw-icon :size="45" :name="props.icon" />
        <div class="text">{{props.text}}</div>
    </div>
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
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'
// 
export default defineComponent({
    props: {
        icon: {
            type: String,
            default: 'icon-y-empty'
        },
        text: {
            type: String,
            default: ''
        }
    },
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
    },
    setup(props) {
        return {
            props
        }
    }
})

</script>

<style lang="less" scoped>
.error-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .text {
        font-size: 16px;
        font-weight: bold;
        color: var(--n-blue3);
        padding: 0 10px;
    }
}
</style>
