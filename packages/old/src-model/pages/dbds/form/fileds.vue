<template>
  <n-form
    :model="model"
    ref="formRef"
    :rules="rules"
    label-placement="left"
    :label-width="160"
  >
    <n-grid x-gap="8" :cols="1">
      <n-grid-item>
        <n-form-item label="数据源名称" path="poolName">
          <n-input
            placeholder="请输入数据源名称"
            v-model:value="model.poolName"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'LOCAL'">
        <n-form-item label="本地存储路径" path="localFilePath">
          <n-input
            placeholder="请输入本地存储路径"
            v-model:value="model.localFilePath"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'LOCAL'">
        <n-form-item label="本地存储前缀" path="localFilePrefix">
          <n-input
            placeholder="请输入本地存储前缀"
            v-model:value="model.localFilePrefix"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'MINIO'">
        <n-form-item label="minio地址" path="minioUrl">
          <n-input
            placeholder="请输入minio地址"
            v-model:value="model.minioUrl"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'MINIO'">
        <n-form-item label="minio库名称" path="minioBucketName">
          <n-input
            placeholder="请输入minio库名称"
            v-model:value="model.minioBucketName"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'MINIO'">
        <n-form-item label="minio账号" path="minioAccessKey">
          <n-input
            placeholder="请输入minio账号"
            v-model:value="model.minioAccessKey"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="model.type == 'MINIO'">
        <n-form-item label="minio密码" path="passwordUnencrypted">
          <n-input
            placeholder="请输入minio密码"
            type="password"
            show-password-on="mousedown"
            v-model:value="model.passwordUnencrypted"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="是否设置默认" path="isDefault">
          <n-select
            v-model:value="model.isDefault"
            placeholder="请选择是否设置默认"
            :options="isDefaultList"
            :fallback-option="
              (value) => ({ label: '' + value == 0 ? '否' : '是', value })
            "
          />
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
import {
  fileDsList,
  add,
  edit,
  fileDsdel,
  details,
  fileDsConnect,
} from "../api/fileDs";
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
      props.model.type ? { isDefault: 0, ...props.model } : { isDefault: 0 }
    );
    console.log(model, "1111111111111111");
    const sysList = ref([]);
    const isLoading = ref(false);
    const saveForm = () => {
      const fn = !model.id ? add : edit;
      formRef.value.validate((errors) => {
        if (!errors) {
          isLoading.value = true;
          if (model.passwordUnencrypted) {
            if (model.passwordUnencrypted.length > 40) {
            } else {
              model.minioSecretKey = rsa.encrypt(model.passwordUnencrypted);
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
        } else {
          context.emit("callBack");
        }
      });
    };
    return {
      formRef,
      sysList,
      model,
      message,
      isLoading,
      saveForm,
      rules: {
        localFilePath: {
          required: true,
          message: "请输入本地存储路径",
          trigger: "blur",
        },
        localFilePrefix: {
          required: true,
          message: "请输入本地存储前缀",
          trigger: "blur",
        },
        poolName: {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur",
        },
        minioUrl: {
          required: true,
          message: "请输入minio地址",
          trigger: "blur",
        },
        minioBucketName: {
          required: true,
          message: "请输入minio库名称",
          trigger: "blur",
        },
        minioAccessKey: {
          required: true,
          message: "请输入minio账号",
          trigger: "blur",
        },
        passwordUnencrypted: {
          required: true,
          message: "请输入minio密码",
          trigger: "blur",
        },
      },
      isDefaultList: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
    };
  },
  created() {},
  methods: {
    handTest() {
      this.isLoading = true;
      if (this.model.passwordUnencrypted) {
        if (this.model.passwordUnencrypted.length > 40) {
        } else {
          this.model.minioSecretKey = rsa.encrypt(
            this.model.passwordUnencrypted
          );
        }
      }

      let formData = cloneDeep(this.model);
      fileDsConnect(formData)
        .then((res) => {
          if (res) {
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