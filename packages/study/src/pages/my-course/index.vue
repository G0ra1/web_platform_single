<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>我的课程</h1>
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
   <Detail ref="detail"   @update:callback="() => {
        
  }"></Detail>
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
import Detail from "./detail.vue";
import { query,   } from "./api";

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
    Detail
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const detail = ref()
  
    return {
      detail,
      message,
      formValue: {},
      model,
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
        { type: 'checkbox', width: 35 },
        { field: "lessonName", title: "课程名称",
            slots: {
              default: ({row}) => {
                return  <a style="color:#2d8cf0;cursor: pointer;"  onClick={(e)=>{ detail.value.sonFn(row)}}>{row.lessonName}</a>
              },
            }
        },
        { field: "typeName", title: "课程标签" },
        { field: "hits", title: "观看次数" },
        { field: "status", title: "状态",
          slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          {label:'未审核',value:0},
                          {label:'审核通过',value:1},
                          {label:'审核不通过',value:2},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.status)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
        // { field: "userType", title: "人员类型", showHeaderOverflow: true,
           
        // },
        { field: "createTime", title: "创建时间", showOverflow: true,},
        { field: "createUserName", title: "创建人", showOverflow: true,},
   
          
      ]),
    };
  },
  methods: {
   
  
    
  },
});
</script>