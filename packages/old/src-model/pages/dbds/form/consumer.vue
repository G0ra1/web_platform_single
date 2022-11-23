<template>
  <n-form :model="model" ref="formRef" :rules="rules">
    <n-grid x-gap="8" :cols="2">
      <n-grid-item>
        <n-form-item label="主机名" path="host">
          <n-input placeholder="请输入主机名" v-model:value="model.host" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="端口" path="port">
          <n-input placeholder="请输入端口" v-model:value="model.port" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rocket'">
        <n-form-item label="tag" path="tag">
          <n-input placeholder="请输入tag" v-model:value="model.tag" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rocket'">
        <n-form-item label="topic" path="topic">
          <n-input placeholder="请输入topic" v-model:value="model.topic" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rabbit'">
        <n-form-item label="账号" path="username">
          <n-input placeholder="请输入账号" v-model:value="model.username" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rabbit'">
        <n-form-item label="密码" path="passwordUnencrypted">
          <n-input
            placeholder="请输入密码"
            type="password"
            show-password-on="mousedown"
            v-model:value="model.passwordUnencrypted"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="消费组名" path="consumerGroup">
          <n-input
            placeholder="请输入消费组名"
            v-model:value="model.consumerGroup"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rabbit'">
        <n-form-item label="virtualHost" path="virtualHost">
          <n-input
            placeholder="请输入virtualHost"
            v-model:value="model.virtualHost"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.mq == 'rabbit'">
        <n-form-item label="queueName" path="queueName">
          <n-input
            placeholder="请输入queueName"
            v-model:value="model.queueName"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="消息处理方式" path="msgSource">
          <n-select
            v-model:value="model.msgSource"
            placeholder="请选择消息处理方式"
            :options="msgSourceList"
          />
        </n-form-item>
      </n-grid-item>
      <!-- <n-grid-item>
        <n-form-item label="是否启用" path="isEnable">
          <n-select
            v-model:value="model.isEnable"
            placeholder="请选择是否启用"
            :options="isEnableList"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="描述" path="description">
          <n-input
            placeholder="请输入描述"
            v-model:value="model.description"
          />
        </n-form-item>
      </n-grid-item> -->
      <n-grid-item v-if="model.msgSource == 'msgtmp'">
        <n-form-item label="消息模板" path="msgTmpCode">
          <n-input
            placeholder="请选择消息模板"
            v-model:value="model.msgTmpCode"
          />
          <n-button
            @click="
              () => {
                chooseMsgTmpRef.show();
              }
            "
            >+</n-button
          >
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'msgtmp'">
        <n-form-item label="消息来源内容" path="mqSourceContent">
          <n-input
            placeholder="请输入消息来源内容"
            v-model:value="model.mqSourceContent"
          />
        </n-form-item>
      </n-grid-item>
      <!-- <n-grid-item v-if="model.msgSource == 'msgtmp'">
        <n-form-item label="模板参数" path="tmpParams">
          <n-input
            placeholder="请输入模板参数"
            v-model:value="model.tmpParams"
          />
        </n-form-item>
      </n-grid-item> -->
      <n-grid-item v-if="model.msgSource == 'dbds'">
        <n-form-item label="数据源" path="dbDs">
          <n-input placeholder="请选择数据源" v-model:value="model.dbDs" />
          <n-button
            @click="
              () => {
                chooseDbdsRef.show();
              }
            "
            >+</n-button
          >
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'dbds'">
        <n-form-item label="消息来源内容" path="mqSourceContent">
          <n-input
            placeholder="请输入消息来源内容"
            v-model:value="model.mqSourceContent"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'restful'">
        <n-form-item label="接口类型" path="method">
          <n-select
            v-model:value="model.method"
            placeholder="请选择接口类型"
            :options="dsReqOptions"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'restful'">
        <n-form-item label="接口地址" path="restfulAddr">
          <n-input
            placeholder="请输入接口地址"
            v-model:value="model.restfulAddr"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'restful'">
        <n-form-item label="接口描述" path="restfulDesc">
          <n-input
            placeholder="请输入接口描述"
            v-model:value="model.restfulDesc"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'restful'">
        <n-form-item label="接口请求头" path="restfulHeder">
          <n-input
            placeholder="请输入接口请求头"
            v-model:value="model.restfulHeder"
          />
          <n-button
            size="small"
            type="text"
            style="
              position: absolute;
              top: -32px;
              left: 80px;
              color: #4098fc;
              background: none;
              border: none;
            "
            @click="
              () => {
                paramsModalRef.show(model.restfulHeder, 'header');
              }
            "
            >设置请求头</n-button
          >
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.msgSource == 'restful'">
        <n-form-item label="接口请求参数" path="restfulParam">
          <n-input
            placeholder="请输入接口请求参数"
            v-model:value="model.restfulParam"
          />
          <n-button
            size="small"
            type="text"
            style="
              position: absolute;
              top: -32px;
              left: 80px;
              color: #4098fc;
              background: none;
              border: none;
            "
            @click="
              () => {
                paramsModalRef.show(model.restfulParam, 'restful');
              }
            "
            >设置请求参数</n-button
          >
        </n-form-item>
      </n-grid-item>
    </n-grid>
    <chooseMsgTmp ref="chooseMsgTmpRef" @callback="selectedTmp"></chooseMsgTmp>
    <chooseDbds ref="chooseDbdsRef" @callback="selectedDbds"></chooseDbds>
    <paramsModal ref="paramsModalRef" @getParams="getParams"></paramsModal>
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
  useMessage,
  NSpin,
  NGrid,
  NGridItem,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import Setting from "/setting";
