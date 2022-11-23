<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="组织拆分"
    style="width: 1300px"
  >
    <div style="height: 700px; width: 100%">
      <div style="width: 80%; padding-top: 10px; margin: auto; height: 40px">
        <n-space vertical justify="center">
          <n-steps size="small" :current="current">
            <n-step title="拆分机构" />
            <n-step title="人员安排" />
            <n-step title="岗位安排" />
            <n-step title="职位安排" />
            <n-step title="填写表单" />
            <n-step title="核准信息" />
          </n-steps>
        </n-space>
      </div>
      <div
        style="width: 90%; padding-top: 10px; margin: auto; height: 550px"
        v-if="current == 1"
      >
        <n-grid x-gap="2" style="height: 100%" :cols="6">
          <n-grid-item style="border: 1px solid #ebeef4" :span="2">
            <n-spin :show="showSpin" >
              <n-card title="被拆分机构" size="small" style="height: 550px">
                <n-list>
                  <n-list-item>
                    <n-thing :title="model.value.orgName" description="">
                      机构属性: {{ model.value.orgType == 1 ? "机构" : "部门"
                      }}<br />
                      机构级别:
                      {{
                        `${model.value.level}级${
                          model.value.orgType == 1 ? "机构" : "部门"
                        }`
                      }}<br />
                      人员总数: {{ `${empMessage.empList.length}个人` }}<br />
                      岗位总数:{{ `${postMessage.postList.length}个岗` }}<br />
                      职位总数:{{ `${dutyMessage.dutyList.length}个职` }}<br />
                    </n-thing>
                  </n-list-item>
                </n-list>
              </n-card>
            </n-spin>
          </n-grid-item>
          <n-grid-item style="border: 1px solid red" :span="1"></n-grid-item>
          <n-grid-item style="border: 1px solid #ebeef4" :span="3">
            <n-card title="拆分为" size="small" style="height: 550px">
              <n-space vertical :size="12">
                <n-tree
                  :data="tree.treeList"
                  block-line
                  virtual-scroll
                  remote
                  :on-load="handleLoad"
                  style="height: 500px"
                  :render-suffix="renderSuffix"
                  @update:selected-keys="treeSelected"
                />
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
      <n-card style="height: 600px" v-if="current == 2">
        <vxe-table
          border
          resizable
          keep-source
          show-overflow
          ref="xTable"
          size="small"
          height="550px"
          :edit-rules="validRules" 
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true,autoClear: false, }"
          :data="empMessage.current2V.filter(d=>d.status == 1)"
          @cell-click="currentChangeEvent"
        >
          <vxe-table-column
            field="userNameCh"
            title="待安排人员"
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
                    empMessage.current2V[row._rowIndex].parentDeptId=p
                    empMessage.current2V[row._rowIndex].parentDeptName=filterTableMater(p,tree.treeData).orgName
                    empMessage.current2V[row._rowIndex].orgFullId=filterTableMater(p,tree.treeData).orgFullId
                    empMessage.current2V[row._rowIndex].orgFullName=filterTableMater(p,tree.treeData).orgFullName
                    empMessage.current2V[row._rowIndex].parentOrgId=filterTableMater(p,tree.treeData).parentOrgId  
                    empMessage.current2V[row._rowIndex].parentOrgName=filterTableMater(p,tree.treeData).parentOrgName 
                    empMessage.current2V[row._rowIndex].parentDeptFullName=filterTableMater(p,tree.treeData).parentDeptFullName 
                    empMessage.current2V[row._rowIndex].parentOrgFullName =filterTableMater(p,tree.treeData).parentOrgFullName  
                    $refs.xTable.clearActived()
                  }"
                  filterable
                  clearable
                  :options="getStr(tree.orgList)" 
                  size="small" 
                  v-model="row.row.parentDeptId" 
              />
            </template>
            <template v-slot="{ row }">{{ row.newOrgName }}</template>
          </vxe-table-column>
          <vxe-table-column field="postName" title="新岗位" >
            <template v-slot:edit="row">
             
               
            </template>
            <template v-slot="row">
               <n-input  class="my-search" placeholder="" disabled :value="row.row.mdmPostUserDto ?row.row.mdmPostUserDto.postName:'' ">
                  <template #suffix>
                     <n-button  @Click="(e)=>{showPostPick({index:row._rowIndex})}">选择</n-button>
                  </template>
              </n-input>
               
            </template>
          </vxe-table-column>
          <vxe-table-column field="dutyName" title="新职位" >
            <template v-slot:edit="row">
            </template>
            <template v-slot="row">
               <n-input  class="my-search" placeholder="" disabled :value="row.row.mdmDutyUserDto ?row.row.mdmDutyUserDto.dutyName:'' ">
                  <template #suffix>
                     <n-button  @Click="(e)=>{showDutyPick({index:row._rowIndex})}">选择</n-button>
                  </template>
              </n-input>
               
            </template>
          </vxe-table-column>
        </vxe-table>
      </n-card>
      <n-card style="height: 600px" v-if="current == 3">
        <vxe-table
          border
          resizable
          keep-source
          show-overflow
          ref="xTable"
          size="small"
          height="550px"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true,autoClear: false, }"
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
          <vxe-table-column field="parentId" title="新组织" :edit-render="{}">
            <template v-slot:edit="row">
              <!-- <vxe-select
                @change="postParentIdChange(row)"
                v-model="row.row.parentId"
                placeholder="小型尺寸"
                size="small"
              >
                <vxe-option
                  v-for="item in tree.orgList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.orgName"
                ></vxe-option>
              </vxe-select> -->
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
                  :options="disOrg(tree.orgList)" 
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
          <vxe-table-column field="parentId" title="新组织" :edit-render="{}">
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
                  :options="disOrg(tree.orgList)" 
                  size="small" 
                  v-model="row.row.parentDeptId" 
              />
            </template>
            <template v-slot="{ row }">{{ row.newOrgName }}</template>
          </vxe-table-column>
        </vxe-table>
      </n-card>
      <div
        style="width: 80%; padding-top: 10px; margin: auto; height: 550px"
        v-if="current == 5"
      >
        <n-form>
          <n-grid x-gap="8" style="height: 100%" :cols="1">
            <n-grid-item>
              <n-form-item label="拆分时间" path="modifyTime">
                <NDatePicker 
                      type="date"
                      format='yyyy-MM-dd'
                      v-model:value="model.value.modifyTime" 
                      size="small"
                      style="width:100%"
                      @update:value="(e)=>{
                         gridOptions.data[5].col2 = formatDate(e)
                      }"
                     
                  />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="拆分原因" path="modifyReason ">
                <n-input
                  size="small"
                  placeholder="请输入"
                  type="textarea"
                  :autosize="{
                      minRows: 3,
                      maxRows: 5
                  }" 
                   @update:value="(e)=>{
                      gridOptions.data[6].col2 = e
                    }"
                  v-model:value="model.value.modifyReason"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </div>
      <n-card style="height: 600px" v-if="current == 6">
        <vxe-grid class="reverse-table" show-overflow="tooltip"  v-bind="gridOptions" height="600px"></vxe-grid>
      </n-card>
    </div>
    <template #action>
      <n-button
        type="primary"
        size="small"
        style="margin-right: 5px"
        v-if="current !== 1"
        @click="current = --current"
        >上一步</n-button
      >

      <n-button
        type="primary"
        size="small"
        style="margin-right: 5px"
        v-if="current < 6"
        @click="
          () => {
            if (current !== 1 && current !== 2) {
              current = ++current;
            }else if(current==2){
                if(nextAdCurrent()) {
                  current=++current
                } 
            } else if (current == 1 && tree.orgList.length >= 2) {
              gridOptions.data[1].col2 = tree.orgList
                .map((d) => d.orgName)
                .join(',');
              current = ++current;
            } else {
              message.warning('拆分为的机构或部门不能少于两条');
            }
          }
        "
        >下一步</n-button
      >
      <n-button
        type="warning"
        size="small"
        style="margin-right: 5px"
        @click="onNegativeClick"
        v-if="current == 6 || current == 1"
        >取消</n-button
      >
      <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="onPositiveClick"
        v-if="current == 6"
        >确定</n-button
      >
    </template>
     <!-- <n-spin :show="spinV" >
            
      </n-spin> -->
  </n-modal>
   <PostPickModal ref="postPickModal"
      @update:callback="(e) => {
        
        empMessage.current2V[e.index].mdmPostUserDto=e
         $refs.xTable.clearActived()
         
      }"
      :propTreeList="tree.orgList"
      :multiple="false"
  ></PostPickModal>
  <DutyPickModal ref="dutyPickModal"
      @update:callback="(e) => {
        
        empMessage.current2V[e.index].mdmDutyUserDto=e
         $refs.xTable.clearActived()
         
      }"
      :propTreeList="tree.orgList"
      :multiple="false"
  ></DutyPickModal>
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
    NSpin,
    NDatePicker

} from 'naive-ui'
  import {  rightList, creatOrg, updateStatus,allPostList, allDutyList } from './api'
  import {  getUserByOrgId } from '../emp-manage/api'
  import PostPickModal from '../../components/postPickModal/postPickModal.vue'
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
        NSpin,
        PostPickModal,
        DutyPickModal,
        NDatePicker
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = reactive({})
    const tree = reactive({treeData:[],treeList:[],orgList:[]})
    const current = ref(1)
    const showSpin = ref(false)
    const spinShow = ref(false)
    const postPickModal= ref()
    const dutyPickModal= ref()

    const showPostPick = (row) =>{
      postPickModal.value.sonFn(row);
    }
    const showDutyPick = (row) =>{
      dutyPickModal.value.sonFn(row);
    }
    const empMessage = reactive({
        empList:[],
        current2V:[],
    })
    const postMessage = reactive({
        postList:[],
        current3V:[],
    })
    const dutyMessage = reactive({
        dutyList:[],
        current4V:[],
    })
    const message = useMessage();
    const postList = reactive([])
    const gridOptions = reactive({
        border: true,
        showHeader: false,
        columns: [
            { field: 'col1', width: 100 },
            { field: 'col2' },
           
        ],
        data: [
            { col1: '拆分机构', col2: ''  },
            { col1: '拆分为', col2: ''  },
            { col1: '已安排人员', col2: '' },
            { col1: '已安排岗位', col2: '' },
            { col1: '已安排职位', col2: '' },
            { col1: '拆分时间', col2: '' },
            { col1: '拆分原因', col2: ''  }
        ]
    })
    const sonFn = (e) => {
      showModalRef.value = true
      current.value = 1
      tree.orgList = []
      
      model.value = {...e,status:2}
      gridOptions.data[0].col2 = model.value.orgName
        spinShow.value = true
       // 人员接口
        getUserByOrgId({id:e.id}).then((res)=>{
           res.map(d=>{
            d.newOrgId=''
          })
           empMessage.empList = res ? res :[]
           empMessage.current2V = res ? res :[]
            gridOptions.data[2].col2 =res ?  res.map(d=>d.userNameCh).join(',') :''
        })
        // 岗位接口
        allPostList({parentOrgId:e.id}).then((res)=>{
           postMessage.postList = res ? res :[]
           postMessage.current3V = res ? res :[]
            gridOptions.data[3].col2 = res ? res.map(d=>d.postName).join(',') :''
           spinShow.value = false
        })
        // 职位接口
        allDutyList({parentOrgId:e.id}).then((res)=>{
           dutyMessage.dutyList = res ? res :[]
           dutyMessage.current4V = res ? res :[]
            gridOptions.data[4].col2 = res ? res.map(d=>d.dutyName).join(',') :''
           spinShow.value = false
        })
        rightList({status:1,isDefault:1}).then((res)=>{
            const _arr = []
            
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
                            row.isLeaf = false
                            _arr.push(row)
                        }
                    })
                }
                getStr(res)
                tree.treeList = res
                // tree.treeList = reactive(_arr)
            })
             rightList({status:1,isDefault:0}).then((res)=>{
                const _arr = []
                
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
                            row.isLeaf = false
                            _arr.push(row)
                        }
                    })
                }
                getStr(res)
                tree.treeData = res
            })
           
       
    };
     const  formatDate = (date) =>{
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
            'mdmDutyDtos':dutyMessage.current4V,
        }).then((res)=>{
          if(res){
            
            context.emit('update:callback');
            showModalRef.value = false
            tree.orgList = []
          }

        })
        
    }
    const renderSuffix = ({ option }) =>{
      return h(
            NButton,
            { text: true, type: isAddedByUserId(option.id)?'warning':'primary',disabled:((option.orgType !== model.value.orgType) || (option.id == model.value.id) || option.id == 0) },
            { default: () => isAddedByUserId(option.id)?`取消`:'选择' }
        )
    }
    const  isAddedByUserId = (orgId) => {
        return tree.orgList.map(d => d.id).includes(orgId)
    }
   const treeSelected = (e)=>{
      console.log(e,'getParentName(e[0])')
       if(e[0]){
        if(isAddedByUserId(e[0])){
            for(var i=tree.orgList.length-1;i>=0;i--){
                if(tree.orgList[i].id == e[0]) tree.orgList.splice(i,1);
            }
        } else {
            tree.orgList.push(getParentName(e[0]))
            console.log(getParentName(e[0]),'getParentName(e[0])')
        }
       } else {
           tree.orgList.splice(tree.orgList.length, 1) 
       }
   }
  
    const  getParentName = (e)=>{
        const  filterTableMater=(id, arr) =>{
              for (const item of arr) {
                if (item.id === id) return item
                if (item.kids && item.kids.length) {
                  const _item = filterTableMater(id, item.kids)
                  if (_item) return _item
                }
              }
            }
             return filterTableMater(e,tree.treeData)
            
      }
      
    onMounted(async () => {
      
        
    })
    return {
      sonFn,
      showSpin,
      model, // 表单数据
      showModal: showModalRef,
      current,
      empMessage,postMessage,
      showPostPick,postPickModal,
      showDutyPick,dutyPickModal,
      postList,
      dutyMessage,
      tree,
      formatDate,
      treeSelected,
      renderSuffix,
      onPositiveClick,
      getParentName,
      message,
      isAddedByUserId,
      gridOptions,
       validRules:reactive({
          newOrgId: [
            { required: true, message: '新部门不能为空'  }
          ],
         
      }),
      onNegativeClick () {
        current.value = 1
        showModalRef.value = false
        tree.orgList = []
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
       parentIdChange(row) {
            this.$refs.xTable.clearActived(); //清除单元格激活状态
            this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
            this.empMessage.current2V[row._rowIndex].parentId=row.row.parentId
          
            this.tree.orgList.map((d)=>{
                if(d.id == row.row.parentId) {
                  this.empMessage.current2V[row._rowIndex].parentName=d.orgName
                }
                
            })
            allPostList({parentOrgId:row.row.parentId}).then((res)=>{
                this.postList = res ? res :[]
            })
       },
       handleLoad(node){
         return  new Promise((resolve, reject)=>{
            rightList({status:1,isDefault:0,parentId:node.id}).then((res)=>{
            const getStr = (list)=>{
                    list.forEach((row)=>{
                        if(row.kids.length>0){
                            row.label = row.orgName
                            row.key = row.id 
                            row.children = row.kids
                             row.isLeaf = false
                            getStr(row.kids)
                        }else {
                            row.label = row.orgName
                            row.key = row.id,
                            row.isLeaf = false
                        }
                    })
                }
                getStr(res)
                node.children = res
                resolve()
            })
         })
         
            
      },
       postParentIdChange(row){
           this.$refs.xTable.clearActived(); //清除单元格激活状态
            this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
            this.postMessage.current3V[row._rowIndex].parentId=row.row.parentId
            this.tree.orgList.map((d)=>{
                if(d.id == row.row.parentId) {
                  this.postMessage.current3V[row._rowIndex].parentName=d.orgName
                }
                
            })
       },
       postNameChange(row){
            this.$refs.xTable.clearActived(); //清除单元格激活状态
            this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
            this.empMessage.current2V[row._rowIndex].postId=row.row.postId
            this.postList.map((d)=>{
                if(d.id == row.row.postId) {
                  this.empMessage.current2V[row._rowIndex].postName=d.postName
                }
                
            })
       },
      //  人员安排表格点击事件
       currentChangeEvent({row}){
           if(!row.parentId){
                  this.postList= []
           }else {
                allPostList({parentOrgId:row.parentId}).then((res)=>{
                    this.postList = res ? res :[]
                })
           }
           
       },
      //  递归查询机构匹配信息
      filterTableMater(id, arr) {

          for (const item of arr) {
            if (item.id === id) return item
            if (item.kids && item.kids.length) {
              const _item = this.filterTableMater(id, item.kids)
              if (_item) return _item
            }
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
<style scoped lang='less'>
</style>