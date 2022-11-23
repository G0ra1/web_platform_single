<template>

  <n-input :value="props.value" disabled placeholder="" />
</template>
<script>
import {
  NBadge,
  NButton,
  NInput
} from "naive-ui";
import { h, ref, reactive, defineComponent, watch, computed } from "vue";
import { request } from '@platform/main'

// 获取功能 流程入口按钮
export default defineComponent({
  components: {
    NButton,
    NInput
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    formName: {
      type: String,
      default: ''
    },
    formField: {
      type: String,
      default: ''
    },
    formValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    // console.log('=====power=====', inject('workflow'))
    const formatStr = ref('')
    const formatFun = computed(() => {
      return new Function('f', `return \`${formatStr.value}\``)
    })
    const callback = () => {
      context.emit('update:value', formatFun.value(props.formValue).replaceAll('undefined', ''))
      console.log(formatFun.value(props.formValue).replaceAll('undefined', ''), '1111111111111111111')
    }
    // 当value 为特定值时生成
    if (props.value === 'init' || !props.value) {
      // 这里请求规则
      request({
        url: `/main/encondRuleValue/createValue?formName=${props.formName}&encondField=${props.formField}`,
        method: 'get'
      }).then(res => {
        if (res) {
          // 前端生成
          formatStr.value = res
          watch(props.formValue, () => {
            // console.log('')
            callback()
          })
          // 初始化用特殊的赋值
          callback()
        } else {
          // 空为后台生成
          context.emit('update:value', '后台生成')
        }
      })

    }
    return {
      props
    };
  }
});
</script>

<style lang='less'>
</style>