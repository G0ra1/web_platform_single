<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>数据字典</h1>
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
         
          <n-popconfirm
            @positive-click="handDel(selected)"
            positive-text="确定"
            negative-text="取消"
            v-if="selected.length>0"
          >
            <template #trigger>
              <n-button :disabled="selected.length == 0" size="small"
                >删除</n-button
              >
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm>
        </template>
        <template #header-right>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          {{ searchFormData }} {{ searchFormData2 }}
          <n-form :model="searchFormData">
            
          </n-form>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
 <SubsystemAction ref="subsystemAction"   @update:callback="() => {
                $refs.nwTable.commitQuery()
                $refs.nwTable.clearSelected()
  }"></SubsystemAction>
  <DeployDict ref="deployDict"   @update:callback="() => {
                $refs.nwTable.commitQuery()
                 $refs.nwTable.clearSelected()
  }"></DeployDict>
 
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
} from "/@/components/nw-table/index.vue";
import { dictTypeList, del  } from "./api";
import SubsystemAction from "./subsystemAction.vue";
import DeployDict from "./deployDict.vue";

export default defineComponent({
  components: {
    SubsystemAction,
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
    DeployDict,
    
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const subsystemAction = ref();
    const deployDict = ref();
    
    const showDeployDict = (e={}) => {
      deployDict.value.sonFn(e);  
      
    }
    const show = (e={}) => {
      subsystemAction.value.sonFn(e);  
      
    }
     
    const handDel = (selected)=>{
      let id = selected.map(d=>d.id).join(',')
      del(id).then(res=>{
        nwTable.value.gridComponent.setAllCheckboxRow()
        nwTable.value.commitQuery()
        message.success("删除成功")
        
        
      })
    }
  
   
    return {
      message,
      formValue: {},
      handDel,
      model,
      show,
      deployDict,
      showDeployDict,
      subsystemAction,
      request: {
        XHR: dictTypeList, // promise 请求函数
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
        { field: "dictName", title: "名称",
           slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       show(row)
                      }
                    }>{row.dictName}</a>
                  </span>,
                ];
              },
            }
        },
        { field: "dictCode", title: "编码", showHeaderOverflow: true },
   
        {
            field: '',
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row,}) => {
                return [
                  <div>
                   
                     <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={()=>{showDeployDict({dictId:row.id})}}>{"字典配置"}</a>
                    <NPopconfirm
                      onPositive-click={(e)=>{handDel([row])}}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
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