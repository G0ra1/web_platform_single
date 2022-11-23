<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="资源维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:800px;"
    ref="xmodal"
  >
  <n-spin :show="isLoading">
      <n-form  :model="model" ref="formRef" :rules="rules">
         
          <n-grid x-gap="8" :cols="2" >
             <n-grid-item>
                <n-form-item label="应用入口名称" path="appName">
                  <n-input size="small" disabled placeholder="请输入" v-model:value="model.bizMenuName" />
                </n-form-item>
              </n-grid-item>
                <n-grid-item>
                <n-form-item label="应用入口编码" path="appCode">
                  <n-input size="small" disabled placeholder="请输入" v-model:value="model.bizMenuCode" />
                </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="菜单名称" path="menuName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.menuName" />
                </n-form-item>
              </n-grid-item>
             
            
              <n-grid-item>
                <n-form-item label="图标" path="menuIcon">
                    <nw-icon-pick v-model:value="model.menuIcon" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="菜单编码" path="menuCode">
                      <n-input size="small" placeholder="请输入" v-model:value="model.menuCode" />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="排序" path="sort">
                    <n-input size="small" placeholder="请输入" v-model:value="model.sort" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item :span="12" label="父级菜单" path="parentId">
                    <!-- <n-input size="small" style="margin-right: 5px;m" />
                    <n-button type="info" size="small" @click="showMenuPick" >选择</n-button> -->
                    <menu-pick
                        :bizMenuCode="model.bizMenuCode"                   
                        v-model:value="model.parentId"
                        v-model:name="model.parentName"
                        v-model:parentFullId="model.parentFullId"
                        v-model:parentFullName="model.parentFullName"
                    />
                </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item :span="12" label="是否为叶节点" path="menuType">
                   <!-- <n-switch
                    :checked-value="1"
                    :unchecked-value="0"
                    v-model:value="model.menuType" /> -->
                    <n-radio-group v-model:value="model.menuType">
                      <n-space>
                        <n-radio :value="0">
                          一级页面
                        </n-radio>
                        <n-radio :value="1">
                          页面
                        </n-radio>
                        <n-radio :value="3">
                          菜单分类
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                </n-form-item>
              </n-grid-item>
              <n-grid-item :span='24'>
                  <n-form-item label="描述" path="description"  >
                      <n-input size="small" placeholder="请输入" type="textarea" v-model:value="model.description" />
                  </n-form-item>
              </n-grid-item>
              <!-- 这里改为1菜单也可关联页面 -->
              <n-grid-item v-if="model.menuType !== 3" >
                  <n-form-item label="关联页面" path="formId">
                      <nw-pick-page
                       
                         @update:value="(d,n) => getFormMessage(d,n)"
                    />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item v-if="model.menuType !== 3" >
                  <n-form-item label="url" path="formUrl">
                      <n-input size="small" placeholder="请输入" disabled v-model:value="model.formUrl" />
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
    NSpace,
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
    NRadioGroup,
    NRadio,
    NP,
    NSwitch
} from 'naive-ui'
import {  creatApp, editApp,  } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage } from '@platform/main';


export default defineComponent({
    components: {
      NSpace,
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
      NRadioGroup,
      NRadio,
      NP,
      NwDic,
      NwIcon,
      NwIconPick,
      MenuPick,
      NwPickPage,
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
      getFormMessage(d,n){
        console.log(n)
        modelRef.value.formId = n.id
        modelRef.value.formUrl = n.pageUrl
        modelRef.value.formTargetUrl = n.targetUrl
        modelRef.value.formListMethodType = n.formListMethodType
        modelRef.value.formListUrl = n.formListUrl
      },
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