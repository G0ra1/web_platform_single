<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>课件审核</h1>
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
            request.params.applyStatus =labelValue
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
            <n-grid :cols="1" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi>
                <n-form-item path="targetName" label="课件名称">
                  <n-input
                    v-model:value="searchFormData.targetName"
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
   <n-modal v-model:show="showModal"  preset="dialog"  title="审核处理">
     <n-form> 
       <n-form-item label="处理意见">
              <n-input
                v-model:value="formData.dealMessage"
                type="textarea"
                placeholder=""
                style="height: 120px"
              />
        </n-form-item>
    </n-form>
     <template #action>
      <n-button type="warning" size="small" @click="rejectClick"
        >驳回</n-button
      >
      <n-button
        type="success"
        size="small"
        style="margin-right: 5px"
        @click="passClick"
        >通过</n-button
      >
    </template>
   </n-modal>
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
  NModal,
  NPopover,
   NGrid,
  NGi,
  NSelect,
  NRadioButton
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { studyCheckList, updateYesEmp,detail  } from "./api";


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
    NPopover,
     NGrid,
  NGi,
  NSelect,
    NModal
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const formData = ref({dealMessage:''})
    const labelValue = ref('')
    const showModal = ref(false)
    return {
      message,
      showModal,
      labelValue,
      formValue: {},
      formData,
      request: {
        XHR: studyCheckList, // promise 请求函数
        params: { applyStatus : labelValue.value,targetType:0},
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
        { field: "userName", title: "姓名", },
      
        { field: "targetName", title: "课件名称", showHeaderOverflow: true,},
        { field: "lessonName", title: "课程名称", showHeaderOverflow: true,},
        { field: "applyTime", title: "申请时间", showHeaderOverflow: true,},
        { field: "applyStatus", title: "处理状态",
         slots: {
                default: ({row}) => {
                  return [
                    <NPopover bottom placement="bottom" trigger="click">
                      {{
                        trigger:()=>   <span style={row.applyStatus == 1 ?'color:#3F8FFF':(row.applyStatus==2?'color:red':'')} 
                        >
                          { [
                              { label: '未审核', value: 0},
                              { label: '审核通过', value: 1},
                              { label: '审核不通过', value: 2}
                            ].filter(d=>d.value == row.applyStatus)[0].label
                          }
                        </span>,
                         default:()=> <div style="min-width:100px">
                            <h3>处理时间： {row.dealTime}</h3>
                            <span>处理意见：{ row.dealMessage}</span>
                         </div>
                      }}
                        
                    </NPopover>
                  ];
                },
              } 
        },
        {
            field: '',
            width: 200,
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
              if( row.applyStatus == 0 )
                 return [
                  <div >
                   <a style="color:#2d8cf0;cursor: pointer;display:inline-block;" onClick={()=>{
                     formData.value = row
                     showModal.value = true
                   }}>{ "审核"}</a>
                  </div>
                ];
              },
            }
          },
      ]),
      passClick(select) {
       
        updateYesEmp({...formData.value,applyStatus:1}).then((res)=>{
          showModal.value = false
            nwTable.value.commitQuery();
            nwTable.value.clearSelected();
        })
      },
      rejectClick(select) {
      
        updateYesEmp({...formData.value,applyStatus:2}).then((res)=>{
          showModal.value = false
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