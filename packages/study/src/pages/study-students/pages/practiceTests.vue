<template>
  <div class="examPaperBorder" ref="examPaperBorder">
     <div class="tabControl">
        <div  class="title">
            <span>答题卡</span>
        </div>
       <div class="content">
            <n-grid x-gap="12" :y-gap="12" :cols="4">
                <n-gi v-for="(item,index) in formData.questionList" :key="index"  @click="menuSelect(item.id)">
                    <div  :class="!item.userAnswer ? 'answerSheet' : 'alreadyAnswerSheet'" 
                        >{{index+1}}
                    </div>
                </n-gi>
            </n-grid>
       </div>
     </div>
     <div  class="answerArea" ref="content">
            <n-card style="margin-bottom:8px; background: #FFF;" :segmented="{ content: 'hard'}" size="small"    
                v-for="(item,index) in (formData.questionList)"
                :id="item.id"

                :key="index"
            >
               <template #footer >
                    <div style="background:rgb(247 244 244);padding:5px">
                        <p style="color:#2080f0;cursor: pointer;" @click="()=>{
                            if((showAnswers).includes(item.id)) {
                              showAnswers = showAnswers.filter(d=>d.id == item.id)
                            }else {
                              showAnswersAdd(item.id)
                            }
                            
                        }">
                            {{`${showAnswers.includes(item.id) ? '折叠答案':'查看答案'}`}}
                        </p>
                        <div v-if="showAnswers.includes(item.id)">
                            <p>
                                正确答案： {{item.answers?  ((item.questionCode == 0 || item.questionCode == 1 ) ?  item.answers.filter((d)=>d.isTrue).map(j=> j.sortText).join(','): item.answers.filter((d)=>d.isTrue).map(j=> j.answer).join(',')) : ''}}
                            </p>
                            <p>
                                题目解析： {{item.parse}}
                            </p>
                        </div>
                    </div>                   
                </template>
                <template #header>
                    <span  class="topicTitle">{{index+1 }}、</span><span style="padding-left:5px">{{item.question}}</span>
                    <span class="questionType">{{[
                                {label:'单选题',value:0},
                                {label:'多选题',value:1},
                                {label:'填空题',value:2},
                                {label:'判断题',value:3},
                                {label:'简答题',value:4},
                            ].filter(d=>d.value ==item.questionCode)[0].label}}
                    </span>
                </template>
                <n-radio-group  name="radiogroup" @update:value="(value)=>{formData.questionList[index].userAnswer = value}" v-if="item.questionCode == 0">
                    <n-grid  :y-gap="5" :cols="1">
                        <n-gi v-for="(i,_index) in item.answers" :key="_index">
                            <n-radio  :value="i.answer" >
                               <span style="color:#1060c9;font-weight:bolder"> {{ i.sortText }}</span> <span style="padding-left:5px"> {{ i.answer }}</span>
                            </n-radio>
                        </n-gi>
                    </n-grid>
                </n-radio-group>

                <n-checkbox-group  name="checkgroup"  @update:value="(value)=>{formData.questionList[index].userAnswer = value.join(',')}" v-if="item.questionCode == 1">
                    <n-grid  :y-gap="5" :cols="1">
                        <n-gi v-for="i in item.answers" :key="i">
                            <n-checkbox  :value="i.answer">
                               <span style="color:#1060c9;font-weight:bolder"> {{ i.sortText }}</span> <span style="padding-left:5px"> {{ i.answer }}</span>
                            </n-checkbox>
                        </n-gi>
                    </n-grid>
                </n-checkbox-group>

                <n-grid  :y-gap="4" :cols="1" v-if="item.questionCode == 2">
                    <n-gi v-for="(i,_index) in (item.question.split('(').length-1)" :key="_index">
                        <n-input-group :style="{ width: '100%' }"  >
                        <n-input-group-label >第 {{_index +1}} 空 </n-input-group-label><span style="dispaly:inline-block;width:10px"></span>
                        <n-input placeholder=" "  style="width: 50%;" size="small" @update:value="(value)=>inputgroupChange(value,_index,index,item,(item.question.split('(').length-1))" />
                        </n-input-group>
                    </n-gi>
                </n-grid>
                <n-radio-group  name="radiogroup" @update:value="(value)=>{formData.questionList[index].userAnswer = value}" v-if="item.questionCode == 3">
                    <n-grid  :y-gap="18" :cols="1">
                        <n-gi >
                        <n-radio value="对">对</n-radio>
                        </n-gi>
                        <n-gi >
                        <n-radio value="错">错</n-radio>
                        </n-gi>
                    </n-grid>
                </n-radio-group>

                <n-grid   :cols="1" v-if="item.questionCode == 4">
                    <n-gi :span='24'>
                        <n-input
                            @update:value="(value)=>{formData.questionList[index].userAnswer = value}"
                            type="textarea"
                            placeholder=""
                        />
                    </n-gi>
                </n-grid>
            </n-card>
     </div>
     <div class="operatingSpace">
       <div class="operatingSpaceMessage">
            <div style="border-bottom: 1px dashed;">
                <span style="display:block;height:40px;line-height:40px">名称</span>
                <span style="font-size:16px;font-weight:bolder"> {{formData.paperName}}</span>
            </div>
            <div style="border-bottom: 1px dashed;">
                <span style="display:block;height:40px;line-height:40px">剩余时间</span>
                <div style="color:red;font-weight:bolder;font-size:17px">

                    <n-countdown :duration="formData.specialExamTime" style="color:red"  :active="active"/>
                </div>
            </div>
            <div style="border-bottom: 1px dashed;">
                    <span style="display:block;height:40px;line-height:40px">完成度</span>
                    <n-progress  
                        type="line"
                         status="success"
                         :percentage="percentage"
                    />
                   
            </div>
            <div style="width:100%;text-align:center; border:none;line-height:100px">
                    <n-button
                        type="info"
                        size="small"
                        style="width:80%"
                        round 
                        @click="handPaper"
                        >关闭</n-button
                    >
            </div>
       </div>
     </div>
  </div>
   
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted,watch,nextTick  } from "vue";
import { NwIcon } from '@platform/main'

