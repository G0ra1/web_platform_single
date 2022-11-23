<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>我的培训计划</h1>
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
          {{ searchFormData }} {{ searchFormData2 }}
          <n-form :model="searchFormData">
            
          </n-form>
          
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>

 <CourseMaintenance
    ref="courseMaintenance"
    @update:callback="
      (e) => {
        $refs.nwTable.commitQuery();
         $refs.nwTable.clearSelected()
      }
    "
  ></CourseMaintenance>
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
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { studyUserList, del  } from "./api";
import CourseMaintenance from './courseMaintenance.vue'

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
    CourseMaintenance
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const courseMaintenance = ref()
  
   const handDel = (selected) =>{
      let id = selected.map(d=>d.id).join(',')
      del(id).then(res=>{
        message.success("删除成功");
        nwTable.value.commitQuery()
        nwTable.value.gridComponent.setAllCheckboxRow()
      })
    }
    return {
      message,
      formValue: {},
      model,
      handDel,
      courseMaintenance,
      request: {
        XHR: studyUserList, // promise 请求函数
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
        { field: "planName", title: "培训计划名称",
          slots: {
            default: ({row}) => {
              return [
                <div>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{courseMaintenance.value.sonFn(row)}}>{row.planName}</a>

                </div>
                
              ];
            },
          }
        },
        { field: "typeName", title: "培训计划分类" },
        { field: "status", title: "状态", showHeaderOverflow: true,
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '未开始', value: 0},
                          { label: '计划进行中', value: 1},
                          { label: '计划结束', value: 2}
                        ].filter(d=>d.value == row.status)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "userNumber", title: "培训人数", showOverflow: true,},
        { field: "totalCredit", title: "总学分", showOverflow: true,},
        { field: "startTime", title: "开始时间", showOverflow: true,
          slots: {
            default: ({row}) => {
              return <span>{row.startTime.slice(0,10)}</span>
            }
          }
        },
        { field: "endTime", title: "结束时间", showOverflow: true,
          slots: {
            default: ({row}) => {
              return <span>{row.endTime.slice(0,10)}</span>
            }
          }
        },
        // {
        //     field: '',
        //     width: 200,
        //     title: '操作',
        //     showHeaderOverflow: true,
        //     slots: {
        //       default: ({row}) => {
        //         return [
        //           <div>
                    
        //           </div>
                  
        //         ];
        //       },
        //     }
        //   },
          
      ]),
    };
  },
  methods: {
   
    
    
    
  },
});
</script>