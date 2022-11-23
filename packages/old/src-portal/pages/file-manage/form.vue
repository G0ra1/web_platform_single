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
      <n-form-item
        label="文件列表"
        path="description"
        style="position: relative"
      >
        <n-upload
          :action="uploadUrl"
          accept="*/*"
          :show-file-list="false"
          :headers="{
            Authorization: `${tokenType} ${token}`,
          }"
          @finish="handleFinish"
          @change="handChange"
          @before-upload="beforeUpload"
          style="position: absolute; z-index: 1; left: 65px; top: -31px"
        >
          <n-button size="small" type="info">
            <nw-icon name="icon-add-bold" :size="15" />
            上传文件
          </n-button>
        </n-upload>
        <n-button
          size="small"
          type="info"
          style="position: absolute; z-index: 1; left: 166px; top: -31px"
          @click="addFileOutLink"
        >
          <nw-icon name="icon-add-bold" :size="15" />
          添加外联
        </n-button>
        <vxe-table
          border="inner"
          :data="filesSons"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          style="width: 100%"
          ref="filesTable"
          show-overflow
          @edit-actived="editActivedEvent"
        >
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            field="fileName"
            title="文件名称"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          >
          </vxe-table-column>
          <vxe-table-column
            field="fileUrl"
            title="文件地址"
            :edit-render="{
              name: 'input',
              attrs: { type: 'text', disabled: fileUrlDisabled },
              props: { disabled: fileUrlDisabled },
            }"
          >
          </vxe-table-column>
          <vxe-table-column field="isOutLink" title="是否外联">
            <template #default="{ row, _rowIndex }">
              <n-radio
                :checked="row.isOutLink === 1"
                @change="(e) => isOutLinkChange(e, row, _rowIndex)"
                value="1"
                name="isOutLink"
                disabled
              >
                是
              </n-radio>
              <n-radio
                :checked="row.isOutLink === 0"
                @change="(e) => isOutLinkChange(e, row, _rowIndex)"
                value="0"
                name="isOutLink"
                disabled
              >
                否
              </n-radio>
            </template>
          </vxe-table-column>
          <vxe-table-column field="#" title="操作">
            <template #default="{ _rowIndex }">
              <n-button
                type="error"
                size="small"
                style="margin-right: 5px"
                @click="
                  () => {
                    filesSons.splice(_rowIndex, 1);
                    $refs.filesTable.loadData(filesSons);
                  }
                "
                >删除</n-button
              >
            </template>
          </vxe-table-column>
        </vxe-table>
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
  NRadio,
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
    NRadio,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {};
  },
  setup(props) {
    const nwTable = ref(null);
    const token = cookies.get("token");
    const tokenType = cookies.get("tokenType");
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
    const filesSons = reactive([]);
    if (model.filesSons) {
      filesSons.push(...model.filesSons);
    }
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const partOptions = ref([]);
    const imgUrl = ref("");
    const message = useMessage();
    const spinShow = ref(false);
    const handChange = ({ file, fileList }) => {
      // model.files = fileList;
    };
    const fileUrlDisabled = ref(false);
    return {
      token,
      tokenType,
      model,
      partOptions,
      portalOptions,
      partTypeOptions,
      uploadUrl:`${Setting.apiBaseURL}/main/fileinfo?fileSource=portal`,
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
      filesSons,
      fileUrlDisabled,
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
    this.editorConfig = {
      // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
      UEDITOR_HOME_URL: "../../UEditor/",
      serverUrl: `${Setting.ueServerUrl}api/v4.3/file/ueditor/exec`,
    };
  },
  methods: {
    portalPartLists(portalId) {
      portalPartLists({  portalId, partTypeCode: "PFileList" }).then((res) => {
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
    setModel(v) {
      this.model = v;
    },
    getModel() {
      this.model.filesSons = this.filesSons;
      return this.model;
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
    },
    handleFinish() {
      // console.log(event);
      // console.log(window.event);
      // console.log(JSON.parse(event.target.response));
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        this.message.success("上传成功");
        this.filesSons.push({ ...data, fileId: data.id, isOutLink: 0 });
        this.$refs.filesTable.loadData(this.filesSons);
      } else {
        this.message.error(msg);
      }
      this.spinShow = false;
    },
    beforeUpload() {
      this.spinShow = true;
    },
    isOutLinkChange(e, v, i) {
      this.filesSons[i].isOutLink = e.target.value * 1;
      this.$refs.filesTable.loadData(this.filesSons);
    },
    addFileOutLink() {
      this.filesSons.push({ isOutLink: 1 });
      this.$refs.filesTable.loadData(this.filesSons);
    },
    editActivedEvent({ rowIndex, row }) {
      this.fileUrlDisabled = row.isOutLink === 0;
    },
  },
});
</script>