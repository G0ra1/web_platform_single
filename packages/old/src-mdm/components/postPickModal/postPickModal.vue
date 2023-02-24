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
    style="width:1200px;"
  >
     <n-grid > 
        <n-grid-item span="6" style="height: 800px;" v-if="showSide">
            <div class="sider">
                <n-input v-model:value="pattern" placeholder="搜索" />
                <n-spin :show="leftSpinShow" >
                    <n-tree   size="small" 
                        placeholder="请选择"  
                        :data="propTreeList ? disOrg(propTreeList) : tree.treeList"
                        style='height:800px;padding:5px 0'
                        block-line 
                        virtual-scroll
                        :pattern="pattern"
                        :default-expanded-keys="['0']"
                        @update:selected-keys="getPost" 
                    />
                </n-spin>
            </div>
        </n-grid-item>        
            <n-grid-item :span="showSide ? 18 : 24" style="height: 800px;">
                 <n-spin :show="spinShow" >
                    <vxe-toolbar style="height:40px">
                        <template v-slot:buttons>
                            <vxe-form>
                                <vxe-form-item v-if="multiple">
                                    <template #default>
                                      待选择岗位
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template #default>
                                        <vxe-input placeholder="搜索" v-model="postName"></vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template #default>
                                        <vxe-button status="primary" @click="searchEvent">查询</vxe-button>
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
                        :height="!multiple ? '760px' : '380px'"
                        :data="post.postList"
                    >
                        <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
                        <vxe-table-column field="postCode" title="岗位编号"></vxe-table-column>
                        <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                        <vxe-table-column field="" title="操作">
                            <template v-slot="{ row }">
                                <vxe-button type="text" @click="currentChangeEvent(row)" v-if="!multiple && !isAddedByPostId(row.postId)"  status="primary">选择</vxe-button>
                                <vxe-button type="text" 
                                    @click="()=>{
                                      post.alreadyPostList.push(row)
                                      $refs.aTable.loadData(post.alreadyPostList)
                                    }" 
                                    v-if="multiple && !isAddedByPostId(row.postId)"  
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
                      <vxe-toolbar style="height:40px" v-if="multiple">
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
                    
                        v-if="multiple"
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
                </n-spin>
            </n-grid-item>
        
      </n-grid >

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
    NTree,
    NSpin
} from 'naive-ui'
//   import {   creatJob,editJob,mdmDutyTypeList } from './api' getPostByUserId
  import { rightList, allPostList } from '../../pages/organization-manage/api'
  import {  getPostByUserId } from '../../pages/post-manage/api'

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
        NSpin
    },
    props: {
         model: {
          default: ()=>{},
          type: Object,
        },
        multiple: {
            type: Boolean,
            default: true
        },
        propTreeList:{
           type: Object,
            default: ()=>null
        },
        showSide: {
            type: Boolean,
            default: true
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const leftSpinShow = ref(false)
    const spinShow = ref(false);
    const xTable = ref()
    const model = ref({})
    const postName = ref('')
    const tree = reactive({
        treeList:[], //原始数据
       
    })
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
        if(props.showSide){
            rightList({isDefault:0,status:1,}).then((res) => {
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
                leftSpinShow.value = false
                tree.treeList = res
            })
        }
        
        
    //    回显调用
        getPostByUserId({id:e.id}).then((res)=>{
            post.alreadyPostList =props.multiple ?  res.filter(d=>d.isMaster ==0) : res.filter(d=>d.isMaster ==1)
        })
       
       
      if(props.showSide) return
      getPost(e.parentDeptId)
    };

    const isAddedByPostId =(postId)=>{
        return post.alreadyPostList.map(d => d.postId).includes(postId)
    }
    // 获取右侧岗位
    const  getPost = (e)=>{
        spinShow.value = true
        orgId.value =typeof(e)=='object' ? e[0] : e
        if(e){
           allPostList({parentOrgId:orgId.value,postName:postName.value}).then((res)=>{
               if(res){
                 res.map(d=>{
                   d.orgFullPostId =d.orgFullId
                   d.orgFullPostName = d.orgFullName
                   d.postId = d.id
                })
               }
               
               post.postList = res 
                spinShow.value = false
            })
        } else {
            post.postList  = []
            spinShow.value = false
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
            if( post.alreadyPostList.length>0) {
                post.alreadyPostList.map((d)=>{
                    d.userName = model.value.userName
                    d.userId = model.value.userId
                    d.userNameCh = model.value.userNameCh
                    //  d.postId = d.id
                })
            } else {
                post.alreadyPostList = [{id:0,userName:model.value.userName,userId:model.value.userId,userNameCh:model.value.userNameCh}]
            }
           
           
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
      getPost,post,
      model, // 表单数据
      showModal: showModalRef,
      tree,
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
    
    disOrg(list){
        list.forEach((row)=>{
            if(row.kids.length>0){
               
                  row.disabled = false
                
                this.disOrg(row.kids)
            }else {
                
                  row.disabled = false
               
            }
        })
        return list
      },
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
}
</style>
