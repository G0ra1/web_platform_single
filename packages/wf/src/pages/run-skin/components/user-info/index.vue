<template>
    <div class="skin-card">
    
        <div class="title">
            <nw-icon name="icon-y-blueuser" :size="22" />申请人信息
        </div>
        <div class="content">
            <div class="field-item">
                <label><nw-icon name="icon-n-y-user" :size="18" />用户名</label>
                {{dataModal.createUserName}}
            </div>
            <div class="field-item">
                <label><nw-icon name="icon-n-y-users" :size="18" />部门</label>
                {{dataModal.createUserParentDeptName}}
            </div>
            <div class="field-item">
                <label><nw-icon name="icon-n-y-org" :size="18" />机构</label>
                {{dataModal.createUserParentOrgName}}
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

type UserInfoInst = {
    createUserName: string,
    createUserParentDeptName: string,
    createUserParentOrgName: string
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
    const dataModal = ref<UserInfoInst>({
        createUserName: '',
        createUserParentDeptName: '',
        createUserParentOrgName: ''
    })
    return {
        dataModal,
        setValue (data: UserInfoInst) {
            dataModal.value = data
        }
    };
}
});
</script>
<style lang="less">

</style>