<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="80"
    size="small"
    :style="{
      padding:'10px'
    }"
  >
    <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="试卷标签" path="typeName">
              <nw-dic
                :request="{XHR:dictItemLists, params: 'STUDY_PAPER_TYPE',}"
                v-model:value="dataModel.typeCode"
                v-model:label="dataModel.typeName"
                placeholder
                multiple
                size="small"
                :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
              />
          </n-form-item>
      </n-grid-item>
      
      <n-grid-item>
          <n-form-item label="试卷名称" path="paperName">
              <n-input size="small" placeholder="请输入" v-model:value="dataModel.paperName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item path="paperType" label="试卷类型">
              <n-select
                  :disabled="dataModel.id"
                  multiple 
                  v-model:value="dataModel.paperType"
                  placeholder="请选择试卷类型"
                  :options="paperTypes"
                  size="small" 
            />
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
          <n-form-item path="paperCode" label="出题类型">
              <n-select
                :disabled="dataModel.id"
                  v-model:value="dataModel.paperCode"
                  placeholder="请选择出题类型"
                  :options="paperCodes"
                  size="small" 
            />
          </n-form-item>
      </n-grid-item>
      <n-grid-item >
          <n-form-item label="试卷时长" path="specialExamTime">
              <n-input  size="small" placeholder="请输入" v-model:value="dataModel.specialExamTime" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="合格分数" path="specialExamQualifiedScore">
              <n-input size="small" placeholder="请输入" v-model:value="dataModel.specialExamQualifiedScore" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item :span="24"  v-if="dataModel.paperCode == '0'">
        <n-card :bordered="false" title="题目列表" size="small">
          <template #header-extra>
              <n-button size="small" type="info" @click="chooseTopic.sonFn($refs.xTable.getTableData().tableData)">
                添加 
              </n-button> 
              <!-- <span style="padding-left:10px">总分：{{getGrade}}</span> -->
          </template>
          <vxe-table
            ref="xTable"
            border
            size='small'
            :keyboard-config="{isArrow: true}"
            :row-config="{useKey: true}"
            :scroll-y="{enabled: false}"
            :edit-config="{ trigger: 'click', mode: 'cell', }"
            :data="dataModel.studyExamPaperApplyQuestionList ? dataModel.studyExamPaperApplyQuestionList : []"
            highlight-current-row
          >
            <vxe-column width="60">
              <template #default>
                <span class="drag-btn">
                  <i class="vxe-icon--menu"></i>
                </span>
              </template>
              <template #header>
                <vxe-tooltip v-model="showHelpTip" content="按住后可以上下拖动排序！" enterable>
                  <i class="vxe-icon--question" @click="showHelpTip = showHelpTip"></i>
                </vxe-tooltip>
              </template>
            </vxe-column>
            <vxe-column type="expand" field="questionCode" title="类型" >
              <template #default="{ row,  }">
                <span style="font-size:20px">[{{ (row.questionCode || row.questionCode ==0)?questionCodes.filter(d=>d.value==row.questionCode)[0].label :'' }}]</span><span style="font-size:12px">[难度系数:{{ (row.grade || row.grade ==0) ?grades.filter(d=>d.value==row.grade)[0].label :''  }}]</span>
              </template>
              <template #content="{ row,  }">
              
                <div  class="expand-wrapper" >
                  
                  <ul v-if="row.answers && (row.questionCode ==0 || row.questionCode ==1)" style="list-style: none;">
                    <li v-for="item in row.answers">
                      <span :style="{'color':item.isTrue? '#4098fc' : 'gray'}">{{letters.filter(d=>d.value == item.sort)[0].label }}:  {{item.answer}}</span> 
                    </li>
                    
                  </ul>
                  <p v-if=" row.answers &&row.questionCode ==2">{{row.answers.map(d=>d.answer).join('、')}}</p>
                  <p v-if=" row.answers &&row.questionCode ==3">{{row.answers[0].isTrue==1?'正确':'错误'}}</p>
                  <p v-if=" row.answers &&row.questionCode ==4">{{row.answers[0].answer}}</p>

                  <p>
                    <span>解析：</span>
                    <span>{{ row.parse }}</span>
                  </p>
                </div>
              </template>
            </vxe-column>
            <vxe-column field="question" title="题干" ></vxe-column>
            <vxe-column field="databaseName" title="所属题库" ></vxe-column>
            <vxe-table-column field="questionScore" title="单题分值" :edit-render="{}">
                <template v-slot:edit="row">
                  <vxe-input   v-model="row.row.questionScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
                </template>
                <template v-slot="{ row }">{{row.questionScore}}</template>
            </vxe-table-column>
            <vxe-table-column field="" title="操作">
                <template v-slot="{ row }">
                    <a style="color:red;cursor:pointer;margin-left:10px" @click="removeEvent1(row)">删除</a>
                </template>
            </vxe-table-column>
        </vxe-table>
        <vxe-form :data="dataModel"  style="margin-top:5px">
          <vxe-form-gather span="24">
              <vxe-form-item title="单选题分值" field="singleScore" :item-render="{}" span="8">
                <template #default="{ data }">
                  <vxe-input v-model="data['singleScore']" size='small' placeholder="" type="number" :min='1' class="my-domain" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==0).length == 0">
                      <template #prefix >
                      <span >{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==0).length}}题</span>
                    </template>
                  </vxe-input>
                </template>
              </vxe-form-item>
            
              <vxe-form-item title="多选题分值" field="multipleScore" :item-render="{}" span="8">
                <template #default="{ data }">
                  <vxe-input v-model="data['multipleScore']" size='small' placeholder="" type="number" :min='1' class="my-domain" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==1).length == 0">
                    <template #prefix>
                      <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==1).length}}题</span>
                    </template>
                  </vxe-input>
                </template>
              </vxe-form-item>
            
              <vxe-form-item title="填空题分值" field="completionScore" :item-render="{}" span="8">
                <template #default="{ data }">
                  <vxe-input v-model="data['completionScore']" size='small' placeholder="" type="number" :min='1' :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==2).length == 0">
                    <template #prefix>
                      <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==2).length}}题</span>
                    </template>
                  </vxe-input>
                </template>
              </vxe-form-item>
            
              <vxe-form-item title="判断题分值" field="judgmentScore" :item-render="{}" span="8">
                <template #default="{ data }">
                  <vxe-input v-model="data['judgmentScore']" size='small' placeholder="" type="number" :min='1' :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==3).length == 0">
                    <template #prefix>
                      <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==3).length}}题</span>
                    </template>
                  </vxe-input>
                </template>
              </vxe-form-item>
            
              <vxe-form-item title="简答题分值" field="shortAnswerScore" :item-render="{}" span="8">
                <template #default="{ data }">
                  <vxe-input v-model="data['shortAnswerScore']" size='small' placeholder="" type="number" :min='1' :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==4).length == 0">
                    <template #prefix>
                      <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==4).length}}题</span>
                    </template>
                  </vxe-input>
                </template>
              </vxe-form-item>
          </vxe-form-gather>
        </vxe-form>
      </n-card>
    </n-grid-item>

      <n-grid-item :span="24" v-if="dataModel.paperCode == '1'">
          <n-card :bordered="false" title="题库列表" size="small">
            <template #header-extra>
                <n-button size="small" type="info" @click="chooseQuestionBank.sonFn($refs.xTable.getTableData().tableData)">
                  添加 
                </n-button> 
            </template>
            <vxe-table
                ref="xTable"
                border
                size='small'
                :keyboard-config="{isArrow: true}"
                :row-config="{useKey: true}"
               :scroll-y="{enabled: false}"
                :data="dataModel.studyExamPaperApplyDatabaseList ? dataModel.studyExamPaperApplyDatabaseList : []"
                highlight-current-row
            >
           
              <vxe-column field="databaseName" title="题库名称" ></vxe-column>
              <!-- <vxe-column field="typeName" title="标签名称" ></vxe-column>
              <vxe-column field="typeCode" title="标签code" ></vxe-column> -->
              
              <vxe-table-column field="" title="操作">
                  <template v-slot="{ row }">
                      <a style="color:red;cursor:pointer;margin-left:10px" @click="removeEvent(row)">删除</a>
                  </template>
              </vxe-table-column>
          </vxe-table>
          <vxe-form :data="dataModel" style="margin-top:5px">
            <vxe-form-gather span="24">
                <vxe-form-item title="单选题数量" field="singleNumber" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['singleNumber']" size='small' placeholder="" type="number" class="my-domain"></vxe-input>
                  </template>
                </vxe-form-item>
      
                <vxe-form-item title="多选题数量" field="multipleNumber" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['multipleNumber']" size='small' placeholder="" type="number" class="my-domain"></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="填空题数量" field="completionNumber" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['completionNumber']" size='small' placeholder="" type="number"></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="判断题数量" field="judgmentNumber" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['judgmentNumber']" size='small' placeholder="" type="number"></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="简答题数量" field="shortAnswerNumber" :item-render="{}" span="4">
                  <template #default="{ data }">
                    <vxe-input v-model="data['shortAnswerNumber']" size='small' placeholder="" type="number"></vxe-input>
                  </template>
                </vxe-form-item>
            </vxe-form-gather>
          </vxe-form>

          <vxe-form :data="dataModel" >
            <vxe-form-gather span="24">
                <vxe-form-item title="单选题分值" field="singleScore" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['singleScore']" size='small' placeholder="" type="number" :min='1' class="my-domain"></vxe-input>
                  </template>
                </vxe-form-item>
      
                <vxe-form-item title="多选题分值" field="multipleScore" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['multipleScore']" size='small' placeholder="" type="number" :min='1' class="my-domain"></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="填空题分值" field="completionScore" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['completionScore']" size='small' placeholder="" type="number" :min='1'></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="判断题分值" field="judgmentScore" :item-render="{}" span="5">
                  <template #default="{ data }">
                    <vxe-input v-model="data['judgmentScore']" size='small' placeholder="" type="number" :min='1'></vxe-input>
                  </template>
                </vxe-form-item>
              
                <vxe-form-item title="简答题分值" field="shortAnswerScore" :item-render="{}" span="4">
                  <template #default="{ data }">
                    <vxe-input v-model="data['shortAnswerScore']" size='small' placeholder="" type="number" :min='1'></vxe-input>
                  </template>
                </vxe-form-item>
            </vxe-form-gather>
          </vxe-form>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-form>
   <ChooseTopic
    ref="chooseTopic"
    @update:callback="(arr) => {
      dataModel.studyExamPaperApplyQuestionList = []
      dataModel.studyExamPaperApplyQuestionList = arr
       rowDrop()
    }"
  ></ChooseTopic>
  <ChooseQuestionBank
    ref="chooseQuestionBank"
    @update:callback="(arr) => {
      dataModel.studyExamPaperApplyDatabaseList = []
      dataModel.studyExamPaperApplyDatabaseList = arr
    }"
  ></ChooseQuestionBank>
