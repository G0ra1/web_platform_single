<template>
    <n-layout-header class="grid-search" :style="{
        maxHeight: visible ? '200px' : '0px'
    }">
        <div class="search-box" style="height: 200px;">
            <h5>筛选条件</h5>
            <nullDataContent></nullDataContent>
            <div class="bottom-box">
                <n-button>添加条件组</n-button>
            </div>
        </div>

    </n-layout-header>
</template>
<script setup lang="ts">
import { ref, reactive, computed, defineComponent, nextTick, h } from "vue";
import {
    NButton,
    NModal
} from 'naive-ui'
import nullDataContent from './nullDataContent.vue'
import type { SearchNS } from './type.d'
import SearchModel from './index.ts'
import { dateOperation, otherOperation } from './operation.ts'

const props = withDefaults(defineProps<{
    maxHeight: string,
    options: Array<SearchNS.option>
}>(), {
    maxHeight: '200px',
    options: () => ([])
})


const visible = ref<boolean>(false)
const { filedOptions } = new SearchModel(props.options)

console.log(dateOperation, otherOperation, 'contextOptions.value')

const toggle = () => {
    visible.value = !visible.value
}

defineExpose({
    toggle,
    visible
})
/**
请求参数示例
{
    param1: 
}
 */
</script>
<style lang="less">
.grid-search {
    transition: .3s;
    background-color: #fff;

    .search-box {
        position: relative;

        h5 {
            padding: 0;
            margin: 0;
        }

        .bottom-box {
            position: absolute;
            width: 100%;
            bottom: 0;

            .n-button {
                width: 100%;
            }
        }
    }
}
</style>
