<template>
  <div
    v-for="item in getOpeningList()"
    :key="item.key"
    :class="{
      cbtn: true,
      active: item === editingPage
    }"
    @click="setEditing(item)"
  >
    <nw-icon :name="`icon-${item.type}`" /> 
    {{item.label}}
    <span>
      <nw-icon v-if="!item.isSaved" name="icon-yuandian" :size="10" color="#9c9c9c" style="margin-left: 2px" />
      <n-button text @click="handleClose($event, item)">
      <nw-icon name="icon-guanbichuangkou" :size="10" color="#9c9c9c" style="margin-left: 5px" />
      </n-button>
    </span>
  </div>
</template>
<script>
import { ref, reactive, nextTick } from 'vue'
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
import NwIcon from '/@/components/nw-icon/index.vue'

import { openingPages, editingPage, setEditingPage, closePage } from '../../store'

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
    NwIcon
  },
  props:{
  },
  setup(props){

    return {
      openingPages,
      editingPage,
      getOpeningList () {
        return Object.entries(openingPages).map(([, v]) => v)
      },
      setEditing (page) {
        setEditingPage(page.key)
      },
      handleClose(e,item) {
        closePage(item.key)
        e.stopPropagation();
      }
    }
  }
}
</script>

<style lang='less'>
</style>