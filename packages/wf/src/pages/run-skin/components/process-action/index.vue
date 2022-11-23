<template>
    <n-space :size="[5, 5]">
        <n-button @click="closeAll" type="default" size="small" >关闭</n-button>
        <template v-if="props.actionType !== 'done'" >

            <save v-if="rule.wf_save" />

            <handle v-if="['todo', 'create', 'draft'].includes(props.actionType) && rule.wf_handle" />

            <reject v-if="props.actionType === 'todo' && rule.wf_back" />

            <control v-if="false" />
        </template>
    </n-space>
</template>

<script lang='tsx'>

import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
    NSpace,
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

import Save from './save/index.vue'
import Handle from './handle/index.vue'
import Reject from './reject/index.vue'
import Control from './control/index.vue'
import {
    onComplete
} from '../../store/index'
export default defineComponent({
    props: {
        actionType: {
            type: String,
            default: () => 'todo'
        }
    },
components: {
    NSpace,
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
    Save,
    Handle,
    Reject,
    Control
},
setup(props,context) {
    const rule = ref<any>({
        wf_save: false, // 保存
        wf_handle: false, // 办理
        wf_back: false, // 驳回
        wf_revoke: false, // 撤回
        wf_del_process: false, // 流程删除
        wf_act_process: false, // 流程激活
        wf_end_process: false, // 流程终止
        wf_sus_process: false, // 流程挂起
        wf_turn_process: false, // 转办
        wf_urge_process: false, // 催办
        wf_notify_process: false, // 知会
        wf_send_read_process: false, // 传阅
        wf_countersign: false // 加签
    })
    return {
        props,
        rule,
        // 设定
        setRule (d: any) {
            d.forEach((d: any) => {
                rule.value[d.buttonCode] = true
            })
        },
        closeAll () {
            onComplete('close')
        }
    };
}
});
</script>
<style lang="less">

</style>