<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="组织关联"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width: 1400px"
  >
    <n-spin :show="isLoading">
      <n-grid>
        <n-grid-item span="8" style="height: 800px;border-right: 1px solid #dcdee2;">
            <n-input v-model:value="pattern" placeholder="搜索" />
           
              <n-scrollbar x-scrollable style="height:800px;"> 
                 <n-spin :show="treeShow">
                    <n-tree
                        size="small"
                        placeholder="请选择"
                        :data="treeList"
                        style="padding: 5px 0;"
                        block-line
                        label-field='orgName'
                        key-field='id'
                        ref="treeGrid"
                        children-field='kids'
                        :pattern="pattern"
                        :default-expanded-keys="defaultExpandedKeys"
                        :render-prefix="renderPrefix"
                        :render-suffix="renderSuffix"
                        @update:selected-keys="getPost"
                      />
                    </n-spin>  
              </n-scrollbar>
         
             
        </n-grid-item>
        <n-grid-item :span="16" style="height: 800px">
          <n-tabs
            type="line"
            :tabs-padding="10"
            pane-style="padding:0px;"
            class="nTabA"
            :default-value="tabV"
            @update:value="tabChange"
          >
            <n-tab-pane name="人员">
              <n-transfer
                virtual-scroll
                ref="transfer"
                v-model:value="empV"
                :options="empOptions"
                filterable
                @update:value="empChange"
                style="width: 80%; height: 700px; padding: 10px 0; margin: auto"
              />
            </n-tab-pane>
            <n-tab-pane name="岗位">
              <n-transfer
                virtual-scroll
                ref="transfer"
                v-model:value="postV"
                :options="postOptions"
                @update:value="postChange"
                filterable
                style="width: 80%; height: 700px; padding: 10px 0; margin: auto"
              />
            </n-tab-pane>
          </n-tabs>
        </n-grid-item>
      </n-grid>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0">
        <n-button
          size="small"
          type="default"
          style="margin-right: 5px"
          @click="showModal = false"
          >取消</n-button
        >
        <n-button size="small" type="info" @click="onPositiveClick"
          >保存</n-button
        >
      </div>
    </template>
  </n-modal>
</template>

<script lang='jsx'>
import { defineComponent, ref,reactive,onMounted , h,nextTick } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NTabs,
    NTabPane,
    NCheckbox,
    NSpin,
    NTree,
    NTransfer,
    NButton,
    NScrollbar,
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage } from '@platform/main';


import {  setRolePostUserRel, getRolePostUserRel,rightList,allPostList,empLists,postLists,getRolePostandEmp  } from '../api/index.js'


