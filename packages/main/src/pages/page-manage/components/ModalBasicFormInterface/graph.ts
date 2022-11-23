import * as d3 from 'd3'
import type { Selection, HierarchyNode } from 'd3'


// 生成转换脚本
export function generateScript (json: string, flag: boolean) {
    
    const schema = JSON.parse(json) // 原始


    // function x(a) {
    //     const {
            
    //     } = a
    // }
    // 子表递归生成脚本
    const recursionFun: (d: object) => string = (obj: object) => {
        return Object.entries(obj).map(([fieldName, content]) => {
            const {
                sourceFieldName, // 原属性名
                properties,
                items,
                type
            } = content

            // const script = `${fieldName}: d['${sourceFieldName}']`

            if (type === 'object' && properties) { // 对象类型

                return `${fieldName}: (d => ({
                    ${recursionFun(properties)}
                }))(d['${sourceFieldName}'])`
                
            } else if (type === 'array' && items && items.type === 'object') { // 数组类型
                return `${fieldName}: d['${sourceFieldName}']?.map(d => ({
                    ${recursionFun(items.properties)}
                }))`

            } else {
                console.log(`${fieldName}: d['${sourceFieldName}']`)
                // 一般
                return `${fieldName}: d['${sourceFieldName}']`
            }
        }).join(',\n')
    }
    return `return {${recursionFun(schema)}}`

    // const demoScript = `
    //     return {
    //         newField: d.oldField,
    //         newObj: (d => ({
    //             newObjF1: d.oldObjF1
    //         }))(oldObj),
    //         newSonList: d.oldSonList.map(d => ({
    //             newf1: d.oldf1
    //             newf2: d.oldf2
    //         }))
    //     }
    // `

}
// schema参数转换
export function toSchema (json: string) {

    const schema = JSON.parse(json) // 原始

    // const findRTree = (p: string) => Graph.RightGraphTree?.Tree.descendants().find((d: any)=> d.data._sourceFnPath === p)
    const findRTree = (p: string) => Graph.RightGraphTree?.Tree.descendants().find((d: any)=> d.data._fnPath === p)
    
    // 递归
    const recursionFun = (obj: object, path: string) => {
        Object.entries(obj).forEach(([fieldName, content]) => {
            const {
                properties,
                items,
                type
            } = content

            const npath = `${path}${path ? '.' : ''}${fieldName}`
            // 根据npath查询
            const rgt = findRTree(npath)
            if (rgt && rgt.data.sourceFieldName) {
                content.sourceFieldName = rgt.data.sourceFieldName
            } else {
                delete content.sourceFieldName
            }
            if (type === 'object' && properties) { // 对象类型
                recursionFun(properties, npath)
            } else if (type === 'array' && items && items.type === 'object') { // 数组类型
                recursionFun(items.properties, npath)
            }
        })
    }
    recursionFun(schema, '')
    // tree.eachAfter((d: any) => {
        
    // })
    return JSON.stringify(schema, null, 4)
}


// 处理层叠参数
export function recursion (
    obj: object
) {
    const objToList = (obj: object) => {
        return Object.entries(obj).map(([ fieldName, content ]) => {
            const { properties, items, title = '', type, format = '', description = '', sourceFieldName } = content
            if (type === 'object' && properties) { // 对象类型
                return {
                    fieldName,  // 字段名
                    sourceFieldName, // 源字段
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format,
                    children: properties,
                    schema: title
                }
            } else if (type === 'array' && items) { // 数组类型
                // 这里判断数组项类型

                return {
                    fieldName,  // 字段名
                    sourceFieldName, // 源字段
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format,
                    children: items.properties,
                    schema: items.type
                }
            } else {
                return {
                    fieldName,  // 字段名
                    sourceFieldName, // 源字段
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format
                }
            }
        })
    }

    const recursionFun = (obj: object) => {
        // obj 转数组
        
        const list = objToList(obj)
        
        list.forEach(d => {
            if (d.children) {
                d.children = recursionFun(d.children)
            }
        })

        return list
    }
    return recursionFun(obj)
}

// 节点尺寸
const NodeSize = 32
// 树平移
const LeftTreeMarginTop = 30
const RightTreeMarginTop = 30
const LeftTreeMarginLeft = 50
const RightTreeMarginLeft = 750

