<template>
  <n-form>
    <n-form-item label="数据源类型" path="dsType">
      <n-select
        v-model:value="model.dsType"
        placeholder="请选择数据源类型"
        :options="dsOptions"
      />
    </n-form-item>
    <n-form-item label="数据源名称" path="dsName">
      <n-input placeholder="请输入数据源名称" v-model:value="model.dsName" />
    </n-form-item>
    <n-form-item label="数据源CODE" path="dsName">
      <n-input placeholder="请输入数据源CODE" v-model:value="model.dsCode" />
    </n-form-item>
    <n-form-item label="请求方式" path="dsReq">
      <n-select
        v-model:value="model.dsReq"
        placeholder="请选择请求方式"
        :options="dsReqOptions"
      />
    </n-form-item>
    <n-form-item label="HEADERS 示例{key:value}" path="dsHeaders">
      <n-input placeholder="请输入dsHeaders" v-model:value="model.dsHeaders" />
      <!-- <n-dynamic-input
        preset="pair"
        v-model:value="dsHeaders"
        key-placeholder="HEADERS名"
        value-placeholder="HEADERS值"
      /> -->
    </n-form-item>
    <n-form-item label="数据源PARAMS类型" path="dsParamsType">
      <n-select
        v-model:value="model.dsParamsType"
        placeholder="请选择数据源PARAMS类型"
        :options="dsParamsTypeOptions"
      />
    </n-form-item>
    <n-form-item label="数据源PARAMS值  示例{key:value}" path="dsParamsVal">
      <n-input
        placeholder="请输入数据源PARAMS值"
        v-model:value="model.dsParamsVal"
      />
      <!-- <n-dynamic-input
        preset="pair"
        v-model:value="dsParamsVal"
        key-placeholder="PARAMS名"
        value-placeholder="PARAMS值"
      /> -->
    </n-form-item>
    <n-form-item label="URL" path="dsUrl">
      <n-input placeholder="请输入URL" v-model:value="model.dsUrl" />
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
  NDynamicInput,
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
    NDynamicInput,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
    const nwTable = ref(null);
    const model = reactive(props.model ? props.model : {})
    const dsParamsVal = ref([]);
    const dsHeaders = ref([]);
    if (!model.dsParamsVal) {
      // dsParamsVal.value = JSON.parse(model.dsParamsVal);
      model.dsParamsVal = '{}'
    }
    if (!model.dsHeaders) {
      // dsHeaders.value = JSON.parse(model.dsHeaders);
      model.dsHeaders = '{}'
    }
    return {
      model,
      dsParamsVal,
      dsHeaders,
      dsOptions: [
        {
          label: "restFull",
          value: 0,
        },
        {
          label: "websoket",
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
      this.model.dsParamsVal = JSON.stringify(this.dsParamsVal);
      this.model.dsHeaders = JSON.stringify(this.dsHeaders);

      return this.model;
    },
  },
});
</script>