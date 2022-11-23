<template>
  <n-layout
    :ref="el => designContainer = el"
    style="
    height: calc(100% - 56px);
    background: #1e1e1e;
    width: 100%;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
    "
    :native-scrollbar="false"
  >
  <div
    v-show="editingPage"
    style="padding:5px"
  >
    <BoxModel :value="editingPageMod" />
  </div>
  <div v-show="!editingPage" style="display: flex; justify-content: center; align-items: center; height: 100%; background: #1e1e1e; color: #ccc;">
    从左侧选择需要编辑的页面
  </div>
  <!-- 这是拖拽浮动 -->
  <DragDom :ref="d => dragDom = d" />
  </n-layout>
</template>
<script>
import { ref, reactive, nextTick, watch } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton
} from 'naive-ui'

// store
import {
  dragDom,
  editingPage,
  editingPageMod,
  setEditingPageCode,
  saveToWebSite
} from '../../store'

import BoxModel from './boxModel/index.jsx'
import DragDom from './dragDom.vue'

import { boxModCount, boxModActive } from '../../store'

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
    NModal,
    NButton,
    BoxModel,
    DragDom
  },
  props:{
  },
  setup(props){
    const designContainer = ref(null)
    let monacoInstance // 实例
    
    watch(editingPage, () => {
      console.log('watch editingPage==', editingPage);
      
    })
    nextTick().then(d => {
    })
    
    boxModCount.value = 0
    boxModActive.value = -1
    return {
      dragDom,
      editingPage,
      editingPageMod,
      designContainer
    }
  }
}
</script>

<style lang='less'>
</style>