<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.page && $refs.page.$el"
    >
   
    <n-drawer-content
      :title="`${examContent.paperName}`"
      closable
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
    <n-layout class="nw-layout-full">
      
          <n-layout-header   style="height:50px;line-height:50px">
             <n-grid x-gap="12"  :cols="3">
                 <n-gi style="text-align:center;color:red;font-weight:bolder;font-size:17px">学员名称:<span style="color:red;padding-left:5px">{{userName}}</span></n-gi>

                 <n-gi style="text-align:center;color:red;font-weight:bolder;font-size:17px">得分:<span style="color:red;padding-left:5px">{{score}}</span></n-gi>
                 <n-gi style="text-align:center;">
                  <n-popconfirm
                    @positive-click="save"
                    positive-text="确定"
                    negative-text="取消"
                  >
                    <template #trigger>
                      <n-button type="primary" size="small"
                        >提交</n-button
                      >
                    </template>
                    {{ `确定提交当前考试试卷?` }}
                  </n-popconfirm>
                 </n-gi>
             </n-grid>
          </n-layout-header>
          <n-layout position="absolute"  has-sider style="top: 50px; " ref="page">
              <n-layout-sider
                  bordered
                  content-style="padding: 24px;"
                  :native-scrollbar="false"
                  class="treeH"
                  style="width:350px;"
              >
                 <n-scrollbar  style="height:100%;width:350px;">
                    <n-card title="单选题" size="small"  v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length"> 
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px">{{examContent.questionScore[0]}}</span> 分 </template>
                       <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id && (d.userGetQuestionScore >0)) &&d.userAnswers.length) ? 'background-color:#409eff;color:white':'background-color:red;color:white')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid>
                    </n-card>
                    <n-card title="多选题" size="small"   v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length"> 
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px"> {{examContent.questionScore[1]}} </span> 分 </template>

                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ))">
                          <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id && (d.userGetQuestionScore >0)) &&d.userAnswers.length) ? 'background-color:#409eff;color:white':'background-color:red;color:white')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid> 
                    </n-card>
                    <n-card title="填空题" size="small"  v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ).length">
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px">{{examContent.questionScore[2]}}</span> 分 </template>

                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id && (d.userGetQuestionScore >0)) &&d.userAnswers.length) ? 'background-color:#409eff;color:white':'background-color:red;color:white')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid>
                    </n-card>
                    <n-card title="判断题" size="small"   v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ).length"> 
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px">{{examContent.questionScore[3]}}</span> 分 </template>

                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id && (d.userGetQuestionScore >0)) &&d.userAnswers.length) ? 'background-color:#409eff;color:white':'background-color:red;color:white')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid>
                    </n-card>
                    <n-card title="简答题" size="small"   v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ).length">
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px"> {{examContent.questionScore[4]}} </span> 分 </template>
                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id && (d.userGetQuestionScore >0) && d.isAnswer==1) ) ? 'background-color:#409eff;color:white':'background-color:red;color:white')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid>
                    </n-card>
                 </n-scrollbar  >
              </n-layout-sider>
              <n-layout-content content-style="padding: 0px 10px;" :native-scrollbar="false" ref="content"> 
               <n-space vertical justify="top">
                  <n-spin :show="spinShow" :description="description"> 
                  <div>
                    <p style="height:30px;line-height:30px" 
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length"><span style="font-size:24px;font-weight:bolder">单选题</span><span >(共 {{examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length}} 题，合计 {{examContent.questionScore[0] * examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length}} 分)</span></p>
                    <n-card style="margin-bottom:8px" :segmented="{ content: 'hard'}" size="small"    
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length" 
                      v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ))"
                      :ref="e=>item.ref=e"
                    >
                      <template #header>
                         <n-grid   :cols="2">
                            <n-gi style="text-align:left">
                               <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                            </n-gi>
                            <n-gi style="text-align:right">
                               <span >得分</span><span style="padding-left:5px">{{ item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userGetQuestionScore):0}}</span>
                            </n-gi>
                          </n-grid>
                      </template>
                        <n-radio-group   name="radiogroup"  :value="item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userAnswers[0].userAnswer):''">
                           <n-grid  :y-gap="5" :cols="1">
                              <n-gi v-for="(i,index) in item.answers">
                                <n-radio  :value="i.answer"   >
                                  {{letters.filter(d=>d.value == i.sort)[0].label }}: {{ i.answer }}
                                </n-radio>
                              </n-gi>
                            </n-grid>
                        </n-radio-group>
                         <n-grid  :y-gap="5" :cols="1"
                           style="padding:10px 0"
                         > 
                            <n-gi   :cols="1">
                              答案：{{letters.filter(d=>d.value == item.answers.filter(d=>d.isTrue==1)[0].sort)[0].label  }}
                            </n-gi>
                            <n-gi   :cols="1">
                              解析：{{item.parse}}
                            </n-gi>
                         </n-grid>
                    </n-card>
                  </div>
                  <div>
                    <p style="height:30px;line-height:30px" v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length"><span style="font-size:24px;font-weight:bolder">多选题</span><span >(共 {{examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length}} 题，合计 {{examContent.questionScore[1] * examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length}} 分)</span></p>
                    <n-card style="margin-bottom:8px" :segmented="{ content: 'hard'}" size="small"    
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length" 
                      v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ))"
                      :ref="e=>item.ref=e"
                    >
                      <template #header>
                        <n-grid   :cols="2">
                            <n-gi style="text-align:left">
                               <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                            </n-gi>
                            <n-gi style="text-align:right">
                               <span >得分</span><span style="padding-left:5px">{{ item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userGetQuestionScore):0}}</span>
                            </n-gi>
                          </n-grid>
                        
                      </template>
                      <n-checkbox-group  name="checkgroup"  :value="item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userAnswers.map(d=>d.userAnswer)):''">
                          <n-grid  :y-gap="5" :cols="1">
                            <n-gi v-for="i in item.answers">
                              <n-checkbox  :value="i.answer">
                                {{letters.filter(d=>d.value == i.sort)[0].label }}: {{ i.answer }}
                              </n-checkbox>
                            </n-gi>
                          </n-grid>
                      </n-checkbox-group>
                      <n-grid  :y-gap="5" :cols="1"
                           style="padding:10px 0"
                      >
                        <n-gi   :cols="1">
                          答案：{{ 
                              multipleChoiceTrues(item.answers)
                             
                         }}
                        </n-gi>
                        <n-gi   :cols="1">
                          解析：{{item.parse}}
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </div>
                  <div>
                    <p style="height:30px;line-height:30px" v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ).length"><span style="font-size:24px;font-weight:bolder">填空题</span><span >(共 {{examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ).length}} 题，合计 {{examContent.questionScore[2] * examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ).length}} 分)</span></p>
                    <n-card style="margin-bottom:8px" :segmented="{ content: 'hard'}" size="small"    
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode ==2 ).length" 
                      v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ))"
                      :ref="e=>item.ref=e"
                    >
                      <template #header>
                         <n-grid   :cols="2">
                            <n-gi style="text-align:left">
                               <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                            </n-gi>
                            <n-gi style="text-align:right">
                               <span >得分</span><span style="padding-left:5px">{{ item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userGetQuestionScore):0}}</span>
                            </n-gi>
                          </n-grid>
                        <!-- <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span> -->
                      </template>
                      <n-grid  :y-gap="4" :cols="1">
                        <n-gi v-for="(i,index) in (item.question.split('________').length-1)">
                          <n-input-group :style="{ width: '100%' }"  >
                            <n-input-group-label >第 {{index +1}} 空 </n-input-group-label><span style="dispaly:inline-block;width:10px"></span>
                            <n-input  style="width: 50%;" size="small"  :value="item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userAnswers.filter(d=>d.sort == index)[0].userAnswer) : ''"/>
                          </n-input-group>
                       </n-gi>
                      </n-grid>
                      <n-grid  :y-gap="5" :cols="1"
                           style="padding:10px 0"
                      >
                        <n-gi   :cols="1">
                          答案：<span v-for="(i,index) in item.answers.map((d,i)=>{return (i+1)+':' + d.answer})" :style="{paddingLeft:'10px'}">{{i}}</span>
                        </n-gi>
                        <n-gi   :cols="1">
                          解析：{{item.parse}}
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </div>
                  <div>
                    <p style="height:30px;line-height:30px" v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ).length"><span style="font-size:24px;font-weight:bolder">判断题</span><span >(共 {{examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ).length}} 题，合计 {{examContent.questionScore[3] * examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ).length}} 分)</span></p>
                    <n-card style="margin-bottom:8px" :segmented="{ content: 'hard'}" size="small"    
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ).length" 
                      v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 3 ))"
                      :ref="e=>item.ref=e"
                    >
                      <template #header>
                          <n-grid   :cols="2">
                            <n-gi style="text-align:left">
                               <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                            </n-gi>
                            <n-gi style="text-align:right">
                               <span >得分</span><span style="padding-left:5px">{{ item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userGetQuestionScore):0}}</span>
                            </n-gi>
                          </n-grid>                     
                      </template>
                      <n-radio-group :value="item.studyPlanQuestionUser.isAnswer ==1 ? (item.studyPlanQuestionUser.userAnswers[0].userAnswer):''" name="radiogroup" >
                        <n-grid  :y-gap="18" :cols="1">
                          <n-gi >
                            <n-radio value="对">对</n-radio>
                          </n-gi>
                            <n-gi >
                            <n-radio value="错">错</n-radio>
                          </n-gi>
                        </n-grid>
                      </n-radio-group>
                      <n-grid  :y-gap="5" :cols="1"
                           style="padding:10px 0"
                      >
                        <n-gi   :cols="1">
                          答案：{{item.answers.filter(d=>d.isTrue==1)[0].answer  }}
                        </n-gi>
                        <n-gi   :cols="1">
                          解析：{{item.parse}}
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </div>
                  <div>
                    <p style="height:30px;line-height:30px" v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ).length"><span style="font-size:24px;font-weight:bolder">简答题</span><span >(共 {{examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ).length}} 题，合计 {{examContent.questionScore[4] * examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ).length}} 分)</span></p>
                    <n-card style="margin-bottom:8px" :segmented="{ content: 'hard'}" size="small"    
                      v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ).length" 
                      v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 4 ))"
                      :ref="e=>item.ref=e"
                    >
                      <template #header>
                        <n-grid   :cols="2">
                          <n-gi style="text-align:left">
                              <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                          </n-gi>
                          <n-gi style="position: absolute;right: 20px;">
                              <!-- <span >得分</span><span style="padding-left:5px">  -->
                               <n-form label-placement="left" v-if="item.studyPlanQuestionUser.isAnswer ==1 ">
                                   <n-form-item label="得分" >
                                      <vxe-input
                                        type='number'
                                        :min="0"
                                        :max="item.studyPlanQuestionUser.questionScore" 
                                        
                                        v-model="item.studyPlanQuestionUser.userGetQuestionScore" 
                                        @change="(v)=>{item.studyPlanQuestionUser.userGetQuestionScore=v.value*1; getScore(v.value)}"
                                        clearable  
                                        size='small'
                                      />
                                    </n-form-item>
                               
                                </n-form>
                                <span v-else>0</span>
                          </n-gi>
                        </n-grid>    
                      </template>
                      <n-grid   :cols="1">
                        <n-gi :span='24'>
                          <n-input
                            :value='item.answers.filter(d=>d.isTrue==1)[0].answer'
                            type="textarea"
                            placeholder=""
                          />
                        </n-gi>
                      </n-grid>
                      <n-grid  :y-gap="5" :cols="1"
                           style="padding:10px 0"
                      >
                        <n-gi   :cols="1">
                          答案：{{item.answers.filter(d=>d.isTrue==1)[0].answer  }}
                        </n-gi>
                        <n-gi   :cols="1">
                          解析：{{item.parse}}
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </div>
                  </n-spin>
                </n-space>
              </n-layout-content>
        </n-layout>
      </n-layout>
    </n-drawer-content>
     
  </n-drawer>
