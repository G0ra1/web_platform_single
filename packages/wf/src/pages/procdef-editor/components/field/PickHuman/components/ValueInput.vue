<template>
  <div class="value-input">
    <n-input
      v-if="props.expreParamSource === 'hand_field'"
      size="small"
      :value="props.value"
      @update:value="updateValue"
      :disabled="props.disabled"
    />
    <n-input
      v-if="props.expreParamSource !== 'hand_field'"
      disabled
      size="small"
      :value="props.expreParamValueText"
      placeholder=""
    />
    <n-select
      :disabled="props.disabled"
      :value="props.expreParamSource"
      @update:value="updateExpreParamSource"
      size="small"
      style="width: 190px"
      :options="[
        {
          label: '手动输入',
          value: 'hand_field'
        },
        {
          label: '表单字段',
          value: 'form_field'
        },
        /*{
          label: '字段映射',
          value: 'orm_field'
        },*/
      ]"
    />
    <n-button
    :disabled="props.expreParamSource === 'hand_field' || props.disabled"
    size="small"
    type="info"
    @click="handleModal"
    
    >选择</n-button>
  </div>
  
  <pick-field-modal 
      ref="PickFieldModalRef"
      @callback="updateFieldValue"
    />

  <!-- <pick-form-field-modal
    ref="PickFormFieldModalRef"
    @callback="updateFormFieldValue"
  />
  <pick-form-orm-modal
    ref="PickFormOrmModalRef"
    @callback="updateFormOrmValue"
  /> -->
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
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

import PickFormFieldModal from '../../PickFormItem/components/PickFormFieldModal.vue'
import PickFormOrmModal from '../../PickForm/components/PickFormOrmModal.vue'
import PickFieldModal from '../../PickFormItem/components/PickFieldModal.vue'
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
    PickFormFieldModal,
    PickFormOrmModal,
    PickFieldModal
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
  emits: ['updateValue', 'updateExpreParamValueText', 'updateExpreParamSource', 'updateExpreParamValueId'],
  setup (props, context) {
    const PickFormFieldModalRef = ref(null)
    const PickFormOrmModalRef = ref(null)
    const PickFieldModalRef = ref(null)
    const handleModal = () => {
      if (props.expreParamSource === 'form_field') {
        // PickFormFieldModalRef.value.show()
        PickFieldModalRef.value.show()
      } else if (props.expreParamSource === 'orm_field') {
        PickFormOrmModalRef.value.show()
      }
    }
    return {
      PickFormFieldModalRef,
      PickFormOrmModalRef,
      PickFieldModalRef,
      props,
      handleModal,
      updateValue (e) {
        context.emit('updateValue', e)
      },
      updateFormOrmValue (e, s) {
        // 更新
        context.emit('updateValue', e)
        context.emit('updateExpreParamValueText', s)
      },
      updateFieldValue (e, s, f) {
        // 更新
        context.emit('updateValue', e)
        context.emit('updateExpreParamValueText', s)
        context.emit('updateExpreParamValueId', f) // 
      },
      updateFormFieldValue (e, s, f) {
        // 更新
        context.emit('updateValue', e)
        context.emit('updateExpreParamValueText', s)
        context.emit('updateExpreParamValueId', f) // 
      },
      updateExpreParamSource (e) {
        if (e !== props.expreParamSource) {
          context.emit('updateValue', '')
          context.emit('updateExpreParamValueText', '')
        }
        context.emit('updateExpreParamSource', e)
      }
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