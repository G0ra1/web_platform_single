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
                 <n-gi style="text-align:center;color:red;font-weight:bolder;font-size:17px">考试时长:<n-countdown  :duration="duration" :active="showModal" /></n-gi>
                 <n-gi style="text-align:center;color:red;font-weight:bolder;font-size:17px">总分:<span style="color:red">{{examContent.paperTotalScore}}</span></n-gi>
                 <n-gi style="text-align:center;">
                  <n-popconfirm
                    @positive-click="save"
                    positive-text="确定"
                    negative-text="取消"
                  >
                    <template #trigger>
                      <n-button type="primary" size="small"
                        >交卷</n-button
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
                    <n-card title="单选题" size="small"   v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ).length"> 
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px">{{examContent.questionScore[0]}}</span> 分 </template>
                       <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 0 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id)&&d.userAnswers.length) ? 'background-color:#409eff;color:white':'')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid>
                    </n-card>
                    <n-card title="多选题" size="small"  v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ).length"> 
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px"> {{examContent.questionScore[1]}} </span> 分 </template>

                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 1 ))">
                          <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id)&&d.userAnswers.length) ? 'background-color:#409eff;color:white':'')"
                           >{{index+1}}</div>
                        </n-gi>
                      </n-grid> 
                    </n-card>
                    <n-card title="填空题" size="small"   v-if="examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ).length">
                      <template #header-extra> 每题 <span style="color:red;padding:0 5px">{{examContent.questionScore[2]}}</span> 分 </template>

                      <n-grid x-gap="12" :y-gap="8" :cols="6">
                        <n-gi v-for="(item,index) in (examContent.studyExamQuestionDefList.filter(d=>d.questionCode == 2 ))">
                           <div class="answerSheet"
                            @click="menuSelect(item.ref)"
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id)&&d.userAnswers.length) ? 'background-color:#409eff;color:white':'')"
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
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id)&&d.userAnswers.length) ? 'background-color:#409eff;color:white':'')"
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
                            :style="(studyPlanQuestionUserDto.some(d=>(d.questionId == item.id)&&d.userAnswers.length) ? 'background-color:#409eff;color:white':'')"
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
                        <span  class="topicTitle">{{index+1 }}</span><span style="padding-left:5px">{{item.question}}</span>
                      </template>
                        <n-radio-group  name="radiogroup" @update:value="(value)=>radiogroupChange(value,item.id,index)">
                           <n-grid  :y-gap="5" :cols="1">
                              <n-gi v-for="(i,index) in item.answers">
                                <n-radio  :value="i.answer"   >
                                  {{ i.answer }}
                                </n-radio>
                              </n-gi>
                            </n-grid>
                        </n-radio-group>
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
                        <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                      </template>
                      <n-checkbox-group  name="checkgroup"  @update:value="(value)=>checkgroupChange(value,item.id)">
                        <n-grid  :y-gap="5" :cols="1">
                          <n-gi v-for="i in item.answers">
                            <n-checkbox  :value="i.answer">
                              {{ i.answer }}
                            </n-checkbox>
                          </n-gi>
                          </n-grid>
                      </n-checkbox-group>
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
                        <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                      </template>
                      <n-grid  :y-gap="4" :cols="1">
                        <n-gi v-for="(i,index) in (item.question.split('________').length-1)">
                          <n-input-group :style="{ width: '100%' }"  >
                            <n-input-group-label >第 {{index +1}} 空 </n-input-group-label><span style="dispaly:inline-block;width:10px"></span>
                            <n-input  style="width: 50%;" size="small"  @update:value="(value)=>inputgroupChange(value,item.id,index,item)"/>
                          </n-input-group>
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
                        <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                      </template>
                      <n-radio-group v-model:value="value" name="radiogroup" @update:value="(value)=>radioCheckgroupChange(value,item.id)">
                        <n-grid  :y-gap="18" :cols="1">
                          <n-gi >
                            <n-radio value="对">对</n-radio>
                          </n-gi>
                            <n-gi >
                            <n-radio value="错">错</n-radio>
                          </n-gi>
                        </n-grid>
                      </n-radio-group>
                      
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
                        <span class="topicTitle">{{++index}}</span><span style="padding-left:5px">{{item.question}}</span>
                      </template>
                     
                      <n-grid   :cols="1">
                        <n-gi :span='24'>
                          <n-input
                            @update:value="(value)=>textareaChange(value,item.id)"
                            type="textarea"
                            placeholder=""
                          />
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
    NPopconfirm
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { getExaminationPaperByLessonIdStudentId, studyUserAnswer } from './api'
  // import { querys  } from '../course-maintenance/api'

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
      NPopconfirm
    },
     props: {
      
     },
    setup (props,context) {
      const formVisible = ref(false)
      const modelRef  = reactive({})
      const xTable = ref()
      const message = useMessage();

      const spinShow = ref(false);
      const examContent = ref({studyExamQuestionDefList:[],})
      const studyPlanQuestionList= ref({})
      const studyPlanQuestionUserDto= ref([])
      const questionScore = ref()
      const description = ref('')
      const duration = ref(0)
      const sonFn = (e) => {
        modelRef.value = e
        formVisible.value = true
        spinShow.value = true
        description.value = '试卷加载中...'
        getExaminationPaperByLessonIdStudentId(e.id).then((res)=>{
           studyPlanQuestionList.value.lessonId = e.lessonId
           studyPlanQuestionList.value.planId = e.planId
           studyPlanQuestionList.value.paperId = res.id
           studyPlanQuestionList.value.userAnswers = []
           duration.value = res.specialExamTime * 60000
           examContent.value = res
           res.studyExamQuestionDefList.map((d)=>{
             studyPlanQuestionUserDto.value.push({lessonId:e.lessonId,paperId:res.id,planId:e.planId,questionId:d.id,questionScore:res.questionScore[d.questionCode],userAnswers:[]})
            })
          //  studyPlanQuestionUserDto.value=
          
          
        }).finally(r => {
          
          spinShow.value = false
        })
        
      }
      const radiogroupChange = (value,questionId, index)=>{
         studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers=[{userAnswer:value,sort:index}]
        // const questionScore = examContent.value.questionScore[0]
        // if(isAdd ) {
        //   studyPlanQuestionUserDto.value.userAnswers = [{userAnswer:value,sort:index}]
        // } else {
        //   studyPlanQuestionUserDto.value.push({...studyPlanQuestionList.value,questionId,questionScore,userAnswers:[{userAnswer:value,sort:index}]})

        // }
      }
       const radioCheckgroupChange = (value,questionId)=>{
         studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers=[{userAnswer:value,}]
        // const isAdd = studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId).length
        // const questionScore = examContent.value.questionScore[3]

        // if(isAdd ) {
        //   studyPlanQuestionUserDto.value.userAnswers = [{userAnswer:value}]
        // } else {
        //   studyPlanQuestionUserDto.value.push({...studyPlanQuestionList.value,questionId,questionScore,userAnswers:[{userAnswer:value}]})

        // }
      }
      const textareaChange = (value,questionId)=>{
        studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers=[{userAnswer:value,}]
        // const isAdd = studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId).length
        // const questionScore = examContent.value.questionScore[4]

        // if(isAdd ) {
        //   studyPlanQuestionUserDto.value.userAnswers = [{userAnswer:value}]
        // } else {
        //   studyPlanQuestionUserDto.value.push({...studyPlanQuestionList.value,questionId,questionScore,userAnswers:[{userAnswer:value}]})

        // }
      }
      const checkgroupChange = (value,questionId)=>{
        const arr = []
        value.map((d,i)=>{
          arr[i] = {userAnswer:d}
        })
        studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers=arr
        // const isAdd = studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId).length
        // const questionScore = examContent.value.questionScore[1]

        // if(isAdd ) {
        //     const arr = []
        //     value.map((d,i)=>{
        //       arr[i] = {userAnswer:d}
        //     })
        //     studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers = arr
        // } else {
        //     const arr = []
        //     value.map((d,i)=>{
        //       arr[i] = {userAnswer:d}
        //     })
        //   studyPlanQuestionUserDto.value.push({...studyPlanQuestionList.value,questionId,questionScore,userAnswers:arr})
        // }
      }
      const inputgroupChange = (value,questionId,index,item) => {
        const isAdd = studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers.length

        if(isAdd ) {
          (studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0]).userAnswers.map((d)=>{
            if(d.sort == (index)){
              d.userAnswer = value
            }
            return d
          })
        } else {
          const length = item.question.split('________').length-1
          const userAnswers = []
          for(var h = 0;h<length;h++){

            if(h==(index)){
              userAnswers.push({userAnswer:value,sort:h})
            } else {
              userAnswers.push({userAnswer:'',sort:h})

            }
          }
          studyPlanQuestionUserDto.value.filter(d=>d.questionId == questionId)[0].userAnswers=userAnswers
        }
      }
      const save = () =>{
         description.value = '试卷上传中，请勿操作...'
         spinShow.value=true
         studyUserAnswer(studyPlanQuestionUserDto.value).then((res)=>{
            spinShow.value=false
            showModal.value = false
         }).finally(r => {
          
          spinShow.value = false
        })
      }
      onMounted(async () => {})
      return {
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
        radiogroupChange,
        checkgroupChange,
        inputgroupChange,
        radioCheckgroupChange,
        textareaChange,
        save
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