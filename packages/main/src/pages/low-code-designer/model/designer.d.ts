import type { Ref } from "vue"
import type { WidgetNS } from "./widget.d"

export interface DesignerInstance {
    // 总体页面数据
    // SourceWidget: Ref<Array<WidgetNS.Config>>
    SourceWidget: Ref<WidgetNS.Config>

    RootWidget: WidgetNS.Instance
    // 当前活动组件
    ActiveWidget: Ref<WidgetNS.Instance | undefined>

    // 删除当前活动组件
    removeWidget: () => void

    // 向上移动
    moveUpWidget: () => void
    
    // 向下移动
    moveDownWidget: () => void

    handleActiveWidget: (d: WidgetNS.Instance) => void
}