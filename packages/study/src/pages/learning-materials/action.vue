<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="学习资料维护"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:700px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules" style='padding:0 10px'>
        <n-grid  :cols="1" >
             <n-grid-item>
                <n-form-item label="标签名称" path="labelCode">
                     <nw-dic
                        :request="{XHR:dictItemLists, params: 'STUDY_MATERIAL_TYPE',}"
                        v-model:value="model.labelCode"
                        v-model:label="model.labelName"
                        size="small"
                        multiple
                        :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                        />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="学习资料名称" path="marterialsName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.marterialsName" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="是否可以下载" path="isDownload">
                  <n-select
                    v-model:value="model.isDownload"
                    placeholder="请选择"
                    :options="isEnableList"
                    :fallback-option="
                      (value) => ({ label: '' + value == 0 ? '否' : '是', value })
                    "
                  />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item
                    label="文件上传"
                    path="fileId"
                >
                  <Upload textNP="请上传文档" :value="fileList" @update:callback="(data)=>{
                    handleFinish(data)
                  }" @rupdate:callback="()=>{
                    handleClose()
                  }"></Upload>
                </n-form-item>
            </n-grid-item>
           
             <n-grid-item span="24">
                <n-form-item label="备注" path="description">
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
    NUpload,
    NImage,
    NSpin,
    useMessage,
    NTag,
    
} from 'naive-ui'
import {  creat, edit, dictItemLists,} from './api'
import { cloneDeep } from 'lodash'


import { NwIcon, NwDic, Cookies } from '@platform/main';
import Upload from '../../components/upload.vue'

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
        NTag,
        NwIcon,
        Upload,
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
     const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const modelRef = ref({})
    const isLoading = ref(false)
    const message = useMessage();
    const formRef = ref(null)
    const fileListRef = ref([]);

    const sonFn = (e={}) => {
      showModalRef.value = true
       if(e.id){
        e.labelCode = e.labelCode.split(',')
        e.labelName = e.labelName.split(',')
      }
      if(e.fileId){
          fileListRef.value = [{
            id: e.fileId,
            name: e.fileName,
            url: e.fileUrl,
            status: 'finished'
          }]
      } else {
        fileListRef.value = []
      }
      modelRef.value={homeBannerStartUsing:1,...cloneDeep(e)}

    };
    const handleClose = () =>{
      modelRef.value.fileName = ''
      modelRef.value.fileId = ''
      modelRef.value.fileUrl = ''
    }
 
    onMounted(async () => {
       
    })
    return {
      sonFn,
      handleClose,
      showModal: showModalRef,
      fileList:fileListRef,
      uploadUrl: `${window.apiBaseURL}/main/fileinfo`,
      token,
      tokenType,
      dictItemLists,
      message,
      model:modelRef, // 表单数据
      isLoading,
      formRef,
      isEnableList: reactive([
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ]),
      rules: {
        marterialsName: [
            {
                required: true,
                message: '请输入资料名称',
                trigger: ['input', 'blur']
            }
        ],
        typeName: [
            {
                required: true,
                message: '请选择标签',
                trigger: ['input', 'blur']
            }
        ],
        
      },
      
      onPositiveClick (){
        const fn =!modelRef.value.id?creat:edit
         formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            modelRef.value.labelName = modelRef.value.labelName ? modelRef.value.labelName.join(',') : ''
            modelRef.value.labelCode = modelRef.value.labelCode ? modelRef.value.labelCode.join(',') : ''
            fn(modelRef.value).then((res)=>{
              if(res){
                context.emit('update:callback');
                showModalRef.value = false
              }

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
     handleFinish(data) {
        this.model = {
          ...this.model,
          fileUrl: data.fileUrl,
          fileId:data.id,
          fileName:data.fileName
        };
        
      },
     
  }
})
</script>