// 处理树形数据fieldName
function generateFilePath (hn: HierarchyNode<any>, isTarget: boolean = false) {
    // hn.eachBefore(d => )
    hn.eachAfter((d: any) => {
        d.data._fnPath = d.ancestors().map((d: any) => d.data.fieldName).reverse().filter((d: any) => d).join('.')
        if (isTarget && d.data.sourceFieldName) {
            d.data._sourceFnPath = d.ancestors().map((d: any) => d.data.sourceFieldName).reverse().filter((d: any) => d).join('.')
        }
    })
}

// 生成连接


interface GraphInstance {
    El: Element // 原始容器
    loadData: (a: object, b: object) => void
}

// 树形
interface GraphTreeInstance {
    render: () => void
    BBox: DOMRect,
    Tree: any
}

// 类型图标
const iconType: any = {
    'string': {
        label: 'string',
        color: '#D33D17'
    },
    'integer': {
        label: 'integer',
        color: '#00A396'
    },
    'number': {
        label: 'number',
        color: '#00A396'

    },
    'array': {
        label: 'array',
        color: '#9D3F9D'

    },
    'object': {
        label: 'object',
        color: '#147EB3'

    },
    'boolean': {
        label: 'boolean',
        color: '#D1980B'

    },
    // 'string': '',
}

