<template>
  <n-config-provider :theme-overrides="menuTheme" class="header-title">
      <nw-icon
        v-if="!(templateBasic.templateName && templateBasic.portalName)"
        name="icon-warning"
        :size="20"
        style="margin-right: 5px"
      />
      {{templateBasic.templateName || '未命名'}} &lt; {{templateBasic.portalName ? `所属 : ${templateBasic.portalName}` : '未指定所属门户'}} &gt;
      <n-button
        size="small"
        @click="modalVisible.templateBasic = true"
        title="编辑基本信息"
      >
        <nw-icon
          name="icon-bianji2"
          :size="20"
          style="margin-left: 5px"
        />
      </n-button>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
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
  NButton,
  NDivider,
  NMenu,
  NDropdown,
  NConfigProvider
} from 'naive-ui'
import NwIcon from '/@/components/nw-icon/index.vue'
import { parseQuery } from '/@/utils'
import {
  openingPages,
  editingPage,
  setEditingPage,
  closePage,
  modalVisible,
  templateBasic
} from '../../store'

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
    NwIcon,
    NDivider,
    NMenu,
    NDropdown,
    NConfigProvider
  },
  props:{
  },
  setup(props){
    return {
      templateBasic,
      modalVisible,
      handleEditTitle () {
        
      },
      menuTheme: {
        Button: {
          heightSmall: '32px',
          fontSizeSmall: '14px',
          // 一般状态
          textColor: '#ccc',
          color: '#0000000',
          border: '#0000000',
          // 悬停
          colorHover: '#505050',
          borderHover: '1px solid #0000000',
          // 触发
          colorPressed: '#505050',
          borderPressed: '1px solid #0000000',
          // 焦点
          textColorFocus: '#fff',
          colorFocus:'#505050',
          borderFocus: '1px solid #0000000',
          // 灰色默认 #474748
          textColorHover: '#ccc'
        }
      }
    }
  }
}
</script>

<style lang='less'>
  .header-title {
    display: inline-flex;
    align-items: center;
    // width: 100%;
    height: 100%;
    padding: 0 5px;
    color: #ccc;
    font-size: 14px;
  }
</style>