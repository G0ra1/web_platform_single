<template>
  <div class="examBorder">
    <n-spin :show="spinShow">
        <div class="examContent" >
          <div  style="position:fixed;z-index: 1000; width:66%; background: #efefef;height: 35px">
              <n-radio-group @update:value="()=>formName = ''" v-model:value="tagCategoryV"  name="radiobuttongroup1" >
                    <n-space>
                        <n-radio-button
                            size="small"
                            v-for="item in [{value:'ke',label:'课程'},{value:'zhuan',label:'专题'}]"
                            :key="item.value"
                            :value="item.value"
                        >{{ item.label }}</n-radio-button>
                    </n-space>
                </n-radio-group>

                <vxe-input v-model="formName" style="float:right;width:40%;margin-right:20px" class="my-search" placeholder="输入名称查询">
                  <template #suffix>
                      <n-button size="small" type="info" 
                      @click="()=>{
                        tagCategoryV =='ke' ? getInformData() : getInformDataZ()
                      }"
                      >
                        搜索
                      </n-button>
                  </template>
                </vxe-input>
          </div>
          <div v-if="tagCategoryV =='ke' && formData.length" class="bodyC" >
              <n-card  v-for="(item,index) in formData" :key="item.id" :style="`cursor: pointer;overflow: hidden;position:relative;width:100%; background: #FFF;${index==0 ? 'margin-top:0px;':'margin-top:5px;'}`" >
                      <span   @click="()=>{
                          router.push({
                            path: '/videoDetail',
                            query:item
                          })
                        }"
                        style="font-weight: bolder;font-size: 18px;color:#3F8FFF;">{{item.lessonName}}</span><br>
                      <span style="color: #888;font-size: 15px;display:inline-block;margin:10px 0">学时：<span style="color:#333"> {{item.lessonStudyTime 	}}</span></span>
                      <span style="margin-left:40px;color: #888;font-size: 15px;" >共 <span style="color:#333;"> {{item.couSize }} </span>  节</span> <br>
                      <span class="jianjie" :title="item.description">简介：{{item.description}}</span>
              </n-card>
              <div style=" position: relative;left:50%;top:10px">
                <n-pagination
                  v-model:page="page"
                  :page-count="pageCount"
                  :on-update:page="updatePage"
                >
                  <template #suffix="{ itemCount }"> 共 {{ total }} 条记录 </template>
                </n-pagination>
              </div>
          </div>
          <div style="width:100%;height:100%;text-align:center;" v-if="tagCategoryV =='ke' && !formData.length">
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
          <div v-if="tagCategoryV =='zhuan' && formDataZ.length" class="bodyC" >
                <n-card  v-for="(item,index) in formDataZ" :key="item.id" :style="`cursor: pointer;overflow: hidden;position:relative;width:100%; background: #FFF;${index==0 ? 'margin-top:0px;':'margin-top:5px;'}`" >
                    <span @click="()=>{
                        router.push({
                          path: '/specialDetail', 
                          query: item
                        })
                      }" style="font-weight: bolder;font-size: 18px;color:#3F8FFF;">{{item.specialName}}</span><br>
                    <span style="color: #888;font-size: 15px;display:inline-block;margin:10px 0">学时：<span style="color:#333"> {{item.studyTimeText	}}</span></span>
                    <span style="margin-left:40px;color: #888;font-size: 15px;" >共 <span style="color:#333;"> {{item.lessCount}} </span>  节</span> <br>
                    <span class="jianjie" :title="item.description">简介：{{item.description}}</span>
                </n-card>
                <div style="position: relative;left:50%;top:10px" >
              
                  <n-pagination
                    v-model:page="pageZ"
                    :page-count="pageCountZ"
                    :on-update:page="updatePageZ"
                  >
                    <template #suffix="{ itemCount }"> 共 {{ totalZ }} 条记录 </template>
                  </n-pagination>
                </div> 
            </div>
            <div style="width:100%;height:100%;text-align:center;" v-if="tagCategoryV =='zhuan' && !formDataZ.length">
              <div style="position: fixed;left:50%;top:45%">
                <img src="../../img/listBlank.jpg"  alt="" width="250" height="260">
                <span style="display:block;padding:10px">暂无数据</span>
                <div style="width:100%;text-align:center;">
                            <n-button
                                tertiary type="info"
                                size="small"
                                style="width:80%"
                                round 
                                @click="updatePageZ"
                                >刷新页面</n-button
                            >
                    </div>
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
import { getLessonPage , getSpecialPage } from '../../../study-students/api'
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
    const formDataZ = ref([])
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(1)

    const pageZ = ref(1)
    const totalZ = ref(0)
    const pageCountZ = ref(1)
    const newsCategorys = ref([])
    const tagCategoryV = ref('ke')
    const formName = ref('')
    const spinShow = ref(false)

    const updatePage = (p)=>{
      page.value = p
      getInformData()
    } 
     const updatePageZ = (p)=>{
      pageZ.value = p
      getInformDataZ()
    }
    const getInformData = () =>{
      spinShow.value = true
        getLessonPage({page: {current: page.value, size: 8,},collectionName:formName.value}).then((res)=>{
           formData.value = res.records
           total.value = res.total
           pageCount.value = res.pages
           spinShow.value = false
        })
        
    }
    const getInformDataZ = () =>{
      spinShow.value = true
        getSpecialPage({page: {current: pageZ.value, size: 8,},collectionName:formName.value}).then((res)=>{
           formDataZ.value = res.records
           totalZ.value = res.total
           pageCountZ.value =res.pages
           spinShow.value = false
        })
        
    }
    
    onMounted(()=>{
       getInformData()
       getInformDataZ()
       
    })
    return {
      page,
      total,
      pageCount,
      updatePageZ,
      pageZ,
      totalZ,
      pageCountZ,
      router,
      route,
      updatePage,
      getInformData,
      getInformDataZ,
      tagCategoryV,
      newsCategorys,
      formData,
      formDataZ,
      formName,
      spinShow,
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