import {
  NForm, 
  NFormItem,
  NGrid, 
  NGi,
  NGridItem,
  NButton, 
  NInput, 
  NRadioGroup,
  NRadioButton,
  NSpace,
  NPagination,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NCard,
  NSpin,
  NEmpty,
  NCarousel,
  NDivider,
  NImage,
  NMenu,
  NList,
  NListItem,
  NModal,
  NRadio,
  NCheckboxGroup,
  NCheckbox,
  NProgress,
  NScrollbar,
  NCountdown,
  useMessage
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { generatePaper, studentAnswer  } from '../api'
export default defineComponent({
  components: {
    NSpace,
    NRadioGroup,
    NRadioButton,
    NPagination,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NForm,NFormItem,NButton,NInput,NGrid, NGi,
    NCard,
    
    NwIcon,
    NSpin,
    NEmpty,
    NCarousel,
    NDivider,
    NImage,
    NGridItem,
    NMenu,
    NList,
    NListItem,
    NModal,
    NRadio,
    NCheckboxGroup,
    NCheckbox,
    NProgress,
    NScrollbar,
    NCountdown
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const message = useMessage();
    const formData = ref({})
    const arr = ref([])
    const percentage = ref(0)
    const percentageRef  = ref(0)
    const showAnswers = ref([])
    const active = ref(false)
    const showAnswersAdd = (id) =>{
        showAnswers.value.push(id)
        console.log(showAnswers.value,'showAnswers.value')
    }
    onMounted(()=>{
        generatePaper(route.query.paperId).then((r)=>{
          formData.value = {...r,...route.query}
          nextTick().then(()=>{
              formData.value.specialExamTime = formData.value.specialExamTime * 60000 
              active.value = true
              percentageRef.value =  100/(formData.value.questionList.length)
          })
        })
    })
     watch(() =>formData.value,() => {
          percentage.value = percentageRef.value * (formData.value.questionList.filter(d=>d.userAnswer).length)
        },
        {deep: true}
    )
    return {
      router,
      route,
      formData,
      percentage,
      active,
      showAnswers,
      showAnswersAdd,
      showModal:ref(false),
      inputgroupChange(value,_index,index,item,arrL){
        // arr.value[_index] = value
        // console.log(arr,'-=-=-=--==--=',item)
        // formData.value.questionList[index].userAnswer = arr.value.join(',')
         arr.value.length = arrL
        for(var i = 0;i<arrL; i++){
            arr.value[i] =  arr.value[i]  ?  arr.value[i]  : ''
        }
        formData.value.questionList.map((d)=>{
           if(d.id == item.id) {
               arr.value[_index] = value
                d.userAnswer = arr.value.join(',')
           } 
          
           return d
        })
      },
      handPaper(){
          router.go(-1);
      },
      questionCodes:reactive([
        {label:'单选题',value:0},
        {label:'多选题',value:1},
        {label:'填空题',value:2},
        {label:'判断题',value:3},
        {label:'简答题',value:4},
      ]),
    };
  },
  methods: {
      
    menuSelect( item) {
      document.getElementById(item).scrollIntoView();
    },
  },
});
</script>
<style lang="less" scoped>
  .examPaperBorder {
    padding: 15px 30px;
    min-height: calc(~"100vh - 94px"); 
    background: #efefef;
    display: flex;
    .tabControl{
        width: 250px;
        height: 100%;
        background: #FFF;
        position: fixed;
        .title{
            width: 90%;
            margin: auto;
            text-align: center;
            border-bottom: 1px dashed black;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-weight: bolder;
        }
        .content{
            width: 90%;
            margin: auto;
            padding:10px 0;
            .answerSheet{
                width:30px; 
                height:30px; 
                border:1px solid #e9e9eb;
                text-align: center;
                border-radius: 100%;
                margin: 0 auto;
                line-height:30px;cursor:pointer;
            }
            .alreadyAnswerSheet {
                width:30px; 
                height:30px; 
                background-color:#409eff;
                color:white;
                text-align: center;
                border-radius: 100%;
                margin: 0 auto;
                line-height:30px;cursor:pointer;
            }
        }

    }
    .answerArea{
        flex: 1;
        height: 100%;
       
        margin-left: 300px;
        margin-right: 300px;
        position: relative;
        .questionType{
            display: inline-block;
            margin-left: 17px;
            font-size: 12px;
            background: rgb(239, 239, 245);
            /* height: 100%; */
            width: 55px;
            color: #888;
            /* border: 1px solid; */
            border-radius: 12px;
            text-align: center;
        }
    }
    .operatingSpace{
        width: 250px;
        height: 100%;
        background: #FFF;
        position: fixed;
        right: 20px;
        .operatingSpaceMessage{
            width: 85%;
            margin: auto;
            div{
                height: 100px;
                
                width: 100%;
                text-align: center;
            }
        }
    }
  }
</style>