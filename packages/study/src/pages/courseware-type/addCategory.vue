<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="model.data.id ?`编辑字典`: `新设字典`"
    content="你确认"
    positive-text="确认"
   
    negative-text="取消"
    style="width:500px;"
  >
    <n-spin :show="isLoading">
      <n-form  :model="model.data" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1" >
            <n-grid-item>
                <n-form-item label="父级节点" path="parentCode">
                    <n-tree-select  :options="parentList" size="small" 
                      :default-value="model.data.parentCode"
                      placeholder="请选择" 
                      v-model:value="model.data.parentCode" 
                      filterable
                      clearable
                     />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="字典名称" path="dictName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.data.dictName" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="字典code" path="dictCode">
                    <n-input size="small" placeholder="请输入" v-model:value="model.data.dictCode" />
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
  import {   creatDictTree, allClassifys, editDictTree} from './api'

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
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = reactive({data:{}})
    const parentList = reactive([{ label:'课件分类',key:'study_cou_type',id:'study_cou_type',children:[]}])
    const isLoading = ref(false)
    const formRef = ref(null)
    const sonFn = (data={}) => {

      showModalRef.value = true
      isLoading.value = true
         
       allClassifys('study_cou_type').then((res)=>{
           const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.dictName
                       row.key = row.dictCode 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                      row.key = row.dictCode 
                      row.label = row.dictName
                       
                    }
                })
            }
            getStr(res)
            // parentList[0].label = "root"
            parentList[0].label = "课件分类"
            parentList[0].children = res 
            model.data = {...data}
            isLoading.value = false
        })
    };
    const onPositiveClick =()=>{
      const fn = model.data.id ? editDictTree : creatDictTree
      formRef.value.validate((errors) => {
        if (!errors) {
           isLoading.value = true
            fn( model.data ).then((res)=>{
              if(res){
                context.emit('update:callback');
                showModalRef.value = false
              }

            }).finally(r => {
              isLoading.value = false
            })
          }
      })
        
    }
    onMounted(async () => {
       
    })
    return {
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      parentList,
       isLoading,
      formRef,
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
      onPositiveClick,
      getParentName(e){
        // const  filterTableMater=(id, arr) =>{
        //       for (const item of arr) {
        //         if (item.id === id) return item
        //         if (item.kids && item.kids.length) {
        //           const _item = filterTableMater(id, item.kids)
        //           if (_item) return _item
        //         }
        //       }
        //     }
        //     model.parentName = filterTableMater(e,tree.treeList).orgName
            
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  }
})
</script>