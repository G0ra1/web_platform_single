<template>
    <n-form ref="formRef" size="small" :model="{}" :rules="{}" label-placement="top">
        <n-form-item label="锁定" >

             <n-switch size="small"  v-model:value="props.value.options.disabled.value"></n-switch>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">

import { WidgetNS } from '../../../model/widget.d'

const props = defineProps<{
    value: WidgetNS.Config,
}>()
</script>

<style lang="less" scoped></style>
