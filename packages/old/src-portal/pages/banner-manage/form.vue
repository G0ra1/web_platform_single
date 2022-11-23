<template>
  <n-spin :show="spinShow">
    <n-form>
      <n-form-item label="门户名称" path="portalId">
        <n-select
          v-model:value="model.portalId"
          placeholder="请选择门户名称"
          :options="portalOptions"
          :fallback-option="
            (value) => ({ label: '' + model.portalName, value })
          "
          :on-update:value="portalSelect"
        />
      </n-form-item>
      <n-form-item label="所属栏目" path="partId">
        <n-select
          v-model:value="model.partId"
          placeholder="请选择所属栏目"
          :options="partOptions"
          :fallback-option="(value) => ({ label: '' + model.partName, value })"
          :on-update:value="partSelect"
        />
      </n-form-item>
      <n-form-item label="新闻标题" path="title">
        <n-input placeholder="请输入新闻标题" v-model:value="model.title" />
      </n-form-item>
      <n-form-item label="新闻摘要" path="description">
        <n-input
          placeholder="请输入新闻摘要"
          v-model:value="model.description"
        />
      </n-form-item>
      <n-form-item label="缩略图" path="description">
        <n-image width="100" :src="model.imgUrl" v-if="model.imgUrl" />
        <n-upload
          :action="uploadUrl"
          accept="image/png, image/jpeg, image/bmp"
          :headers="{
            Authorization: `${tokenType} ${token}`,
          }"
          :show-file-list="false"
          @finish="handleFinish"
          @change="handChange"
          @before-upload="beforeUpload"
        >
          <nw-icon name="icon-add-bold" :size="45" />
        </n-upload>
      </n-form-item>
      <n-form-item label="内容编辑" path="c">
        <VueUeditorWrap
          v-model="model.ueditorContent"
          :config="editorConfig"
          editor-id="editor-demo-01"
        ></VueUeditorWrap>
      </n-form-item>
      <n-form-item label="备注" path="remark">
        <n-input placeholder="请输入备注" v-model:value="model.remark" />
      </n-form-item>
    </n-form>
  </n-spin>
</template>

<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import NwIcon from "/@/components/nw-icon/index.vue";
import cookies from "/@/utils/cookies.js";
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
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
  NUpload,
  NImage,
  useMessage,
  NSpin,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import Setting from "/setting";
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
    NUpload,
    NwIcon,
    NImage,
    NSpin,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
    const token = cookies.get("token");
    const tokenType = cookies.get("tokenType");
    const nwTable = ref(null);
    const msg = ref("");
    if (props.model) {
      if (!props.model.isDefault) {
        props.model.isDefault = 0;
      }
    }
    const { proxy } = getCurrentInstance();
    const model = reactive(props.model ? props.model : {});
    model.camundaProcdefKey = "test001";
    model.camundaProcdefId = "111";
    model.camundaProcinsId = "222";
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const partOptions = ref([]);
    const imgUrl = ref("");
    const message = useMessage();
    const spinShow = ref(false);
    console.log(model, ".....................");
    // const handleFinish = ({ file, event }) => {
    //   proxy.model.imgUrl = "http://192.168.1.195:8000/" + file.url;
    //   proxy.model.fileId = file.id;
    // };
    const handChange = ({ file, fileList }) => {
      console.log(file);
      console.log(fileList);
      model.files = fileList;
    };
    return {
      token,
      tokenType,
      model,
      partOptions,
      portalOptions,
      partTypeOptions,
      uploadUrl: `${Setting.apiBaseURL}/main/fileinfo?fileSource=portal`,
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
      handChange,
      imgUrl,
      message,
      spinShow,
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
    portalPartLists(portalId) {
      portalPartLists({ portalId, partTypeCode: "PBanner" }).then((res) => {
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
    portalSelect(v) {
      this.model.portalId = v;
      this.model.portalName = this.portalOptions.filter(
        (d) => d.value == v
      )[0].label;
      this.portalPartLists(v);
    },
    partTypeSelect(v) {
      this.model.partTypeId = v;
      this.model.partTypeName = this.partTypeOptions.filter(
        (d) => d.value == v
      )[0].label;
    },
    partSelect(v) {
      this.model.partId = v;
      this.model.partName = this.partOptions.filter(
        (d) => d.value == v
      )[0].label;
      this.model.partCode = this.partOptions.filter(
        (d) => d.value == v
      )[0].code;
      this.model.partTypeId = this.partOptions.filter(
        (d) => d.value == v
      )[0].partTypeId;
      this.model.partTypeName = this.partOptions.filter(
        (d) => d.value == v
      )[0].partTypeName;
      console.log(this.partOptions);
    },
    handleFinish() {
      console.log(event);
      console.log(window.event);
      console.log(JSON.parse(event.target.response));
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        this.message.success("上传成功");
      } else {
        this.message.error(msg);
      }
      this.spinShow = false;
      this.model.imgUrl = data.fileUrl;
      this.model.contentUrl = data.fileUrl;
      this.model.fileId = data.id;
    },
    beforeUpload() {
      this.spinShow = true;
    },
  },
});
</script>