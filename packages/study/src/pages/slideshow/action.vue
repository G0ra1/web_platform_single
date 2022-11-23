<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="轮播图维护"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:600px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid  :cols="1" >
            
            <n-grid-item>
                <n-form-item label="轮播图名称" path="homeBannerName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.homeBannerName" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="专题名称" path="specialName">
                    <SpecialChoose 
                      :isShowSearch="true"
                      :multiple="false"
                      :specialName="model.specialName"
                      :ids="model.specialId"
                      @update:callback="(e) => {
                        if(e){
                            model.specialId=e.id
                            model.specialName=e.specialName
                        }
                      }"
                  ></SpecialChoose>
                </n-form-item>
            </n-grid-item>
           
             <n-grid-item>
                <n-form-item
                    label="pc图片上传"
                    path="description"
                >
                    <n-upload
                        :action="uploadUrl"
                        :multiple="false"
                        accept="image/png, image/jpeg, image/bmp"
                        :show-file-list="false"
                         @finish="handleFinish"
                          @remove="removeChange"
                          v-if="!model.homeBannerUrl"
                        :headers="{
                              Authorization: `${tokenType} ${token}`,
                          }"
                          :data ="{
                              fileSource:'study',
                              poolName:'aliyunStudy',
                              
                          }"
                    >
                        <n-upload-dragger >
                            建议上传2000*300的jpg、png图片
                        </n-upload-dragger>
                    </n-upload>
                    <div v-if="model.homeBannerUrl">
                      <n-image :src="model.homeBannerUrl"  height="50" width="100"   />
                      <nw-icon @click="removeChange" name="icon-n-y-shanchu" style="cursor: pointer;position: absolute;left: 110px;top: 35px;color: red;" size={15} />
                    </div>
                </n-form-item>
            </n-grid-item>

             <n-grid-item>
                <n-form-item
                    label="app图片上传"
                    path="description"
                >
                    <n-upload
                        :action="uploadUrl"
                        :multiple="false"
                        accept="image/png, image/jpeg, image/bmp"
                        :show-file-list="false"
                         @finish="handleFinishApp"
                          @remove="removeChangeApp"
                          v-if="!model.mobileHomeBannerUrl "
                        :headers="{
                              Authorization: `${tokenType} ${token}`,
                          }"
                          :data ="{
                              fileSource:'study',
                              poolName:'aliyunStudy',
                              
                          }"
                    >
                        <n-upload-dragger >
                            建议上传360*200的jpg、png图片
                        </n-upload-dragger>
                    </n-upload>
                    <div v-if="model.mobileHomeBannerUrl ">
                      <n-image :src="model.mobileHomeBannerUrl "  height="50" width="100"   />
                      <nw-icon @click="removeChange" name="icon-n-y-shanchu" style="cursor: pointer;position: absolute;left: 110px;top: 35px;color: red;" size={15} />
                    </div>
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="是否启用" path="homeBannerStartUsing">
                  <n-select
                    v-model:value="model.homeBannerStartUsing"
                    placeholder="请选择是否启用"
                    :options="isEnableList"
                    :fallback-option="
                      (value) => ({ label: '' + value == 0 ? '否' : '是', value })
                    "
                  />
                </n-form-item>
            </n-grid-item>
             <n-grid-item span="24">
                <n-form-item label="备注" path="homeBannerRemarks">
                    <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.homeBannerRemarks" />
                </n-form-item>
            </n-grid-item>
            
        </n-grid>
      </n-form>
  </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"   @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" style="margin-left: 5px" @click="onPositiveClick" >保存</n-button>
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
import { Cookies, NwIcon } from '@platform/main'

import SpecialChoose from '../../components/specialChoose.vue';
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
        SpecialChoose
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
    const sonFn = (e={}) => {
      showModalRef.value = true
      modelRef.value={homeBannerStartUsing:1,...cloneDeep(e)}

    };
   
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      uploadUrl:`${window.apiBaseURL}/main/aliyunFile`,
      token,
      tokenType,
      dictItemLists,
      message,
      model:modelRef, // 表单数据
      isLoading,
      formRef,
       handleFinish() {
        let { code, data, msg } = JSON.parse(event.target.response);
        if (code == 200) {
          message.success("上传成功");
        
         modelRef.value = { 
            ...modelRef.value,
            homeBannerUrl: data.fileUrl,
          };
         
        } else {
          message.error(msg);
        }
      },
      removeChange() {
        modelRef.value.homeBannerUrl = ''
      },
      handleFinishApp() {
        let { code, data, msg } = JSON.parse(event.target.response);
        if (code == 200) {
          message.success("上传成功");
        
         modelRef.value = { 
            ...modelRef.value,
            mobileHomeBannerUrl: data.fileUrl,
          };
         
        } else {
          message.error(msg);
        }
      },
      removeChangeApp() {
        modelRef.value.mobileHomeBannerUrl = ''
      },
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
        homeBannerName: [
            {
                required: true,
                message: '请输入轮播图名称',
                trigger: ['input', 'blur']
            }
        ],
        newsType: [
            {
                required: true,
                message: '请选择新闻类别',
                trigger: ['input', 'blur']
            }
        ],
      
      },
      
      onPositiveClick (){
        const fn =!modelRef.value.id?creat:edit
         formRef.value.validate((errors) => {
          if (!errors) {
             isLoading.value = true
           
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
    
    
  }
})
</script>