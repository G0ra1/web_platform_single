<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="通知公告维护"
    content="你确认"
    positive-text="确认"
    :z-index='99'
    negative-text="取消"
    style="width:1300px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid  :cols="1" >
            
            <n-grid-item>
                <n-form-item label="新闻标题" path="newsTitle">
                    <n-input size="small" placeholder="请输入" v-model:value="model.newsTitle" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="新闻类别" path="newsType">
                    <nw-dic
                        :request="{XHR:dictItemLists, params: 'STUDY_NEWS_TYPE',}"
                        v-model:value="model.newsType"
                        v-model:label="model.newsTypeName"
                        size="small"
                        multiple
                        :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                        />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item
                    label="封面上传"
                    path="description"
                >
                    <n-upload
                        :action="uploadUrl"
                        accept="image/png, image/jpeg, image/bmp"
                        :show-file-list="false"
                        v-if="!model.newsPhotoUrl"
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
                      <n-upload-dragger >
                          建议上传100*100的jpg、png图片
                      </n-upload-dragger>
                    </n-upload>
                    <div v-if="model.newsPhotoUrl">
                      <n-image :src="model.newsPhotoUrl"  height="50" width="50" style="padding-left:15px"  />
                      <nw-icon @click="()=>{model.newsPhotoUrl = ''}" name="icon-del" style="cursor: pointer;position: absolute;left: 70px;top: 35px;color: red;" size={15} />
                    </div>
                </n-form-item>
            </n-grid-item>
            
           
             <n-grid-item span="24">
                <n-form-item label="新闻内容" path="newsDetail">
                    <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.newsDetail" />
                    <!-- <VueUeditorWrap
                      v-model="model.newsDetail"
                      :config="editorConfig"
                      editor-id="editor-demo-01"
                      forceInit
                      :contentEditable="false"
                    >
                    </VueUeditorWrap> -->
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
    NUploadDragger
} from 'naive-ui'
import {  creat, edit, dictItemLists,} from './api'
import { cloneDeep } from 'lodash'

import { NwIcon, NwDic, Cookies } from '@platform/main';

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
        NwIcon,
        NUploadDragger,
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
    const editorConfig = ref({
      UEDITOR_HOME_URL: "/UEditor/",
      serverUrl: `${window.apiBaseURL}/main/ueditor/exec`,

    });
    const sonFn = (e={}) => {
      showModalRef.value = true
      if(e.id){
        e.newsType = e.newsType.split(',')
        e.newsTypeName = e.newsTypeName.split(',')
      }
      modelRef.value=cloneDeep(e)

    };
   
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      uploadUrl: `${window.apiBaseURL}/main/fileinfo`,
      token,
      tokenType,
      dictItemLists,
      message,
      model:modelRef, // 表单数据
      isLoading,
      editorConfig,
      formRef,
      rules: {
        newsTitle: [
            {
                required: true,
                message: '请输入新闻标题',
                trigger: ['input', 'blur']
            }
        ],
        // newsType: [
        //     {
        //         required: true,
        //         message: '请选择新闻类别',
        //         trigger: ['input', 'blur']
        //     }
        // ],
        newsDetail: [
            {
                required: true,
                message: '请输入新闻内容',
                trigger: ['input', 'blur']
            }
        ],
        
       
        
      },
      
      onPositiveClick (){
        const fn =!modelRef.value.id?creat:edit
         formRef.value.validate((errors) => {
          if (!errors) {
             isLoading.value = true
            modelRef.value.newsTypeName = modelRef.value.newsTypeName ? modelRef.value.newsTypeName.join(',') : ''
             modelRef.value.newsType = modelRef.value.newsType ? modelRef.value.newsType.join(',') : ''
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
     handleFinish() {
        let { code, data, msg } = JSON.parse(event.target.response);
        if (code == 200) {
          this.message.success("上传成功");
        
          this.model = {
            ...this.model,
            newsPhotoUrl: window.apiBaseURL +'main' +data.fileUrl,
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
<style scoped lang="less">
 /deep/ .edui-default .edui-editor{
  width: 100%;
 } 
</style>