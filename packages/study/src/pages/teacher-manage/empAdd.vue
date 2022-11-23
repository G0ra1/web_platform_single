<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="教师信息"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:800px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="2" >
            
           
             <n-grid-item>
                <n-form-item label="姓名" path="userNameCh">
                    <n-input size="small"  placeholder="请输入" v-model:value="model.userNameCh" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                    <n-form-item label="证件类型" path="cardType">
                        <n-select
                          size="small" 
                          v-model:value="model.cardType"
                          placeholder="请选择证件类型"
                          :options="cardTypes"
                          
                        />
                    </n-form-item>
                </n-grid-item>
            <n-grid-item>
                <n-form-item label="证件号" path="idCard">
                    <n-input size="small"   placeholder="请输入" v-model:value="model.idCard " />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="手机号" path="phoneNum">
                    <n-input size="small"  placeholder="请输入" v-model:value="model.phoneNum " />
                </n-form-item>
            </n-grid-item>
           
            <n-grid-item>
                <n-form-item path="sex" label="性别">
                    <n-select
                        v-model:value="model.sex"
                        placeholder="请选择性别"
                        :options="sexList"
                        size="small" 
                  />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item path="status" label="状态">
                    <n-select
                        v-model:value="model.status"
                        placeholder="请选择性别"
                        :options="statusList"
                        size="small" 
                  />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
             <n-form-item path="parentDeptId" label="所属部门">
                    <n-tree-select 
                      size="small"
                      @update:value="(p)=>{
                        model.parentDeptId=p
                        model.parentDeptName=filterTableMater(p,tree.treeList).orgName
                        model.orgFullId=filterTableMater(p,tree.treeList).orgFullId
                        model.orgFullName=filterTableMater(p,tree.treeList).orgFullName
                        model.parentOrgId=filterTableMater(p,tree.treeList).parentOrgId  
                        model.parentOrgName=filterTableMater(p,tree.treeList).parentOrgName  
                        model.parentDeptFullName=filterTableMater(p,tree.treeList).parentDeptFullName 
                        model.parentOrgFullName =filterTableMater(p,tree.treeList).parentOrgFullName 
                      }"
                      
                      filterable
                      clearable
                      :options="getStr(tree.treeList)" 
                      v-model="model.parentDeptId" 
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
import {  creatEmp, editEmp, rightList} from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'

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
    const modelRef = ref({
      
    })
    const userTypes = ref([
      { label: '管理员', value: 0},
        { label: '讲师', value: 1},
        { label: '学员', value: 2}
    ])
    const sexList = ref([
      { label: '男', value: 1},
      { label: '女', value: 2}
    ])
    const statusList = ref([
      { label: '启用', value: 1},
      { label: '禁用', value: 2}
    ])
    const cardTypes = reactive([
      { label: '居民身份证', value: 0 },
      { label: '港澳居民来往内地通信证', value: 1 },
      { label: '港澳居民居住证', value: 2 },
      { label: '台湾居民来往大陆通行证', value: 3 },
      { label: '台湾居民居住证', value: 4 },
      { label: '外国护照', value: 5 },
      { label: '外国人永久居留身份证', value: 6 },
      { label: '外国人居留证', value: 7 },
    ])
    const isLoading = ref(false)
    const formRef = ref(null)
    const tree = reactive({
        treeList:[], //原始数据
    })
    const sonFn = (e={}) => {
      showModalRef.value = true
      modelRef.value={ cardType:0, sex:1,userClass:3,userType:1,...cloneDeep(e)}

    };
 
    onMounted(async () => {
       rightList({ status: 1, isDefault: 0, }).then(
        (res) => {
          const getStr = (list)=>{
              list.forEach((row)=>{
                row.level = row.level +1
                  if(row.kids.length>0){
                      row.label = row.orgName
                      row.key = row.id 
                      row.children = row.kids
                      getStr(row.kids)
                  }else {
                      row.label = row.orgName
                      row.key = row.id
                  }
              })
            }
            getStr(res)
            tree.treeList = res
        }
      );
    })
    return {
      sonFn,
      showModal: showModalRef,
      userTypes,
      sexList,
      model:modelRef, // 表单数据
      isLoading,
      cardTypes,
      tree,
      statusList,
      formRef,
      rules: {
     
        userNameCh: [
            {
                required: true,
                message: '请输入姓名',
                trigger: ['input', 'blur']
            }
        ],
        idCard: [
            {
                required: true,
                message: '请输入身份证号',
                trigger: ['input', 'blur']
            }
        ],
        phoneNum: [
            {
                required: true,
                message: '请输入手机号',
                trigger: ['input', 'blur']
            }
        ],
      
        sex: [
            {
                required: true,
                type:'number',
                message: '请输入性别',
                trigger: ['input', 'blur']
            }
        ],
       
        
      },
    
      onPositiveClick (){
        const fn =!modelRef.value.id?creatEmp:editEmp
         formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            // const formValue =!modelRef.value.id?[{...modelRef.value,}]:{...modelRef.value,userClass:3,userTypes:1}
            fn([modelRef.value]).then((res)=>{
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
      filterTableMater(id, arr) {
          for (const item of arr) {
            if (item.id === id) return item
            if (item.kids && item.kids.length) {
              const _item = this.filterTableMater(id, item.kids)
              if (_item) return _item
            }
        }
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
      getStr(list){
            list.forEach((row)=>{
                if(row.kids.length>0){
                    if(row.orgType==1){
                      row.disabled = true
                    }
                    this.getStr(row.kids)
                }else {
                    if(row.orgType==1){
                      row.disabled = true
                    }
                }
            })
            return list
      },
  }
})
</script>