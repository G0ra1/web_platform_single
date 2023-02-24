<template>
  <!-- <n-form-item :label="'test'" :rule="rule"> -->
    <n-input
      :value="value"
      @update:value="change"
      :theme-overrides="{
        paddingTiny: '0 5px',
        paddingSmall: '0 5px',
        paddingMedium: '0 5px',
        paddingLarge: '0 5px',
      }"
      placeholder="Email"
    >
      <template #prefix>
        <nw-icon :size="14" name="icon-n-y-email" />
      </template>
    </n-input>
  <!-- </n-form-item> -->
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
    formItemOption: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
    // const value = toRef(props, 'value');
    const value = ref<string>('')
    const controlledValueRef = toRef(props, 'value');
    watch(controlledValueRef, (n) => {
      value.value = n
    }, {
      immediate: true
    })

    return {
      value,
      change (d: string) {
        value.value = d
        context.emit('update:value', d)
      },
      rule: {
        trigger: 'input',
        validator: () => {
          return new Promise<void>((resolve, reject) => {
            // 格式验证
            const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
            if (reg.test(value.value)) {
              resolve()
            } else {
              reject(Error('Email地址格式不正确'))
            }
            
          })
        }
      }
    }
  },
});
</script>

<style lang='less'>
</style>