<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="课件维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:800px;"
    ref="xmodal"
  >
  <n-spin :show="isLoading">
      <n-form  :model="model" ref="formRef" :rules="rules">
          <n-grid x-gap="8" :cols="1" >
              <n-grid-item>
                  <n-form-item path="couType" label="课件类型">
                      <n-select
                          v-model:value="model.couType"
                          placeholder="请选择类型"
                          :options="couTypes"
                          size="small" 
                    />
                  </n-form-item>
              </n-grid-item>

              <n-grid-item>
                  <n-form-item label="课件名称" path="couName">
                      <n-input size="small" placeholder="请输入" v-model:value="model.couName" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="所属分类" path="labelCode">
                    <n-tree-select
                        :options="props.coursewareS"
                        size="small"
                        placeholder="请选择"
                        v-model:value="model.labelCode"
                        filterable
                        clearable
                        @update:value="(v)=>{
                          model.labelName = filterTableMater(v,props.coursewareS).label
                        }"
                      />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="使用权限" path="useRange">
                      <n-select
                          v-model:value="model.useRange"
                          placeholder="请选择类型"
                          :options="useRanges"
                          size="small" 
                      />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item v-if="model.useRange == 2"> 
                  <n-form-item path="orgPermList" label="权限部门" >
                        <n-input size="small" placeholder="" disabled :title="(model.orgPermList ? model.orgPermList : []).map(d=>d.rangeName).join(',')"  :value="(model.orgPermList ? model.orgPermList : []).map(d=>d.rangeName).join(',')" >
                          <template #suffix>
                              <n-button type="info" size="small"   @Click="(e)=>{chooseDept.sonFn(model.orgPermList)}">选择</n-button>
                          </template>
                        </n-input>
                  </n-form-item>
              </n-grid-item>
              <n-grid-item v-if="model.useRange == 2">
                  <n-form-item path="userPermList" label="权限人员" >
                        <n-input size="small" placeholder="" disabled :title="(model.userPermList?model.userPermList:[]).map(d=>d.rangeName).join(',')"  :value="(model.userPermList?model.userPermList:[]).map(d=>d.rangeName).join(',')"  >
                          <template #suffix>
                              <n-button size="small"  type="info"   @Click="(e)=>{employeePickModal.sonFn()}">选择</n-button>
                          </template>
                        </n-input>
                  </n-form-item>
              </n-grid-item>
              
             
              <n-grid-item span="24">
                <n-form-item
                  label="附件上传"
                  path="fileUrl"
                >
                  <n-upload
                      ref="upload"
                      style="width:100%"
                      action=""
                      v-model:file-list="fileList"
                      directory-dnd
                      @remove="removeChange"
                     :custom-request="customRequest"
                      :headers="{
                          Authorization: `${tokenType} ${token}`,
                      }"
                     
                  >
                      <n-upload-dragger v-if="!fileList.length">
                          <div style="margin-bottom: 12px">
                              <nw-icon name="icon-daoru2" :size="45"/>
                          </div>
                          <n-text style="font-size: 16px">
                              点击或者拖动文件到该区域来上传
                          </n-text>
                          <n-p depth="3" style="margin: 8px 0 0 0">
                              {{props.textNP}}
                          </n-p>
                      </n-upload-dragger>
                  </n-upload>
                </n-form-item>
              </n-grid-item>
          </n-grid>
      </n-form>
  </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" :disabled="btloading">保存</n-button>
        </div>
    </template>
    <EmployeePickModal
      ref="employeePickModal"
      :showSide="true"
      :multiple="true"
      :value="(model.userPermList ? model.userPermList:[]).map(d=>{
        d.userId = d.rangeId
        return d
      })"
      @update:callback="
        (e) => {
           model.userPermList = []
            e.map(d=>{
              model.userPermList.push({
                  rangeId:d.empId,
                  rangeName:d.userNameCh,
                  
              })
            })
        }
      "
    ></EmployeePickModal>
    <ChooseDept 
        ref="chooseDept"
       @update:callback="
          (e) => {
          model.orgPermList =[]
          e.map(d=>{
            model.orgPermList.push({
                rangeType:d.orgType,
                rangeId:d.id,
                rangeName:d.orgName,
            })
          })
        }"
    ></ChooseDept>
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
    NTag,
    NUpload,
    useMessage,
    NImage,
    NText,
    NUploadDragger,
    NP
} from 'naive-ui'
import {  creatStudyClassCouDef, editStudyClassCouDef,dictItemLists,detail,stsCredentials } from './api'
import { cloneDeep } from 'lodash'
import Video from "video.js";
import EmployeePickModal from "../../components/employeePickModal/employeePickModal.vue";
import ChooseDept from "../../components/chooseDept/index.vue";
import { NwIcon, Cookies } from '@platform/main'

