<template>
  <div class="graph-edit">
    <div class="graph-edit-tools" >
      1
    </div>
    <div ref="graph" class="graph-edit-view">
      <!-- 绘图层 --><!-- 辅助层 -->
      <svg ref="graphSvg" class="graph-edit-view-svg" >
      </svg>
      <!-- 节点dom层 --><!-- 交互层 -->
      <!-- <div ref="nodeDiv" class="graph-edit-view-dom">
      </div> -->
      
    </div>
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

// import data from './data.js'
import data from './expDataDemo.js'

import * as d3 from 'd3'

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
const tree = d3.tree()
.nodeSize([dx, dy])
.separation((a, b) => {
  return a.parent == b.parent ? 1 : 1;
})
// 链接生成器
const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

const guideDiagonal = d3.linkHorizontal().x(d => d.x).y(d => d.y)
const translateCoord = (x, y) => {
  return {
    x: x - width / 2,
    y: y - height / 2,
  }
}
const chart = (svgDom, nodeDom) => {
  // 分层数据的根节点 只建立结构
  const root = d3.hierarchy(data);
  // 设置根元素初始节点
  root.x0 = 0;
  root.y0 = 0;
  // 遍历所有节点缓存一个children
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    // 这里隐藏了部分
    // if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  // 基础svg画布
  const svg = d3.select(svgDom)
  const gNode2 = d3.select(nodeDom)
  // const svg = d3.create("svg")
  //     // .attr("viewBox", [-margin.left, -margin.top, width, dx])
  //     .style("font", "10px sans-serif")
  //     .style("user-select", "none")
  //     .style("height", "100%")
  //     .style("width", "100%")
  // 测试 拖拽

  // 获取
  const coordG = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  // 辅助线层
  const guideLink = coordG.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.8)
    .attr("stroke-width", 1.5);

  // 实际连线
  const gLink = coordG.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

  // 节点
  const gNode = coordG.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

  // ---------------辅助线-------------
  const guidePath = guideLink.append("path")
  .datum({})
  .attr('d', '');

  // 拖拽
  const drag = d3.drag()
  .on("start", (e) => {
    console.log('dragstart', e)
    guidePath.attr('d', d => {
      d.source = translateCoord(e.x, e.y)
      return guideDiagonal({source: d.source, target: d.source});
    });
  })
  .on("drag", (e) => {
    console.log('drag', e)
    console.log('dragstart', e)
    guidePath.attr('d', d => {
      
      d.target = translateCoord(e.x, e.y)
      return guideDiagonal({
        source: d.source,
        // target: {x: e.y, y: e.x},
        target: d.target
      });
    });
  })
  .on("end", (...e) => {
    console.log('dragend', e)
  })
  svg.call(drag);
  // 数据更新 传入的是动画触发节点
  function update(source) {
    // 动画间隔时间
    const duration = d3.event && d3.event.altKey ? 2500 : 450;
    // 所有节点
    const nodes = root.descendants().reverse();
    // 所有链接
    const links = root.links();
    // 计算树布局
    tree(root);

    // 获取边界的节点
    let top = root;
    let bottom = root;
    root.eachBefore(node => {
      if (node.y < top.y) top = node;
      if (node.y > bottom.y) bottom = node;
    });
    // 横向最大距离
    const yMaxDistance = bottom.y - top.y
    root.eachBefore(node => {
      node.y = node.y - yMaxDistance / 2
    });
    // const height = right.x - left.x + margin.top + margin.bottom;

    // 动画渲染
    const transition = coordG.transition()
        .duration(duration)
        // .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        //.tween("resize", window.ResizeObserver ? null : () => () => coordG.dispatch("toggle"));

    // 绑定节点数据
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    const node2 = gNode2.selectAll("div")
      .classed('node', true)
      .data(nodes, d => d.id)
    // enter 需要插入的选择集合
    // alert(source.y0 + ' ' + source.x0)
    // 设定占位元素的初始位置
    const nodeEnter = node.enter().append("g")
      .attr("transform", d => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event, d) => {
        d.children = d.children ? null : d._children;

        console.log('====click====', d)
        update(d);
        // alert(nodes.length)
      });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

    nodeEnter.append("text")
        .attr("dy", "1.2em")
        .attr("x", 0)
        // .attr("x", d => d._children ? -6 : 6)
        // .attr("text-anchor", d => d._children ? "end" : "start")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.data.name)
        // .clone(true).lower()
        // .attr("stroke-linejoin", "round")
        // .attr("stroke-width", 3)
        // .attr("stroke", "white");

    // 将节点转换到其新位置。
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // 将退出节点转换到父节点的新位置。
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // 绑定接线数据
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // 在父对象的上一个位置输入任何新链接。
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);

  // return svg.node();
}
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
    NwIcon
    
  },
  props:{
  },
  setup(props){
    const graph = ref(null)
    const graphSvg = ref(null)
    const nodeDiv = ref(null)
    // console.log(chart())
    nextTick().then(d => {
      // graph.value.appendChild(chart())
      
    })

    // ---数据格式化

    // ---初始化

    return {
      graph,
      nodeDiv,
      graphSvg,
      render () {
        chart(graphSvg.value, nodeDiv.value)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.graph-edit {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  &-tools {
    height: 30px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  &-view {
    flex: 1;
    position: relative;
    height: 100%;
    width: 100%;
    &-svg {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      // font: 12px sans-serif;
      user-select: none;
    }
    &-dom {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      // font: 12px sans-serif;
      user-select: none;
    }
  }
}
</style>