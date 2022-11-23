<template>
  <div class="exp-group" v-if="props.value.type === 'group'">
    <span class="exp-group-l">(</span>
      
    <div
      :class="{
        'exp-cursor': true,
        'active': editingExpElements === props.value && editingExpElementIndex === -1
      }"
      @click="e => handleGroup(e, props.value, -1)"
    >
      <div class="exp-cursor-l">&nbsp;</div>
      <nw-icon name="icon-shang1" color="#000" :size="10" />
    </div>
    <expression
      v-for="(item, key) in props.value.children"
      :key="key"
      :index="key"
      :parent="props.value"
      :value="item"
    />
    <span class="exp-group-r">)</span>
  </div>
  <!-- exp -->
  
  <exp-comp
    v-else-if="props.value.type === 'exp'"
    :value="props.value"
    @callback="e => props.value.code = e"
  />
  <!-- <div class="exp-exp" v-else-if="props.value.type === 'exp'">

  </div> -->
  <div class="exp-item" v-else-if="props.value.type === 'logic'">
    {{props.value.text}}
  </div>
  <div class="exp-item" v-else-if="props.value.type === 'operation'">
    {{props.value.text}}
  </div>
  <div class="exp-item" v-else>
    <!-- 这里需要输入框 -->
     <n-input
     size="small"
     v-model:value="props.value.text"
     @update:value="e => props.value.code = e"
     placeholder=""
     autosize
     style="min-width: 15px"
     />

  </div>


  <div :class="{
    'exp-cursor': true,
    'active': editingExpElements === props.parent && editingExpElementIndex === props.index
  }"
  @click="handleGroup"
  >
    <div class="exp-cursor-l">&nbsp;</div>
    <nw-icon name="icon-shang1" color="#000" :size="10" />
  </div>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  expressionCache,
  editingExp,
  editingExpElements,
  editingExpElementIndex
} from '../../../../store/cache-expression'
// 表达式展现
import ExpComp from './express-comp/exp.vue'
export default {
  name: 'Expression',
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    ExpComp
  },
  props:{
    value: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: -1
    },
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context){
    // 光标位置
    const cursorIndex = ref(-1)
    // 当前选定的组
    const currentGroup = ref(null)
    return {
      props,
      editingExpElements,
      editingExpElementIndex,
      handleGroup (e, el = props.parent, eli = props.index) {
        e.stopPropagation();
        editingExpElements.value = el
        editingExpElementIndex.value = eli
      }
    }
  }
}
</script>

<style lang='less' scoped>
// 组 （）
.exp-group {
  display: inline-flex;
  border: 2px solid #009688;
  border-bottom: none;
  // border-left: none;
  // padding: 0px 3px;
  // margin: 5px 2px 0 2px;
  margin-top: 5px;
  border-radius: 8px 8px 0 0 ;
  justify-content: center;
  align-items:flex-end;
  // background: #00bcd48c
  &-l {
    display: inline-flex;
    height: 100%;
    padding-right: 2px;
    color: #fff;
    justify-content: center;
    background: #009688;
    // margin-right: 2px;
  }
  &-r {
    display: inline-flex;
    height: 100%;
    padding-left: 2px;
    color: #fff;
    justify-content: center;
    background: #009688;
    // margin-left: 2px;
  }
}

// exp 表达式
.exp-exp {
  display: inline-flex;
  padding: 0px 3px;
  justify-content: center;
  align-items: center;
  background: #8a2be2;
  color: #fff;
  // margin: 3px 0px;
  // margin: 5px 2px 0 2px;
  margin-top: 5px;
}
.exp-item {
  display: inline-flex;
  padding: 0px 3px;
  justify-content: center;
  align-items: center;
  background: #2196f3;
  color: #fff;
  // margin: 3px 0px;
  // margin: 5px 2px 0 2px;
  margin-top: 5px;
}
@keyframes animate {
  0% {
      opacity: 1;
  }
  50% {
      opacity: 1;
  }
  50% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.exp-cursor {
  &.active {
    opacity: 1;
    .exp-cursor-l {
      animation: animate 2s 2s infinite;
    }
  }
  opacity: 0;
  display: inline-flex;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
  width: 2px;
  height: 25px;
  cursor: text;
  position: relative;
  .icon {
    position: absolute;
    bottom: -10px;
    left: -4px;
  }
  &-l {
    display: inline-flex;
    width: 2px;
    height: 25px;
    cursor: text;
    background: red;
  }
}
</style>