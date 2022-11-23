<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="model.value ? (model.value.isDept ? '部门调动':'单位调动'):''"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:500px;"
  >
  <n-spin :show="isLoading">
    <n-form style="height:600px">
        <n-grid x-gap="8" :cols="1" >
             <n-grid-item>
                 <h5>调动部门人员---{{ model.value.userNameCh}}</h5>
                 <h5 v-if="!model.value.isDept">调出单位---{{ model.value.oSector}}</h5>
                 <h5>调出部门---{{ model.value.sector}}</h5>
                 <h5>原岗位---{{ model.value.rawPost}}</h5>
                 <h5>原职位---{{ model.value.rawDuty}}</h5>
             </n-grid-item>
             <div style="height:30px"></div>
            <n-grid-item>
                <n-form-item label="调入部门" path="parentDeptId">
                    <n-tree-select  
                        :options="getStr(tree.treeData)" size="small" 
                        v-model:value="model.value.parentDeptId" 
                        placeholder="请选择" 
                        filterable
                        clearable
                        @update:value="(p)=>{
                            model.value.parentDeptId =filterTableMater(p,tree.treeData).id
                            model.value.parentDeptName=filterTableMater(p,tree.treeData).orgName
                            model.value.parentDeptFullName=filterTableMater(p,tree.treeData).parentDeptFullName
                            model.value.parentOrgFullName=filterTableMater(p,tree.treeData).parentOrgFullName
                            model.value.orgFullId=filterTableMater(p,tree.treeData).orgFullId
                            model.value.orgFullName=filterTableMater(p,tree.treeData).orgFullName
                            model.value.parentOrgId=filterTableMater(p,tree.treeData).parentOrgId
                            model.value.parentOrgName=filterTableMater(p,tree.treeData).parentOrgName
                           postUpParentChange(p)
                        }" 
                     />
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="新岗位" path="postId">
                   <n-select
                        v-model:value="model.value.postId"
                        :fallback-option="(value) => ({ label: '', value })"
                        size="small"
                        placeholder="请选择岗位"
                        :options="post.postList"
                        filterable
                        :on-update:value="postSelect"
                      />
                </n-form-item>
            </n-grid-item>
               <n-grid-item>
                <n-form-item label="新职位" path="dutyId">
                   <n-select
                        v-model:value="model.value.dutyId"
                        :fallback-option="(value) => ({ label: '', value })"
                        size="small"
                        placeholder="请选择职位"
                        :options="post.dutyList"
                        filterable
                        :on-update:value="dutySelect"
                      />
                </n-form-item>
            </n-grid-item>
            <!-- <n-grid-item>
                <n-form-item label="调入时间" path="orgName">
                    <NDatePicker 
                      type="date"
                      format='yyyy-MM-dd'
                      v-model:value="model.modifyTime" 
                      size="small"
                      style="width:100%"
                     
                  />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="调入原因" path="orgCode ">
                    <n-input size="small" 
                        placeholder="请输入"
                        type="textarea"
                       :autosize="{
                            minRows: 3,
                            maxRows: 5
                        }" 
                        v-model:value="model.orgCode " />
                </n-form-item>
            </n-grid-item> -->
        </n-grid>
    </n-form>
  </n-spin>
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
    NSelect ,
    NDatePicker,
    NSpin
} from 'naive-ui'
  import {  transferDetp, transferOrg} from './api'
  import { rightList,allPostList, allDutyList } from '../organization-manage/api'

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
        NSpin
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = reactive({})
    const post = reactive({
        postList:[],
        dutyList:[]
    })
    const isLoading = ref(false)
    const tree = reactive({treeData:[],treeList:[]})
    const sonFn = (e) => {
      showModalRef.value = true
      isLoading.value = true
      model.value = {...e,sector:e.parentDeptName,oSector:e.parentOrgName,rawPost:e.postName,rawDuty:e.dutyName,}
      const fn = model.value.isDept ? rightList({status:1,isDefault:0,parentId:e.parentOrgId,orgType:2}) :rightList({status:1,isDefault:0}) 
         fn.then((res)=>{
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
                    }
                })
            }
            getStr(res)
            tree.treeData = res
        }).finally(r => {
          isLoading.value = false
        })
    };
    const  postUpParentChange=(p)=>{
         
            allPostList({parentOrgId:p}).then((res)=>{
              if(res){
                 post.postList = res.map((d) => {
                   d.label = d.postName
                   d.postId = d.id
                   d.value = d.id
                   return d
                })
                
               // model.value.mdmPostUserDto = null
              }

              
            })
             allDutyList({parentOrgId:p}).then((res)=>{
              if(res){
                 post.dutyList = res.map((d) => {
                   d.label = d.dutyName
                   d.dutyId = d.id
                   d.value = d.id
                   return d
                })
                
               // model.value.mdmDutyUserDto = null
              }

              
            })
           
      }
    const onPositiveClick =()=>{
      
        const fn = model.value.isDept ? transferDetp(model.value) : transferOrg(model.value)
        isLoading.value = true
        fn.then((res)=>{
          if(res){
           context.emit('update:callback');
           model.value = {}
           showModalRef.value = false
            setTimeout(() => {
                window.$message.success("修改成功");
             }, 1)
          } else {
             model.value = {}
             setTimeout(() => {
                showModalRef.value = true
                window.$message.error("修改失败");``
             }, 1)
          }
      }).finally(r => {
        isLoading.value = false
      })
    }
    onMounted(async () => {
     
    })
    return {
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      post,
      postUpParentChange,
      onPositiveClick,
      isLoading,
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods:{
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
      filterTableMater(id, arr) {
        for (const item of arr) {
        if (item.id === id) return item
        if (item.kids && item.kids.length) {
            const _item = this.filterTableMater(id, item.kids)
            if (_item) return _item
        }
        }
    },
      postSelect(e){
        this.model.value.mdmPostUserDto = this.post.postList.filter(d=>d.postId == e)[0]
      },
       dutySelect(e){
        this.model.value.mdmDutyUserDto = this.post.dutyList.filter(d=>d.dutyId == e)[0]
      },  
  },
   
})
</script>