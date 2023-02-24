import { ref, reactive, toRaw, computed } from "vue"
import type { Ref } from "vue"
import type { DesignerInstance } from "./designer.d"
import type { WidgetNS } from "./widget.d"

import { Utils } from "@platform/main"

import { Widget } from "./widget"
import { cloneDeep } from "lodash"
import { Tools } from './tools'
// import { recursionCompileConfig } from "../utils/index"

abstract class Control {
    moveToUpGrid?: () => void
    moveToDownGrid?: () => void
    exchangeLeft?: () => void
    exchangeRight?: () => void
    RowIndex?: Ref<number>
    remove?: () => void
    refresh?: () => void
    isMoveToUpGrid?: Ref<boolean>
    isMoveToDownGrid?: Ref<boolean>
    isExchangeLeft?: Ref<boolean>
    isExchangeRight?: Ref<boolean>
}
// 
class WidgetFormatControl extends Control {
    
    ActiveWidget = ref<WidgetNS.Config>()
    GridsWidget = ref<Array<WidgetNS.Config>>([])
    
    RowIndex = ref<number>(-1)
    remove = () => {
        this.GridsWidget.value.splice(this.RowIndex.value, 1)
    }
    constructor (d: WidgetNS.Config, grids: Array<WidgetNS.Config>) {
        super()
        // this.init(d, fg, grid, grids)
        this.ActiveWidget.value = d
        this.GridsWidget.value = grids
        this.RowIndex.value = this.GridsWidget.value.findIndex(d => {
            return d === this.ActiveWidget.value
        })
    }
}
class WidgetControl extends Control {
    GridsWidget = ref<Array<WidgetNS.Config>>([])

    // 当前活动字段组件
    ActiveWidget = ref<WidgetNS.Config>()

    // 当前活动字段
    ActiveFieldGiWidget = ref<WidgetNS.Config>()

    // 当前活动组件所在grid
    ActiveGridWidget = ref<WidgetNS.Config>()

