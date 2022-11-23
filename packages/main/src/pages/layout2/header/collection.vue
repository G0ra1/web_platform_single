
<template>
    <n-menu v-if="visible" class="shoucangjia" mode="horizontal" :on-update:value="updateMenu" :options="menuOptions"
        style="width:26px" />
    <favorites-manage ref="favoritesManageRef" @callback="callback"></favorites-manage>
</template>
<script lang="jsx">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick, onMounted } from 'vue'
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
    NPopover,
    NSpin,
    NMenu
} from "naive-ui";
import FavoritesManage from '../components/favorites-manage/index.vue'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'
import { favoritesTypeList } from '../api/index'

export default defineComponent({
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
        NPopover,
        NSpin,
        NMenu,
        FavoritesManage
    },
    setup(props) {
        const visible = ref(false)
        const isLoading = ref(false)
        const favoritesManageRef = ref(null)
        const menuOptions = ref(
            [
                {
                    label: '',
                    key: 'dance-dance-dance',
                    icon: () => {
                        return <NwIcon size={26} name="icon-y-shoucangjia"></NwIcon>
                    },
                    children: [
                    ]
                }
            ]
        )
        const clearUpMenuOptions = {
            label: () => { return <NButton type="primary" onClick={clearUpFavorite}>整理收藏夹</NButton> },
            key: 'clearUpFavorite'
        }
        const clearUpFavorite = () => {
            favoritesManageRef.value?.show()
        }
        const updateMenu = (key, item) => {
            if (item && item.webUrl) {
                window.open(item.webUrl)
            }
        }
        const init = () => {
            isLoading.value = true;
            favoritesTypeList({}).then(res => {
                console.log('-=res-=', res)
                res.forEach((d) => {
                    d.label = d.typeName
                    d.key = d.id
                    d.icon = () => {
                        return <NwIcon size={26} name="icon-y-wenjianjia"></NwIcon>
                    }
                    if (d.portalFavoritesContentVos.length > 0) {
                        d.portalFavoritesContentVos.forEach((e) => {
                            e.label = e.articleName
                            e.key = e.id
                            e.icon = () => {
                                return <NwIcon size={14} name="icon-y-lianjie"></NwIcon>
                            }
                        });
                        d.children = d.portalFavoritesContentVos
                    }
                })
                menuOptions.value[0].children = [clearUpMenuOptions, ...res]
                visible.value = true
                console.log(menuOptions.value, 'menuOptions.value')

            }).finally(() => {
                isLoading.value = false
            })
        }
        const callback = () => {
            init()
        }

        onMounted(() => {
            init()
        })
        return {
            visible,
            isLoading,
            menuOptions,
            clearUpFavorite,
            init,
            updateMenu,
            favoritesManageRef,
            callback
        }
    }
})

</script>

<style lang="less">
.shoucangjia.n-menu.n-menu--horizontal .n-menu-item-content {
    padding: 0;


}

.shoucangjia.n-menu.n-menu--horizontal {
    .n-dropdown-menu .n-dropdown-option {
        width: 180px;
    }
}
</style>
