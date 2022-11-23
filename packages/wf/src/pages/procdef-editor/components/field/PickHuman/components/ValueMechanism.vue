<template>
  <div class="value-input">
    <n-input
      size="small"
      :value="props.expreParamValueText"
      disabled
      placeholder="选择机构"
    />
    <n-button
    :disabled="props.disabled"
    size="small"
    type="info"
    @click="handleModal"
    
    >选择</n-button>
  </div>
  <!-- <mechanism-modal
    ref="MechanismModalRef"
    @callback="updateValue"
  /> -->
  
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-jigou" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        机构选择
      </div>
    </template>
    <div style="height: 400px">
      <mechanism-grid :value="selected" @callback="callback" />
    </div>
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSelect,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import MechanismModal from './modal/mechanism.vue'
import MechanismGrid from './mdmGrid/mechanism.vue'

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NSelect,
    NwIcon,
    MechanismModal,
    MechanismGrid
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    expreParamValueText: {
      type: String,
      default: ''
    },
    expreParamSource: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['updateValue', 'updateExpreParamValueText', 'updateExpreParamSource'],
  setup (props, context) {
    const visible = ref(false)
    const handleModal = () => {
      visible.value = true
      // MechanismModalRef.value.show()
    }
    const selected = computed(() => [props.value])
    return {
      visible,
      props,
      handleModal,
      callback (f, d, t) {
        if (f) {
          context.emit('updateValue', d)
          context.emit('updateExpreParamValueText', t)
          nextTick().then(() => {
            visible.value = false
          })
        }
      },
      selected
    }

  }
}
</script>

<style lang='less' scoped>
.value-input {
  display: flex;
  height: 20px;
  :deep(.n-select) {
    display: flex;
    .n-base-selection__border {
      border-left: none;
      // border-right: none;
    }
  }
}
</style>