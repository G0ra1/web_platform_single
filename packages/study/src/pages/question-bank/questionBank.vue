<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="题库维护"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:500px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1" >
             <n-grid-item>
                <n-form-item path="typeCode" label="题库标签">
                     <nw-dic
                            :request="{XHR:dictItemLists, params: 'STUDY_DATABASE_TYPE',}"
                            v-model:value="model.typeCode"
                            v-model:label="model.typeName"
                            size="small"
                            multiple
                            :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                          />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="题库名称" path="databaseName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.databaseName" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item
                    label="图片上传"
                    path="icon"
                >
                    <n-image width="80" :src="model.icon" v-if="model.icon" height="50"  />
                    <n-upload
                        :action="uploadUrl"
                        accept="*/*"
                        :show-file-list="false"
                        :headers="{
                            Authorization: `${tokenType} ${token}`,
                        }"
                        :data ="{
                            fileSource:'study',  
                            poolName:'localStudy'
                        }"
                        @finish="handleFinish"
                        @before-upload="beforeUpload"
                    >
                      <nw-icon name="icon-n-y-add" :size="45" />
                    </n-upload>
                </n-form-item>
            </n-grid-item>
             <n-grid-item span="24">
                <n-form-item label="描述" path="description">
                    <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.description" />
                </n-form-item>
            </n-grid-item>
            
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
import {  creatStudyExamDatabaseDef, editStudyExamDatabaseDef, dictItemLists} from './api'
import { cloneDeep } from 'lodash'

import { NwIcon, NwDic, Cookies } from '@platform/main'

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
        NwIcon,
        NUpload,
        NImage,
        NwDic
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
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const message = useMessage();

    const sonFn = (e={}) => {
      showModalRef.value = true
      if(e.id){
        e.typeCode = e.typeCode.split(',')
        e.typeName = e.typeName.split(',')
      }
      modelRef.value=cloneDeep(e)
    };
   
    onMounted(async () => {
       
    })
    return {
      sonFn,
      dictItemLists,
      showModal: showModalRef,
      uploadUrl: `${window.apiBaseURL}/main/fileinfo?fileSource=study`,
      token,
      tokenType,
      model:modelRef, // 表单数据
      isLoading,
      message,
      formRef,
      rules: {
        userName: [
            {
                required: true,
                message: '请输入账号',
                trigger: ['input', 'blur']
            }
        ],
        userNameCh: [
            {
                required: true,
                message: '请输入姓名',
                trigger: ['input', 'blur']
            }
        ],
      
        
      },
    
      onPositiveClick (){
        const fn =!modelRef.value.id?creatStudyExamDatabaseDef:editStudyExamDatabaseDef
         formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            modelRef.value.typeCode = modelRef.value.typeCode ? modelRef.value.typeCode.join(',') : ''
            modelRef.value.typeName = modelRef.value.typeName ? modelRef.value.typeName.join(',') : ''
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
    handleFinish() {
      
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        this.message.success("上传成功");
       
        this.model = {
          ...this.model,
          icon: window.apiBaseURL + "/main" + data.fileUrl,
        };
      } else {
        this.message.error(msg);
      }
      this.isLoading = false;
    },
    beforeUpload() {
      this.isLoading = true;
    },
  }
})
</script>