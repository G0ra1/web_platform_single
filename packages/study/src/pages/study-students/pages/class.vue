<template>
  <div class="personalBorder">
    <div class="personalMessage">
      <div class="first">
       <n-list>
          <template #header>
            <div class="courseHeader" id="courseTime" >
              <h3 @click="setDictCode('')">全部分类 </h3>
            </div>
          </template>
          <n-list-item v-for="(item,index) in courseClassifications" :key="index" style="cursor: pointer;">
            <n-popover
              placement="right"
              trigger="hover"
            >
              <template #trigger>
                <div  @click="setDictCode(item.dictCode)">
                  <span style="display:inline-block;width:70%;text-align:left">{{ item.dictName}}</span>
                  <span @click="setDictCode(item.dictCode)" style="display:inline-block;width:20%;text-align:right">></span>
                </div>
               
              </template>
              
              <div  style="width: 500px;height:300px">
                <div class="secondType" v-if="item.kids.length>0" v-for="v in item.kids" :key="v.id" style="font-size:16px;font-weight:400">
                  <span  @click="setDictCode(v.dictCode)" >{{v.dictName}}</span>
                  <br>
                  <span  @click="setDictCode(i.dictCode)" class="thirdType" v-if="v.kids.length>0" v-for="i in v.kids" :key="i.id" style="font-size:12px;font-weight:250">
                      {{i.dictName}} |
                  </span>
                </div>
              </div>
            </n-popover>
          </n-list-item>
        </n-list>
      </div>
      <div class="third"></div>
      <div class="second">
         <div style="width:100%; background: #FFF;">
          <div style="min-height:35px;line-height:35px;border-bottom:1px dashed black;width:98%;margin:auto">
            排序 <n-radio-group v-model:value="newOrHeartV" name="radiobuttongroup" @update:value="newOrHeartC">
                    <n-space>
                      <n-radio-button
                        size="small"
                        v-for="item in newOrHeart"
                        :key="item.value"
                        :value="item.value"
                      >
                       <span  v-if="item.value == `sj`" @click.stop="newOrHeartC">{{ item.name }}   
                        <nw-icon
                          :name="(fromData.isNew==2)?`icon-shengjiangxu-shengxu-copy1` : 'icon-shengjiangxu-shengxu-copy11'"
                          :size="12"
                          style="cursor: pointer"
                        />
                      </span>
                       <span v-else>{{ item.name }}  </span>
                      </n-radio-button>
                    </n-space>
                  </n-radio-group>

                  <div style="float:right;">
                    <vxe-input v-model="fromData.lessonName" size="mini"  placeholder="输入名称查询" @input="getInformData"></vxe-input>
                  </div>
           </div>
           <div class="tag" style="width:98%;margin:auto">
                <div @click.stop class="tagTop" :style="`overflow: hidden;${isShow?'':'height:30px'}`">
                   <n-scrollbar style="max-height: 120px" trigger="none">
                      <span style="float:right;position:relative;top:5px" v-if="!isShow" @click="showMore">更多</span>
                      <span style="float:right;position:relative;top:5px" v-if="isShow" @click="showMore">收起</span>
                        <n-space>
                         标签  
                          <span
                            size="small"
                            :style="`font-weight:bolder;${tagV== item.dictItemCode ? 'color:#3F8FFF' :'color:#333'}`"
                            @click="()=>{
                              tagV= item.dictItemCode; 
                              classTagC()
                            }"
                            v-for="item in (classTag)"
                            :key="item.dictItemCode"
                            :value="item.dictItemCode"
                          >{{ item.dictItemName }}</span>
                      </n-space>
                      
                   </n-scrollbar>
                </div>
             <!-- <n-collapse arrow-placement="right">
              
                <n-collapse-item title="更多 " name="1">
                    <template #header>
                      
                  </template>
                  <template #header-extra v-if="unfoldClassTag.length>0">
                    更多
                  </template>
                  <template #arrow>
                    
                  </template>
                  <div style="line-height:40px">
                    <n-scrollbar style="max-height: 120px" trigger="none">
                      <n-radio-group v-model:value="tagV" name="radiobuttongroup1" @update:value="classTagC">
                        <n-space :size='1'>
                          <n-radio-button
                            size="small"
                            v-for="item in classTag"
                            :key="item.dictItemCode"
                            :value="item.dictItemCode"
                          >{{ item.dictItemName }}</n-radio-button>
                        </n-space>
                      </n-radio-group>
                    </n-scrollbar>
                  </div>
                </n-collapse-item>
              </n-collapse> -->
           </div>
         </div>
        <n-spin :show="spinShow">
          <div style="padding:5px 0" v-if="courseList.length">
         
           <n-grid x-gap="12" y-gap="5" :cols="4" >
                <n-gi v-for="item in courseList" :key="item.id" class="content" @click="()=>{showCourseDetail(item)}">
                  <div class="img" >
                    <img  v-lazy="item.imgUrl" style="width:100%;height:200px;border-radius: 6px;">
                  </div>
                  <div style="height:110px;width:90%;margin:auto">
                    
                      <n-grid :cols="1" style="height:30px;line-height:30px;">
                        <n-gi>
                          <span style="font-size:18px;font-weight:bolder;display:inline-block;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;width:100%" :title="item.lessonName"> {{item.lessonName}}</span>
                        </n-gi>
                      </n-grid>
                      
                     <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <p style="height:20px;line-height:20px">学时：{{item.studyTimeSize}} | 点击量：{{item.hits}} </p>
                       
                        <p style="height:20px;line-height:20px"> 
                          <span style="display:inline-block;width:50%;font-weight:bolder">
                             {{item.isOpen == 0 ? '部分公开' : '全部公开'}}
                          </span>
                           <span style="display:inline-block;width:50%;text-align:right">
                            课件数量：{{item.couSize}}
                          </span>
                          
                        </p>
                       
                     </div>
                   
                  </div>
                  <!-- <a class="title">{{item.lessonName}}</a> -->
                </n-gi>
                
            </n-grid>
          
          <div class="newsPage" v-if="courseList.length">
              <n-pagination
                v-model:page="page"
                :page-count="pageCount"
                :on-update:page="updatePage"
              >
                <template #suffix="{ itemCount }"> 共 {{ total }} 条记录 </template>
              </n-pagination>
            </div>
         </div>
         <div style="width:100%;height:100%;text-align:center;" v-else>
          <div style="position: fixed;left:55%;top:30%">
            <img src="../img/listBlank.jpg"  alt="" width="200" height="200">
            <span style="display:block;padding:10px">暂无数据</span>
            <div style="width:100%;text-align:center;">
                        <n-button
                            tertiary type="info"
                            size="small"
                            style="width:80%"
                            round 
                            @click="getInformData"
                            >刷新页面</n-button
                        >
            </div>
          </div>
          
        </div>
        </n-spin>
      </div>
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
  NTag,
  NList,
  NListItem,
  NPopover,
  NCollapse,
  NCollapseItem,
  NScrollbar
} from 'naive-ui'

