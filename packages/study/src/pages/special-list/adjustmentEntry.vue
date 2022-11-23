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
            <vxe-column field="specialName" title="专题名称" >
              <template v-slot="{ row }">
                    <span style="color:#2080f0;cursor:pointer" @Click="()=>{studySpecialAdjDetailShow(row)}">
                      {{row.specialName}}
                    </span>
                </template>
            </vxe-column>
            <vxe-column field="typeName" title="分类" ></vxe-column>
            <vxe-column field="label" title="标签"  > </vxe-column>
            <vxe-column field="createTime" title="调整时间"  > </vxe-column>
            <vxe-column field="createUserName" title="调整人"  > </vxe-column>
            <vxe-column field="auditStatus" title="审核状态"  >
                <template v-slot="{ row }">
                    {{(row.auditStatus || row.auditStatus == 0) ? [
                        {value:0,name:'草稿'},
                        {value:1,name:'审批中'},
                        {value:2,name:'审批完成'},
                    ].filter(d=>d.value == row.auditStatus)[0].name:''}}
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
          title="专题详情"
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
            src="/html/forms/study-special-form.html"
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
import { adjListFor,adjDel } from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'
import NwFormView from "../../components/nw-form-view/index.vue";
import {   
  visibleAdj,
  studySpecialAdjDetailShow,
  pageRef,
  formRef,
} from "./store.js";
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
      sonFn,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading, 
      visibleAdj,
      handDel,
      init,
      studySpecialAdjDetailShow,
      pageRef,
      formRef,
      formData,
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>