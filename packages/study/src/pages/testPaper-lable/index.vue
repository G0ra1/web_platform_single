<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>试卷标签维护</h1>
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
            :disabled="selected.length !== 1"
            size="small"
            @click="show(selected[0])"
            >修改</n-button
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
        </template>
        <template #header-right>
         
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
        
          <n-form :model="searchFormData">
            <n-grid :cols="2" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi>
                <n-form-item path="dictItemName" label="字典项">
                  <n-input
                    v-model:value="searchFormData.dictItemName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item path="dictItemCode" label="字典编码">
                  <n-input
                    v-model:value="searchFormData.dictItemCode"
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
  <Action ref="action"   @update:callback="() => {
        $refs.nwTable.commitQuery()
        $refs.nwTable.clearSelected()

    }"></Action>

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
import { dictItemLists, delDictItem  } from "./api";
import Action from './action.vue'

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
    NGrid,
    NGi,
    NSelect,
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const action = ref()
    const show = (e={}) => {
      action.value.sonFn(e);  
    }
    const  handDel = (selected) =>{
      let id = selected.map(d=>d.id).join(',')
      delDictItem(id).then(res=>{
        message.success("删除成功");
        nwTable.value.commitQuery()
        nwTable.value.clearSelected()

      })
    }
    return {
      message,
      formValue: {},
      model,
      show,
      action,
      handDel,
      request: {
        XHR: dictItemLists, // promise 请求函数
        params: {
          dictCode:'STUDY_PAPER_TYPE'
        },
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
        { field: "dictItemName", title: "字典项" },
        { field: "dictItemCode", title: "字典编码" },
        {
            field: '',
            width: 200,
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return [
                  <div>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{handDel([row])}}>{"删除"}</a>
                   
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