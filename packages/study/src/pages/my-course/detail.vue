<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      style="z-index:1001"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`课件列表`"
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
              :data="[{sourceName:'test',typeName:'test',size:'20k',paperType:'4'}]"
             
              :loading="tableLoading"
            >
             <vxe-table-column
                field="sourceName"
                title="课件名称"
               
              ></vxe-table-column>
              <vxe-table-column
                field="typeName"
                title="课件分类"
               
              >
              </vxe-table-column>
              <vxe-table-column
                field="size"
                title="课件大小"
              >
              </vxe-table-column>
              <vxe-table-column
                field="paperType"
                title="课件类型"
              >
                  <template #default="{  row }">
                      <span>
                        {{ (row.paperType==0 || row.paperType) ? [
                          {label:'文档',value:0},
                          {label:'图文类型课件',value:1},
                          {label:'图片',value:2},
                          {label:'音频',value:3},
                          {label:'视频',value:4},
                          {label:'链接',value:5},
                        ].filter(d=>d.value == row.paperType)[0].label : ''
                        }}
                    </span>
                      </template>
              </vxe-table-column>
            
              <vxe-table-column
                title="操作"
                align="center"
              >
                <template v-slot="{ row }">
                  <vxe-button type="text" size='small' status="primary" @click="isShowVideo = true" content="查看"></vxe-button>
                </template>
              </vxe-table-column>
            </vxe-table>
        </n-card>
         <n-modal v-model:show="isShowVideo">
            <video :src="vUrl" autoplay controls="controls" style="width: 80%;height: 600px" >
        </video>
    </n-modal>
      <template #footer>
          <n-button
            size="small"
            @click="close"
          >关闭</n-button>
      </template>
    </n-drawer-content>
    <!-- <TestPaperManagement ref="testPaperManagement"   @update:callback="() => {
        $refs.nwTable.commitQuery()
        $refs.nwTable.clearSelected()
    }"></TestPaperManagement> -->
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
    useMessage,
    NModal,
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import {   } from './api'
//   import TestPaperManagement from "./testPaperManagement.vue";
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
      NModal
    //   TestPaperManagement
    },
     props: {
     
     },
    setup (props,context) {
      const formVisible = ref(false)
      const tableLoading = ref(false)
      const isShowVideo = ref(false)
      const model = reactive({tableV:[]})
      const tableV = reactive({})
      const xTable = ref()
      const data = reactive({})
      const testPaperManagement = ref()
      const vUrl = ref('')
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
        // tableLoading.value = true
        //  studyteachersDetail({
        //    lessonPaperId
        //   }).then((res)=>{
        //     model.tableV = res.records
        //     tableLoading.value = false
            
        //   })
         model.tableV = [{sourceName:'test'}]
      }
  
      onMounted(async () => {
        
         
      })
      return {
        xTable,
        showVersionAction,
        versionAction,
        sonFn,
        tableLoading,
        isShowVideo,
        vUrl,
        model, // 表单数据
        showModal: formVisible,
        tableV,
        tablePage,
        testPaperManagement,
        showTestPaperManagement,
        data,
        getTableV,
        handlePlay (item) {
            vUrl.value = '/localFile/2021/12/15/cf96c9da6b3e8be18d1dfd9bf167b0b1.mp4'
            isShowVideo.value = true
        },
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