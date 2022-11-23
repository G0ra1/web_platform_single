<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      placement="right"
      :to="$refs.page && $refs.page.$el"
      
    >
    <n-drawer-content
      :title="`阅卷`"
      style="background: #efefef;"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold',
      'border-bottom' :'2px solid #FFF'
       
    }"
      :footer-style="{
      }"
    >
    <n-spin :show="spinShow">
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
                             <span> 分值：{{item.questionScore}}</span>
                        </template>
                        <template #footer>
                           <div style="background:rgb(247 244 244);padding:5px">
                            <p :style="`${item.isCorrect==1?'color:#18a058':'color:red'}`">
                               {{item.isCorrect==1?'答对了':'答错了'}}
                            </p>
                             <p>
                               学员得分： {{item.score}}
                            </p>
                             <p>
                               正确答案： {{item.answers?  ((item.questionCode == 0 || item.questionCode == 1 ) ?  item.answers.filter((d)=>d.isTrue).map(j=> j.sortText).join(','): item.answers.filter((d)=>d.isTrue).map(j=> j.answer).join(',')) : ''}}
                            </p>
                            <p>
                                题目解析： {{item.parse}}
                            </p>
                           </div>
                        </template>
                        <div style="display:flex;">
                            <div style="flex:1">
                                <n-radio-group disabled :value="item.userAnswer" name="radiogroup" v-if="item.questionCode == 0">
                                    <n-grid  :y-gap="5" :cols="1">
                                        <n-gi v-for="(i,_index) in item.answers" :key="_index">
                                            <n-radio  :value="i.answer" >
                                              <span style="color:#1060c9;font-weight:bolder"> {{ i.sortText }}</span> <span style="padding-left:5px"> {{ i.answer }}</span>
                                            </n-radio>
                                        </n-gi>
                                    </n-grid>
                                </n-radio-group>

                                <n-checkbox-group  disabled :value="item.userAnswer ? item.userAnswer.split(',') : []"  name="checkgroup"  v-if="item.questionCode == 1">
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
                                        <n-input disabled  placeholder=" "  style="width: 50%;" size="small" :value="item.userAnswer ?( item.userAnswer.split(',')[_index]) :''" />
                                        </n-input-group>
                                    </n-gi>
                                </n-grid>
                                <n-radio-group :value="item.userAnswer"  disabled name="radiogroup" v-if="item.questionCode == 3">
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
                                            disabled
                                            :value="item.userAnswer" 
                                            type="textarea"
                                            placeholder=""
                                        />
                                    </n-gi>
                                </n-grid>
                            </div>
                            <!-- <div style="min-width:200px;min-height:110px;line-height:50px;background:rgb(247 244 244);padding:5px;text-align:center;margin-left:15px">
                                 <n-radio-group  :value="item.isCorrect" @update:value="(value)=>{formData.questionList[index].isCorrect = value}">
                                            <n-radio  :value="1" >
                                                对
                                            </n-radio>
                                            <n-radio  :value="0" >
                                                错
                                            </n-radio>
                                </n-radio-group>
                                <div style="display:flex">
                                    <span >得分：</span>
                                     <span style="flex:1"><n-input-number :min="0" :max="item.questionScore" v-model:value="item.score" clearable /></span>
                                  
                                </div>
                            </div> -->
                        </div>
                       
                    </n-card>
            </div>
            <div class="operatingSpace">
            <div class="operatingSpaceMessage">
                    <div style="border-bottom: 1px dashed;">
                        <span style="display:block;height:40px;line-height:40px">人员姓名</span>
                        <span style="font-size:16px;font-weight:bolder"> {{formData.userName}}</span>
                    </div>
                    <div style="border-bottom: 1px dashed;">
                        <span style="display:block;height:40px;line-height:40px">考试名称</span>
                        <span style="font-size:16px;font-weight:bolder"> {{formData.paperName}}</span>
                    </div>
                    <div style="border-bottom: 1px dashed;">
                        <span style="display:block;height:40px;line-height:40px">考试成绩</span>
                        <span style="font-size:16px;font-weight:bolder;color:red"> {{formData.examScore }}</span>
                    </div>
                     <div style="border-bottom: 1px dashed;">
                        <span style="display:block;">考试状态</span>
                            <span :style="`font-weight:bolder;color:${formData.examLevel == 0?'rgb(255, 75, 80)':'rgb(3, 221, 109)'}`">
                                {{formData.examLevel == 0 ? '未通过' :'通过'}}
                            </span>
                    </div>
                    <div>
                        <span style="display:block;">考试评语</span>
                           <n-input
                                style="text-align:left"
                                v-model:value="formData.remark"
                                type="textarea"
                                disabled
                                placeholder=""
                            />
                    </div>
                    
                    <div style="width:100%;text-align:center; border:none;line-height:100px">
                        <n-button
                        size="small" round  style="width:80%" @click="showModal = false" >关闭</n-button>
                    </div>

            </div>
            </div>
        </div>
     </n-spin>
    </n-drawer-content>
  
    
  </n-drawer>
  
</template>

<script>
  
  import { defineComponent, ref, reactive,onMounted,  } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
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
    NCountdown,
    useMessage ,
    NInputNumber
  } from 'naive-ui'
  import { VXETable,  } from 'vxe-table'
  import { markedPaperDetail, savePaper } from './api'
  // import { querys  } from '../course-maintenance/api'

  export default defineComponent({
    components: {
        NDrawer,
        NDrawerContent,
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
        NCountdown,
        NInputNumber
    },
     props: {
      
     },
    setup (props,context) {
      const formVisible = ref(false)
      const modelRef  = reactive({})
      const formData  = ref([])
      const xTable = ref()
      const message = useMessage();
      const spinShow = ref(false);
      const percentage = ref(0)
      const percentageRef  = ref(0)
      const sonFn = (e) => {
        formVisible.value = true
        spinShow.value = true
        formData.value = []
        markedPaperDetail(e.id).then((res)=>{
           formData.value = res ? res :[]
            percentageRef.value =  100/(formData.value.questionList.length)
            percentage.value = percentageRef.value * (formData.value.questionList.filter(d=>d.userAnswer).length)
        }).finally(r => {
          
          spinShow.value = false
        })
        
      };
    
   
      onMounted(async () => {
      })
      return {
        spinShow,
        xTable,
        sonFn,
        modelRef, //题库数据
        showModal: formVisible,
        formData,
        message,
        percentage,
        percentageRef,
        sum(arr) {
            var s = 0;
            for (var i=arr.length-1; i>=0; i--) {
                s += arr[i];
            }
            return s;
        },
      
      }
    },
    methods: {
       menuSelect( item) {
        document.getElementById(item).scrollIntoView();
        },
    }
  })
</script>

<style lang="less" scoped>
  
  /deep/ .n-radio.n-radio--disabled .n-radio__label {
   color:#333;
  }
    /deep/ .n-checkbox.n-checkbox--disabled .n-checkbox__label {
        color:#333;
    }
  .examPaperBorder {
   
    padding: 0px 0px;
    min-height: calc(~"100vh - 74px"); 
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
                min-height: 100px;
                line-height: 60px;
                width: 100%;
                text-align: center;
            }
        }
    }
  }
 
</style>