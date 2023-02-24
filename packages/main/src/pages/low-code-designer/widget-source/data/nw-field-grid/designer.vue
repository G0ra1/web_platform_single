<template>
  <nw-field-grid
    ref="gridRef"
    v-bind="GridBind"
    :value="[GridTestData]"
  >
    <template
      v-for="[slotName, slots] in slotsItems"
      v-slot:[slotName]="slotProps"
    >
      <template v-for="item in slots.map((d: any) => new Widget(d))">
        <!-- 这里特殊处理render -->
        <template v-if="item.tagName === 'nw-field-render'">
          <component
            :is="item.tagName"
            v-bind="item.options.value"
            :slotProps="slotProps"
            :dataModel="{}"
          >
          </component>
        </template>
        <template v-else>
          <component
            :is="item.tagName"
            v-bind="item.options.value"
          >
          </component>
        </template>
      </template>
    </template>

  </nw-field-grid>
</template>

<script lang="tsx">
import { ref, reactive, computed ,defineComponent, nextTick, h } from "vue";

import type { WidgetNS } from "../../../model/widget.d"
import { Widget } from "../../../model/widget"

import { compileConfig } from "../../../utils/index"

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
  },
  setup(props, context) {
    const gridRef = ref()
    const slotsItems = computed<Array<[string, any]>>(() => {
      // 过滤掉 
      // return Object.entries(props.value.slots!)
      // .filter((d: any) => d[0].split('_')[0] === 'edit')
      // .map((d: any) => [d[0].replace('edit', 'default'), d[1]])
      return Object.entries(props.value.slots!)
    })

    // 表格vbind
    const GridBind = computed(() => {
      // 这里修改格式
      return compileConfig(props.value.options)
    })
    // 生成测试数据
    const GridTestData = computed(() => {
      // 这里修改格式
      const data = {}
      GridBind.value.columns.forEach((d: any) => {
        data[d.field] = `${d.title}内容`
      })
      return data
    })

    nextTick().then(() => {
      // 这里要
      // gridRef.value.setEditRow(0)
    })
    return {
      gridRef,
      slotsItems,
      GridBind,
      GridTestData,
      Widget
    }
  }
})
</script>

<style lang="less" scoped></style>
