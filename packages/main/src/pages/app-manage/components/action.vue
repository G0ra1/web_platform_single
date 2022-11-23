<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="应用维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:800px;"
    ref="xmodal"
  >
  <n-spin :show="isLoading">
      <n-form  :model="model" ref="formRef" style="padding:0 10px" :rules="rules">
         
          <n-grid x-gap="8" :cols="2" >
             <n-grid-item>
                <n-form-item label="所属分类" path="appTypeName">
                  <n-input size="small" disabled placeholder="请输入" v-model:value="model.appTypeName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="排序" path="sn">
                    <n-input size="small" placeholder="请输入" v-model:value="model.sn" />
                  </n-form-item>
              </n-grid-item>
             <n-grid-item>
                <n-form-item label="应用名称" path="appName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.appName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="图标" path="icon">
                    <nw-icon-pick v-model:value="model.icon" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="应用编码" path="appCode">
                      <n-input size="small" placeholder="请输入" v-model:value="model.appCode" />
                  </n-form-item>
              </n-grid-item>
                <n-grid-item>
                <n-form-item label="应用类型" path="appType">
                      <n-select
                          v-model:value="model.appType"
                          placeholder="请选择按钮尺寸"
                          :options="[
                              {value:0,label:'内置应用'},
                              {value:1,label:'三方应用'},
                             
                          ]"
                      />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item path="platformDictCode" label="所属平台">
                        <nw-dic
                          v-model:value="model.platformDictCode"
                          v-model:label="model.platformDictName"
                          size='small'
                          :request="{
                            XHR: dictItemLists,
                            params:'subordinate_platform',
                          }"
                          :response="{
                            dataMethod: (res) =>
                              res.map(({ dictItemCode: value, dictItemName: label }) => ({
                                value,
                                label,
                              })),
                          }"
                          placeholder="请选择门户"
                        />
                    </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item path="platformDictCode" label="数据源名称">
                        <nw-dic
                          v-model:value="model.resourceId"
                          v-model:label="model.resourceName"
                          size='small'
                          :request="{
                            XHR: resourceList,
                            params:'1',
                          }"
                          :response="{
                            dataMethod: (res) =>
                              res.map(({ id: value, poolName: label }) => ({
                                value,
                                label,
                              })),
                          }"
                          placeholder="请选择数据源"
                        />
                    </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="版本号" path="version">
                      <n-input size="small" placeholder="请输入" v-model:value="model.version" />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item v-if="model.appType == 1">
                  <n-form-item label="地址" path="link">
                      <n-input size="small" placeholder="请输入" v-model:value="model.link" />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item :span='24'>
                  <n-form-item label="描述" path="remark"  >
                      <n-input size="small" placeholder="请输入" type="textarea" v-model:value="model.remark" />
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
    useMessage,
    NImage,
    NText,
    NP
} from 'naive-ui'
import { dictItemLists, creatApp, editApp, resourceList } from '../api'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';


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
        NImage,
        NText,
        NP,
        NwDic,
        NwIcon,
        NwIconPick,
    },
    props: {
        
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const formRef = ref()
    const isLoading = ref(false)
    const platformDictCodes = ref([])
    const message = useMessage();
   
    const sonFn = (e={}) => {
      showModalRef.value = true
       modelRef.value={...e}
      
    };
    onMounted(()=>{
      // dictItemLists('subordinate_platform').then((r)=>[
      //   platformDictCodes.value = r
      // ])
    })
  
    return {
      showModal:showModalRef,
      message,
      model:modelRef,
      formRef,
      isLoading,
      sonFn,
      platformDictCodes,
      dictItemLists,
      resourceList,
      onPositiveClick (){
        const fn =!modelRef.value.id?creatApp:editApp
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
<style scoped lang="less">

</style>