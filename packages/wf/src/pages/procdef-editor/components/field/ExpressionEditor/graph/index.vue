<template>
  <div class="graph-edit">
    <div class="graph-edit-tools" >
      <graph-tools />
    </div>
    <div ref="graph" class="graph-edit-viewer">

    </div>
    <div class="graph-edit-footer" >
      <!-- 图例 -->
      <div class="legends">
        <div class="legend">
          <div class="legend-icon" style="background: #009688">
            <nw-icon name="icon-n-y-jiaoji" :size="16" color="#fff" />
          </div>
          交集( and )
        </div>
        <div class="legend">
          <div class="legend-icon" style="background: #2196f3">
            <nw-icon name="icon-n-y-bingji" :size="16" color="#fff" />
          </div>
          并集( or )
        </div>
        <div class="legend">
          <div class="legend-icon" style="background: #9c27b0">
            <nw-icon name="icon-n-y-expression" :size="16" color="#fff" />
          </div>
          表达式
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, inject, watch } from 'vue'
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

// import data from './data.js'
import data from './expDataDemo.js'

import * as d3 from 'd3'

import ExpressText from '../express-text/index.vue'

import Graph from './graph'
import GraphTools from '../tools/index.vue'
import {
  expressionCache,
  editingExp,
  editingExpElements,
  editingExpElementIndex,
  graphRef,
  treeFun,
  clearEditing
} from '../../../../store/cache-expression'
const height = 570
// 总宽度
const width = 700
// x轴间隔
const dx = 50
// y轴间隔
const dy = 124
// 控制边界留白
const margin = {top: 10, right: 120, bottom: 10, left: 40}

// 创建树模型
const tree = d3.tree().nodeSize([dx, dy])

// 链接生成器
const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

const guideDiagonal = d3.linkHorizontal().x(d => d.x).y(d => d.y)
const translateCoord = (x, y) => {
  return {
    x: x - width / 2,
    y: y - height / 2,
  }
}

// -----------

export default {
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
    ExpressText,
    GraphTools
  },
  props:{
  },
  setup(props){
    let graphObj
    const graph = ref(null)
    // ---数据格式化

    // ---初始化

    // 渲染触发
    const render = () => {
      graphRef.value = graphObj = new Graph(graph.value, {
        render: {
          exp: (d) => treeFun(d, 'text')
        },
        // 事件
        eventBus: {
          onCreated () {
          },
          onChange ( t, n, p, root) {
            // console.log(root)
            // expValue.value = root
            // 当修改类型的节点和编辑节点相同时 清空当前编辑状态
            if (t === 'edit') {
              if (n === editingExp.value) {
                clearEditing()
                graphRef.value.editExp = null
              }
            } else if (t === 'delete') {
              if (n === editingExp.value) {
                clearEditing()
                graphRef.value.editExp = null
              }
            }
          },
          onStartEditExp (data) {
            editingExp.value = data
            editingExpElements.value = editingExp.value
            editingExpElementIndex.value = editingExp.value.children.length - 1
          }
        }
      })
      graphObj.loadData(expressionCache.value)
      graphObj.drawn()
    }
    return {
      expressionCache,
      graph,
      render,
      data,
      reDrawn () {
        graphObj.drawn()
      }
    }
  }
}
</script>

<style lang='less'>
@keyframes graphBoxAction
{
from {stroke-dashoffset: 0}
to {stroke-dashoffset: 20}
}

@keyframes nodeBoxAction
{
  0% {
    box-shadow: 0px 0px 6px 0px #ff9800; // #ff9800
  }
  50% {
    box-shadow: 0px 0px 18px 4px #ff5722 // #ff9800
  }
  100% {
    box-shadow: 0px 0px 6px 0px #ff9800; // #ff9800
  }
}
.graph-edit-graph-box-action {
  animation:graphBoxAction .5s linear infinite;
}
.graph-edit-footer {
  .legends {
    display: flex;
    justify-content: end;
    padding: 5px;
    .legend {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .legend-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        padding: 4px;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
  }
}

.graph-edit {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  &-tools {
    height: 32px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  &-viewer {
    overflow: hidden;
    
    .node-action-body:hover {
      .node-menu {
        .btn:hover {
          opacity: 1;
        }
        .btn-u {
          opacity: .6;
          transition: 0.3s;
          transform: translate(0px, -100%);
        }
        .btn-r {
          opacity: .6;
          transition: 0.3s;
          transform: translate(100%, 0px);
        }
        .btn-d {
          opacity: .6;
          transition: 0.3s;
          transform: translate(0px, 100%);
        }
        .btn-l {
          opacity: .6;
          transition: 0.3s;
          transform: translate(-100%, 0px);
        }
      }
    }
    .node {
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      &.action {
        .node-action-body, .node-exp-text {
          // box-shadow: 1px 1px 9px 2px #ff5722; // #ff9800
          animation:nodeBoxAction .8s linear infinite;
        }
      }
      &-action-body {
        border-radius: 4px;
      }
      &-exp-text {
        &.show {
          max-width: 200px;
          padding: 0 3px 0 15px;
        }
        position: absolute;
        top: 4px;
        left: 0px;
        // border: 2px solid #9c27b0;
        color: #fff;
        background: #9c27b0;
        height: 18px;
        max-width: 0px;
        overflow: hidden;
        white-space: nowrap;
        // display: flex;
        // align-items: center;
        text-overflow: ellipsis;
        line-height: 18px;
        font-size: 12px;
        font-weight: bold;
        padding: 0 3px;
        border-radius: 0 8px 8px 0;
        transition: .5s;
      }
      //
      &-hide {
        display: none;
      }
      &-menu {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(0px, 0px);
        // .btn {
          
        // }
        .btn {
          display: flex;
          position: absolute;
          width: 14px;
          height: 14px;
          padding: 4px;
          border-radius: 4px;
          border: 2px solid #fff;
          opacity: .8;
          box-sizing: content-box;
          .icon {
            width: 100%;
            height: 100%;
            color: #fff;
          }
        }
        .btn-u {
          opacity: 0;
          transition: 0.3s;
          transform: translate(0px, 0px);
        }
        .btn-r {
          opacity: 0;
          transition: 0.3s;
          transform: translate(0px, 0px);
        }
        .btn-d {
          opacity: 0;
          transition: 0.3s;
          transform: translate(0px, 0px);
          background: #e91e63;
        }
        .btn-l {
          opacity: 0;
          transition: 0.3s;
          transform: translate(0px, 0px);
        }
        .btn-hide {
          display: none;
        }
      }
      &-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -11px);
        &-jiaoji {
          background: #009688;
        }
        &-bingji {
          background: #2196f3;
        }
        &-expression {
          background: #9c27b0;
        }
        &-icon {
          display: flex;
          width: 18px;
          height: 18px;
          padding: 4px;
          border-radius: 4px;
          box-sizing: content-box;
          position: relative;
          .menu {
            position: absolute;
            left: 0;
            top: 0;
          }
          .icon {
            width: 100%;
            height: 100%;
            color: #fff;
          }
        }
        &-text {
          font-size: 12px;
          white-space: nowrap
        }
      }
    }
    
  }
}
</style>