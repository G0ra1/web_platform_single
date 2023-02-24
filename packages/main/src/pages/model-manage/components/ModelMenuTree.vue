<script lang="ts" setup>
import { NDataTable, NModal, NLayout, useMessage } from 'naive-ui'
import { data, columns, rowKey, initDialog, initMenuTree, isLoading } from "./ModelMenuTree.ts"

initDialog(useMessage());

/**
 * 定义组件接受的类型
 */
interface Porps {
    show: boolean,
    modelEntityId: string
}

//使用了定义的语法糖，限定属性类型，并给一个默认值
//const { show = false, modelEntityId } = defineProps<Porps>()
const porps = withDefaults(defineProps<Porps>(), {
    show: false,
    modelEntityId: ""
})

//为当前组件声明一个update:show事件
//const emit = defineEmits(['update:show'])
const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>();

/**
 * 当前组件里面的内容发生改变的时候，这里的内容就是modal发生改变时，触发当前组件的update:show发生事件调用，
 * 这样在外面调用这个组件的父组件就能监听或绑定相应事件
 * @param d 
 */
const update = (d: boolean) => {
    emit('update:show', d);
}

</script>
<template >
    <n-modal :show="porps.show" @update:show="(d) => update(d)" preset="dialog" :mask-closable="true" :closable="true"
        title="请选择要配置到哪个业务菜单或页面下" style="width: 1000px; height: 700px; padding: 0"
        @after-enter="initMenuTree(porps.modelEntityId)">
        <div style="height: 700px; position: relative">
            <n-layout position="absolute">
                <n-layout has-sider position="absolute" style="top: 35px; bottom: 10px">
                    <n-layout content-style="padding: 24px;">
                        <n-data-table :columns="columns" :data="data" :row-key="rowKey" :bottom-bordered="false"
                            children-key="kids" :bordered="false" :loading="isLoading">
                            <template #loading>
                                asdfasf
                            </template>
                        </n-data-table>
                    </n-layout>
                </n-layout>
            </n-layout>
        </div>
    </n-modal>
</template>