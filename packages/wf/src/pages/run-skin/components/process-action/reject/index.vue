<template>
    <n-button type="primary" @click="sendHandle">驳回</n-button>
    <reject />
</template>

<script lang='tsx'>

import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
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
NSelect,
NForm,
NFormItem,
NPopconfirm,
NMessageProvider

} from "naive-ui";

import { NwIcon } from '@platform/main'

import Reject from './modal/index.vue'

import { sendHandle } from './store'

export default defineComponent({
components: {
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
    NSelect,
    NForm,
    NFormItem,
    NPopconfirm,
    NMessageProvider,
    NwIcon,
    Reject
},
setup(props,context) {

    return {
        sendHandle
    };
}
});
</script>
<style lang="less">

</style>