<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>试卷审核</h1>
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
  <CheckDeati 
    ref="checkDeati"
  ></CheckDeati>
  <CheckDeati0 
    ref="checkDeati0"
  ></CheckDeati0>
</template>

<script lang='jsx'>

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
import {  studyExamPaperDefList, studyExamPaperDef  } from "./api";
import CheckDeati from "./checkDeati1.vue"
import CheckDeati0 from "./checkDeati0.vue"

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
    CheckDeati,
    CheckDeati0
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const checkDeati = ref()
    const checkDeati0 = ref()
    return {
      message,
      checkDeati,
      formValue: {},
      checkDeati0,
      model,
      request: {
        XHR: studyExamPaperDefList, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
            page: {
              current,
              size
            }
        }),
      },
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      nwTable,
      columns: reactive([
       { field: "paperName", title: "试卷名称",
        slots: {
            default: ({row}) => {
              return [
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                      if(row.paperCode == 1) {
                        checkDeati.value.sonFn(row)  // 随机试卷详情
                      } else{
                        checkDeati0.value.sonFn(row)   // 固定试卷详情
                      }
                     
                    }
                  }>{row.paperName}</a>
                </span>,
              ];
            },
          }
        },
        { field: "typeName", title: "试卷标签" },
        { field: "paperType", title: "试卷类型",
            slots: {
                default: ({row}) => {
                  return [
                    <span>
                      {(row.paperType  )? [
                          {label:'练习题',value:'0'},
                          {label:'考试题',value:'1'},
                          {label:'',value:''},
                         
                        ].filter(d=>(row.paperType.split(',')).indexOf(d.value) > -1).map(item=>item.label).join(',') : ''
                      }
                    </span>,
                  ];
                },
              }
        },
         { field: "status", title: "状态",
          slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          {label:'未发布',value:0},
                          {label:'发布',value:1},
                          {label:'发布中',value:2},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.status)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
       { field: "paperCode", title: "出题类型", showHeaderOverflow: true,
         slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { (row.paperCode ||(row.paperCode ==0 )) ? [
                          {label:'固定试卷',value:0},
                          {label:'随机试卷',value:1},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.paperCode)[0].label : ''
                      }
                    </span>,
                  ];
                },
              }
       },
       { field: "paperTotalScore", title: "试卷总分", showHeaderOverflow: true,},
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
                   <NPopconfirm
                      onPositive-click={(e)=>{ 
                        studyExamPaperDef({...row,status:1}).then((res)=>{
                            nwTable.value.commitQuery();
                        })
                      }}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:#2d8cf0;cursor: pointer;display:inline-block;">{"通过"}</a>,
                        default:()=> '是否通过当前选项?'
                      }}
                     
                    </NPopconfirm>
                    <NPopconfirm
                      onPositive-click={(e)=>{
                        studyExamPaperDef({...row,status:2}).then((res)=>{
                          nwTable.value.commitQuery();
                        })
                      }}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:5px">{"驳回"}</a>,
                        default:()=> '是否驳回当前选项?'
                      }}
                     
                    </NPopconfirm>
                  </div>
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