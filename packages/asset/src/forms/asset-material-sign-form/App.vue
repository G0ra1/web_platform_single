<template>
    <n-config-provider abstract :locale="zhCN" :date-locale="dateZhCN">
        <n-message-provider>
            <Form />
        </n-message-provider>
    </n-config-provider>
</template>
<style>
</style>
<script setup>
import {
    NMessageProvider,
    NConfigProvider,
    zhCN,
    dateZhCN
} from 'naive-ui'
import Form from './Form.vue'
</script>