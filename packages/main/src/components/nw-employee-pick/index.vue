<template>

  <n-button
    :disabled="props.disabled"
    :size="props.size"
    type="info"
    @click="handleModal"
    
  >选择</n-button>
  <!-- <mechanism-modal
    ref="MechanismModalRef"
    @callback="updateValue"
  /> -->
  
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-yonghu" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        人员选择
      </div>
    </template>
    <div style="height: 400px">
      <user-grid :value="selected" @callback="callback" />
    </div>
    <div style="border-top: 1px solid #ccc ;padding: 5px;text-align: right">
      <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button>
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

import UserGrid from './user.vue'

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
    UserGrid
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
    size: {
      type: String,
      default: 'small'
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
      // 赋值默认
      const ids = props.value.split(',')
      const names = props.expreParamValueText.split(',')
      selected.value = ids.filter(d => d).map((id, i) => ({
        id,
        name: names[i]
      }))
      // MechanismModalRef.value.show()
    }
    const selected = ref([])
    // const selected = computed(() => {
    //   const ids = props.value.split(',')
    //   const names = props.expreParamValueText.split(',')
    //   return ids.map((id, i) => ({
    //     id,
    //     name: names[i]
    //   }))
    // })

    const handleModalComplete = () => {
      context.emit('updateValue', selected.value.map(d => d.id).join(','))
      context.emit('updateExpreParamValueText', selected.value.map(d => d.name).join(','))
      nextTick().then(() => {
        visible.value = false
      })
    }
    return {
      visible,
      props,
      handleModal,
      handleModalComplete,
      callback (f, id, name) {
        if (f) {
          // context.emit('updateValue', d)
          // context.emit('updateExpreParamValueText', t)
          // nextTick().then(() => {
          //   visible.value = false
          // })
          selected.value.push({
            id,
            name
          })
        } else {
          const index = selected.value.findIndex(d => d.id === id)
          if (index >= 0) selected.value.splice(index, 1)
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