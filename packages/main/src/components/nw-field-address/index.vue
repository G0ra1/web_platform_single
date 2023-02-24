<template>
  <!-- <n-form-item :label="'test'" :rule="rule"> -->
    <div style="width:100%">
      <n-cascader
      :value="value"
      @update:value="change"
      :theme-overrides="{
        paddingTiny: '0 5px',
        paddingSmall: '0 5px',
        paddingMedium: '0 5px',
        paddingLarge: '0 5px',
      }"
      placeholder="地址"
    >
      <template #prefix>
        <nw-icon :size="14" name="n-y-address" />
      </template>
    </n-cascader>
    <n-input style="margin-top: 5px;" type="textarea"  placeholder="详细地址"/>
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
      // rule: {
      //   trigger: 'input',
      //   validator: () => {
      //     return new Promise<void>((resolve, reject) => {
      //       // 格式验证
      //       const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      //       if (reg.test(value.value)) {
      //         resolve()
      //       } else {
      //         reject(Error('手机号格式不正确'))
      //       }
            
      //     })
      //   }
      // }
    }
  },
});
</script>

<style lang='less'>
</style>