// 源树
class GraphTreeSource implements GraphTreeInstance {
    static dragState = {
        action: 'over', // 當前狀態
        sx: 0, // 起始点x
        sy: 0, // 起始点y
        ex: 0, // 其實點x
        ey: 0, // 其實點x
    }
    static Source: any = {
        Node: null
    }
    Div: Selection<any, any, any, any>
    Svg: Selection<any, any, any, any>
    List: Array<object> = []
    Tree: any
    BBox: DOMRect
    render = () => {
        
    }
    constructor (
        div: Selection<any, any, any, any>,
        svg: Selection<any, any, any, any>,
        List: Array<object>,
        x: number,
        y: number
    ) {
        this.Div = div
        this.Svg = svg
        this.Tree =  d3.hierarchy({
            children: List
        })
        generateFilePath(this.Tree)

        let i = 0
        this.Tree.eachBefore((d: any) => d.index! = i++);
        const nodes = this.Tree.descendants()
        const links = this.Tree.links()
        const groupSvg = svg.append("g").attr("transform", `translate(${x}, ${y})`)
        

        const link = groupSvg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#888")
            .attr("opacity", ".5")
            .selectAll("path")
            .data(links)
            .join("path")
            .attr("d", (d: any) => `
                M${d.source.depth * NodeSize},${d.source.index * NodeSize}
                V${d.target.index * NodeSize}
                h${NodeSize}
            `);
        const actionLayer = groupSvg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#888")
        .attr("stroke-width", "2px")
        .attr("opacity", ".5")
        const actionPath = actionLayer.append('path')
        .attr("d", `
            M0,0
            L0,0
        `).style('display', 'none')
        // .style("stroke-width", "5px")
        ;
        const drag:any = d3.drag().on("start", (d, n: any) => {
            // console.log(n.ancestors().map((d: any) => d.data.fieldName).reverse().filter((d: any) => d).join('.'))
            console.log(n)
            
            GraphTreeSource.dragState.action = 'drag'
            GraphTreeSource.dragState.sx = d.x
            GraphTreeSource.dragState.sy = d.y
            
            actionPath.attr("d", `
                M0,0
                L0,0
            `).style('display', '')
            GraphTreeSource.Source.Node = n
            
        }).on("drag", (d) => {
            // actionPath.attr("d", `
            //     M${GraphTreeSource.dragState.sx},${GraphTreeSource.dragState.sy}
            //     L${d.x},${d.y}
            // `)
            actionPath.attr("d", d3.linkHorizontal()
            .source(() => [GraphTreeSource.dragState.sx, GraphTreeSource.dragState.sy])
            .target(() => [d.x, d.y]))
        }).on('end', (d, n: any) => {
            console.log('==d==', d)
            // 获取目标
            if (GraphTreeTarget.Target.Node) {
                // 这里清除当前起始连线
                console.log('-----Graph.RightGraphTree------', Graph.RightGraphTree)
                Graph.RightGraphTree?.Tree.eachAfter((rd: any) => {
                    if(rd.data._sourceNode === n) {
                        
                        console.log('-----Graph.RightGraphTree--rd----', rd)
                        // 取消
                        rd.data.sourceFieldName = null
                        rd.data._sourceFnPath = null
                        rd.data._sourceNode = null
                    }
                })
                
                // console.log('=====source target======',
                // GraphTreeSource.Source.Node,
                // GraphTreeTarget.Target.Node
                // )
                // 建立映射
                GraphTreeTarget.Target.Node.data.sourceFieldName = GraphTreeSource.Source.Node.data.fieldName
                // 建立
                GraphTreeTarget.Target.Node.data._sourceFnPath = GraphTreeSource.Source.Node.data._fnPath
                GraphTreeTarget.Target.Node.data._sourceNode = GraphTreeSource.Source.Node

                // 刷新
                Graph.LinkGraph.render()

                // 更新数据
                Graph.callBack() // toSchema
            }
            GraphTreeSource.dragState.action = 'over'
            actionPath.style('display', 'none')
            GraphTreeSource.Source.Node = null
        })
        const groupDiv = div.append("div")
        .style('position', 'absolute')
        .style('left', `${x}px`)
        .style('top', `${y}px`)

        const nodeDoms = groupDiv.selectAll("div")
        .data(nodes)
        .join("div")
        .style('position', 'absolute')
        .style('left', '-8px')
        .style('padding-left', (d: any) => `${d.depth * NodeSize}px`)
        .style('top', (d: any) => `${d.index * NodeSize - 10}px`)
        .style('display', 'flex')
        .style('align-items', 'center')
        // <svg class="icon" aria-hidden="true" :style="{
        //     ...getSize(props.size),
        //     color: props.color
        //   }" :title="props.title">
        //     <use :xlink:href="`#${props.name}`"></use>
        //   </svg>
        

        nodeDoms.each(function (d: any) {
            // root 特殊处理
            if (!d.parent) {
                d3.select(this).append('div')
                .style('width', '100px')
                .style('text-align', 'center')
                .style('border-radius', '5px')
                .style('padding', '0 5px')
                .style('margin-right', '5px')
                .style('background', '#29A634')
                .style('color', '#fff')
                .text('表单字段规则')
                return
            }
            // d3.select(this).append('div')
            // .style('color', 'red')
            // .style('margin-right', '5px')
            // .style('background', '#fff')
            // .html(d => `
            // <svg class="icon" style="width: 18px;height: 18px; fill: red" aria-hidden="true" >
            //     <use xlink:href="#icon-n-y-export"></use>
            // </svg>
            // `)
            // console.log('====d.data====', d.data) //border-radius: 5px;
            const color = iconType[d.data.type]?.color

            // 类型
            d3.select(this).append('div')
            .style('width', '60px')
            .style('text-align', 'center')
            .style('border-radius', '5px')
            // .style('border', '5px')
            .style('padding', '0 5px')
            .style('margin-right', '5px')
            .style('background', color)
            .style('color', '#fff')
            // .style('font-weight', 'bold')
            .style('overflow', 'hidden')
            .style('white-space', 'nowrap')
            .style('text-overflow', 'ellipsis')
            .text((d: any) => `${d.data.type}`)
            
            // 文字
            d3.select(this).append('div')
            // .style('border-radius', '5px')
            // .style('border', `3px solid ${color}`)
            .style('font-weight', 'bold')
            .style('overflow', 'hidden')
            .style('white-space', 'nowrap')
            .style('text-overflow', 'ellipsis')
            .style('background', '#fff')
            .text((d: any) => `${d.data.fieldName}(${d.data.description})`)

            // 操作
            
            const dragLink = d3.select(this).append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('fill', '#215DB0')
            .style('margin-left', '5px')
            .style('background', '#fff')
            .style('cursor', 'pointer')
            .html(d => `
            <svg style="width: 18px;height: 18px" aria-hidden="true" >
                <use xlink:href="#icon-n-y-link"></use>
            </svg>
            `)
            const dom: any = this
            // 计算this的宽度
            d._TextWidth = dom.clientWidth
            d3.select(this).call(drag)
        })
        

        // nodeDoms.append('div')
        // .style('color', 'red')
        // .style('margin-right', '5px')
        // .style('background', '#fff')
        // .html(d => `
        // <svg class="icon" style="width: 18px;height: 18px; fill: red" aria-hidden="true" >
        //     <use xlink:href="#icon-n-y-export"></use>
        // </svg>
        // `)

        // node.append('svg')
        // .attr('class', 'icon')
        // .attr('aria-hidden', 'true')
        // .style('fill', 'red')
        // .style('width', '16px')
        // .style('height', '16px')
        // .append('use')
        // .attr('xlink:href', '#icon-n-y-export')
        
        // nodeDoms.append('div')
        // .style('overflow', 'hidden')
        // .style('white-space', 'nowrap')
        // .style('text-overflow', 'ellipsis')
        // .text((d: any) => `${d.data.fieldName}(${d.data.description})`)
        // const node = group
        //     .selectAll("g")
        //     .data(nodes) // .filter((d:any)  => d.parent)
        //     .join("g")
        //     .attr("transform", (d: any) => `translate(0,${d.index * NodeSize})`);

        // node.append("circle")
        //     .attr("cx", (d: any) => d.depth * NodeSize)
        //     .attr("r", 2.5)
        //     .attr("fill", (d: any) => d.children ? null : "#999");

        // node.append("text")
        //     .attr("dy", "0.32em")
        //     .attr("x", (d: any) => d.depth * NodeSize + 6)
        //     .text((d: any) => d.data.fieldName);

        this.BBox = groupSvg.node()!.getBBox()
        // group
        // node.append("title")
        //     .text((d: any) => d.ancestors().reverse().map((d: any) => d.data.fieldName).join("/"));
        
    }
}

