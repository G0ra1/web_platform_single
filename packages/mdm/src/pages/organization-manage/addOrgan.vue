<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="新设机构"
    content="你确认"
    positive-text="确认"
   
    style="width:500px;"
  >
    <n-spin :show="isLoading">
      <n-form :model="model.value" ref="formRef" :rules="rules">
          <n-grid x-gap="8" :cols="1" >
              <n-grid-item>
                  <n-form-item label="主管机构" path="parentId">
                      <n-tree-select  :options="tree.treeData" size="small" 
                      placeholder="请选择" v-model:value="model.value.parentId" 
                      filterable
                        clearable
                      @update:value="getParentName" />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="机构名称" path="orgName">
                      <n-input size="small" placeholder="请输入" v-model:value="model.value.orgName" />
                  </n-form-item>
              </n-grid-item>
              <!-- <n-grid-item>
                  <n-form-item label="组织类型" path="orgType">
                      <n-select
                        size='small'
                        v-model:value="model.value.orgType"
                        placeholder="请选择组织类型"
                        :options="orgTypes"
                        
                      />
                  </n-form-item>
              </n-grid-item> -->
              <n-grid-item>
                  <n-form-item label="机构编码" path="orgCode">
                      <n-input size="small" placeholder="请输入" v-model:value="model.value.orgCode" />
                  </n-form-item>
              </n-grid-item>
             
               <n-grid-item>
                  <n-form-item label="GEPS级别类型" path="lvType">
                     <n-select
                        size='small'
                        v-model:value="model.value.lvType"
                        placeholder="请选择级别类型"
                        :options="lvTypes"
                        
                      />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                  <n-form-item label="OA级别类型" path="oaLvType">
                     <n-select
                        size='small'
                        v-model:value="model.value.oaLvType"
                        placeholder="请选择级别类型"
                        :options="oaLvTypes"
                        
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
import { defineComponent, ref,reactive,onMounted, computed  } from 'vue'
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
  import {  rightList, creatOrg, checkOrg } from './api'

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
    const isLoading = ref(false)
    const model = reactive({})
    const tree = reactive({treeData:[],treeList:[]})
    const formRef = ref(null)

     const lvTypes = reactive([
      // { label: '建设公司', value: 1 },
      { label: '分公司', value: 2 },
      { label: '项目部', value: 3 },
      { label: '部门', value: 4 },
     
    ])
    const orgTypes = ref([
      { label: '组织', value: 1 },
      { label: '部门', value: 2 },
     
    ])
    const oaLvTypes = reactive([
      { label: 'OA机构', value: 1 },
      { label: 'OA部门', value: 2 },
    ])
    const sonFn = () => {
      showModalRef.value = true
      model.value = {orgType:1}
      rightList({status:1,isDefault:0}).then((res)=>{
          const _arr = []
          tree.treeList = res
           const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.orgName
                        row.key = row.id 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.orgName
                        row.key = row.id
                        _arr.push(row)
                    }
                })
            }
            getStr(res)
            tree.treeData = res
            // tree.treeList = reactive(_arr)
        })
    };
    const onPositiveClick =()=>{
      formRef.value.validate((errors) => {
         if (!errors) {
           isLoading.value=true
            creatOrg([ model.value]).then((res)=>{
              if(res){
                context.emit('update:callback');
                showModalRef.value = false
              }

            }).finally(r => {
              isLoading.value = false;
            })
         } else {
           console.log(errors)
         }
      })
        
        
    };
    // const createFeedback = (id)=> {
    //   if(!id) return;
    //   .then(res=>{
    //     if(!res.data) return '无操作权限!';
    //     return '有操作权限!';
    //   })
    // };
    onMounted(async () => {
     
    })
    return {
      sonFn,
      formRef,
      orgTypes,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      isLoading,
      lvTypes,
      oaLvTypes,
      rules: {
        parentId: [
            {
                required: true,
                validator (rule, value) {
                  if (!value)  return new Error('请选择主管机构');
                  // return checkOrg(model.value.parentId)
                },
                trigger: ['input', 'blur']
            }
        ],
        orgName: [
            {
                required: true,
                message: '请输入机构名称',
                trigger: ['input', 'blur']
            }
        ],
        orgCode: [
            {
                required: true,
                message: '请输入机构编码',
                trigger: ['input', 'blur']
            }
        ],
         lvType: [
            {
                required: true,
                type:'number',
                message: '请选择GEPS级别类型',
                trigger: ['input', 'blur']
            }
        ],
         oaLvType: [
            {
                required: true,
                type:'number',
                message: '请选择OA级别类型',
                trigger: ['input', 'blur']
            }
        ],
           
      },
      onPositiveClick,
      getParentName(e){
        const  filterTableMater=(id, arr) =>{
              for (const item of arr) {
                if (item.id === id) return item
                if (item.kids && item.kids.length) {
                  const _item = filterTableMater(id, item.kids)
                  if (_item) return _item
                }
              }
            }
        model.value.parentName = filterTableMater(e,tree.treeList).orgName
            
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  }
})
</script>