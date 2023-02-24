
<template>
  <article class="wrapper">
    <aside class="sider">
      <nw-sider />
    </aside>
    <section class="container">
      <div class="layout">
        <div class="layout-header" style="flex: 0 0 48px;">
          <!-- 头部 -->
          <nw-header />
        </div>
        <div class="layout-content">
          <!-- 主体 -->
          <NwAppContent />
        </div>
      </div>
    </section>
  </article>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
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
  NPopconfirm,
  useMessage,
} from "naive-ui";

import NwSider from './sider/index.vue'
import NwHeader from './header/index.vue'
import NwAppContent from './content/app-frame.vue'

export default defineComponent({
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
    NPopconfirm,
    NwSider,
    NwHeader,
    NwAppContent
  },
  setup() {

    return {

    }
  }
})

</script>

<style lang="less">
@import "./style/index.less";
</style>
