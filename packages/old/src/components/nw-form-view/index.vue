<template>
  <iframe class="form-view-frame" ref="frame" :src="props.src"></iframe>
</template>
<script>
import { request } from '@platform/main'
import {
  NSelect,
  NCheckboxGroup,
  NCheckbox,
  NSpace,
  NInput
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import { cloneDeep } from 'lodash'
export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
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
    const frame = ref(null)
    const isLoaded = ref(false) // 是否加载完成iframe
    const initQueue = ref([])
    const isInit = ref(false) // 当前是否已经初始化
    const postMessage = (cmd, value) => {
      frame.value.contentWindow.postMessage({
        cmd,
        value
      }, '*')
    }
    nextTick().then(() => {
      // frame.value.contentWindow.DM_READY = () => props.value
      // frame.value.contentWindow.PAGE_READY = () => frameValue
      frame.value.onload = () => {
        isLoaded.value = true
        // postMessage('GET_VALUE', {
        //   test: 123,
        //   test2: 321
        // })

        // 这里传入一个
        // frame.value.contentWindow.DM_INIT = () => {
        //   initQueue.value.forEach(d => d())
        //   initQueue.value = []
        // }
      }
    })
    // 问题出在这里 当一个init 回调时，每个监听器都可监听到
    const init = function (e) {
      // 这里只处理一次初始化的情况 这里优化e.data.url是全路径 frame
      // 判断是否为相对
      let psrc = ''
      if (props.src[0] === '/') {
        psrc = `${window.location.origin}${props.src}`
      } else {
        psrc = props.src
      }
      if (e.data.cmd === 'INIT_COMPLETE' && e.data.url === psrc) {
        // 触发初始化
        isInit.value = true
        context.emit('inited')
        window.removeEventListener('message', init)
      }
    }
    window.addEventListener('message', init)
    return {
      props,
      frame,
      // sendCmd: (...p) => {
      //   postMessage(...p)
      // },
      // 设置表单数据
      setValue: (val) => {
        // 已经初始化
        if (isInit.value) {
          postMessage('SET_VALUE', cloneDeep(val)) // 这里的设置数据需要进行克隆
        } else {
          // 未初始化
          const f = (e) => {
            if (e.data.cmd === 'INIT_COMPLETE') {
              postMessage('SET_VALUE', cloneDeep(val))
              // 初始化成功后移除
              window.removeEventListener('message', f)
            }
          }
          window.addEventListener('message', f)
        }

        
      },
      // setValue: (val) => {
      //   const v = cloneDeep(val)
      //   if (isLoaded && frame.value.contentWindow.DM_SET_VALUE) {
      //     frame.value.contentWindow.DM_SET_VALUE(v)
      //   } else {
      //     initQueue.value.push(() => {
      //       frame.value.contentWindow.DM_SET_VALUE(v)
      //     })
      //   }
        
      // },
      // 获取表单
      getValue: async () => {
        // 如果没有初始化则返回null
        if (!isInit.value) {
          return null
        }
        let r = null
        let f
        await new Promise((resolve, reject)  => {
          f = (e) => {
            if (e.data.cmd === 'GET_VALUE') {
              // 获取
              resolve(e.data.value)
            }
          }
          window.addEventListener('message', f)
          postMessage('GET_VALUE')
        }).then(d => {
          window.removeEventListener('message', f)
          r = d
        }).catch(e => {console.error(e)})
        
        return r
      },
      validate: async () => {
        if (!isInit.value) {
          return null
        }
        let f
        let r = await new Promise((resolve, reject)  => {
          f = (e) => {
            if (e.data.cmd === 'GET_VALIDATE') {
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
      },
      // getValue: () => {
      //   if (isLoaded && frame.value.contentWindow.DM_GET_VALUE) {
      //     return cloneDeep(frame.value.contentWindow.DM_GET_VALUE())
      //   }
      //   return null
      // },
      // 设置表单权限
      setRules: (val) => {

        // 已经初始化
        if (isInit.value) {
          postMessage('SET_RULES', cloneDeep(val)) // 这里的设置数据需要进行克隆
        } else {
          // 未初始化
          const f = (e) => {
            if (e.data.cmd === 'INIT_COMPLETE') {
              postMessage('SET_RULES', cloneDeep(val))
              // 初始化成功后移除
              window.removeEventListener('message', f)
            }
          }
          window.addEventListener('message', f)
        }
      }
    }
  }
})
</script>

<style lang='less'>
.form-view-frame {
  width: 100%;
  // height: calc(~'100% - 6px');
  height: 100%;
  overflow: hidden;
  border: none
}
</style>