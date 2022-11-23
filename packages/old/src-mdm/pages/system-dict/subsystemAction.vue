<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="数据字典管理"
    content="你确认"
    positive-text="确认"
   
    negative-text="取消"
    style="width:500px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1" >
            
            <n-grid-item>
                <n-form-item label="字典名称" path="dictName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.dictName" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="字典编码" path="dictCode">
                    <n-input size="small" placeholder="请输入" v-model:value="model.dictCode " />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="字典项别名" path="dictNameAlias">
                    <n-input size="small" placeholder="请输入" v-model:value="model.dictNameAlias" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="字典项编码别名" path="dictCodeAlias">
                    <n-input size="small" placeholder="请输入" v-model:value="model.dictCodeAlias " />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="备注" path="remark">
                  <n-input size="small" placeholder="请输入" v-model:value="model.remark " />

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
    NSpin,
} from 'naive-ui'
  import {   creatDictType,editDictType, } from './api'
import { cloneDeep } from 'lodash'

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
        NSpin
        
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = ref({})
    const isLoading = ref(false)
    const formRef = ref(null)
    const sonFn = (e={}) => {
      showModalRef.value = true
      model.value=cloneDeep(e)

    };
   
    onMounted(async () => {
       
    })
    return {
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      isLoading,
      formRef,
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
       rules: {
        dictName: [
            {
                required: true,
                message: '请输入字典名称',
                trigger: ['input', 'blur']
            }
        ],
        dictCode: [
            {
                required: true,
                message: '请输入字典code',
                trigger: ['input', 'blur']
            }
        ],
       
        
      },
      onPositiveClick (){
        const fn =!model.value.id?creatDictType:editDictType
        formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            fn(model.value).then((res)=>{
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