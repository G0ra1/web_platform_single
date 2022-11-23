<template>
  <n-form>
    <n-form-item label="门户名称" path="portalId">
      <n-select
        v-model:value="model.portalId"
        placeholder="请选择门户名称"
        :options="portalOptions"
        :on-update:value="portalSelect"
      />
    </n-form-item>
    <n-form-item label="栏目类型" path="partTypeId">
      <n-select
        v-model:value="model.partTypeId"
        placeholder="请选择栏目类型"
        :options="partTypeOptions"
        :on-update:value="partTypeSelect"
      />
    </n-form-item>
    <n-form-item label="所属栏目" path="partId">
      <n-select
        v-model:value="model.partId"
        placeholder="请选择所属栏目"
        :options="partOptions"
        :on-update:value="partSelect"
      />
    </n-form-item>
    <n-form-item label="标题" path="title">
      <n-input placeholder="请输入标题" v-model:value="model.title" />
    </n-form-item>
    <n-form-item label="摘要" path="description">
      <n-input placeholder="请输入标题" v-model:value="model.description" />
    </n-form-item>
    <n-form-item label="内容路径" path="contentUrl">
      <n-input placeholder="请输入内容路径" v-model:value="model.contentUrl" />
    </n-form-item>
    <n-form-item label="备注" path="remark">
      <n-input placeholder="请输入备注" v-model:value="model.remark" />
    </n-form-item>
    <n-form-item label="内容编辑" path="c">
      <VueUeditorWrap
        v-model="model.ueditorContent"
        :config="editorConfig"
        editor-id="editor-demo-01"
      ></VueUeditorWrap>
    </n-form-item>
  </n-form>
</template>

<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { defineComponent, ref, reactive } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { portalPortalLists, portalPartTypeLists, portalPartLists } from "./api";
export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NwTable,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NwTableFun,
    NForm,
    NFormItem,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
    const nwTable = ref(null);
    const msg = ref("");
    if (props.model) {
      if (!props.model.isDefault) {
        props.model.isDefault = 0;
      }
    }
    const model = props.model ? props.model : { isDefault: 0 };
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const partOptions = ref([]);
    return {
      model,
      partOptions,
      portalOptions,
      partTypeOptions,
      editorConfig: {},
      msg,
      isLoginOptions: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
      dsParamsTypeOptions: [
        {
          label: "params",
          value: 0,
        },
        {
          label: "body",
          value: 1,
        },
      ],
      dsReqOptions: [
        {
          label: "get",
          value: 0,
        },
        {
          label: "post",
          value: 1,
        },
      ],
    };
  },
  created() {
    // 获取门户
    portalPortalLists().then((res) => {
      this.portalOptions = res.map((d) => {
        return { label: d.portalName, value: d.id };
      });
    });
    // 获取栏目类型
    portalPartTypeLists().then((res) => {
      this.partTypeOptions = res.map((d) => {
        return { label: d.partTypeName, value: d.id };
      });
    });
    // 获取所属栏目
    portalPartLists({}).then((res) => {
      console.log(res);
      this.partOptions = res.map((d) => {
        return { label: d.partName, value: d.id };
      });
    });

    // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
    this.editorConfig = {
      // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
      UEDITOR_HOME_URL: "../../UEditor/",
      // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
      serverUrl: `${Setting.ueServerUrl}api/v4.3/file/ueditor/exec`,
    };
  },
  methods: {
    setModel(v) {
      this.model = v;
    },
    getModel() {
      return this.model;
    },
    portalSelect(v) {
      this.model.portalId = v;
      this.model.portalName = this.portalOptions.filter(
        (d) => (d.value== v)
      )[0].label;
    },
    partTypeSelect(v) {
      this.model.partTypeId = v;
      this.model.partTypeName = this.partTypeOptions.filter(
        (d) => (d.value== v)
      )[0].label;
    },
    partSelect(v) {
      this.model.partId = v;
      this.model.partName = this.partOptions.filter(
        (d) => (d.value== v)
      )[0].label;
    },
  },
});
</script>