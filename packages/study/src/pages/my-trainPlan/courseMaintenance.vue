<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`课程维护`"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
        <n-card style="height:100%">
           <n-spin :show="spinShow" >
            <n-grid>
                <n-grid-item :span="24">
                  
                    <vxe-table
                        ref="xTable"
                        border
                        auto-resize
                        :data="tableData"
                    >
                        <vxe-column field="lessonName" title="课程名称" ></vxe-column>
                        <vxe-column field="lessonTypeName" title="课程标签" ></vxe-column>
                        <vxe-column field="lessonStatus" title="状态"  >
                          <template v-slot="{ row }">
                             {{[
                                {label:'未审核',value:0},
                                {label:'审核通过',value:1},
                                {label:'审核不通过',value:2},
                                {label:'',value:''},
                              
                              ].filter(d=>d.value == row.lessonStatus)[0].label}}
                          </template>
                        </vxe-column>
                        <vxe-column field="userIsExam" title="是否答卷"  >
                          <template v-slot="{ row }">
                             {{[
                                {label:'未答卷',value:0},
                                {label:'已答卷',value:1},
                                {label:'',value:''},
                              ].filter(d=>d.value == row.userIsExam)[0].label}}
                          </template>
                        </vxe-column>
                        <vxe-column field="" title="操作">
                          <template v-slot="{ row,_rowIndex }">
                            <vxe-button type="text"
                              status="primary"
                                @click="()=>{
                                  if(row.planStatus!==0){
                                    if(row.studyPlanLessonPaper ){
                                      if(row.userIsExam == 0 ){
                                        $refs.testPaperManagement.sonFn({...row,planId})
                                      } else {
                                        message.error('当前试卷已作答，请勿重复考试')
                                      }
                                    } else {
                                      message.error('请提醒讲师,当前课程未关联试卷')
                                    }
                                  } else {
                                    message.error('请提醒讲师,当前培训计划未开始')
                                  }
                                 
                                }"   
                            >开始考试</vxe-button>
                          </template> 
                        </vxe-column>
                    </vxe-table>
                </n-grid-item>
             </n-grid>
          </n-spin>
        </n-card>
        <template #footer>
            <n-button
              size="small"
              style="margin-left:5px"
              @click="showModal = false"
            >关闭</n-button>
        </template>
    </n-drawer-content>
  
     <TestPaperManagement
       ref="testPaperManagement"
       @update:callback="(e) => {
        
          tableData[e.rowIndex].studyPlanLessonPaper = {...e,}
          tableData[e.rowIndex].isExam = 1
           $refs.xTable.loadData(tableData)
      }"
    ></TestPaperManagement>
  </n-drawer>
  
</template>

<script>
  
  import { defineComponent, ref, reactive,onMounted,  } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NCard,
    useMessage
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { studyPlanLessonPaperId,editStudyPlanLesson  } from './api'
  // import { querys  } from '../course-maintenance/api'
  import TestPaperManagement from './testPaperManagement.vue'

  export default defineComponent({
    components: {
      NDrawer,
      NDrawerContent,
      NwTable,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      NInput,
      NwTableFun,
      NForm,
      NFormItem,
      NGrid,
      NGridItem,
      NTreeSelect,
      NSelect,
      NCard,
      TestPaperManagement
    },
     props: {
      
     },
    setup (props,context) {
      const formVisible = ref(false)
      const modelRef  = reactive({})
      const tableData  = ref([])
      const xTable = ref()
      const message = useMessage();
      const spinShow = ref(false);
      const planId = ref('')
      const getTable= (form={}) =>{
        // querys(form).then((res)=>{
        //   drawerV.tableData = res
        // })
      }
      const sonFn = (e) => {
        modelRef.value = e
        planId.value = e.id
        formVisible.value = true
        spinShow.value = true
        tableData.value = []
        studyPlanLessonPaperId(e.id).then((res)=>{
           tableData.value = res ? res :[]
        }).finally(r => {
          
          spinShow.value = false
        })
        
      };

  
   
      onMounted(async () => {
      })
      return {
        getTable,
        spinShow,
        xTable,
        sonFn,
        modelRef, //题库数据
        showModal: formVisible,
        tableData,
        message,
        planId
      
      }
    },
    methods: {
      
    }
  })
</script>

<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
</style>