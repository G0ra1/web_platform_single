<template>
  <n-popover
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
    v-model:show="show"
  >
    <template #trigger>
      <div>
        <nw-icon
          v-if="props.value"
          :name="props.value"
          :size="32"
          style="cursor: pointer"
        />
        <div
          v-if="!props.value"
          class="icon-pick-deficon"
        >
          选择
        </div>
      </div>
    </template>
    <div class="icon-pick">
      <div
        v-for="item in iconList"
        class="icon-pick-item"
        :key="item"
        @click="handle(item)"
      >
        <nw-icon
          :name="item"
          :size="32"
        />
      </div>
    </div>
  </n-popover>  
</template>
<script>
import {
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch } from 'vue'
import NwIcon from './index.vue'
import {
  NPopover,
  NSelect
} from 'naive-ui'

export default defineComponent({
  props: {
    // 接口请求
    'value': {
      type: String,
      default: ''
    },
    'size': {
      type: Number,
      default: 32
    }
  },
  components: {
    NwIcon,
    NPopover,
    NSelect
  },
  setup (props, context) {
    const show = ref(false)
    const iconList = []
    document.querySelectorAll(`symbol`).forEach(d => {
      iconList.push(d.id)
    })
    // console.log(iconList)
    return {
      show,
      props,
      iconList,
      handle (v) {
        context.emit('update:value', v)
        show.value = false
      }
    }
  }
})
</script>

<style lang='less'>
  .icon-pick {
    width: 510px;
    height: 350px;
    overflow-x: hidden;
    overflow-y: auto;
    &-item {
      display: inline-flex;
      width: 36px;
      height: 36px;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      margin: 2px;
      cursor: pointer;
      
    }
    &-item:hover {
      
      border: 2px solid #18a058;
    }
    &-deficon {
      display: flex;
      width: 32px;
      height: 32px;
      border: 1px dashed #000;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>