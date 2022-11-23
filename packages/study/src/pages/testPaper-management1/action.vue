<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="试卷维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:500px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1" >
            
             <n-grid-item>
                <n-form-item label="试卷标签" path="typeName">
                        <nw-dic
                            :request="{XHR:dictItemLists, params: 'STUDY_PAPER_TYPE',}"
                            v-model:value="model.typeCode"
                            v-model:label="model.typeName"
                            size="small"
                            multiple
                            :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                          />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="试卷名称" path="paperName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.paperName" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="paperType" label="试卷类型">
                    <n-select
                       :disabled="model.id"
                        multiple 
                        v-model:value="model.paperType"
                        placeholder="请选择试卷类型"
                        :options="paperTypes"
                        size="small" 
                  />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item path="paperCode" label="出题类型">
                    <n-select
                      :disabled="model.id"
                        v-model:value="model.paperCode"
                        placeholder="请选择出题类型"
                        :options="paperCodes"
                        size="small" 
                  />
                </n-form-item>
            </n-grid-item>

           
             <!-- <n-grid-item span="24">
                <n-form-item label="简介" path="description">
                    <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.description" />
                </n-form-item>
            </n-grid-item> -->
            
        </n-grid>
      </n-form>
  </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
            
          </div>
    </template>
  </n-modal>
</template>

<script>
import { defineComponent, ref,reactive,onMounted  } from 'vue'
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
    useMessage,
    NUpload,
    NImage
} from 'naive-ui'
import {  creat, edit,dictItemLists, } from './api'
import { cloneDeep } from 'lodash'

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
        NUpload,
        NImage,
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})

    const isLoading = ref(false)
    const formRef = ref(null)
    const message = useMessage();

    const sonFn = (e={}) => {
      showModalRef.value = true
      if(e.id){
        e.typeCode = e.typeCode.split(',')
        e.typeName = e.typeName.split(',')
        modelRef.value=cloneDeep({...e,paperType:e.paperType.split(',')})
      } else {
        modelRef.value = {}
      }

    };
 
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading,
      dictItemLists,
      paperTypes:reactive([
        { label: '练习题', value: '0'},
        { label: '考试题', value: '1'}
      ]),
      paperCodes:reactive([
        { label: '固定试卷', value: 0},
        { label: '随机试卷', value: 1}
      ]),
      formRef,
      message,
      rules: {
        paperName: [
            {
                required: true,
                message: '请输入账号',
                trigger: ['input', 'blur']
            }
        ],
        typeName: [
            {
                required: true,
                message: '请输入姓名',
                trigger: ['input', 'blur']
            }
        ],
      },
   
      onPositiveClick (){
        const fn =!modelRef.value.id?creat:edit
         formRef.value.validate((errors) => {
          if (!errors) {
             isLoading.value = true
            modelRef.value.typeCode = modelRef.value.typeCode ? modelRef.value.typeCode.join(',') : ''
            modelRef.value.typeName = modelRef.value.typeName ? modelRef.value.typeName.join(',') : ''
             modelRef.value.paperType = modelRef.value.paperType.join(',')
            fn(modelRef.value).then((res)=>{
              
                context.emit('update:callback');
                showModalRef.value = false
           

            }).finally(r => {
             
              isLoading.value = false
            })
          }
        })
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
 
  }
})
</script>