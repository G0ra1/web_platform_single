<template>
  <n-form>
    <n-form-item label="门户名称" path="portalName">
      <n-input placeholder="请输入门户名称" v-model:value="model.portalName" />
    </n-form-item>
    <n-form-item label="是否登录" path="isLogin">
      <n-select
        v-model:value="model.isLogin"
        placeholder="请选择是否登录"
        :options="isLoginOptions"
      />
    </n-form-item>
    <n-form-item label="是否启用" path="isEnable">
      <n-select
        v-model:value="model.isEnable"
        placeholder="请选择是否启用"
        :options="isLoginOptions"
      />
    </n-form-item>
    <n-form-item label="是否默认首页" path="isLogin">
      <n-select
        disabled
        v-model:value="model.isDefault"
        placeholder="请选择是否默认首页"
        :options="isLoginOptions"
      />
    </n-form-item>
    <n-form-item label="备注" path="remark">
      <n-input placeholder="请输入备注" v-model:value="model.remark" />
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
    if (props.model) {
      if (!props.model.isDefault) {
        props.model.isDefault = 0;
      }
    }
    const model = reactive(props.model ? props.model : { isDefault: 0 })
    console.log(props.model, "modelmodelmodel");
    return {
      model,
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
  methods: {
    setModel(v) {
      this.model = v;
    },
    getModel() {
      return this.model;
    },
  },
});
</script>