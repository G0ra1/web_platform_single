<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>人员审核</h1>
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
          <n-radio-group v-model:value="labelValue"  name="radiobuttongroup1" @update:value="(v)=>{
            request.params.userStatus =labelValue
            $refs.nwTable.commitQuery();
          }">
              <n-space>
                <n-radio-button
                  size="small"
                  v-for="item in labelCodes"
                  :key="item.value"
                  :value="item.value"
                >{{ item.label }}</n-radio-button>
              </n-space>
            </n-radio-group>
        
        </template>
        <template #header-right>
         
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          
          <n-form :model="searchFormData">
            <n-grid :cols="1" x-gap="12">
              <n-grid-item>
                  <n-form-item label="名称" path="userNameCh">
                    <n-input v-model:value="searchFormData.userNameCh" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
            </n-grid>
          </n-form>
          
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <EmpDetail 
    ref="empDetail"
     @update:callback="
      (e) => {
        $refs.nwTable.commitQuery();
      }
    "
  ></EmpDetail>
  <HistoryMemo 
    ref="historyMemo"
  ></HistoryMemo>
  
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
  NRadioGroup,
  NSpace,
  NRadioButton
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { studyCheckList, updateYesEmp  } from "./api";
import EmpDetail from "./empDetail.vue"
import HistoryMemo from "./historyMemo.vue"

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NRadioGroup,
    NSpace,
    NRadioButton,
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
    EmpDetail,
    HistoryMemo
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const empDetail = ref()
    const historyMemo = ref()
    const labelValue = ref('')
    return {
      message,
      empDetail,
      historyMemo,
      labelValue,
      formValue: {},
      model,
      request: {
        XHR: studyCheckList, // promise 请求函数
        params: { userStatus : labelValue.value},
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
      labelCodes:reactive([
         { label: '全部', value: ''},
         { label: '未审核', value: 0},
         { label: '审核通过', value: 1},
         { label: '审核不通过', value: 2}
      ]),
      columns: reactive([
        { field: "userNameCh", title: "姓名",
          slots: {
            default: ({row}) => {
              return [
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                      empDetail.value.sonFn(row)
                    }
                  }>{row.userNameCh}</a>
                </span>,
              ];
            },
          }
        },
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
        { field: "phoneNum", title: "手机号", showHeaderOverflow: true,},
        { field: "unitName", title: "单位名称", showHeaderOverflow: true,},

        { field: "userStatus", title: "审核状态",
         slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '未审核', value: 0},
                          { label: '审核通过', value: 1},
                          { label: '审核不通过', value: 2}
                        ].filter(d=>d.value == row.userStatus)[0].label
                      }
                    </span>,
                  ];
                },
              } },
        { field: "userType", title: "人员类型", showHeaderOverflow: true,
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '讲师', value: "1"},
                          { label: '学员', value: "2"}
                        ].filter(d=>(row.userType.split(',')).indexOf(d.value) > -1).map(item=>item.label).join(',') 
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "unitName", title: "服务单位", showHeaderOverflow: true,},
        { field: "createTime", title: "申请时间", showOverflow: true,},
      
          
      ]),
      passClick(select) {
        select.map(d=>{
          d.userStatus = 1
          return d
        })
        updateYesEmp(select).then((res)=>{
            nwTable.value.commitQuery();
            nwTable.value.clearSelected();
        })
      },
      rejectClick(select) {
        select.map(d=>{
          d.userStatus = 2
          return d
        })
        updateYesEmp(select).then((res)=>{
            nwTable.value.commitQuery();
            nwTable.value.clearSelected();
        })
      },
    };
  },
  methods: {
   
    
   
    
  },
});
</script>