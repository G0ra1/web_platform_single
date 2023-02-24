<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="历史审核记录"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    :z-index="999"
    :style="`width:1000px;`"
  >
    <n-spin :show="isLoading">
     <div style="height:500px">
          <vxe-table
                ref="sTable"
                border
                size='small'
                height="auto"
                :data="model ? model : []"
                highlight-current-row
            >
                <vxe-column field="lessonName" title="课程名称" >
                  <template v-slot="{ row }">
                    <span style="color:#2080f0;cursor:pointer" @click="()=>{studyLessonHisDetailShow(row)}">
                      {{row.lessonName}}
                    </span>
                </template>
                </vxe-column>
                <vxe-column field="typeName" title="分类" ></vxe-column>
                <vxe-column field="labelName" title="标签"  > </vxe-column>
                <vxe-column field="createTime" title="调整时间"  > </vxe-column>
                <vxe-column field="createUserName" title="调整人"  > </vxe-column>

            </vxe-table>
     </div>
    </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
        </div>
    </template>
   <n-drawer
    v-model:show="visibleHis"
    :to="pageRef && pageRef.$el"
    width="100%"
    :height="200"
    :z-index="9999"
    placement="right"
  >
    <n-drawer-content
       title="课程详情"
       closable
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
        
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <nw-form-view
        ref="formRef"
        src="/web-study/forms/study-course-form.html"
      />
      
    </n-drawer-content>
  </n-drawer>
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
    NSpin,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
} from 'naive-ui'
import { hisListFor } from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'
import {   
  visibleHis,
  studyLessonHisDetailShow,
  pageRef,
  formRef,
} from "./store.js";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import NwFormView from "../../components/nw-form-view/index.vue";

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
        NDrawer,
        NDrawerContent,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NwFormView
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)

    const modelRef = ref([])
  
    const isLoading = ref(false)
    const sonFn = (e={}) => {
      showModalRef.value = true
      isLoading.value = true
      hisListFor(e.id).then((r)=>{
        modelRef.value=r
        isLoading.value = false
      })

    };
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading, 
      formRef,
      studyLessonHisDetailShow,
      visibleHis,
      pageRef,
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>
<style lang="less" scoped>
/deep/ .n-drawer{
  z-index: 9999;
}
</style>