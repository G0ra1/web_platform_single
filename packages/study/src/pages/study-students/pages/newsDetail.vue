<template>
  <div class="newsBorder">
    <div class="newsTitile">
       <h2>{{newsDetail.newsTitle}}</h2>
    </div>
    <div class="newsMessage">
       <span><NwIcon name="icon-shijian" class="iconbtn drag-btn" size="20" />发布时间:{{newsDetail.createTime? newsDetail.createTime.slice(0,10) : ''}}</span>
       <span><NwIcon name="icon-zuozhe" class="iconbtn drag-btn" size="20" />作者:{{newsDetail.createUserName}}</span>
       <span><NwIcon name="icon-liulanliang" class="iconbtn drag-btn" size="20" />浏览数:{{newsDetail.newsBrowse}}</span>
       <span>类别:{{newsDetail.newsTypeName}}</span>
       <n-divider />
    </div>
     <div class="newsDetail">
       <span>{{newsDetail.newsDetail}}</span>
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
  NDivider
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
    NDivider
  },
  setup(props,context) {
    const router = useRouter()
    const route = useRoute()
    const newsDetail = ref({})
    
    onMounted(()=>{
       newsDetail.value=route.query
    })
    return {
      
      router,
      route,
      newsDetail
    };
  }
});
</script>
<style lang="less" scoped>
 .newsBorder {
    height: calc(~"100vh - 80px"); 
    background: #fff;
    display: flex;
    flex-direction: column;
     padding: 10px;
    .newsTitile{
       
        height: 50px;
        text-align: center;
        margin-bottom: 10px;
    }
    .newsMessage{
        height: 30px;
        text-align: center;
        margin-bottom: 10px;
        color:#999;
        font-size: 10px;
       span{
           padding: 0 10px;
       }
    }
    .newsDetail {
        flex: 1;
        margin: 10px 0;
        text-indent:25px;
        font-size: 14px;
    }
   
  }
</style>