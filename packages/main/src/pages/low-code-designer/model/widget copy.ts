import { ref, reactive, computed, withDefaults, defineProps, toRaw } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { DesignerInstance } from "./designer.d"
import type { WidgetNS } from "./widget.d"

import { compileConfig } from "../utils/index"

// import { recursionCompileConfig } from "../utils/index"
import { designer } from '../store/index'

// 组件碎片实例
class Widget implements WidgetNS.Instance {
    key: string
    tagName: string
    label: string
    internal: boolean
    //----------存储数据-----------
    // designer: DesignerInstance

    // 组件原始配置数据
    config: Ref<WidgetNS.Config>

    // 父级元素

    // 所在数组
    // 内置配置
    internalOptions: ComputedRef<any>

    // 是否活动
    isActive: ComputedRef<boolean>

    // 组件翻译后参数
    options: ComputedRef<WidgetNS.Options>

    // 父级
    parentWidget: Widget | 'root'
    // 所在插槽名
    slotName: string

    slots:{
        [a: string]: Ref<Array<Widget>>
    } = {}
    // slots:{
    //     [a: string]: Array<Widget>
    // } = {}
    //----------工具函数----------
    // 删除
    /**
     * 
     * @param value 组件元数据
     * @param slotName 所在插槽名
     * @param parent 父组件
     */
    constructor (
        value: WidgetNS.Config,
        slotName: string,
        parent: Widget | 'root' = 'root',
        
    ) {
        this.key = value.key!
        this.tagName = value.type!
        this.label = value.label!
        this.internal = !!value.internal
        // 所在插槽
        this.slotName = slotName
        // 赋值父级组件
        this.parentWidget = parent
        // this.designer = designer
        this.config = ref(value)

        this.internalOptions = computed(() => this.config.value.internalOptions || {})
        // 翻译属性配置
        this.options = computed(() => compileConfig(this.config.value.options))
        // 是否选定
        this.isActive = computed(() => {
            // console.log('===isActive====', this, toRaw(designer.ActiveWidget.value))
            return this === toRaw(designer.ActiveWidget.value)
        })
        // 赋值默认插槽数据

        // 递归初始化 插槽
        Object.entries(this.config.value.slots || {}).forEach(([slotName, widgets]) => {
            // this.slotsWidget.value.push(...widgets.map((d: WidgetNS.Config) => {
            //     return new Widget(d, slotName, this)
            // }))
            this.slots[slotName] = ref([])
            this.slots[slotName].value = widgets.map((d: WidgetNS.Config) => {
                return new Widget(d, slotName, this)
            })
            // this.slots[slotName] = widgets.map((d: WidgetNS.Config) => {
            //     return new Widget(d, slotName, this)
            // })
        })
    }
}

export {
    Widget
}