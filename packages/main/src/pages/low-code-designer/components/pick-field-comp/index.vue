<template>
  <div class="field-comp" @click="show">
    <div class="field-comp-content">
      <component
        :is="props.value"

      >
      </component>
    </div>
    <div class="field-comp-handle">
      选择组件
    </div>
  </div>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :style="{
      width: `${props.width}px`,
      padding: 0}"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择字段组件
      </div>
    </template>
    <n-layout has-sider >
      <n-layout-content :style="{
        height: `300px`
        }">
        <n-space :size="[20, 20]" style="padding: 20px;">
          <template v-for="item in fieldComponents">
            <div class="comp-item" @click="handle(item)">
              <div class="comp-item-icon">
                <NwIcon :name="item.icon" :size="38" />
              </div>
              <div class="comp-item-label">
                {{item.label}}
              </div>
            </div>
          </template>
        </n-space>
        
      </n-layout-content>
      <!-- <n-layout-sider :width="255">
        test
      </n-layout-sider> -->
    </n-layout>
    
    <template #action>
        
      <div style="padding: 5px;">
        <!-- <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="slowUpdate"
        >
        确定
        </n-button> -->
        <n-button
        @click="visible = false" >关闭</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script setup lang="tsx">
import {
  NButton,
  NModal,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInputGroup,
  NInput
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, nextTick  } from 'vue'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'
import { cloneDeep } from 'lodash';
import { getWidget } from '../../widget-source/index'

const props = withDefaults(defineProps<{
  value: string,
  disabled: boolean,
  width?: number,
  height?: number
}>(), {
  disabled: false,
  width: 500,
  height: 400
})

const emit = defineEmits(['update:value'])

const visible = ref<boolean>(false)
// 选取缓存
const cacheSelected = ref<Array<any>>([])

const fieldComponents = ref<Array<any>>([])

const send = () => {

}
const handle = (r: any) => {
  console.log('=====rrr====', r)
  emit('update:value', r.tagName, r);
  visible.value = false
}
const show = () => {
  visible.value = true
  fieldComponents.value = getWidget().filter(d => d.category === 'field')
}

const comps = ''
defineExpose({
  show,
  send
})

</script>

<style lang='less'>
.field-comp {
  // width: 100%;
  // height: 50px;
  border: 1px dashed #ccc;
  background-color: #fff;
  cursor: pointer;
  padding: 10px;
  position: relative;
  &-content {
    pointer-events: none;
  }
  &:hover {
    >.field-comp-handle {
      visibility: visible;
    }
  }
  &-handle {
    visibility: hidden;
    position:absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #cccccc70;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: bold;
  }
}
.comp-item {
  border: 4px solid #fff;
  border-radius: 4px;
  width: 60px;
  cursor: pointer;
  &:hover {
    border: 4px solid var(--n-blue5);
  }
  &-icon {

    display: flex;
    justify-content: center;
  }
  &-label {
    display: flex;
    justify-content: center;
  }
}
</style>