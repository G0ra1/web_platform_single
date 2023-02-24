<template>
  <div class="container">
    <div class="slideshow">
       <n-carousel
            autoplay
            effect="custom"
            :transition-props="{ name: 'creative' }"
            show-arrow
            style="width: 100%;"
        >
            <img  v-for="item in slideshows" style="width:100%;height:300px;cursor: pointer;" @click="showSpecialDetail({id:item.specialId,specialName:item.specialName})"  :key="item.id" v-lazy="item.homeBannerUrl">
        </n-carousel>
    </div>
    <div class="announcement">
      <div style="position:relative;width:80%">
        <span>
          <NwIcon name="icon-laba" class="iconbtn drag-btn" size="18" /> <span style="font-weight:bolder">公告:</span>
        </span>
      </div>
      <n-carousel
        autoplay
        style="left:65px;top:-50px"
        direction="vertical"
        dot-placement="right"
           
      >
        <a  v-for="item in notices" :key="item.id" href="javascript:void(0)" @click="showDetail(item)">{{item.newsTitle}}</a>
      </n-carousel>
      <a href="javascript:void(0)"  @click="handleMore" 
        style="position: absolute;
        right: 0;
        top: 0px;"
      >查看更多</a>
      <!-- <n-grid style="height:100%" >
        <n-gi  :span="20" >
            <n-grid style="height:100%" >
                <n-gi  :span="2" >
                    <NwIcon name="icon-laba" class="iconbtn drag-btn" size="18" /> <span style="font-weight:bolder">公告:</span>
                </n-gi>
                 <n-gi  :span="18" >
                  
                    <n-carousel
                        autoplay
                        
                        direction="vertical"
                        dot-placement="right"
                        style="width: 100%; height: 25%;display:inline-block"
                    >
                      <a  v-for="item in notices" :key="item.id" href="javascript:void(0)" @click="showDetail(item)">{{item.newsTitle}}</a>
                    </n-carousel>
                </n-gi>
            </n-grid>
        </n-gi>
        <n-gi :span="4" style="text-align:right;padding-right:10px">
            <a href="javascript:void(0)"  @click="handleMore">查看更多</a>
        </n-gi>
      </n-grid> -->
    </div>
    <!-- <n-divider /> -->
    <div class="hotCourse">
      <h3 style="border-bottom:1px solid #0084CF;padding:5px 0">热门课程 </h3>
       <n-grid x-gap="12" y-gap="0" :cols="5" style="height:100%;width:100%">
          <n-gi v-for="item in courseList" :key="item.id" class="content" @click="()=>{showCourseDetail(item)}">
            <div class="img" >
               <img  v-lazy="item.imgUrl" style="width:100%;height:200px">
            </div>
            <a class="title">{{item.lessonName}}</a>
          </n-gi>
          
      </n-grid>
    </div>

      <div class="hotCourse">
      <h3 style="border-bottom:1px solid #0084CF;padding:5px 0">热门专题 </h3>
       <n-grid x-gap="12" y-gap="0" :cols="5" style="height:100%;width:100%">
          <n-gi v-for="item in specialCourseList" :key="item.id" class="content" @click="()=>{showSpecialDetail(item)}">
            <div class="img" >
               <img v-lazy="item.fileUrl" style="width:100%;height:200px">
            </div>
            <a class="title">{{item.specialName}}</a>
          </n-gi>
          
      </n-grid>
    </div>
    <div class="rankingList">
      <h3 style="border-bottom:1px solid #0084CF;padding:5px 0">排行榜 </h3>
       <n-grid x-gap="24" :cols="3"  style="height:400px;width:100%">
          <n-gi>
            <n-list>
              <template #header>
                <div class="courseHeader">
                  <div class="look-more" @click="lookMoreClass">查看更多 >></div>
                  <div class="title">课程排行榜</div>
                </div>
              </template>
              <n-list-item v-for="(item,index) in getLessonRankings" :key="item.userNameCh" style="height:60px;">
                <n-grid x-gap="24" :cols="3" style="height: 60px;line-height: 60px;">
                  <n-gi >
                    <span style="display:inline-block;width:30%;height:100%;position:relative;top:6px">
                      <NwIcon  :name="index==0?'icon-guanjun' : (index==1 ? 'icon-yajun': (index==2 ? 'icon-jijun' : (index==3?'icon-4':'icon-5'))) "  style="width:2em;height:2em" />
                    </span>
                    <span style="display:inline-block;">
                     {{ item.userNameCh}}
                    </span>
                  </n-gi>
                  <n-gi style="height:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.userOrgFullName}}</n-gi>
                  <n-gi >{{item.size}} 门</n-gi>
                </n-grid>
              </n-list-item>
            </n-list>
          </n-gi>
          <n-gi>
            <n-list>
              <template #header>
                <div class="courseHeader" id="courseTimeLong">
                  <div class="look-more" @click="lookMoreSpecial">查看更多 >></div>
                  <div class="title">专题排行榜</div>
                </div>
              </template>
              <n-list-item v-for="(item,index) in getSpecialRankings" :key="item.userNameCh" style="height:60px">
                <n-grid x-gap="24" :cols="3" style="height: 60px;line-height: 60px;">
                  <n-gi >
                    <span style="display:inline-block;width:30%;height:100%;position:relative;top:6px">
                      <NwIcon  :name="index==0?'icon-guanjun' : (index==1 ? 'icon-yajun': (index==2 ? 'icon-jijun' : (index==3?'icon-4':'icon-5'))) "  style="width:2em;height:2em" />
                    </span>
                    <span style="display:inline-block;">
                     {{ item.userNameCh}}
                    </span>
                  </n-gi>    
                  <n-gi style="height:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.userOrgFullName}}</n-gi>
                  <n-gi >{{item.size}} 门</n-gi>
                </n-grid>
              </n-list-item>
            </n-list>
          </n-gi>
          <n-gi>
            <n-list>
              <template #header>
                <div class="courseHeader" id="courseTime">
                  <div class="look-more" @click="lookMoreSchoolRanking">查看更多 >></div>
                  <div class="title">学时排行榜</div>
                </div>
              </template>
              <n-list-item v-for="(item,index) in schoolRankings" :key="index" style="height:60px">
                <n-grid  :cols="3" style="height: 60px;line-height: 60px;">
                  <n-gi >
                    <span style="display:inline-block;width:30%;height:100%;position:relative;top:6px">
                      <NwIcon  :name="index==0?'icon-guanjun' : (index==1 ? 'icon-yajun': (index==2 ? 'icon-jijun' : (index==3?'icon-4':'icon-5'))) "  style="width:2em;height:2em" />
                    </span>
                    <span style="display:inline-block;">
                    {{ item.userNameCh}}
                    </span>
                  </n-gi>                
                  <n-gi style="height:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:center">
                    {{item.studyTime ? formatSeconds(item.studyTime) : 0}}
                  </n-gi>
                  <n-gi style="height:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.userOrgFullName}}</n-gi>
                </n-grid>
              </n-list-item>
            </n-list>
          </n-gi>
         
       
      </n-grid>
    </div>
  </div>
  <div class="footer">
    <div class="first">
      <div class="left">
          010-57389744
      </div>
      <div class="center">
          <n-menu mode="horizontal"  :options="menuOptions" default-value="homePage"/>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="second">
        <p  style="pdding-top:5px"> 技术支持：云数网讯（北京）信息技术有限公司</p>
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="课程排行榜"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:1300px;"
  >
    <n-spin :show="isLoading">
      <div style="height:700px;padding:20px">
        <n-list>
          <template #header>
            <h3 style="border: 2px solid #1198d7;
                height: 50px;
                line-height: 50px;
                border-radius:8px;
                text-align:center;
                color: #1198d7;padding:0 15px"
            >
              您的当前排名: {{ranking ? ranking : 0}}
              <!-- <span style="float:right;
                  font-size: 16px;
                  color: #333;
                  font-weight: 500;"
              >10 门</span> -->
            </h3>
            <p style="text-align:center;">注：排行榜只显示前100名</p>
          </template>
          <n-scrollbar style="max-height: 550px" trigger="none">
            <n-list-item v-for="(item,index) in getMoreLessonRankings" :key="item.id">
              <n-grid  :cols="3" >
                <n-gi style="text-align:left">
                 <span style="width: 2.5em;
                    display:inline-block;
                    height: 2em;
                    line-height: 2em;
                    text-align: center;
                    font-weight: 700;
                    color: #fff;
                    background-color: #f1a77b"
                  >{{index+1}}</span> {{item.userNameCh}}
                </n-gi>
                <n-gi style="text-align:center">
                  <span style="display:inline-block;width:100%; 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;"
                  >
                    {{item.userOrgFullName}}
                  </span>
                </n-gi>
                <n-gi style="text-align:right">
                  <span style="font-weight:bolder">{{item.size}} 门</span>
                </n-gi>
              </n-grid>
            </n-list-item>
           </n-scrollbar>
         
        </n-list>
      </div>
    </n-spin>
     <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
            
        </div>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showSpecialModal"
    :mask-closable="false"
    preset="dialog"
    title="专题排行榜"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:1300px;"
  >
    <n-spin :show="isLoading">
      <div style="height:700px;">
        <n-list style="padding:20px;">
          <template #header>
            <h3 style="border: 2px solid #1198d7;
                height: 50px;
                line-height: 50px;
                border-radius:8px;
                text-align:center;
                color: #1198d7;padding:0 15px"
            >
              您的当前排名: {{ranking ? ranking : 0}}
              <!-- <span style="float:right;
                  font-size: 16px;
                  color: #333;
                  font-weight: 500;"
              >10 门</span> -->
            </h3>
            <p style="text-align:center;">注：排行榜只显示前100名</p>
          </template>
          <n-scrollbar style="max-height: 550px" trigger="none">
            <n-list-item v-for="(item,index) in getMoreSpecialRankings" :key="item.id">
              <n-grid  :cols="3" >
                <n-gi style="text-align:left">
                 <span style="width: 2.5em;
                    display:inline-block;
                    height: 2em;
                    line-height: 2em;
                    text-align: center;
                    font-weight: 700;
                    color: #fff;
                    background-color: #f1a77b"
                  >{{index+1}}</span> {{item.userNameCh}}
                </n-gi>
                <n-gi style="text-align:center">
                  <span style="display:inline-block;width:100%; 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;"
                  >
                    {{item.userOrgFullName}}
                  </span>
                </n-gi>
                <n-gi style="text-align:right">
                  <span style="font-weight:bolder">{{item.size}} 门</span>
                </n-gi>
              </n-grid>
            </n-list-item>
           </n-scrollbar>
         
        </n-list>
      </div>
    </n-spin>
     <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showSpecialModal = false" >关闭</n-button>
            
        </div>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showSchoolRankingModal"
    :mask-closable="false"
    preset="dialog"
    title="学时排行榜"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:1300px;"
  >
    <n-spin :show="isLoading">
      <div style="height:700px;padding:20px">
        <n-list>
          <template #header>
            <h3 style="border: 2px solid #1198d7;
                height: 50px;
                line-height: 50px;
                border-radius:8px;
                text-align:center;
                color: #1198d7;padding:0 15px"
            >
              您的当前排名: {{ranking ? ranking : 0}}
              <!-- <span style="float:right;
                  font-size: 16px;
                  color: #333;
                  font-weight: 500;"
              >10 门</span> -->
            </h3>
            <p style="text-align:center;">注：排行榜只显示前100名</p>
          </template>
          <n-scrollbar style="max-height: 550px" trigger="none">
            <n-list-item v-for="(item,index) in getMoreSchoolRankings" :key="item.id">
              <n-grid  :cols="3" >
                <n-gi style="text-align:left">
                 <span style="width: 2.5em;
                    display:inline-block;
                    height: 2em;
                    line-height: 2em;
                    text-align: center;
                    font-weight: 700;
                    color: #fff;
                    background-color: #f1a77b"
                  >{{index+1}}</span> {{item.userNameCh}}
                </n-gi>
                <n-gi style="text-align:center">
                  <span style="display:inline-block;width:100%; 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;"
                  >
                    {{item.userOrgFullName}}
                  </span>
                </n-gi>
                <n-gi style="text-align:right">
                  <span style="font-weight:bolder">{{ item.studyTime ? formatSeconds(item.studyTime) : 0}} </span>
                </n-gi>
              </n-grid>
            </n-list-item>
           </n-scrollbar>
         
        </n-list>
      </div>
    </n-spin>
     <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showSchoolRankingModal = false" >关闭</n-button>
            
        </div>
    </template>
  </n-modal>
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
  NImage,
  NDivider,
  NList,
  NListItem,
  NMenu,
  NModal,
  NScrollbar
} from 'naive-ui'


