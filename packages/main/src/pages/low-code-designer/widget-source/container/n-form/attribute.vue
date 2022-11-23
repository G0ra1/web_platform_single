<template>
    <n-form ref="formRef" size="small" :model="{}" :rules="{}" label-placement="top">
        <n-form-item >
            <template #label>
                是否使用多页签 <n-switch size="small" :value="internalOptions.isTabs" @update:value="toggleIsTab"></n-switch>
            </template>
            
        </n-form-item>
        <n-form-item label="标签位置" >
            <n-radio-group size="small" v-model:value="config!.options.labelPlacement.value" >
                <n-radio
                    value="top"
                    label="顶部"
                />
                <n-radio
                    value="left"
                    label="左侧"
                />
            </n-radio-group>
            
        </n-form-item>
        <n-form-item label="标签对齐" >
            <n-radio-group size="small" v-model:value="config!.options.labelAlgin.value" >
                <n-radio
                    value="left"
                    label="左"
                />
                <n-radio
                    value="center"
                    label="中"
                />
                <n-radio
                    value="right"
                    label="右"
                />
            </n-radio-group>
            
        </n-form-item>
        <n-form-item label="标签宽度" >
            <n-input-number :value="+config!.options.labelWidth.value.replace('px', '')" @update:value="(d: number) => config!.options.labelWidth.value = `${d}px`" >
                <template #suffix>
                    px
                </template>
            </n-input-number>
        </n-form-item>
        
        <n-form-item label="尺寸" >
            <n-radio-group size="small" v-model:value="config!.options.size.value" >
                <n-radio
                    value="small"
                    label="小"
                />
                <n-radio
                    value="medium"
                    label="中"
                />
                <n-radio
                    value="large"
                    label="大"
                />
            </n-radio-group>
            
        </n-form-item>
        <!-- <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
        />
        </n-form-item>
        <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="重复密码"
        >
        <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
        />
        </n-form-item>
        <n-row :gutter="[0, 24]">
        <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
            <n-button
                :disabled="model.age === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
                验证
            </n-button>
            </div>
        </n-col>
        </n-row> -->
    </n-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineComponent, nextTick, h } from "vue";

import { designer } from '../../../store/index'
const {
    ActiveWidget
} = designer
const config = ActiveWidget.value!.config

const internalOptions = ActiveWidget.value!.internalOptions
// 这里实现切换istab

const toggleIsTab = (d: boolean) => {
    // config.value.internalOptions!.value.isTab = d
    
    console.log(ActiveWidget.value!.slots.default)
    if (d) {
        // 在form中插入tabs
        // ActiveWidget.value!.slots.default = []
    } else {

        // ActiveWidget.value!.slots.default = []
        // ActiveWidget.value!.slots.default = []
    }
    console.log(ActiveWidget.value)
}

</script>

<style lang="less" scoped></style>
