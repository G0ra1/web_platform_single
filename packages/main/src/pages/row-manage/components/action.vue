<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="角色管理"
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
                <n-form-item label="所属应用" path="appName">
                  <n-input placeholder="" disabled v-model:value="model.appName" />
                </n-form-item>
              </n-grid-item>
             <!-- <n-grid-item>
                <n-form-item label="子系统" path="sysId">
                  <nw-dic
                    v-model:value="model.sysId"
                    v-model:label="model.sysName"
                    size='small'
                    :request="{
                      XHR: mdmSysLists,
                      params:{},
                    }"
                    :response="{
                      dataMethod: (res) =>
                        res.map(({ id: value, sysName: label }) => ({
                          value,
                          label,
                        })),
                    }"
                    placeholder="请选择门户"
                  />
                </n-form-item>
              </n-grid-item> -->
              <n-grid-item>
                <n-form-item label="角色名称" path="roleName">
                  <n-input placeholder="请输入" v-model:value="model.roleName" />
                </n-form-item>
              </n-grid-item>
             <n-grid-item>
                <n-form-item label="角色编码" path="roleCode">
                  <n-input placeholder="请输入" v-model:value="model.roleCode" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="角色类型" path="roleType">
                  <n-select
                    v-model:value="model.roleType"
                    placeholder="请选择角色类型"
                    :options="roleTypes"
                  />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="是否启用" path="status">
                  <n-select
                    v-model:value="model.status"
                    placeholder="请选择栏目类型"
                    :options="status"
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
import { dictItemLists, creatMdmRole, editMdmRole, mdmSysLists  } from '../api'
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
    const message = useMessage();
    
    const sonFn = (e={}) => {
      console.log(e,'aaaaaaaaaaaaaaaa')
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
      mdmSysLists,
      isLoading,
      sonFn,
      status: reactive([
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ]),
      roleTypes: reactive([
        {
          label: "功能角色",
          value: 1,
        },
        {
          label: "数据角色",
          value: 2,
        },
        {
          label: "流程角色",
          value: 3,
        },
      ]),
      onPositiveClick (){
        const fn =!modelRef.value.id?creatMdmRole:editMdmRole
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