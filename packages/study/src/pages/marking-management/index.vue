<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>阅卷管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable
        ref="nwTable"
        :columns="columns"
        :data="null"
        :request="request"
        :response="response"
        :searchFormFields="[
          {
            field: 'roleName',
            title: 'name',
            valueFormat: (d) => d,
          },
        ]"
      >
        <template v-slot:header-left="{ selected }">
        
        </template>
        <template #header-right>
         
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
           <n-form :model="searchFormData">
            <n-grid :cols="1" x-gap="12">
              <n-grid-item>
                  <n-form-item label="考试名称" path="paperName">
                    <n-input v-model:value="searchFormData.paperName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                  <n-form-item label="阅卷老师" path="markingName">
                    <n-input v-model:value="searchFormData.markingName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="创建人" path="createUserName">
                    <n-input v-model:value="searchFormData.createUserName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="试卷状态" path="paperStatus">
                  <n-select
                    v-model:value="searchFormData.paperStatus"
                    placeholder="请选择"
                    :options="paperStatus"
                    :fallback-option="
                      (value) => ({ label: '' + value == 0 ? '否' : '是', value })
                    "
                  />
                </n-form-item>
            </n-grid-item>
            </n-grid>
          </n-form>
          
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <MarkingAction ref="markingAction"  @update:callback="() => {
      $refs.nwTable.commitQuery()
      $refs.nwTable.clearSelected()

  }"></MarkingAction>
  <MarkingDetail ref="markingDetail"></MarkingDetail>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
  NGrid,
  NGridItem,
  NSelect
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { query,  } from "./api";
import MarkingAction from './markingAction.vue'
import MarkingDetail from './markingDetail.vue'

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwTable,
    NwTableFun,
    MarkingAction,
    MarkingDetail,
    NGrid,
    NGridItem,
    NSelect
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const markingAction = ref()
    const markingDetail = ref()
    return {
      message,
      markingAction,
      markingDetail,
      formValue: {},
      paperStatus:reactive([
        {
          label: "未阅卷",
          value: 1,
        },
        {
          label: "已阅卷",
          value: 2,
        }]),
      request: {
        XHR: query, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
            page: {
              current,
              size
            }
        }),
      },
      // 接口相应
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      nwTable,
      columns: reactive([
        { field: "paperName", title: "考试名称",},
         { field: "paperEndTime", title: "考试时间" },
         { field: "paperTotalScore", title: "试卷总分" },
         { field: "markingName", title: "阅卷老师" },
         { field: "specialExamTime", title: "考试时长" },
         { field: "specialExamQualifiedScore", title: "及格分" },
         { field: "  ", title: "试卷状态",
           slots:{
            default:({row}) =>{
              return [
                <span>{row.paperStatus==2?'已阅卷':'未阅卷'}</span>
              ]
            }
           }
          },

        { field: "createTime", title: "创建时间", showOverflow: true,},
        { field: "createUserName", title: "创建人", showOverflow: true,},
        {
          field: '',
          width: 200,
          title: '操作',
          showHeaderOverflow: true,
            slots: {
            default: ({row}) => {
              return [
                <div>
                  <span style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                    if(row.paperStatus !== 2) {
                      markingAction.value.sonFn(row)
                    } else {
                       markingDetail.value.sonFn(row)
                    }
                       
                      }}>{row.paperStatus !== 2 ? '开始阅卷' : '查看详情'}</span>
                  
                </div>
                
              ];
            },
          }
        },
          
      ]),
    };
  },
  methods: {
   
    
    handDel(selected){
      let id = selected.map(d=>d.id).join(',')
      del(id).then(res=>{
        this.message.success("删除成功");
        this.$refs.nwTable.commitQuery()
        this.$refs.nwTable.clearSelected()

      })
      },
    
  },
});
</script>

<style lang="less" scoped>
/deep/ .n-drawer{
  background: #efefef;
}
</style>