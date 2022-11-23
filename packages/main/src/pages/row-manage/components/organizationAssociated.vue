<template>
  
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择岗位"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:1400px;"
  >
     <n-grid > 
        <n-grid-item span="6" style="height: 842px;" >
            <div class="sider">
                <n-input style="height:42px" v-model:value="pattern" placeholder="搜索" />
                <n-scrollbar x-scrollable style="height:800px;"> 
                    <n-spin :show="leftSpinShow" >
                        <n-tree   
                            size="small"
                            placeholder="请选择"
                            :data="treeList"
                            style="padding: 5px 0;"
                            block-line
                            label-field='orgName'
                            key-field='id'
                            children-field='kids'
                            :pattern="pattern"
                            virtual-scroll
                            :default-expanded-keys="['0']"
                            :render-prefix="renderPrefix"
                            :render-label="renderLabel"
                            :render-suffix="renderSuffix"
                            @update:selected-keys="getPost" 
                        />
                    </n-spin>
                </n-scrollbar>
            </div>
        </n-grid-item>        
        <n-grid-item :span="18" style="height: 842px;">
                 <n-spin :show="spinShow" >
                    <n-tabs
                        type="line"
                        :tabs-padding="10"
                        pane-style="padding:0px;"
                        class="nTabA"
                        :default-value="tabV"
                    >
                        <n-tab-pane name="人员">
                            <vxe-toolbar >
                                <template v-slot:buttons>
                                    <vxe-form>
                                        <vxe-form-item >
                                            <template #default>
                                                 待选择岗位
                                            </template>
                                        </vxe-form-item>
                                        <vxe-form-item>
                                            <template #default>
                                                <vxe-input placeholder="搜索" size='mini' v-model="postName"></vxe-input>
                                            </template>
                                        </vxe-form-item>
                                        <vxe-form-item>
                                            <template #default>
                                                <vxe-button status="primary" size='mini' @click="searchEvent">查询</vxe-button>
                                            </template>
                                        </vxe-form-item>
                                        
                                    </vxe-form>
                                </template>
                            </vxe-toolbar>
                            <vxe-table
                                resizable
                                highlight-current-row
                                ref="xTable"
                                row-id="id"
                                height="360px"
                                size='mini'
                                :data="post.postList"
                            >
                                <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
                                <vxe-table-column field="postCode" title="岗位编号"></vxe-table-column>
                                <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                                <vxe-table-column field="" title="操作">
                                    <template v-slot="{ row }">
                                        <vxe-button type="text" 
                                            @click="()=>{
                                            post.alreadyPostList.push(row)
                                            $refs.aTable.loadData(post.alreadyPostList)
                                            }" 
                                            v-if="!isAddedByPostId(row.postId)"  
                                            status="primary"
                                        >选择</vxe-button>
                                        <vxe-button type="text" 
                                        @click="()=>{
                                            post.alreadyPostList = post.alreadyPostList.filter(d => d.postId !== row.postId)
                                        }" 
                                        v-if="isAddedByPostId(row.postId)"  status="warning">取消</vxe-button>

                                    </template>
                                </vxe-table-column>
                            </vxe-table>
                            <vxe-toolbar style="height:40px">
                                <template v-slot:buttons>
                                    <vxe-form>
                                        <vxe-form-item>
                                            <template #default>
                                            已选择岗位
                                            </template>
                                        </vxe-form-item>
                                    </vxe-form>
                                </template>
                            </vxe-toolbar>
                            <vxe-table
                                resizable
                                highlight-current-row
                                ref="aTable"
                                row-id="id"
                                height="320px"
                                size='mini'
                                :data="post.alreadyPostList"
                            >
                                <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
                                <vxe-table-column field="postCode" title="岗位编号"></vxe-table-column>
                                <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                                <vxe-table-column field="" title="操作">
                                    <vxe-button type="text"
                                        @click="()=>{
                                            post.alreadyPostList.splice(index, 1)
                                            $refs.aTable.loadData(post.alreadyPostList)
                                        }"   
                                        status="danger"
                                    >删除</vxe-button>
                                </vxe-table-column>
                            </vxe-table>
                        </n-tab-pane>
                        <n-tab-pane name="岗位">
                           <vxe-toolbar >
                                <template v-slot:buttons>
                                    <vxe-form>
                                        <vxe-form-item >
                                            <template #default>
                                                 待选择岗位
                                            </template>
                                        </vxe-form-item>
                                        <vxe-form-item>
                                            <template #default>
                                                <vxe-input placeholder="搜索" size='mini' v-model="postName"></vxe-input>
                                            </template>
                                        </vxe-form-item>
                                        <vxe-form-item>
                                            <template #default>
                                                <vxe-button status="primary" size='mini' @click="searchEvent">查询</vxe-button>
                                            </template>
                                        </vxe-form-item>
                                        
                                    </vxe-form>
                                </template>
                            </vxe-toolbar>
                            <vxe-table
                                resizable
                                highlight-current-row
                                ref="xTable"
                                row-id="id"
                                height="380px"
                                size='mini'
                                :data="post.postList"
                            >
                                <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
                                <vxe-table-column field="postCode" title="岗位编号"></vxe-table-column>
                                <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                                <vxe-table-column field="" title="操作">
                                    <template v-slot="{ row }">
                                        <vxe-button type="text" 
                                            @click="()=>{
                                            post.alreadyPostList.push(row)
                                            $refs.aTable.loadData(post.alreadyPostList)
                                            }" 
                                            v-if="!isAddedByPostId(row.postId)"  
                                            status="primary"
                                        >选择</vxe-button>
                                        <vxe-button type="text" 
                                        @click="()=>{
                                            post.alreadyPostList = post.alreadyPostList.filter(d => d.postId !== row.postId)
                                        }" 
                                        v-if="isAddedByPostId(row.postId)"  status="warning">取消</vxe-button>

                                    </template>
                                </vxe-table-column>
                            </vxe-table>
                            <vxe-toolbar style="height:40px">
                                <template v-slot:buttons>
                                    <vxe-form>
                                        <vxe-form-item>
                                            <template #default>
                                            已选择岗位
                                            </template>
                                        </vxe-form-item>
                                    </vxe-form>
                                </template>
                            </vxe-toolbar>
                            <vxe-table
                                resizable
                                highlight-current-row
                                ref="aTable"
                                row-id="id"
                                height="340px"
                                size='mini'
                                :data="post.alreadyPostList"
                            >
                                <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
                                <vxe-table-column field="postCode" title="岗位编号"></vxe-table-column>
                                <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                                <vxe-table-column field="" title="操作">
                                    <vxe-button type="text"
                                        @click="()=>{
                                            post.alreadyPostList.splice(index, 1)
                                            $refs.aTable.loadData(post.alreadyPostList)
                                        }"   
                                        status="danger"
                                    >删除</vxe-button>
                                </vxe-table-column>
                            </vxe-table>
                        </n-tab-pane>
                    </n-tabs>
                </n-spin>
            </n-grid-item>
        
      </n-grid >

  </n-modal>
