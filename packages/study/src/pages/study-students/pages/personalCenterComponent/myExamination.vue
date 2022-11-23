<template>
  <div class="examBorder">
   <n-spin :show="spinShow">
    <div v-if="formData.length">
        <div class="examContent">
          <div  style="position:fixed;z-index: 1000; width:66%; background: #efefef;height: 35px">
            <vxe-input v-model="formName" style="float:right;width:40%;margin-right:20px" class="my-search" placeholder="输入名称查询">
              <template #suffix>
                  <n-button size="small" type="info" @click="getInformData">
                    搜索
                  </n-button>
              </template>
            </vxe-input>
          </div>
          
          <div class="bodyC" v-if="formData.length">
              <n-card  v-for="(item,index) in formData" :key="item.id" :style="`overflow: hidden;position:relative;width:100%; background: #FFF;${index==0 ? 'margin-top:0px;':'margin-top:5px;'}`" >
                  <div style="display:flex">
                    <div style="flex:1">
                      <span class="header" @click="()=>showDetail(item)">
                          <span style="font-weight: bolder;font-size: 18px;color:#3F8FFF;cursor: pointer;">{{item.paperName}}</span>
                      </span><br>
                      <span class="second2" style="margin:15px 0;display:inline-block">
                          <span style="color: #888;font-size: 15px;">考试时间<span style="color:#333"> {{item.answerEndTime	}}</span></span>
                      </span>
                    </div>
                    <div style="width: 300px;
                          text-align: right;
                          font-size: 18px;
                          color: red;
                          line-height: 70px;
                          font-weight: bolder;
                    ">
                      {{item.paperStatus == 2 ? item.examScore : (item.paperStatus == 0 ? '代提交':'阅卷中')}}
                    </div>
                  </div>
              </n-card>
          </div>
          <div class="examPage" >
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
  
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { getUserExamPage  } from '../../../study-students/api'
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
   
    const getInformData = () =>{
        spinShow.value = true
        getUserExamPage({page: {current: page.value, size: 8,},paperName:formName.value}).then((res)=>{
           formData.value = res.records
           total.value = res.total
           pageCount.value = res.pages
           spinShow.value = false
        })
        
    }
    const showDetail = (item) =>{
        // upHits(item.id)
        router.push({
          path: '/examPaperDetail',
          query: item

        })
    }
    onMounted(()=>{
       getInformData()
       
    })
    return {
      page,
      total,
      pageCount,
      showDetail,
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
      top: 40px;
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