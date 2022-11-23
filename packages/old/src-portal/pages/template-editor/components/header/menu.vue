<template>
  <n-config-provider :theme-overrides="menuTheme" class="header-menu">
    <nw-icon name="icon-moban" :size="18" style="margin-right: 5px;" />
    <n-dropdown
      size="small"
      :options="fileOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
      @select="handleFile"
    >
      <n-button size="small">模板(T)</n-button>
    </n-dropdown>
    <n-dropdown
      size="small"
      :options="editOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
    >
      <n-button size="small">页面(P)</n-button>
    </n-dropdown>
    <n-dropdown
      size="small"
      :options="runOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
      @select="handleRun"
    >
      <n-button size="small">运行(R)</n-button>
    </n-dropdown>
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
import redirectPage from '/@/plugins/redirect-page'

import {
  openingPages,
  editingPage,
  setEditingPage,
  closePage,
  modalVisible
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

    const fileOptions = [
      {
        label: '新建模板',
        key: 'createWebSite'
      },
      {
        type: 'divider',
        key: 'd2'
      },
      {
        label: '打开模板',
        key: 'openWebSite'
      },
      {
        label: '打开最近模板',
        key: 'openxWebSite'
      },
      {
        type: 'divider',
        key: 'd3'
      },
      {
        label: () => ['提交保存', <NwIcon name='icon-request' size={16} style="margin-left: 3px" color="#67c23a" />],
        key: 'saveWebSite'
      },
      {
        label: '导出模板JSON',
        key: 'exportJson'
      },
      {
        label: '导出模板工程',
        key: 'exportCode',
        disabled: true
      },
      {
        type: 'divider',
        key: 'd4'
      },
      {
        label: '退出 (回到列表页)',
        key: 'exit'
      }
    ]
    const handleFile = (key) => {
      if (key === 'saveWebSite') {
        modalVisible.templateSave = true
      } else if (key === 'exit') {
        redirectPage('portal/template.html')
      }
    }

    const runOptions = [
      {
        label: '预览',
        key: 'preview'
      }
    ]
    const editOptions = [
      {
        label: '新建页面',
        key: 'createPage'
      },
      {
        label: '新建路由',
        key: 'createRoute'
      }
    ]
    const handleRun = (key) => {
      if (key === 'preview') {
        // modalVisible.templateSave = true
      }
    }
    return {
      fileOptions,
      handleFile,
      handleRun,
      runOptions,
      editOptions,
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
        },
        Dropdown: {
          optionHeightSmall: '26px',
          color: '#3C3C3C',
          optionTextColor: '#ccc',
          // #094771
          optionColorHover: '#094771',
          optionTextColorHover: '#fff',
          dividerColor: '#5B5B5C',
          peers: {
            Popover: {
              space: '0px',
              boxShadow: '1px 1px 8px 0px #000'
            }
          }
        }
      }
    }
  }
}
</script>

<style lang='less'>
  .header-menu {
    display: inline-flex;
    align-items: center;
    // width: 100%;
    height: 100%;
    padding: 0 5px;
  }
</style>