// 目标树

class GraphTreeTarget implements GraphTreeInstance {
    static Target: any = {
        Node: null
    }
    Div: Selection<any, any, any, any>
    Svg: Selection<any, any, any, any>
    List: Array<object> = []
    Tree: any
    BBox: DOMRect
    render = () => {
        
    }
    constructor (
        div: Selection<any, any, any, any>,
        svg: Selection<any, any, any, any>,
        List: Array<object>,
        x: number,
        y: number
    ) {
        this.Div = div
        this.Svg = svg
        this.Tree =  d3.hierarchy({
            children: List
        })
        generateFilePath(this.Tree, true)
        let i = 0
        this.Tree.eachBefore((d: any) => d.index! = i++);
        const nodes = this.Tree.descendants()
        const links = this.Tree.links()
        const groupSvg = svg.append("g").attr("transform", `translate(${x}, ${y})`)
        const link = groupSvg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#888")
            .attr("opacity", ".5")
            .selectAll("path")
            .data(links)
            .join("path")
            .attr("d", (d: any) => `
                M${d.source.depth * NodeSize},${d.source.index * NodeSize}
                V${d.target.index * NodeSize}
                h${NodeSize}
            `);

        const groupDiv = div.append("div")
        .style('position', 'absolute')
        .style('left', `${x}px`)
        .style('top', `${y}px`)

        const nodeDoms = groupDiv.selectAll("div")
        .data(nodes)
        .join("div")
        .style('position', 'absolute')
        .style('left', '-8px')
        .style('padding-left', (d: any) => `${d.depth * NodeSize}px`)
        .style('top', (d: any) => `${d.index * NodeSize - 10}px`)
        .style('display', 'flex')
        .style('align-items', 'center')
        // <svg class="icon" aria-hidden="true" :style="{
        //     ...getSize(props.size),
        //     color: props.color
        //   }" :title="props.title">
        //     <use :xlink:href="`#${props.name}`"></use>
        //   </svg>
        nodeDoms.each(function (d: any) {
            // root 特殊处理
            if (!d.parent) {
                d3.select(this).append('div')
                .style('width', '100px')
                .style('text-align', 'center')
                .style('border-radius', '5px')
                .style('padding', '0 5px')
                .style('margin-right', '5px')
                .style('background', '#29A634')
                .style('color', '#fff')
                .text('接口字段规则')
                return
            }
            // d3.select(this).append('div')
            // .style('color', 'red')
            // .style('margin-right', '5px')
            // .style('background', '#fff')
            // .html(d => `
            // <svg class="icon" style="width: 18px;height: 18px; fill: red" aria-hidden="true" >
            //     <use xlink:href="#icon-n-y-export"></use>
            // </svg>
            // `)
            // console.log('====d.data====', d.data) //border-radius: 5px;
            const color = iconType[d.data.type]?.color

            // 操作
            
            d3.select(this).append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('fill', '#215DB0')
            .style('margin-right', '5px')
            .style('background', '#fff')
            .style('cursor', 'pointer')
            .html(d => `
            <svg style="width: 18px;height: 18px" aria-hidden="true" >
                <use xlink:href="#icon-n-y-inlink"></use>
            </svg>
            `)
            .on('mouseenter', (e, n: any) => {
                // console.log(e, n)
                GraphTreeTarget.Target.Node = n
            })
            .on('mouseleave', (e, n: any) => {
                // console.log(2)
                GraphTreeTarget.Target.Node = null
            })
            // 类型
            d3.select(this).append('div')
            .style('width', '60px')
            .style('text-align', 'center')
            .style('border-radius', '5px')
            // .style('border', '5px')
            .style('padding', '0 5px')
            .style('margin-right', '5px')
            .style('background', color)
            .style('color', '#fff')
            // .style('font-weight', 'bold')
            .style('overflow', 'hidden')
            .style('white-space', 'nowrap')
            .style('text-overflow', 'ellipsis')
            .text((d: any) => `${d.data.type}`)
            
            // 文字
            d3.select(this).append('div')
            // .style('border-radius', '5px')
            // .style('border', `3px solid ${color}`)
            .style('font-weight', 'bold')
            .style('overflow', 'hidden')
            .style('white-space', 'nowrap')
            .style('text-overflow', 'ellipsis')
            .text((d: any) => `${d.data.fieldName}(${d.data.description})`)

        })

        this.BBox = groupSvg.node()!.getBBox()

    }
}

