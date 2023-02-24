<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 300px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="false"
  >
    <template #icon>
      <nw-icon name="icon-warning" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        {{ title }}
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-spin :show="false">
      <n-layout class="nw-modal-layout">
        {{ content }}
      </n-layout>
      <div class="nw-modal-action">
        <n-button type="info" size="small" style="margin-right: 5px" @click="handle"
          >确认</n-button
        >
        <n-button size="small" @click="cancel">取消</n-button>
      </div>
    </n-spin>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, computed, h } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NRadio,
  NRadioGroup,
  NSpin,
  NModal,
} from "naive-ui";
import { NwIcon } from '@platform/main'
// import {

// } from '../../../store/process-control'

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NRadio,
    NRadioGroup,
    NSpin,
    NModal,
    NButton,
    NwIcon,
  },
  props: {},
  setup(props, context) {
    const title = ref("");
    const content = ref("");
    const visible = ref(false);
    const callBack = ref(() => {});
    const flag = ref(false);
    let gen;
    function* fun () {
      const f = yield
      
      return 2
    };
    return {
      async show2 () {
        visible.value = true;
        await nextTick().then(() => {
          gen = fun();
          gen.next()
        })
        // visible.value = false;
      },
      show(t = "提示", c, cb = () => {}) {
        flag.value = false;
        visible.value = true;
        title.value = t;
        content.value = c;
        callBack.value = cb;
      },
      handle: () => {
        // console.log('===gen===', gen.next(1))
        callBack.value()
        visible.value = false;
      },
      cancel: () => {
        // gen.next(0);
        visible.value = false;
      },
      title,
      content,
      visible,
    };
  },
};
</script>

<style lang="less" scoped>
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: center;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    padding: 20px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec;
      }
    }
  }
}
</style>
