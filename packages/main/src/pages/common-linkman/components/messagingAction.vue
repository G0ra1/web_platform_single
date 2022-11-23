<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="群发消息"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:800px;"
    ref="xmodal"
  >
  <n-spin :show="isLoading">
      <n-form  :model="model" ref="formRef" style="padding:0 10px" :rules="rules">
         
          <n-grid x-gap="8" :cols="1" >
             <n-grid-item>
                <n-form-item label="接收人" path="appTypeName">
                    <EmployeePickModal
                        :showSide="true"
                        :multiple="true"
                        v-if="row.useRange == 2"
                        :isShowSearch="true"
                        :userName ="(row.userPermList ? row.userPermList:[]).map(d=>{
                        return d.rangeName
                        }).join(',')"
                        :value="(row.userPermList ? row.userPermList:[]).map(d=>{
                        d.userId = d.rangeId
                        return d
                        })"
                        @update:callback="
                        (e) => {
                            row.userPermList = []
                            e.map(d=>{
                                row.userPermList.push({
                                    rangeId:d.empId,
                                    rangeName:d.userNameCh,
                                    
                                })
                            })
                            
                        }
                        "
                    ></EmployeePickModal>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="接收部门" path="sn">
                    <n-input size="small" placeholder="请输入" v-model:value="model.sn" />
                  </n-form-item>
              </n-grid-item>
             <n-grid-item>
                <n-form-item label="提醒方式" path="appName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.appName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="标题">
                    <n-input
                        v-model:value="model.msgTitle"
                        placeholder=""
                    />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="内容">
                    <n-input
                        v-model:value="model.msgContent"
                        type="textarea"
                        placeholder=""
                    />
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
import { } from '../api'
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
      
    })
  
    return {
      showModal:showModalRef,
      message,
      model:modelRef,
      formRef,
      isLoading,
      sonFn,
      platformDictCodes,
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