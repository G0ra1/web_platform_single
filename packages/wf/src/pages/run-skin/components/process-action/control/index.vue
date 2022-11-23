<template>
    <n-popover trigger="hover" :show-arrow="false" style="padding: 0">
        <template #trigger>
            <n-button type="primary">
                <nw-icon name="icon-n-n-sys" :size="16" />
            </n-button>
        </template>
        <div style="display: flex; flex-direction: column;padding: 5px;">
            <n-button type="info" style="margin-bottom: 5px;">流程挂起</n-button>
            <n-button type="success" style="margin-bottom: 5px;">流程激活</n-button>
            <n-button type="warning" style="margin-bottom: 5px;">流程终止</n-button>
            <n-button type="error" style="margin-bottom: 5px;">流程删除</n-button>
        </div>
    </n-popover>
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
NMessageProvider,
NPopover,
NSpace

} from "naive-ui";

import { NwIcon } from '@platform/main'

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
    NPopover,
    NSpace
},
setup(props,context) {

    return {

    };
}
});
</script>
<style lang="less">

</style>