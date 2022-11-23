<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="机构撤销"
    
    style="width:1000px;"
  >
    <div style="height:700px;width:100%">
       <div style="width:80%;padding-top: 10px;margin:auto;height:40px">
           <n-space vertical justify="center">
                <n-steps size="small" :current="current" >
                    <n-step
                        title="确认撤销机构"
                    />
                    <n-step
                        title="人员安排"
                    />
                    <n-step
                        title="岗位安排"
                    />
                     <n-step
                        title="职位安排"
                    />
                    <n-step
                        title="填写表单"
                    />
                   
                </n-steps>
            </n-space>
       </div>
       <n-card style="height:600px" v-if="current==1">
           <vxe-grid class="reverse-table" v-bind="gridOptions"></vxe-grid>
        </n-card>
       <n-card style="height:600px" v-if="current==2">
           <vxe-table
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              height="550px"
              :edit-rules="validRules"
              :edit-config="{trigger: 'click', mode: 'cell',  showStatus: true,autoClear: false,}"
              :data="empMessage.current2V.filter(d=>d.status == 1)"
              @cell-click="postUpParentChange"
            >
              <vxe-table-column
                field="userNameCh"
                title="待安排人员"
              ></vxe-table-column>
              <vxe-table-column
                field="orgFullName"
                title="所属机构"
              ></vxe-table-column>
              
             <vxe-table-column
                field="newOrgId"
                title="新部门"
                 :edit-render="{}"
              >
                 <template v-slot:edit="row">
                    <n-tree-select 
                      :value="row.row.newOrgId"
                      
                      @update:value="(p)=>{
                        row.row.newOrgId=p
                        row.row.newOrgName=filterTableMater(p,tree.treeData).orgName
                        empMessage.current2V[row._rowIndex].newOrgId=p
                        empMessage.current2V[row._rowIndex].parentDeptId=p
                        empMessage.current2V[row._rowIndex].parentDeptName=filterTableMater(p,tree.treeData).orgName
                        empMessage.current2V[row._rowIndex].orgFullId=filterTableMater(p,tree.treeData).orgFullId
                        empMessage.current2V[row._rowIndex].orgFullName=filterTableMater(p,tree.treeData).orgFullName
                        empMessage.current2V[row._rowIndex].parentOrgId=filterTableMater(p,tree.treeData).parentOrgId  
                        empMessage.current2V[row._rowIndex].parentOrgName=filterTableMater(p,tree.treeData).parentOrgName 
                        empMessage.current2V[row._rowIndex].parentDeptFullName=filterTableMater(p,tree.treeData).parentDeptFullName 
                        empMessage.current2V[row._rowIndex].parentOrgFullName =filterTableMater(p,tree.treeData).parentOrgFullName  
                         postUpParentChange(row)
                        $refs.xTable.clearActived()
                      }"
                      filterable
                      clearable
                      :options="getStr(tree.treeList)" 
                      size="small" 
                      v-model="row.row.parentDeptId" 
                  />
                </template>
                <template v-slot="{ row }">{{ row.newOrgName }}</template>

              </vxe-table-column>
              <vxe-table-column field="postName" title="新岗位" :edit-render="{}">
                <template v-slot:edit="row">
                  <vxe-select  @change="postNameChange(row)" v-model="row.row.postId" placeholder="小型尺寸" size="small">
                    <vxe-option v-for="item in postList" :key="item.id" :value="item.id" :label="item.postName"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.mdmPostUserDto? row.mdmPostUserDto.postName :'' }}</template>
              </vxe-table-column>
               <vxe-table-column field="dutyName" title="新职位" :edit-render="{}">
                <template v-slot:edit="row">
                  <vxe-select  @change="dutyNameChange(row)" v-model="row.row.dutyId" placeholder="小型尺寸" size="small">
                    <vxe-option v-for="item in dutyList" :key="item.id" :value="item.id" :label="item.dutyName"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.mdmDutyUserDto? row.mdmDutyUserDto.dutyName :'' }}</template>
              </vxe-table-column>
              
            </vxe-table>
        </n-card>
        <n-card style="height:600px" v-if="current==3">
           <vxe-table
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              height="550px"
              :edit-config="{trigger: 'click', mode: 'row',  showStatus: true,autoClear: false,}"
              :data="postMessage.current3V"
            >
              <vxe-table-column
                field="postName"
                title="岗位名称"
              ></vxe-table-column>
              <vxe-table-column
                field="orgFullName"
                title="所属机构"
              ></vxe-table-column>
             <vxe-table-column
                field="newOrgId"
                title="新组织"
                 :edit-render="{}"
              >
                 <template v-slot:edit="row">
                
                    <n-tree-select 
                      :value="row.row.newOrgId"
                      
                      @update:value="(p)=>{
                        row.row.newOrgId=p
                        row.row.newOrgName=filterTableMater(p,tree.treeData).orgName
                        postMessage.current3V[row._rowIndex].parentDeptId=p
                        postMessage.current3V[row._rowIndex].parentDeptName=filterTableMater(p,tree.treeData).orgName
                        postMessage.current3V[row._rowIndex].orgFullId=filterTableMater(p,tree.treeData).orgFullId
                        postMessage.current3V[row._rowIndex].orgFullName=filterTableMater(p,tree.treeData).orgFullName
                        postMessage.current3V[row._rowIndex].parentOrgId=filterTableMater(p,tree.treeData).parentOrgId  
                        postMessage.current3V[row._rowIndex].parentOrgName=filterTableMater(p,tree.treeData).parentOrgName 
                        postMessage.current3V[row._rowIndex].parentDeptFullName=filterTableMater(p,tree.treeData).parentDeptFullName 
                        postMessage.current3V[row._rowIndex].parentOrgFullName =filterTableMater(p,tree.treeData).parentOrgFullName  

                        $refs.xTable.clearActived()
                      }"
                      filterable
                      clearable
                      :options="disOrg(tree.treeList)" 
                      size="small" 
                      v-model="row.row.parentDeptId" 
                  />
                </template>
                <template v-slot="{ row }">{{ row.newOrgName }}</template>

              </vxe-table-column>
            </vxe-table>
        </n-card>
     <n-card style="height: 600px" v-if="current == 4">
        <vxe-table
          border
          resizable
          keep-source
          show-overflow
          ref="xTable"
          size="small"
          height="550px"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true,autoClear: false, }"
          :data="dutyMessage.current4V"
        >
          <vxe-table-column
            field="dutyName"
            title="职位名称"
          ></vxe-table-column>
          <vxe-table-column
            field="orgFullName"
            title="所属机构"
          ></vxe-table-column>
          <vxe-table-column field="newOrgId" title="新组织" :edit-render="{}">
            <template v-slot:edit="row">
             
               <n-tree-select 
                  :value="row.row.newOrgId"
                  
                  @update:value="(p)=>{
                    row.row.newOrgId=p
                    row.row.newOrgName=filterTableMater(p,tree.treeData).orgName
                    dutyMessage.current4V[row._rowIndex].parentDeptId=p
                    dutyMessage.current4V[row._rowIndex].parentDeptName=filterTableMater(p,tree.treeData).orgName
                    dutyMessage.current4V[row._rowIndex].orgFullId=filterTableMater(p,tree.treeData).orgFullId
                    dutyMessage.current4V[row._rowIndex].orgFullName=filterTableMater(p,tree.treeData).orgFullName
                    dutyMessage.current4V[row._rowIndex].parentOrgId=filterTableMater(p,tree.treeData).parentOrgId  
                    dutyMessage.current4V[row._rowIndex].parentOrgName=filterTableMater(p,tree.treeData).parentOrgName 
                    dutyMessage.current4V[row._rowIndex].parentDeptFullName=filterTableMater(p,tree.treeData).parentDeptFullName 
                    dutyMessage.current4V[row._rowIndex].parentOrgFullName =filterTableMater(p,tree.treeData).parentOrgFullName  

                    $refs.xTable.clearActived()
                  }"
                  filterable
                  clearable
                  :options="disOrg(tree.treeList)" 
                  size="small" 
                  v-model="row.row.parentDeptId" 
              />
            </template>
            <template v-slot="{ row }">{{ row.newOrgName }}</template>
          </vxe-table-column>
        </vxe-table>
        </n-card>
        <div style="width:80%;padding-top: 10px;margin:auto;height:550px" v-if="current==5">
            <n-form >
                <n-grid x-gap="8" style="height:100%" :cols="1" >
                    <n-grid-item>
                        <n-form-item label="拆分时间" path="modifyTime">
                            <!-- <n-input size="small" placeholder="请输入" v-model:value="model.modifyTime" /> -->
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
                        <n-form-item label="拆分原因" path="modifyReason ">
                            <n-input size="small" 
                              type="textarea"
                              :autosize="{
                                    minRows: 3,
                                    maxRows: 5
                                }" 
                              placeholder="请输入" v-model:value="model.modifyReason " />
                        </n-form-item>
                    </n-grid-item>
                </n-grid>
            </n-form >
       </div>
    </div>
    <template #action> 
        <n-button type="primary" size="small"  style="margin-right: 5px;" v-if="current!==1" @click="current=--current">上一步</n-button>

        <n-button type="primary" size="small"  style="margin-right: 5px;" v-if="current<5" @click="()=>{
              if(current==2) {
                
                if(nextAdCurrent()) {
                  current=++current
                } 
              } else {
                current=++current
              }
                
               
          }">下一步</n-button>
          <n-button type="warning" size="small"  style="margin-right: 5px;" @click="onNegativeClick" v-if="current==5 || current==1">取消</n-button>
          <n-button type="info" size="small"  style="margin-right: 5px;" @click="onPositiveClick" v-if="current==5">确定</n-button>
    </template>
  </n-modal>
