<template>
  <template v-if="props.value.type === 'text'">
    {{props.value.content}}
  </template>
  <component
    ref="mdRef"
    v-if="props.value.type === 'element'"
    :is="getTag(props.value)"
    :class="{
      'box-model': true,
      'box-model-active-drag': isDrag,
      'box-model-active': boxModActive === boxModNum,
    }"
    v-bind="attributesMod"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div
    class="box-model-control box-model-header"
    @mouseenter="mouseenter"
    @click="handleMod"
    >
      <div
        class="box-model-header-title"
      >
        <nw-icon
          class="drag"
          name="icon-yidong"
          :size="16"
          style="margin-right: 5px;"
          v-drag="dragEdit"
        />
        
        {{title}} ({{props.value.tagName}})
        <!-- <nw-icon
          class="edit"
          name="icon-bianji2"
          :size="16"
          style="margin: 0 5px;"
        /> -->
        <nw-icon
          class="drag"
          name="icon-baxin"
          :size="16"
          style="margin-right: 5px;visibility: hidden"
        />
        <div class="extra">
        </div>
        <div class="title">
        </div>
      </div>
      <div
        class="drag-push-top"
        v-drag="dragPushTop"
      >
        加入到前面
      </div>
      <div
        class="box-model-header-extra"
      >
        <n-button
          title="复制并添加到这个元素的后面"
          text
          @click="toolCopy"
        >
          <nw-icon
            class="box-model-header-extra-icon"
            name="icon-copy"
            color="#ccc"
            :size="16"
            style="margin-right: 10px;"
          />
        </n-button>
        <n-button
          title="删除元素"
          text
          @click="toolDelete"
        >
          <nw-icon
            class="box-model-header-extra-icon"
            name="icon-guanbichuangkou"
            color="#ccc"
            :size="12"
            style="margin-right: 5px;"
          />
        </n-button>
      </div>
    </div>
    <div
    v-if="props.value.tagName === 'n-grid' || props.value.tagName === 'n-gi'"
    class="box-model-body"
    v-drag="dragPushInner"
    title="放置"
    >
    </div>
    <div
    v-else
    class="box-model-body text"
    >
      {{title}}
    </div>
    <template v-if="props.value.children">
        <InnerBoxRoll
          v-for="(item, key) in props.value.children.filter(d => d.type === 'element')"
          :key="key"
          :value="item"
          :p-value="props.value"
        />
    </template>
    <div
    class="box-model-control box-model-footer drag-push-bottom"
    @mouseenter="mouseenter"
    v-drag="dragPushBottom"
    >
      加入到后面
    </div>
  </component>
</template>
<script>
import { ref, reactive, nextTick, watch, computed } from 'vue'
import {
  NGrid,
  NGi,
  NButton
} from 'naive-ui'
import {} from 'vue-draggable-next'
import { MarkerTag } from 'monaco-editor'
import {
  boxModCount,
  boxModActive,
  setEditingPageMod,
  attributesSiderCollapsed,
  attributesSiderMod
} from '../../../store'
import NwIcon from '/@/components/nw-icon/index.vue'
import { xmlParse, xmlStringify } from '../../../store/utils'
import { cloneDeep } from 'lodash'
import { componentInstance } from '../components/index.js'

