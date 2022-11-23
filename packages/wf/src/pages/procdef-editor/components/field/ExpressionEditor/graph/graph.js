import * as d3 from 'd3'

class Graph {
    // 公共缓存
    static cache; // 缓存 data
    static tagetCache; // 鼠标抬起捕获目标缓存
    static dragEnabled = false; // 是否处于拖拽状态
    static targetEnabled = false; // 拖拽目标
    static zIndex = 1;
    constructor ( el, option = {} ) { // el 可视化容器dom
        // this.editExp = null
        this.option = {
            duration: 450, // 动画时间毫秒
            dx: 104, // 树形横向间隔
            dy: 60,  // 树形纵向间隔
            ...option
        }
        // 表达式渲染器
        this.render = {
            exp: () => '',
            ...(option.render || {})
        }
        // this.layout = 'tree-thin'
        this.eventBus = this.option.eventBus || {
            createNode: () => {},
            deleteNode: () => {},

        }
        this.el = el; // 原始容器dom
        this.contianerD3Dom // 原始容器d3 dom
        this.svgD3Dom // 二级绘图容器

        this.nodeD3Dom // 二级图标容器
        this.actionD3Dom  // 二级交互容器

        // 链接生成器
        // this.diagonal = d3.linkHorizontal().x(d => d.x).y(d => d.y)
        this.setDiagonal('Smooth')
        this.setLayout('tree-fat')
        // 创建树模型
        // this.treeFactory = d3.tree().nodeSize([
        //     this.option.dy,
        //     this.option.dx
        // ])
        // this.treeFactory = d3.cluster().nodeSize([
        //     this.option.dy,
        //     this.option.dx
        // ])
        // // 设定同级间隔
        // .separation((p1, p2) => {
        //     if (this.layout === 'tree-thin') {
        //         return 1
        //     }
        //     const p1c = p1.children 
        //     const p2c = p2.children
        //     const p1cf = p1c && p1c.length
        //     const p2cf = p2c && p2c.length
        //     // if (!(p1.data.type === 5 ^ p2.data.type === 5)) {
        //     //     return 1
        //     // }
        //     // 某一个含有子
        //     if (p1cf ^ p2cf) {
        //         if (p1cf) { return p1c.length / 2 + 1}
        //         else if (p2cf) { return p2c.length / 2 + 1}
        //     } else {
        //         return 1
        //     }
        // })
        // d3基础容器
        this.contianerD3Dom = d3.select(el)
        this.contianerD3Dom.html('')
        this.contianerD3Dom
        .style('flex', '1')
        .style('position', 'relative')
        .style('height', '100%')
        .style('width', '100%')

        // 这里先加入笛卡尔转换
        this.coordD3Dom = this.contianerD3Dom.append('div')
        .style('position', 'absolute')
        .style('left', '50%')
        .style('top', '50%')

        this.svgD3Dom = this.coordD3Dom.append('svg')
        // 创建svg图形容器
        this.svgD3Dom
        .style('position', 'absolute')
        .style('left', '0')
        .style('top', '0')
        .style('overflow', 'visible')
        // .style('height', '100%')
        // .style('width', '100%')
        .style('user-select', 'none')
        // 笛卡尔坐标系
        // this.coordD3Dom = this.svgD3Dom.append('g')
        // 连线层
        this.linkD3Dom = this.svgD3Dom.append('g')
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5);

        // 辅助线
        this.guideLink = this.svgD3Dom.append('g')
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", 1.5);

        // 选取框
        this.guideBox = this.svgD3Dom.append('g')
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", 1.5)
        .append("rect")
        .classed('graph-edit-graph-box-action', true)
        .style('fill', 'none')
        .style('stroke', '#ff9800')
        .style('stroke-width', '3')
        .style('stroke-dasharray', '10')
        .style('stroke-dashoffset', '0')
        .style('display','none')
        // 节点容器
        this.nodeD3Dom = this.coordD3Dom.append('div')
        this.nodeD3Dom
        .style('position', 'absolute')
        .style('left', '0')
        .style('top', '0')
        .style('height', '100%')
        .style('width', '100%')
        .style('user-select', 'none')

