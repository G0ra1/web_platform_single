<template>
    
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

import HandleModal from './modal.vue'

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
        };
    }
});
</script>
<style lang="less">

</style>