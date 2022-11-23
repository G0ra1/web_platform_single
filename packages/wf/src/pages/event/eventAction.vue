<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="事件管理维护"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:1000px;"
  >
  <n-spin :show="isLoading">
     <div style="width:80%;padding-top: 10px;margin:auto;height:40px">
           <n-space vertical justify="center">
                <n-steps size="small" :current="current" >
                    <n-step
                        title="事件信息"
                    />
                    <n-step
                        title="事件参数"
                    />
                </n-steps>
            </n-space>
       </div>
    <n-form  :model="model" ref="formRef" :rules="rules" style="height:680px">
        <n-grid x-gap="8" :cols="2" v-if="current==1">
            <n-grid-item>
                <n-form-item label="流程分类" path="procdefTypeId">
                  <!-- <n-select
                      v-model:value="model.procdefTypeId"
                      size="small"
                      placeholder="请选择流程分类"
                      @update:value="(e)=>procdefTypeChange(e)"
                      :options="arrData.procdefTypes"
                  />   -->
                   <n-tree-select  :options="arrData.procdefTypes" size="small" 
                      :default-value="model.procdefTypeId"
                      placeholder="请选择" 
                      v-model:value="model.procdefTypeId" 
                       @update:value="(p)=>{
                         model.procdefTypeName=filterTableMater(p,arrData.procdefTypes).procdefTypeName 
                       }"
                      filterable
                      clearable
                     />              
                  </n-form-item>
            </n-grid-item>
             <n-grid-item>
                  <n-form-item label="事件分类" path="eventType">
                     <n-select
                          v-model:value="model.eventType"
                          size="small"
                          placeholder="请选择事件分类"
                          :options="eventTypeList"
                      />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="事件ID" path="listenerId">
                    <n-input size="small" placeholder="请输入" v-model:value="model.listenerId" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="事件名称" path="listenerName">
                    <n-input size="small" placeholder="请输入" v-model:value="model.listenerName" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="bean" path="listenerImpl">
                    <n-input size="small" placeholder="请输入" v-model:value="model.listenerImpl" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item v-if="model.eventType || model.eventType==0">
                  <n-form-item label="节点类型" path="nodeEventType">
                    <n-select
                          v-model:value="model.nodeEventType"
                          size="small"
                          placeholder="请选择节点类型"
                          :options="jdList1"
                          v-if="model.eventType == 0"
                          :fallback-option="(value) => ({ label: '' , value })"
                      />
                      <n-select
                           v-if="model.eventType == 1"
                          v-model:value="model.nodeEventType"
                          size="small"
                          placeholder="请选择节点类型"
                           :fallback-option="(value) => ({ label: '' , value })"
                          :options="jdList2"
                      />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item v-if="model.eventType || model.eventType==0">
                  <n-form-item label="默认周期" path="defaultTrigVal">
                    <n-select
                          v-model:value="model.defaultTrigVal"
                          size="small"
                          placeholder="请选择节点类型"
                          :options="defaultTrigValList1"
                           :fallback-option="(value) => ({ label: '' , value })"
                          v-if="model.eventType == 0"
                      />
                      <n-select
                          v-if="model.eventType == 1 && model.nodeEventType != 3"
                          v-model:value="model.defaultTrigVal"
                          size="small"
                          placeholder="请选择节点类型"
                          :fallback-option="(value) => ({ label: '' , value })"
                          :options="defaultTrigValList2"
                      />
                       <n-select
                           v-if="model.eventType == 1 && model.nodeEventType == 3"
                          v-model:value="model.defaultTrigVal"
                          size="small"
                           :fallback-option="(value) => ({ label: '' , value })"
                          placeholder="请选择节点类型"
                          :options="defaultTrigValList3"
                      />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="默认事件" path="selectSign">
                     <n-select
                          v-model:value="model.selectSign"
                          size="small"
                          placeholder="请选择默认事件"
                          :options="status"
                      />
                </n-form-item>
              </n-grid-item>
              <n-grid-item v-if="model.selectSign==1">
                  <n-form-item label="强制绑定" path="selectMust">
                     <n-select
                          v-model:value="model.selectMust"
                          size="small"
                          placeholder="请选择强制绑定"
                          :options="status"
                      />
                </n-form-item>
              </n-grid-item>
               <n-grid-item span="24">
                  <n-form-item label="描述" path="remark">
                      <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.remark" />
                  </n-form-item>
              </n-grid-item>
              
        </n-grid>
        <n-grid x-gap="24" :cols="1" v-if="current==2">
          <n-grid-item>
            <n-card style="height:680px" >
              <vxe-toolbar v-if="!model.id">
                <template v-slot:buttons>
                  <vxe-button status="primary" v-if="model.wfEventParamList.some((d)=>{return d.isDel==1})" @click="()=>{model.wfEventParamList=model.wfEventParamList.filter(d=>d.isDel!==1)}">取消默认值</vxe-button>
                  <vxe-button status="primary" v-else @click="insertEvent1">添加默认值</vxe-button>
                </template>
              </vxe-toolbar>
              <vxe-table
                  border
                  ref="xTable"
                  size="small"
                  :height="model.id ?580 : 520"
                  :edit-rules="validRules"
                  :edit-config="{trigger: 'click', mode: 'cell',  showStatus: true,autoClear: false,}"
                  :data="model.wfEventParamList"
                >
                  <vxe-table-column
                    field="paramType"
                    title="参数类型"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row">
                      <vxe-select  @change="paramTypeChange(row)" v-model="row.row.paramType" placeholder="" size="small">
                        <vxe-option v-for="item in paramTypes" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                      </vxe-select>
                    </template>
                    <template v-slot="{ row }">{{row.paramType ? paramTypes.filter(d=>d.value==row.paramType)[0].label : '' }}</template>
                  
                  </vxe-table-column>
                  <vxe-table-column
                    field="paramId"
                    title="参数ID"
                    :edit-render="{ name: 'input', attrs: { type: 'text' },
                      events: { change: paramIdChange },
                     }"
                  ></vxe-table-column>
                   <vxe-table-column
                    field="paramName"
                    title="参数名称"
                    :edit-render="{ name: 'input', attrs: { type: 'text' },
                      events: { change: paramNameChange },
                    }"
                  ></vxe-table-column>
                   <vxe-table-column
                    field="paramDefalutValue"
                    title="默认值"
                    :edit-render="{ name: 'input', attrs: { type: 'text' },
                      events: { change: paramDefalutValueChange },
                    }"
                  ></vxe-table-column>
                   <!-- <vxe-table-column
                    field="isPullDown"
                    title="是否列表选值"
                    :edit-render="{}"
                  >
                    <template v-slot:edit="row">
                      <vxe-select  @change="isPullDownChange(row)" v-model="row.row.isPullDown" placeholder="" size="small">
                        <vxe-option v-for="item in status" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                      </vxe-select>
                    </template>
                    <template v-slot="{ row }">{{(row.isPullDown ||  row.isPullDown==0) ? status.filter(d=>d.value==row.isPullDown)[0].label : '' }}</template>

                  </vxe-table-column> -->
                  <vxe-table-column
                    title="操作"
                    align="center"
                  >
                    <template v-slot="{ row }">
                    
                      <a style="color:red;cursor:pointer" v-if="row.isDel !== 1" @click="removeEvent(row)">删除</a>
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
import {  create, modify,queryById } from './api'
import { Aes } from '@platform/main'
import {  queryAll } from '../procdeftype/api/index'

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
    const arrData = reactive({procdefTypes:[]})

    const currentRef = ref(1)
    const xTable = ref()
    const isLoading = ref(false)
    const formRef = ref(null)
    const dialog = useDialog()
    const message = useMessage();

    const sonFn = (e={}) => {
      isLoading.value = true
      if(e.id){
        queryById(e.id).then((res)=>{
          modelRef.value= {...res}
        }).finally(r => {
             
          isLoading.value = false
        })
      } else {
        modelRef.value={wfEventParamList:[],}
         isLoading.value = false
      }
      currentRef.value=1
      showModalRef.value = true
      

    };
    const insertEvent1 =  () => {
      modelRef.value.wfEventParamList = modelRef.value.wfEventParamList.concat([{paramType:'string',paramId:'serviceId',paramName:'服务名称',paramDefalutValue:'',isDel:1},{paramType:'string',paramId:'bizTag',paramName:'tag',paramDefalutValue:'',isDel:1}])
    }
    // 新增
    const insertEvent = async (row) => {
      const $table = xTable.value
      const record = {}
      const num =  modelRef.value.wfEventParamList.length
      modelRef.value.wfEventParamList[num]={...record}
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
       queryAll({}).then((res)=>{
        //  arrData.procdefTypes = res.records.map(d=>{
        //   d.label = d.procdefTypeName
        //   d.value = d.id
        //   return d
        //  })
          const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.procdefTypeName
                       row.key = row.id 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                      row.key = row.id 
                      row.label = row.procdefTypeName
                       
                    }
                })
            }
            getStr(res)
            arrData.procdefTypes = res
       })
    })
    return {
      insertEvent1,
      sonFn,
      xTable,
      insertEvent,
      removeEvent,
      arrData,
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
      paramTypes: reactive([
        {
          label: "String",
          value: "string",
        },
        {
          label: "Expression",
          value: "expression",
        },
      ]),
      defaultTrigValList1: reactive([
            {
                value: "",
                label: "无"
            },
            {
                value: "create",
                label: "创建"
            },
            {
                value: "assignment",
                label: "签收"
            },
            {
                value: "revoke",
                label: "撤回"
            },
            {
                value: "rejected",
                label: "被驳回"
            },
            {
                value: "before_complete",
                label: "提交前"
            },
            {
                value: "complete",
                label: "完成"
            },
            {
                value: "delete",
                label: "删除"
            },
            {
                value: "update",
                label: "修改"
            } 
        ]),
        defaultTrigValList2: reactive([
            {
                value: "",
                label: "无"
            },
            {
                value: "start",
                label: "开始"
            },
            {
                value: "end",
                label: "结束"
            },
            {
                value: "suspend_process",
                label: "流程挂起"
            },
            {
                value: "end_process",
                label: "流程终止"
            },
            {
                value: "activate_process",
                label: "流程激活"
            },
            {
                value: "delete_process",
                label: "流程删除"
            }
        ]),
        defaultTrigValList3: reactive([
            {
                value: "",
                label: "无"
            },
            {
                value: "take",
                label: "流转"
            }
        ]),
      eventTypeList: reactive([
        {
          label: "任务事件",
          value: 0,
        },
        {
          label: "执行事件",
          value: 1,
        },
      ]),
      jdList1: reactive(
        [
            {
                value: '8',
                label: "全部节点类型"
            },
            {
                value: '12',
                label: "用户任务"
            },
            {
                value: '1',
                label: "用户任务-单实例"
            },
            {
                value: '2',
                label: "用户任务-多实例"
            }
        ]
      ),
      jdList2:reactive(
          [
            {
                value: '8',
                label: "全部节点类型"
            },
            {
                value: '0',
                label: "流程定义"
            },
           
            {
                value: '15',
                label: "流程定义-外嵌流程"
            },
            {
                value: '12',
                label: "用户任务"
            },
            {
                value: '1',
                label: "用户任务-单实例"
            },
            {
                value: '2',
                label: "用户任务-多实例"
            },
            {
                value: '3',
                label: "序列流"
            },
            {
                value:'4',
                label: "开始"
            },
            {
                value: '5',
                label: "结束"
            },
            // {
            //     value: 6,
            //     label: "子流程"
            // },
            {
                value: '7',
                label: "网关"
            }
        ]
      ),
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
              modelRef.value.passWord = Aes.encrypt(modelRef.value.passWord )
              modelRef.value.reenteredPassword = Aes.encrypt(modelRef.value.reenteredPassword )
            fn(modelRef.value).then((res)=>{
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
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
    paramTypeChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.wfEventParamList[row._rowIndex].paramType=row.row.paramType
    },
    isPullDownChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.wfEventParamList[row._rowIndex].isPullDown=row.row.isPullDown
    },
    paramIdChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.wfEventParamList[row._rowIndex].paramId=row.row.paramId
    },
    paramNameChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.wfEventParamList[row._rowIndex].paramName=row.row.paramName
    },
     paramDefalutValueChange(row){
      this.$refs.xTable.clearActived(); //清除单元格激活状态
      this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.model.wfEventParamList[row._rowIndex].paramDefalutValue=row.row.paramDefalutValue
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