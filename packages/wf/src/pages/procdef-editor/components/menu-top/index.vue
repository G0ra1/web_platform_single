<template>
  <n-config-provider :theme-overrides="menuTheme" class="header-menu">
    <nw-icon name="icon-y-wfeditor" :size="22" style="margin-right: 5px;" />
    <n-dropdown
      size="small"
      :options="fileOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
      @select="handleFile"
    >
      <span class="header-menu-btn" >流程(F)</span>
    </n-dropdown>
    <n-dropdown
      size="small"
      :options="editOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
    >
      <span class="header-menu-btn">编辑(E)</span>
    </n-dropdown>
    <n-dropdown
      size="small"
      :options="runOptions"
      placement="bottom-start"
      trigger="click"
      :width="200"
      @select="handleRun"
    >
      <span class="header-menu-btn">测试(R)</span>
    </n-dropdown>
  </n-config-provider>
  <p-loading />
  <verification />
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
  NConfigProvider,
  useDialog,
  useMessage
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { getXML } from '../../store/bpmn'
import { sendSave, actionType } from '../../store/index'
import { createProcdef } from '../../api/index'
import PLoading from '../modal/loading/index.vue'
import Verification from '../modal/verification/index.vue'
import { validate } from '../../store/verification'
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
    NConfigProvider,
    PLoading,
    Verification
  },
  props:{
  },
  setup(props){
    const message = useMessage()
    const dialog = useDialog()
     const modalVisible = ref(false)
    const fileOptions = [
      {
        label: '新建文件',
        key: 'createWebSite'
      },
      {
        type: 'divider',
        key: 'd2'
      },
      {
        label: '打开文件',
        key: 'openWebSite'
      },
      {
        label: '打开最近文件',
        key: 'openxWebSite'
      },
      {
        type: 'divider',
        key: 'd3'
      },
      {
        label: () => ['提交保存', <NwIcon name='icon-request' size={16} style="margin-left: 3px" color="#67c23a" />],
        key: 'saveProc'
      },
      {
        label: '导出文件JSON',
        key: 'exportJson'
      },
      {
        label: '导出工程',
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
    const handleFile = async (key) => {
      switch (key) {
        case 'saveProc':
          if (!validate()) {
            return 
          }
          const res = await new Promise((resolve) => {
            // 触发保存
            if (actionType.value === 'createVersion') {
              dialog.warning({
                title: '提示',
                content: '是否应用当前版本?',
                positiveText: '使用',
                negativeText: '不使用',
                onPositiveClick: () => {
                  sendSave(1).then(r => resolve(r))
                },
                onNegativeClick: () => {
                  sendSave().then(r => resolve(r))
                }
              })
            } else {
              sendSave().then(r => resolve(r))
            }

          })
          // console.log(JSON.stringify(res), '=========',res)
          if (res) {
            message.error(res.message)
          } else {
            // 成功
            window.location.href = `/web-wf/pages/procdef.html#/`
          }
          // sendSave()
          // let xml = await getXML().then(r => r.xml)
          
          // createProcdef({
          //   data: xml,
          //   procDefId: ''
          // })
          break;
        case 'exit':
          window.location.href = `/web-wf/pages/procdef.html#/`
          break;
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
          textColor: '#333',
          color: '#0000000',
          border: '#0000000',
          // 悬停
          // colorHover: '#505050',
          borderHover: '1px solid #0000000',
          // 触发
          // colorPressed: '#505050',
          borderPressed: '1px solid #0000000',
          // 焦点
          textColorFocus: '#000',
          colorFocus:'#bbb',
          borderFocus: '1px solid #0000000',
          // 灰色默认 #474748
          // textColorHover: '#ccc'
        },
        Dropdown: {
          optionHeightSmall: '26px',
          // color: '#3C3C3C',
          // optionTextColor: '#ccc',
          // // #094771
          // optionColorHover: '#094771',
          // optionTextColorHover: '#fff',
          // dividerColor: '#5B5B5C',
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
    &-btn {
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;
      padding: 0 5px;
    }
  }
</style>