<template>
  <div v-show="editingPage" :ref="el => monacoContainer = el" style="height: calc(100% - 56px)"></div>
  <div v-show="!editingPage" style="display: flex; justify-content: center; align-items: center; height: 100%; background: #1e1e1e; color: #ccc;">
    从左侧选择需要编辑的页面
  </div>
</template>
<script>
import { ref, reactive, nextTick, watch } from 'vue'
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

import jsBeautify from 'js-beautify'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// store
import { editingPage, setEditingPageCode, saveToWebSite } from '../../store'

// 初始化语言规范
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

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
    const monacoContainer = ref(null)
    let monacoInstance // 实例
    
    watch(editingPage, () => {
      console.log('watch editingPage==', editingPage);
      // 切换当前编辑的页面时调用 预防初始化时monacoInstance还未被创建，针对代码../index.vue 129行
      if (monacoInstance) {

        monacoInstance.setValue(editingPage.value ? editingPage.value.code : '')
        console.log('monaco.IPosition==', new monaco.Position(50, 20))
        monacoInstance.focus()
        monacoInstance.setPosition(new monaco.Position(50, 20))
      }


    })
    nextTick().then(d => {
      monacoInstance = monaco.editor.create(
        monacoContainer.value,
        {
          value: '',
          theme: 'vs-dark',
          language: 'html',
          automaticLayout: true,
          tabSize: 2
        }
      )
      // 监听保存
      monacoInstance.onKeyDown(e => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          // handleRun()
          // 保存当前文件
          saveToWebSite(editingPage.value.key)
          e.preventDefault();
          e.returnValue = false;
          return false;
        }
      })
      // 内容变化
      monacoInstance.onDidChangeModelContent(e => {
        // console.log('======onDidChangeModelContent====', e.isFlush)
        // isFlush
        if (!e.isFlush) {
          console.log('---', e.isFlush)
          setEditingPageCode(monacoInstance.getValue())
        }
        
      })
      monacoInstance.onDidPaste(e => {
        console.log('=====已经粘贴=====')
      })
      // 如果当前已有代码处于编辑状态则直接赋值给编辑器
      monacoInstance.setValue(editingPage.value ? editingPage.value.code : '')
    })
    return {
      editingPage,
      monacoContainer
    }
  }
}
</script>

<style lang='less'>
</style>