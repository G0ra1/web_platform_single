<template>
  <div class="personalBorder">
    <div class="personalTitile"></div>
    <div class="personalMessage">
      <n-scrollbar style="min-height: 100%">
        <div class="first" >
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
        <div class="second" >
          <n-spin :show="spinShow">
            <n-collapse arrow-placement="right" title='专题内容' :default-expanded-names="[0,1,2,3,4,5,6,]" v-if="mySpecialList.length">
                <n-collapse-item v-for="(item,index) in mySpecialList" :key="index" :name="index">
                  <template #header>
                          <span style="display:inline-block;height:100%;font-weight:bolder;font-size:18px">
                            {{item.specialName}}
                          </span>
                  </template>
                  <template #header-extra >
                    <span style="margin-right:20px;display:inline-block">{{item.specialStudyTimeSize}}</span>
                  </template>
                  
                  <div >
                      <n-list>
                        <n-list-item v-for="(item1,index) in item.studySpecialLessonList" :key="index" style="cursor: pointer;">
                          <div style="display: flex;height: 40px;line-height: 40px;" class="couH" @click="()=>{showCourseDetail({...item1})}">
                            <span style="flex:1;">
                              <span
                               style="
                                  display: inline-block;
                                  font-size: 12px;
                                  background: rgb(239, 239, 245);
                                  line-height: 20px;
                                  width: 55px;
                                  color: #888;
                                 
                                  border-radius: 12px;
                                  text-align: center;"    
                              >课程</span> 
                              <span style="margin-left: 7px;">[ {{item1.couIsCompulsory == 0 ? '选修':'必修'}} ]</span>
                              <span style="margin-left: 7px;">{{item1.lessonName}}</span>
                            </span>
                            <span >
                                进入学习
                            </span>
                          </div>
                        </n-list-item>

                      </n-list>
                  </div>
                </n-collapse-item>
            </n-collapse>
          
          <div style="width:100%;height:100%;text-align:center;" v-else>
              <div style="position: fixed;left:50%;top:40%">
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
  NList,
  NListItem,
  NTag,
  NPopover,
  NCollapse,
  NCollapseItem,
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { courseClassification, mySpecial } from  '../api'


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
    NScrollbar,
    NTag,
    NList,
    NListItem,
    NPopover,
    NCollapse,
    NCollapseItem,
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const formData  = ref({})
    const mySpecialList = ref([])
    const spinShow = ref(false)
    const courseClassifications = ref([])
    const setDictCode = (code) =>{
       formData.value.typeCode = code
       getInformData()
    }
    const getInformData = () =>{
       spinShow.value = true
        mySpecial({...formData.value}).then((res)=>{
           mySpecialList.value = res.mySpecialList ? res.mySpecialList :[]
        
        }).finally(()=>{
           spinShow.value = false
        })
        
    }
    const showCourseDetail = (item) =>{
        router.push({
          path: '/specialVideoDetail',
          query:{...item,}
        })
    }
    onMounted(()=>{
       courseClassification('plan').then((r)=>{
          courseClassifications.value = r
       })
       getInformData()
    })
    return {
     
      router,
      route,
      formData,
      getInformData,
      mySpecialList,
      setDictCode,
      courseClassifications,
      showCourseDetail,
      spinShow,
    };
  }
});
</script>
<style lang="less" scoped>
  /deep/ .n-list{
    margin: 0;
  }
  .couH:hover{
    color: #1890ff;
  }
 .personalBorder {
    min-height: calc(~"100vh - 65px"); 
    background: #efefef;
    
     padding: 0px;
    .personalTitile{
        width: 100%;
        margin: auto;
        background:#fff;
        height: 200px;
        position: fixed;
        // text-align: center;
        margin-bottom: 10px;
        margin-top: 10px;
        background-image: url('../img/subject_banner.jpg') !important;
       
    }
    .personalMessage {
         position: relative;
         top: 220px;
        width: 80%;
        margin: auto;
        display: flex;
         height: calc(~"100vh - 285px"); 
         
         
       .first {
           width: 13%;
           text-align: center;
            position: fixed;
            background: #FFF;
            min-height:200px;
          
             /deep/ .n-list__header{
              border-radius: 6px 6px 0 0;
              background-color: #0084CF;
            }
          #courseTime{
            cursor: pointer;
            color: white;
            font-size: 14px;
            vertical-align: bottom;
          }
       }
       .second{
            position: relative;
            display: inline-block;
            left: 18%;
            width: 82%;
            background: #FFF;
            /deep/ .n-collapse .n-collapse-item.n-collapse-item--active .n-collapse-item__header.n-collapse-item__header--active .n-collapse-item-arrow{
              position: absolute;
              right: 0;
            }
            /deep/ .n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item-arrow{
              position: absolute;
              right: 0;
            }
            /deep/ .n-collapse .n-collapse-item:first-child{
              margin: 16px 0 0 0;
              padding-top: 16px
            }
            /deep/ .n-collapse .n-collapse-item{
              padding:0 16px;
            }
            /deep/ .n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner{
              padding-top: 0;
            }
            /deep/ .n-list .n-list-item{
              padding: 1px 0;
            }
            /deep/ .n-list .n-list-item:not(:last-child){
              border-bottom:1px dashed var(--n-merged-border-color)
            }
           
       }
       
    }
   
  }
</style>