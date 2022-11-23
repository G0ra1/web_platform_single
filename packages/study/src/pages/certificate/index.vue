<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>证书管理</h1>
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
            <n-grid :cols="1" x-gap="12">
              <n-grid-item>
                  <n-form-item label="证书名称" path="certificateName">
                    <n-input v-model:value="searchFormData.certificateName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                  <n-form-item label="颁发机构" path="issuer">
                    <n-input v-model:value="searchFormData.issuer" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
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
  <PreviewModal ref="previewModal" ></PreviewModal>
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
import PreviewModal from './previewModal.vue'
import { query, del  } from "./api";
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
    PreviewModal,
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const action = ref()
    const previewModal = ref()
    const show = (e={}) => {
      action.value.sonFn(e);  
      
    }
   
    return {
      message,
      formValue: {},
      model,
      show,
      action,
      previewModal,
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
        { field: "certificateName", title: "证书名称" },
         { field: "typeName", title: "证分类签" },
         { field: "issuer", title: "颁发机构" },
         { field: "validity", title: "证书有效期",
          slots: {
            default: ({row}) => {
              return [
                <span>
                 
                  {row.validity==0?'长期': row.validity + '年'}
                </span>,
              ];
            },
          }
         },
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
                  <span style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                        previewModal.value.sonFn(row)
                      }}>证书预览</span>
                  
                </div>
                
              ];
            },
          }
        },
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
    
  },
});
</script>