import type { App, DefineComponent, Component } from 'vue'
import {
    NwFieldGrid,
    NwFieldEmail,
    NwFieldAddress,
    NwFieldPhone,
    NwFieldRender,
    NwFieldAnchorTarget
} from '@platform/main'
import type { WidgetNS } from '../model/widget.d'
const WidgetConfig = import.meta.glob<WidgetNS.Source>('./*/*/config.ts', { eager: true })
const WidgetDesigner = import.meta.glob<WidgetNS.Source>('./*/*/designer.vue', { eager: true })
const WidgetAttribute = import.meta.glob<WidgetNS.Source>('./*/*/attribute.vue', { eager: true })

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
        // console.log('====WidgetConfig[path]====', WidgetConfig[path])
        // const data = WidgetConfig[path].default
        // 判断是否内置
        WidgetList.push(WidgetConfig[path].default)
    }
    return WidgetList
}

// 获取设计器组件注册
const RegisterWidgetDesigner = {
    install (app: App<Element>) {
        app.component('NwFieldGrid', NwFieldGrid)
        app.component('NwFieldEmail', NwFieldEmail)
        app.component('NwFieldAddress', NwFieldAddress)
        app.component('NwFieldPhone', NwFieldPhone)
        app.component('NwFieldRender', NwFieldRender)
        app.component('NwFieldAnchorTarget', NwFieldAnchorTarget)
        // 注册
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