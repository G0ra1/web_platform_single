<template>
  <n-form>
    <n-form-item label="主题名称" path="portalId">
      <n-input placeholder="请输入主题名称" v-model:value="props.model.themeName" />
    </n-form-item>
    <n-form-item label="是否启用" path="isUse">
      {{props.model.isUse==0?'否':'是'}}
    </n-form-item>
    <n-form-item label="主题JSON" path="partId">
      <n-input
        v-model:value="props.model.themeData"
        type="textarea"
        placeholder="JSON"
        style="height: 200px;"
      />
    </n-form-item>
    <n-form-item label="备注" path="remark">
      <n-input placeholder="请输入备注" v-model:value="props.model.remark" />
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

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NForm,
    NFormItem,
  },
  props: {
    model: {
      default: () => ({}),
      type: Object,
    },
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>