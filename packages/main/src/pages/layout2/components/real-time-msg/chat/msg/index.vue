<template>
  <div class="msg">
    <div class="msg-header"></div>
    <d-splitter
      class="msg-splitter"
      splitBarSize="1px"
      orientation="vertical"
    >
      <template #DSplitterPane>
        <d-splitter-pane minSize="150px">
          <x-dialog />
        </d-splitter-pane>
        <d-splitter-pane size="200px" minSize="150px" >
          <x-send />
        </d-splitter-pane>
      </template>
    </d-splitter>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
  NCollapse,
  NCollapseItem
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';
import XDialog from './dialog.vue'
import XSend from './send.vue'
export default defineComponent({
  components: {
    NCollapse,
    NCollapseItem,
    XDialog,
    XSend
  },
  // props: {
      
  // },

  setup (props,context) {

    
    // document.body.style.setProperty
  
    return {
    }
  }
})
</script>
<style lang="less">
  .msg {
    display: flex;
    flex-direction: column;
    height: 100%;
    &-header {
      flex: 0 1 48px;
      border-bottom: 1px solid var(--border-color);
    }
    &-splitter {
      flex: 1;
      height: 100% !important;
      --devui-dividing-line: var(--border-color);
    }
  }
</style>