import { useRoute, useRouter,RouterLink } from 'vue-router'
import { upHits, slideshowList, 
  studyNewsList, 
  getLessons,
  getSpecials, 
  getSpecialRanking,
  getStudyTimeRanking, 
  getLessonRanking,
  
} from '../api'

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
    NImage,
    NDivider,
    NList,
    NListItem,
    NMenu,
    NModal,
    NScrollbar
  },
  setup(props,context) {
    const notices = ref([]) // 公告列表
    const slideshows =ref([])
    const router = useRouter()
    const courseList = ref([])
    const showModal = ref(false)
    const isLoading = ref(false)
    const showSpecialModal = ref(false)
    const showSchoolRankingModal = ref(false)
    const specialCourseList = ref([])
    const schoolRankings = ref([]) //学时排行榜
    const getLessonRankings = ref([])
    const getSpecialRankings = ref([]) //专题排行榜
    const getMoreLessonRankings = ref([]) //更多课程
    const getMoreSpecialRankings = ref([]) //更多专题排行榜
    const getMoreSchoolRankings = ref([]) // 更多学时专题排行榜
    const ranking = ref(0)
    const showDetail = (item) =>{
      upHits(item.id)
      router.push({
        path: '/newsDetail',
        query: item

      })
    }
    const handleMore = (item) =>{
        router.push({
          path: '/allNews',
        })
    }
    const showCourseDetail = (item) =>{
        router.push({
          path: '/videoDetail',
          query:item
        })
    }
    const showSpecialDetail = (item) =>{
        router.push({
          path: '/specialDetail',
          query:item
        })
    }
    
    const lookMoreClass = () =>{
      showModal.value = true
      isLoading.value = true
       getLessonRanking(100).then((r)=>{
          getMoreLessonRankings.value = r.rankings ? r.rankings:[]
          ranking.value = r.selfRanking
          isLoading.value = false

        })
    }

    const lookMoreSpecial = () =>{
      showSpecialModal.value = true
      isLoading.value = true
       getSpecialRanking(100).then((r)=>{
          getMoreSpecialRankings.value = r.rankings ? r.rankings:[]
          ranking.value = r.selfRanking
          isLoading.value = false

        })
    }
    const lookMoreSchoolRanking = () =>{
      showSchoolRankingModal.value = true
      isLoading.value = true
       getStudyTimeRanking(100).then((r)=>{
          getMoreSchoolRankings.value = r.rankings ? r.rankings:[]
          ranking.value = r.selfRanking
          isLoading.value = false

        })
    }
     const menuOptions = [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/homePage",
          }
        }, { default: () => "首页" }),
        key: "homePage",
        name:"首页"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/class",
          }
        }, { default: () => "课程" }),
        key: "class",
        name:"课程"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/special",
          }
        }, { default: () => "专题" }),
        key: "special",
        name:"专题"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/personalCenter",
          }
        }, { default: () => "个人中心" }),
        key: "personalCenter",
        name:"个人中心"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/mySpecial",
          }
        }, { default: () => "我的学习" }),
        key: "mySpecial",
        name:"我的学习"
      },
     
     
    ]
    const getInformData = () =>{
        studyNewsList({page: {current: 1, size: 5}}).then((res)=>{
           notices.value = res
        })
        slideshowList({page: {current: 1, size: 5}}).then((res)=>{
           slideshows.value = res
        })
        getLessons().then((r)=>{
          courseList.value = r ? r:[]
        })
        getSpecials().then((r)=>{
          specialCourseList.value = r ? r:[]
        })
        getStudyTimeRanking(5).then((r)=>{
          schoolRankings.value = r.rankings ? r.rankings:[]
        })
        getLessonRanking(5).then((r)=>{
          getLessonRankings.value = r.rankings ? r.rankings:[]
        })
        getSpecialRanking(5).then((r)=>{
          getSpecialRankings.value = r.rankings ? r.rankings:[]
        })
    }
    onMounted(()=>{
      getInformData()
    })
    return {
      notices,
      showDetail,
      menuOptions,
      lookMoreClass,
      lookMoreSpecial,
      lookMoreSchoolRanking,
      router,
      isLoading,
      slideshows,
      handleMore,
      courseList,
      showModal,
      showCourseDetail,
      showSpecialDetail,
      specialCourseList,
      getSpecialRankings,
      schoolRankings,
      getLessonRankings,
      getMoreLessonRankings,
      showSpecialModal,
      getMoreSpecialRankings,
      showSchoolRankingModal,
      getMoreSchoolRankings,
      ranking,
       //   时分秒换算
      formatSeconds(value) {
          let time = value
          if(time<=59){
              let miao = time
              time = miao + '秒'
          }else if(time>59&&time<=3599){
              let fen = parseInt(time/60)
              let miao =parseInt(time-(fen*60))
              time = fen +'分' + miao + '秒'
          }else if(time>3599){
              let xiaoshi =  parseInt(time/3600)
              let fen  =parseInt((time-(xiaoshi*60*60))/60)
              let miao = parseInt((time-(xiaoshi*60*60))-(fen*60))
              time = xiaoshi +'时' + fen +'分' + miao + '秒'
          }
          return time
    },
    };
  }
});
</script>
<style lang="less" scoped>
 /deep/ .n-list__header{
         
    padding: 0 !important;
  }
  /dee/ .n-list .n-list-item{
    padding: 0
  }
 .container {
    
    background: #fff;
    width:100%;
    margin-bottom: 10px;
    .slideshow{
        height: 300px;
        width: 99%;
        margin: auto;
    }
    .announcement{
      position:relative;
      width: 70%;
      margin: auto;
       height: 50px;
       line-height: 50px;
       a {
           text-decoration: none;
           color: inherit;
           outline: 0;
       }
       a:hover{
           text-decoration: underline;
           color: #2080f0;
       }

    }
    .hotCourse{
        width: 70%;
        margin: auto;
       .content{
        height: 240px;
         cursor: pointer;
         img {
          width:100%;height:200px;
           border-radius: 6px;
         }
         .title{
          //  height: 40px;
          //  line-height: 40px;
           text-align: left;
          //  padding-left: 5px;
           white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-indent: 1px;
            word-wrap: normal;
            word-break: normal;
            margin: 5px 0;
            text-decoration: none;
            color: inherit;
            outline: 0;
         }
          a:hover{
           text-decoration: underline;
           color: #2080f0;
          }
         
       }
    }
    .rankingList{
       width: 70%;
        margin: auto;
       padding: 10px;
       #courseTime {
         background-image: url('../img/rank-class-time.png') !important;
       }
       #courseTimeLong{
         background-image: url('../img/rank-study-time.png') !important;
       }
       .courseHeader{
         height: 100px;
         width: 100%;
         background-image: url('../img/rank-finish-course.png');
          background-size: 100% 100%;
         // padding: 0px 0 26px;
         .look-more{
          text-align: center;
          padding-top:24px;
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;
          width: 100%;
          color: rgba(255,255,255,.5);
         }
         .title{
            font-size: 20px;
            font-weight: 500;
            color: #fff;
             text-align: center;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
         }
         
       }
      
    }
  }
.footer{
  width:100%;
  height:204px;
   background: #363A3E;
  .first{
    width: 70%;
    height: 80px;
    margin: auto;
    color: white;
    padding-top: 30px;
    text-align: center;
    .left{
      width: 25%;
      display: inline-block;
      border-right: 1px solid #777;
    }
    .center{
      width: 50%;
      display: inline-block;
      border-right: 1px solid #777;
       /deep/ .n-menu.n-menu--horizontal .n-menu-item-content .n-menu-item-content-header a{
         color:#777;
       }
    }
    .right{
      width: 25%;
       display: inline-block;
    }
  }
  .second{
    // line-height: 100px;
    text-align: center;
    color: #FFF;
  }
}
</style>