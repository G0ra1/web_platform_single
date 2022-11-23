<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="功能维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:800px;"
    ref="xmodal"
  >
  <n-spin :show="isLoading">
      <n-form  :model="model" ref="formRef" :rules="rules">
         
          <n-grid x-gap="8" :cols="2" >
              <!-- <n-grid-item >
                  <n-form-item label="关联功能" path="functionId">
                      <nw-pick-cpts
                        v-model:fullName="model.menuName"
                        v-model:value="model.functionId"
                        @callback="(d) => getFormMessage(d)"
                    />
                  </n-form-item>
              </n-grid-item> -->
           
             <n-grid-item>
                <n-form-item label="按钮名称" path="menuName">
                  <n-input size="small"  placeholder="请输入" v-model:value="model.menuName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="按钮编码" path="menuCode" disabled>
                  <n-input size="small"  placeholder="请输入" v-model:value="model.menuCode" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="所属菜单" path="parentFullName">
                  <n-input size="small" disabled placeholder="请输入" v-model:value="model.parentFullName" />
                </n-form-item>
              </n-grid-item>
           
              <n-grid-item>
                <n-form-item label="页面名称" path="parentName">
                  <n-input size="small" disabled placeholder="请输入" v-model:value="model.parentName" />
                </n-form-item>
              </n-grid-item>
             
               <n-grid-item>
                  <n-form-item label="表单按钮code" path="buttonCode">
                      <n-input size="small" placeholder="请输入" v-model:value="model.buttonCode" />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="排序" path="sort">
                    <n-input size="small" placeholder="请输入" v-model:value="model.sort" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="按钮类型" path="buttonType">
                      <n-select
                          v-model:value="model.buttonType"
                          placeholder="请选择按钮类型"
                          :options="[
                              {value:'default',label:'default'},
                              {value:'tertiary',label:'tertiary'},
                              {value:'primary',label:'primary'},
                              {value:'success',label:'success'},
                              {value:'info',label:'info'},
                              {value:'warning',label:'warning'},
                              {value:'error',label:'error'}]"
                      />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="按钮尺寸" path="buttonSize">
                      <n-select
                          v-model:value="model.buttonSize"
                          placeholder="请选择按钮尺寸"
                          :options="[
                              {value:'tiny',label:'tiny'},
                              {value:'small',label:'small'},
                              {value:'medium',label:'medium'},
                              {value:'large',label:'large'},
                          ]"
                      />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item >
                  <n-form-item label="关联功能" path="functionId">
                      <nw-pick-cpts
                        v-model:fullName="model.functionName"
                        v-model:value="model.functionId"
                    />
                  </n-form-item>
              </n-grid-item>
              
              <n-grid-item :span='24'>
                  <n-form-item label="描述" path="description"  >
                      <n-input size="small" placeholder="请输入" type="textarea" v-model:value="model.description" />
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
<script lang='jsx'>
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
    NP,
    NSwitch
} from 'naive-ui'
import {  creatApp, editApp,  } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickCpts } from '@platform/main';


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
        MenuPick,
        NwPickCpts,
        NSwitch
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
      
    }

    onMounted(()=>{
     
     
    })
  
    return {
      showModal:showModalRef,
      message,
      model:modelRef,
      formRef,
      isLoading,
      sonFn,
      // getFormMessage(d){
      //   modelRef.value.functionCode = d.code
      //   // modelRef.value.functionId = d.id
      // },
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