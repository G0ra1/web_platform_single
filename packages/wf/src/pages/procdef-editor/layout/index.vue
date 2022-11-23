<template>
  <n-layout class="nw-layout" position="absolute">
    <n-layout-header class="nw-layout-header">
      <menu-top />
    </n-layout-header>
    <n-layout has-sider class="nw-layout-body">
      <!-- <n-layout-sider
        class="nw-layout-side"
        bordered
        :width="32"
      >
      </n-layout-sider> -->
      <n-layout-content class="nw-layout-content">
        <d-splitter
          v-show="viewActive === 'design'"
          class="nw-layout-content-splitter"
          splitBarSize="1px"
        >
          <template v-slot:DSplitterPane>
            <d-splitter-pane class="splitter-bpmn-view" minSize="500px">
              <design />
            </d-splitter-pane>
            <d-splitter-pane class="splitter-bpmn-attrs" size="270px" minSize="130px" @sizeChange="sizeChange">
              <properties-panel />
            </d-splitter-pane>
          </template>
        </d-splitter>
        <!-- xml显示 -->
        <xml 
          v-if="viewActive === 'xml'"
        />
      </n-layout-content>
    </n-layout>
    <n-layout-footer class="nw-layout-footer" >
      <div class="nw-layout-footer-action-bar">
        <div
          :class="{
            'item-code': true,
            'nw-layout-footer-action-bar-item': true,
            'select': viewActive === 'design'
          }"
          style="left: 5px;"
          @click="viewActive = 'design'"
        >设计</div>
        <div
          :class="{
            'item-code': true,
            'nw-layout-footer-action-bar-item': true,
            'select': viewActive === 'xml'
          }"
          style="left: 45px;"
          @click="viewActive = 'xml'"
        >XML</div>
      </div>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
} from 'naive-ui'
import { NwDic, request } from '@platform/main'

import MenuTop from '../components/menu-top/index.vue'
import Design from '../components/viewer-design/index.vue'
import Xml from '../components/viewer-xml/index.vue'
import PropertiesPanel from '../components/properties-panel/index.vue'

export default defineComponent({
  name: "layout",
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    MenuTop,
    Design,
    Xml,
    PropertiesPanel
  },
  setup() {
    const viewActive = ref('design')


    return {
      viewActive,
      sizeChange () {
        // 这里触发事件
      }
    }
  },
})
</script>

<style lang="less"> 
@import "../style/index.less";
</style>
