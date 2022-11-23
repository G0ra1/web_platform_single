// import store from '@workflow/store'
// import { BpmnFactory as EventFactory } from '../../propertiesPanel/components/event'
import { events } from '../../../../store/cache-events'
export default {
    createShape: (elementFactory, bpmnFactory) => {
        return elementFactory.createShape({
        type: 'bpmn:InclusiveGateway',
        // icon: 'entry bpmn-icon-user-task',
        businessObject: bpmnFactory.create('bpmn:InclusiveGateway', {
            // id: `Test-${Math.random()*1000}`,
            'name': '',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: []
            })
    
        })
    })}
}