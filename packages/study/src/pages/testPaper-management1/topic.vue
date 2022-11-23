<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`题目维护`"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:1200px;"
  >
  <n-spin :show="isLoading">
       <n-card style="height:800px">
             <vxe-toolbar style="height:40px">
                <template v-slot:buttons>
                  <vxe-button @click="chooseTopic.sonFn($refs.xTable.getTableData().tableData)">添加题目</vxe-button>
                  <vxe-input v-model="filterName1" type="search" placeholder="全表搜索" @keyup="searchEvent" style="height: 37px;margin-left: 10px"></vxe-input>
                </template>
                <template #tools>
                  <h3 style="color:#2080f0">总分：{{getGrade()}}</h3>
                </template>
              </vxe-toolbar>
              <vxe-table
                  ref="xTable"
                  border
                  height="600px"
                  size='small'
                  :data="arr.studyExamQuestionDefList"
                 :keyboard-config="{isArrow: true}"
                 :edit-config="{ trigger: 'click', mode: 'cell', }"
                  highlight-current-row
              >
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
                    <vxe-table-column field="topicScore" title="单题分值" :edit-render="{}">
                        <template v-slot:edit="row">
                          <vxe-input   v-model="row.row.topicScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
                        </template>
                        <template v-slot="{ row }">{{row.topicScore}}</template>
                    </vxe-table-column>

                  <vxe-table-column field="" title="操作">
                    <template v-slot="{ row }">
                      <a style="color:red;cursor:pointer " @click="removeEvent(row)">删除</a>
                    </template>
                  </vxe-table-column>
              </vxe-table>
            <!-- <n-form style="height:50px;width:100%">
              <n-grid x-gap="8" :cols="4" >
                  <n-grid-item>
                        <n-form-item label="单选题分值" path="paperName">
                            <n-input-group>
                                <n-input-group-label>{{}}</n-input-group-label>
                                <n-input :style="{ width: '33%' }" v-model:value="model.paperName"/>
                            </n-input-group>
                        </n-form-item>
                    </n-grid-item>
              </n-grid>
            </n-form> -->
            <vxe-form :data="questionScore" >
              <vxe-form-gather span="24">
                  <vxe-form-item title="单选题分值" field="0" :item-render="{}" span="8">
                    <template #default="{ data }">
                      <vxe-input v-model="data['0']" size='small' placeholder="" type="number" class="my-domain" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==0).length == 0">
                          <template #prefix >
                          <span >{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==0).length}}题</span>
                        </template>
                      </vxe-input>
                    </template>
                  </vxe-form-item>
                
                  <vxe-form-item title="多选题分值" field="1" :item-render="{}" span="8">
                    <template #default="{ data }">
                      <vxe-input v-model="data['1']" size='small' placeholder="" type="number" class="my-domain" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==1).length == 0">
                        <template #prefix>
                          <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==1).length}}题</span>
                        </template>
                      </vxe-input>
                    </template>
                  </vxe-form-item>
                
                  <vxe-form-item title="填空题分值" field="2" :item-render="{}" span="8">
                    <template #default="{ data }">
                      <vxe-input v-model="data['2']" size='small' placeholder="" type="number" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==2).length == 0">
                        <template #prefix>
                          <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==2).length}}题</span>
                        </template>
                      </vxe-input>
                    </template>
                  </vxe-form-item>
                
                  <vxe-form-item title="判断题分值" field="3" :item-render="{}" span="8">
                    <template #default="{ data }">
                      <vxe-input v-model="data['3']" size='small' placeholder="" type="number" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==3).length == 0">
                        <template #prefix>
                          <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==3).length}}题</span>
                        </template>
                      </vxe-input>
                    </template>
                  </vxe-form-item>
                
                  <vxe-form-item title="简答题分值" field="4" :item-render="{}" span="8">
                    <template #default="{ data }">
                      <vxe-input v-model="data['4']" size='small' placeholder="" type="number" :disabled="$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==4).length == 0">
                        <template #prefix>
                          <span>{{$refs.xTable.getTableData().tableData.filter(d=>d.questionCode==4).length}}题</span>
                        </template>
                      </vxe-input>
                    </template>
                  </vxe-form-item>
              </vxe-form-gather>
            </vxe-form>
        </n-card>
    </n-spin>
    <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
            
        </div>
    </template>
  </n-modal>
    <ChooseTopic ref="chooseTopic"   @update:callback="(topicArr) => {
       arr.studyExamQuestionDefList = uniqueArr(arr.studyExamQuestionDefList,topicArr)
    }"></ChooseTopic>
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
    useMessage,
    NUpload,
    NImage,
    NRadioGroup,
    NSpace,
    NRadio,
    NCard
} from 'naive-ui'
import {detail,paperChooseQuestion } from './api'
import XEUtils from 'xe-utils'
import ChooseTopic from './chooseTopic.vue'
import { NwIcon } from '@platform/main'
import { VXETable,  } from 'vxe-table'

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
        NwIcon,
        NUpload,
        NImage,
        NRadio,
        NRadioGroup,
        NSpace,
        NCard,
        ChooseTopic
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
    const isLoading = ref(false)
    const formRef = ref(null)
    const chooseTopic = ref()
    const arr = reactive({
      studyExamQuestionDefList:[],
      studyExamQuestionDefData:[]
    })
    const filterName1 = ref('')
    const questionScore = ref({})
    const message = useMessage();
    const sourceName = ref('')
    const xTable = ref()
    const defaultSelecteRow = ref('')
    const sonFn = (e={}) => {
      showModalRef.value = true
      isLoading.value = true
      questionScore.value = {}
       detail(e.id).then((res)=>{
            modelRef.value = {...res}
            questionScore.value =res.questionScore ?  {...res.questionScore} : {}
            isLoading.value = false
            arr.studyExamQuestionDefList = res.studyExamQuestionDefList
            arr.studyExamQuestionDefData = res.studyExamQuestionDefList
        })

    };
    const searchEvent = () =>{
        const filterName = XEUtils.toValueString(filterName1.value).trim().toLowerCase()
        if (filterName) {
            const filterRE = new RegExp(filterName, 'gi')
            const searchProps = ['questionCode', 'question','databaseName']
            const rest = arr.studyExamQuestionDefData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
           arr.studyExamQuestionDefList = rest.map(row => {
                const item = Object.assign({}, row)
                searchProps.forEach(key => {
                item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `${match}`)
                })
                return item
            })
        } else {
             arr.studyExamQuestionDefList = arr.studyExamQuestionDefData
        }
            
    }
  
   // 新增
    const insertEvent = async (row) => {
      const $table = xTable.value
      const num =  modelRef.value.studyClassCouDefList.length
      const record = {}

      modelRef.value.studyClassCouDefList[num]={...record}
      const { row: newRow } = await $table.insertAt(record,-1)
    }
     // 删除
    const removeEvent = (row) => {
        const $table = xTable.value
        if($table.getTableData().tableData.length>1){
          $table.remove(row)
          if($table.getTableData().tableData.filter(d=>d.questionCode==0).length == 0){
            questionScore.value[0] = 0
          }
          if($table.getTableData().tableData.filter(d=>d.questionCode==1).length == 0){
            questionScore.value[1] = 0
          }
          if($table.getTableData().tableData.filter(d=>d.questionCode==2).length == 0){
            questionScore.value[2] = 0
          }
          if($table.getTableData().tableData.filter(d=>d.questionCode==4).length == 0){
            questionScore.value[4] = 0
          }
          if($table.getTableData().tableData.filter(d=>d.questionCode==3).length == 0){
            questionScore.value[3] = 0
          }
        } else {
            message.error('最少要有一个题目，不能再删了')
        }
    }
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
      const grade1 = parseInt((radioGrade.length - radioGrade.filter(d=>!!parseInt(d.topicScore)).length) * questionScore.value[0])  + sum(radioGrade.filter(d=>!!parseInt(d.topicScore)).map(d=>d.topicScore))
      const grade2 = parseInt((multipleGrade.length - multipleGrade.filter(d=>!!parseInt(d.topicScore)).length) * questionScore.value[1])  + sum(multipleGrade.filter(d=>!!parseInt(d.topicScore)).map(d=>d.topicScore))
      const grade3 = parseInt((gapGrade.length - gapGrade.filter(d=>!!parseInt(d.topicScore)).length) * questionScore.value[2])  + sum(gapGrade.filter(d=>!!parseInt(d.topicScore)).map(d=>d.topicScore))
      const grade4 = parseInt((judgeGrade.length - judgeGrade.filter(d=>!!parseInt(d.topicScore)).length) * questionScore.value[3])  + sum(judgeGrade.filter(d=>!!parseInt(d.topicScore)).map(d=>d.topicScore))
      const grade5 = parseInt((shortGrade.length - shortGrade.filter(d=>!!parseInt(d.topicScore)).length) * questionScore.value[4])  + sum(shortGrade.filter(d=>!!parseInt(d.topicScore)).map(d=>d.topicScore))
      totalPoints = (grade1 || 0) + (grade2 || 0)+ (grade3 || 0)  + (grade4 || 0) + (grade5 || 0)
      return totalPoints 

    }
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      getGrade,
      chooseTopic,
      xTable,
      sourceName,
      arr,
      filterName1,
      searchEvent,
      insertEvent,
      defaultSelecteRow,
      removeEvent,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      questionScore,
      isLoading,
      message,
      formRef,
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
    
      onPositiveClick (){
          isLoading.value = true
          paperChooseQuestion({...modelRef.value,questionScore:questionScore.value,  studyExamQuestionDefList:xTable.value.getTableData().tableData}).then((res)=>{
            
              context.emit('update:callback');
              showModalRef.value = false
            

          }).finally(r => {
            
            isLoading.value = false
          })
        
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
 created() {
    

  },
  methods: {
    // 数组合并去重方法
    uniqueArr(arr1,arr2){
        arr1.push(...arr2)
        let arr3 = Array.from(new Set(arr1))
        return arr3
    },
  }
})
</script>