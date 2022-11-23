<template>
  <div class="full-center">
    <n-spin show />
  </div>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import {
  NSpin
} from 'naive-ui'
import { NwIcon, Request, VxeHelper } from '@platform/main'

export default defineComponent({
  components: {
    NSpin
  },
  setup () {
    const PageUrl = window.location.hash.substring(1)
    
    // 这里根据code加载url
    // 这里
    new Request(
      `/main/page/getPageBy${PageUrl}`,
      'get'
    ).send().then(r => {
      // 设定访问地址
      window.location.href = `${r.targetUrl}#${PageUrl}`
    })

    return {

    }
  }
})

</script>

<style scoped>
.full-center {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
}
</style>
