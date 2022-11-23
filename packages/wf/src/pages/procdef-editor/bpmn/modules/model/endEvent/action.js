// import store from '@workflow/store'
// import { BpmnFactory as EventFactory } from '../../propertiesPanel/components/event'

export default {
    createShape: (elementFactory, bpmnFactory) => {
        return elementFactory.createShape({
        type: 'bpmn:EndEvent',
        businessObject: bpmnFactory.create('bpmn:EndEvent', {
            // id: `Test-${Math.random()*1000}`,
            name: '结束',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: []
            })
        })
    })}
}