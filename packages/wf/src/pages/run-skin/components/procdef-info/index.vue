<template>
    <div class="skin-card">
    
        <div class="title">
            <nw-icon name="icon-y-cbox" :size="22" />流程信息
        </div>
        <div class="content">
            <div class="field-item">
                <label><nw-icon name="icon-n-y-treebox" :size="18" />服务分类</label>
                {{dataModal.procdefTypeName}}
            </div>
            <div class="field-item">
                <label><nw-icon name="icon-n-y-box" :size="18" />服务名称</label>
                {{dataModal.procdefName}}
            </div>
            <div class="field-item">
                <label><nw-icon name="icon-n-y-warning" :size="18" />重要程度</label>
                {{dataModal.priority}}
            </div>
            <div class="field-item">
                <label><nw-icon name="icon-n-y-flag" :size="18" />优先级</label>
                <n-select size="tiny" :options="[{label: '最高', value: '1'}]" ></n-select>
            </div>
        </div>

    </div>
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

type ProcdefInfoInst = {
    procdefTypeName: string,
    procdefName: string,
    priority: string,
    bizPriority: string,
}

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
},
setup(props,context) {
    const dataModal = ref<ProcdefInfoInst>({
        procdefTypeName: '测试1',
        procdefName: '测试2',
        priority: '测试3',
        bizPriority: '',
    })
    return {
        dataModal,
        setValue (data: ProcdefInfoInst) {
            dataModal.value = data
        }
    };
}
});
</script>
<style lang="less">

</style>