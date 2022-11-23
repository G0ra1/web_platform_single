<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="调整记录"
    content="你确认"
    positive-text="确认"
    :z-index="999"
    negative-text="取消"
    style="width:1400px;"
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
                    <span style="color:#2080f0;cursor:pointer" @Click="()=>{studyExamPaperAdjDetailShow(row)}">
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
            <vxe-column field="createTime" title="调整时间"  > </vxe-column>
            <vxe-column field="createUserName" title="调整人"  > </vxe-column>
            <vxe-column field="auditStatus" title="审核状态"  >
                <template v-slot="{ row }">
                    {{(row.auditStatus || row.auditStatus==0) ? [
                        {value:0,name:'草稿'},
                        {value:1,name:'审批中'},
                        {value:2,name:'审批完成'},
                    ].filter(d=>d.value == row.auditStatus)[0].name : ''}}
                </template>
            </vxe-column>
            <vxe-column field="" title="删除"  >
                <template v-slot="{ row }" >
                    <n-button style="border-radius:5px" 
                        v-if="row.auditStatus == 0"
                        size="small" @click="handDel(row)"
                        type="error">删除</n-button
                      >
                </template>
            </vxe-column>
        </vxe-table>
     </div>
    </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
        </div>
    </template>
     <n-drawer
        v-model:show="visibleAdj"
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
import { adjListFor, adjDel } from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'
import {   
  visibleAdj,
  studyExamPaperAdjDetailShow,
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
    const formData = ref({})
    const isLoading = ref(false)
    const sonFn = (e={}) => {
      showModalRef.value = true
      formData.value = e
      init()
    };
    const init =()=>{
       isLoading.value = true
      adjListFor(formData.value.id).then((r)=>{
        modelRef.value=r
        isLoading.value = false
      })
    }
    const handDel = (e) =>{
      adjDel(e.id).then((r)=>{
        init()
      })
    }
  
    onMounted(async () => {
       
    })
    return {
      init,
      handDel,
      sonFn,
      formData,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading, 
      visibleAdj,
      studyExamPaperAdjDetailShow,
      pageRef,
      formRef,
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>