    RowIndex = ref<number>(-1)
    ColIndex = ref<number>(-1)
    // gi 移动到上级grid
    isMoveToUpGrid = ref(false)
    moveToUpGrid = () => {
        // 移动到上一个grid中 这里需要判断被移出grid内gi数量
        // 被移出所在行下标
        const rowIndex = this.RowIndex.value
        // 被移出所在行
        const nowGrid = this.GridsWidget.value[rowIndex]
        // 被移出所在行插槽
        const nowGridSlotsDef = nowGrid.slots!.default
        // 被移出列数据
        const gfi = toRaw(this.ActiveFieldGiWidget.value)

        // 移入目标行
        const preGrid = this.GridsWidget.value[rowIndex - 1]
        // 移入目标行插槽
        const preGridSlotsDef = preGrid.slots!.default

        // 加入到目标行
        preGridSlotsDef.push(gfi!)

        // 重置目标行列span配置
        preGridSlotsDef.forEach(d => {
            d.options.span.value = [ 1, 24, 12, 8, 6 ][preGridSlotsDef.length]
        })

        // 移除原有
        nowGridSlotsDef.splice(this.ColIndex.value, 1)
        if (!nowGridSlotsDef.length) {
            this.GridsWidget.value.splice(rowIndex, 1)
        }

        // 调用init
        this.init(
            this.ActiveWidget.value!,
            preGridSlotsDef[preGridSlotsDef.length - 1],
            preGrid,
            this.GridsWidget.value
        )
    }
    // 向下移出gi
    isMoveToDownGrid = ref(false)
    moveToDownGrid = () => {
        // 
        const gfi = toRaw(this.ActiveFieldGiWidget.value)
        gfi!.options.span.value = 24

        const gridSlotsDef = this.ActiveGridWidget.value!.slots!.default
        gridSlotsDef.splice(this.ColIndex.value, 1)

        const newGrid: WidgetNS.Config = {
            key: `n-grid_${Utils.radomKey()}`,
            type: 'n-grid',
            tagName: 'n-grid',
            isCustomDesigner: false,
            category: 'container',
            icon: 'icon-n-y-grid',
            label: '栅格',
            internal: true,
            slots: {
                default: [
                    gfi!
                ]
            },
            options: {
                cols: {
                    type: 'number',
                    value: 24
                },
                layoutShiftDisabled: {
                    type: 'boolean',
                    value: false
                },
                xGap: {
                    type: 'number',
                    value: 10
                },
                yGap: {
                    type: 'number',
                    value: 0
                }
            }
        }
        this.GridsWidget.value.splice(this.RowIndex.value + 1, 0, newGrid)
        gridSlotsDef.forEach(d => {
            d.options.span.value = [ 1, 24, 12, 8, 6 ][gridSlotsDef.length]
        })

        // 调用init
        this.init(
            this.ActiveWidget.value!,
            this.GridsWidget.value[this.RowIndex.value + 1].slots!.default[0],
            this.GridsWidget.value[this.RowIndex.value + 1],
            this.GridsWidget.value
        )
    }
    // 向左交换
    isExchangeLeft = ref(false)
    exchangeLeft = () => {
        const gridSlotsDef = this.ActiveGridWidget.value!.slots!.default
        const giLeft = gridSlotsDef[this.ColIndex.value - 1]
        gridSlotsDef[this.ColIndex.value - 1] = this.ActiveFieldGiWidget.value!
        gridSlotsDef[this.ColIndex.value] = giLeft

        this.init(
            this.ActiveWidget.value!,
            gridSlotsDef[this.ColIndex.value - 1],
            this.ActiveGridWidget.value!,
            this.GridsWidget.value
        )
    }
    // 向右交换
    isExchangeRight = ref(false)
    exchangeRight = () => {
        
        const gridSlotsDef = this.ActiveGridWidget.value!.slots!.default
        const giRight = gridSlotsDef[this.ColIndex.value + 1]
        gridSlotsDef[this.ColIndex.value + 1] = this.ActiveFieldGiWidget.value!
        gridSlotsDef[this.ColIndex.value] = giRight

        this.init(
            this.ActiveWidget.value!,
            gridSlotsDef[this.ColIndex.value + 1],
            this.ActiveGridWidget.value!,
            this.GridsWidget.value
        )
    }
    // 删除
    isRemove = ref(false)
    remove = () => {
        const gridSlotsDef = this.ActiveGridWidget.value!.slots!.default
        gridSlotsDef.splice(this.ColIndex.value, 1)
        
        gridSlotsDef.forEach(d => {
            d.options.span.value = [ 1, 24, 12, 8, 6 ][gridSlotsDef.length]
        })

        // 删除后检测grid slots是否为空数组，如果是空数组则删除整个grid
        if (!gridSlotsDef.length) {
            this.GridsWidget.value.splice(this.RowIndex.value, 1)
        }
    }
    refresh = () => {
        // 行
        const rowIndex = this.GridsWidget.value.findIndex(d => {
            return d === this.ActiveGridWidget.value
        })

        this.RowIndex.value = rowIndex
        // 列
        const colIndex = this.ActiveGridWidget.value!.slots!.default.findIndex(d => {
            return d === this.ActiveFieldGiWidget.value
        })
        this.ColIndex.value = colIndex
        // 行

        // gi 移动到上级grid
        this.isMoveToUpGrid.value = !(
            rowIndex === 0 ||
            this.GridsWidget.value[rowIndex - 1].category === 'format' ||
            this.GridsWidget.value[rowIndex - 1].slots!.default.length === 4
        
        )

        this.isMoveToDownGrid.value = this.ActiveGridWidget.value!.slots!.default.length !== 1

        // 列交换
        
        this.isExchangeLeft.value = colIndex !== 0
        this.isExchangeRight.value = colIndex !== (this.ActiveGridWidget.value!.slots!.default.length - 1)
    }
    init (d: WidgetNS.Config, fg: WidgetNS.Config, grid: WidgetNS.Config, grids: Array<WidgetNS.Config>) {
        this.ActiveWidget.value = d
        this.ActiveFieldGiWidget.value = fg
        this.ActiveGridWidget.value = grid
        this.GridsWidget.value = grids
        this.refresh()
    }
    constructor (d: WidgetNS.Config, fg: WidgetNS.Config, grid: WidgetNS.Config, grids: Array<WidgetNS.Config>) {
        super()
        this.init(d, fg, grid, grids)
    }
}
class Designer {
    // static 
    // 页面元数据
    // SourceWidget = ref<WidgetNS.Config>({})
    // SourceWidget: Ref<WidgetNS.Config>
    Tools: Tools

