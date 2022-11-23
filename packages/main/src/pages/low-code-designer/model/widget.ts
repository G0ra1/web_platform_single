import { ref, computed, withDefaults, defineProps } from "vue"
import type { ComputedRef } from "vue"
import type { DesignerInstance } from "./designer.d"
import type { WidgetNS } from "./widget.d"

import { compileConfig } from "../utils/index"

// import { recursionCompileConfig } from "../utils/index"
import { designer } from '../store/index'

// 组件碎片实例
class Widget {
    
    //----------存储数据-----------
    // 组件原始配置数据
    // value: WidgetNS.Config

    // 父级元素

    // 所在数组

    // 
    // internalOptions: ComputedRef<object>

    // // 组件翻译后参数
    // options: ComputedRef<WidgetNS.Options>

    // // 默认插槽
    // slotsDefault = ref<Array<WidgetNS.Config>>([])

    // // 是否活动
    // isActive: ComputedRef<boolean>

    //----------工具函数----------

    // 构造函数 这里传入检出的插槽名称
    constructor (value: WidgetNS.Config) {
        // this.value = value
        // // 内置属性
        // this.internalOptions = computed(() => this.value.internalOptions || {})
        // // 翻译属性配置
        // this.options = computed(() => compileConfig(this.value.options))
        // // 是否选定
        // this.isActive = computed(() => this.value === designer.ActiveWidget.value)
        // // 赋值默认插槽数据
        // this.slotsDefault.value = this.value.slots?.default || []
    }
}

export {
    Widget
}