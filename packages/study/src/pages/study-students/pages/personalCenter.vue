<template>
  <div class="personalBorder">
    <div class="personalTitile">
       <div class="empMessage" >
          <div class="headPortrait" >
              <img src="../img/boy.png" style="width:100%;height:100px;border-radius:50%" v-if="userMsg.sex==1">
              <img src="../img/girl.png" style="width:100%;height:100px;border-radius:50%" v-else>
          </div>
          <div class="empDetail">
              <h2>{{userMsg.userName}} ({{userMsg.phoneNum}})</h2>
              <p><NwIcon name="icon-zuozhe" class="iconbtn drag-btn" size="20" />身份: {{userMsg.userType}}  <span><NwIcon name="icon-qizhi" class="icon-gongzuo" size="20" />岗位: {{userMsg.postName}}</span></p>
              <p><NwIcon name="icon-zuzhijigou2" class="iconbtn drag-btn" size="20" />归属部门： {{userMsg.parentDeptName}}</p>
          </div>
       </div>
       <div class="empClassMessage">
         <div>
             <p class="countC">{{userMsg.cumulativeStudyTime}}</p>
             <p class="duration">学习时长(小时)</p>
             <p class="accumulated">累计</p>
         </div>
         <div>
            <p class="countC">{{userMsg.studyLessonNum}}</p>
            <p class="duration">课程</p>
            <p class="accumulated">已学</p>
         </div>
         <div>
            <p class="countC">{{userMsg.studySpecialNum}}</p>
            <p class="duration">专题</p>
            <p class="accumulated">已学</p>
         </div>
         <div>
            <p class="countC">{{userMsg.userCertificateNum}}</p>
            <p class="duration" style="border:none">证书</p>
            <p class="accumulated">获得</p>
         </div>
       </div>
    </div>
   
    <div class="personalMessage">
       <n-scrollbar style="min-height: 100%">
        <div class="first">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
          />
        </div>
        <div class="second">
        
            <MyExamination v-if="activeKey == 'examination'"></MyExamination>
            <MyCollect v-if="activeKey == 'collect'"></MyCollect>
            <MyApply v-if="activeKey == 'apply'"></MyApply> 
            <BrowsingHistory v-if="activeKey == 'browsingHistory'"></BrowsingHistory>
            <MyCertificate v-if="activeKey == 'certificate'"></MyCertificate>
            <LearningRecord v-if="activeKey == 'learningRecord'"></LearningRecord>
        </div> 
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted,watch  } from "vue";
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
  NScrollbar,
  NTag
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import MyExamination from './personalCenterComponent/myExamination.vue'
import MyCollect from './personalCenterComponent/myCollect.vue'
import MyApply from './personalCenterComponent/myApply.vue'
import BrowsingHistory from './personalCenterComponent/browsingHistory.vue'
import MyCertificate from './personalCenterComponent/myCertificate.vue'
import LearningRecord from './personalCenterComponent/learningRecord.vue'
import { getUserMsg  } from '../../study-students/api'

import { NEllipsis } from 'naive-ui'
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
    MyExamination,
    MyCollect,
    MyApply,
    BrowsingHistory,
    MyCertificate,
    NScrollbar,
    NTag,
    LearningRecord
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const userMsg = ref({})
    const menuOptions = ref([
        {
          label: () =>
            h(NEllipsis, null, { default: () => '我的考试' }),
          key: 'examination'
        },
       {
          label: () =>
            h(NEllipsis, null, { default: () => '我的申请' }),
          key: 'apply'
        },
         {
          label: () =>
            h(NEllipsis, null, { default: () => '我的证书' }),
          key: 'certificate'
        },
         {
          label: () =>
            h(NEllipsis, null, { default: () => '我的收藏' }),
          key: 'collect'
        },
        {
          label: () =>
            h(NEllipsis, null, { default: () => '学习记录' }),
          key: 'learningRecord'
        },
         {
          label: () =>
            h(NEllipsis, null, { default: () => '浏览记录' }),
          key: 'browsingHistory'
        },
       
      
       
    ])
    
    onMounted(()=>{
      getUserMsg({}).then((r)=>{
       userMsg.value = r
      })
    })
    return {
      menuOptions,
      activeKey:ref('examination'),
      router,
      route,
      userMsg,
    };
  }
});
</script>
<style lang="less" scoped>
 .personalBorder {
    height: calc(~"100vh - 65px"); 
    background: #efefef;
    display: flex;
    flex-direction: column;
     padding: 0px;
    .personalTitile{
        width: 80%;
        margin: auto;
        background:#fff;
        height: 200px;
        // text-align: center;
        margin-bottom: 10px;
        margin-top: 10px;
        display: flex;
        .empMessage{
            width: 600px;
            height: 160px;
            padding: 20px;
            .headPortrait{
                display: inline-block;
                height: 100px;
                width: 100px;
                // position: absolute;
                // top: 80px;
            }
            .empDetail{
                 display: inline-block;
                 padding: 0 10px;
            }
        }
        .empClassMessage{
            flex: 1;
            text-align: right;
            height: 160px;
            padding: 20px;
            .countC{
                font-size: 20px;
                font-weight: 500;
                color: #387490;
                margin-bottom: 5px;
                cursor: pointer;
            }
            .duration{
                font-size: 12px;
                color: #333;
                border-right: 1px solid #3F8FFF;
            }
            .accumulated{
                font-size: 9px;
                color: rgb(136, 136, 136)
            }
            div{
                display: inline-block;
                width: 20%;
                text-align: center;
            }
        }
    }
    .personalMessage {
        flex: 1;
        width: 80%;
        margin: auto;
       .first {
           width: 13%;
           text-align: center;
           position: fixed;
            background: #FFF;
            /deep/ .n-menu .n-menu-item-content{
                padding-left: 0 !important;
            }
       }
       .second{
            flex: 1;
            background: #FFF;
            position: relative;
            left: 18%;
            width: 82%;
       }
       /deep/ .n-scrollbar > .n-scrollbar-container{
        overflow-x: hidden;
       }
    }
   
  }
</style>