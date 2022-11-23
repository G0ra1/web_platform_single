<template>
  <n-layout class="nw-page">
    <!-- <n-layout-header>
      <h1>新闻管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>-->
    <n-layout-content class="n-layout-content2">
      <nwTable2
        ref="nwTable"
        :columns="columns"
        :data="null"
        :headerSearchForm="headerSearchForm"
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
        <template v-slot:header-left="{ selected, searchFormData }">
          <n-form
            inline
            :model="searchFormData"
            label-placement="left"
            :label-width="80"
            style="height: 40px; padding-top: 6px"
          >
            <n-form-item label="门户名称" path="portalId">
              <n-select
                v-model:value="searchFormData.portalId"
                placeholder="请选择门户名称"
                :options="portalOptions"
                size="small"
                style="width: 150px"
                :fallback-option="
                  (value) => ({ label: '' + searchFormData.portalName, value })
                "
                :on-update:value="(v) => portalSelect(v, searchFormData)"
              />
            </n-form-item>
            <n-form-item label="标题" path="title">
              <n-input
                placeholder="请输入标题"
                v-model:value="searchFormData.title"
                size="small"
                style="width: 150px"
              />
            </n-form-item>
            <n-form-item>
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
              >查询</n-button>
              <n-button size="small" style="margin-right: 5px" @click="handEdit(selected)">重置</n-button>
              <NwTableFun :table="nwTable"></NwTableFun>
            </n-form-item>
          </n-form>
        </template>
        <template #header-right>
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
          >
            <template #icon>
              <nw-icon name="icon-jia" :size="18" />
            </template>新增
          </n-button>
          <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            style="margin-right: 5px"
            @click="handEdit(selected)"
            >修改</n-button
          >-->
          <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
          >-->
          <!-- <n-popconfirm
            style="margin-right: 5px"
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
          </n-popconfirm>-->
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
            <n-form-item label="标题" path="title">
              <n-input placeholder="请输入标题" v-model:value="searchFormData.title" />
            </n-form-item>
          </n-form>
        </template>
      </nwTable2>
    </n-layout-content>
  </n-layout>
  <n-drawer
    :show="formVisible"
    width="100%"
    :height="200"
    placement="right"
    :to="$refs.page && $refs.page.$el"
  >
    <n-drawer-content
      :title="contentTile"
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
        <n-button style="margin-right: 5px" size="small" @click="formVisible = false">取消</n-button>
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
  NSelect,
  useMessage,
} from "naive-ui";
import {
  default as nwTable2,
  NwTableFun,
} from "/@/components/nw-table/index2.vue";
import { list, add, edit, del, details, portalPortalLists, portalPartLists  } from "./api";
import {cloneDeep}  from 'lodash'
import Form from "./form.vue";
import NwIcon from "/@/components/nw-icon/index.vue";
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
    nwTable2,
    NSelect,
    NwTableFun,
    NwIcon
  },
  setup() {
    const nwTable = ref(null);
    const nwTable2 = ref(null)
    const message = useMessage();
    const formVisible= ref(false);
    const model = ref({})
    const Form = ref(null)
    const contentTile = ref('新闻新建')
    // const {proxy} = getCurrentInstance()
   const headerSearchForm = reactive({
     title:''
   })
    const _setHomePage = (row)=>{
      setHomePage(row.id).then(res=>{
        message.success("设置成功");
        proxy.$refs.nwTable.commitQuery()
      })
    }
    const portalOptions = ref([]);
    const partOptions = ref([]);
    const handEdit = (selected)=>{
      contentTile.value = '新闻编辑'
      details(selected.id).then(res=>{
          model.value = res
          formVisible.value = true
      })      
    }
    return {
      nwTable2,
      nwTable,
      headerSearchForm,
      partOptions,
      portalOptions,
      message,
      contentTile,
      formVisible,
      formValue: {},
      Form,
      model,
      handEdit,
      request: {
        XHR: list, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
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
        { type: "seq", width: 40 },
        { field: "title", title: "标题", children:[
            {field:'title',
              slots:{
                header:({row})=>{
                  return <NInput placeholder="请输入标题" value={headerSearchForm.title}  onInput={v=>{headerSearchForm.title = v}}></NInput>
                }
              }
            }
          ] },
        { field: "portalName", title: "所属门户",  showOverflow: true,children:[
            {field:'portalName',
              slots:{
                header:({row})=>{
                  return <NInput ></NInput>
                }
              }
            }
          ] },
        { field: "partName", title: "所属栏目", showOverflow: true,children:[
            {field:'partName',
              slots:{
                header:({row})=>{
                  return <NInput></NInput>
                }
              }
            }
          ] },
        { field: "hits", title: "点击量", showOverflow: true,children:[
            {field:'hits',
              slots:{
                header:({row})=>{
                  return <NInput></NInput>
                }
              }
            }
          ] },
        { field: "auditStatus", title: "状态", showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.auditStatus == 0 ? "未审批" : "已通过"}</span>,
              ];
            },
          },
          children:[
            {field:'auditStatus',
              slots:{
                header:({row})=>{
                  return <NInput></NInput>
                }
              },
              default: ({ row }) => {
                return [
                  <span>{row.auditStatus == 0 ? "未审批" : "已通过"}</span>,
                ];
              },
            }
          ]

        },
        { field: "createUserName", title: "发布人", showOverflow: true,
        
        children:[
            {field:'createUserName',
              slots:{
                header:({row})=>{
                  return <NInput></NInput>
                }
              }
            }
          ]
        },
        
        { field: "createTime", title: "创建时间", showOverflow: true,children:[
            {field:'createTime',
              slots:{
                header:({row})=>{
                  return <NInput></NInput>
                }
              }
            }
          ] 
        },
        { field: "caozuo", title: "操作", showOverflow: true,

          children:[
            {field:'createTime',
              slots:{
                default:({row})=>{
                  return [
                    <a type="text" size="small" style="margin-left:5px;cursor: pointer;">查看</a>,
                    <a type="text" size="small" style="margin-left:5px;cursor: pointer;color:#3F8FFF;" onClick={()=>handEdit(row)}>编辑</a>
                  ]
                },
                header:({row})=>{
                  return [
                    <NwIcon name="icon-sousuo1"style="color:#3F8FFF;cursor: pointer;" size={18} onClick={()=>{ nwTable.value.commitQuery()}} />,
                    <NwIcon name="icon-quxiao" style="margin-left:24px;cursor: pointer;" size={18} onClick={()=>{ nwTable.value.switchHeaderSearch()}} />,
                    // <NButton size="small" onClick={()=>{ nwTable.value.commitQuery()}}>查询</NButton>,
                    // <NButton size="small" style="margin-left:5px;">取消</NButton>
                  ]
                }
              }
            }
          ] 
        },

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
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
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
    handleSave() {
      let formData = cloneDeep(this.Form.getModel())
      const fn = formData.id?edit:add;
      // if(formData.id){
      //   formData = {...formData,linkNewsId:formData.id,id:''}
      // }
      fn(formData).then((res) => {
        if (res === true) {
          if(formData.id){
            this.message.success("修改成功");
          }else{
            this.message.success("添加成功");
          }
          this.model = {}
          this.formVisible = false;
          this.$refs.nwTable.commitQuery()
          this.$refs.nwTable.clearSelected()
        }
      });
    },
    handEdit (selected){
      this.contentTile = '新闻编辑'
      details(selected[0].id).then(res=>{
          this.model = res
          this.formVisible = true
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