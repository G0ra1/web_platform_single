<template>
  <NwFormViewer ref="formRef" src="/smm/jiZhongNatgasSell" />
  
  <n-button @click="testSet">Set</n-button>
  <n-button @click="testGet">Get</n-button>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NButton
} from 'naive-ui'
import { NwFormViewer } from '@platform/main'
import { FormModal } from './store'


export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NButton,
    NwFormViewer
  },
  setup () {
    const formRef = ref<typeof NwFormViewer>()
    return {
      formRef,
      testSet () {
        formRef.value!.setValue({
          applyTime: 'test'
        })
      },
      testGet () {
        formRef.value!.getValue().then((r: any) => {
          console.log(r)
        })
      }
    }
  }
})

</script>

<style scoped>
</style>