</template>

<script lang="jsx">
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
    NSteps,
    NStep,
    NSpace,
    NList,
    NCard,
    NListItem,
    NThing,
    NButton,
    NTree,
    NCheckbox,
    useMessage,
    NDatePicker

} from 'naive-ui'
  import {  rightList, creatOrg, updateStatus,allPostList,allDutyList } from './api'
  import {  getUserByOrgId } from '../emp-manage/api'
  import {  getMdmPostByOrgId, orgPost } from '../post-manage/api'

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
        NSteps,
        NStep,
        NSpace,
        NList,
        NCard,
        NListItem,
        NThing,
        NButton,
        NTree,
        NCheckbox,
        NDatePicker
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = reactive({})
    const tree = reactive({treeData:[],treeList:[],orgList:[],administerList:[]})
    const currentRef = ref(1)
    const xTable = ref()
    const empMessage = reactive({  // 人员数据
        empList:[],
        current2V:[],
    })
    const postMessage = reactive({ // 岗位数据
        postList:[],
        current3V:[],
    })
    const dutyMessage = reactive({
        dutyList:[],
        current4V:[],
    })
    const message = useMessage();
    const postList = reactive([]) // 表单展示的岗位数据
    const dutyList = reactive([]) // 表单展示的职位数据
    const gridOptions = reactive({
        border: true,
        showHeader: false,
        columns: [
            { field: 'col1', width: 100 },
            { field: 'col2' },
           
        ],
        data: [
            { col1: '撤销机构', col2: ''  },
            { col1: '下辖机构', col2:'' },
            { col1: '人员总量', col2: '' },
            { col1: '岗位数', col2: '' },
            { col1: '职位数', col2: '' },
        ]
    })
    // 模态框弹出方法
    const sonFn = (e) => { 
      showModalRef.value = true
      currentRef.value=1
      model.value = {...e,status:3}
      gridOptions.data[0].col2 = model.value.orgName
       // 人员接口
        getUserByOrgId({id:e.id}).then((res)=>{
          res.map(d=>{
            d.newOrgId=''
          })
           empMessage.empList = res ? res :[]
           empMessage.current2V = res ? res :[]
            gridOptions.data[2].col2 = res ? res.length:0
        })
        // 岗位接口
        allPostList({parentOrgId:e.id}).then((res)=>{
           postMessage.postList = res ? res :[]
           postMessage.current3V = res ? res :[]
            gridOptions.data[3].col2 = res ? res.length:0

        })
         // 职位接口
        allDutyList({parentOrgId:e.id}).then((res)=>{
           dutyMessage.dutyList = res ? res :[]
           dutyMessage.current4V = res ? res :[]
            gridOptions.data[4].col2 =  res ? res.length:0
        })
        rightList({status:1,isDefault:0,parentId:e.id,orgType:1}).then((res)=>{
            gridOptions.data[1].col2 = res ? res.length:0
            tree.administerList = res
        })
        // 组织树接口调用
        rightList({status:1,isDefault:0}).then((res)=>{
            const _arr = []
              const getStr = (list)=>{
                    list.forEach((row)=>{
                        if(row.kids.length>0){
                            row.label = row.orgName
                            row.key = row.id 
                            row.disabled = row.id == model.value.id
                            row.children = row.kids
                            getStr(row.kids)
                        }else {
                            row.disabled = row.id == model.value.id
                            row.label = row.orgName
                            row.key = row.id
                            _arr.push(row)
                        }
                    })
                }
            
                getStr(res)
                console.log(res,'resresresres')
                tree.treeList = res[0] ? res[0].children :[]
                tree.treeData = res[0] ? res[0].children :[]
            })
       
    };
    const formatDate=(date)=> {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      }
    // 点击确定调用
    const onPositiveClick =()=>{
        updateStatus({
            'mdmOrgDto':{...model.value,modifyTime:formatDate(model.value.modifyTime)},
            'mdmUserDtos':empMessage.current2V,
            'mdmPostDtos':postMessage.current3V,
             'mdmDytyDtos':dutyMessage.current4V,
        }).then((res)=>{
          if(res){
            
            context.emit('update:callback');
            showModalRef.value = false
          }

        })
    }
    onMounted(async () => {
      
    })
    return {
      xTable,
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      current: currentRef,
      dutyMessage,
      empMessage,postMessage,
      postList,
      dutyList,
      tree,
      onPositiveClick,
      message,
      formatDate,
      gridOptions,
     
      validRules:reactive({
          newOrgId: [
            { required: true, message: '新部门不能为空'  }
          ],
         
      }),
      
      onNegativeClick () {
        showModalRef.value = false
      },
     
    }
  },
   methods: {
     nextAdCurrent(e){
        const errMap = this.empMessage.current2V.filter(d=>d.status == 1).map(d=>d.newOrgId).every(f=>f)
        if (errMap) {
          
        } else {
          this.message.error("新组织不能为空")
        }
        return errMap
        
      },
       postNameChange(row){
            this.$refs.xTable.clearActived(); //清除单元格激活状态
            this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
            this.empMessage.current2V[row._rowIndex].postId=row.row.postId
            this.postList.map((d)=>{
                if(d.id == row.row.postId) {
                  this.empMessage.current2V[row._rowIndex].mdmPostUserDto=d
                }
                
            })
       },
         dutyNameChange(row){
            this.$refs.xTable.clearActived(); //清除单元格激活状态
            this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
            this.empMessage.current2V[row._rowIndex].dutyId=row.row.dutyId
            this.dutyList.map((d)=>{
                if(d.id == row.row.dutyId) {
                  this.empMessage.current2V[row._rowIndex].mdmDutyUserDto=d
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
        postUpParentChange(row){
            if(!row.row.parentDeptId){
                  this.postList= []
                  this.dutyList = []
           }else {
               allPostList({parentOrgId:row.row.parentDeptId}).then((res)=>{
                this.postList = res
                })
                allDutyList({parentOrgId:row.row.parentDeptId}).then((res)=>{
                  this.dutyList = res
                })
           }
      },
      
        //  
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
      }
   },
})
</script>