<template>
    <n-drawer
      v-model:show="showModal"
      width="70%"
      :height="200"
      placement="right"
      style="z-index:1001"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`试卷列表详情`"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
        <n-card style="height:calc(100% - 9px)" size='small'>
            <vxe-table
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              :data="model.tableV"
             
              :loading="tableLoading"
            >
             <vxe-table-column
                field="paperName"
                title="试卷名称"
               
              ></vxe-table-column>
              <vxe-table-column
                field="paperType"
                title="试卷类型"
               
              >
                 <template v-slot="{ row }">
                    {{  [
                          { label: '练习题', value: 0},
                          { label: '考试题', value: 1},
                        ].filter(d=>d.value == row.paperType)[0].label
                    }}
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="paperType"
                title="状态"
              >
                 <template v-slot="{ row }">
                    {{row.status ? [
                          { label: '未答卷', value: 0},
                          { label: '未判分', value: 1},
                          { label: '已判分', value: 2},
                          { label: '', value: ''}
                        ].filter(d=>d.value == row.status)[0].label : ''}}
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="paperType"
                title="出题类型"
              >
                  <template #default="{  row }">
                        {{[
                         {label:'固定试卷',value:0},
                          {label:'随机试卷',value:1},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.paperCode)[0].label}}
                      </template>
              </vxe-table-column>
               <vxe-table-column
                field="paperTotalScore"
                title="试卷总分"
               
              ></vxe-table-column>
               <vxe-table-column
                field="userName"
                title="学员账号"
               
              ></vxe-table-column>
               <vxe-table-column
                field="userNameCh"
                title="学员姓名"
               
              ></vxe-table-column>
               <vxe-table-column
                field="userGetPaperScore"
                title="分数"
               
              ></vxe-table-column>
              <vxe-table-column
                title="操作"
                align="center"
              >
                <template v-slot="{ row }">
                  <vxe-button type="text" size='small' status="primary" @click="showTestPaperManagement(row)" content="阅卷"></vxe-button>
                </template>
              </vxe-table-column>
            </vxe-table>
        </n-card>
      <template #footer>
          <n-button
            size="small"
            @click="close"
          >关闭</n-button>
      </template>
    </n-drawer-content>
    <TestPaperManagement ref="testPaperManagement"   @update:callback="() => {
        $refs.nwTable.commitQuery()
        $refs.nwTable.clearSelected()
    }"></TestPaperManagement>
  </n-drawer>
</template>
<script lang="jsx">
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
    NDatePicker,
    useMessage
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { studyteachersDetail,   } from './api'
  import TestPaperManagement from "./testPaperManagement.vue";
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
      NDatePicker,
      TestPaperManagement
    },
     props: {
     
     },
    setup (props,context) {
      const formVisible = ref(false)
      const tableLoading = ref(false)
      const model = reactive({tableV:[]})
      const tableV = reactive({})
      const xTable = ref()
      const data = reactive({})
      const testPaperManagement = ref()
      const message = useMessage();
      const showVersionAction = (data) => {
        versionAction.value.sonFn(data)
      }
      const versionAction = ref()
      const showTestPaperManagement = (e) => {
          testPaperManagement.value.sonFn(e);  
      
      }
      const tablePage = reactive({
            total: 0,
            currentPage: 1,
            pageSize: 10,
            align: "left",
            pageSizes: [10, 20, 50, 100, 200, 500],
            layouts: [
            "Sizes",
            "PrevJump",
            "PrevPage",
            "Number",
            "NextPage",
            "NextJump",
            "FullJump",
            "Total",
            ],
            perfect: true,
        })
      const sonFn = (e) => {
        formVisible.value = true
        data.lessonPaperId = e
        getTableV(e.lessonPaperId)
      };
      const getTableV = (lessonPaperId)=>{
        tableLoading.value = true
         studyteachersDetail({
           lessonPaperId
          }).then((res)=>{
            model.tableV = res.records
            tableLoading.value = false
            
          })
      }
  
      onMounted(async () => {
        
         
      })
      return {
        xTable,
        showVersionAction,
        versionAction,
        sonFn,
        tableLoading,
        model, // 表单数据
        showModal: formVisible,
        tableV,
        tablePage,
        testPaperManagement,
        showTestPaperManagement,
        data,
        getTableV,
        
        close(){
          formVisible.value = false
        }
      }
    },
    methods: {
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      },
      
    }
  })
</script>
<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
</style>