<template>
  <iframe class="form-view-frame" ref="frame" :src="frameUrl"></iframe>
</template>
<script lang="ts">
// import request from '/@/plugins/request'
import { Request } from '@platform/main'

import {
  NSelect,
  NCheckboxGroup,
  NCheckbox,
  NSpace,
  NInput
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import { cloneDeep } from 'lodash'

// 生成 转换脚本
function generateScript (json: string, flag: boolean = true) { // true 为 生成输出转换
    
    const schema = JSON.parse(json) // 原始

    // 子表递归生成脚本
    const recursionFun: (d: object) => string = (obj: object) => {
        return Object.entries(obj).map(([fieldName, content]) => {
          // 默认 fieldName 是 targetField | sourceFieldName 是 sourceFieldName
          const {
              sourceFieldName, // 原属性名 表单
              properties,
              items,
              type
          } = content
          // 如果没有配置转换的字段则使用原始字段填充
          const sourceField = flag ? (sourceFieldName || fieldName) : fieldName
          const targetField = flag ? fieldName : (sourceFieldName || fieldName)
          // const script = `${fieldName}: d['${sourceFieldName}']`

          if (type === 'object' && properties) { // 对象类型

              return `${targetField}: (d => ({
                  ${recursionFun(properties)}
              }))(d['${sourceField}'])`
              
          } else if (type === 'array' && items && items.type === 'object') { // 数组类型
              return `${targetField}: d['${sourceField}']?.map(d => ({
                  ${recursionFun(items.properties)}
              }))`

          } else {
              // console.log(`${targetField}: d['${sourceField}']`)
              // 一般
              return `${targetField}: d['${sourceField}']`
            }
        }).join(',\n')
    }
    const rs = recursionFun(schema)
    return new Function('d', `return {${rs}}`)

}

// 生成权限转换

function generateRulesScript (json: string) {
    
    const rules = JSON.parse(json) // 原始

    let inRulesStr: Array<string> = []

    // 子表递归生成脚本
    const recursionFun: (d: object, path: string, path2: string) => void = (obj: object, path: string, path2: string) => {
        Object.entries(obj).forEach(([fieldName, content]) => {
          // 默认 fieldName 是 targetField | sourceFieldName 是 sourceFieldName
          const {
              sourceFieldName: sourceFieldName_ , // 原属性名 表单
              properties,
              items,
              type
          } = content
          let sourceFieldName
          if (!sourceFieldName_) {
            sourceFieldName = fieldName
          } else {
            sourceFieldName = sourceFieldName_
          }
          // const script = `${fieldName}: d['${sourceFieldName}']`

          if (type === 'object' && properties) { // 对象类型

            recursionFun(properties, `${path}${fieldName}.`, `${path2}${sourceFieldName}.` )
              
          } else if (type === 'array' && items && items.type === 'object') { // 数组类型
            
            inRulesStr.push(`if (d['${path}${fieldName}']) { r['${path2}${sourceFieldName}'] = d['${path}${fieldName}'] }`)
            recursionFun(items.properties, `${path}${fieldName}.`, `${path2}${sourceFieldName}.`)
            
          } else {
            // 需要判断
            // inRulesStr.push(`${path2}${sourceFieldName}: d['${path}${fieldName}']`)
            // 

            inRulesStr.push(`if (d['${path}${fieldName}']) { r['${path2}${sourceFieldName}'] = d['${path}${fieldName}'] }`)

            console.log(`if (d['${path}${fieldName}']) { r['${path2}${sourceFieldName}'] = d['${path}${fieldName}'] }`)
          }
        })
    }

    recursionFun(rules, '', '')
    // console.log('==inRulesStr==', `
    // const r = {};
    // ${inRulesStr.join('\n')}
    // return r`
    // )

    return new Function('d', `
    const r = {};
    ${inRulesStr.join('\n')}
    return r`)
    // return {
    //   inRules: 
    // }
}

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
    },
    isStatic: {
      type: Boolean,
      default: true
    }
  },
  components: {
    NInput,
    NSelect,
    NCheckboxGroup,
    NCheckbox,
    NSpace
  },
  emits: ['inited'],
  setup (props, context) {
    const frame = ref<HTMLIFrameElement>()
    const isLoaded = ref<boolean>(false) // 是否加载完成iframe
    // 页面Url
    const pageUrl = ref<string>('')
    
    const frameUrl = ref<string>('')
    let transformOutForm: Function
    let transformInForm: Function
    let transformInRule: Function
    // 获取页面数据
    const queryFormPage = (url?: string) => {
      new Request(
        `/main/page/getPageBy${url || props.src}`,
        'get'
      ).send().then(r => {
        // 等待frame加载完成
        // frame.value!.onload = () => {
        //   postMessage('SET_KEY', pageUrl.value)
        // }
        pageUrl.value = r.pageUrl
        // 设定访问地址
        frameUrl.value = `${r.targetUrl}#${r.pageUrl}` //'http://localhost:3001/wf/forms/meetings.html'

        // 判断是否需要进行转换
        if (r.isTransform === 1) { // r.interfaceJsonSchema
          // 设定转换程序
          // interfaceJsonSchema
          // 设定正向转换
          transformOutForm = generateScript(r.interfaceJsonSchema)
          // 设定逆向转换
          transformInForm = generateScript(r.interfaceJsonSchema, false)

          // transformInRule = (d: any) => d
          transformInRule = generateRulesScript(r.interfaceJsonSchema)
        } else {
          transformOutForm = (d: any) => d
          transformInForm = (d: any) => d
          transformInRule = (d: any) => d
        }

        // 设定字段权限转换
      }).catch(error => {
        // console.log('=======error=======', error)
        context.emit('inited', error.message)
        // 设定错误页面信息
      })
    }
    // 
    
    // postMessage 通讯
    const postMessage = (cmd: string, value?: any) => {
      frame.value!.contentWindow!.postMessage({
        cmd,
        value
      }, '*')
    }
    // 数据转换
    nextTick().then(() => {
      if (props.src) queryFormPage()
    })

    // 初始化触发 如果iframe为多个这里可能，混淆监听，无法获取对应的映射
    const init = function (e: any) {

      if (e.data.cmd === 'INIT_COMPLETE' && e.data.key === pageUrl.value) {
        // 触发初始化
        isLoaded.value = true
        context.emit('inited')
        window.removeEventListener('message', init)
      }
    }
    window.addEventListener('message', init)

    // 设定数据
    const setValue = (val: object) => {
      // 这里需要转换后
      // console.log('==1===', cloneDeep(val))
      // console.log('==2===', transformInForm(cloneDeep(val)))

      // 这里需要进行同步操作

      postMessage('SET_VALUE', transformInForm(cloneDeep(val)))
    }

    // 获取数据
    const getValue = async () => {
      let f: (e: any) => void
      let r = await new Promise((resolve, reject)  => {
        f = (e) => {
          if (e.data.cmd === 'GET_VALUE' && e.data.key === pageUrl.value) {
            // 获取数据 需要把e.data.value 进行数据转换
            resolve(e.data.value)
          }
        }
        window.addEventListener('message', f)
        postMessage('GET_VALUE')
      }).then(d => {
        window.removeEventListener('message', f)
        return d
      }).catch(e => {console.error(e)})

      
      // console.log('-----nfv getValue-----', r)
      
      // console.log('-----nfv getValue-----', transformOutForm(r))

      return transformOutForm(r)
    }

    // 设定权限
    const setRules = (val: object) => {
      // 转换后再设定字段权限
      postMessage('SET_RULES', transformInRule(cloneDeep(val)))
    }

    // 发出验证
    const validate = async () => {
      let f: (e: any) => void
      let r = await new Promise((resolve, reject)  => {
        f = (e) => {
          if (e.data.cmd === 'GET_VALIDATE' && e.data.key === pageUrl.value) {
            // 获取
            resolve(e.data.value)
          }
        }
        window.addEventListener('message', f)
        postMessage('GET_VALIDATE')
      }).then(d => {
        window.removeEventListener('message', f)
        return d
      }).catch(e => {console.error(e)})
      return r
    }
    return {
      pageUrl,
      frameUrl,
      frame,
      setValue,
      getValue,
      setRules,
      validate,
      reload (url: string) {
        queryFormPage(url)
      }
    }
  }
})
</script>

<style lang='less'>
.form-view-frame {
  display: block;
  width: 100%;
  // height: calc(~'100% - 6px');
  height: 100%;
  overflow: hidden;
  border: none
}
</style>