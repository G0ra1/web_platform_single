<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>学习资料</h1>
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
                  <n-form-item label="学习资料名称" path="marterialsName">
                    <n-input v-model:value="searchFormData.marterialsName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                  <n-form-item label="标签名称" path="labelCode">
                     <nw-dic
                        :request="{XHR:dictItemLists, params: 'STUDY_MATERIAL_TYPE',}"
                        v-model:value="searchFormData.labelName"
                        v-model:label="searchFormData.labelCode"
                        size="small"
                        :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                        />
                  </n-form-item>
              </n-grid-item>
               <n-grid-item>
                <n-form-item label="是否可以下载" path="isDownload">
                  <n-select
                    v-model:value="searchFormData.isDownload"
                    placeholder="请选择"
                    :options="isEnableList"
                    :fallback-option="
                      (value) => ({ label: '' + value == 0 ? '否' : '是', value })
                    "
                  />
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
  NGridItem,
  NSelect
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { query, del,dictItemLists  } from "./api";
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
    NGridItem,
    NSelect
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
      formValue: {},
      model,
      show,
      action,
      dictItemLists,
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
      isEnableList: reactive([
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ]),
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { field: "marterialsName", title: "学习资料名称" },
        { field: "labelName", title: "标签名称" },
        { field: "isDownload", title: "是否可以下载",
           slots: {
            default: ({row}) => {
             return <span>{row.isDownload == 1 ? "是" : "否"}</span>
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