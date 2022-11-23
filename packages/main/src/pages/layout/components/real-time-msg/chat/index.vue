<template>
  <div class="chat-layout">
    <div class="sider">
      <users />
    </div>
    <div class="content">
      <msg />
    </div>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTag,
    useMessage,
    NImage,
    NBadge,
    NText
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';
import Users from './users/index.vue'
import Msg from './msg/index.vue'
export default defineComponent({
  components: {
    NModal,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTag,
    NImage,
    NText,
    NwDic,
    NwIcon,
    NwIconPick,
    NBadge,
    Users,
    Msg
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
  .chat-layout {
    display: flex;
    height: 100%;
    >.sider {
      flex: 0 1 250px;
      background-color: var(--light-gray3);
      border-right: 1px solid var(--border-color);
    }
    >.content {
      flex: 1;
    }
  }
</style>