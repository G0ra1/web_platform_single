<template>
  <n-select :disabled="props.disabled" v-if="type == 'select'" :value="props.value" :options="options" v-on="onUpdate"
    :size="attrs.size" :multiple="props.multiple" v-bind="props.selectOptions" />
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
    },
    selectOptions: {
      type: Object,
      default: () => ({})
    },
    selectFirst: {
      type: Boolean,
      default: false,
    },
    // checkboxOptions: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  components: {
    NSelect,
    NCheckboxGroup,
    NCheckbox,
    NSpace,
  },
  setup(props, context) {
    const attrs = context.attrs;
    console.log(attrs, 'attrsattrsattrs')
    // 判断是否是服务端分页
    const options = ref([]);
    const onUpdate = {
      "update:value": (v) => {
        // value.value = v
        // 这里获取list
        // 这里区分是否多选
        if (props.multiple || props.type == "checkbox") {
          console.log(v, "11111111111111111111");
          if (props.isSort) v.sort();
          const vo = options.value.filter((d) => v.find((s) => s === d.value));
          let vo1 = [];
          v.forEach((d) => {
            options.value.forEach((e) => {
              if (e.value == d) {
                vo1.push(e.label);
              }
            });
          });
          // const vo1 = options.value
          //   .filter((d) => v.find((s) => s === d.value))
          //   .map((d) => d.label);
          context.emit("update:value", v, vo);
          context.emit("update:label", vo1);
          context.emit("update:valueText", v.toString());
          context.emit("update:labelText", vo1.toString());
        } else {
          const option = options.value.find((d) => d.value === v) || {};

          // context.emit("update:value", v, option);
          context.emit("update:value", v, option);
          // context.emit("UpdateValue", v, option);
          context.emit("update:label", option.label, option);
          // 这里进行反射
          props.reflect.forEach((d) => {
            context.emit(`update:${d}`, option[d], option);
          });
        }
      },
    };
    const query = async () => {
      if (props.dictCode) {
        await request({
          url: `/main/dictItem/list?dictCode=${props.dictCode}`,
          method: 'get',
        }).then((res) => {
          options.value = res.map((d) => ({
            label: d.dictItemName,
            value: d.dictItemCode,
          }));
        });
        return;
      }
      // 默认使用XHR
      if (props.request.XHR) {
        await props.request.XHR(props.request.params).then((res) => {
          options.value = [
            ...props.staticItems,
            ...props.response.dataMethod(res),
          ];
        });
      } else if (props.request.url) {
        const method = props.request.method || "get";
        await request({
          url: props.request.url,
          method,
          [`${method === "get" ? "params" : "data"}`]: props.request.params,
        }).then((res) => {
          options.value = [
            ...props.staticItems,
            ...props.response.dataMethod(res),
          ];
        });
      }
    };
    onMounted(async () => {
      await query()
      if (props.selectFirst) {
        const option = options.value[0];
        context.emit("update:value", option.value, option);
        context.emit("update:label", option.label, option);
        // 这里进行反射
        props.reflect.forEach((d) => {
          context.emit(`update:${d}`, option[d], option);
        });
      }
    });
    // watch(props.label, (d) => {
    //   console.log(props.label, 'props.label')
    // })
    return {
      props,
      attrs,
      options,
      onUpdate,
      query, //查询
    };
  },
});
</script>

<style lang='less'>

</style>