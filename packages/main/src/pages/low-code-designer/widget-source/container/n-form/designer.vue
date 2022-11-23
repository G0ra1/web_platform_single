<template>
  <widget-shell :value="value">
    <n-form

    >
      <!-- 遍历所有slots -->
      <!-- <n-form-item  label="Input" path="inputValue">
        <n-input placeholder="Input" />
      </n-form-item>
      <n-form-item  label="Input" path="inputValue">
        <n-input placeholder="Input" />
      </n-form-item> -->
    </n-form>
  </widget-shell>
</template>

<script setup lang="ts">
import { ref, reactive, computed ,defineComponent, nextTick, h } from "vue";

import type { WidgetNS } from "../../../model/widget.d"
import { Widget } from "../../../model/widget"

import { compileConfig } from "../../../utils/index"

const props = withDefaults(defineProps<{
  value: WidgetNS.Config
}>(), {
    value: () => ({ options: {} })
})


</script>

<style lang="less" scoped></style>