import { useRoute, useRouter,RouterLink } from 'vue-router'
import MyClass from './myClass.vue'
import { courseClassification, lessonList, dictItemLists  } from  '../api'
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
    MyClass,
    NList,
    NListItem,
    NPopover,
    NTag,
    NCollapseItem,
    NCollapse,
    NScrollbar
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const courseList = ref([])
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(0)
    const fromData = ref({labelCode:''})
    const tagV = ref('')
    const courseClassifications = ref([])
    const classTag = ref([])
    const unfoldClassTag = ref([])
    const newOrHeartV = ref('')
    const spinShow = ref(false)
    const isShow = ref(false)
    const newOrHeart = ref([
      {value:'zuixin',name:'最新'},
      {value:'zuire',name:'最热'},
       {value:'sj',name:'时间'},
    ])
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
    const showMore = () =>{
     isShow.value = !isShow.value
    }
    
    const updatePage = (p)=>{
      page.value = p
      getInformData()
    }
    const showCourseDetail = (item) =>{
        router.push({
          path: '/videoDetail',
          query:item
        })
    }
    const setDictCode = (code) =>{
       fromData.value.typeCode = code
       getInformData()
    }
    const classTagC = () =>{
       fromData.value.labelCode = tagV.value
       getInformData()
    }
    const newOrHeartC = () =>{
      if( newOrHeartV.value == 'zuixin'){
         fromData.value.isNew = 1
         fromData.value.isHightHits = ''
      } else if(newOrHeartV.value == 'zuire'){
         fromData.value.isNew = ''
         fromData.value.isHightHits = 1
      } else {
         fromData.value.isHightHits = ''
        fromData.value.isNew = (fromData.value.isNew == 2) ? 1 : 2

      }
       
       getInformData()
    }
    const getInformData = () =>{
        spinShow.value = true
        lessonList({page: {current: page.value, size: 8,},...fromData.value}).then((res)=>{
           courseList.value = res.records
           total.value = res.total
           pageCount.value = res.pages
           spinShow.value = false
        }).finally(()=>{
           spinShow.value = false
        })
        
    }
      //计算中文字符长度
    const checksum = (chars) =>{
      
    
      var fuhao=['，','。','；','！','：','【','】','…','？','“','”','—','·' ,'、','《' ,'》' ,'（','）' ,'￥','＠' ];//一些中文符号
      var fuhao_code=[];
      for(var j=0;j<fuhao.length;j++){
        //console.log('---##--' , fuhao[j].charCodeAt(0)  );
        fuhao_code.push(fuhao[j].charCodeAt(0));
      }
        
      var sum = 0;
      for (var i=0; i<chars.length; i++){
        var c = chars.charCodeAt(i);
        //console.log('---c---' , c);
        if ((c>=0x0001 && c<=0x007e) || (0xff60<=c && c<=0xff9f)){ 
          //sum++;
          //一些数字、字母、英文符号等
        }else if( fuhao_code.indexOf(c) >= 0  ){
          //一些中文符号
        }else{
          sum+=2;
        }
      }
    
      return sum/2;
    }
    onMounted(()=>{
      getInformData()
       courseClassification('lesson').then((r)=>{
          courseClassifications.value = r
       })
       dictItemLists('STUDY_COURSE_TYPE').then((r)=>{
         classTag.value = [{dictItemCode:'',dictItemName:'全部'}].concat(r)
        //  // 获取字符个数
        //  let num = 0
        //  r.map((d,i)=>{
        //    num = num + checksum(d.dictItemName)
        //   if(num < 45){
        //     classTag.value.push(d)
        //   } else {
        //     unfoldClassTag.value.push(d)
        //   }
        //  })
        //  classTag.value = [{dictItemCode:'',dictItemName:'全部'}].concat(classTag.value)
       })
    })
    return {
      activeKey:ref('myClass'),
      router,
      setDictCode,
      route,
      menuOptions,
      courseClassifications,
      courseList,
       page,
      total,
      pageCount,
      updatePage,
      getInformData,
      fromData,
      tagV,
      classTag,
      showMore,
      isShow,
      unfoldClassTag,
      checksum,
      newOrHeartV,
      newOrHeart,
      newOrHeartC,
      classTagC,
      showCourseDetail,
      spinShow
    };
  }
});
</script>
<style lang="less" scoped>
  /deep/ .n-list__header{
    border-radius: 6px 6px 0 0;
    background-color: #0084CF;
  }
  /deep/ .n-list{
    margin: 0;
  }
  /deep/ .n-radio-group .n-radio-button:not(.n-radio-button--disabled){
    border: none;
    font-weight: bolder;
  }
  /deep/ .n-radio-button__state-border{
    box-shadow: none;
    display: none;
  }
  .tagTop{
    /deep/ .n-radio-group .n-radio-button{
      padding:0 8px
    }
  }
  .secondType{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    word-break: normal;
    text-indent: 0;
    span {
      cursor: pointer;
      padding: 5px;
      border-radius: 14px;
    }
  }
 .personalBorder {
    background: #efefef;
    padding: 10px;
    min-height:  calc(~"100vh - 84px");
    .personalMessage {
        width: 80%;
        margin: auto;
        display: flex;
       .first {
           text-align: center;
           width: 300px;
            height: 100%;
            background: #FFF;
            #courseTime{
             cursor: pointer;
             color: white;
              font-size: 14px;
              vertical-align: bottom;
            }
           
       }
       .third {
          width: 20px;
          height: 100%;
           background: #efefef;
       }
       .second{
           flex: 1;
            cursor: pointer;
            // background: #FFF;
           .content{
             background: #FFF;
             border-radius:6px;
            //  padding: 3px;
            
           }
          .tag{
             display: flex;
             min-height:35px;
             line-height:35px;
             width:100%;
             div{
               display:inline-block
             }
             /deep/.n-collapse .n-collapse-item:first-child{
               width:100%
             }
            //  .tag1{
            //    flex: 1;
            //  }
            //  .tag2{
            //    width: 50px;
            //  }
           }
            .newsPage {
              height: 60px;
              width: 100%;
            .n-pagination {
                position: relative;
                top: 15px;
                left: 47%;
            }
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