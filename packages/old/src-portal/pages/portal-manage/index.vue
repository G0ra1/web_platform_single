<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>门户维护</h1>
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
            @click="
              () => {
                this.model = {};
                formVisible = true;
                contentTile = '新建';
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
          <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
          > -->
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
      :title="'门户维护' + contentTile"
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
  <role-power ref="RolePowerRef" />
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
import { portalPortalList, add, edit, del, details, setHomePage } from "./api";
import Form from "./form.vue";
import RolePower from "./rolePower/index.vue"

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
    RolePower
  },
  setup() {
    const RolePowerRef = ref(null)
    const nwTable = ref(null);
    const message = useMessage();
    const formVisible= ref(false);
    const model = {}
    const Form = ref('Form')
    const {proxy} = getCurrentInstance()
    const contentTile = ref('新建')
    const _setHomePage = (row)=>{
      setHomePage(row.id).then(res=>{
        message.success("设置成功");
        proxy.$refs.nwTable.commitQuery()
      })
    }
    return {
      RolePowerRef,
      contentTile,
      message,
      formVisible,
      formValue: {},
      Form,
      model,
      request: {
        XHR: portalPortalList, // promise 请求函数
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
        { field: "portalName", title: "门户名称" },
        // { field: "xx", title: "授权组织", showHeaderOverflow: true },
        // {
        //   field: "isLogin",
        //   title: "是否登录",
        //   showOverflow: true,
        //   slots: {
        //     default: ({ row }) => {
        //       return [
        //         <span>{row.isLogin == 0 ? "否" : "是"}</span>,
        //       ];
        //     },
        //   }
        // },
        { field: "createUserName", title: "创建人", showOverflow: true },
        { field: "createTime", title: "创建时间", showOverflow: true },
        { field: "isDefault", title: "是否默认首页", showOverflow: true,slots: {
            default: ({ row }) => {
              return [
                <span>{row.isDefault == 0 ? "否" : "是"}</span>,
              ];
            },
          } },
        { field: "a", title: "操作", width: '200px',showOverflow: true ,slots: {default: ({ row }) => {
              return [
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;margin-right: 10px;" onClick={(e)=>{_setHomePage(row)}}>{"设置首页"}</a>
                  </span>,
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                    RolePowerRef.value.show(row)
                  }}>{"角色赋权"}</a>
                  </span>,
              ];
            },
        },}
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
            this.message.success("修改成功");
          }else{
            this.message.success("添加成功");
          }
          
          this.formVisible = false;
          this.$refs.nwTable.commitQuery()
this.$refs.nwTable.clearSelected()
        }
      });
    },
    handEdit (selected){
      details(selected[0].id).then(res=>{
        this.model = res
        this.formVisible = true
        // setTimeout(() => {
        //   this.Form.setModel(res)
          
        // }, 100);
      })
      this.contentTile = '修改'
    },
    handDel(selected){
      let id = selected[0].id
      del(id).then(res=>{
        this.message.success("删除成功");
        this.$refs.nwTable.commitQuery()
this.$refs.nwTable.clearSelected()
      })
      },
    test() {
      this.message.success("保存成功");
    },
  },
});
</script>