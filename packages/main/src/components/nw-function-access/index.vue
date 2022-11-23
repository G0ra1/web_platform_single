<template>
  <n-button
    v-bind="props.btnOption"
    @click="handleBtn"
    :loading="isLoading"
    style="margin-right: 5px;"
  >{{props.btnText || functionData.shortName}}</n-button>
  <nw-function-viewer
    ref="FunctionViewRef"
    @cancel="onCancel"
    @complete="onComplete"
  />
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, nextTick, computed } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NModal,
  NPopconfirm,
  NMessageProvider,
  NSpin
  
} from "naive-ui";

import { NwIcon, request, NwFunctionViewer } from '@platform/main'

// import { createConfig, editConfig } from './data.js'
import { get } from 'lodash'

class FunAcc {
  static funMap = {}
  static funNum = 0
}

const FunResource = {}

export default defineComponent({
  props: {
    btnText: {
      type: String,
      default: ''
    },
    btnOption: {
      type: Object,
      default: () => ({
        size: 'small',
        type: 'primary'
      })
    },
    functionConfig: { // 功能配置信息
      type: Object,
      default: () => ({})
    },
    fnCode: { // 功能ID
      type: String,
      default: ''
    },
    params: { // 请求参数
      type: Array,
      default: () => ([])
    },
    // 表单回写参数
    formCache: {
      type: Object,
      default: () => ({})
    },
    // 提交时携带参数
    carryParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['complete'],
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NModal,
    NPopconfirm,
    NMessageProvider,
    NSpin,
    NwFunctionViewer,
    NwIcon
  },
  setup(props, context) {

    const FunctionViewRef = ref(null)
    const isLoading = ref(false)

    const functionData = ref({})

    if (!props.fnCode) {

    }

    const renderFunction = async () => {
      isLoading.value = true
      // 这里读取缓存功能如果未读取则发起请求
      if (!FunResource[props.fnCode]) {
        // 这里记录已经开始请求
        FunResource[props.fnCode] = request({
          url: `/main/mdmCpts/getCptByCode/${props.fnCode}`,
          method: 'get'
        })
      }

      FunResource[props.fnCode].then(r => {

        functionData.value = r

      }).finally(() => {

        isLoading.value = false

      })
      
    }
    renderFunction()

    // 按钮触发
    const handleBtn = () => {
      // show()
      FunctionViewRef.value.show(functionData.value, props.params)
    }

    return {
      props,
      isLoading,
      functionData,

      FunctionViewRef,
      onCancel () {
      },
      onComplete () {
        context.emit('complete')
      },
      handleBtn
    };
  }
});
</script>
<style lang="less" scoped>
.fa-modal {
  
  :deep(.n-dialog__title) {
    display: none;
  }
}
.fn-n-spin {
  
  :deep(.n-spin-content) {
    height: 100%
  }
}
</style>