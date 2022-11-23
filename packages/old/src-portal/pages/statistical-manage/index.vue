<template>
  <n-layout class="nw-page">
    <div id="myChart1" :style="{ width: '1500px', height: '550px' }"></div>
    <div id="myChart2" :style="{ width: '1500px', height: '550px' }"></div>
    <div id="myChart3" :style="{ width: '1500px', height: '550px' }"></div>
  </n-layout>
  <n-drawer
    v-model:show="formVisible"
    width="100%"
    :height="200"
    placement="right"
    :to="$refs.page && $refs.page.$el"
  >
    <n-drawer-content
      title="新闻新建"
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
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted  } from "vue";
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
import * as echarts from 'echarts'
import {  add, edit, del, details,portalPortalHis,portalNewsNumber,portalPartHis } from "./api";
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
  },
  setup() {
    const nwTable = ref(null);
    const message = useMessage();
    const formVisible= ref(false);
    const model = {}
    // const {proxy} = getCurrentInstance()
   
    const _setHomePage = (row)=>{
      setHomePage(row.id).then(res=>{
        message.success("设置成功");
        proxy.$refs.nwTable.commitQuery()
      })
    }
    onMounted(() => { // 需要获取到element,所以是onMounted的Hook
      let myChart1 = echarts.init(document.getElementById("myChart1"));
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      let myChart3 = echarts.init(document.getElementById("myChart3"));
      portalPortalHis().then(res=>{
        console.log(res,'用户访问量')
        let data = res.map(d=>d.name)
        let series = res.map(d=>d.number)
        myChart1.setOption({
          title : {
            text: '用户访问量',
          },
          tooltip : {
              trigger: 'axis'
          },
          xAxis: {
            data: data
          },
          yAxis:{},
          series: [
            {
              name: "用户访问量",
              type: "bar",
              data: series
            }
          ]
        });
      })
      portalNewsNumber().then(res=>{
        console.log(res,"新闻数量")
        let data = res.map(d=>d.name)
        let series = res.map(d=>d.number)
        myChart2.setOption({
          title : {
            text: '新闻数量',
          },
          tooltip : {
              trigger: 'axis'
          },
          xAxis: {
            data: data
          },
          yAxis:{},
          series: [
            {
              name: "新闻数量",
              type: "bar",
              data: series
            }
          ]
        });
      })
      portalPartHis().then(res=>{
        console.log(res,"栏目点击量")
        let data = res.map(d=>d.name)
        let series = res.map(d=>d.number)
        myChart3.setOption({
          title : {
            text: '栏目点击量',
          },
          tooltip : {
              trigger: 'axis'
          },
          xAxis: {
            data: data
          },
          yAxis:{},
          series: [
            {
              name: "栏目点击量",
              type: "bar",
              data: series
            }
          ]
        });
      })

      // 绘制图表
      
      window.onresize = function () { // 自适应大小
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();

      };
    });
    return {
      message,
      formVisible,
      formValue: {},
      model,
      nwTable,
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "title", title: "标题" },
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
      this.formVisible = true
      this.model = selected[0]
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