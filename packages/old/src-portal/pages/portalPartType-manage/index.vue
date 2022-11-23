<template>
  <!-- <n-config-provider> -->
  <n-message-provider>
    <!-- <n-notification-provider> -->
    <n-layout class="nw-page">
      <n-layout-header>
        <h1>栏目类型管理</h1>
        <div class="nw-page-header-right">
          <!-- <n-input-group v-if="!($refs.nwTable ? $refs.nwTable.searchFormActive : false)" style="width: 240px">
          <n-input placeholder="输入搜索内容" size="small" :style="{ width: '190px' }" />
          <n-button  size="small" type="primary" ghost>搜索</n-button>
        </n-input-group>
        <n-button
        ghost
        style="background: #fff;color: #000" size="small"
        @click="show()"
        >高级搜索</n-button> -->
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
              @click="
              () => {
                this.model = {};
                formVisible = true;
                contentTile='新建'
              }
            "
              >添加</n-button
            >
            <n-button
              :disabled="selected.length !== 1"
              size="small"
              @click="handEdit(selected)"
              >修改</n-button
            >
            <n-button
              :disabled="selected.length !== 1"
              size="small"
              @click="test(selected)"
              >Test</n-button
            >
            <n-popconfirm
              @positive-click="handDel(selected)"
              positive-text="确定"
              negative-text="取消"
            >
              <template #trigger>
                <n-button :disabled="selected.length !== 1" size="small"
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
              <n-form-item path="dsName" label="数据源名称">
                <n-input
                  v-model:value="searchFormData.dsName"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item path="id" label="数据源ID">
                <n-input
                  v-model:value="searchFormData.id"
                  @keydown.enter.prevent
                />
              </n-form-item>
            </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
        </NwTable>
      </n-layout-content>
    </n-layout>

    <n-drawer
      v-model:show="formVisible"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.page && $refs.page.$el"
    >
      <n-drawer-content
        title="栏目类型新建"
        :header-style="{
          padding: '10px',
          'font-size': '16px',
          'font-weight': 'bold',
        }"
        :footer-style="{
          padding: '10px',
        }"
      >
        <Form ref="Form" :model="model" />

        <template #footer>
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="handleSave"
            >保存</n-button
          >
          <n-button size="small" @click="formVisible = false">取消</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
    <!-- </n-notification-provider> -->
  </n-message-provider>
  <!-- </n-config-provider> -->
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
  useMessage,
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
  NMessageProvider,
  NNotificationProvider,
  NConfigProvider
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { list, add, edit, del, details } from "./api";
import Form from "./form.vue";
export default defineComponent({
  components: {
    Form,
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
    NMessageProvider,
    NNotificationProvider,
    NConfigProvider
  },
  setup() {
    const nwTable = ref(null);
    // console.log(useMessage())
    // const message = useMessage()
    window.$message = useMessage()
    const formVisible= ref(false);
    const model = {}
    // const {proxy} = getCurrentInstance()
    
    
    return {
      formVisible,
      formValue: {},
      model,
      request: {
        XHR: list, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page:{
            current,
            size,
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
        { type: "seq", width: 40 },
        { field: "partTypeCode", title: "栏目类型CODE" },
        { field: "partTypeName", title: "栏目类型名称", showHeaderOverflow: true },
        { field: "createTime", title: "创建时间", showOverflow: true },
        // { field: "a", title: "操作", showOverflow: true ,slots: {default: ({ row }) => {
        //       return [
        //         <span>
        //           <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{handEdit(row)}}>{"编辑"}</a>
        //           <a style="color:#2d8cf0;cursor: pointer;margin-left:10px" onClick={(e)=>{handDel(row.id)}}>{"删除"}</a>
        //           </span>,
        //       ];
        //     },
        // },}
      ]),
    };
  },
  methods: {
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
    handleSave() {
      console.log(this.$refs.Form.getModel());
      const fn = this.$refs.Form.getModel().id?edit:add;
      fn(this.$refs.Form.getModel()).then((res) => {
        if (res === true) {
          if(this.$refs.Form.getModel().id){
             window.$message.success("修改成功");
          }else{
             window.$message.success("添加成功");
          }
          
          this.formVisible = false;
          this.$refs.nwTable.commitQuery()
this.$refs.nwTable.clearSelected()
        }
      });
    },
    handEdit (selected){
      this.formVisible = true
      this.model = selected[0]
    },
    handDel(selected){
      let id = selected[0].id
      del(id).then(res=>{
        window.$message.success("删除成功");
        this.$refs.nwTable.commitQuery()
this.$refs.nwTable.clearSelected()
      })
      },
    test() {
       window.$message.success("保存成功");
    },
  },
});
</script>