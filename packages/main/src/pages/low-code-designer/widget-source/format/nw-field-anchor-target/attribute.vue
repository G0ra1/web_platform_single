<template>
    <n-form
    label-placement="top"
    size="small"
    >
        <n-form-item label="标题" >
            <n-input size="small"  v-model:value="props.value.options.label.value"></n-input>
        </n-form-item>
        <n-form-item label="锚点" >
            <div style="">
                列表
            </div>
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
