<template>
  <div class="express-view" ref="expressView">
      <div class="express-view-outlink">

      </div>
      <!-- 展示 -->
      <div class="express-view-items">
        <div class="express-view-items-body">
          <n-config-provider 
            namespace="expressview"
            abstract
            :theme-overrides="inputTheme">
            <template v-if="props.value && props.value.children && props.value.children.length">
              <expression
                v-for="(item, key) in props.value.children"
                :value="item"
                :key="key"
                :index="key"
                :parent="props.value"
              />
            </template>
            <template v-else>
              <div style="border: 1px solid red;height: 20px;margin-top: 5px;"></div>
            </template>
          </n-config-provider>
        </div>
        <!-- <template v-for="(item, key) in props.value ? props.value.children : []" :key="key">
          <div v-if="item.type !== 'group'">
            {{item.text}}
          </div>
          <div v-else-if="item.type === 'group'">
            {{item.children}}
          </div>
        </template> -->
      </div>
      <!-- 公式代码 -->
      <div class="express-view-code">


      </div>
      <!-- 切换按钮 -->
      <div class="switch">

      </div>
  </div>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NConfigProvider,
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

// 

import Expression from './expression.vue'
export default {
  components: {
    NConfigProvider,
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
    Expression
  },
  props:{
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props){
    const expressView = ref(null)
    // props.value
    // props.value
    // 初始化
    return {
      expressView,
      props,
      inputTheme: {
              
        Input: {
          paddingSmall: '0 3px',
          color: '#2196f3',
          colorFocus: '#2196f3',
          textColor: '#fff',
          border: 'none',
          borderHover: 'none',
          borderFocus: 'none',
          fontSizeSmall: '12px',
          heightSmall: '22px',
          caretColor: '#fff',
          // 锁定
          // colorDisabled: '#484848',
          // borderDisabled: '1px solid #1e1e1e',
          textColorDisabled: '#4d4d4d',
          // placeholderColorDisabled: '#a3a3a3',
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../style/vxe-table.less";
.express-view {
        

    position: relative;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    height: calc(100% - 10px);
    > .switch {

    }

    &-outlink {

        transition: .4s;
        -moz-transition: .4s; /* Firefox 4 */
        -webkit-transition: .4s; /* Safari and Chrome */
        -o-transition: .4s; /* Opera */
        position: absolute;
        left: 0px;
        top: -1px;
        z-index: 1;
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        border-right: none;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #fff;
        &.active {

            left: -50px;
            box-shadow: -1px 1px 6px #ccc;
        }
        
    }
    &-items {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 2;
      height: 100%;
      width: 100%;
      background: #fff;
      &-body {
        display: flex;
        align-items:flex-end;
        padding: 0 5px;
        flex-wrap: wrap;
      // align-items: baseline;
      }
    }
    &-code {
        height: 100%;
    }
}
</style>