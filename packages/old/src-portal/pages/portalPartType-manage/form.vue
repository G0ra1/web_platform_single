<template>
  <n-form>
    <n-form-item label="栏目类型名称" path="partTypeName	">
      <n-input placeholder="请输入栏目类型名称" v-model:value="model.partTypeName	" />
    </n-form-item>
    <n-form-item label="栏目类型CODE" path="partTypeCode">
      <n-input placeholder="请输入栏目类型CODE" v-model:value="model.partTypeCode" />
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
    const model = props.model ? props.model : {};
    console.log(props.model,'modelmodelmodel')
    return {
      model,
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
      dsParamsTypeOptions:[
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