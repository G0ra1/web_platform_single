<template>
  <codemirror
    ref="codeMirrorRef"
    v-model="props.value"
    placeholder="这里编写脚本程序..."
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
    :disabled="props.disabled"
    @ready="log('ready', $event)"
    @change="change"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { } from './store'
export default defineComponent({
  name: "NwCodeMirror",
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    },
  },
  components: {
    Codemirror
  },
  setup(props, context) {
    const codeMirrorRef = ref(null)
    // const code = ref(`console.log('Hello, world!')`)
    const extensions = [ javascript() ]
    return {
      props,
      codeMirrorRef,
      extensions,
      log: console.log,
      change (e: any) {
        context.emit('update:value', e)
      }
    }
  },
})
</script>

<style lang="less" scoped>
</style>
