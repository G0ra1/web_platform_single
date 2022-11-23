<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="证书预览"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
     style="width: 1200px;"
  >
  <div  style="width: 100%; height: 750px">
    <iframe
        :src="`/pdf/web/viewer.html?file=${window.apiBaseURL}//zuul/study/studyCertificateTemplate/preview/${previewId}`"
         width='100%'
         height="100%"
    ></iframe>
  </div>
   
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
    const previewId = ref()
  
    const isLoading = ref(false)
    const sonFn = (e={}) => {
      showModalRef.value = true
      previewId.value = e.id

    };
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      previewId, // 表单数据
      isLoading,
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>