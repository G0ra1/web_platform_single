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
                <vxe-column field="paperName" title="试卷名称" >
                  <template v-slot="{ row }">
                    <span style="color:#2080f0;cursor:pointer" @Click="()=>{studyExamPaperHisDetailShow(row)}">
                      {{row.paperName}}
                    </span>
                  </template>
                </vxe-column>
                <vxe-column field="typeName" title="分类" ></vxe-column>
                <vxe-column field="paperType" title="试卷类型"  > 
                  <template v-slot="{ row }">
                    <span >
                      {{(row.paperType )? [
                          {label:'练习题',value:'0'},
                          {label:'考试题',value:'1'},
                          {label:'',value:''},
                         
                        ].filter(d=>(row.paperType.split(',')).indexOf(d.value) > -1).map(item=>item.label).join(',') : ''
                      }}
                    </span>
                  </template>
                </vxe-column>
                <vxe-column field="createTime" title="出题类型"  > 
                  <template v-slot="{ row }">
                    <span >
                      {{(row.paperCode ||(row.paperCode ==0 )) ? [
                          {label:'固定试卷',value:0},
                          {label:'随机试卷',value:1},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.paperCode)[0].label : ''
                      }}
                    </span>
                  </template>
                </vxe-column>
                <vxe-column field="paperTotalScore" title="试卷总分"  > </vxe-column>
                 <vxe-column field="specialExamQualifiedScore" title="合格分数"  > </vxe-column>
                <vxe-column field="createTime" title="记录时间"  > </vxe-column>

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
       title="试卷详情"
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
        src="/html/forms/study-paper-form.html"
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
  studyExamPaperHisDetailShow,
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
      studyExamPaperHisDetailShow,
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