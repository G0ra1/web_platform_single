export default {
    createShape: (elementFactory, bpmnFactory) => elementFactory.createShape({
        type: 'bpmn:UserTask',
        // icon: 'entry bpmn-icon-user-task',
        businessObject: bpmnFactory.create('bpmn:UserTask', {
            // id: `Test-${Math.random()*1000}`,
            'netwisd:icon': 'entry bpmn-icon-user-task',
            candidateUsers: '${wfAssignee}',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: [
                    bpmnFactory.create('camunda:TaskListener', {
                        class: 'com.netwisd.base.wf.event.listener.MessageListener',
                        event: 'create',
                        id: 'messageListener'
                    }),
                    bpmnFactory.create('camunda:TaskListener',{
                      class: 'com.netwisd.base.wf.event.listener.InvokeListener',
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
                        class: 'com.netwisd.base.wf.event.listener.WfTaskListener',
                        event: 'create',
                        id: 'wfTaskListener',
                        'netwisd:class': 'com.netwisd.base.wf.event.listener.WfTaskListener',
                    }),
                    bpmnFactory.create('netwisd:Test', {
                        testx: '1111',
                    })
                ]
            })
    
        })
    })
}