import OSS from "ali-oss";
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
        NTag,
        NUpload,
        NImage,
        EmployeePickModal,
        ChooseDept,
        NwIcon,
        NUploadDragger,
        NText,
        NP,
    },
    props: {
         coursewareS: {
          default: [],
          type: Array,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const isLoading = ref(false)
    const btloading = ref(false)
    const formRef = ref(null)
    const message = useMessage();
    const isError = ref(false);
    const videoSrc = ref("");
    const videoRef = ref();
    const player = ref();
    const chooseDept = ref()
    const fileDuration = ref(0)
    const fileListRef = ref([]);
    const employeePickModal = ref()
     const uploadRef = ref(null);
    const  filterTableMater=(dictCode, arr) =>{
      for (const item of arr) {
        if (item.dictCode === dictCode) return item
        if (item.kids && item.kids.length) {
          const _item = filterTableMater(dictCode, item.kids)
          if (_item) return _item
        }
      }
    }
    const sonFn = (e={}) => {
      showModalRef.value = true
       modelRef.value=cloneDeep(e)
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
     
    };
    const dataObj= ref({	//提交到OSS的参数
      region:'oss-cn-beijing',
      accessKeyId: "",
      accessKeySecret: "9QCn4egZsJFx59st5Wq4Dm6xyhpLZUiC5seAkmgmqQtk",
      bucket: "zhongyuanjian",
      stsToken:''
    })
    const  getVideoDuration = (src) => {
        return new Promise((res, rej) => {
            const v = document.createElement('video');
            if (typeof src === 'string') {
              v.src = src;
            }
            else {
              v.src = URL.createObjectURL(src);
            }
            v.autoplay = false
            v.muted = false
            // v.play();
            v.addEventListener('loadedmetadata', () => {
                +v.duration && res(v.duration);
                !+v.duration && res(null);
            });
            v.addEventListener('durationchange', () => {
                +v.duration && res(v.duration);
                !+v.duration && res(null);
            });
            v.addEventListener('error', () => {
                res(null);
            });
             setTimeout(()=>{
                v.remove()
            }, 3000)
        });
    }
    // 随机生成id
    const  generateUUID =() => {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    onMounted(async () => {
       
    })
    return {
      Video,
      upload: uploadRef,
      fileList:fileListRef,
      filterTableMater,
      isError,
      props,
      sonFn,
      employeePickModal,
      player,
      generateUUID,
      chooseDept,
      showModal: showModalRef,
      videoRef,
      model:modelRef, // 表单数据
      isLoading,
      dictItemLists,
      uploadUrl:'',
      customRequest({
        file,
        data,
        headers,
        withCredentials,
        action,
        onFinish,
        onError,
        onProgress
      }) {
        stsCredentials().then((r)=>{
            dataObj.value = {...dataObj.value,stsToken:r.securityToken,bucket:r.bucketName,...r,}
          
            getVideoDuration(new Blob([file.file])).then(res=>{
               modelRef.value.studyTime = parseInt(res*1000)
               console.log( modelRef.value.studyTime,'-=-=-=-=-= modelRef.value.studyTime',new Blob([file]))
            })
            /**
             * 阿里云OSS上传
            */
             var ext = file.name.slice(file.name.lastIndexOf(".")+1).toLowerCase()
              var date=new Date;
              var year=date.getFullYear(); 
              var month=date.getMonth()+1;
              month =(month<10 ? "0"+month:month); 
              // 获取当前是几号
              var strDate = date.getDate();
              if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
              }
              var mydate = (year.toString()+'/'+month.toString()+'/'+strDate+'/'+generateUUID()+'.'+ext);
              // const fileName = `${Date.parse(new Date())}`;  //定义唯一的文件名
              let client = new OSS({...dataObj.value})
              btloading.value = true
              client.multipartUpload(mydate, file.file,{
                progress: (p) => {
                  onProgress({ percent: Math.ceil(p*100) })
                }
              }).then(({res, url, name}) => {
                    if (res && res.status == 200) {
                          modelRef.value = {
                          ...modelRef.value,
                          fileName: file.name,
                          fileId: '0',
                          fileSize:file.file.size,
                          fileUrl:`https://${dataObj.value.bucket}.oss-cn-beijing.aliyuncs.com/${mydate}`,
                        };
                        message.success("上传成功");
                        onFinish();
                        btloading.value = false
                    }
                }).catch((err) => {
                    message.error("上传失败，请联系管理员");
                    console.log(`阿里云OSS上传图片失败回调`, err);
                    btloading.value = false
                    onError();
                });
        })
      },
     
      token,
      tokenType,
      dataObj,
      message,
      formRef,
      fileDuration,
      btloading,
      useRanges:reactive([
        {label:'公开',value:1},
        {label:'私有',value:2},
      ]),
       couTypes:reactive([
       
        {label:'音频',value:1},
        {label:'视频',value:2},
        {label:'文档',value:3},
       
      ]),
      rules: {
        couName: [
            {
                required: true,
                message: '请输入名称',
                trigger: ['input', 'blur']
            }
        ],
        couType: [
            {
                required: true,
                message: '请选择类型',
                trigger: ['input', 'blur'],
                type:'number'
            }
        ],
        labelCode: [
            {
                required: true,
                message: '请选择分类',
                trigger: ['input', 'blur']
            }
        ],
      },
 
    getVideoDuration,
   
    onPositiveClick (){
        const fn =!modelRef.value.id?creatStudyClassCouDef:editStudyClassCouDef
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
    removeChange() {
      this.model.fileName = ''
      this.model.fileSize = ''
      this.model.fileUrl = ''
      this.model.studyTime = ''
      this.model.fileId = ''
    },
   
   

    
  }
})
</script>
<style scoped lang="less">
 /deep/ .n-upload-trigger{
   width:100%
 }
</style>