    SourceWidget = ref<WidgetNS.Config>()

    GridsWidget = ref<Array<WidgetNS.Config>>()

    // ActiveWidgetControl:WidgetControl | null = null
    // field控制
    ActiveWidgetControl = ref<Control>()
    // 
    // ActiveWidgetControl = ref<WidgetControl>()

    // 当前活动组件
    ActiveWidget = ref<WidgetNS.Config>()

    // 当前活动字段
    ActiveFieldGiWidget = ref<WidgetNS.Config | undefined>()

    // 当前活动组件所在grid
    ActiveGridWidget = ref<WidgetNS.Config | undefined>()

    AttrContentRef = ref<any>()
    // ActiveWidget: Ref<WidgetNS.Instance
    //
    setAttrContentRef = (d:any) => {
        this.AttrContentRef.value = d
    }
    // 删除当前活动组件
    removeWidget = () => {}

    // 向上移动
    moveUpWidget = () => {}
    
    // 向下移动
    moveDownWidget = () => {}

    // 选取widget
    handleActiveWidget = (d: WidgetNS.Config, fg?: WidgetNS.Config, grid?: WidgetNS.Config, grids?: Array<WidgetNS.Config>) => {
        // console.log('====handleActiveWidget======', d, fg, grid)
        this.ActiveWidget.value = d

        this.ActiveFieldGiWidget.value = undefined
        this.ActiveGridWidget.value = undefined
        this.GridsWidget.value = undefined
        this.ActiveWidgetControl.value = undefined

        if (d.category === 'field' || d.category === 'data') {
            this.ActiveFieldGiWidget.value = fg
            this.ActiveGridWidget.value = grid
            this.GridsWidget.value = grids
            this.ActiveWidgetControl.value = new WidgetControl(d, fg!, grid!, grids!)
        } else if (d.category === 'format') {
            this.GridsWidget.value = grids
            this.ActiveWidgetControl.value = new WidgetFormatControl(d, grids!)
        } else if (d.category === 'container') {
            
        }

        if (fg) {
            
        }
        
    }

    // 初始化数据
    initWidget = () => {
        
    }

    // constructor (WidgetData:  Array<WidgetNS.Config>) {
    //     // recursionCompileConfig(WidgetData)
    //     // console.log('=====WidgetData=====', WidgetData)
    //     // 克隆数据

    //     // 转换数据
    //     this.SourceWidget.value = cloneDeep(WidgetData)
    // }
    constructor (WidgetData:  WidgetNS.Config) {
        // recursionCompileConfig(WidgetData)
        // console.log('=====WidgetData=====', WidgetData)
        // 克隆数据

        // 转换数据

        // this.SourceWidget.value = cloneDeep(WidgetData)
        // this.SourceWidget = ref<WidgetNS.Config>(WidgetData)
        this.SourceWidget.value = WidgetData
        
        this.ActiveWidget.value = this.SourceWidget.value

        // tools
        this.Tools = new Tools(this)
    }
}

export {
    Designer,
    WidgetFormatControl,
    WidgetControl
}