        // 交互层
        this.actionD3Dom = this.coordD3Dom.append('div')
        this.actionD3Dom
        .style('position', 'absolute')
        .style('left', '0')
        .style('top', '0')
        .style('height', '100%')
        .style('width', '100%')
        .style('user-select', 'none')

        this.dragEl = null
        // 辅助线数据
        this.guideLinkData = {}
        // 辅助接点数据
        this.guideNodeData = {}
        // 初始化拖拽
        const _this = this
        this.drag = d3.drag()
        .on("start", function (e, node) {
            node.data.isHide = true
            // 记录当前触发拖拽
            // _this.dragEl = 
            // 辅助层加入元素
            _this.drawn()
        })
        .on("drag", (...e) => {
            console.log('drag', e)
        })
        .on("end", function (e, node) {
            node.data.isHide = false
            _this.drawn()
        })
        // // 创建
        // this.x=0;
        // this.y=0;
        // this.option = option;
        // this.init();

        // const tree = d3.tree().nodeSize([dx, dy])

        // // 链接生成器
        // const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
    }
    init () {

    }
    // 连线方式
    setDiagonal (d) {
        // 使用4分点方式


        switch (d) {
            case 'Line':
                // 直线
                this.diagonal = ({ source, target }) => {


                    // return `M${source.x} ${source.y}
                    // C${source.x} ${source.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    // `
                    const mp = {
                        x: (target.x + source.x) / 2,
                        y: (target.y + source.y) / 2,
                    }
                    // 近source中点
                    const smp = {
                        x: (mp.x + source.x) / 2,
                        y: (mp.y + source.y) / 2,
                    }
                    // 近target中点
                    const tmp = {
                        x: (target.x + mp.x) / 2,
                        y: (target.y + mp.y) / 2,
                    }
                    // return `M${source.x} ${source.y}
                    // C${smp.x} ${smp.y} ${smp.x} ${smp.y} ${smp.x} ${smp.y}
                    // C${mp.x} ${mp.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    // C${tmp.x} ${tmp.y} ${tmp.x} ${tmp.y} ${tmp.x} ${tmp.y}
                    // C${target.x} ${target.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    // `
                    return `M${source.x} ${source.y}
                    C${source.x} ${source.y} ${smp.x} ${smp.y} ${smp.x} ${smp.y}
                    C${smp.x} ${smp.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    C${mp.x} ${mp.y} ${tmp.x} ${tmp.y} ${tmp.x} ${tmp.y}
                    C${tmp.x} ${tmp.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    `
                }
                break;
            case 'RightAngle':
                // 直角线
                this.diagonal = ({ source, target }) => {
                    const mp = {
                        x: (target.x + source.x) / 2,
                        y: (target.y + source.y) / 2,
                    }
                    // return `M${source.x} ${source.y}
                    // C${mp.x} ${source.y} ${mp.x} ${source.y} ${mp.x} ${source.y}
                    // C${mp.x} ${mp.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    // C${mp.x} ${target.y} ${mp.x} ${target.y} ${mp.x} ${target.y}
                    // C${target.x} ${target.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    // `
                    return `M${source.x} ${source.y}
                    C${source.x} ${source.y} ${mp.x} ${source.y} ${mp.x} ${source.y}
                    C${mp.x} ${source.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    C${mp.x} ${mp.y} ${mp.x} ${target.y} ${mp.x} ${target.y}
                    C${mp.x} ${target.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    `

                    // return `M${source.x} ${source.y}
                    // C${source.x + xD} ${source.y} ${target.x - xD} ${target.y} ${target.x} ${target.y}
                    // `

                    // line直角废弃 原因动画不连贯
                    // return `M${source.x} ${source.y}
                    // L${source.x + xD} ${source.y}
                    // L${source.x + xD} ${target.y}
                    // L${target.x} ${target.y}
                    // `
                }
                break;
            case 'Smooth':
                // 平滑曲线
                // this.diagonal = d3.linkHorizontal().x(d => d.x).y(d => d.y)
                // 手动计算贝塞尔
                this.diagonal = ({ source, target }) => {
                    // const xD = (target.x - source.x) / 2
                    // return `M${source.x} ${source.y}
                    // C${source.x + xD} ${source.y} ${target.x - xD} ${target.y} ${target.x} ${target.y}
                    // `
                    const xD = Math.abs(target.x - source.x)
                    const mp = {
                        x: (target.x + source.x) / 2,
                        y: (target.y + source.y) / 2,
                    }

                    return `M${source.x} ${source.y}
                    C${source.x} ${source.y} ${source.x} ${source.y} ${source.x} ${source.y}
                    C${source.x + xD / 3} ${source.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    C${mp.x} ${mp.y} ${target.x - xD / 3} ${target.y} ${target.x} ${target.y}
                    C${target.x} ${target.y} ${target.x} ${target.y} ${target.x} ${target.y}
                    `

                    // return `M${source.x} ${source.y}
                    // C${mp.x - xD / 8} ${source.y} ${mp.x} ${source.y} ${mp.x} ${mp.y}
                    // C${mp.x} ${mp.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    // C${mp.x} ${mp.y} ${mp.x} ${mp.y} ${mp.x} ${mp.y}
                    // C${mp.x} ${target.y} ${mp.x} ${target.y} ${target.x} ${target.y}
                    // `

                    // return `M${source.x} ${source.y}
                    // L${source.x + xD} ${source.y}
                    // L${source.x + xD} ${target.y}
                    // L${target.x} ${target.y}
                    // `
                }
                break;
        }
    }
    // 布局方式
    setLayout (l) {
        this.layout = l

        if (l === 'tree-thin') { //  || l === 'tree-fat'
            this.treeFactory = d3.tree().nodeSize([
                this.option.dy,
                this.option.dx
            ])
            // 设定同级间隔
            .separation((p1, p2) => {
                if (this.layout === 'tree-thin') {
                    return 1
                }
                const p1c = p1.children 
                const p2c = p2.children
                const p1cf = p1c && p1c.length
                const p2cf = p2c && p2c.length
                // if (!(p1.data.type === 5 ^ p2.data.type === 5)) {
                //     return 1
                // }
                // 某一个含有子
                if (p1cf ^ p2cf) {
                    if (p1cf) { return Math.floor(p1c.length / 2) + 1}
                    else if (p2cf) { return Math.floor(p2c.length / 2) + 1}
                } else {
                    return 1
                }
            })
        } else if (l === 'tree-fat') {
            this.treeFactory = (treeRoot) => {
                (d3.cluster().nodeSize([
                    this.option.dy,
                    this.option.dx
                ]).separation(() => 1))(treeRoot)

                // 对X轴坐标格式化
                treeRoot.eachBefore(node => {
                    console.log('===node===', node, node.y, this.option.dx, node.depth)
                    node.y = this.option.dx * node.depth
                });

            }
        } else if (l === 'cluster') {
            this.treeFactory = d3.cluster().nodeSize([
                this.option.dy,
                this.option.dx
            ]).separation(() => 1)
        }
    }
    // 当前编辑选取
    renderActionElBox () {
        if (this.editExp && this.editExpDom) {
            this.guideBox
            .attr('width', this.editExpDom.clientWidth)
            .attr('height', 26)
            .attr('x', this.editExp.x)
            .attr('y', this.editExp.y)
            .style('display', '')
        } else {
            this.guideBox.style('display', 'none')
        }

            
        
    }
    loadData (data) {
        this.dataCache = data
        this.reload()
    }
    reload () {
        // 数据层级初始化
        this.treeRoot = d3.hierarchy(this.dataCache, d => {
            if (d.type !== 5 ) { return d.children} else { return null}
        } );
        // 设置初始坐标
        this.treeRoot.x0 = 0;
        this.treeRoot.y0 = 0;
        // 缓存子节点
        this.treeRoot.descendants().forEach((d, i) => {
            d.CACHE_children = d.children;
            d.id = d.data.id;
        });
        // this.treeFactory(this.treeRoot)
        // // 翻转xy
        // this.treeRoot.eachBefore(node => {
        //     const x = node.y
        //     node.y = node.x
        //     node.x = x 
        // });
    }
    // 辅助层
    drawnGuide () {

    }
    // 重绘
    drawn (source = this.treeRoot) {
        
        this.transition = this.coordD3Dom.transition().duration(this.option.duration).on('end', () => {})
        // 重新计算层级节点和链接
        this.nodes = this.treeRoot.descendants().reverse();
        this.links = this.treeRoot.links();

        // 树形坐标计算
        this.treeFactory(this.treeRoot)

        // 翻转xy
        this.treeRoot.eachBefore(node => {
            const x = node.y
            node.y = node.x
            node.x = x 
        });
        const {
            top,
            bottom,
            left,
            right
        } = this.getBoundNode()
        
        // 这里计算横向最大距离
        const xMaxDistance = right.x - left.x
        const yMaxDistance = bottom.y - -top.y
        // ( bottom.y + top.y ) /2
        // alert(top.y + ' ' + bottom.y + ' ' + yMaxDistance)
        let  yTranslate = 0
        // 中心变化
        if ( top.y !== -bottom.y ) {

        }
        
        // 适配笛卡尔坐标
        this.treeRoot.eachBefore(node => {
            node.x = node.x - xMaxDistance / 2
            // 重新计算y轴偏移
            node.y = node.y - yMaxDistance / 2
        });
        // -----节点-----
        // 绑定nodes到元素
        const nodeEls = this.nodeD3Dom.selectAll("div")
        .data(this.nodes, d => d.id)
        nodeEls.call(updateNode, this) // 修改节点时渲染节点
        // 获取占位
        const nodeElsEnter = nodeEls.enter().append("div")
        .classed('node', true)
        // .style('position', 'absolute')
        // 新加入的节点 动画起始点为传入的source 动画起始位置为节点的旧坐标
        // .text(d => d.data.name)
        .style('transform', d => `translate(${source.x0}px,${source.y0}px)`)
        .style('opacity', 0)
        .on("click", (event, d) => {
            // 这里是点击Node触发， 可加入判断是否为fx
            if (d.data.type === 5) {
                // 点击fx
                this.editExp = d.data

                this.eventBus.onStartEditExp(d.data)
            } else {
                d.children = d.children ? null : d.CACHE_children;
                this.drawn(d)
            }
            // console.log('ddd', d)
        })
        nodeElsEnter.call(renderNode, this);
        // nodeElsEnter.call(this.drag);
        // nodeElsEnter.append('span').text(1)
        // nodeElsEnter.append('span').text(2)

        // 通过动画节点移动到新的位置
        nodeEls.merge(nodeElsEnter)
        .transition(this.transition)
        .style('opacity', 1)
        .style('transform', d => `translate(${d.x}px,${d.y}px)`)
        
        // 移除删除的节点
        nodeEls.exit()
        .transition(this.transition)
        .remove()
        .style('opacity', 0)
        .style("transform", d => `translate(${source.x}px,${source.y}px)`)
        
        // 选定框

        // -----链接-----
        // 绑定接线数据 这里id需要修改
        const linkEls = this.linkD3Dom.selectAll("path")
        .data(this.links, d => d.target.id)
        .style('display', d => {
            // 连带隐藏
            return !!d.target.data.isHide ? 'none' : ''
        })
        ;

        
        // 新的链接初始化 起点终点是触发节点
        const linkElsEnter = linkEls.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return this.diagonal({source: o, target: o});
        })
        .style('display', d => {
            // 连带隐藏
            return !!d.target.data.isHide ? 'none' : ''
        })
        ;
        
        // 所有
        linkEls.merge(linkElsEnter)
        .transition(this.transition)
        .attr("d", this.diagonal);

        linkEls.exit()
        .transition(this.transition)
        .remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return this.diagonal({source: o, target: o});
        });
        // 记录节点旧坐标
        this.treeRoot.eachBefore(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    // 计算最大宽度
    getBoundNode () {
        let top = this.treeRoot;
        let bottom = this.treeRoot;
        let left = this.treeRoot;
        let right = this.treeRoot;
        this.treeRoot.eachBefore(node => {
            if (node.y < top.y) top = node;
            if (node.y > bottom.y) bottom = node;
            if (node.x < left.x) left = node;
            if (node.x > right.x) right = node;
        });
        return {
            top,
            bottom,
            left,
            right
        }
    }
    
}
// 修改node
const updateNode = function (selection, _this) {
    selection.classed('node-hide', d => !!d.data.isHide)
    selection.classed('action', d => _this.editExp === d.data)
    const body = selection.select('.node-body')
    body.each(function (node, index, list) {
        // console.log('===this===', this)
        // console.log('===node===', node)
        // console.log('===index===', index)
        // console.log('===list===', list)
        if (node.data.type === 5) {
            const text = _this.render.exp(node.data)
            d3.select(this)
            .select('.node-exp-text')
            .classed('show', _this.layout === 'tree-fat' || _this.layout === 'cluster')
            .attr('title', text)
            .html(() => text)
            // d3.select(this).append('exp.div')
            // .classed('node-exp-text', true)
            // .classed('show', false)
           
        } else {
            d3.select(this)
            .select('.node-exp-text').remove()
        }

    })
    
    const iconBody = body.select('.node-action-body')
    const nodeMenu = iconBody.select('.node-menu')
    
    renderNodeMenu(nodeMenu, _this)

    const nodeIcon = iconBody.select('.node-body-icon')
    .classed('node-body-jiaoji', d => {return d.data.type === 3})
    .classed('node-body-bingji', d => d.data.type === 2)
    .classed('node-body-expression', d => d.data.type === 5)
    .html(d => `
    <svg class="icon" aria-hidden="true" >
        <use xlink:href="#${getIcon(d.data.type)}"></use>
    </svg>
    `)
    // nodeIcon.call(_this.drag)
    // 加入 文字
    body.select('.node-body-text')
    .text(d => d.data.name)
}
// 新建node
const renderNode = function (selection, _this) {
    selection.html('')
    selection.classed('node-hide', d => !!d.data.isHide)
    selection.classed('action', d => _this.editExp === d.data)
    const body = selection
    .append('x.div')
    .classed('node-body', true)
    
    // 先加入提示
    body.each(function (node, index, list) {
        // console.log('===this===', this)
        // console.log('===node===', node)
        // console.log('===index===', index)
        // console.log('===list===', list)
        if (node.data.type === 5) {
            const text = _this.render.exp(node.data)
            d3.select(this).append('exp.div')
            .classed('node-exp-text', true)
            .classed('show', _this.layout === 'tree-fat' || _this.layout === 'cluster')
            .attr('title', text)
            .html(() => text)
            .on("click", function (event, d) {
                event.stopPropagation()
                _this.editExp = d.data
                // _this.editExpDom = d3.select(this.parentNode.parentNode.parentNode).select('.node-exp-text').node()
                // 这里guideBox
                // console.log('selection==', this)
                // 开启编辑
                // _this.eventBus.onEdit(d.data)
                // const nwidth = d3.select(this.parentNode.parentNode.parentNode).select('.node-exp-text').node().clientWidth
                // _this.setActionEl(d.x, d.y, 26, nwidth)
                _this.eventBus.onStartEditExp(d.data)
            })
            // .transition()
            // .classed('show', _this.layout === 'tree-fat')
        }
    })
    
    const iconBody = body.append('node.div')
    .style('display', 'flex')
    .style('flex-direction', 'column')
    .style('align-items', 'center')
    .classed('node-action-body', true)
    
    // 给menu

    // 加入菜单 <div class="menu" >2</div>
    const nodeMenu = iconBody.append('node.div')
    .classed('node-menu', true)
    // 根据类型生成菜单
    // nodeMenu.each(d => {
    //     console.log('=====nodeMenu.each===', d)
    // })
    // nodeMenu.each(d => {
    //     console.log();
    // })
    renderNodeMenu(nodeMenu, _this)
    // -------------------------
    
    // -------------------------
    // 加入 图标
    const nodeIcon = iconBody
    .append('node.div')
    .classed('node-body-icon', true)
    .classed('node-body-jiaoji', d => {return d.data.type === 3})
    .classed('node-body-bingji', d => d.data.type === 2)
    .classed('node-body-expression', d => d.data.type === 5)
    .html(d => `
    <svg class="icon" aria-hidden="true" >
        <use xlink:href="#${getIcon(d.data.type)}"></use>
    </svg>
    `)
    nodeIcon.each(function (node, index, list) {
        // console.log('===this===', this)
        // console.log('===node===', node)
        // console.log('===index===', index)
        // console.log('===list===', list)
        if (node.data.type === 5) {
            // d3.select(this).call(_this.drag)
        }
    })
    // nodeIcon.call(_this.drag)
    // 加入 文字
    body.append('node.div')
    .classed('node-body-text', true)
    .text(d => d.data.name)
}
const renderNodeMenu = (nodeMenu, _this) => {
    nodeMenu.html('')
    // 左 交集
    nodeMenu
    .append('node.div').classed('btn', true).classed('btn-l', true).style('background', '#009688')
    .classed('btn-hide', d => d.data.type === 3)
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-n-y-jiaoji"></use>
        </svg>
    `)
    .on("click", function (event, d,...p) {
        console.log(this, event, d, ...p);
        event.stopPropagation()
        if ( d.data.type === 2) {
            d.data.type = 3
        } else {
            d.data.type = 3
            d.data.name = ''
            d.data.children = []
            // delete d.data.expression
        }
        // d3.select(this)
        // .classed('node-body-jiaoji', true)
        // .classed('node-body-bingji', false)
        // .classed('node-body-expression', false)
        _this.reload()
        _this.drawn(d)
        _this.eventBus.onChange('edit', d.data)
    })
    // 左 并集
    nodeMenu
    .append('node.div').classed('btn', true).classed('btn-l', true).style('background', '#2196f3')
    .classed('btn-hide', d => d.data.type !== 3)
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-n-y-bingji"></use>
        </svg>
    `)
    .on("click", (event, d) => {
        event.stopPropagation()
        // d.data.type = 
        if ( d.data.type === 3) {
            d.data.type = 2
        } else {
            d.data.type = 2
            d.data.name = ''
            d.data.children = []
            // delete d.data.expression
        }
        _this.reload()
        _this.drawn(d)
        _this.eventBus.onChange('edit', d.data)
    })

    // 右 并集

    nodeMenu
    .append('node.div').classed('btn', true).classed('btn-r', true).style('background', '#2196f3')
    .classed('btn-hide', d => d.data.type !== 5)
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-n-y-bingji"></use>
        </svg>
    `)
    .on("click", (event, d) => {
        event.stopPropagation()
        // d.data.type = 
        if ( d.data.type === 3) {
            d.data.type = 2
        } else {
            d.data.type = 2
            d.data.name = ''
            d.data.children = []
            // delete d.data.expression
        }
        _this.reload()
        _this.drawn(d)
        _this.eventBus.onChange('edit', d.data)
    })

    // 右 表达式
    nodeMenu
    .append('node.div').classed('btn', true).classed('btn-r', true).style('background', '#9c27b0')
    .classed('btn-hide', d => d.data.type === 5)
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-n-y-expression"></use>
        </svg>
    `)
    .on("click", (event, d) => {
        event.stopPropagation()
        d.data.type = 5
        d.data.name = ''
        // d.data.expression = []
        d.data.children = []
        // delete d.data.children
        _this.reload()
        _this.drawn(d)
        _this.eventBus.onChange('edit', d.data)
    })
    // 添加子
    nodeMenu
    .append('node.div')
    .classed('btn', true)
    .classed('btn-u', true)
    .classed('btn-hide', d => d.data.type === 5)
    .style('background', '#607d8b')
    .attr('title', '添加子')
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#${'icon-n-y-add'}"></use>
        </svg>
    `)
    .on("click", (event, d) => {
        event.stopPropagation()
        if (!d.data.children) {
            d.data.children = []
        }
        const node = {
            id: `${new Date().getTime()}`,
            name: '', //`${new Date().getTime()}`,
            type: 5,
            children: []
        }
        d.data.children.push(node)
        _this.eventBus.onCreated(node, d.data)
        _this.reload()
        _this.drawn(d)
        _this.eventBus.onChange('create', node)
    })

    // 编辑 上
    nodeMenu
    .append('node.div')
    .classed('btn', true)
    .classed('btn-u', true)
    .classed('btn-hide', d => d.data.type !== 5)
    .style('background', '#607d8b')
    .attr('title', '编辑表达式')
    .html(d => `
        <svg class="icon" aria-hidden="true" >
            <use xlink:href="#${'icon-n-n-calc'}"></use>
        </svg>
    `)
    .on("click", function (event, d) {
        event.stopPropagation()
        _this.editExp = d.data
        // _this.editExpDom = d3.select(this.parentNode.parentNode.parentNode).select('.node-exp-text').node()
        // 这里guideBox
        // console.log('selection==', this)
        // 开启编辑
        // _this.eventBus.onEdit(d.data)
        // const nwidth = d3.select(this.parentNode.parentNode.parentNode).select('.node-exp-text').node().clientWidth
        // _this.setActionEl(d.x, d.y, 26, nwidth)
        _this.eventBus.onStartEditExp(d.data)
    })
    // 删除 下
    nodeMenu
    .append('node.div')
    .classed('btn', true)
    .classed('btn-d', true)
    .attr('title', '删除')
    .html(`
    <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-n-y-shanchu"></use>
    </svg>
    `)
    .on("click", (event, d) => {
        event.stopPropagation()
        // if (_this.editExp === d.data) {
        //     _this.editExp = null
        // }
        console.log('delete', d)
        const index = d.parent.data.children.findIndex(f => f.id === d.id)
        const delNode = d.parent.data.children.splice(index, 1)
        _this.reload()
        _this.drawn(d)
        // _this.drawn({
        //     x: d.x,
        //     y: d.y,
        //     x0: d.x,
        //     y0: d.y,
        // })
        _this.eventBus.onChange('delete', d.data)
    })
}
// 获取 节点图标
const getIcon = function (t) {
    let icon = ''
    switch (t) {
        case 2:
            icon = 'icon-n-y-bingji'
        break;
        case 3:
            icon = 'icon-n-y-jiaoji'
        break;
        case 5:
            icon = 'icon-n-y-expression'
        break;
    }
    return icon
}

// const renderNode = function (selection) {
//     // selection.text('123123')
//     // const body = selection.append('div').classed('node-body', true)
//     // body.append('div').classed('node-body-icon', true)
//     // body.append('div')
//     // .classed('node-body-text', true)
//     // .text(d => d.data.name)
//     selection.append('div').classed('node-body', true).append('div').classed('node-body-icon', true)
//     return selection
// }
export default Graph