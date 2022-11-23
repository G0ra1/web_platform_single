
import type { PropsWithDefaults, ComputedRef, Ref } from 'vue'

// 类型枚举
type Category = 'container' | 'data' | 'field' | 'service' | 'wf'

// 数据类型 这里类型要加入 引用类型
type OptionValueType = 'string' | 'number' | 'boolean' | 'function' | 'array' | 'object'

// 转换后的值
type BindValueType = string | number | boolean | Function | Array | object

// 组件类型定义
export namespace WidgetNS {
    // 属性值类型
    export type OptionValue = {
        type: OptionValueType,
        value: string | boolean | number
    }
    // 属性配置数据
    export type Options = {
        [a: string]: OptionValue | BindValueType
    }

    // 事件配置
    export type Events = {
        [a: string]: string
    }
    // 组件配置数据
    export type Config = {
        value?: any,
        key?: string,
        // 标签名
        type?: string,
        // 类型
        category?: Category,
        // 图标
        icon?: string,
        // 标题
        label?: string,
        // 是否内置
        internal?: boolean,
        internalOptions?: any,
        // 插槽
        slots?: {
            [a: string]: Array<WidgetNS.Config>
        },
        // 配置项
        options: Options,
        // 事件
        events?: Events
    }
    
    export interface Instance {
        key: string
        tagName: string
        label: string
        internal: boolean
        config: Ref<WidgetNS.Config>
        internalOptions: ComputedRef<any>
        isActive: ComputedRef<boolean>
        slots: {
            [a: string]: Ref<Array<Widget>>
        }
        // slots: {
        //     [a: string]: Array<Widget>
        // }
        // 组件参数
        options: ComputedRef<Options>
    }
}


export interface DesignerInstance {
    // 总体页面数据
    SourceWidget: Ref<Array<WidgetNS.Config>>

    // 当前活动组件
    ActiveWidget: Ref<WidgetNS.Config | undefined>

    // 删除当前活动组件
    removeWidget: () => void

    // 向上移动
    moveUpWidget: () => void
    
    // 向下移动
    moveDownWidget: () => void

    handleActiveWidget: (d: WidgetNS.Config) => void
}