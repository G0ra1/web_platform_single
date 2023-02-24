<template>
    <n-form
    label-placement="top"
    size="small"
    >
        <n-form-item label="是否可清除" >
            <n-switch size="small"  v-model:value="props.value.options.clearable.value"></n-switch>
        </n-form-item>
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