export default {
  name: "InnerBoxRoll",
  components: {
    NGrid,
    NGi,
    NwIcon,
    NButton
  },
  props:{
    value: {
      type: Object,
      default: () => ({})
    },
    'p-value': {
      type: Object,
      default: () => ({})
    }
  },
  setup(props){
    const boxModNum = boxModCount.value++
    const {
      type,
      content,
      tagName,
      attributes,
      children
    } = props.value
    // 这里判断类型
    const layoutElement = [
      'n-grid',
      'n-gi'
    ]
    // const tagNameValue = ref('div')
    // const attributesValue = reactive({
    // })
    // 
    // if (layoutElement.includes(tagName)) {
    //   tagNameValue.value = tagName
    //   attributes.forEach(({ key, value }) => {
    //     // 判断
    //     const isExp = key.charAt(0) === ':'
    //     if (isExp) {
    //       // 表达是为属性
    //       if (!isNaN(value)) {
    //         attributesValue[key.substr(1)] = Number(value)
    //       }
    //     } else {
    //       attributesValue[key] = value
    //     }
    //   })
    // }
    // -- 获取tag
    const getTag = (v) => {
      // const {
      //   type,
      //   content,
      //   tagName,
      //   attributes,
      //   children
      // } = v
      // let tag = 'div'
      // if ([ 'n-grid', 'n-gi' ].includes(tagName)) {
      //   tag = tagName
      // }
      return 'div'
    }
    // -- 获取attr
    const getAttributes = (v) => {
      const {
        tagName,
        attributes
      } = v
      const attr = {}
      switch (tagName) {
        case 'n-grid':
          // 查询cols
          const colsAttr = attributes.find(d => d.key === ':cols' || d.key === 'cols')
          attr.style = {
            // width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${colsAttr ? colsAttr.value : 24}, minmax(0px, 1fr))`,
            columnGap: '5px',
            rowGap: '5px',
            // marginBottom: '5px',
            minHeight: '200px'
          }
          break;
        case 'n-gi':
          const spanAttr = attributes.find(d => d.key === ':span' || d.key === 'span')
          let style = {}
          if (style) {
          const styleAttr = attributes.find(d => d.key === ':style')
            style = new Function(`return ${styleAttr.value}`)()
          }
          // 这里使用eval 或 Function 翻译代码
          attr.style = {
            gridColumn: `span ${spanAttr.value} / span ${spanAttr.value}`,
            // margin: '0 2.5px'
            minHeight: '200px',
            ...style
          }
          break;
        default: 
          attr.style = {
            width: '100%',
            // minHeight: '200px',
            height: '100%'
          }
      }
      // if ([ 'n-grid', 'n-gi' ].includes(tagName)) {

      //   // 这里模拟grid 和gi
        
      //   attributes.forEach(({ key, value }) => {
      //     // 判断
      //     const isExp = key.charAt(0) === ':'
      //     if (isExp) {
      //       // 表达是为属性
      //       if (!isNaN(value)) {
      //         attr[key.substr(1)] = Number(value)
      //       }
      //     } else {
      //       attr[key] = value
      //     }
      //   })
      // }
      return attr
    }
    // ====
    
      // 放置方法
    const pushInner = (value) => {
      // 判断来源 new 为从左侧新增
      const clone = cloneDeep(value)
      if (!props.value.children) props.value.children = []
      props.value.children.push(clone)
      return true
      
    }
    // 加入到前面
    const pushTop = (value) => {
      const clone = cloneDeep(value)
      props.pValue.children.splice(
        props.pValue.children.indexOf(props.value),
        0,
        clone
      )
      
    }
    // 加入到后面
    const pushBottom =(value) => {
      const clone = cloneDeep(value)
      props.pValue.children.splice(
        props.pValue.children.indexOf(props.value) + 1,
        0,
        clone
      )
    }

    // 
    const editMod = () => {

    }
    const getTitle = (obj) => {
      const mod = componentInstance[obj.tagName]
      if (!mod) return obj.tagName
      const label = mod.label
      const type = typeof label
      if (type === 'function') {
        const attr = obj.attributes.find(({ key, value }) => {
          let pn
          if (key.charAt(0) === ':') {
            pn = key.substr(1)
          } else {
            pn =key
          }
          return !!label({[`${pn}`]: value})
          
        })
        return attr ? attr.value : obj.tagName
      } else {
        return label
      }
    }
    const title = computed(() => {
      return getTitle(props.value)
    })
    const isDrag = ref(false)
    const mdRef = ref(null)
    
    return {
      mdRef,
      isDrag,
      props,
      title,
      boxModNum,
      boxModActive,
      getTag,
      getAttributes,
      attributesMod: computed(() => {
        return getAttributes(props.value)
      }),
      mouseenter (e) {
        boxModActive.value = boxModNum
        e.stopPropagation()
      },
      mouseleave (e) {
        boxModActive.value = -1
        e.stopPropagation()
      },
      handleMod () {
        // 这里触发设置属性
        attributesSiderCollapsed.value = false
        // setEditingPageMod()
        attributesSiderMod.value = props.value
      },
      toolCopy (e) {
        e.stopPropagation();
        // 拷贝当前
        const clone = cloneDeep(props.value)
        props.pValue.children.splice(
          props.pValue.children.indexOf(props.value),
          0,
          clone
        )
      },
      toolDelete (e) {
        e.stopPropagation();
        props.pValue.children.splice(
          props.pValue.children.indexOf(props.value),
          1
        )
      },
      dragMouseUp () {
        alert(11);
      },
      // 这里添加时需要判断是否合法
      dragPushInner: {
        mode: 2,
        data: {
          type: 'inner',
          value: props.value,
          pValue: props.pValue
        },
        captureCallBack: ({
          type,
          value,
          pValue
        }) => {
          if (type === 'add') {
            pushInner(value)
          } else if (type === 'edit') {
            // 这里判断
            // value 是当前正在移动的目标 pValue 当前移动目标的父级  props.value 目标对象 props.pValue 目标对象的父级
            //const c_index = pValue.children.indexOf(value) // 当前所在父级位置
            // 移除在父级的位置

            //console.log()
            // console.log('==pValue.children==', JSON.parse(JSON.stringify(pValue.children)))
            // console.log('==pValue.children==', JSON.parse(JSON.stringify(value)))
            // console.log('==pValue.children==', pValue.children.indexOf(value))
            pValue.children.splice(
              pValue.children.indexOf(value),
              1
            )
            // 加入到新位置
            nextTick().then(() => {
              pushInner(value)
            })
            // props.value.children.push(value)
          }
        }
      },
      dragPushTop: {
        mode: 2,
        data: {
          type: 'top',
          value: props.value,
          pValue: props.pValue
        },
        captureCallBack: ({
          type,
          value,
          pValue
        }) => {
          if (type === 'add') {
            pushTop(value)
          } else if (type === 'edit') {
            // 移除在父级的位置
            pValue.children.splice(
              pValue.children.indexOf(value),
              1
            )
            
            nextTick().then(() => {
              pushTop(value)
            })
            // 加入到新位置
            // props.pValue.children.splice(
            //   props.pValue.children.indexOf(props.value),
            //   0,
            //   value
            // )
          }
        }
      },
      dragPushBottom: {
        mode: 2,
        data: {
          type: 'bottom',
          value: props.value,
          pValue: props.pValue
        },
        captureCallBack: ({
          type,
          value,
          pValue
        }) => {
          if (type === 'add') {
            pushBottom(value)
          } else if (type === 'edit') {
            // 移除在父级的位置
            pValue.children.splice(
              pValue.children.indexOf(value),
              1
            )
            // 加入到新位置
            // props.pValue.children.splice(
            //   props.pValue.children.indexOf(props.value) + 1,
            //   0,
            //   value
            // )
            nextTick().then(() => {
              pushBottom(value)
            })
          }
        }
      },
      dragEdit: {
        mode: 3,
        el: mdRef,
        data: {
          type: 'edit',
          value: props.value,
          pValue: props.pValue
        },
        dragStart: (e) => {
          isDrag.value = true
        },
        dragEnd: (e, f, t) => {
          
          isDrag.value = false
          if (!f) return;
          // 找到目标
          // if (f) {
          //   props.pValue.children.splice(
          //     props.pValue.children.indexOf(props.value),
          //     1
          //   )
          // }
          const {
            pValue,
            value
          } = t
          // value.children.push(cloneDeep(props.value[0]))
        }
      },
      pushInner,
      pushTop,
      pushBottom
    }
  }
}
</script>

<style lang='less'>
@import "./css.less";
</style>