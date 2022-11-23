<template>
  <n-modal
    v-model:show="visible"
    :mask-closable="false"
    preset="dialog"
    class="chat-modal"
  >
    <template #header>
    </template>
    <n-spin class="chat-modal-spin" :show="isLoading">
      <div class="chat-modal-layout" >
        <div class="chat-modal-layout-menus" >
          <div class="">
            
          </div>
          <!-- 信息 -->
          <div :class="{
            menu: true,
            active: active === 'chat'
          }"
          @click="active = 'chat'"
          >
            <n-badge :value="5" :max="15">
              <nw-icon name="icon-n-n-chat" :size="24" />
            </n-badge>
           
          </div>

          <!-- 通讯录 -->
          <div :class="{
            menu: true,
            active: active === 'users'
          }"
          @click="active = 'users'"
          >
              <nw-icon name="icon-n-n-users" :size="24" />
          </div>

          <!-- 群发 -->
          <div :class="{
            menu: true,
            active: active === 'group-msg'
          }"
          @click="active = 'group-msg'"
          >
            
            <nw-icon name="icon-n-n-zhifeiji" :size="24" />
          </div>

          <!-- 任务 -->
          <div :class="{
            menu: true,
            active: active === 'task'
          }"
          @click="active = 'task'"
          >
            <n-badge :value="1" :max="15">
              <nw-icon name="icon-n-y-files" :size="24" />
            </n-badge>
          </div>
          <!-- 流程 -->
      
        </div>
        <!-- <div class="chat-modal-layout-users" >

      
        </div> -->
        <div class="chat-modal-layout-content" >
          <chat v-if="active === 'chat'" />
          <task v-if="active === 'task'"  />
        </div>
      </div>
    </n-spin>
    <template #action>
    </template>
   
  </n-modal>
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
import Chat from './chat/index.vue'
import Task from './task/index.vue'

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
    Chat,
    Task
  },
  // props: {
      
  // },

  setup (props,context) {
    const visible = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    
    // 选中
    const active = ref<string>('chat')

    
    // document.body.style.setProperty
  
    return {
      active,
      visible,
      isLoading,
      show () {
        visible.value = true
      }
    }
  }
})
</script>
<style lang="less">
  @import "./style.less";
</style>