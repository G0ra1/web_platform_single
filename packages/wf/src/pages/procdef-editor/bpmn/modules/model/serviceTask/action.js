export default {
    createShape: (elementFactory, bpmnFactory) => elementFactory.createShape({
        type: 'bpmn:ServiceTask',
        icon: 'entry bpmn-icon-service-task',
        businessObject: bpmnFactory.create('bpmn:UserTask', {
            // id: `Test-${Math.random()*1000}`,
            candidateUsers: '${wfAssignee}',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: [
                    bpmnFactory.create('camunda:TaskListener', {
                        class: 'com.netwisd.demo.delegate.listener.MessageListener',
                        event: 'create',
                        id: 'messageListener'
                    }),
                    bpmnFactory.create('camunda:TaskListener',{
                      class: 'com.netwisd.demo.delegate.listener.InvokeListener',
                      event: 'create',
                      id: 'invokeListener',
                      fields: [
                          bpmnFactory.create('camunda:Field', {
                              name: 'fixedValue',
                              string: 'http://localhost:8007/test/handle'
                          })
                      ]
                    }),
                    bpmnFactory.create('camunda:TaskListener', {
                        class: 'com.netwisd.demo.delegate.listener.WfTaskListener',
                        event: 'create',
                        id: 'wfTaskListener'
                    })
                ]
            })
    
        })
    })
}