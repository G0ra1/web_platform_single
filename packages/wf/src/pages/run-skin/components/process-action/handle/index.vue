<template>
    <n-button type="primary" @click="handleSubmit">办理</n-button>
    <handle-modal ref="HandleModalRef" />
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

import HandleModal from './modal/index.vue'

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
    HandleModal
},
setup(props,context) {
    const HandleModalRef = ref()
    return {
        HandleModalRef,
        handleSubmit () {
            sendHandle()
        }
    };
}
});
</script>
<style lang="less">

</style>