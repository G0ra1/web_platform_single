<template>
  
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择题目"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:1500px;"
  >
     <n-grid > 
        <n-grid-item span="6" style="height: 800px;" v-if="showSide">
            <div class="sider">
                <n-input v-model:value="pattern" placeholder="搜索" />
                <n-spin :show="leftSpinShow" style="padding-top: 6px">
                    <vxe-table
                        resizable
                        highlight-current-row
                        ref="aTable"
                        row-id="id"
                        height="760px"
                    
                        :data="topic.studyExamDatabaseDefList"
                    >
                        <vxe-table-column field="databaseName" title="题库名称"></vxe-table-column>
                        
                        <vxe-table-column field="" title="操作">
                            <template #default="{ row,  }">
                                <vxe-button type="text"
                                    @click="()=>{
                                        getTopic(row.id)
                                    }"   
                                    status="primary"
                                >选择</vxe-button>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
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
                                      待选择题目
                                    </template>
                                </vxe-form-item>
                                <!-- <vxe-form-item>
                                    <template #default>
                                        <vxe-input placeholder="搜索" v-model="topicName"></vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template #default>
                                        <vxe-button status="primary" @click="searchEvent">查询</vxe-button>
                                    </template>
                                </vxe-form-item> -->
                                
                            </vxe-form>
                        </template>
                    </vxe-toolbar>
                    <vxe-table
                        resizable
                        highlight-current-row
                        ref="xTable"
                        row-id="id"
                        :height="!multiple ? '760px' : '380px'"
                        :data="topic.topicList"
                    >
                       <vxe-column type="expand" field="questionCode" title="类型" >
                            <template #default="{ row,  }">
                                <span style="font-size:20px">[{{ (row.questionCode || row.questionCode ==0)?questionCodes.filter(d=>d.value==row.questionCode)[0].label :'' }}]</span><span style="font-size:12px">[难度系数:{{ (row.grade || row.grade ==0) ?grades.filter(d=>d.value==row.grade)[0].label :''  }}]</span>
                            </template>
                            <template #content="{ row,  }">
                                <div  class="expand-wrapper">
                                    <ul v-if="row.answers && (row.questionCode ==0 || row.questionCode ==1)" style="list-style: none;">
                                        <li v-for="item in row.answers">
                                            <span :style="{'color':item.isTrue? '#4098fc' : 'gray'}">{{letters.filter(d=>d.value == item.sort)[0].label }}:  {{item.answer}}</span> 
                                        </li>
                                    
                                    </ul>
                                    <p v-if="row.answers && row.questionCode ==2">{{row.answers.map(d=>d.answer).join('、')}}</p>
                                    <p v-if="row.answers && row.questionCode ==3">{{row.answers[0].isTrue==1?'正确':'错误'}}</p>
                                    <p v-if="row.answers && row.questionCode ==4">{{row.answers[0].answer}}</p>
                                    <p>
                                        <span>解析：</span>
                                        <span>{{ row.parse }}</span>
                                    </p>
                                </div>
                            </template>
                        </vxe-column>
                        <vxe-column field="question" title="题干" ></vxe-column>
                        <vxe-column field="databaseName" title="所属题库" ></vxe-column>
                        <vxe-table-column field="" title="操作">
                            <template v-slot="{ row }">
                                <vxe-button type="text" @click="currentChangeEvent(row)" v-if="!multiple && !isAddedByPostId(row.id)"  status="primary">选择</vxe-button>
                                <vxe-button type="text" 
                                    @click="()=>{
                                      topic.alreadyTopicList.push(row)
                                      $refs.bTable.loadData(topic.alreadyTopicList)
                                    }" 
                                    v-if="multiple && !isAddedByPostId(row.id)"  
                                    status="primary"
                                >选择</vxe-button>
                                <vxe-button type="text" 
                                  @click="()=>{
                                      topic.alreadyTopicList = topic.alreadyTopicList.filter(d => d.id !== row.id)
                                  }" 
                                  v-if="isAddedByPostId(row.id)"  status="warning">取消</vxe-button>

                            </template>
                        </vxe-table-column>
                    </vxe-table>
                      <vxe-toolbar style="height:40px" v-if="multiple">
                        <template v-slot:buttons>
                            <vxe-form>
                                <vxe-form-item>
                                    <template #default>
                                      已选择题目
                                    </template>
                                </vxe-form-item>
                            </vxe-form>
                        </template>
                    </vxe-toolbar>
                    <vxe-table
                        resizable
                        highlight-current-row
                        ref="bTable"
                        row-id="id"
                        height="340px"
                    
                        v-if="multiple"
                        :data="topic.alreadyTopicList"
                    >
                         <vxe-column type="expand" field="questionCode" title="类型" >
                            <template #default="{ row,  }">
                            <span style="font-size:20px">[{{ (row.questionCode || row.questionCode ==0)?questionCodes.filter(d=>d.value==row.questionCode)[0].label :'' }}]</span><span style="font-size:12px">[难度系数:{{ (row.grade || row.grade ==0) ?grades.filter(d=>d.value==row.grade)[0].label :''  }}]</span>
                            </template>
                            <template #content="{ row,  }">
                                <div  class="expand-wrapper">
                                    <ul v-if="row.answers && (row.questionCode ==0 || row.questionCode ==1)" style="list-style: none;">
                                        <li v-for="item in row.answers">
                                            <span :style="{'color':item.isTrue? '#4098fc' : 'gray'}">{{letters.filter(d=>d.value == item.sort)[0].label }}:  {{item.answer}}</span> 
                                        </li>
                                    
                                    </ul>
                                    <p v-if="row.answers && row.questionCode ==2">{{row.answers.map(d=>d.answer).join('、')}}</p>
                                    <p v-if="row.answers && row.questionCode ==3">{{row.answers[0].isTrue==1?'正确':'错误'}}</p>
                                    <p v-if="row.answers && row.questionCode ==4">{{row.answers[0].answer}}</p>

                                    <p>
                                        <span>解析：</span>
                                        <span>{{ row.parse }}</span>
                                    </p>
                                </div>
                            </template>
                        </vxe-column>
                        <vxe-column field="question" title="题干" ></vxe-column>
                        <vxe-column field="databaseName" title="所属题库" ></vxe-column>
                        <vxe-table-column field="" title="操作">
                            <vxe-button type="text"
                                @click="()=>{
                                    topic.alreadyTopicList.splice(index, 1)
                                    $refs.bTable.loadData(topic.alreadyTopicList)
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
import { studyExamDatabaseDefLists, studyExamQuestionDeffLists }  from './api'


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
    const topicName = ref('')
  
    const orgId = ref('')
    const selectRow = ref({})
    const pattern = ref('')
    const topic = reactive({
        topicList:[],
        studyExamDatabaseDefList:[], //题库
        alreadyTopicList:[]
    })
    const sonFn = (e=[]) => {
      showModalRef.value = true
      topic.alreadyTopicList=e.map((d)=>
        {
            d.id = d.questionId 
            return d
        }
      )
      leftSpinShow.value = true

        studyExamDatabaseDefLists({}).then((res)=>{
            topic.studyExamDatabaseDefList = res
            leftSpinShow.value = false
        })
     
       
      if(props.showSide) return
    };

    const isAddedByPostId =(id)=>{
        return topic.alreadyTopicList.map(d => d.id).includes(id)
    }
    // 获取右侧题目
    const  getTopic = (id)=>{
        spinShow.value = true
        studyExamQuestionDeffLists({databaseId:id}).then((res)=>{
            topic.topicList = res.records.map((d)=>{
                d.questionId = d.id
                return d
            })
            spinShow.value = false
        }).finally(r => {
             
              spinShow.value = false
        })
    }
    // 单机选择
    const currentChangeEvent = (row ) =>{
       topic.alreadyTopicList[0] = {...row,}
    }
    const clearCurrentRowEvent  =()  =>{
      selectRow.value = null;
      xTable.value.clearRadioRow();
      xTable.value.clearCurrentRow();
    }
    const onPositiveClick =(row) =>{
        spinShow.value = true
        if(!props.multiple){
            context.emit('update:callback',{...topic.alreadyTopicList[0]})
           spinShow.value = false
        } else {
             topic.alreadyTopicList.map(d=>{
                delete d.id
                return d
            })
            context.emit('update:callback',topic.alreadyTopicList);
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
      topicName,
      orgId,
      letters:reactive([
        {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
        {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
        {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
        {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},

      ]),
      questionCodes:reactive([
        {label:'单选题',value:0},
        {label:'多选题',value:1},
        {label:'填空题',value:2},
        {label:'判断题',value:3},
        {label:'简答题',value:4},
      ]),
      grades:reactive([
        {label:'易',value:0},
        {label:'中',value:1},
        {label:'难',value:2},
       
      ]),
      xTable,
      getTopic,topic,
      model, // 表单数据
      showModal: showModalRef,
      pattern,
      selectRow,
      currentChangeEvent,
      clearCurrentRowEvent,
      topicList:reactive([]),
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
           this.getTopic(this.orgId)
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
