<template>
  <div class="send">
    <!-- <div class="title">
      <n-input placeholder="输入标题" />
    </div> -->
    <div class="content">
      <n-input style="height: 100%;" type="textarea" placeholder="输入内容" />
    </div>
    <div class="action">
      <n-button style="width: 80px;" >发送</n-button>
    </div>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import {
  NInput,
  NButton
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';
import XDialog from './dialog.vue'
export default defineComponent({
  components: {
    NInput,
    NButton
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
  .send {
    display: flex;
    flex-direction: column;
    padding: 5px;
    box-sizing: border-box;
    height: 100%;
    >.title {
      padding-bottom: 5px;
    }
    >.content {
      flex: 1;
      padding-bottom: 5px;
    }
    >.action {
      text-align: right;
    }
  }
</style>