</template>

<script>
  
  import { defineComponent, ref, reactive,onMounted,  } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NGi,
    NTreeSelect,
    NSelect,
    NCard,
    NSpace,
    useMessage,
    NScrollbar,
    NRadioGroup,
    NRadio,
    NCheckboxGroup,
    NCheckbox,
    NCountdown,
    NSpin,
    NPopconfirm,
    NInputNumber
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { studyGetMarking, studyMarking } from './api'
  import * as d3 from 'd3'

  export default defineComponent({
    components: {
      NDrawer,
      NDrawerContent,
      NwTable,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      NInput,
      NwTableFun,
      NForm,
      NFormItem,
      NGrid,
      NGridItem,
      NTreeSelect,
      NSelect,
      NCard,
      NSpace,
      NScrollbar,
      NRadioGroup,
      NRadio,
      NCheckboxGroup,
      NCheckbox,
      NGi,
      NCountdown,
      NSpin,
      NPopconfirm,
      NInputNumber
    },
     props: {
      
     },
    setup (props,context) {
      const formVisible = ref(false)
      const modelRef  = reactive({})
      const xTable = ref()
      const message = useMessage();
      const letters=ref([
          {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
          {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
          {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
          {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},

        ])
      const spinShow = ref(false);
      const examContent = ref({studyExamQuestionDefList:[],})
      const studyPlanQuestionList= ref({})
      const studyPlanQuestionUserDto= ref([])
      const questionScore = ref()
      const description = ref('')
      const duration = ref(0)
      const userName = ref('')
      const score = ref(0)
      const sonFn = (e) => {
        modelRef.value = e
        formVisible.value = true
        spinShow.value = true
        description.value = '试卷加载中...'
        studyGetMarking(e).then((res)=>{
           studyPlanQuestionList.value.lessonId = e.lessonId
           studyPlanQuestionList.value.planId = e.planId
           studyPlanQuestionList.value.paperId = res.id
           studyPlanQuestionList.value.userAnswers = []
           duration.value = res.specialExamTime * 60000
           examContent.value = res
           studyPlanQuestionUserDto.value = res.studyExamQuestionDefList.map(d=>d.studyPlanQuestionUser)
           userName.value = res.studyExamQuestionDefList[0].studyPlanQuestionUser.userName
           getScore()
        }).finally(r => {
          
          spinShow.value = false
        })
        
      }
    
      const save = () =>{
         description.value = '试卷上传中，请勿操作...'
         spinShow.value=true
         studyMarking(examContent.value).then((res)=>{
            spinShow.value=false
         }).finally(r => {
          
          spinShow.value = false
        })
      }
      const getScore = (v) =>{
       const arr =  examContent.value.studyExamQuestionDefList.map(d=>d.studyPlanQuestionUser)
        score.value = d3.sum(arr.map(d=>d.userGetQuestionScore))
      }
      const multipleChoiceTrues =(arr1)=>{
        const letter = letters.value
        const arr2 = arr1.filter(d=>d.isTrue == 1).map(d=>d.sort)       
        let result = [];
        let isExist= false;
        for(var i = 0; i < letter.length; i++){
            var obj = letter[i];
            var num = obj.value;
            isExist = false;
            for(var j = 0; j < arr2.length; j++){
                var aj = arr2[j];
                if( aj === num){
                    isExist = true;
                    break;
                }
            }
            isExist&&result.push(obj);
        }   
        return result.map(d=>d.label).join(',')
      }
      onMounted(async () => {})
      return {
        score,
        getScore,
        multipleChoiceTrues,
        userName,
        letters,
        spinShow,
        description,
        examContent,
        xTable,
        duration,
        sonFn,
        modelRef, //题库数据
        showModal: formVisible,
        studyPlanQuestionUserDto,
        studyPlanQuestionList,
        save,
       
      }
    },
    methods: {
      menuSelect( item) {
       this.$nextTick(()=>{
        let top = item.$el.offsetTop;
        this.$refs.content.scrollTo({ top, behavior: "smooth" });
       })
       
      }
    }
  })
</script>

<style lang='less' scoped>
  .treeH{
    height: calc(~"100% - 0px");
  }
  .n-drawer-container{
      z-index:1001 !important;
  }
  .topicTitle {
    display: inline-block;
    height: 30px;
    width: 30px;
    background-color: #409eff;
    text-align: center;
    line-height: 30px;
    color: white;
    border-radius: 8px;
  }
  .notFilled{
    background:red
  }
  .filled{
   background:yellow
  }
  /deep/ .n-spin-container .n-spin-body {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  
  .answerSheet{
    width:30px; height:30px; border:1px solid #e9e9eb;text-align: center;border-radius: 100%;margin: 0 auto;line-height:30px;cursor:pointer
  }
</style>