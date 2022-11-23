<template>
    <n-layout class="nw-layout-full">
      <n-layout-header bordered >
       
          外部人员注册
        
      </n-layout-header>
      <n-layout-content class="main-layout-body" :native-scrollbar="false">
        <div style="width: 90%; margin: 0 auto;padding:10px">
          <n-spin :show="isLoading">
              <n-form  :model="model" ref="formRef" :rules="rules">
                  <n-grid x-gap="8" :cols="3" y-gap="20">
                    <n-grid-item>
                        <n-form-item label="姓名" path="userNameCh">
                            <n-input    placeholder="请输入" v-model:value="model.userNameCh" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="sex" label="性别">
                            <n-select
                                v-model:value="model.sex"
                                placeholder="请选择性别"
                                :options="sexList"
                                 
                          />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="证件类型" path="cardType">
                            <n-select
                              v-model:value="model.cardType"
                              placeholder="请选择证件类型"
                              :options="cardTypes"
                              
                            />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="证件号" path="idCard">
                            <n-input    placeholder="请输入" v-model:value="model.idCard " />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="手机号" path="phoneNum">
                            <n-input   placeholder="请输入" v-model:value="model.phoneNum" >
                               <template #suffix>
                                  <span
                                    :class="{yanzheng:true,yanzhengmadis:codeSecond!= 0}"
                                    @click="getSMSCode"
                                  >点击获取验证码</span>
                                </template>
                            </n-input>

                        </n-form-item>
                          <div class="yanzhengmatishi" style="text-align:right" v-if="codeSecond != 0">{{codeSecond}}s后重试</div>

                    </n-grid-item>
                     <n-grid-item>
                        <n-form-item label="验证码" path="verificationCode">
                            <n-input   placeholder="请输入" v-model:value="model.verificationCode" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="单位名称" path="unitName">
                            <n-input   placeholder="请输入" v-model:value="model.unitName" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                      <n-form-item label="人员情况" path="newsType">
                          <nw-dic
                              :request="{XHR:dictItemLists, params: 'STUDY_USER_CONDITION_TYPE',}"
                              v-model:value="model.userConditionCode"
                              v-model:label="model.userConditionName"
                              :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                              />
                      </n-form-item>
                  </n-grid-item>
                    <!-- <n-grid-item>
                        <n-form-item path="userType" label="用户类型">
                            <n-select
                                v-model:value="model.userType"
                                multiple
                                placeholder="请选择类型"
                                :options="userTypes"
                                 
                          />
                        </n-form-item>
                    </n-grid-item> -->
                   
                    <n-grid-item>
                      <n-form-item path="parentOrgId" label="服务单位">
                          <n-tree-select 
                             
                            @update:value="(p)=>{
                              model.parentOrgId=filterTableMater(p,tree.treeList).id  
                              model.parentOrgName=filterTableMater(p,tree.treeList).orgName  
                              model.parentOrgFullName =filterTableMater(p,tree.treeList).parentOrgFullName 
                            }"
                            filterable
                            clearable
                            :options="getStr(tree.treeList)" 
                            v-model="model.parentDeptId" 
                          />
                      </n-form-item>
                  </n-grid-item>
                  <!--  <n-form-item path="parentDeptId" label="所属部门">
                          <n-tree-select 
                             
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
                      </n-form-item> -->
                    <n-grid-item span="24">
                        <n-form-item label="描述" path="description">
                            <n-input  placeholder="请输入"  type="textarea" v-model:value="model.description" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item :span="24" style="text-align:center;margin-top:10px">
                        <n-button
                          
                          type="primary"
                          @click="onPositiveClick"
                        >提交</n-button>
                        <n-button
                          
                          style="margin-left:5px"
                          @click="closeClick"
                        >关闭</n-button>
                    </n-grid-item>
                  </n-grid>
                </n-form>
            </n-spin>
        </div>
      </n-layout-content>
  </n-layout>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NConfigProvider,
  NForm,
  NFormItem,
  NCard,
  NSpin,
  NInput,
  NInputGroup,
  NButton,
  NList,
  NListItem,
  NSelect,
  NModal,
  NAvatar,
  NGrid,
  NGridItem,
  NDialogProvider,
  useDialog,
  NTreeSelect,
  useMessage,
  NPageHeader,
  

} from "naive-ui";
import { NwIcon, Aes,NwDic } from '@platform/main'

