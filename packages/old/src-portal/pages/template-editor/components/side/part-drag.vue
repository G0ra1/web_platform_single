<template>
  <div
    title="抓取组件"
    text
    v-drag="dragOption"
  >
    <NwIcon
      name="icon-shiqu"
      color="#ccc"
      :size="16"
    />
  </div>
</template>
<script lang="jsx">
  import { h, reactive, ref, nextTick } from 'vue'
  import {
    NTree,
    NButton,
    NConfigProvider,
    NCollapse,
    NCollapseItem,
    NGrid,
    NGi,
    useMessage
  } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import NwTile from '/@/components/nw-tile/index.vue'
  import { toClipboard } from '/@/utils'
  import { xmlParse, xmlStringify } from '../../store/utils'
  import { cloneDeep } from 'lodash'

  import {
    viewActive,
    website,
    openingPages,
    openPage,
    saveToWebSite,

    addEditorEventListener,
    containerCodes,
    basicCodes,
    partCodes,
    staticPartCodes,
    presetPartCodes
  } from '../../store'

  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      NTree,
      NButton,
      NwIcon,
      NConfigProvider,
      NCollapse,
      NCollapseItem,
      NwTile,
      NGrid,
      NGi
    },
    setup (props) {
      // 这里需要加入来源
      const dragOption = {
        mode: 1,
        data: {
          type: 'add', // 记录指令为新增
          value: props.value[0]
        },
        dragEnd: (e, f, t) => {
          if (!f) return;
          // e 为 事件对象 f 是否捕获到目标 t 目标对象
          // console.log('e, f, t====', e, f, t, props.value)
          // const {
          //   type,
          //   pValue, // 捕获目标父级
          //   value // 当前捕获的目标
          // } = t
          // switch (type) {
          //   case 'inner':
          //     if (!value.children) value.children = []
          //     console.log(value.children)
          //     value.children.push(cloneDeep(props.value[0]))
          //     console.log('value==', value, value.children)
          //     break;
          //   case 'top':
          //     pValue.children.splice(
          //       pValue.children.indexOf(value),
          //       0,
          //       cloneDeep(props.value[0])
          //     )
          //     break;
          //   case 'bottom':
          //     pValue.children.splice(
          //       pValue.children.indexOf(value) + 1,
          //       0,
          //       cloneDeep(props.value[0])
          //     )
          //     break;
          // }
          
        }
      }
      return {
        dragOption
      }
    }
  }
</script>
<style lang='less'>

</style>