// 连接 渲染
class LinkGraph {
    LeftGraphTree: GraphTreeInstance | undefined
    RightGraphTree: GraphTreeInstance | undefined
    SvgLink: Selection<any, any, any, any> | undefined // svg 层
    Div: Selection<any, any, any, any> | undefined
    constructor (
        svgLink: Selection<any, any, any, any>,
        l: GraphTreeInstance,
        r: GraphTreeInstance
    ) {
        this.SvgLink = svgLink
        this.LeftGraphTree = l
        this.RightGraphTree = r
        
        const findLeft = (p: string) => this.LeftGraphTree!.Tree.descendants().find((d: any)=> d.data._fnPath === p)
        // this.SvgLink 生成链状关联
        this.RightGraphTree.Tree.eachAfter((d: any) => {
            // 遍历所有后代
            // console.log('======sourceFieldName===',d)
            if (d.data._sourceFnPath) {
                // console.log('======d.data._sourceFnPath===', findLeft(d.data._sourceFnPath))
                // 查询表单的Node
                d.data._sourceNode = findLeft(d.data._sourceFnPath)
            }
        })
        this.render()
    }
    render () {
        this.SvgLink!
        .selectAll("g")
        .data(this.RightGraphTree!.Tree.descendants(), (d: any) => d.data._fnPath)
        .join("g")
        .each(function (d: any) {
            d3.select(this).selectAll('path').remove()
            const endPoint: [number, number] = [
                d.depth * NodeSize + RightTreeMarginLeft,
                d.index * NodeSize + RightTreeMarginTop
            ]
            let startPoint: any = []
            if (d.data._sourceNode) {
                const sn = d.data._sourceNode
                startPoint = [
                    LeftTreeMarginLeft + sn._TextWidth - 20,
                    sn.index * NodeSize + LeftTreeMarginTop
                ]
            } else {
                startPoint = endPoint
            }
            const line = d3.linkHorizontal()
                .source(() => startPoint)
                .target(() => endPoint)(d)

            d3.select(this).append('path').attr("fill", "none")
            .attr("stroke", "#fff")
            .style("stroke-width", "4px")
            .attr("d", line)
            d3.select(this).append('path').attr("fill", "none")
            .attr("stroke", "#0F6894")
            .style("stroke-width", "2px")
            .attr("d", line)
        })
        
        
        // this.SvgLink!
        // .selectAll("path")
        // .data(this.RightGraphTree!.Tree.descendants(), (d: any) => d.data._fnPath)
        // .join("path")
        // .attr("fill", "none")
        // .attr("stroke", "#0F6894")
        // .attr("d", (d: any) => {
        //     // d.data._sourceNode
        //     const endPoint: [number, number] = [
        //         d.depth * NodeSize + RightTreeMarginLeft,
        //         d.index * NodeSize + RightTreeMarginTop
        //     ]
        //     let startPoint: any = []
        //     if (d.data._sourceNode) {
        //         const sn = d.data._sourceNode
        //         startPoint = [
        //             LeftTreeMarginLeft + sn._TextWidth - 20,
        //             sn.index * NodeSize + LeftTreeMarginTop
        //         ]
        //     } else {
        //         startPoint = endPoint
        //     }
        //     // console.log(`${d3.linkHorizontal()
        //     //     .source(() => startPoint)
        //     //     .target(() => endPoint)}`)
        //     return `${d3.linkHorizontal()
        //         .source(() => startPoint)
        //         .target(() => endPoint)(d)}`
        //     // return `
        //     // M${startPoint.join(',')}
        //     // L${endPoint.join(',')}
        //     // `
        // })
    }
}

