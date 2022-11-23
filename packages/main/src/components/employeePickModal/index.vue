<template>
    <!-- <n-input  class="my-search" placeholder="" size='small' disabled  :title="props.userName" :value="props.userName || '未选择用户'" v-if="isShowSearch">
        <template #suffix>
            <n-button type="info"   @Click="(e)=>{sonFn()}">选择</n-button>
        </template>
    </n-input> -->
  <div v-if="isShowSearch" style="width:100%;height:100%;line-height:1px;display:flex;border:1px solid rgb(118, 124, 130)">
     <div style="flex:1">
        <n-ellipsis style="max-width: 100%" :line-clamp="1">
            <n-tag v-for="item in (props.userName? props.userName.split(','): [])" :key="item" :value="item" closable @close="handleClose(item)">{{item}}</n-tag>
        </n-ellipsis>
       
     </div>
     <div style="width:20px;height:100%">
        <nw-icon name="icon-n-n-yonghuJia" :size="14" style="height:25px" @Click="(e)=>{sonFn()}"/>
      </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择人员"
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
                    <n-tree   
                        size="small" 
                        placeholder="请选择"
                        :data="propTreeList ? disOrg(propTreeList) : tree.treeList"
                        style='height:800px;padding:5px 0'
                        block-line
                        virtual-scroll
                        :render-prefix="renderPrefix"
                        :default-expanded-keys="['0']"
                        @update:selected-keys="getEmp" 
                    />
                </n-spin>
            </div>
        </n-grid-item>        
            <n-grid-item :span="showSide ? 18 : 24" style="height: 840px;">
                 <n-spin :show="spinShow" >
                    <vxe-toolbar>
                        <template v-slot:buttons>
                            <vxe-form>
                                <vxe-form-item v-if="multiple">
                                    <template #default>
                                      待选择人员
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template #default>
                                        <vxe-input placeholder="搜索" v-model="empName"></vxe-input>
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
                        :data="emp.empList"
                    >
                        <vxe-table-column field="userNameCh" title="人员名称"></vxe-table-column>
                        <vxe-table-column field="postName" title="岗位名称">
                             <template v-slot="{ row }">
                                 {{row.mdmPosts?row.mdmPosts.filter(d=>d.isMaster==1)[0].postName:'' }}
                             </template>
                        </vxe-table-column>
                        <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                        <vxe-table-column field="" title="操作">
                            <template v-slot="{ row }">
                                <vxe-button type="text" @click="currentChangeEvent(row)" v-if="!multiple && !isAddedByEmpId(row.empId)"  status="primary">选择</vxe-button>
                                <vxe-button type="text"
                                    @click="()=>{
                                      emp.alreadyEmpList.push(row)
                                      $refs.aTable.loadData(emp.alreadyEmpList)
                                    }" 
                                    v-if="multiple && !isAddedByEmpId(row.empId)"  
                                    status="primary"
                                >选择</vxe-button>
                                <vxe-button type="text" 
                                  @click="()=>{
                                      emp.alreadyEmpList = emp.alreadyEmpList.filter(d => d.empId !== row.empId)
                                  }" 
                                  v-if="isAddedByEmpId(row.empId)"  status="warning">取消</vxe-button>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                      <vxe-toolbar style="height:40px" v-if="multiple">
                        <template v-slot:buttons>
                            <vxe-form>
                                <vxe-form-item>
                                    <template #default>
                                      已选择人员
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
                        :data="emp.alreadyEmpList"
                    >
                        <vxe-table-column field="userNameCh" title="人员名称"></vxe-table-column>
                        <vxe-table-column field="postName" title="岗位名称">
                             <template v-slot="{ row }">
                                 {{row.mdmPosts?row.mdmPosts.filter(d=>d.isMaster==1)[0].postName:'' }}
                             </template>
                        </vxe-table-column>
                        <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                        <vxe-table-column field="" title="操作">
                            <vxe-button type="text"
                                @click="()=>{
                                    emp.alreadyEmpList.splice(index, 1)
                                    $refs.aTable.loadData(emp.alreadyEmpList)
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
    NTag
} from 'naive-ui'
//   import {   creatJob,editJob,mdmDutyTypeList } from './api' getEmpByUserId
import { rightList,  empLists,mdmUserIds  } from '../../pages/page-linkman/api/index.js'
import { NwIcon } from '@platform/main'
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
        NTag
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
        isShowSearch: {
            type: Boolean,
            default: true
        },
        userName: {
            type: String,
            default: () => "",
        },
        value:{
           type: String,
            default: ()=>''
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const leftSpinShow = ref(false)
    const spinShow = ref(false);
    const xTable = ref()
    const model = ref({})
    const empName = ref('')
    const tree = reactive({
        treeList:[], //原始数据
       
    })
    const orgId = ref('')
    const selectRow = ref({})
    const pattern = ref('')
    const renderPrefix = ({ option }) => {
        return h(
        NwIcon,
            { name:option.orgType ==1 ? "icon-n-y-fenjifenlei" : "icon-n-y-app" },
        )
    }
    const emp = reactive({
        empList:[],
        alreadyEmpList:[]
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
        if(props.value) {
            mdmUserIds(props.value).then((r)=>{
                 emp.alreadyEmpList = r.map(d=>{
                      d.empId = d.id
                      return d
                 })
            })
        }
    };

    const isAddedByEmpId =(empId)=>{
        return emp.alreadyEmpList.map(d => d.empId).includes(empId)
    }
    // 获取右侧人员
    const  getEmp = (e)=>{
        spinShow.value = true
        orgId.value =typeof(e)=='object' ? e[0] : e
        if(e){
            // userNameCh:empName.value
            const fn = empName.value? empLists({parentOrgId:orgId.value,userNameCh:empName.value}):empLists({parentOrgId:orgId.value,})
           fn.then((res)=>{
               if(res){
                 res.map(d=>{
                   d.orgFullEmpId =d.orgFullId
                   d.orgFullEmpName = d.orgFullName
                   d.empId = d.id
                })
               }
               
               emp.empList = res 
                spinShow.value = false
            })
        } else {
            emp.empList  = []
            spinShow.value = false
        }
    }
    // 单机选择
    const currentChangeEvent = (row ) =>{
       emp.alreadyEmpList[0] = {...model.value,...row,}
    }
    const clearCurrentRowEvent  =()  =>{
      selectRow.value = null;
      xTable.value.clearRadioRow();
      xTable.value.clearCurrentRow();
    }
    const onPositiveClick =(row) =>{
        spinShow.value = true
        if(!props.multiple){
            context.emit('update:callback',{...model.value,...emp.alreadyEmpList[0],});
            model.value = {}
            emp.alreadyEmpList=[]
           spinShow.value = false
        } else {
            
           
            context.emit('update:callback',emp.alreadyEmpList);
            spinShow.value = false
        }
    }
    const handleClose = (v) =>{

       emp.alreadyEmpList = emp.alreadyEmpList.filter(d=>d.userNameCh != v)
       context.emit('update:callback',emp.alreadyEmpList);
    }
    onMounted(async () => {
       
       
    })
    return {
      sonFn,
      props,
      isAddedByEmpId,
      spinShow,
      leftSpinShow,
      empName,
      orgId,
      xTable,
      getEmp,emp,
      renderPrefix,
      handleClose,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      pattern,
      selectRow,
      currentChangeEvent,
      clearCurrentRowEvent,
      empList:reactive([]),
      onPositiveClick,
     
      onNegativeClick () {
        model.value = {}
        emp.alreadyEmpList=[]
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
           this.getEmp(this.orgId)
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