</template>
<script>
import { defineComponent, ref, onMounted, reactive, nextTick, onUnmounted  } from "vue";
import {
  useMessage,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NGridItem,
  NUpload,
  NImage,
  NButton,
  NCard,
  NTreeSelect
} from "naive-ui";
 import { VXETable, } from 'vxe-table'
import XEUtils from 'xe-utils'
import Sortable from 'sortablejs'
import { NwIcon, NwDic,  } from '@platform/main'

import { FormModal } from './store'
import ChooseTopic from '../study-paper-add-form/chooseTopic.vue'
import {  dictItemLists }  from './api'
import ChooseQuestionBank from './chooseQuestionBank.vue'
export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NwDic,
    NGridItem,
    NUpload,
    NImage,
    NButton,
    NCard,
    NTreeSelect,
    ChooseTopic,
    ChooseQuestionBank
  },
  setup() {
   const {
      formRef,
      dataModel,
      rules,
      brules,
      token,
      tokenType,
      setValue,
      getValue,
      validate,
      setRules
    } = new FormModal()
   
    const message = useMessage();
    const xTable = ref()
    const chooseTopic = ref()
    const chooseQuestionBank = ref()
    const sum =(arr) =>{
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i]);
      }
      return sum;
    }
       // 总分值
    const getGrade = () =>{
      const $table = xTable.value ? xTable.value.getTableData().tableData : []
      const radioGrade = $table.filter(d=>d.questionCode==0)
      const multipleGrade = $table.filter(d=>d.questionCode==1)
      const gapGrade = $table.filter(d=>d.questionCode==2)
      const judgeGrade = $table.filter(d=>d.questionCode==3)
      const shortGrade = $table.filter(d=>d.questionCode==4)
      let totalPoints = 0
      const grade1 = parseInt((radioGrade.length - radioGrade.filter(d=>!!parseInt(d.questionScore)).length) * questionScore.value[0])  + sum(radioGrade.filter(d=>!!parseInt(d.questionScore)).map(d=>d.questionScore))
      const grade2 = parseInt((multipleGrade.length - multipleGrade.filter(d=>!!parseInt(d.questionScore)).length) * questionScore.value[1])  + sum(multipleGrade.filter(d=>!!parseInt(d.questionScore)).map(d=>d.questionScore))
      const grade3 = parseInt((gapGrade.length - gapGrade.filter(d=>!!parseInt(d.questionScore)).length) * questionScore.value[2])  + sum(gapGrade.filter(d=>!!parseInt(d.questionScore)).map(d=>d.questionScore))
      const grade4 = parseInt((judgeGrade.length - judgeGrade.filter(d=>!!parseInt(d.questionScore)).length) * questionScore.value[3])  + sum(judgeGrade.filter(d=>!!parseInt(d.questionScore)).map(d=>d.questionScore))
      const grade5 = parseInt((shortGrade.length - shortGrade.filter(d=>!!parseInt(d.questionScore)).length) * questionScore.value[4])  + sum(shortGrade.filter(d=>!!parseInt(d.questionScore)).map(d=>d.questionScore))
      totalPoints = (grade1 || 0) + (grade2 || 0)+ (grade3 || 0)  + (grade4 || 0) + (grade5 || 0)
      return totalPoints 

    }

     // 删除
    const removeEvent = (row) => {
        const $table = xTable.value
        VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.studyExamPaperApplyDatabaseList = $table.getTableData().tableData
              
            }
        })  
    }
    const removeEvent1 = (row) => {
        const $table = xTable.value
        VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
               $table.remove(row)
              dataModel.value.studyExamPaperApplyQuestionList = $table.getTableData().tableData
             
            }
        })  
    }
    const showHelpTip = ref(false)
       let sortable1;

      const rowDrop = () => {
        const $table = xTable.value
        sortable1 = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({newIndex,oldIndex}) => {
            // const newIndex = sortableEvent.newIndex as number
            // const oldIndex = sortableEvent.oldIndex as number
            const currRow = dataModel.value.studyExamPaperApplyQuestionList.splice(oldIndex, 1)[0]
            dataModel.value.studyExamPaperApplyQuestionList.splice(newIndex, 0, currRow)
          }
        })
      }

      let initTime;
      nextTick(() => {
        // 加载完成之后在绑定拖动事件
        initTime = setTimeout(() => {
          rowDrop()
        }, 500)
      })

      onUnmounted(() => {
        clearTimeout(initTime)
        if (sortable1) {
          sortable1.destroy()
        }
      })

    onMounted(() => {
     
    })
    return {
      dataModel,
      showHelpTip,
      formRef,
      chooseTopic,
      dictItemLists,
      rowDrop,
      xTable,
      removeEvent,
      removeEvent1,
      chooseQuestionBank,
      questionNumber,
      sum,
      message,
      paperTypes:reactive([
        { label: '练习题', value: '0'},
        { label: '考试题', value: '1'}
      ]),
      paperCodes:reactive([
        { label: '固定试卷', value: 0},
        { label: '随机试卷', value: 1}
      ]),
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
      rules: {
      },
    };

  },
  methods:{
   
    beforeUpload() {
     
      this.isLoading = true;
    },
  }
});
</script>
<style></style>
