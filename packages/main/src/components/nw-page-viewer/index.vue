<template>
  <iframe class="form-view-frame" ref="frame" :src="pageUrl"></iframe>
</template>
<script lang="ts">
// import request from '/@/plugins/request'
import { Request } from '@platform/main'

import {
  NSelect,
  NCheckboxGroup,
  NCheckbox,
  NSpace,
  NInput
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import { cloneDeep } from 'lodash'

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  components: {
    NInput,
    NSelect,
    NCheckboxGroup,
    NCheckbox,
    NSpace
  },
  setup (props, context) {
    const frame = ref<HTMLIFrameElement>()
    // 页面Url
    const pageUrl = ref<string>('')
    
    // 获取页面数据
    const queryFormPage = () => {
      new Request(
        `/main/page/${props.src}`,
        'get'
      ).send().then(r => {
        // 设定访问地址
        pageUrl.value = r.targetUrl //'http://localhost:3001/wf/forms/meetings.html'

      })
    }

    // 数据转换
    nextTick().then(() => {
      queryFormPage()
    })

    return {
      pageUrl,
      frame,
    }
  }
})
</script>

<style lang='less'>
.form-view-frame {
  width: 100%;
  // height: calc(~'100% - 6px');
  height: 100%;
  overflow: hidden;
  border: none
}
</style>