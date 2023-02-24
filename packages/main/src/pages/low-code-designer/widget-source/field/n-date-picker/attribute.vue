<template>
    <n-form ref="formRef" size="small" :model="{}" :rules="{}" label-placement="top">
        <n-form-item label="是否可清除" >
            <!-- <n-radio-group size="small" v-model:value="config!.options.clearable.value" >
                <n-radio
                    value="top"
                    label="顶部"
                />
                <n-radio
                    value="left"
                    label="左侧"
                />
            </n-radio-group>
             -->
             <n-switch size="small"  v-model:value="props.value.options.clearable.value"></n-switch>
        </n-form-item>
        <n-form-item label="锁定" >
             <n-switch size="small"  v-model:value="props.value.options.disabled.value"></n-switch>
        </n-form-item>
        <n-form-item label="日期类型" >
            <n-select 
                size="small" 
                v-model:value="props.value.options.type.value" 
                :options="[
                    {value:'date',label:'date'},
                    {value:'datetime',label:'datetime'},
                    {value:'daterange',label:'daterange'},
                    {value:'datetimerange',label:'datetimerange'},
                    {value:'month',label:'month'},
                    {value:'monthrange',label:'monthrange'},
                    {value:'year',label:'year'},
                    {value:'quarter',label:'quarter'},
                ]"
            />
        </n-form-item>
        <n-form-item label="时间格式" >
            <n-select 
                size="small" 
                v-model:value="props.value.options.format.value" 
                :options="[
                    {value:'yyyy',label:'yyyy'},
                    {value:'yyyy-MM',label:'yyyy-MM'},
                    {value:'MM-dd',label:'MM-dd'},
                    {value:'yyyy-MM-dd',label:'yyyy-MM-dd'},
                    {value:'yyyy-MM-dd HH:mm:ss',label:'yyyy-MM-dd HH:mm:ss'},
                ]"
            />
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
