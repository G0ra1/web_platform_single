<template>
  <n-spin :show="isLoading">
    <n-form :rules="rules" ref="formRef" :model="model">
      <n-form-item label="数据源名称" path="poolName">
        <n-input placeholder="请输入数据源名称" v-model:value="model.poolName" />
      </n-form-item>
      <n-form-item label="数据源类型" path="type">
        <n-select
          v-model:value="model.type"
          placeholder="请选择数据源类型"
          :options="typeList"
          :fallback-option="(value) => ({ label: '' + 'mysql', value })"
          :on-update:value="typeSelect"
        />
      </n-form-item>
      <n-form-item label="所属子系统" path="sysCode">
        <n-select
          v-model:value="model.sysCode"
          placeholder="请选择所属子系统"
          :options="sysList"
          :fallback-option="(value) => ({ label: '' + model.sysName, value })"
          :on-update:value="sysSelect"
        />
      </n-form-item>
      <n-form-item label="用户名" path="username">
        <n-input placeholder="请输入用户名" v-model:value="model.username" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          placeholder="请输入密码"
          type="password"
          @input="handlePasswordInput"
          v-model:value="model.password"
        />
      </n-form-item>
      <n-form-item label="url" path="url">
        <n-input placeholder="请输入url" v-model:value="model.url" />
      </n-form-item>
      <n-form-item label="是否启用" path="isEnable">
        <n-select
          v-model:value="model.isEnable"
          placeholder="请选择是否启用"
          :options="isEnableList"
          :fallback-option="
            (value) => ({ label: '' + value == 0 ? '否' : '是', value })
          "
        />
      </n-form-item>
    </n-form>
  </n-spin>
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
  NSpin
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun
} from "/@/components/nw-table/index.vue";
import Setting from "/setting";
import { dictItemLists } from "./api";
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
    NSpin
  },
  props: {
    model: {
      default: {},
      type: Object
    }
  },
  setup(props) {
    const nwTable = ref(null);
    const message = useMessage();
    const msg = ref("");
    const formRef = ref();
    const model = reactive(
      props.model.id
        ? { ...props.model }
        : {
            type: "1",
            isEnable: 1,
            username:'root',
            password:'root',
            url:
              "jdbc:mysql://主机:端口/数据库名?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&allowMultiQueries=true&useSSL=false"
          }
    );
    console.log(props.model,'............')
    const portalOptions = ref([]);
    const partTypeOptions = ref([]);
    const sysList = ref([]);
    const rPasswordFormItemRef = ref(null);
    const isLoading = ref(false);
    function validatePasswordStartWith(rule, value) {
      console.log(model, "111111111111111");
      return (
        model.password &&
        model.password.startsWith(value) &&
        model.password.length >= value.length
      );
    }
    function validatePasswordSame(rule, value) {
      return value === model.password;
    }
    return {
      formRef,
      sysList,
      model,
      portalOptions,
      partTypeOptions,
      editorConfig: {},
      rPasswordFormItemRef,
      msg,
      isLoading,
      typeList: [
        {
          label: "mysql",
          value: "1"
        },
        {
          label: "oracle",
          value: "2"
        }
      ],
      isEnableList: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
      rules: {
        poolName: {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur"
        },
        type: {
          required: true,
          message: "请选择数据源类型",
          trigger: "blur"
        },
        sysCode: {
          required: true,
          message: "请选择所属子系统",
          trigger: "blur"
        },
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        },
        url: {
          required: true,
          message: "请输入url",
          trigger: "blur"
        }
      }
    };
  },
  created() {
    this.dictItemLists();
  },
  methods: {
    dictItemLists() {
      dictItemLists({ code: "APP_NAME" }).then(res => {
        console.log(res);
        this.sysList = res.map(d => {
          return {
            label: d.dictItemName,
            value: d.dictItemCode
          };
        });
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
      this.model.sysName = this.sysList.filter(d => d.value == v)[0].label;
    }
  }
});
</script>