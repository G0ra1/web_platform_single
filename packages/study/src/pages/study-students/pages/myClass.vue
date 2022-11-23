<template>
  <div class="myClassBorder">
    <div  class="top">
        <n-tabs type="line" animated>
            <n-tab-pane name="全部" tab="全部"></n-tab-pane>
            <n-tab-pane name="the beatles" tab="未开始"></n-tab-pane>
            <n-tab-pane name="jay chou" tab="学习中"></n-tab-pane>
            <n-tab-pane name="jay chou" tab="已完成"></n-tab-pane>
        </n-tabs>
    </div>
    <div class="content">
       <n-grid  class="newsCard" >
          <n-gi  :span="3" style="margin: auto;">
              <n-image
                    width="100"
                    height='100'
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
          </n-gi>
          <n-gi  :span="15" >
               <div class="newsTitile" >
                    <h2>前端视频测试专用</h2>
                </div>
                <div class="newsMessage">
                    <span class="wenben1"><NwIcon name="icon-shijian" class="iconbtn drag-btn" size="20" />上次学习时间:2022-3-31 20:09</span> |
                    <span class="wenben"><NwIcon name="icon-zuozhe" class="iconbtn drag-btn" size="20" />作者:admin</span>
                </div>
          </n-gi>
           <n-gi  :span="6" style="text-align:center">
            <n-button type="info" round @click="showCourseDetail()">继续学习</n-button>
           </n-gi>
       </n-grid>
    </div>
    
    <div class="bottom">
      <n-pagination
        v-model:page="page"
        :page-count="pageCount"
        :on-update:page="updatePage"
      >
        <template #suffix="{ itemCount }"> 共 {{ 1 }} 条记录 </template>
      </n-pagination>
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
  NTabs,
  NTabPane,
  NImage

} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'

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
    NTabs,
    NTabPane,
    NImage
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const newsDetail = ref({})
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(0)
    const showCourseDetail = (item) =>{
        router.push({
          path: '/videoDetail',
        })
    }
    onMounted(()=>{
       newsDetail.value=route.query
    })
    return {
      showCourseDetail,
      router,
      route,
      newsDetail,
      page,
      total,
      pageCount,
    };
  }
});
</script>
<style lang="less" scoped>
 .myClassBorder {
   height: 100%;
   display: flex;
   padding:0 5px;
   flex-direction: column;
    .top{
        height: 50px;
        width: 100%;
    }
    .content{
        flex: 1;
        width: 100%;
        // border: 1px solid red;
        .newsCard{
          height:20%;
          border-bottom:1px  dashed #dedede;
        
          .newsTitile:hover{
            cursor: pointer;
            text-decoration: underline;
            color: #2080f0;
          }
        }
    }
    .bottom{
        height: 60px;
         .n-pagination {
          position: relative;
          top: 15px;
          left: 47%;
      }
    }
    
    
   
  }
</style>