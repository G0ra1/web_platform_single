<template>
    <n-layout has-sider class="nw-layout-full">

        <n-layout-sider
            bordered
            width="225"
            content-style="padding: 5px;"
            style="margin-right: -1px"
        >
           
            <nw-app-tree-grid rootName="全部" @callback="handleTree" />
        </n-layout-sider>
        <n-layout class="nw-layout-full">
            <n-layout-header>
                <n-space :size="5" style="padding: 0 5px">
                    <!-- <n-button size="small" >编辑</n-button>
            <n-button size="small" disabled type="warning" >编辑</n-button> -->
                    <n-button :disabled="!appInfo.appCode" type="primary" @click="handleCreate">
                        <template #icon>
                            <nw-icon name="icon-n-y-add" :size="14" />
                        </template>
                        新建
                    </n-button>
                    <n-button :disabled="!appInfo.appCode" type="primary" @click="showGenerator">
                        <template #icon>
                            <nw-icon name="icon-n-y-add" :size="14" />
                        </template>
                        生成基础功能
                    </n-button>
                    <!-- <n-button type="warning" >编辑</n-button> -->
                </n-space>
                <n-space :size="5" style="padding: 0 5px">
                    <n-input-group>
                        <n-input :value="filterData.formNameCh || ''"
                            @update:value="(d: string) => filterData.formNameCh = d" placeholder="输入查询文本"
                            :style="{ width: '150px' }" />
                        <n-button type="primary" @click="query()">
                            搜索
                        </n-button>
                    </n-input-group>
                    <n-button title="重置" type="warning" @click="refresh()">
                        <template #icon>
                            <nw-icon name="icon-n-y-refresh" />
                        </template>
                    </n-button>
                    <n-button title="导入">
                        <template #icon>
                            <nw-icon name="icon-n-y-import" />
                        </template>
                    </n-button>
                    <n-button title="导出">
                        <template #icon>
                            <nw-icon name="icon-n-y-export" />
                        </template>
                    </n-button>
                    <n-button title="打印" @click="gridRef?.print()">
                        <template #icon>
                            <nw-icon name="icon-n-y-print" />
                        </template>
                    </n-button>
                    <n-button>
                        <template #icon>
                            <nw-icon name="icon-n-y-column" />
                        </template>
                    </n-button>
                </n-space>
            </n-layout-header>
            <n-layout-content>
                <vxe-grid v-bind="bind" ref="gridRef">
                </vxe-grid>
            </n-layout-content>
        </n-layout>
    </n-layout>
    <GeneratorFunction ref="gfRef" @callback="refresh" />
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, inject } from 'vue'

import {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    useDialog
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, NwAppTreeGrid, Page } from '@platform/main'
import GeneratorFunction from './components/generator/index.vue'
import { del, unLinkWf } from './api/index'
export default defineComponent({
    components: {
        NLayout,
        NLayoutSider,
        NLayoutHeader,
        NLayoutContent,
        NButton,
        NSpace,
        NwIcon,
        NTag,
        NInput,
        NInputGroup,
        NDrawer,
        NDrawerContent,
        GeneratorFunction,
        NwAppTreeGrid
    },
    setup() {
        
        const md = Page.getMenuData()
        // const { pm = '' } = Utils.parseQuery(window.location.search.substring(1))
        const appInfo = ref<any>({
            ...md
        })
        const dialog = useDialog()
        const gfRef = ref()
        const {
            bind,
            gridRef,
            filterData,
            query,
            reset
        } = new VxeHelper.VxeGridPaging<any>({
            // border: 'inner',
            columns: [
                { type: "checkbox", width: 35 },
                { field: "fullName", title: "功能名称" },
                { field: "code", title: "功能编码" },
                { field: "remarks", title: "描述", showHeaderOverflow: true },
                {
                    title: "关联流程",
                    slots: {
                        default: ({ row }: any) => {
                            // camundaProcdefKey
                            if (row.camundaProcdefKey) {
                                return [
                                    <div style="display:flex; align-items: center">
                                        已关联流程 &lt;{row.camundaProcdefKey}&gt;&nbsp;
                                        <NButton
                                            text
                                            title="取消关联流程"
                                            type='error'
                                            onClick={() => {
                                                dialog.error({
                        class: 'text-modal-dialog',
                                                    title: '解除流程关联',
                                                    icon: () => <NwIcon name="icon-n-y-unlink" size={14} />,
                                                    content: `确定解除与流程<${row.camundaProcdefKey}>的关联？`,
                                                    positiveText: '确定',
                                                    negativeText: '取消',
                                                    maskClosable: false,
                                                    onMaskClick: () => {
                                                    },
                                                    onPositiveClick: () => {
                                                        unLinkWf(row.id).then(r => {
                                                            console.log('===rr', r)
                                                            if (r) {
                                                                (window as any).NaiveMessage.success('解除关联成功')
                                                            }
                                                            refresh()
                                                        })

                                                    },
                                                })
                                            }}
                                        >
                                        {{
                                            default: () => [<NwIcon
                                                name="icon-n-y-unlink"
                                                size={16}
                                            />]
                                        }}
                                        </NButton>
                                    </div>    
                                ]
                            } else {
                                return [
                                    `未关联流程`
                                ]
                            }
                        }
                    }
                },
                { field: "type", width: '70px',title: "类型", showHeaderOverflow: true },
                { field: "createUserName", width: '110px', title: "创建人", showHeaderOverflow: true },
                { field: "createTime", title: "创建时间", showHeaderOverflow: true },
                {
                    title: '操作',
                    showHeaderOverflow: true,
                    width: '120px',
                    slots: {
                        default: ({ row }) => {
                            return [
                                <NButton
                                    size="tiny"
                                    style="margin-right: 5px;"
                                    onClick={() => {
                                        window.location.href = `/web-main/pages/function-editor.html?action=edit&id=${row.id}`
                                    }}
                                >{{
                                    default: () => '编辑'
                                }}</NButton>,
                                <NButton
                                    size="tiny"
                                    type="error"
                                    onClick={() => {

                                        dialog.error({
                        class: 'text-modal-dialog',
                                            title: '删除',
                                            content: '确定删除？',
                                            positiveText: '确定',
                                            negativeText: '取消',
                                            maskClosable: false,
                                            onMaskClick: () => {
                                            },
                                            onPositiveClick: () => {
                                                //
                                                del(row.id).then(r => {
                                                    refresh()
                                                })

                                            },
                                        })
                                    }}
                                >{{
                                    default: () => '删除'
                                }}</NButton>
                            ];
                        },
                    }
                }
            ]
        }, new RequestPaging(
            '/main/mdmCpts/list',
            'post'
        )
        )
        nextTick().then(() => {
            refresh()
        })
        const refresh = () => {
            reset({
                appCode: appInfo.value.appCode
            })
        }
        return {
            appInfo,
            gfRef,
            bind,
            gridRef,
            filterData,
            query,
            handleCreate() {
                window.location.href = `/web-main/pages/function-editor.html?action=create&appCode=${appInfo.value.appCode}&appName=${appInfo.value.appName}`
            },
            showGenerator() {
                gfRef.value.show(appInfo.value)
            },
            refresh,
            handleTree (d: any) {
                console.log('=====dd====', d)
                if (d.appType === 2) {
                appInfo.value = d
                } else if (d.appType === 0) {
                // root
                appInfo.value = { appCode: '' }
                }
                refresh()
            }
        }
    }
})

</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
