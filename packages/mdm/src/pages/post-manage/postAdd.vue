<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="'岗位新增'"
    content="你确认"
    positive-text="确认"
  
    negative-text="取消"
    style="width:800px;"
  >
  <n-spin :show="isLoading">
    <n-form :model="model" ref="formRef" :rules="rules" style="height:600px">
        <n-grid x-gap="8" :cols="2" >
            <n-grid-item>
                <n-form-item path="parentDeptId" label="所属部门">
                     <n-tree-select 
                      @update:value="(p)=>{
                        model.parentDeptId=p
                        model.parentDeptName=filterTableMater(p,treeList).orgName
                        model.orgFullId=filterTableMater(p,treeList).orgFullId
                        model.orgFullName=filterTableMater(p,treeList).orgFullName
                        model.parentOrgId=filterTableMater(p,treeList).parentOrgId  
                        model.parentOrgName=filterTableMater(p,treeList).parentOrgName  
                        model.parentDeptFullName=filterTableMater(p,treeList).parentDeptFullName 
                        model.parentOrgFullName =filterTableMater(p,treeList).parentOrgFullName 
                        
                      }"
                      filterable
                      clearable
                       :options="treeList" 
                       v-model="model.parentDeptId" 
                    />
                
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item path="postName" label="岗位名称">
                    <n-input
                        v-model:value="model.postName"
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="postCode" label="岗位编号">
                    <n-input
                        v-model:value="model.postCode"
                    />
                </n-form-item>
            </n-grid-item>
           
            <n-grid-item>
                <n-form-item path="email" label="邮箱">
                    <n-input
                        v-model:value="model.email"
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="postGradeId" label="职等">
                     <n-select
                        filterable
                        v-model:value="model.postGradeId"
                        placeholder="请选择职等"
                        :options="dictionaries.mdmPostGradeDictList"
                        
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="postUpParentId" label="上级部门">
                     <n-tree-select 
                      @update:value="(p)=>{
                       
                        model.postUpParentId=p
                        model.postUpParentName=filterTableMater(p,treeList).orgName
                      }"
                       :options="getStr(treeList)" 
                       filterable
                       v-model="model.postUpParentId" 
                       default-expand-all  />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item path="postUpId" label="上级岗位">
                    <!-- <n-select
                        filterable
                        v-model:value="model.postUpId"
                        placeholder="请选择上级岗位"
                        :options="postUpIds"
                        
                    /> -->
                    <n-input  class="my-search" placeholder="" disabled :value="model.postUpName ?model.postUpName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{showPostPickModal({parentDeptId:model.postUpParentId})}">选择</n-button>
                        </template>
                    </n-input>
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="是否启用" path="status">
                      <n-select
                        v-model:value="model.status"
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
          <n-button size="small" type="info" @click="handleValidateButtonClick" >保存</n-button>
            
          </div>
    </template>
  <PostPickModal ref="postPickModal"
    :showSide="false"
    :multiple="false"
    @update:callback="
      (e) => {
        model.postUpId = e.id
        model.postUpName = e.postName
        //$refs.nwTable.commitQuery();
      }
    "
  ></PostPickModal>
  </n-modal>

</template>

<script lang="jsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect ,
    NDatePicker,
    NButton,
    NSpin
} from 'naive-ui'
import {  creatPost, mdmPostGradeDictList, orgPost } from './api'

import PostPickModal from '../../components/postPickModal/postPickModal.vue'

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
        NDatePicker,
        PostPickModal,
        NButton,
        NSpin
    },
    props: {
       treeList:{
         default:()=>[],
         type:Array
      }
    },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const postUpIds = reactive([])
    const postPickModal  = ref()
    const isLoading = ref(false)
    const showPostPickModal = (row) =>{
        postPickModal.value.sonFn(row);
    }
    const dictionaries = reactive({
       mdmPostGradeDictList:[], //岗位职等
    })
    const sonFn = (e={}) => {
      showModalRef.value = true
      modelRef.value = {...e,status:1}
     }
     
   
    const formRef = ref(null)
    
   
   
    
    onMounted(async () => {
    })
    return {
      sonFn,
      dictionaries,
      model:modelRef, // 表单数据
      isLoading,
      showModal: showModalRef,
      postUpIds,
      formRef,
      postPickModal,
      showPostPickModal,
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
          parentDeptId: [
            {
                required: true,
                validator (rule, value) {
                    if (!value) return new Error('请选择主管机构');
                    // return checkOrg(modelRef.value.parentDeptId);
                },
                trigger: ['change', 'blur']
            }
        ],
         postName: [
            {
                required: true,
                message: '请输入职务名称',
                trigger: ['input', 'blur']
            }
        ],
         postCode: [
            {
                required: true,
                message: '请输入职务编号',
                trigger: ['input', 'blur']
            }
        ],
         email: [
            {
                required: true,
                message: '请输入邮箱',
                trigger: ['input', 'blur']
            }
        ],
        status: [
            {
                required: true,
                message: '请选择是否启用',
                type:'number',
                trigger: ['input', 'blur']
            }
        ],
      },
    
      handleValidateButtonClick (e) {
        formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            creatPost(modelRef.value).then((res)=>{
                context.emit('update:callback');
                showModalRef.value = false
            }).finally(r => {
             
              isLoading.value = false
            })
          } else {
            console.log(errors)
            
          }
        })
      },
     
    }
  },
  methods:{
    postSequIdChange(postSequId){
        //岗位职等
        mdmPostGradeDictList({
              postSequId,
              postSequName:this.model.postSequName
            }).then((res)=>{
              this.dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.postGradeName
                d.value=d.id
                return d
              })
            })
      },
      postGradeIdChange(postGradeId){
        this.dictionaries.mdmPostGradeDictList.map((d)=>{
          if(d.id == postGradeId) {
              this.model.postGradeName =d.label
          }
        })
      },
    postUpParentChange(postUpParentId){
        orgPost({id:postUpParentId}).then((res)=>{
          this.postUpIds = res.map((d)=>{
                  d.label = d.postName
                  d.value=d.id
                  return d
                })
        })
      },
       postUpIdChange(postUpId){
        this.postUpIds.map((d)=>{
          if(d.id == postUpId) {
              this.model.postUpName =d.label
          }
        })
      },
        filterTableMater(id, arr) {
          for (const item of arr) {
            if (item.id === id) return item
            if (item.kids && item.kids.length) {
              const _item = this.filterTableMater(id, item.kids)
              if (_item) return _item
            }
          }
        },
        getStr(list){
            list.forEach((row)=>{
                if(row.kids.length>0){
                    
                    this.getStr(row.kids)
                }else {
                    
                        row.disabled = false
                   
                }
            })
            return list
        }
     
  },
   
})
</script>