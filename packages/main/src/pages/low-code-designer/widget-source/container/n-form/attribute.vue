<template>
    <n-form ref="formRef" size="small" :model="{}" :rules="{}" label-placement="top">

        <n-form-item label="标签位置" >
            <n-radio-group size="small" v-model:value="config.options.labelPlacement.value" >
                <n-radio
                    value="top"
                    label="顶部"
                />
                <n-radio
                    value="left"
                    label="左侧"
                />
            </n-radio-group>
            
        </n-form-item>
        <n-form-item label="标签对齐" >
            <n-radio-group size="small" v-model:value="config.options.labelAlgin.value" >
                <n-radio
                    value="left"
                    label="左"
                />
                <n-radio
                    value="center"
                    label="中"
                />
                <n-radio
                    value="right"
                    label="右"
                />
            </n-radio-group>
            
        </n-form-item>
        <n-form-item label="标签宽度" >
            <n-input-number :value="+config.options.labelWidth.value.replace('px', '')" @update:value="(d: number) => config.options.labelWidth.value = `${d}px`" >
                <template #suffix>
                    px
                </template>
            </n-input-number>
        </n-form-item>
        
        <n-form-item label="尺寸" >
            <n-radio-group size="small" v-model:value="config.options.size.value" >
                <n-radio
                    value="small"
                    label="小"
                />
                <n-radio
                    value="medium"
                    label="中"
                />
                <n-radio
                    value="large"
                    label="大"
                />
            </n-radio-group>
            
        </n-form-item>
        <!-- <n-form-item >
            <template #label>
                是否使用多页签
            </template>
            <n-space style="width: 100%" justify="space-between">
                <n-switch size="small" :value="isTabs" @update:value="updateIsTabs"></n-switch>
                <n-button v-if="isTabs" type="primary" size="tiny" @click="createTab">新建页签</n-button>
            </n-space>
        </n-form-item>
        <template v-if="isTabs">
            <vxe-grid
            ref="gridRef"
            v-bind="gridOption">
            <template #label="{row}">
            {{row.options.tab.value}}
            </template>
            <template #label-edit="{row}">
            <n-input v-model:value="row.options.tab.value" />
            </template>
            <template #anchor="{row}">
                <n-switch size="small" />
            </template>
            </vxe-grid>
        </template> -->
        <n-form-item >
            <template #label>
                是否使用锚点
                <n-switch size="small" :value="isAnchor" @update:value="updateAnchor"></n-switch>
            </template>
            <!-- <n-switch size="small" :value="" @update:value=""></n-switch> -->
        </n-form-item>
        <!-- <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
        />
        </n-form-item>
        <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="重复密码"
        >
        <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
        />
        </n-form-item>
        <n-row :gutter="[0, 24]">
        <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
            <n-button
                :disabled="model.age === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
                验证
            </n-button>
            </div>
        </n-col>
        </n-row> -->
    </n-form>
</template>

<script setup lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h, toRaw } from "vue";
import { Utils } from "@platform/main"
import { designer } from '../../../store/index'

import WidgetAttribute from '../../../components/widget-attribute/index.vue'

