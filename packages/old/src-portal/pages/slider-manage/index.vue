<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>图片轮播管理</h1>
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
         <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item label="门户名称" path="portalId">
              <n-select
                v-model:value="searchFormData.portalId"
                placeholder="请选择门户名称"
                :options="portalOptions"
                :fallback-option="
                  (value) => ({ label: '' + searchFormData.portalName, value })
                "
                :on-update:value="(v) => portalSelect(v, searchFormData)"
              />
            </n-form-item>
            <n-form-item label="所属栏目" path="partId">
              <n-select
                v-model:value="searchFormData.partId"
                placeholder="请选择所属栏目"
                :options="partOptions"
                :fallback-option="
                  (value) => ({ label: '' + searchFormData.partName, value })
                "
                :on-update:value="(v) => partSelect(v, searchFormData)"
              />
            </n-form-item>
          </n-form>
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
      :title="'图片轮播' + contentTile"
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
          size="small"
          style="margin-right: 5px"
          @click="formVisible = false"
          >取消</n-button
        >

        <n-button type="info" size="small" @click="handleSave">保存</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
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
  NSelect,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { list, add, edit, del, details,portalPortalLists, portalPartLists } from "./api";
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
    NSelect,
  },
  setup() {
    const nwTable = ref(null);
    const message = useMessage();
    const formVisible= ref(false);
    const model = {}
    const {proxy} = getCurrentInstance()
    const contentTile = ref('新建')
   const portalOptions = ref([]);
    const partOptions = ref([]);
    const _setHomePage = (row)=>{
      setHomePage(row.id).then(res=>{
        message.success("设置成功");
        proxy.$refs.nwTable.commitQuery()
      })
    }
    return {
       partOptions,
      portalOptions,
      message,
      contentTile,
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
        { field: "portalName", title: "所属门户", showHeaderOverflow: true },
        { field: "partName", title: "所属栏目", showOverflow: true },
        { field: "hits", title: "点击量", showOverflow: true },
        { field: "auditStatus", title: "状态", showOverflow: true,slots: {
            default: ({ row }) => {
              return [
                <span>{row.auditStatus == 0 ? "未审批" : "已通过"}</span>,
              ];
            },
          } },
        { field: "createUserName", title: "发布人", showOverflow: true },
        
        { field: "createTime", title: "创建时间", showOverflow: true },

      ]),
    };
  },
  created() {
    // 获取门户
    portalPortalLists().then((res) => {
      this.portalOptions = res.map((d) => {
        return { label: d.portalName, value: d.id };
      });
    });
    // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
  },
  methods: {
    portalPartLists(portalId) {
      portalPartLists({ portalId }).then((res) => {
        console.log(res);
        this.partOptions = res.map((d) => {
          return {
            label: d.partName,
            value: d.id,
            code: d.partCode,
            partTypeId: d.partTypeId,
            partTypeName: d.partTypeName,
          };
        });
      });
    },
    portalSelect(v,searchFormData) {
      searchFormData.portalId = v;
      console.log(this.portalOptions.filter(
        d => d.value == v
      ))
      searchFormData.portalName = this.portalOptions.filter(
        (d) => (d.value == v)
      )[0].label;
      this.portalPartLists(v);
    },
    partSelect(v,searchFormData) {
      searchFormData.partId = v;
      searchFormData.partName = this.partOptions.filter((d) => (d.value == v))[0].label;
      searchFormData.partTypeId = this.partOptions.filter(
        (d) => (d.value == v)
      )[0].partTypeId;
      searchFormData.partTypeName = this.partOptions.filter(
        (d) => (d.value == v)
      )[0].partTypeName;
    },
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
      this.contentTile = '编辑'
      details(selected[0].id).then(res=>{
        this.formVisible = true
        this.model = res
      })
     
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