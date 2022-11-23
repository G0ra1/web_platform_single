<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="表达式管理维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:1200px;"
  >
  <n-spin :show="isLoading">
     <div style="width:80%;padding-top: 10px;margin:auto;height:40px">
           <n-space vertical justify="center">
                <n-steps size="small" :current="current" >
                    <n-step
                        title="表达式信息"
                    />
                    <n-step
                        title="参数设置"
                    />
                </n-steps>
            </n-space>
       </div>
    <n-form  :model="model" ref="formRef" :rules="rules" style="height:600px">
        <n-grid x-gap="8" :cols="2" v-if="current==1">
            <n-grid-item>
                <n-form-item label="流程分类" path="procdefTypeId">
                  <n-select
                      v-model:value="model.procdefTypeId"
                      size="small"
                      placeholder="请选择流程分类"
                      @update:value="(e)=>procdefTypeChange(e)"
                      :options="arrData.procdefTypes"
                  />                
                  </n-form-item>
            </n-grid-item>
             <!-- <n-grid-item>
                  <n-form-item label="表达式分类" path="expreTypeName">
                     <n-input size="small" placeholder="请输入" v-model:value="model.expreTypeName" disabled/>
                </n-form-item>
              </n-grid-item> -->
              <n-grid-item>
                  <n-form-item label="表达式" path="expreValue">
                    <n-input size="small" placeholder="请输入" disabled v-model:value="model.expreValue" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="表达式名称" path="expreName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.expreName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="返回类型" path="expreReturnType">
                     <n-select
                          v-model:value="model.expreReturnType"
                          size="small"
                          placeholder="请选择返回类型"
                          :options="typeList"
                      />
                </n-form-item>
              </n-grid-item>
               <n-grid-item v-if="model.expreType == 1 && model.expreReturnType == 6">
                  <n-form-item label="泛型" path="expreReturnGenerics">
                     <n-select
                          v-model:value="model.expreReturnGenerics"
                          size="small"
                          placeholder="请选择泛型"
                          :options="typeList"
                      />
                </n-form-item>
              </n-grid-item>
             
               <n-grid-item span="24">
                  <n-form-item label="表达式描述" path="remark">
                      <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.remark" />
                  </n-form-item>
              </n-grid-item>
              
        </n-grid>
        <n-grid x-gap="24" :cols="1" v-if="current==2">
          <n-grid-item>
            <n-card style="height:600px" >
              <vxe-table
                  border
                  resizable
                  keep-source
                  show-overflow
                  ref="xTable"
                  size="small"
                  height="auto"
                  :edit-rules="validRules"
                  :edit-config="{trigger: 'click', mode: 'cell',  showStatus: true,autoClear: false,}"
                  :data="model.expreParamList"
                >
           
                  <!-- <vxe-table-column
                    field="paramType"
                    title="参数分类"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row" >
                      <vxe-select  @change="paramTypeChange(row)" v-model="row.row.paramType" placeholder="" size="small" :disabled="row.row.isDel == 0">
                        <vxe-option v-for="item in paramTypes" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                      </vxe-select>
                    </template>
                    <template v-slot="{ row }">{{row.paramType ? paramTypes.filter(d=>d.value==row.paramType)[0].label : '' }}</template>
                  
                  </vxe-table-column> -->
                  <vxe-table-column
                    field="paramVarType"
                    title="参数类型"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row">
                      <vxe-select  @change="paramVarTypeChange(row)" v-model="row.row.paramVarType" placeholder="" size="small" :disabled="row.row.isDel == 0">
                        <vxe-option v-for="item in ((row.row.paramType =='STANDARD_EXPRE') ? paramTypeList:paramVarTypeList2)" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                      </vxe-select>
                    </template>
                    <template v-slot="{ row }">{{(row.paramVarType) ? ((row.paramType =='STANDARD_EXPRE') ? paramTypeList:paramVarTypeList2).filter(d=>d.value==row.paramVarType)[0].label : '' }}</template>

                  </vxe-table-column>
                  <vxe-table-column
                    field="paramId"
                    title="参数ID"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row">
                      <vxe-input  @change="paramIdChange(row)" v-model="row.row.paramId" placeholder="" size="small" :disabled="row.row.isDel == 0">
                      </vxe-input>
                    </template>
                    <template v-slot="{ row }">{{row.paramId}}</template>
                  </vxe-table-column>
                  <!-- <vxe-table-column
                    field="seqId"
                    title="序列流"
                    :edit-render="{name: 'input', defaultValue: '',
                      events: { change: seqIdChange },
                    }"
                  ></vxe-table-column> -->
                   <vxe-table-column
                    field="paramName"
                    title="参数名称"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row">
                      <vxe-input  @change="paramNameChange(row)" v-model="row.row.paramName" placeholder="" size="small" :disabled="row.row.isDel == 0">
                      </vxe-input>
                    </template>
                    <template v-slot="{ row }">{{row.paramName}}</template>
                  </vxe-table-column>
                   <!-- <vxe-table-column
                    field="paramDesc"
                    title="参数描述"
                    :edit-render="{name: 'input', defaultValue: '',}"
                  ></vxe-table-column>
                   -->
                  <vxe-table-column
                    title="操作"
                    align="center"
                  >
                    <template v-slot="{ row }" >
                    
                      <a style="color:red;cursor:pointer" v-if="row.isDel == 1" @click="removeEvent(row)">删除</a>
                    </template>

                  </vxe-table-column>
                </vxe-table>
                <template #action> 
                  <div style="text-align: center;display:table;width:100%;height:100%;cursor: pointer;" @click="insertEvent">
                    <a style="display:table-cell;vertical-align:middle;" >添加</a>
                  </div>
                </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-form>
  </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button type="primary" size="small"  style="margin-right: 5px;" v-if="current!==1" @click="current=--current">上一步</n-button>
          <n-button type="primary" size="small"  style="margin-right: 5px;" v-if="current<2" @click="()=>{
             formRef.validate((errors) => {
               if(!errors) {
                 current=++current
               }
             })
                  
            }">下一步</n-button>
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick"  v-if="current==2">保存</n-button>
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
    NSpin,
    NSteps,
    NCard,
    NStep,
    useDialog,
    useMessage
} from 'naive-ui'
import {  create, modify,queryId } from './api'
import {  query } from '../procdeftype/api/index'

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
        NSpin,
        NSteps,
        NStep,
        NCard,
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const currentRef = ref(1)
    const xTable = ref()
    const arrData = reactive({procdefTypes:[]})
    const isLoading = ref(false)
    const formRef = ref(null)
    const message = useMessage();
    const dialog = useDialog()
    const sonFn = (e={}) => {
      currentRef.value=1
      showModalRef.value = true
      if(e.id){
         isLoading.value = true
          queryId(e.id).then((res)=>{
            modelRef.value = {...res,expreTypeName:'条件表达式'}
          }).finally(r => {
             
              isLoading.value = false
            })
      }else {
        modelRef.value = {
          expreParamList:[
          {
            paramDesc: "camunda任务id",
            paramId: "taskId",
            paramName: "camunda任务id",
            paramType: "CUSTOMIZE_EXPRE",
            paramVarType: 'string',
            sequenceNum: 0,
            isDel:0,
          },
          {
            paramDesc: "",
            paramId: "serviceId",
            paramName: "serviceId",
            paramType: "CUSTOMIZE_EXPRE",
            paramVarType: 'string',
            sequenceNum: 1,
            isDel:0,
          },
          {
            paramDesc: "",
            paramId: "bizTag",
            paramName: "bizTag",
            paramType: "CUSTOMIZE_EXPRE",
            paramVarType: 'string',
            sequenceNum: 2,
            isDel:0,
          },
          {
            paramDesc: "",
            paramId: "wfArgs",
            paramName: "wfArgs",
            paramType: "CUSTOMIZE_EXPRE",
            paramVarType: 'string',
            sequenceNum: 3,
            isDel:0,
          },
          {
            paramDesc: "",
            paramId: "seqId",
            paramName: "序列流",
            paramType: "CUSTOMIZE_EXPRE",
            paramVarType: 'string',
            sequenceNum: 4,
            isDel:0,
          }],
          expreValue: "wfConditionExpression.notify()",
          expreType:1,
          expreTypeName:'条件表达式',
        }
      }
    };
    // 新增
    const insertEvent = async (row) => {
      const $table = xTable.value
      const num =  modelRef.value.expreParamList.length
      const record = {isDel:1,sequenceNum:num}

      modelRef.value.expreParamList[num]={...record}
      const { row: newRow } = await $table.insertAt(record, -1)
    }
    //删除
    const removeEvent = (row) => {
      const $table = xTable.value
      dialog.warning({
          title: '警告',
          content: '确定删除当前选项？',
          positiveText: '确定',
          negativeText: '不确定',
          onPositiveClick: () => {
           $table.remove(row)
          },
          onNegativeClick: () => {
            message.warning('取消成功')
          }
        })
      
    }
    onMounted(async () => {
      query({}).then((res)=>{
         arrData.procdefTypes = res.records.map(d=>{
          d.label = d.procdefTypeName
          d.value = d.id
          return d
         })
       })
    })
    return {
      arrData,
      sonFn,
      xTable,
      insertEvent,
      removeEvent,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading,
      current:currentRef,
      formRef,
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
      typeList:reactive([
            {
                value: 1,
                label: "Boolean"
            },
            {
                value: 2,
                label: "String"
            },
            {
                value: 3,
                label: "Integer"
            },
            {
                value: 4,
                label: "Long"
            },
            {
                value: 5,
                label: "Double"
            },
            {
                value: 6,
                label: "List"
            }
      ]),
      paramTypes: reactive([
        {
          label: "标准(内置)",
          value: "STANDARD_EXPRE",
        },
        {
          label: "自定义",
          value: "CUSTOMIZE_EXPRE",
        },
      ]),
      
      paramTypeList:reactive ([
           {
                value: "user",
                label: "人员",
                componentName: 'multiModal',
                componentKey: 'user'
            },
            {
                value: "role",
                label: "角色",
                componentName: 'roleModal',
                componentKey: 'role'
            },
            {
                value: "duty",
                label: "职务",
                componentName: 'multiModal',
                componentKey: 'post'
            },
            {
                value: "post",
                label: "岗位",
                componentName: 'multiModal',
                componentKey: 'job'
            },
            {
                value: "dept",
                label: "部门",
                componentName: 'deptModal',
                componentKey: 'dept'
            },
            {
                value: "mechanism",
                label: "机构",
                componentName: 'deptModal',
                componentKey: 'mechanism'
            },
            {
                value: "builtinrole",
                label: "资源组",
                componentName: 'roleModal',
                componentKey: 'fixedrules'
            }
        ]),
         paramVarTypeList2: reactive([
            {
                value: 'boolean',
                label: "Boolean"
            },
            {
                value: 'string',
                label: "String"
            },
            {
                value: "integer",
                label: "Integer"
            },
            {
                value: 'long',
                label: "Long"
            },
            {
                value: "double",
                label: "Double"
            },
            {
                value: "date",
                label: "Date"
            },
            {
                value: "list",
                label: "List"
            }
        ]),
      rules: {
        procdefTypeName: [
            {
                required: true,
                message: '请输入流程分类名称',
                trigger: ['input', 'blur']
            }
        ],
       
      },
      
      onPositiveClick (){
        const fn =!modelRef.value.id?create:modify
         formRef.value.validate((errors) => {
          if (!errors) {
             isLoading.value = true
      
            fn(modelRef.value).then((res)=>{
              if(res){
                
                context.emit('update:callback');
                modelRef.value = {}
                showModalRef.value = false
              }

            }).finally(r => {
             
              isLoading.value = false
            })
          }
        })
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
    paramTypeChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.expreParamList[row._rowIndex].paramType=row.row.paramType
      this.model.expreParamList[row._rowIndex].paramVarType = ''
      // this.$set(this.model.expreParamList[row._rowIndex],'paramVarType','')
    },
    paramIdChange(row){
      // this.$refs.xTable.clearActived(); //清除单元格激活状态
      // this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.expreParamList[row._rowIndex].paramId=row.row.paramId
    },
    seqIdChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.expreParamList[row._rowIndex].seqId=row.row.seqId
    },
    paramVarTypeChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.expreParamList[row._rowIndex].paramVarType=row.row.paramVarType
    },
    paramNameChange(row){
      // this.$refs.xTable.clearActived(); //清除单元格激活状态
      // this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.expreParamList[row._rowIndex].paramName=row.row.paramName
    },
    procdefTypeChange(e){
      this.model.procdefTypeId = e
      this.arrData.procdefTypes.map(d=>{
        if(d.id == e) {
           this.model.procdefTypeName = d.label
        }
      })
    },
  }
})
</script>
<style lang="less">

</style>