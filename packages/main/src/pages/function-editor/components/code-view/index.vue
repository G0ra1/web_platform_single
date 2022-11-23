<template>
  <codemirror
    ref="codeMirrorRef"
    v-model="props.value"
    placeholder="这里编写脚本程序..."
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="change"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue'

import {

} from 'naive-ui'

import { NwIcon } from '@platform/main'


import { Codemirror } from 'vue-codemirror'
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
// import { oneDark } from '@codemirror/theme-one-dark'
console.log('=====', javascript, javascriptLanguage)
import {syntaxTree} from "@codemirror/language"

const completePropertyAfter = ["PropertyName", ".", "?."]
const dontCompleteIn = ["TemplateString", "LineComment", "BlockComment",
                        "VariableDefinition", "PropertyDefinition"]

function completeFromGlobalScope(context) {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)

  if (completePropertyAfter.includes(nodeBefore.name) &&
      nodeBefore.parent?.name == "MemberExpression") {
    let object = nodeBefore.parent.getChild("Expression")
    if (object?.name == "VariableName") {
      let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from
      let variableName = context.state.sliceDoc(object.from, object.to)
      if (typeof window[variableName] == "object")
        return completeProperties(from, window[variableName])
    }
  } else if (nodeBefore.name == "VariableName") {
    return completeProperties(nodeBefore.from, window)
  } else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
    return completeProperties(context.pos, window)
  }
  return null
}
function completeProperties(from, object) {
  let options = []
  for (let name in object) {
    options.push({
      label: name,
      type: typeof object[name] == "function" ? "function" : "variable"
    })
  }
  return {
    from,
    options,
    validFor: /^[\w$]*$/
  }
}
const globalJavaScriptCompletions = javascriptLanguage.data.of({
  autocomplete: completeFromGlobalScope
})
export default defineComponent({
  name: "DSplitterDemoDirection",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    Codemirror
  },
  setup(props, context) {
    const codeMirrorRef = ref(null)
    // const code = ref(`console.log('Hello, world!')`)
    const extensions = [ javascript() ]
    nextTick().then(() => {
      window.codeMirrorRef = codeMirrorRef.value
      console.log('======codeMirrorRef=====', codeMirrorRef)
    })
    return {
      props,
      codeMirrorRef,
      extensions,
      log: console.log,
      change (e) {
        context.emit('update:value', e)
      }
    }
  },
})
</script>

<style lang="less" scoped>
</style>
