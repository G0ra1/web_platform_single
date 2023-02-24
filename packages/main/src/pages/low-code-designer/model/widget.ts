import { ref, reactive, computed, withDefaults, defineProps, toRaw } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { DesignerInstance } from "./designer.d"
import type { WidgetNS } from "./widget.d"

import { compileConfig } from "../utils/index"

// import { recursionCompileConfig } from "../utils/index"
import { designer } from '../store/index'

// 组件碎片实例
class Widget {
    key: string
    tagName: string
    label: string
    internal: boolean
    //----------存储数据-----------
    // designer: DesignerInstance

    // 组件原始配置数据
    config: Ref<WidgetNS.Config>

    // 组件翻译后参数
    options: ComputedRef<WidgetNS.Options>

    // 父级
    // parent: WidgetNS.Config | undefined
    // 所在插槽名
    // slotName: string

    // slots:{
    //     [a: string]: Ref<Array<Widget>>
    // } = {}
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
        slotName?: string,
        parent?: WidgetNS.Config,
        
    ) {
        this.key = value.key!
        this.tagName = value.tagName!
        this.label = value.label!
        this.internal = !!value.internal
        // 所在插槽
        // this.slotName = slotName
        // 赋值父级组件
        // this.parent = parent
        // this.designer = designer
        this.config = ref(value)
        // 翻译属性配置
        this.options = computed(() => compileConfig(this.config.value.options))
        // console.log(`======${this.tagName}==`, this.options)
    }
}

// 字段判断对象
class WidgetField extends Widget {

    constructor ( value: WidgetNS.Config, slotName: string) {
        super(value, slotName)
    }
}

// RootWidget
class WidgetRoot extends Widget {

    // 是否为Tabs
    isTabs: ComputedRef<boolean>

    // 是否使用
    isAnchor: ComputedRef<boolean>


    TabPaneWidgets: ComputedRef<Array<Widget>>

    constructor (value: WidgetNS.Config) {
        super(value)
        // 是否开启了页签
        this.isTabs = computed(() => {
            // console.log('computed===', this.config.value.slots?.default[0].tagName === 'n-tabs')
            return this.config.value.slots?.default[0].tagName === 'n-tabs'
        })
        // tabpane
        this.TabPaneWidgets = computed(() => {
            const TabsConfig = this.config.value!.slots!.default[0];
            if (TabsConfig.tagName === 'n-tabs') {
                return TabsConfig.slots!.default.map((d: any) => new Widget(d))
            } else {
                return []
            }
        })
        console.log('======WidgetRoot=======', value)
        // 是否使用了锚点
        this.isAnchor = computed(() => {
            const anchor = this.config.value.slots?.default[1]
            return !!(anchor && anchor.tagName === 'n-anchor');
        })
    }
}


export {
    Widget,
    WidgetRoot
}