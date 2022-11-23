import { WidgetNS } from '../model/widget.d'

// NInput -> n-input
export const NameToLine = (name: string) => name.replace(/(?!^[A-Z])([A-Z])/g,"-$1").toLowerCase()

// n-input -> NInput
export const NameToHump = (name: string) => name.replace(
  /^.|\-(\w)/g,
  (all, letter) => (letter || all).toUpperCase()
)

// 转换数据
const compileValue: (d: WidgetNS.OptionValue) => WidgetNS.OptionValue = (d: WidgetNS.OptionValue) => {
    if (['function', 'array', 'object'].includes(d.type)) {
        // 进行转换
        return new Function(`return ${d.value}`)()
    } else {
        return d.value
    }
}

// 数据转换 将options内的数据配置转换成真实代码配置
export const compileConfig = (options: WidgetNS.Options) => {
    const r: WidgetNS.Options = {}
    for (const key in options) {
        r[key] = compileValue(options[key])
    }
    return r;
}

// 递归数据转换

export const recursionCompileConfig = (WidgetData: Array<WidgetNS.Config>) => {

    const fn = (list: Array<WidgetNS.Config>) => {
        list.forEach(wd => {
            // 转换options 数据
            compileConfig(wd.options)
            // 进行递归
            if (wd.slots) {
                for (const k in wd.slots) {
                    fn(wd.slots[k])
                }
            }
        })
    }

    fn(WidgetData)

    return WidgetData
}