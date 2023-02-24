<template>
  <div class="anchor-target" :id="props.target">
    {{props.label}}
  </div>
</template>
<script lang="ts">
import { request, NwIcon } from '@platform/main';
import {
  NFormItem,
  NInputGroup,
  NInputGroupLabel,
  NInput,
  FormItemRule
} from "naive-ui";

import { h, ref, reactive, computed, defineComponent, watch, onMounted, toRef, watchEffect } from "vue";
// 这里修改为默认
export default defineComponent({
  props: {
    label: {
      type: String,
      default: '标题'
    },
    target: {
      type: String,
      default: '1'
    }
  },
  components: {
    NwIcon,
    NFormItem,
    NInputGroup,
    NInputGroupLabel,
    NInput
  },
  emits: ['update:value'],
  setup(props, context) {

    return {
      props
    }
  },
});
</script>

<style lang='less'>
.anchor-target {
  border-left: 2px solid var(--primary-color);
  text-indent: 8px;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
}
</style>