class Graph implements GraphInstance {
    static LinkGraph: any
    static callBack = () => {
        
    }
    El: Element // 原始值
    GEl: Selection<any, any, any, any> // d3对象
    CoordD3Dom: Selection<any, any, any, any> | undefined // 笛卡尔坐标系div

    Svg: Selection<any, any, any, any> | undefined // svg 层
    Div: Selection<any, any, any, any> | undefined

    SvgLink: Selection<any, any, any, any> | undefined

    LeftJson: object = {}
    LeftList: Array<object> = []
    static LeftGraphTree: GraphTreeInstance | undefined

    RightJson: object = {}
    RightList: Array<object> = []
    static RightGraphTree: GraphTreeInstance | undefined

    LinkGraph: any | undefined

    loadData = (LeftJson: object, RightJson: object) => {
        this.LeftJson = LeftJson
        this.LeftList = recursion(this.LeftJson)
        Graph.LeftGraphTree = new GraphTreeSource(this.Div!, this.Svg!, this.LeftList, LeftTreeMarginLeft, LeftTreeMarginTop)
        // new GraphTree()
        this.RightJson = RightJson
        this.RightList = recursion(this.RightJson)
        Graph.RightGraphTree = new GraphTreeTarget(this.Div!, this.Svg!, this.RightList, RightTreeMarginLeft, RightTreeMarginTop)

        Graph.LinkGraph = new LinkGraph(this.SvgLink!, Graph.LeftGraphTree,  Graph.RightGraphTree)
        const height = d3.max([Graph.LeftGraphTree.BBox.height, Graph.RightGraphTree.BBox.height])
        // 设置高度
        this.GEl.style('height', `${height! + 100}px`)
        console.log(
            '===LeftJson===RightJson===',
            LeftJson,
            recursion(this.LeftJson),
            RightJson,
            recursion(this.RightJson)
        )
    }
    // 渲染
    render () {

    }
    private init () {
        this.GEl.attr('onselectstart', 'return false')
        // 加入笛卡尔坐标
        this.CoordD3Dom = this.GEl.append('div').attr('onselectstart', 'return false')
        .style('position', 'relative')
        // .style('position', 'absolute')
        // .style('left', '50%')
        // .style('top', '50%')
        // 加入svg层
        this.Svg = this.CoordD3Dom.append('svg')
        .style('overflow', 'visible')
        // .style('height', '100%')
        // .style('width', '100%')

        this.SvgLink = this.Svg.append('g')
        // 加入html dom
        this.Div = this.CoordD3Dom.append('div').attr('onselectstart', 'return false')
        
    }
    constructor (El: Element, cb: any) {
        Graph.callBack = cb
        this.El = El
        this.GEl = d3.select<Element, Element>(El)
        this.GEl.selectChild().remove() // 清除
        console.log('====this.GEl====', this.GEl.selectChild(),this.GEl.selectChildren())
        // 初始化
        // this.Svg = this.GEl.append('svg')
        // .style('height', '100%')
        // .style('width', '100%')
        this.init()
        // .remove()
    }
}

export {
    Graph,
}
export type {
    GraphInstance
}