export default ({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NTabs,
        NTabPane,
        NCheckbox,
        NSpin,
        NTree,
        NTransfer,
        NwIcon,
        NButton,NScrollbar
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },
     setup(props, context){
        const pattern = ref('')
        const  treeList = ref([])
        const treeShow = ref(false)
        const showModal = ref(false)
        const isLoading = ref(false)
        const empOptions = ref([])
        const postOptions = ref([])
        const treeGrid = ref()
        const defaultExpandedKeys = ref([])
        const empV = ref([])
        const postV = ref([])
        const orgId = ref('')
        const tabV = ref('人员')
        const data = ref({})
        const  allPostV = ref(new Map()) //所有已选岗位
        const  allEmpV = ref(new Map()) //所有已选岗位
        const renderPrefix = ({ option }) => {
            return h(
            NwIcon,
              { name:option.orgType ==1 ? "icon-n-y-fenjifenlei" : "icon-n-y-app" },
            )
        }
        const renderSuffix = ({ option }) =>{
          return <div>
            
              <span style={`color:${allEmpV.value.get(option.id)?'#2080f0':''}`}> {allEmpV.value.get(option.id)?allEmpV.value.get(option.id).length : 0 } 人</span>
              <span style={`color:${allPostV.value.get(option.id)?'#2080f0':''}`}> {allPostV.value.get(option.id)?allPostV.value.get(option.id).length : 0} 岗</span>
            </div>
        }
        const sonFn = (e) =>{
          data.value = {...e}
          showModal.value = true
          treeShow.value = true
          rightList({isDefault:0,status:1,}).then((res) => {
            treeList.value = res
            treeShow.value = false
            defaultExpandedKeys.value = res.map(d=>d.id)
          })
          
          getRolePostUserRel({id:e.id}).then((res)=>{
            // 回显
              res.roleUsers.map((d)=>{
                d.orgId = d.parentDeptId
                return d
              })
               res.rolePosts.map((d)=>{
                d.orgId = d.parentDeptId
                return d
              })
              const userOrgIds = Array.from(new Set(res.roleUsers.map(d=>d.orgId)))
              const postOrgIds = Array.from(new Set(res.rolePosts.map(d=>d.orgId)))
              userOrgIds.map((d)=>{
               allEmpV.value.set(d,res.roleUsers.filter(f=>f.orgId == d).map(d=>d.userId))
              })
              // allEmpV.value.set('100',['1569596493643599874','1569596493643599875','1569596493643599876','1585555196595343362','1615188024735404033',])
              postOrgIds.map((d)=>{
               allPostV.value.set(d,res.roleUsers.filter(f=>f.orgId == d).map(d=>d.postId))
              })
              console.log( allEmpV.value,' allEmpV.value',)
          })
        }
          //   调取人员岗位接口
        const getPost = (e)=>{
            if(e.length>0){
                isLoading.value = true
                empOptions.value = []
                empV.value = []
                postV.value = []
                orgId.value = e[0]
                getRolePostandEmp(orgId.value).then((r)=>{
                  empOptions.value =  r.userList ? r.userList.map(d=>{
                        d.label = d.userNameCh
                        d.value = d.id
                        d.key = d.id
                        return d
                    }) : []
                    empV.value = allEmpV.value.get(e[0])
                    postOptions.value =  r.postList ?  r.postList.map(d=>{
                        d.label = d.postName
                        d.value = d.id
                        d.key = d.id
                        return d
                    }) : []
                    postV.value = allPostV.value.get(e[0])
                    isLoading.value = false
                })
                // empLists({parentOrgId:e[0]}).then((res)=>{
                //     empOptions.value = res.map(d=>{
                //         d.label = d.userNameCh
                //         d.value = d.id
                //         d.key = d.id
                //         return d
                //     })
                //     empV.value = allEmpV.value.get(e[0])
                //     if(tabV.value == '人员'){
                //         isLoading.value = false
                //     }
                    
                // })
                // postLists({parentOrgId:e[0]}).then((res)=>{
                //     postOptions.value = res.map(d=>{
                //         d.label = d.postName
                //         d.value = d.id
                //         d.key = d.id
                //         return d
                //     })
                //     postV.value = allPostV.value.get(e[0])
                //     if(tabV.value == '岗位'){
                //         isLoading.value = false
                //     }
                // })
            } else {
                
            }
            
        }
        // 点击确定时调用   
        const onPositiveClick = () =>{
              isLoading.value = false
              var userIds = []
              let postIds = []

             allEmpV.value.forEach((item)=>{
                userIds = [...userIds,...Object.values(item)]
              })
              allPostV.value.forEach((item)=>{
                postIds = [...postIds,...Object.values(item)]
              })
            setRolePostUserRel({
                roleCode:data.value.roleCode,
                roleId:data.value.id,
                roleName:data.value.roleName,
                userIds:userIds.join(','),
                postIds:postIds.join(','),
            }).then((res)=>{
                showModal.value=false
                isLoading.value = false
                allPostV.value.clear()
                tabV.value = '人员'
                allEmpV.value.clear()
                // context.$emit('update:callback');
                  
            }).finally(r => {
                isLoading.value = false;
            })
        }
        //   人员穿梭值改变时调用
        const empChange = (v)=>{
          allEmpV.value.set(orgId.value,v)
        }
        const postChange = (v) => {
          allPostV.value.set(orgId.value,v)
        
        }
        // 数组合并去重方法
        const uniqueArr = (arr1,arr2) => {
            arr1.push(...arr2)
            let arr3 = Array.from(new Set(arr1))
            return arr3
        }
        // 俩数组比较取相同
        const getSome = (arr1, arr2)=> {
            let newArr = [];
            for (let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < arr1.length; j++) {
                    if(arr1[j] === arr2[i]){
                    newArr.push(arr1[j]);
                    }
                }
            }
            return newArr;
        }
        //   tab选项卡调用
        const tabChange = (e) =>{
            tabV.value = e
        }
      
        const onNegativeClick = () =>{
            showModal.value=false
        }
        onMounted(()=>{
         
        
        })
        return {
            renderPrefix,
            renderSuffix,
            treeGrid,
            pattern,
            treeList,
            defaultExpandedKeys,
            data, 
            allEmpV,//所有已选人员
            allPostV, //所有已选岗位
            treeShow,
            isLoading:false,
            showModal,
            sonFn,
            getPost,
            onPositiveClick,
            empChange,
            tabChange,
            postChange,
            uniqueArr,
            getSome,
            onNegativeClick,
            empOptions,
            postOptions,
            empV,
            tabV,
            postV,
            orgId,
        }
     },
})
</script>
<style lang='less' scoped>
/deep/.n-transfer-list-body {
  height: calc(var(--item-height) * 5.6 + 450px) !important;
}
</style>