import { ref } from "vue"
import type { Ref } from "vue"
import type { DesignerInstance } from "./designer.d"
import type { WidgetNS } from "./widget.d"

import { Widget } from "./widget copy"
import { cloneDeep } from "lodash"
// import { recursionCompileConfig } from "../utils/index"

class Designer implements DesignerInstance {
    // 页面元数据
    // SourceWidget = ref<WidgetNS.Config>({})
    SourceWidget: Ref<WidgetNS.Config>

    RootWidget: Widget

    // 当前活动组件
    ActiveWidget = ref<WidgetNS.Instance | undefined>()
    // ActiveWidget: Ref<WidgetNS.Instance>

    // 删除当前活动组件
    removeWidget = () => {}

    // 向上移动
    moveUpWidget = () => {}
    
    // 向下移动
    moveDownWidget = () => {}

    // 选取widget
    handleActiveWidget = (d: WidgetNS.Instance) => {
        this.ActiveWidget.value = d
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
        this.SourceWidget = ref<WidgetNS.Config>(WidgetData)
        
        this.RootWidget = new Widget(WidgetData, 'default')

        // this.ActiveWidget = ref<WidgetNS.Instance>(this.RootWidget)
        this.ActiveWidget.value = this.RootWidget
    }
}

export {
    Designer
}