import { creatEmp,  sendSMSCode, dictItemLists } from "./api";
import axios from "axios";


export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NCard,
    NSpin,
    NInput,
    NInputGroup,
    NButton,
    NwIcon,
    NList,
    NListItem,
    NSelect,
    NModal,
    NAvatar,
    NGridItem,
    NGrid,
    NDialogProvider,
    NTreeSelect,
    NPageHeader,
    NwDic
  },
  setup() {
    const modelRef = ref({
       cardType:0
    })
    const codeSecond = ref(0);
    const message = useMessage();
    const tree = reactive({
        treeList:[], //原始数据
    })
    const userTypes = ref([
        { label: '讲师', value: 1},
        { label: '学员', value: 2}
    ])
    const sexList = ref([
      { label: '男', value: 1},
      { label: '女', value: 2}
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
    const dialog = useDialog()
    const formRef = ref(null)
    const getSMSCode = () => {
      var reg_tel =  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(reg_tel.test(modelRef.value.phoneNum)) {
         if (codeSecond.value != 0) return;
          codeSecond.value = 60;
          const codeSecondTimer = setInterval(() => {
            codeSecond.value--;
            if (codeSecond.value <= 0) {
              codeSecond.value = 0;
              clearInterval(codeSecondTimer);
            }
          }, 1000);
          const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (myreg.test(modelRef.value.phoneNum)) {
            sendSMSCode(modelRef.value.phoneNum)
              .then(res => {})
              .catch(e => {
                codeSecond.value = 0;
                clearInterval(codeSecondTimer);
                message.value.error(e.message);
              });
          } else {
          }
      } else {
         dialog.error({
              title: '提示',
              content: () => '请输入正确手机格式',
              positiveText: '关闭',
              
            })
      }
     
    };
    
    onMounted(async () => {
      axios({
        url: `${window.apiBaseURL}/mdm/mdmOrg/list`,
        method:'POST',
        data: {
          isDefault:0,
          status:1,
          orgType:1,
        }
      }).then((res)=>{
        if(res.data.code == 200){
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
            getStr(res.data.data)
            tree.treeList = res.data.data
        } else {
            dialog.error({
              title: '提示',
              content: () => res.data.msg,
              positiveText: '确认',
              
            })
        }
       
      })
    })
    return {
      userTypes,
      codeSecond,
      getSMSCode,
      dictItemLists,
      sexList,
      model:modelRef, // 表单数据
      isLoading,
      cardTypes,
      formRef,
      tree,
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
                message: '请选择性别',
                trigger: ['input', 'blur']
            }
        ],
      
       
        
      },
      
      onPositiveClick (){
        const fn =creatEmp
         formRef.value.validate((errors) => {
          if (!errors) {
             isLoading.value = true
            fn({...modelRef.value,userType:2}).then((res)=>{
              if(res){
                dialog.success({
                  title: '提示',
                  content: () => '您的申请已提交，申请结果将以短信方式返回',
                  positiveText: '确认',
                  onPositiveClick: () => {
                    window.close()
                  }
                })
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
        getStr(list){
                // list.forEach((row)=>{
                //     if(row.kids.length>0){
                //        if(row.orgType==1){
                //           row.disabled = true
                //         }
                //         this.getStr(row.kids)
                //     }else {
                //         if(row.orgType==1){
                //           row.disabled = true
                //         }
                //     }
                // })
                return list
          },
      closeClick () {
        window.close()
      }
    };
  },
});
</script>
<style lang='less'>
.user-form {
  &-prefix {
    width: 60px;
  }
  &-suffix {
    width: 60px;
  }
}
</style>