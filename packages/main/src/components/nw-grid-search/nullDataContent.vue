<template>
    <div class="null-data">
        暂无筛选筛选条件，你可以通过<n-button @click="addGroup" quaternary type="primary">添加条件组</n-button> 来增加条件
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, defineComponent, nextTick, h } from "vue";
import { NButton } from 'naive-ui'
import { addGroup } from './index.ts'
</script>
<style lang="less" scoped>
.null-data {
    position: absolute;
    height: 30px;
    width: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
}
</style>