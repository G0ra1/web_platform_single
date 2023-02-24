<template>
    <n-button type="primary" @click="print" class="liuchengBtn" ghost>打印</n-button>
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

import { FormFrameRef } from '../../../store/index'

export default defineComponent({
components: {
    NButton
},
setup(props,context) {

    return {
        print () {
            FormFrameRef.value.runScript('printScript')
        }
        
    };
}
});
</script>
<style lang="less">

</style>