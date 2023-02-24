import { ref, watch } from 'vue'
import { Utils } from '@platform/main'
import BpmnModdle from 'bpmn-js/lib/Modeler'; //如果手动引入bpmn-js/lib/Modeler，则具备左侧工具栏，可以编辑流程图
// 功能模块扩展配置
import additionalModulesFun from '../bpmn/modules/index'
// 元素扩展配置
import moddleExtensions from '../bpmn/moddle/index'

export const dom = ref(null)

export const initViewer = async () => {
    // 这里判断actionType

    await new Promise(resolve => {
        watch(dom, () => {
            resolve()
        })
    })

    const urlParams = Utils.parseQuery(window.location.search.substring(1))
    
    const additionalModules = additionalModulesFun(urlParams.action === 'edit')
    window.__BPMN_MODDLE__ = new BpmnModdle({
        // BpmnViewer BpmnModdle
        container: dom.value,
        keyboard: {
            bindTo: window
        },
        // propertiesPanel: {
        //   parent: '#js-properties-panel'
        // },
        additionalModules,
        moddleExtensions
    })
}
