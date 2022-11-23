<template>
  <div class="task-layout">
    <div class="sider">
    
    </div>
    <div class="content">
    
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
  .task-layout {
    display: flex;
    height: 100%;
    >.sider {
      flex: 0 1 250px;
      background-color: green;
    }
    >.content {
      flex: 1;
    }
  }
</style>