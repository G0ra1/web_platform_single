<template>
  <div class="specialBorder" >
    <div class="specialTitile">
       <div class="empMessage" >
            <img :src="formData.fileUrl" style="width:100%;height:160px;">
       </div>
       <div class="specialMessage">
         <p class="header">
              <span style="font-weight: bolder;font-size: 20px;color:#333">{{formData.specialName}}</span>
              <n-rate style="margin-left:20px;position: relative;top:4px" size="medium" :count="1" :value='formData.isCollect' @update:value="isCollection"/> 
              <span style="margin-left:5px;font-size: 16px;">{{formData.isCollect==0? '未收藏' : '已收藏'}}</span>
              <span style="float:right;font-size: 16px;color:#888"><span style="color:#387490">{{formData.lessCount}}</span> 个课程</span>
         </p>
         <p class="second">
           <span style="color: #888;font-size: 15px;">总学时：<span style="color:#333"> {{formData.studyTimeText}}</span></span>
           <span style="color: #888;font-size: 15px;margin-left:70px">浏览量： <span style="color:#333">{{formData.hits}} 人</span></span>
         </p>
         
        <span class="desc" :title="formData.description">
            <span  style="color: #888;font-size: 15px;">专题简介:</span><span style="margin-left:10px">{{formData.description}}</span>
          </span>
       </div>
    </div>
   
    <div class="specialCourse" >
      <div :class="`${(formData.apply !== 1 )? 'first1' : 'first'}`"   >
        <span style="font-weight:bold;font-size:18px;display:inline-block;padding:2px 0"><span style="font-weight:bolder;color:#1060c9">|</span> 课程信息</span>
        <n-card v-for="item in formData.studySpecialLessonList" :key="item.id" 
              style="position:relative;cursor: pointer;min-height:130px;width:100%; background: #FFF;margin-top:3px" 
        >
            <p class="header" @click="()=>{showCourseDetail({...item,specialId:formData.id})}">
                <span style="font-weight: bolder;font-size: 18px;color:#3F8FFF">{{item.lessonName}}</span>
            </p>
             <n-list>
                <n-list-item v-for="(item1,index) in item.studySpecialLessonCouList" :key="index" style="cursor: pointer;">
                  <div style="display: flex;height: 40px;line-height: 40px;" class="couH" @click="()=>{showCourseDetail({...item1,})}">
                    <span style="flex:1;">
                      <span style="font-size: 12px;
                            background: rgb(3, 221, 109); width: 55px;
                            color: #efefef;
                            display: inline-block;
                            border-radius: 12px;
                            text-align: center;
                            line-height: 20px;
                            height: 20px;"  
                      >
                            {{[{value:1,label:'音频'},{value:2,label:'视频'},{value:3,label:'文档'}].filter(d=>d.value == item1.couCode)[0].label}} 
                      </span>
                     {{++index}}, {{item1.couName}}
                    </span>
                    <span >
                        进入学习
                    </span>
                  </div>
                </n-list-item>

              </n-list>
            <!-- <p class="second2">
                <span style="color: #888;font-size: 15px;">课件数量：<span style="color:#333"> {{item.couNum}}</span></span>
                <span style="color: #888;font-size: 15px;margin-left:70px">必修数量： <span style="color:#333">{{item.bxCouNum}} </span></span>
            </p>
            
            <span class="desc" :title="item.description">
                <span  style="color: #888;font-size: 15px;">课程简介:</span><span style="margin-left:10px">{{item.description}}</span>
            </span> -->

            <div id="info-content" :class="`button-content${item.learnStatus}`" style="color:#FFF">{{[{label:'未开始',value:0},{label:'进行中',value:1},{label:'已完成',value:2},].filter(d=>d.value ==item.learnStatus )[0].label}}</div>
        </n-card>
        <span style="font-weight:bold;font-size:18px;margin-top:15px;display:inline-block;padding:2px 0"  v-if="formData.specialPaperId"><span style="font-weight:bolder;color:#1060c9">|</span> 考试信息</span>
        <n-card v-if="formData.specialPaperId" style="width:100%; background: #FFF;" >
          <div style="width:100%;height:100%;display:flex;flex-direction: initial;">
            <div style="flex:1">
                <p class="header">
                        <span style="font-weight: bolder;font-size: 18px;color:#3F8FFF">{{formData.specialPaperName}}</span>
                </p>
                <p class="foot" style="display:flex;flex-direction: initial;">
                        <span style="color: #888;font-size: 15px;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  :title="`${formData.specialPaperStartTime + '-'+ formData.specialPaperEndTime}`">考试时间：<span style="color:#333"> {{formData.specialPaperStartTime}} - {{formData.specialPaperEndTime}}</span></span>
                        <span style="color: #888;font-size: 15px;margin-left:50px;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" :title="`${formData.specialExamNum}`">可考试次数： <span style="color:#333">{{formData.specialExamNum}} </span></span>
                        <span style="color: #888;font-size: 15px;margin-left:50px;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  :title="`${formData.examedNum}`">已考试次数： <span style="color:#333">{{formData.examedNum}} </span></span>
                        <span style="color: #888;font-size: 15px;margin-left:50px;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  :title="`${formData.specialExamTime}`">答题时长： <span style="color:#333">{{formData.specialExamTime}} </span></span>
                </p>
            </div>
            <div style="line-height:50px">
                  <n-button type="info" round :disabled="!(formData.examedNum >0)"  @click="()=>{answerModal = true}">提交试卷</n-button><br>
                  <n-button ghost type="info" :disabled="!formData.isCanExam" round @click="()=>{
                    isCanExam(formData.id).then((r)=>{
                      if(r){
                        showExaminationModal = true
                      }
                    })
                    }">{{formData.examedNum >0 ? '继续考试' : '开始考试'}}</n-button>
                  <!-- v-if="formData.examedNum>0" -->
            </div>
          </div>
        </n-card>
      </div>
     
        <div class="mask" v-if="formData.apply !==1">
            <div style="z-index:1001" v-if="formData.apply == 0">
                <h3>您当前未报名，无法学习课程</h3>
                    <n-button strong  type="info" @click="showModal = true">
                        报名参加
                    </n-button>
            </div>
            <div style="z-index:1001" v-if="formData.apply == 2">
                <h3>当前课程正在申请中，请留意消息通知</h3>
            </div>
        </div>
         
      <div :class="`${!formData.apply ? 'second1' : 'second'}`" >
        <n-card  >
            <n-list>
                <template #header>
                  <span style="font-size:18px;font-weight:bolder">资料下载</span>
                </template>
                <n-list-item v-for="(item,index) in formData.studySpecialMaterialsList" :key="index" style="cursor: pointer;">
                  <div style="display: flex;">
                    <p style="flex:1">
                      {{++index}}, {{item.materialsName}}
                    </p>
                    <p style="width:30px;text-align:center" @click="clientTemplate(item)" v-if="item.isDownload == 1">
                        <nw-icon
                          name="icon-n-y-export"
                          :size="25"
                          style="cursor: pointer;color:#2080f0"
                        />
                    </p>
                  </div>
                </n-list-item>

              </n-list>
        </n-card>
      </div>
    </div>
  
  </div>
  <n-modal v-model:show="showModal"  preset="dialog"  title="提交申请">
     <n-form> 
       <n-form-item label="备注">
              <n-input
                v-model:value="formData.applyMessage"
                type="textarea"
                placeholder=""
                style="height: 120px"
              />
        </n-form-item>
    </n-form>
     <template #action>
      <n-button type="warning" size="small" @click="showModal = false"
        >取消</n-button
      >
      <n-button
        type="success"
        size="small"
        style="margin-right: 5px"
        @click="applyChange"
        >保存</n-button
      >
    </template>
  </n-modal>
  
   <n-modal v-model:show="answerModal"  preset="dialog"  :title="!formData.isSubmitExam ? '提交试卷' :'当前试卷已提交'">
      <p v-for="(i,_index) in formData.studyUserExamList" :key="i.id" :value="i.id" style="font-size:16px;padding:10px 0;">
        <n-radio @update:checked="(checked)=>{
          if(checked) formData.answerId = i.id
        }" :value="i.id" :checked="formData.answerId == i.id || i.isSubmit == 1"></n-radio> <span style="color:red" @click="showDetail({id:i.id})">第 {{_index+1}}、次考试 </span><span style="color:#888;margin-left:10px">考试时间：</span>{{ i.answerEndTime }}
      </p>
        

     <template #action >
       <div style="width:100%;text-align:center" v-if="!formData.isSubmitExam">
            <n-button
              type="info"
              size="small"
              style="width:80%"
              round 
              :disabled="formData.isSubmitExam"
              @click="()=>{
                submittedPapers(formData.answerId).then((r)=>{
                    if(r){
                       message.success('提交成功')
                       formData.isSubmitExam = true
                       formData.isCanExam = false
                       answerModal = false
                    } else {
                      message.error('提交失败')
                    }
                })              
              }"
              >提交试卷</n-button
            >
       </div>
    </template>
  </n-modal>

   <n-modal v-model:show="showExaminationModal"  preset="dialog"  title="考试信息">
      <div style="width:100%;">
         <h3 style="text-align:center">{{formData.specialPaperName}}</h3>
         <p><span>考试时间 : </span> {{formData.specialPaperStartTime.substring(0,16) }} - {{formData.specialPaperEndTime.substring(0,16)}}</p>
         <p><span>答题时长 : </span>{{formData.specialExamTime}}</p>
      </div>
     <template #action>
       <div style="width:100%;text-align:center">
            <n-button
              type="info"
              size="small"
              style="width:80%"
              round 
              @click="showExamination"
              >开始考试</n-button
            >
       </div>
    
    </template>
  </n-modal>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted,watch  } from "vue";
