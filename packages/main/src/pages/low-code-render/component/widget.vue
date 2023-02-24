<template>
  <!-- 这里特殊处理grid -->
  <template v-if="TagName === 'n-grid'">
    <n-grid v-bind="VBind" >
      <template
        v-for="gi in Slots[0][1]"
        :key="gi.key"
      >
        <n-gi v-bind="compileConfig(gi.options)">
          <widget :config="gi.slots.default[0]" />
        </n-gi>
      </template>
    </n-grid>
  </template>
  <template v-else-if="Type === 'script'">
      <!-- 这里处理脚本 -->
      999
  </template>
  <template v-else-if="TagName === 'n-form-item'">
    <!-- 这里处理脚本 -->
    <n-form-item v-bind="VBind">
      <!--  -->
      <widget
        :config="Slots[0][1][0]"
      />
    </n-form-item>
  </template>
  <template v-else-if="TagName === 'nw-field-grid'">
    <nw-field-grid
    v-bind="VBind"
    v-on="VOn"
    >
      <template
          v-for="[slotName, slots] in Slots"
          v-slot:[slotName]="slotProps"
      >
          <template v-for="slot in slots">
            <widget :config="slot" :slotProps="slotProps" />
          </template>
      </template>
    </nw-field-grid>
  </template>
  <template v-else-if="Category === 'field'">
    <component
      :is="TagName"
      v-bind="VBind"
      v-on="VOn"
    >
        <template
            v-for="[slotName, slots] in Slots"
            v-slot:[slotName]="slotProps"
        >
            <template v-for="slot in slots">
              <widget :config="slot" :slotProps="slotProps" />
            </template>
        </template>
    </component>
  </template>
  <template v-else>
    <!-- 这里加入插槽作用域，进行数据绑定 -->
    <component
    :is="TagName"
    v-bind="VBind"
    >
        <template
            v-for="[slotName, slots] in Slots"
            v-slot:[slotName]="slotProps"
        >
            <template v-for="slot in slots">
              <widget :config="slot" :slotProps="slotProps" />
            </template>
        </template>
    </component>
  </template>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, computed, inject } from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NwIcon, RequestPaging, VxeHelper, request, NwPickAny } from "@platform/main";


import { compileConfig } from "../../low-code-designer/utils/index"

import { set, get } from 'lodash'

export default defineComponent({
  name: "widget",
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    slotProps: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    NwIcon,
  },
  setup(props, context) {
    const {
      dataModel,
      dataPermits,
      gridRules,
      gridDataPermits,
      gridRefs,
    } = inject('FormRender')
    const Type = computed(() => props.config.type)
    const Category = computed(() => props.config.category)
    const TagName = computed(() => props.config.tagName)
    // const Options = computed(() => compileConfig(props.config.options))

    const Slots = computed(() => {
        return props.config.slots ? Object.entries(props.config.slots) : []
    })
    const Directives = computed(() => compileConfig(props.config.options))
    const DataModelField = computed(() => {
      return props.config.dataFormField
    })
    // 数据绑定
    
    const isVModel = computed(() => {
      
    })

   


    // OptionsModel.value = dataModel.value.test


    // props.config.directives

    // 生成vbind
    const VBind = computed(() => {
      
      const OptionsModel = {
      }

      Object.entries(props.config.vModel || {}).forEach(([key, mod]) => {
        if (mod.type === 'DataForm') {
          // alert(key + ' ' + mod.field)
          OptionsModel[key] = get(dataModel.value, mod.field, undefined) //dataModel.value.test // 
        } else if (mod.type === 'SlotProps') {
          OptionsModel[key] = get(props.slotProps, mod.field, undefined)
        }
        
      })

      return {
        ...compileConfig(props.config.options),
        ...OptionsModel,
        // value: dataModel.value.test
      }
    })

    // 生成v-on
    const VOn = computed(() => {
      const EventModel = {}
      Object.entries(props.config.vModel || {}).forEach(([key, mod]) => {
        if (mod.type === 'DataForm') {
          // alert(key + ' ' + mod.field)
          EventModel[`update:${key}`] = (d) => {
            set(dataModel.value, mod.field, d)
          }
        } else if (mod.type === 'SlotProps') {
          EventModel[`update:${key}`] = (d) => {
            set(props.slotProps, mod.field, d)
          }
        }
      })
      return EventModel
    })

    return {
      TestValueX: 'value',
      dataModel,
      dataPermits,
      gridRules,
      gridDataPermits,
      gridRefs,
      
      VBind,
      VOn,

      DataModelField,
      Type,
      Category,
      compileConfig,
      TagName,
      Slots
    };
  },
});
</script>

<style lang="less">
</style>
