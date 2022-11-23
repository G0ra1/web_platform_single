import type { App, DefineComponent, Component } from 'vue'

import type { WidgetNS } from '../model/widget.d'
const WidgetConfig = import.meta.glob<{ default: WidgetNS.Config }>('./*/*/config.ts', { eager: true })
const WidgetDesigner = import.meta.glob<{ default: Component }>('./*/*/designer.vue', { eager: true })
const WidgetAttribute = import.meta.glob<{ default: Component }>('./*/*/attribute.vue', { eager: true })

export default {
//   install(app) {
//     for (const path in modules) {
//       let cname = modules[path].default.name
//       app.component(cname, modules[path].default)
//     }
//   }
}



const getWidget = () => {
    const WidgetList = []
    for (const path in WidgetConfig) {
        // let cname = modules[path].default.name
        const data = WidgetConfig[path].default
        // 判断是否内置
        if (!data.internal) {
            WidgetList.push(data)
        }
    }
    return WidgetList
}

// 获取设计器组件注册
const RegisterWidgetDesigner = {
    install (app: App<Element>) {
        for (const path in WidgetDesigner) {
            const [,, cname] = path.split('/')
            const component: Component = WidgetDesigner[path].default
            app.component(`dw-${cname}`, component)
        }
        for (const path in WidgetAttribute) {
            const [,, cname] = path.split('/')
            const component: Component = WidgetAttribute[path].default
            app.component(`dw-attr-${cname}`, component)
        }
    }
}

export {
    RegisterWidgetDesigner,
    getWidget
}