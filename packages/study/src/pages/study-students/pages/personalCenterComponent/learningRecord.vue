<template>
  <div class="examBorder">
    <n-spin :show="spinShow">
      <div v-if="formData.length">
          <div class="examContent">
            <div  style="position:fixed;z-index: 1000; width:66%; background: #efefef;height: 35px">
              <n-radio-group v-model:value="tagCategoryV" @update:value="(v)=>
               {
                 formName = '',
                 getInformData()
               }
              "   name="radiobuttongroup1" >
                <n-space>
                    <n-radio-button
                        size="small"
                        v-for="item in [{value:'',label:'全部'},{value:1,label:'学习中'},{value:2,label:'已完成'}]"
                        :key="item.value"
                        :value="item.value"
                    >{{ item.label }}</n-radio-button>
                </n-space>
              </n-radio-group>
              <div style="float:right;width:40%;margin-right:20px;display:flex">
                  <n-dropdown
                      style="width:60px;margin-right:50px"
                      trigger="hover"
                      :options="[
                        {
                          label: '全部',
                          key: '',
                          props: {
                            onClick: () => {
                              getInformData('')
                            }
                          }
                        },
                        {
                          label: '专题',
                          key: 1,
                          props: {
                            onClick: () => {
                               getInformData(1)
                            }
                          }
                        },
                        {
                          label: '课程',
                          key: 0,
                          props: {
                            onClick: () => {
                              getInformData(0)
                            }
                          }
                        }
                      ]"
                      placement="bottom-end"
                    >
                        <n-button
                          ghost
                          style="background: #fff; color: #000; margin-left: 5px"
                          size="small"
                        
                        >
                          <template #icon>
                            <nw-icon name="icon-gaojichaxuntubiao" :size="18" />
                          </template>类型
                        </n-button>
                    </n-dropdown>
                    <vxe-input v-model="formName" style="flex:1"  class="my-search" placeholder="输入名称查询">
                      <template #suffix>
                          <n-button size="small" type="info" @click="()=>{getInformData('')}">
                            搜索
                          </n-button>
                      </template>
                    </vxe-input>
              </div>
            </div>
            <div class="bodyC">
                <n-card  v-for="(item,index) in formData" :key="item.id" :style="`overflow: hidden;position:relative;width:100%; background: #FFF;${index==0 ? 'margin-top:0px;':'margin-top:5px;'}`" >
                  <div style="display:flex">
                     <div style="width:200px;height:120px;position: relative;">
                        <div  style="height: 30px;
                          background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
                          position: absolute;
                          bottom: 5px;
                          left: 7px;
                          width: 40px;
                          line-height: 30px;
                          text-align:center;
                          border-radius: 12px;
                          color:#FFF
                      }">
                         {{item.specialId ? '专题' : '课程'}}
                        </div>
                        <img :src="item.imgUrl" style="width:100%;height:100%;">
                     </div>
                     <div style="flex:1;margin-left:5px;display:flex">
                        <div style="flex:1">
                          <span style="font-weight: bold;font-size: 18px;color:#888;">{{item.couName}}</span><br>
                          <span style="color: #888;font-size: 15px;display:inline-block;margin:10px 0">来源:<span style="color:#333;padding-left:10px"><span v-if="item.specialName"> {{item.specialName}} -</span> {{item.lessonName}}</span></span>
                          <span style="margin:0 4px">|</span>
                          <span style="color: #888;font-size: 15px;" >上次学习时间： <span style="color:#333;"> {{item.lastStudyTime}} </span></span>
                          <span class="jianjie" style="color: #888;font-size: 15px;" :title="item.description">简介：<span style="color:#333">{{item.description}}</span></span>
                        </div>
                        <div style="display: flex;padding-top:40px">
                          <div style="display:inline-block;width:150px">
                             <n-progress type="line" :percentage="item.studyCouRate" />
                             <!-- <span>3分10秒</span> -->
                             <span>{{item.cumulativeStudyTimeSize}}</span>
                          </div>
                          <div  style="display:inline-block">
                            <n-button type="info" round @click="()=>{
                          if(item.specialId){
                              router.push({
                                  path: '/specialVideoDetail',
                                  query:item
                              })
                          } else {
                              router.push({
                                  path: '/videoDetail',
                                  query:{...item,id:item.lessonId}
                              })
                          }
                          
                          }">
                              继续学习
                            </n-button>
                          </div>
                        </div>
                     </div>
                  </div>
                 
                </n-card>
            </div>
            <div class="examPage">
              <n-pagination
                v-model:page="page"
                :page-count="pageCount"
                :on-update:page="updatePage"
              >
                <template #suffix="{ itemCount }"> 共 {{ total }} 条记录 </template>
              </n-pagination>
            </div>
          </div>
      </div>
      <div style="width:100%;height:100%;text-align:center;" v-else>
        <div style="position: fixed;left:50%;top:45%">
          <img src="../../img/listBlank.jpg"  alt="" width="250" height="260">
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
  NTag,
  NImage,
  NProgress,
  NDropdown
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { getUserRecords  } from '../../../study-students/api'
export default defineComponent({
  components: {
    NSpace,
    NRadioGroup,
    NRadioButton,
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
    NTag,
    NImage,
    NPagination,
    NProgress,
    NDropdown
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const formData = ref([])
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(0)
    const newsCategorys = ref([])
    const tagCategoryV = ref('')
    const formName = ref('')
    const spinShow = ref(false)
    const updatePage = (p)=>{
      page.value = p
      getInformData()
    }
   
    const getInformData = (v='') =>{
      spinShow.value = true
      getUserRecords({page: {current: page.value, size: 8,},targetType:v,couName:formName.value,studyType:tagCategoryV.value}).then((res)=>{
          formData.value = res.records
          total.value = res.total
          pageCount.value = res.pages
          spinShow.value = false
          // percentageRef.value = Math.round(res.studyCouSize / res.couSize) ? Math.round(res.studyCouSize / res.couSize) : 0
      }).finally(() => {
          spinShow.value = false
      });
        
    }
 
    onMounted(()=>{
       getInformData()
       
    })
    return {
      page,
      total,
      pageCount,
      router,
      route,
      updatePage,
      tagCategoryV,
      newsCategorys,
      formData,
      formName,
      getInformData,
      spinShow
    };
  }
});
</script>
<style lang="less" scoped>
.examBorder { 
   height: calc(~"100vh - 290px"); 
  background: #efefef;
  display: flex;
  flex-direction: column;
   position: relative;
  .examContent{
    flex: 1;
     height: 100%;
    .bodyC{
      display: flex;
      flex-direction: column;
      position: relative;
      top: 39px;
      .jianjie{
            width: 93%;
            display: inline-block;
            /* white-space: nowrap; */
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
      }
    }
  }
   .examPage{
      width: 100%;
      .n-pagination {
          position: relative;
          top: 43px;
          left: 37%;
      }
   }
 }
    
</style>