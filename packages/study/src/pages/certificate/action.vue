<template>
  <n-drawer
    v-model:show="showModal"
    style="width:100%;"
  >
  <n-drawer-content title="证书维护" closable>
    <n-spin :show="isLoading">
       <n-grid x-gap="8"  >
          <n-grid-item  span="16">
            <n-card hoverable title="基本信息">
             <n-form  :model="model" ref="formRef" :rules="rules">
              <n-grid x-gap="8" :cols="1" >
                  <n-grid-item>
                      <n-form-item label="证书名称" path="certificateName">
                          <n-input size="small" placeholder="请输入" v-model:value="model.certificateName" />
                      </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                      <n-form-item path="typeCode" label="证书分类">
                            <n-tree-select
                              :options="types"
                              size="small"
                              placeholder="请选择"
                              v-model:value="model.typeCode"
                              filterable
                              clearable
                              @update:value="(v)=>{
                                model.typeName = filterTableMater(v,types).label
                              }"
                            />
                      </n-form-item>
                  </n-grid-item>
                
                  <n-grid-item>
                    <n-form-item
                        label="上传模板"
                        path="icon"
                    >
                    <n-upload
                        :action="uploadUrl"
                        accept="docx/*"
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
                      <!-- <nw-icon name="icon-add-bold" :size="45"/> -->
                      <n-upload-dragger  v-if="!model.fileName" >
                        <div style="margin-bottom: 12px">
                         <nw-icon name="icon-daoru2" :size="45"/>
                        </div>
                        <n-text style="font-size: 16px">
                          只能上传docx格式文档
                        </n-text>
                        <n-p depth="3" style="margin: 8px 0 0 0">
                          
                        </n-p>
                      </n-upload-dragger>
                      <n-tag type="success" closable @close="handleClose" v-if="model.fileName">
                        {{model.fileName}}
                      </n-tag>
                    </n-upload>
                </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="颁发机构" path="issuer">
                      <n-input size="small" placeholder="请输入"   v-model:value="model.issuer" />
                  </n-form-item>
                </n-grid-item>
                 <n-grid-item>
                  <n-form-item label="有效期限" path="validity">
                      <n-input-number v-model:value="model.validity" >
                        <template #suffix>
                          年
                        </template>
                      </n-input-number><span style="color:red;padding-left:5px">*若值为0，则默认为长期</span>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="证书描述" path="instructions">
                      <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.instructions" />
                  </n-form-item>
                </n-grid-item>
              </n-grid>
            </n-form>
            </n-card>
          </n-grid-item>
           <n-grid-item  span="8">
             <n-card hoverable title="证书说明">
              <n-list>
                <template #header>
                  <div class="cerHeader" >
                    证书内容通过文本替换的方式，将您上传的docx文件中的固定变量名称替换成具体的值，变量名称请严格区分大小写！
                  </div>
                </template>
                <template #footer>
                  <div style="width:100%;text-align:center;height: 60px;line-height: 60px;">
                    <n-button size="small" round style="width:60%"  type="info" @click="clientTemplate"  :loading="isTableLoading">模板下载</n-button>
                  </div>
                </template>
                <n-list-item v-for="(item,index) in filds" :key="item.value">
                  <span>{{item.label}}</span> <span>{{item.eLabel}}</span>
                </n-list-item>
              </n-list>
             </n-card>
           </n-grid-item>
      </n-grid>
    </n-spin>
    <template #footer>
      <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
          
        </div>
    </template>
   </n-drawer-content>
  
  </n-drawer>
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
    NImage,
    NTag,
    NDrawer,
    NDrawerContent,
    NCard,
    NList,
    NListItem,
    NInputNumber,
    NUploadDragger,
    NIcon,
    NText
} from 'naive-ui'
import {  creat, edit,allClassifys,exportTemplate } from './api'
import { cloneDeep } from 'lodash'

import { NwIcon, Cookies } from '@platform/main'

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
        NTag,
        NDrawer,
        NDrawerContent,
        NCard,
        NList,
        NListItem,
        NInputNumber,
         NUploadDragger,
         NIcon,
         NText
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
    const types = ref([])
    const isTableLoading = ref(false)

    const sonFn = (e={}) => {
      showModalRef.value = true
      
      modelRef.value=cloneDeep({validity:0,...e})
    }

    const handleClose = () =>{
      modelRef.value.fileName = ''
      modelRef.value.fileSize = ''
      modelRef.value.fileUrl = ''
    }
    const  filterTableMater=(dictCode, arr) =>{
      for (const item of arr) {
        if (item.dictCode === dictCode) return item
        if (item.kids && item.kids.length) {
          const _item = filterTableMater(dictCode, item.kids)
          if (_item) return _item
        }
      }
    }
    onMounted(async () => {
      allClassifys('certificate_type').then((r)=>{
         const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.dictName
                        row.key = row.dictCode 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.dictName
                        row.key = row.dictCode
                    }
                })
          }
          getStr(r)
          types.value = r
       })
    })
    return {
      sonFn,
      handleClose,
      filterTableMater,
      showModal: showModalRef,
      types,
      isTableLoading,
      uploadUrl: `${window.apiBaseURL}/file/aliyunFile`,
      token,
      tokenType,
      model:modelRef, // 表单数据
      isLoading,
      message,
      formRef,
      filds:reactive([
        {label:'{{CERTIFICATE_NAME}}',eLabel:'证书名称', value:0},
        {label:'{{CERTIFICATE_CODE}}',eLabel:'证书编码', value:1},
        {label:'{{SPECIAL_NAME}}',eLabel:'专题名称', value:2},
        {label:'{{FULL_NAME}}',eLabel:'学员姓名', value:3},
        {label:'{{IDCARD}}',eLabel:'学员身份证号', value:4},
        {label:'{{ISSUER}}',eLabel:'颁发机构', value:5},
        {label:'{{LEVEL}}',eLabel:'考试等级', value:6},
        {label:'{{ISSUE_TIME}}',eLabel:'发证时间', value:7},
        {label:'{{VALIDITY_TIME}}',eLabel:'证书有效期', value:8},

      ]),
      rules: {
        certificateName: [
            {
                required: true,
                message: '请输入证书名称',
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
          fileUrl: data.fileUrl,
          fileId: data.id,
          fileName: data.fileName,
          filePath:data. filePath
        };
      } else {
        this.message.error(msg);
      }
      this.isLoading = false;
    },
    beforeUpload() {
      this.isLoading = true;
    },
    clientTemplate() {
       this.isTableLoading = true
      exportTemplate().then(r => {
        this.isTableLoading = false
      })
      
    },
  }
})
</script>
<style lang="less" scoped>
  .cerHeader{
    width: 100%;
    padding: 8px 16px;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    background-color: #FFFFFF;
    overflow: hidden;
    opacity: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    background-color: #e7faf0;
    color: #13ce66;
  }
  /deep/ .n-list .n-list__header, .n-list .n-list__footer{
    padding:0
  }
  /deep/ .n-upload-trigger{
    width:100%
  }
</style>