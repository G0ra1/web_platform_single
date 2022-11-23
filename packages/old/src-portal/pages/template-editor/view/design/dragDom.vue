<template>
  <div :ref="d => dragDom = d">
    <nw-tile :icon="dramDomParam.icon" :label="dramDomParam.label" />
  </div>
</template>
<script>
import { ref, reactive, nextTick, watch } from 'vue'

import NwTile from '/@/components/nw-tile/index.vue'

// store
import {
  editingPage,
  editingPageMod,
  setEditingPageCode,
  saveToWebSite
} from '../../store'

import BoxModel from './boxModel/index.jsx'

export default {
  components: {
    NwTile
  },
  props:{
  },
  setup(props){
    const dragDom = ref(null)
    const dramDomParam = reactive({
      icon: 'icon-pintu',
      label: '测试'
    })
    return {
      setRef (d) {
        dragDom.value = d
      },
      dragDom,
      dramDomParam,

    }
  }
}
</script>

<style lang='less'>
</style>