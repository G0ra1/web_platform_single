<template>
  <n-select :disabled="props.disabled" v-if="type == 'select'" :value="props.value" :options="options" v-on="onUpdate" :size="attrs.size"
    :multiple="props.multiple" />
  <n-checkbox-group :disabled="props.disabled" :value="props.value" v-on="onUpdate" v-else-if="type == 'checkbox'">
    <n-space item-style="display: flex;">
      <n-checkbox v-for="i in options" :key="i.value" :value="i.value" :label="i.label" :size="attrs.size" />
    </n-space>
  </n-checkbox-group>
</template>
<script>
import { request } from '@platform/main';
import { NSelect, NCheckboxGroup, NCheckbox, NSpace } from "naive-ui";
import { h, ref, reactive, defineComponent, watch, onMounted } from "vue";
// 这里修改为默认
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "select",
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dictCode: {
      type: String,
      default: "",
    },
    request: {
      type: Object,
      default: () => ({
        XHR: () =>
          new Promise((resolve) => {
            resolve({ records: [] });
          }), // promise 请求函数
        params: reactive({}),
      }),
    },
    // 接口相应
    response: {
      type: Object,
      default: () => ({
        dataMethod: (res) => res,
      }),
    },
    value: {
      type: [String, Array],
      default: "",
    },
    label: {
      type: [String, Array],
      default: "",
    },
    // 自定义绑定值 custommodel
    reflect: {
      type: Array,
      default: () => [],
    },
    staticItems: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    isSort: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    }
  },
  components: {
    NSelect,
    NCheckboxGroup,
    NCheckbox,
    NSpace,
  },
  setup(props, context) {
    return {
      
    }
  },
});
</script>

<style lang='less'>
</style>