</template>

<script>
import { defineComponent, ref,reactive,onMounted,h  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NTree,
    NSpin,
    NTabs,
    NTabPane,
    NScrollbar,
    NButton
} from 'naive-ui'

import {  setRolePostUserRel, getRolePostUserRel,rightList,allPostList,empLists,postLists  } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage } from '@platform/main';

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
        NTree,
        NSpin,
        NwIcon,
        NTabs,
        NTabPane,
        NScrollbar,
        NButton,
    },
    props: {
     
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const leftSpinShow = ref(false)
    const spinShow = ref(false);
    const xTable = ref()
    const model = ref({})
    const postName = ref('')
    const  treeList = ref([])
    const tabV = ref('人员')
    const orgId = ref('')
    const selectRow = ref({})
    const pattern = ref('')
    const post = reactive({
        postList:[],
        alreadyPostList:[]
    })
    const sonFn = (e={}) => {
      showModalRef.value = true
       model.value=e
       leftSpinShow.value = true
      
        rightList({isDefault:0,status:1,}).then((res) => {
            
            leftSpinShow.value = false
           treeList.value = res
        })
        
    //    回显调用
        getRolePostUserRel({id:e.id}).then((res)=>{
            const postOrgIds = Array.from(new Set(res.rolePosts.map(d=>d.orgId)))
            postOrgIds.map((d)=>{
               allPostV.value.set(d,res.roleUsers.filter(f=>f.orgId == d).map(d=>d.postId))
            })
       })
       
      
    };
    const renderPrefix = ({ option }) => {
      return h(
        NwIcon,
        { name:option.orgType ==1 ? "icon-n-y-fenjifenlei" : "icon-n-y-app" },
      )
    }
    const renderLabel = ({ option }) => {
      return h(
        NButton,
        { text: true, type: 'primary', },
        { default: () => `${option.orgName}` }
      )
    }
    const isAddedByPostId =(postId)=>{
        return post.alreadyPostList.map(d => d.postId).includes(postId)
    }
    // 获取右侧岗位
    const  getPost = (e)=>{
          if(e.length>0){
               spinShow.value = true
                empOptions.value = []
                empV.value = []
                postV.value = []
                orgId.value = e[0]
                empLists({parentOrgId:e[0]}).then((res)=>{
                    empOptions.value = res.map(d=>{
                        d.label = d.userNameCh
                        d.value = d.id
                        d.key = d.id
                        return d
                    })
                    empV.value = allEmpV.value.get(e[0])
                    if(tabV.value == '人员'){
                        spinShow.value = false
                    }
                    
                })
                postLists({parentOrgId:e[0]}).then((res)=>{
                    postOptions.value = res.map(d=>{
                        d.label = d.postName
                        d.value = d.id
                        d.key = d.id
                        return d
                    })
                    postV.value = allPostV.value.get(e[0])
                    if(tabV.value == '岗位'){
                        spinShow.value = false
                    }
                })
            }
    }
    // 单机选择
    const currentChangeEvent = (row ) =>{
       post.alreadyPostList[0] = {...model.value,...row,}
    }
    const clearCurrentRowEvent  =()  =>{
      selectRow.value = null;
      xTable.value.clearRadioRow();
      xTable.value.clearCurrentRow();
    }
    const onPositiveClick =(row) =>{
        spinShow.value = true
        if(!props.multiple){
            context.emit('update:callback',{...model.value,...post.alreadyPostList[0],});
           spinShow.value = false
        } else {
            post.alreadyPostList.map((d)=>{
                d.userName = model.value.userName
                d.userId = model.value.userId
                 d.userNameCh = model.value.userNameCh
                //  d.postId = d.id
            })
           
            context.emit('update:callback',post.alreadyPostList);
            spinShow.value = false
        }
    }
    onMounted(async () => {
       
       
    })
    return {
      sonFn,
      isAddedByPostId,
      spinShow,
      leftSpinShow,
      postName,
      orgId,
      xTable,
      tabV,
      renderLabel,
      renderPrefix,
      getPost,post,
      model, // 表单数据
      showModal: showModalRef,
      treeList,
      pattern,
      selectRow,
      currentChangeEvent,
      clearCurrentRowEvent,
      postList:reactive([]),
      onPositiveClick,
     
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
    
   
      searchEvent(){
           this.getPost(this.orgId)
      },
     
  }
})
</script>
<style lang="less">
.employeePickModal {
    .ivu-modal-body {
        padding: 0;
    }
}
.employeePick {
    height: 34px;
    .viewEmployeeColumnDel {
        padding: 2px;
        .ivu-table-cell {
            padding: 0 0 0 10px
        }
    }
    .table-title {
        font-size: 14px;
        font-weight: bold;
        text-indent: 10px;
        .table-title-btn {
            float: right;
            margin: 10px;
        }
    }
    .employeePickInput {
        .ivu-input {
            background-color: #fff;
            color: #333;
            cursor: help;
        }
    }
    .ivu-poptip {
        .ivu-poptip-rel {
          width: 100%;
          vertical-align: middle;
        }
        .ivu-poptip-body {
            padding: 0
        }
    }
    .table-left {
        border-top: 0;
        border-bottom: 0;
        border-right: 0;
    }
    .table-right {
        border: 0;
    }
    .ivu-modal-body {
        padding: 0;
    }
    .ivu-modal-footer {
        border-top: 0;
    }
    .sider {
        padding: 5px;
        border-bottom: 1px solid #dcdee2;
        height: 500px;
    }
    .ivu-poptip-popper{
        padding: 0
    }
    // /deep/ .n-tabs .n-tabs-nav{
    //     line-height: 0.7;
    // }
}
</style>
