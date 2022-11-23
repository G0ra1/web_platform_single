<template>
  <n-button
    @click="handle()"
    :loading="isLoading"
    v-bind="btnOption"
  >
    <slot />
  </n-button>
  <n-drawer
    v-if="vIf"
    v-model:show="active"
    width="100%"
    :placement="placement"
    content-style="overflow:hidden"
  >
    <iframe
      ref="iframeRef"
      :src="url"
      style="border: 0;width: 100%;height: 100%;overflow: hidden"
    
    />
  </n-drawer>
</template>
<script>
import { NBadge, NButton, NDrawer, NDrawerContent } from "naive-ui";
import { h, ref, reactive, defineComponent, watch, inject, nextTick } from "vue";
import redirectPage from '/@/plugins/redirect-page'
// 获取功能 流程入口按钮
let wfPage = null

import { request } from '@platform/main'


export default defineComponent({
  components: {
    NButton,
    NDrawer,
    NDrawerContent
  },
  props: {
    camundaProcInsId: {
      type: String,
      default: ''
    },
    isNewPage: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const btnOption = context.attrs
    const vIf = ref(false)
    const isLoading = ref(false)
    const iframeRef = ref(null)
    const url = ref('')
    const active = ref(false)
    const getWfInfo = (camundaProcInsId) => {
      return request({
          url: `/wf/wfEngine/getTaskByProcInsId/${camundaProcInsId}`,
          method: 'get'
      })
    }
    const wfClose = () => {
      active.value = false
      window.removeEventListener('wfClose', wfClose)
    }

    return {
      btnOption,
      vIf,
      isLoading,
      iframeRef,
      url,
      active,
      props,
      handle: async () => {
        
        window.addEventListener('wfClose', wfClose)
        isLoading.value = true
        let params = ''
        await getWfInfo(props.camundaProcInsId).then(res => {
          params = `Action=${res.action}&id=${res.id}`
        })
        isLoading.value = false
        if (props.isNewPage) {
          // 这里需要请求
          // 这里需要区分展示方式
          wfPage = redirectPage(`/html/wf/run-skin.html?${params}`, true, false)
        } else {
          vIf.value = true
          await nextTick()
          active.value = true
          // wfPage = 
          active.value = true
          url.value = `/html/wf/run-skin.html?${params}`
        }

        
      }
    }
  }
});
</script>

<style lang='less'>

</style>