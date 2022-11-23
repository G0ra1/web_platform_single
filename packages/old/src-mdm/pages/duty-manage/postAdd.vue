<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="'职务新增'"
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
                <n-form-item path="dutyName" label="职务名称">
                    <n-input
                        v-model:value="model.dutyName"
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="dutyCode" label="职务编号">
                    <n-input
                        v-model:value="model.dutyCode"
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
                <n-form-item path="dutySequId" label="职务序列">
                     <n-select
                       filterable
                        v-model:value="model.dutySequId"
                        placeholder="请选择职务序列"
                        :options="dictionaries.mdmPostSequDictList"
                        @update:value="(p)=>{
                          dutySequIdChange(p)
                        }"
                       
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="dutyGradeId" label="职等">
                     <n-select
                        filterable
                        v-model:value="model.dutyGradeId"
                        placeholder="请选择职等"
                        :options="dictionaries.mdmPostGradeDictList"
                        @update:value="(p)=>{
                          dutySequIdChange(p)
                        }"
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="dutyUpParentId" label="上级部门">
                     <n-tree-select 
                      @update:value="(p)=>{
                       
                        model.dutyUpParentId=p
                        model.dutyUpParentName=filterTableMater(p,treeList).orgName
                      }"
                       :options="getStr(treeList)" 
                      
                       v-model="model.dutyUpParentId" 
                       default-expand-all  />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item path="dutyUpId" label="上级职务">
                   
                    <n-input  class="my-search" placeholder="" disabled :value="model.dutyUpName ?model.dutyUpName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{showPostPickModal({parentDeptId:model.dutyUpParentId})}">选择</n-button>
                        </template>
                    </n-input>
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="dutyTagId" label="职务标识">
                    <n-select
                        v-model:value="model.dutyTagId"
                        placeholder="请选择职务标识"
                        :options="dictionaries.mdmPostTagDictList"
                         @update:value="(p)=>{
                          dutyTagIdChange(p)
                        }"
                    />
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
  <DutyPickModal ref="dutyPickModal"
    :showSide="false"
    :multiple="false"
    @update:callback="
      (e) => {
        model.dutyUpId = e.dutyId
        model.dutyUpName = e.dutyName
        //$refs.nwTable.commitQuery();
      }
    "
  ></DutyPickModal>
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
import {  creatPost, mdmPostSequDictList, mdmPostGradeDictList,mdmPostTagDictList, orgPost } from './api'

import DutyPickModal from '../../components/dutyPickModal/dutyPickModal.vue'

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
        DutyPickModal,
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
    const dutyPickModal  = ref()
    const showPostPickModal = (row) =>{
        dutyPickModal.value.sonFn(row);
    }
    const isLoading = ref(false)
    const dictionaries = reactive({
      mdmPostSequDictList:[], //职务序列
      mdmPostTagDictList:[], //职务标识
       mdmPostGradeDictList:[], //职务职等
    })
    const sonFn = (e={}) => {
      showModalRef.value = true
      modelRef.value = {...e,status:1}
     }
     
   
    const formRef = ref(null)
    
   
   
    
    onMounted(async () => {
       
              //职务序列
        mdmPostSequDictList({}).then((res)=>{
           dictionaries.mdmPostSequDictList = res.records.map((d)=>{
            d.label = d.dutySequName
            d.value=d.id
            return d
          })
        })
         //职务标识
        mdmPostTagDictList({}).then((res)=>{
           dictionaries.mdmPostTagDictList = res.records.map((d)=>{
            d.label = d.dutyTagName
            d.value=d.id
            return d
          })
        })
    })
    return {
      sonFn,
      dictionaries,
      model:modelRef, // 表单数据
      showModal: showModalRef,
      formRef,
      dutyPickModal,
      showPostPickModal,
      isLoading,
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
         dutyName: [
            {
                required: true,
                message: '请输入职务名称',
                trigger: ['input', 'blur']
            }
        ],
         dutyCode: [
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
    dutySequIdChange(dutySequId){
        this.dictionaries.mdmPostSequDictList.map((d)=>{
          if(d.id == dutySequId) {
              this.model.dutySequName =d.dutySequName
          }
        })
        //职务职等
        mdmPostGradeDictList({
              dutySequId,
              dutySequName:this.model.dutySequName
            }).then((res)=>{
              this.dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.dutyGradeName
                d.value=d.id
                return d
              })
            })
      },
      // dutySequIdChange(dutyGradeId){
      //   this.dictionaries.mdmPostGradeDictList.map((d)=>{
      //     if(d.id == dutyGradeId) {
      //         this.model.dutyGradeName =d.label
      //     }
      //   })
      // },
  
     
       dutyTagIdChange(dutyTagId){
       
        this.dictionaries.mdmPostTagDictList.map((d)=>{
          if(d.id == dutyTagId) {
              this.model.dutyTagName =d.label
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