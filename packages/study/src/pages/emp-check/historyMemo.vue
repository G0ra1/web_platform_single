<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="历史审核记录"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:800px;"
  >
     <div style="height:500px">
        <NwTable
            ref="nwTable"
            :columns="columns"
            :data="null"
            :request="request"
            :response="response"
            
        >
        </NwTable>
     </div>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
        </div>
    </template>
    <EmpDetail 
        ref="empDetail"
    ></EmpDetail>
  </n-modal>
</template>

<script lang='jsx'>
import { h,defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
     NButton,
    NSpin
} from 'naive-ui'
import { studyCheckList } from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'
import EmpDetail from "./empDetail.vue"

import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NButton,
        NSpin,
        NwTable,
        EmpDetail
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = ref({})
    const empDetail = ref()

    const modelRef = ref({
        passWord: null,
        reenteredPassword: null
    })
    const userTypes = ref([
      { label: '管理员', value: 0},
        { label: '讲师', value: 1},
        { label: '学员', value: 2}
    ])
    const sexList = ref([
      { label: '男', value: 1},
      { label: '女', value: 2}
    ])
    const isLoading = ref(false)
    const formRef = ref(null)
    const sonFn = (e={}) => {
      showModalRef.value = true
      modelRef.value=cloneDeep(e)

    };
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      empDetail,
      showModal: showModalRef,
      userTypes,
      sexList,
      model:modelRef, // 表单数据
      isLoading,
      formRef,
      request: {
        XHR: studyCheckList, // promise 请求函数
        params: { isStatus : 1},
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
        { field: "userType", title: "人员类型", 
           slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { [
                          { label: '管理员', value: 0},
                          { label: '讲师', value: 1},
                          { label: '学员', value: 2}
                        ].filter(d=>d.value == row.userType)[0].label
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "userStatus", title: "状态",
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
        { field: "createTime", title: "创建时间", showOverflow: true,},
      ]),
      rules: {
 
      },
     
       
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
  methods: {
   
  }
})
</script>