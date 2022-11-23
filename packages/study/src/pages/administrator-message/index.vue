<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>管理员信息</h1>
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
          <!-- <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="show"
            >添加</n-button
          > -->
           <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="batchAdd"
            >批量添加</n-button
          >
         
          <n-popconfirm
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
          </n-popconfirm>
           <!-- <n-button
            type="info"
            size="small"
            :loading="isTableLoading"
            :disabled="isTableLoading"
            style="margin-right: 5px"
            @click="clientTemplate"
            >模板下载</n-button
          > -->
        </template>
        <template #header-right>
         
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
           <n-form :model="searchFormData">
            <n-grid :cols="2" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi>
                <n-form-item path="userNameCh" label="名称">
                  <n-input
                    v-model:value="searchFormData.userNameCh"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-gi>
              
              <!-- <n-gi>
                <n-form-item path="userClass" label="来源">
                  <n-select
                      placeholder="请选择来源"
                       v-model:value="searchFormData.userClass"
                      :options="userClassS"
                    
                  />
                </n-form-item>
              </n-gi> -->
               <n-gi>
                <n-form-item path="sex" label="性别">
                  <n-select
                      placeholder="请选择性别"
                       v-model:value="searchFormData.sex"
                      :options="sexList"
                    
                  />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item path="idCard" label="证件号">
                  <n-input
                    v-model:value="searchFormData.idCard"
                    @keydown.enter.prevent
                  />
                </n-form-item>
               </n-gi>
               <n-gi>
                <n-form-item path="phoneNum" label="手机号">
                  <n-input
                    v-model:value="searchFormData.phoneNum"
                    @keydown.enter.prevent
                  />
                </n-form-item>
               </n-gi>
            </n-grid>
          </n-form>
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
 <EmpAdd ref="empAdd"   @update:callback="() => {
      $refs.nwTable.commitQuery()
      $refs.nwTable.clearSelected()
  }"></EmpAdd>
 <SetPassWord
    ref="setPassWord"
    @update:callback="
      (e) => {
        $refs.nwTable.commitQuery();
         $refs.nwTable.clearSelected()
      }
    "
  ></SetPassWord>
  <EditAction ref="editAction"></EditAction>
  <EmployeePick ref="employeePick"
    @update:callback="
      (e) => {
         $refs.nwTable.commitQuery();
         $refs.nwTable.clearSelected()
       
      }
    "
  ></EmployeePick>
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
  NGi,
  NSelect,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { studyUserList, del,creatEmp, exportTemplate } from "./api";
import EmpAdd from './empAdd.vue'
import SetPassWord from './setPassWord.vue'
import EditAction from './editAction.vue'
import EmployeePick from './employeePick.vue'

export default defineComponent({
  components: {
    EmpAdd,
    EmployeePick,
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
    SetPassWord,
    EditAction,
    NGrid,
    NGi,
    NSelect
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const empAdd = ref()
    const setPassWord = ref()
    const editAction = ref()
    const employeePick = ref()
    const isTableLoading = ref(false)
   
    const sexList = ref([
      { label: '男', value: 1},
      { label: '女', value: 2}
    ])
    const userClassS= ref([
      { label: '外部人员', value: 3},
      { label: '主数据', value: 2}
    ])
    const show = (e={}) => {

      empAdd.value.sonFn(e);  
      
    }
    const batchAdd =  (e={}) => {
      employeePick.value.sonFn(e);  
      
    }
    const batchAddAction = (e=[]) => {
      e.map((d)=>{
        d.userClass = 2
        return d
      })
      creatEmp(e).then((res)=>{
        if(res){
          nwTable.value.commitQuery()
          nwTable.value.clearSelected()
        }
      }).finally(r => {
        
      })
      
    }
    return {
      message,
      nwTable,
      batchAddAction,
      employeePick,
      formValue: {},
      batchAdd,
      model,
      sexList,
      isTableLoading,
      show,
      empAdd,
      setPassWord,
      userClassS,
      request: {
        XHR: studyUserList, // promise 请求函数
        params: {userType:0},
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
      editAction,
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { field: "userName", title: "账号",
          slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       editAction.value.sonFn(row)
                      }
                    }>{row.userName}</a>
                  </span>,
                ];
              },
            } 
          },
         { field: "userNameCh", title: "姓名" },
          { field: "parentDeptName", title: "部门" },

        
         { field: "sex", title: "性别", showHeaderOverflow: true,
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '男', value: 1},
                          { label: '女', value: 2}
                        ].filter(d=>d.value == row.sex)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "status", title: "状态", showHeaderOverflow: true,
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '启用', value: 1},
                          { label: '禁用', value: 2}
                        ].filter(d=>d.value == row.status)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
        //  {
        //     field: '',
        //     width: 200,
        //     title: '操作',
        //     showHeaderOverflow: true,
        //     slots: {
        //       default: ({row}) => {
        //         return [
        //           <div >
        //             <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{row.userClass==3 ? setPassWord.value.sonFn(row) : message.error('来源为主数据人员请到相关页面修改密码')}}>{"设置密码"}</a>
                   
        //           </div>
                  
        //         ];
        //       },
        //     }
        //   },
          
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
      clientTemplate() {
        exportTemplate().then(r => {
          this.isTableLoading = false
        })
       
      },
    
  },
});
</script>