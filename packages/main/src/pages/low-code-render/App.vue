<template>
  <n-config-provider
    :theme-overrides="theme"
    abstract
  >
    =={{ dataModel }}==
    <widget :config="pageConfig" />
    <!-- <component is="n-grid" :cols="4" >
    <template v-slot:default>
      <template v-for="gi in test">
          
        <component :is="gi" :span="2">
          test--1
      
        </component>
      </template>
    </template>
    </component> -->
  </n-config-provider>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, inject, provide } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NwIcon, RequestPaging, VxeHelper, request, NwPickAny
} from '@platform/main'



import theme from './theme/index'

import data from './data/data'

import { FormRender } from './modal'

import widget from './component/widget.vue'
export default defineComponent({
  props: {
    
  },
  components: {
    NwIcon,
    widget
  },
  setup(props, context) {
    const fr = new FormRender(data, [])
    const {
      pageConfig,
      dataModel,
      dataPermits,
      gridRules,
      gridDataPermits,
      gridRefs,
      TestComputed
    } = fr
    provide('FormRender', fr)
    nextTick().then(() => {
      fr.setValue({test: '5522'})
    })
    return {
      dataModel,
      TestComputed,
      pageConfig,
      theme,
      test: ref([{
        tagName: 'n-gi'
      },{
        tagName: 'n-gi'
      },])
    }
  }
})

</script>

<style  lang='less' >
@import "./style/index.less";

</style>
