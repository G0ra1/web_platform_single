<template>
  <n-form :model="model" ref="formRef" :rules="rules">
    <n-grid x-gap="8" :cols="2">
      <n-grid-item>
        <n-form-item label="数据源名称" path="poolName">
          <n-input placeholder="请输入数据源名称" v-model:value="model.poolName" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="所属子系统" path="sysCode">
          <n-select v-model:value="model.sysCode" placeholder="请选择所属子系统" :options="sysList"
            :fallback-option="(value) => ({ label: '' + model.sysName, value })" :on-update:value="sysSelect" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="用户名" path="username">
          <n-input placeholder="请输入用户名" v-model:value="model.username" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="密码" path="passwordUnencrypted">
          <n-input placeholder="请输入密码" type="password" @input="handlePasswordInput" show-password-on="mousedown"
            v-model:value="model.passwordUnencrypted" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="url" path="url">
          <n-input placeholder="请输入url" v-model:value="model.url" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="是否启用" path="isEnable">
          <n-select v-model:value="model.isEnable" placeholder="请选择是否启用" :options="isEnableList" :fallback-option="
            (value) => ({ label: '' + value == 0 ? '否' : '是', value })
          " />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="是否默认数据源">
          <n-select v-model:value="model.isDefault" placeholder="请选择是否默认数据源" :options="isDefaultList" :fallback-option="
            (value) => ({ label: '' + value == 0 ? '否' : '是', value })
          " />
        </n-form-item>
      </n-grid-item>
    </n-grid>
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
import { dictItemLists, list, add, edit, del, details, check } from "../api";
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
      props.model.id
        ? {
          ...props.model,
          passwordUnencrypted: props.model.password,
        }
        : {
          isEnable: 1,
          isDefault: 0,
          username: "root",
          passwordUnencrypted: "root",
          url:
            props.model.type == "mysql"
              ? "jdbc:mysql://主机:端口/数据库名?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&allowMultiQueries=true&useSSL=false"
              : props.model.type == "oracle"
                ? "jdbc:oracle:thin:@主机:端口/数据库名"
                : "jdbc:sqlserver://主机:端口;databaseName=数据库名",
          ...props.model,
        }
    );
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const sysList = ref([]);
    const rPasswordFormItemRef = ref(null);
    const isLoading = ref(false);
    const saveForm = () => {
      const fn = !model.id ? add : edit;
      formRef.value.validate((errors) => {
        if (!errors) {
          isLoading.value = true;
          if (model.passwordUnencrypted.length > 40) {
          } else {
            model.password = rsa.encrypt(model.passwordUnencrypted);
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
    return {
      formRef,
      sysList,
      model,
      portalOptions,
      partTypeOptions,
      editorConfig: {},
      rPasswordFormItemRef,
      message,
      isLoading,
      saveForm,
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
      isDefaultList: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        }
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
  created() {
    this.dictItemLists();
  },
  methods: {
    dictItemLists() {
      dictItemLists({ code: "APP_NAME" }).then((res) => {
        console.log(res);
        this.sysList = res.map((d) => {
          return {
            label: d.dictItemName,
            value: d.dictItemCode,
          };
        });
      });
    },
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
        .catch((e) => { })
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
    getModel() {
      return this.model;
    },
    typeSelect(v) {
      this.model.type = v;
    },
    sysSelect(v) {
      this.model.sysCode = v;
      this.model.sysName = this.sysList.filter((d) => d.value == v)[0].label;
    },
  },
});
</script>