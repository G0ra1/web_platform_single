<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>试卷列表</h1>
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
  <Action ref="action"   @update:callback="() => {
        $refs.nwTable.commitQuery()
        $refs.nwTable.clearSelected()
  }"></Action>
 <!-- 
 <Certificate ref="certificate"   @update:callback="() => {
          $refs.nwTable.commitQuery()
         $refs.nwTable.clearSelected()
  }"></Certificate> -->
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
import Action from "./action.vue";
// import Certificate from './certificate.vue'

import { studyteachers,  } from "./api";
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
    Action
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const action = ref()
    const certificate =ref()
   
    return {
      message,
      certificate,
      formValue: {},
      model,
      action,
      request: {
        XHR: studyteachers, // promise 请求函数
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
        { field: "paperName", title: "试卷名称" },
        { field: "paperType", title: "试卷类型",
            slots: {
              default: ({row}) => {
                return  `${[
                          { label: '练习题', value: 0},
                          { label: '考试题', value: 1},
                        ].filter(d=>d.value == row.paperType)[0].label}`
              },
            }
        },
        { field: "status", title: "状态", showHeaderOverflow: true,
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      {row.status ? [
                          { label: '未答卷', value: 0},
                          { label: '未判分', value: 1},
                          { label: '已判分', value: 2},
                          { label: '', value: ''}
                        ].filter(d=>d.value == row.status)[0].label : ''
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "totalCredit", title: "试卷分数", showOverflow: true,},
        { field: "createTime", title: "创建时间", showOverflow: true,},
        { field: "createUserName", title: "创建人", showOverflow: true,},
        {
            field: '',
            width: 200,
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({ row, rowIndex, $table, ...p }, ...pp) => {
                return [
                  <NButton
                    type="warning"
                    size='small'
                    onClick={(e)=>{ action.value.sonFn(row)}}
                  >
                    {{
                      default: () => '查看'
                      
                    }}
                  </NButton>
                  
                ];
              },
            }
          },
      ]),
    };
  },
  methods: {
   
    
   
  },
});
</script>
<style lang='less'>

</style>