import { add, edit, consumerDetails } from "../api/consumer.js";
import chooseMsgTmp from "../components/chooseMsgTmp.vue";
import chooseDbds from "../components/chooseDbds.vue";
import paramsModal from "../components/paramsModal.vue";
import { cloneDeep } from "lodash";

import rsa from "/@/utils/rsa.js";
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
    NSpin,
    NGrid,
    NGridItem,
    chooseMsgTmp,
    chooseDbds,
    paramsModal,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props, context) {
    const nwTable = ref(null);
    const message = useMessage();
    const formRef = ref();
    const model = reactive(
      props.model.type == "rocketmqxf" || props.model.mq == "rocket"
        ? {
            mq: "rocket",
            isEnable: 1,
            port: "9876",
            tag: "*",
             msgSource:'restful',
            ...props.model,
          }
        : {
            mq: "rabbit",
            isEnable: 1,
            port: "5672",
             msgSource:'restful',
            ...props.model,
            passwordUnencrypted: props.model.password,
          }
    );
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const sysList = ref([]);
    const rPasswordFormItemRef = ref(null);
    const chooseMsgTmpRef = ref(null);
    const chooseDbdsRef = ref(null);
    const paramsModalRef = ref(null);
    const isLoading = ref(false);
    const saveForm = () => {
      const fn = !model.id ? add : edit;
      formRef.value.validate((errors) => {
        if (!errors) {
          isLoading.value = true;
          if (model.passwordUnencrypted) {
            if (model.passwordUnencrypted.length > 40) {
            } else {
              model.password = rsa.encrypt(model.passwordUnencrypted);
            }
          }

          fn(model)
            .then((res) => {
              if (res) {
                context.emit("callBack", true);
              }
            })
            .finally((r) => {
              context.emit("callBack");
            });
        }
      });
    };
    const selectedTmp = (v) => {
      const vD = v[0];
      model.tmpName = vD.tmpName;
      model.msgTmpId = vD.id;
      model.msgTmpCode = vD.tmpCode;
      model.mqSourceContent = vD.tmpContent;
    };
    const selectedDbds = (v) => {
      const vD = v[0];
      model.dbDs = vD.poolName;
      model.dbDsId = vD.id;
    };
    const getParams = (params, type) => {
      if (type == "header") {
        model.restfulHeder = params;
      } else {
        model.restfulParam = params;
      }
    };
    return {
      formRef,
      sysList,
      model,
      portalOptions,
      partTypeOptions,
      editorConfig: {},
      rPasswordFormItemRef,
      chooseMsgTmpRef,
      chooseDbdsRef,
      paramsModalRef,
      message,
      isLoading,
      saveForm,
      selectedTmp,
      selectedDbds,
      getParams,
      isEnableList: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      dsReqOptions: [
        {
          label: "GET",
          value: "GET",
        },
        {
          label: "POST",
          value: "POST",
        },
      ],
      msgSourceList: [
        // {
        //   label: "消息模板",
        //   value: "msgtmp",
        // },
        // {
        //   label: "数据源",
        //   value: "dbds",
        // },
        {
          label: "restful",
          value: "restful",
        },
      ],
      rules: {
        poolName: {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur",
        },
        type: {
          required: true,
          message: "请选择数据源类型",
          trigger: "blur",
        },
        sysCode: {
          required: true,
          message: "请选择所属子系统",
          trigger: "blur",
        },
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        passwordUnencrypted: {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        url: {
          required: true,
          message: "请输入url",
          trigger: "blur",
        },
      },
    };
  },
  created() {},
  methods: {
    handTest() {
      this.isLoading = true;
      if (this.model.passwordUnencrypted.length > 40) {
      } else {
        this.model.password = rsa.encrypt(this.model.passwordUnencrypted);
      }
      let formData = cloneDeep(this.model);

      check(formData)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.message.success("连接成功");
          }
        })
        .catch((e) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
    setModel(v) {
      this.model = v;
      this.model.title = v.title;
      console.log(this.model);
    },
    setLoading(t) {
      this.isLoading = t;
    },
  },
});
</script>