// const props = withDefaults(defineProps<{
//   value: any
// }>(), {
//     value: () => ({})
// })
const {
    ActiveWidget,
} = designer
const config = ActiveWidget.value!
// const config = toRaw(ActiveWidget.value!).config
// 是否多页签
const isTabs = computed(() => {
    return ActiveWidget.value!.slots?.default[0].tagName === 'n-tabs'
})    
// const content = ActiveWidget.value!.slots?.default[0].slots?.default[0].slots?.default[0]
// console.log('content=',content)     
const updateIsTabs = (d: boolean) => {
    if (d) {
        ActiveWidget.value!.slots!.default = [{
                key: 'n-tabs_1',
                type: 'n-tabs',
                category: 'container',
                icon: 'icon-n-y-tabs',
                label: '页签',
                slots: {
                    default: [
                        {
                            key: 'n-tab-pane_1',
                            type: 'n-tab-pane',
                            category: 'container',
                            icon: 'icon-n-y-tabs',
                            label: '页签面板',
                            internal: true,
                            slots: {
                                default: ActiveWidget.value!.slots!.default
                            },
                            options: {
                                name: {
                                    type: 'string',
                                    value: 'tab1'
                                },
                                tab: {
                                    type: 'string',
                                    value: '页签1'
                                }
                            }
                        }
                    ]
                },
                options: {

                }
        }]

    } else {
        // 取消tabs
        const content = ActiveWidget.value!.slots?.default[0].slots?.default[0].slots?.default
        ActiveWidget.value!.slots!.default = content!

    }
}
const gridRef = ref<any>()
const createTab = () => {
    const panes = ActiveWidget.value!.slots!.default[0].slots!.default
    panes.push({
        key: `n-tab-pane_${Utils.radomKey()}`,
        type: 'n-tab-pane',
        category: 'container',
        icon: 'icon-n-y-tabs',
        label: '页签面板',
        internal: true,
        slots: {
            default: [
                {
                    key: 'n-scrollbar_1',
                    type: 'n-scrollbar',
                    category: 'container',
                    icon: 'icon-n-y-scrollbar',
                    label: '滚动',
                    internal: true,
                    slots: {
                        default: []
                    },
                    options: {}
                }
            ]
        },
        options: {
            name: {
                type: 'string',
                value: `tab_${Utils.radomKey()}`
            },
            tab: {
                type: 'string',
                value: `页签${panes.length + 1}`
            }
        }
    })
    gridRef.value.reloadData(ActiveWidget.value!.slots!.default[0].slots!.default)
}

const gridOption = ref<any>({
      border: true,
      size: 'mini',
      rowConfig: {
        keyField: "assetsId",
      },
      editConfig: {
        enabled: true,
        trigger: 'click',
        mode: 'row',
        showStatus: true
      },
      data: ActiveWidget.value!.slots!.default[0].slots!.default,
      columns: [
        {
            field: "itemName", title: "标签名", minWidth: 120, showHeaderOverflow: true, showOverflow: true,
            editRender: {},
            slots: {
                default: 'label',
                edit: 'label-edit'
                // default: ({ row }: any) => {
                //     return row.options.tab.value
                // }
            }
        },
        {
          field: "",
          title: "锚点",
          fixed: "right",
          width: 50,
          showHeaderOverflow: true,
          slots: {
            default: 'anchor'
          },
        },
      ]
    })
const isAnchor = computed(() => {
    const anchor = ActiveWidget.value!.slots?.default[1]
    return !!(anchor && anchor.tagName === 'n-anchor');
})
const updateAnchor = (d: boolean) => {
    if (d) {
        ActiveWidget.value!.slots!.default[1] = {
            key: 'n-anchor_root',
            type: 'n-anchor',
            tagName:  'n-anchor',
            isCustomDesigner: false,
            category: 'container',
            icon: 'icon-n-y-anchor',
            label: '侧导航',
            slots: {
                default: [
                    {
                        key: 'n-anchor-link_0',
                        type: 'n-anchor-link',
                        tagName:  'n-anchor-link',
                        isCustomDesigner: false,
                        category: 'container',
                        icon: 'icon-n-y-anchor',
                        label: '导航',
                        options: {
                            title: '基础字段',
                            href: '#jichuziduan'
                        }
                    }
                ]
            },
            options: {
                offsetTarget: {
                    type: 'string',
                    value: '.widget-group'
                },
                style: {
                    type: 'string',
                    value: 'position: absolute; width: 120px; right: 0px; top: 20px;padding-right: 20px;'
                },
                showRail: {
                    type: 'boolean',
                    value: true
                },
                showBackground: {
                    type: 'boolean',
                    value: true
                },
            }
        }
    } else {
        // 删除
        ActiveWidget.value!.slots!.default.splice(1, 1)
    }
}
</script>

<style lang="less" scoped></style>
