<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="课件预览"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
     style="width: 1200px;"
  >
    <video
          ref="videoPlayer" 
          class="video-js vjs-big-play-centered"
          id="myVideo"
          controls
          loop
          v-if="couType == 1 ||  couType == 2"
          :style="`border: 0;width: 100%;height: 750px;`"
      >
        <source :src="fileUrl">
      </video>
      <iframe
          ref="iframeRef"
          :src="fileUrl"
          style="border: 0;width: 100%;height: 750px;background:#fff"
          v-if="couType == 3"
      />
               
   
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
        </div>
    </template>
  </n-modal>
</template>

<script lang='jsx'>
import { h,defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
     NButton,
    NSpin
} from 'naive-ui'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import { Base64 } from 'js-base64'

import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NButton,
        NSpin,
        NwTable,
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
  
    const isLoading = ref(false)
    const couType = ref(2)
    
    const fileUrl = ref()
    
    const sonFn = (e={}) => {
      showModalRef.value = true

      couType.value = e.couType
      fileUrl.value = e.couType == 3 ? `${window.apiBaseURL.fileServerUrl}?url=${encodeURIComponent(Base64.encode(e.fileUrl))}`  :  e.fileUrl
      

    };
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      isLoading,
      couType,
      fileUrl,
      onNegativeClick () {
        couType.value = 2
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>