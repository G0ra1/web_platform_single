<template>
  <div class="render-frame">
    <div
      class="render-frame-header"
    >
      <div
        class="left"
      >
        <!-- <n-button text @click="refreshPage">
          <nw-icon name="icon-shuaxin" :size="18" />
          <span style="margin-left: 5px;">刷新</span>
        </n-button> -->
        <!-- <n-button text title="刷新" style="margin-right: 5px;" @click="handleRefresh">
          <nw-icon name="icon-shuaxin" :size="18" />
        </n-button> -->
        <n-button text title="主页" style="margin-right: 5px;" @click="handleHome">
        <nw-icon name="icon-menhu" :size="18" />
        </n-button>
        <n-input
          :theme-overrides="{'borderRadius': '0px', 'heightSmall': '22px'}"
          size="small"
          style="width: 300px"
          placeholder="路由"
          v-model:value="routePath"
        />
      </div>
      <div
        class="right"
      >
        <n-button text style="margin-right: 10px;" title="弹出窗口显示">
          <nw-icon name="icon-danchuchuangkou" />
        </n-button>
        <n-button
          text
          @click="handleClose"
        ><nw-icon name="icon-guanbichuangkou" /> </n-button>
      </div>
    </div>
    <iframe
      class="render-frame-content"
      ref="renderFrame"
      :src="`/html/portal/template-render.html${routePath}`"
    >

    </iframe>
  </div>
</template>
<script>
import { h, ref, reactive } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NSpace,
  NModal,
  NButton,
  NInput
} from 'naive-ui'
import NwIcon from '/@/components/nw-icon/index.vue'

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NSpace,
    NModal,
    NButton,
    NwIcon,
    NInput
  },
  props:{
    value: {
      type: Object
    }
  },
  setup(props, context){
    const routePath = ref('#/index')
    const renderFrame = ref(null)
    // 刷新加载页面
    const run = (data = {}) => {
      renderFrame.value.contentWindow.postMessage(data, '*')
    }
    return {
      routePath,
      renderFrame,
      run,
      handleClose () {
        context.emit('close')
      },
      handleHome () {
        routePath.value = '#/index'
      },
      handleRefresh () {
         renderFrame.value.contentWindow.location.reload()
      }
    }
  }
}
//
</script>

<style lang='less'>
.render-frame {
  height: 100%;
  &-header {
    background: #eee;
    height: 28px;
    // background: #1e1e1e;
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 10px 0 5px;
    >.left {
      display: inline-flex;
      padding: 3px 0;
    }
    >.right {
      display: inline-flex;
    }
  }
  &-content {
    border: none;
    width: 100%;
    height: calc(~'100% - 34px');
  }
}
</style>