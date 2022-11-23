<template>
  <n-config-provider
    abstract
    namespace="splic"
    :theme-overrides="theme"
    >
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
            label: '变量映射',
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
    <!-- <pick-form-field-modal
      ref="PickFormFieldModalRef"
      @callback="updateFormFieldValue"
    /> -->
    <!-- <pick-form-all-field-modal 
      ref="PickFormAllFieldModalRef"
      @callback="updateFormFieldValue"
    />
    <pick-form-orm-modal
      ref="PickFormOrmModalRef"
      @callback="updateFormOrmValue"
    /> -->
    <pick-field-modal 
      ref="PickFieldModalRef"
      @callback="updateFieldValue"
    />
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NConfigProvider,
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

import PickFormAllFieldModal from '../../../PickFormItem/components/PickFormAllFieldModal.vue'
import PickFormOrmModal from '../../../PickForm/components/PickFormOrmModal.vue'

import PickFieldModal from '../../../PickFormItem/components/PickFieldModal.vue'
export default {
  components: {
    NConfigProvider,
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
    // PickFormFieldModal,
    PickFormOrmModal,
    PickFormAllFieldModal,
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
    const PickFormAllFieldModalRef = ref(null)
    const PickFormOrmModalRef = ref(null)
    const PickFieldModalRef = ref(null)
    const handleModal = () => {
      if (props.expreParamSource === 'form_field') {
        // PickFormAllFieldModalRef.value.show()
        
        PickFieldModalRef.value.show()
      } else if (props.expreParamSource === 'orm_field') {
        // PickFormOrmModalRef.value.show()
      }
    }
    return {
      PickFormAllFieldModalRef,
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
      // 切换模式时触发
      updateExpreParamSource (e) {
        if (e !== props.expreParamSource) {
          context.emit('updateValue', '')
          context.emit('updateExpreParamValueText', '')
        }
        context.emit('updateExpreParamSource', e)
      },
      theme: {
        Tag: {
          heightSmall: '14px'
        },
        Input: {
          color: null,
          colorFocus: null,
          textColor: null,
          border: null,
          borderHover: null,
          borderFocus: null,
          // fontSizeSmall: null,
          // heightSmall: null,
          caretColor: null,
          // color: null,
          // colorFocus: '#484848',
          // textColor: '#ccc',
          // border: '1px solid #1e1e1e',
          fontSizeSmall: '12px',
          heightSmall: '24px',
          // 锁定
          // colorDisabled: '#484848',
          // borderDisabled: '1px solid #1e1e1e',
          textColorDisabled: '#4d4d4d',
          // placeholderColorDisabled: '#a3a3a3',
        },

        Button: {
          heightSmall: '24px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
          
        Select: {
          peers: {
            InternalSelection: {
              paddingSingle: '0px 20px 0px 8px',
              heightSmall: '24px',
              // color: '#484848',
              // colorActive: '#484848',
              // textColor: '#ccc',
              // border: '1px solid #1e1e1e',
              fontSizeSmall: '12px',
              menuBoxShadow: '1px 0px 7px 1px #000',
              // 锁定
              // colorDisabled: '#484848',
              // borderDisabled: '1px solid #1e1e1e',
              // textColorDisabled: '#a3a3a3',
              // placeholderColorDisabled: '#a3a3a3',
            },
            InternalSelectMenu: {
              optionFontSizeSmall: '12px',
              optionHeightSmall: '14px',
              // color: '#4e4e4e',
              // optionTextColor: '#aaa',
              // optionTextColorActive: '#ccc',
              // optionColorPending: '#484848',
              peers: {
              }
            },
            
            Empty: {
              fontSizeSmall: '12px',
              iconSizeSmall: '20px',
              // textColor: '#0f0'
            }
          }
        }
      }
    }

  }
}
</script>

<style lang='less' scoped>
.value-input {
  display: flex;
  // height: 28px;
  :deep(.n-select) {
    display: flex;
    .n-base-selection__border {
      border-left: none;
      // border-right: none;
    }
  }
}
</style>