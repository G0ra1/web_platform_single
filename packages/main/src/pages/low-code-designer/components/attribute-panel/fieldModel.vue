<template>
  <n-form label-placement="top" size="small" >
    <!-- 组件可绑定的变量大一1时展现 -->
    <n-form-item label="选择变量">
      <n-scrollbar class="model-grid">
        <div v-for="item in models" :key="item[0]" class="model-grid-item">
          <div class="">
            {{ item[1].desc }}
          </div>
        </div>
      </n-scrollbar>
    </n-form-item>
    <n-form-item label="绑定模式">
      <div class="bind-mode">
        <div class="bind-mode-item active">
          <div class="icon-box">
            <nw-icon name="icon-n-y-jiaohuan" />
          </div>
          <div class="text">
            双向绑定
          </div>
        </div>
        <div class="bind-mode-item">
          <div class="icon-box">
            <nw-icon name="icon-n-y-org" />
          </div>
          <div class="text">
            计算属性
          </div>
        </div>
        <div class="bind-mode-item">
          <div class="icon-box">
            <nw-icon name="icon-n-y-treebox" />
          </div>
          <div class="text">
            自定义
          </div>
        </div>
      </div>
    </n-form-item>
    <n-form-item label="绑定字段">
      <n-input  />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  nextTick,
  h,
  onMounted,
  provide,
  computed,
} from "vue";

import { NwIcon, RequestPaging, VxeHelper, request } from "@platform/main";

import { designer } from "../../store/index";
import { compileConfig } from "../../utils/index";

import { get } from "lodash";

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    NwIcon
  },
  setup(props, context) {

    const models = computed(() => {
      return Object.entries(props.value)
    })
    // 数据绑定
    return {
      models
    };
  },
});
</script>

<style lang="less">
.attr-header {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5px;
}
.model-grid {
  height: 80px;
  background: #fff;
  border: 1px solid #ccc;
}

.bind-mode {
  display: flex;
  padding: 10px 0;
  // flex-direction: row;
  width: 100%;
  justify-content: space-around;
  >.bind-mode-item {
    border: 2px solid #ffffff00;
    border-radius: 10px;
    padding: 2px 0px;
    width: 55px;
    cursor: pointer;
    >.icon-box {
      display: flex;
      justify-content: center;
      padding-bottom: 5px;
      font-size: 18px;
    }
    >.text {
      font-size: 12px;
      text-align: center;
      // font-weight: bold;
    }
    &:hover {
      border: 2px solid var(--n-red4)
    }
    &.active {
      background: var(--n-red4);
      >.icon-box,>.text {
        color:#fff;
      }
    }
  }

}
</style>
