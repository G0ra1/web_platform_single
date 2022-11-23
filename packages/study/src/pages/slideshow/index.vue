<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>轮播图管理</h1>
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
                <n-form-item path="homeBannerName" label="轮播图名称">
                  <n-input
                    v-model:value="searchFormData.homeBannerName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item path="homeBannerStartUsing" label="是否启用">
                  <n-select
                      placeholder="请选择来源"
                       v-model:value="searchFormData.homeBannerStartUsing"
                      :options="homeBannerStartUsingS"
                    
                  />
                </n-form-item>
              </n-gi>
               <!-- <n-gi>
                  <n-form-item path="createUserName" label="创建人">
                  <n-input
                    v-model:value="searchFormData.createUserName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-gi> -->
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
  NImage,
  NGrid,
  NGi,
  NSelect,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { query, del  } from "./api";
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
    NImage,
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
   
    return {
      message,
      homeBannerStartUsingS:reactive([
        { label: '启用', value: 1},
        { label: '禁用', value: 0}
      ]),
      formValue: {},
      model,
      show,
      action,
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
        { field: "homeBannerName", title: "轮播图名称" },
        { field: "homeBannerUrl", title: "轮播图",
          slots: {
            default: ({ row }) => {
              return [
                <NImage src={row.homeBannerUrl} height="30" width="50" style="padding:3px"  />,
              ];
            },
          }
        },
         { field: "homeBannerRemarks", title: "备注" },
        { field: "homeBannerStartUsing", title: "是否启用",
           slots: {
            default: ({row}) => {
             return <span>{row.homeBannerStartUsing == 1 ? "启用" : "禁用"}</span>
            },
          }
        },
        { field: "createTime", title: "创建时间", showOverflow: true,},
        { field: "createUserName", title: "创建人", showOverflow: true,},
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