
<template>
    <!-- <n-button title="登出" @click="handle">
        <nw-icon :size="16" name="icon-n-y-logout" />
    </n-button> -->
    <n-config-provider class="setting" style='line-height: 5px;'>
        <n-dropdown
            trigger="hover"
            @select="handleSelect"
            :options="options"
            placement="bottom-end"
        >
           <img :src="userInfo.photoFileId?`http://incloud.com/${userInfo.photoFileId}`:'../img/boy.png'" style="width:40px;height:40px;border-radius:50%" >
        </n-dropdown>
    </n-config-provider>
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
    NDropdown,
    NAvatar,
    NText
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper, Db } from '@platform/main'

import { AccountLogout } from '../api/index'


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
        NDrawerContent,
        NConfigProvider,
        NDropdown
    },
    setup (props) {
        const userInfo:any = ref({})
        // 从db中获取用户信息
        Db.get("userInfo").then((res:any) => {
            userInfo.value = res
        })
        
        const options = [
            {
                key: 'header',
                type: 'render',
                render: ()=> {
                    return h(
                        'div',
                            {
                             style: 'display: flex; align-items: center; padding: 8px 12px ;'
                            },
                        [
                            h(NwIcon, {
                                name: 'icon-y-blueuser',
                                size: 24,
                                style: 'margin-right: 12px;',
                            }),
                            h('div', null, [
                                h('div', null, [h(NText, { depth: 2 }, { default: () => userInfo.value.userNameCh })]),
                                h('div', { style: 'font-size: 12px;' }, [
                                h(
                                    NText,
                                    { depth: 3 },
                                    { default: () =>  userInfo.value.email }
                                )
                                ])
                            ])
                        ]
                    )
                },
            },

            {
                label: '个人中心',
                key: 'setting',
           
            },
            {
                label: '退出登录',
                key: "logout",
            }
         ]
       
        
         const handleSelect = (key :any) => {
            // alert(key)
            switch (key) {
                case 'logout':
                    // 这里登出
                    AccountLogout().then(() => {
                        window.location.href = '/web-main/pages/login.html'
                    })
                break;
                case 'setting':
                    window.location.href = '/web-main/pages/setting.html'
                    break;
            }
        }
        nextTick().then(() => {
             
        })
        return {
            options,
            handleSelect,
            userInfo,
            // handle () {
            //     AccountLogout().then(() => {
            //         window.location.href = '/web-main/pages/login.html'
            //     })
            // }
        }
    }
})

</script>

<style scoped lang="less">
</style>