import { NwIcon,Cookies } from '@platform/main'
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
  useMessage,
  NRadio,
  NRate
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { specialDetail,learnApply, isCanExam, submittedPapers,saveCollection } from '../api'
export default defineComponent({
  components: {
    NSpace,
    NRadioGroup,
    NRadioButton,
    NRadio,
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
    NRate
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const formData = ref({})
    const showModal= ref(false)
    const answerModal = ref(false)
    const message = useMessage();
    const showExaminationModal = ref(false)
    // 报名
    const applyChange = () =>{
       learnApply({
           targetId:formData.value.id,
           applyMessage:formData.value.applyMessage
       }).then((r)=>{
           showModal.value = false
           formData.value.apply = 2
       })
    }
    const showCourseDetail = (item) =>{
        router.push({
          path: '/specialVideoDetail',
          query:{...item,specialName:formData.value.specialName,}
        })
    }
    const showDetail = (item) =>{
     
      router.push({
        path: '/examPaperDetail',
        query: {...item,showParse:true}

      })
    }
    // 答题
    const showExamination = () =>{
        router.push({
          path: '/examPaper',
          query:{
            specialName:formData.value.specialName,
            specialId:formData.value.id,
            paperId:formData.value.specialPaperId,
            paperStartTime:formData.value.specialPaperStartTime,
            paperEndTime:formData.value.specialPaperEndTime,
            specialExamTime:formData.value.specialExamTime,
          }
        })
    }
       // 下载
    const clientTemplate = (item) => {
      var fileType  = item.fileUrl.substring(item.fileUrl.lastIndexOf('.')) 
      var filename = `${item.materialsName}${fileType}`;
      const token = Cookies.get("token");
      const tokenType = Cookies.get("tokenType");
      fetch(`${window.apiBaseURL}/main/aliyunFile/${item.fileId}`, {
        method: "get",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`,
        }),
        responseType: "blob",
      })
        .then((response) => response.arrayBuffer())
        .then((res) => {
          var a = document.createElement("a");
          a.style.display = "none";
          var url = URL.createObjectURL(
            new Blob([res], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            })
          );
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // 释放掉blob对象
          document.body.removeChild(a); // 下载完成移除元素
          setTimeout(() => {
            message.success("下载成功");
          }, 1000);
        });
    }
    onMounted(()=>{
        specialDetail(route.query.id).then((r)=>{
          formData.value = r
        })
    })
    return {
      router,
      route,
      formData,
      applyChange,
      showModal,
      isCanExam,
      showCourseDetail,
      clientTemplate,
      showExaminationModal,
      showExamination,
      answerModal,
      submittedPapers,
      message,
      showDetail,
      isCollection(){
       saveCollection({
           collectionType:0,
           collectionId:formData.value.id,

       }).then((r)=>{
        formData.value.isCollect = (formData.value.isCollect== 0 ? 1 : 0)
         message.success("操作成功");
       })
      },
    };
  }
});
</script>
<style lang="less" scoped>
 /deep/ .n-list .n-list-item{
   padding:0;
   height: 37px;
  }
  /deep/ .n-list{
    margin: 0;
  }
  /deep/ .n-card.n-card--bordered{
      padding:10px
  }
  /deep/ .n-card > .n-card__content, .n-card > .n-card__footer{
      padding:0
  }
 .specialBorder {
    padding: 10px;
    min-height: calc(~"100vh - 84px"); 
    background: #efefef;
   
    .specialTitile{
        width: 80%;
        margin: auto;
        background:#fff;
        height: 200px;
        // text-align: center;
        margin-bottom: 10px;
        display: flex;
        
        .empMessage{
            width: 300px;
            padding: 20px;
           
        }
        .specialMessage{
            flex: 1;
            padding: 20px;
            .header{
                height: 30px;
                line-height: 30px;
                width: 100%;
                span {
                    display: inline-block;
                    font-weight: 500

                }
              
            }
            .second{
                height: 30px;
                line-height: 30px;
            }
            .desc{
                width: 100%;
                overflow: hidden;
                color:#333;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
    .specialCourse {
        width: 80%;
        margin: auto;
        display: flex;
        
          .button-content2:before{ 
              content:'';
              width:20px;  
              height: 0%;  
              border: 15px solid;  
              border-color: transparent #B2DE34 transparent transparent ;   
              position: absolute;  
             
              top: 0px;
              right: 100px;
          }  
          .button-content2{  
              width: 100px;  
              height: 30px;  
              background-color: #B2DE34;  
              font-size: small;  
              line-height: 30px;  
              text-align: center;  
              position: absolute;  
              top: 10px;
              right: -16px;
          }  
          .button-content2:after{  
              content:'';
              width:10px;
              border: 15px solid;  
              border-color: transparent transparent transparent #58661C;   
              border-top: 0;  
              right: -25px;  
              position: absolute;/*使伪元素脱离文档流，使伪元素不受div内容的影响,便于计算位置，此时after相对于div的左上角进行定位*/  
              top: 30px;  
          }
            .button-content1:before{ 
              content:'';
              width:20px;  
              height: 0%;  
              border: 15px solid;  
              border-color: transparent hsl(135, 66%, 55%) transparent transparent ;   
              position: absolute;  
             
              top: 0px;
              right: 100px;
          }  
          .couH:hover{
            color: #1890ff;
          }
          .button-content1{  
              width: 100px;  
              height: 30px;  
              background-color: hsl(135, 66%, 55%);  
              font-size: small;  
              line-height: 30px;  
              text-align: center;  
              position: absolute;  
              top: 10px;
              right: -16px;
          }  
          .button-content1:after{  
              content:'';
              width:10px;
              border: 15px solid;  
              border-color: transparent transparent transparent hsl(135, 66%, 55%);;   
              border-top: 0;  
              right: -25px;  
              position: absolute;/*使伪元素脱离文档流，使伪元素不受div内容的影响,便于计算位置，此时after相对于div的左上角进行定位*/  
              top: 30px;  
          }
            .button-content0:before{ 
              content:'';
              width:20px;  
              height: 0%;  
              border: 15px solid;  
              border-color: transparent #867979 transparent transparent ;   
              position: absolute;  
             
              top: 0px;
              right: 100px;
          }  
          .button-content0{  
              width: 100px;  
              height: 30px;  
              background-color: #867979;  
              font-size: small;  
              line-height: 30px;  
              text-align: center;  
              position: absolute;  
              top: 10px;
              right: -16px;
          }  
          .button-content0:after{  
              content:'';
              width:10px;
              border: 15px solid;  
              border-color: transparent transparent transparent #867979;   
              border-top: 0;  
              right: -25px;  
              position: absolute;/*使伪元素脱离文档流，使伪元素不受div内容的影响,便于计算位置，此时after相对于div的左上角进行定位*/  
              top: 30px;  
          }
       .first1{
            flex: 1;
            margin-right: 20px;
            height: calc(~"100vh - 350px");
            overflow: hidden;
            .header{
                height: 30px;
                line-height: 30px;
                width: 100%;
                span {
                    display: inline-block;
                    font-weight: 500
                }
            }
            .foot{
                height: 30px;
                line-height: 30px;
                div{
                    display: inline-block;
                }
            }
            .desc{
                width: 100%;
                overflow: hidden;
                color:#333;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
       }
       .first {
            flex: 1;
            margin-right: 20px;
           
            .header{
                height: 30px;
                line-height: 30px;
                width: 100%;
                span {
                    display: inline-block;
                    font-weight: 500
                }
            }
            .foot{
                height: 30px;
                line-height: 30px;
                div{
                    display: inline-block;
                }
            }
            .desc{
                width: 100%;
                overflow: hidden;
                color:#333;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
       }
       .second{
           
           width: 300px;
            background: #FFF;
       }
        .second1{
            height: calc(~"100vh - 350px");
           width: 300px;
            overflow: hidden;
            background: #FFF;
       }
    }
    .mask {
        width: 79%;
        background: #FFF;
         margin-right: 20px;
        height: calc(~"100vh - 350px");
        text-align: center;
        overflow: hidden;
        opacity: 0.8;
        position: absolute;
        z-index: 999;
        // padding-top:  calc(~"100vh - 100px");
        div{
            padding-top: calc(~"100vh - 700px")
        }
    }
   
  }
</style>