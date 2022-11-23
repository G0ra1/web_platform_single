<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="流程分类维护"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:500px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1" >
            <n-grid-item>
                <n-form-item label="父级节点" path="parentId">
                    <n-tree-select  :options="parentList" size="small" 
                      :default-value="model.parentId"
                      placeholder="请选择" 
                      v-model:value="model.parentId" 
                      filterable
                      clearable
                     />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="流程分类名称" path="procdefTypeName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.procdefTypeName" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                  <n-form-item label="是否启用" path="isEnable">
                    <n-select
                          v-model:value="model.isEnable"
                          size="small"
                          placeholder="请选择是否启用"
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
    NSpin
} from 'naive-ui'
import {  create, modify,queryAll } from './api'
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
     },
  setup (props,context) {
    const showModalRef = ref(false)
    const model = ref({})
    const isLoading = ref(false)
    const formRef = ref(null)
    const parentList = reactive([{ label:'root',key:'0',id:'0',children:[]}])
    const sonFn = (e={}) => {
      showModalRef.value = true
       isLoading.value = true
      
       queryAll().then((res)=>{
          res.map((d)=>{
            d.level = 1
            return d
          })
           const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.procdefTypeName
                       row.key = row.id 
                       row.disabled =  row.level == 1 ? false : true
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                       row.disabled =  row.level == 1 ? false : true
                      row.key = row.id 
                      row.label = row.procdefTypeName
                       
                    }
                })
            }
            getStr(res)
            parentList[0].label = "root"
            parentList[0].children = res 
            model.value={isEnable:1,...cloneDeep(e)}
            isLoading.value = false
        })
    };
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      model, // 表单数据
      isLoading,
      formRef,
      parentList,
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
        procdefTypeName: [
            {
                required: true,
                message: '请输入流程分类名称',
                trigger: ['input', 'blur']
            }
        ],
       
      },
      
      onPositiveClick (){
        const fn =!model.value.id?create:modify
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