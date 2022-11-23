<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>试卷管理</h1>
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
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="show"
            >添加</n-button
          >
          <n-button
            :disabled="(selected.length !== 1) || (selected.some(d=>{return ( d.status == 2 || d.status == 1 )}))"
            size="small"
            @click="show(selected[0])"
            >修改</n-button
          >
          <n-button
            :disabled="(selected.length == 0) || (selected.some(d=>{return (d.status == 2 || d.status == 1)})) "
            size="small"
            @click="upIsApplyAction(selected.map(d=>d.id).join(','))"
            >试卷发布</n-button
          >
         
          <!-- <n-popconfirm
            @positive-click="handDel(selected)"
            positive-text="确定"
            negative-text="取消"
          >
            <template #trigger>
              <n-button :disabled="selected.length == 0" size="small"
                >删除</n-button
              >
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm> -->
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
  <Topic ref="topic"   @update:callback="() => {
                $refs.nwTable.commitQuery()
                $refs.nwTable.clearSelected()
  }"></Topic>
  <RuleAction ref="ruleAction"   @update:callback="() => {
                $refs.nwTable.commitQuery()
                $refs.nwTable.clearSelected()
  }"></RuleAction>
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
  useDialog
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { query, del, releasePaper  } from "./api";
import Action from './action.vue'
import Topic from './topic.vue'
import RuleAction from './ruleAction.vue'

export default defineComponent({
  components: {
    Action,
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
    Topic,
    RuleAction
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const action = ref()
    const topic = ref()
    const ruleAction = ref()
    const dialog = useDialog();

    const show = (e={}) => {
      action.value.sonFn(e);  
      
    }
    const handDel =(selected) =>{
      let id = selected.map(d=>d.id).join(',')
      del(id).then(res=>{
        message.success("删除成功");
        nwTable.value.commitQuery()
        nwTable.value.gridComponent.setAllCheckboxRow()
      })
    }
    const upIsApplyAction = (lessonId) =>{
      dialog.success({
            title: '是否确定对当前选中试卷进行发布?',
            content: '',
            positiveText: '确定',
            negativeText: '不确定',
            maskClosable: false,
           
            onPositiveClick : () => {
                releasePaper(lessonId).then(res=>{
                  message.success("提交成功");
                  nwTable.value.commitQuery()
                  nwTable.value.clearSelected()
                })
            }
          })
      
    }
    return {
      message,
      formValue: {},
      model,
      upIsApplyAction,
      show,
      handDel,
      action,
      topic,
      ruleAction,
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
        { field: "paperName", title: "试卷名称" },
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
                          {label:'未审核',value:0},
                          {label:'审核成功',value:1},
                          {label:'审核中',value:2},
                          {label:'审核失败',value:3},

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
                     <a v-if={ row.paperCode == 0 } style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{row.paperCode == 0 ? topic.value.sonFn(row) : ruleAction.value.sonFn(row)}}>{ row.paperCode == 0 ? "题目维护" : "规则维护"}</a>

                    <NPopconfirm
                      onPositive-click={(e)=>{handDel([row])}}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                        default:()=> '是否删除当前选项?'
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