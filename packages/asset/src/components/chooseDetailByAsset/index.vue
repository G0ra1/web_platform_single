<script setup lang="ts">
import { ref } from "vue"
import { NButton, NSpace, NDivider, NModal, NInputGroup, NInputGroupLabel, NInput } from 'naive-ui';
import { detailTable, sourceData, checkedData, checkedDataIds, isLoading} from './index'
import { enterEvent, search,  selectChangeEvent, selectAllEvent, toggleExpandChangeEvent } from './index'
import IDto from "../../lib/dto/IDto";

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import { cloneDeep } from "lodash";

const detailTableRef = detailTable;
const tableLayout = ref('fixed');
//定义组件接受的类型
interface Porps {
    show: boolean;
    value?: Array<string>;
    columns: Array<any>;
    params: IDto;
    url: string[];
    title : string;
}

const porps = withDefaults(defineProps<Porps>(), {
    show: false,
})

//为当前组件声明一个update:show事件
//const emit = defineEmits(['update:show'])
const emit = defineEmits<{
    //(e: 'update:data', value: Array<Assets>): void,
    (e: 'update:show', value: boolean): void,
    (e: 'callback', value: any): void
}>();

/**
 * 当前组件里面的内容发生改变的时候，这里的内容就是modal发生改变时，触发当前组件的update:show发生事件调用，
 * 这样在外面调用这个组件的父组件就能监听或绑定相应事件
 * @param d 
 */
const update = (d: boolean) => {
    emit('update:show', d);
}

const submitEvent = () => {
    emit('update:show', false);
    console.log('submitEvent: =>{}',sourceData.value)
    emit('callback', cloneDeep(checkedData.value));
};

</script>

<template>
    <n-modal :show="porps.show" @update:show="(d) => update(d)" preset="dialog" :mask-closable="true" :closable="true"
        style="width: 1000px; height: 800px; padding: 0" :title="porps.title" @after-enter="async () => await enterEvent(porps)">
        <n-space vertical>
            <n-space justify="end" :inline="true" size="small" style="margin-left: 510px;margin-top: 8px">
                <n-input-group>
                    <n-input-group-label>查询条件</n-input-group-label>
                    <n-input :style="{ width: '350px' }" placeholder="请输入查询条件" v-model:value="params.searchCondition"
                        clearable />
                </n-input-group>
                <n-button type="primary" @click="search">
                    查询
                </n-button>
            </n-space>
            <div style="height: 90%; position: relative;">
                <!-- <t-table :data="sourceData" :columns="sourceColumns" :row-key="rowKey" :loading="isLoading"
                    :pagination="pages" :selected-row-keys="selectedRowKeys" bordered stripe @change="rehandleChange"
                    :max-height="238" @page-change="onPageChange" @select-change="onSelectChange" size="small">
                </t-table> -->
                <vxe-table
                    height="700"
                    ref="detailTableRef" :loading="isLoading"
                    :tree-config="{transform: true, rowField: 'id',accordion :true,
                                     parentField: 'assetsId',children:'detailList',reserve:true}"
                    :data="sourceData"
                    :edit-config="{trigger: 'click', mode: 'cell'}"
                    :row-config="{keyField: 'id'}"
                    :checkbox-config="{labelField: 'name', checkRowKeys: checkedDataIds}"
                    @checkbox-change="selectChangeEvent"
                    @checkbox-all="selectAllEvent"
                    @toggle-tree-expand="toggleExpandChangeEvent">
                </vxe-table>
            </div>
            <!-- <n-divider style="padding: 5px; margin: 5px 0;">
                下边为已选择物资信息
            </n-divider>
            <div style="height: 310px; position: relative;">
                <t-table :data="targetData" :columns="targetColumns" :row-key="rowKey" :loading="isLoading"
                    :selected-row-keys="selectedRowKeys" bordered stripe :max-height="298" :table-layout="tableLayout"
                    disableDataPage :table-content-width="tableLayout === 'fixed' ? undefined : '1600px'" size="small">
                    <template #operation="slotProps">
                        <NButton type="primary" size="tiny" secondary @click="targetClickEvent(slotProps)">删除
                        </NButton>
                    </template>
                </t-table>
            </div> -->
            <n-space justify="end" :style="{ 'margin-right': '10px' }">
                <n-button type="primary" @click="submitEvent">
                    提交
                </n-button>
            </n-space>
        </n-space>
    </n-modal>
</template>
<style>
body {
    --td-brand-color: rgb(189, 31, 31);
    --td-brand-color-focus: #fff;
}
</style>