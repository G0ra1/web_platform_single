<template>
  <div class="allNewsBorder">
    <div class="newsCategory">
        类别：<n-tag :type="tagCategoryV==item.dictItemName ? 'success' : 'info'" class="tagCategory" @click="tagCategoryClick(item)"  v-for="item in newsCategorys" :key="item.dictItemCode">{{item.dictItemName}} </n-tag>
    </div>
    <div class="newsContent">
       <n-grid  class="newsCard" v-for="item in notices" :key="item.id">
          <n-gi  :span="4" style="margin: auto;">
              <n-image
                    width="100"
                    height='100'
                    lazy
                    :src="item.newsPhotoUrl"
                />
          </n-gi>
          <n-gi  :span="20" >
               <div class="newsTitile"  @click="showDetail(item)">
                    <h2>{{item.newsTitle}}</h2>
                </div>
                <div class="newsMessage">
                    <span class="wenben1"><NwIcon name="icon-shijian" class="iconbtn drag-btn" size="20" />发布时间:{{item.createTime? item.createTime.slice(0,10) : ''}}</span>
                    <span class="wenben"><NwIcon name="icon-zuozhe" class="iconbtn drag-btn" size="20" />作者:{{item.createUserName}}</span>
                    <span class="wenben"><NwIcon name="icon-liulanliang" class="iconbtn drag-btn" size="20" />浏览数:{{item.newsBrowse}}</span>
                    <span class="wenben">类别:{{item.newsTypeName}}</span>
                </div>
          </n-gi>
       </n-grid>
    </div>
     <div class="newsPage">
      <n-pagination
        v-model:page="page"
        :page-count="pageCount"
        :on-update:page="updatePage"
      >
        <template #suffix="{ itemCount }"> 共 {{ total }} 条记录 </template>
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
  NTag,
  NImage
} from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'
import { studyNewsList,dictItemLists } from '../../inform/api'
import { upHits } from '../api'

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
    const notices = ref({})
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(0)
    const newsCategorys = ref([])
    const tagCategoryV = ref('')
    const updatePage = (p)=>{
      page.value = p
      getInformData()
    }
    const tagCategoryClick  = (item)=>{
         tagCategoryV.value = item.dictItemName
          getInformData(item.dictItemCode)
    }
    const getInformData = (newsType) =>{
        studyNewsList({page: {current: page.value, size: 5,},newsType}).then((res)=>{
           notices.value = res.records
           total.value = res.total
           pageCount.value = res.pages
        })
        
    }
    const showDetail = (item) =>{
        upHits(item.id)
        router.push({
          path: '/newsDetail',
          query: item

        })
    }
    onMounted(()=>{
       getInformData('0')
       dictItemLists('Study_news_Type').then((r)=>{
          newsCategorys.value = [{dictItemName:'全部',dictItemCode:'0'}].concat(r)
           tagCategoryV.value = '全部'
        })
    })
    return {
      page,
      total,
      pageCount,
      showDetail,
      router,
      route,
      notices,
      updatePage,
      tagCategoryV,
      newsCategorys,
      tagCategoryClick
    };
  }
});
</script>
<style lang="less" scoped>
 .allNewsBorder {
    height: calc(~"100vh - 80px"); 
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .newsCategory{
        height: 80px;
        line-height: 80px;
        margin-bottom: 10px;
        font-size: 12px;
       .tagCategory{
           margin: 0 3px;
           cursor: pointer;
       }
    }
    .newsContent{
        flex: 1;
        margin-bottom: 10px;
        .newsCard{
          height:20%;
          border-bottom:1px  dashed #dedede;
        
          .newsTitile:hover{
            cursor: pointer;
            text-decoration: underline;
            color: #2080f0;
          }
        }
        .wenben1 {
          color:#999;
          font-size: 10px;
        }
        .wenben {
            color:#999;
            font-size: 10px;
             padding: 0 10px;
             
        }
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
</style>