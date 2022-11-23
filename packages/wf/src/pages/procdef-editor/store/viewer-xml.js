
import { ref } from 'vue'
import jsBeautify from 'js-beautify'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
console.log('============', jsBeautify)
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
// export const domViewer = ref(null)



export const dom = ref(null)

export const initViewer = () => {
    window.__MONACO_EDITOR__ = monaco.editor.create(
        dom.value,
        {
            value: '',
            // theme: 'vs-dark',
            language: 'html',
            automaticLayout: true,
            tabSize: 2
        }
    )
}

export const setXML = xml => {
    // 这里进行美化
    
    // contents = jsBeautify.js(contents, { indent_size: 2, space_in_empty_paren: true })
    window.__MONACO_EDITOR__.setValue(xml)
}