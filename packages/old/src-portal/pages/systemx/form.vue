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
      <n-form-item label="系统集成" path="description" style="position: relative">
        <n-button
          size="small"
          type="info"
          style="position: absolute; z-index: 1; left: 70px; top: -31px"
          @click="addFileOutLink"
        >
          <nw-icon name="icon-add-bold" :size="15" />添加系统集成
        </n-button>
        <vxe-table
          border="inner"
          :data="sysjointsSons"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          style="width: 100%;"
          :height="sysjointsSons.length>9?500:(sysjointsSons.length+1)*48"
          ref="sysjointsTable"
          class="mytable-scrollbar"
          show-overflow
          @edit-actived="editActivedEvent"
        >
          <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
          <vxe-table-column
            field="sysName"
            title="系统名称"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysCode"
            title="系统标识"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysUrl"
            title="系统地址"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="mobileSysUrl"
            title="移动端系统地址"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="taskCountUrl"
            title="待办数量地址"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysImgUrl"
            title="显示图标"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          >
            <template #edit="{ _rowIndex }">
              <n-upload
                :action="uploadUrl"
                accept="image/png, image/jpeg, image/bmp"
                :show-file-list="false"
                :headers="{
                  Authorization: `${tokenType} ${token}`,
                }"
                @finish="handleFinish(_rowIndex)"
                @change="handChange"
                @before-upload="beforeUpload"
              >
                <n-button>上传</n-button>
              </n-upload>
            </template>
            <template #default="{ row }">
              <n-image width="36" :src="row.sysImgUrl" v-if="row.sysImgUrl" />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="headers"
            title="headers"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column
            field="isHaveToken"
            title="是否携带token"
            :edit-render="{
              name: '$select',
              options: isHaveTokenList,
              props: { clearable: true },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysReq"
            title="请求方式"
            :edit-render="{
              name: '$select',
              options: sysReqList,
              props: { clearable: true },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysParamsType"
            title="params类型"
            :edit-render="{
              name: '$select',
              options: paramsList,
              props: { clearable: true },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="sysParamsVal"
            title="params值"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          ></vxe-table-column>
          <vxe-table-column field="#" title="操作">
            <template #default="{ _rowIndex }">
              <n-button
                type="error"
                size="small"
                style="margin-right: 5px"
                @click="
                  () => {
                    sysjointsSons.splice(_rowIndex, 1);
                    $refs.sysjointsTable.loadData(sysjointsSons);
                  }
                "
              >删除</n-button>
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
  NRadio
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun
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
    NRadio
  },
  props: {
    model: {
      default: {},
      type: Object
    }
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
    const sysjointsSons = reactive([]);
    if (model.sysjointsSons) {
      sysjointsSons.push(...model.sysjointsSons);
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
    const sysReqList = [
      {
        label: "GET",
        value: 0
      },
      {
        label: "POST",
        value: 1
      }
    ];
    const isHaveTokenList = [
      {
        label: "是",
        value: 1
      },
      {
        label: "否",
        value: 0
      }
    ];
    const paramsList = [
      {
        label: "params",
        value: 0
      },
      {
        label: "body",
        value: 1
      }
    ];
    const fileUrlDisabled = ref(false);
    return {
      token,
      tokenType,
      model,
      paramsList,
      sysReqList,
      partOptions,
      portalOptions,
      isHaveTokenList,
      uploadUrl: `${Setting.apiBaseURL}/main/fileinfo?fileSource=portal`,
      partTypeOptions,
      editorConfig: {},
      msg,
      isLoginOptions: [
        {
          label: "否",
          value: 0
        },
        {
          label: "是",
          value: 1
        }
      ],
      dsParamsTypeOptions: [
        {
          label: "params",
          value: 0
        },
        {
          label: "body",
          value: 1
        }
      ],
      dsReqOptions: [
        {
          label: "get",
          value: 0
        },
        {
          label: "post",
          value: 1
        }
      ],
      handChange,
      imgUrl,
      message,
      spinShow,
      sysjointsSons,
      fileUrlDisabled
    };
  },
  created() {
    // 获取门户
    portalPortalLists().then(res => {
      this.portalOptions = res.map(d => {
        return { label: d.portalName, value: d.id };
      });
    });
    // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
    this.editorConfig = {
      // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
      UEDITOR_HOME_URL: "../../UEditor/",
      serverUrl: `${Setting.ueServerUrl}api/v4.3/file/ueditor/exec`
    };
  },
  methods: {
    portalPartLists(portalId) {
      portalPartLists({ portalId, partTypeCode: "PTile" }).then(res => {
        this.partOptions = res.map(d => {
          return {
            label: d.partName,
            value: d.id,
            code: d.partCode,
            partTypeId: d.partTypeId,
            partTypeName: d.partTypeName
          };
        });
      });
    },
    setModel(v) {
      this.model = v;
    },
    getModel() {
      this.model.sysjointsSons = this.sysjointsSons;
      return this.model;
    },
    portalSelect(v) {
      this.model.portalId = v;
      this.model.portalName = this.portalOptions.filter(
        d => d.value == v
      )[0].label;
      this.portalPartLists(v);
    },
    partTypeSelect(v) {
      this.model.partTypeId = v;
      this.model.partTypeName = this.partTypeOptions.filter(
        d => d.value == v
      )[0].label;
    },
    partSelect(v) {
      this.model.partId = v;
      this.model.partName = this.partOptions.filter(d => d.value == v)[0].label;
      this.model.partCode = this.partOptions.filter(d => d.value == v)[0].code;
      this.model.partTypeId = this.partOptions.filter(
        d => d.value == v
      )[0].partTypeId;
      this.model.partTypeName = this.partOptions.filter(
        d => d.value == v
      )[0].partTypeName;
    },
    beforeUpload() {
      this.spinShow = true;
    },
    isOutLinkChange(e, v, i) {
      this.sysjointsSons[i].isOutLink = e.target.value * 1;
      this.$refs.sysjointsTable.loadData(this.sysjointsSons);
    },
    addFileOutLink() {
      this.sysjointsSons.push({ isOutLink: 1 });
      this.$refs.sysjointsTable.loadData(this.sysjointsSons);
    },
    editActivedEvent({ rowIndex, row }) {
      this.fileUrlDisabled = row.isOutLink === 0;
    },
    handleFinish(_rowIndex) {
      console.log(_rowIndex);
      this.spinShow = false;

      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        this.message.success("上传成功");
      } else {
        this.message.error(msg);
      }
      this.sysjointsSons[_rowIndex].sysImgUrl = data.fileUrl; // Setting.apiBaseURL+
      this.$refs.sysjointsTable.loadData(this.sysjointsSons);
    }
  }
});
</script>
<style lang="less">
     .mytable-scrollbar ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        /*滚动条的轨道*/
        .mytable-scrollbar ::-webkit-scrollbar-track {
          background-color: #FFFFFF;
        }
        /*滚动条里面的小方块，能向上向下移动*/
        .mytable-scrollbar ::-webkit-scrollbar-thumb {
          background-color: #bfbfbf;
          border-radius: 5px;
          border: 1px solid #F1F1F1;
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }
        .mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
          background-color: #A8A8A8;
        }
        .mytable-scrollbar ::-webkit-scrollbar-thumb:active {
          background-color: #787878;
        }
        /*边角，即两个滚动条的交汇处*/
        .mytable-scrollbar ::-webkit-scrollbar-corner {
          background-color: #FFFFFF;
        }
</style>