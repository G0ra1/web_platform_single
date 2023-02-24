<script setup lang="ts">
import { ref, inject } from 'vue'
import { NModal } from 'naive-ui'
// defineProps<{ msg: string }>()

const count = ref(0)
const visible = ref<boolean>(false)

// frame src
const frameUrl = ref<string>("")
const show = (url: string) => {
  visible.value = true
  frameUrl.value = url

}
(inject('Emitter') as any).on('function-complete', () => {
  visible.value = false
})
defineExpose({
  show
})
</script>

<template>
  <n-modal
    v-model:show="visible"
    style="padding: 0;background:#fff;"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    bordered
  > 
    <iframe class="wf-run-frame nw-model-media" :src="frameUrl" />
  </n-modal>
</template>

<style scoped lang="less">
.read-the-docs {
  color: #888;
}
.wf-run-frame {
  display: block;
  // width: 1244px;
  // height: 680px;
  overflow: hidden;
  border: none;
  border-radius: 6px;
}
</style>
