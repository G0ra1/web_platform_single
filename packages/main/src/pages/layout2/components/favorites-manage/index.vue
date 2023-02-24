<template>
    <n-drawer v-model:show="active" width="900" :placement="placement">
        <n-drawer-content title="收藏夹管理">
            <n-form ref="formRef" :model="model" style="padding:10px" :rules="rules" label-placement="left"
                label-width="80" require-mark-placement="right-hanging">
                <n-form-item label="分类名称" path="typeName" v-if="modelType === 1">
                    <n-input v-model:value="model.typeName" placeholder="请输入分类" />
                </n-form-item>
                <n-form-item label="标题" path="articleName" v-if="modelType === 2">
                    <n-input v-model:value="model.articleName" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="链接" path="webUrl" v-if="modelType === 2">
                    <n-input v-model:value="model.webUrl" placeholder="请输入链接" />
                </n-form-item>
                <n-form-item label="分类" path="typeId" v-if="modelType === 2">
                    <n-select v-model:value="model.typeId" filterable placeholder="选择分类" :options="options" />
                </n-form-item>
                <n-form-item path="inputValue">
                    <n-space justify="end" style="width: 100%;">
                        <n-button style="width:80px" type="primary" @click="() => { model = {}; modelType = 1 }">新建分类
                        </n-button>
                        <n-button style="width:80px" type="primary" @click="() => { model = {}; modelType = 2 }">新建链接
                        </n-button>
                        <n-button style="width:80px" type="primary" @click="() => save()">保存</n-button>
                        <n-button style="width:80px" type="warning" @click="() => delHandle(model.id)">删除</n-button>
                    </n-space>
                </n-form-item>
            </n-form>
            <n-tree block-line :data="treeData" v-if="treeData.length > 0" @update:selected-keys="treeSelect"
                selectable />
        </n-drawer-content>
    </n-drawer>
</template>
<script lang="jsx">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { model, rules, formRef, save, modelType, options, getTypeList, treeData, treeSelect, message, delHandle, sContext } from './store.tsx'
import {
    NModal,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTag,
    useMessage,
    NImage,
    NBadge,
    NText,
    NDrawer,
    NDrawerContent,
    NSpace,
    NTree
} from 'naive-ui'

export default defineComponent({
    components: {
        NDrawer,
        NDrawerContent,
        NForm,
        NFormItem,
        NInput,
        NButton,
        NSpace,
        NSelect,
        NTree

    },
    emit: ['callback'],
    setup(props, context) {
        sContext.value = context
        message.value = useMessage()
        const active = ref(false)
        const show = () => {
            active.value = true
        }
        onMounted(() => {
            getTypeList()
        })
        return {
            active,
            show,
            model,
            modelType,
            save,
            treeData,
            treeSelect,
            message,
            options,
            delHandle,
            sContext,
            rules,
            formRef
        }
    }
})
</script>

<style lang="less">

</style>