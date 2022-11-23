
export default {
    createShape: (elementFactory, bpmnFactory) => {
        return elementFactory.createShape({
        type: 'bpmn:CallActivity',
        // icon: 'entry bpmn-icon-user-task',
        businessObject: bpmnFactory.create('bpmn:CallActivity', {
            'calledElementBinding': 'version',
            'netwisd:isLookOver': '0',
            'netwisd:isLookMe': '0',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: [
                    bpmnFactory.create('camunda:In', {
                        businessKey: 'sub_#{execution.processBusinessKey}'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfCamundaProcessId',
                        target: 'wfCamundaProcessId',
                        'netwisd:readOnly': '1'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfProcessId',
                        target: 'wfProcessId',
                        'netwisd:readOnly': '1'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfAssignee',
                        target: 'wfAssignee',
                        'netwisd:readOnly': '1'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfCallActivityDefId',
                        target: 'wfCallActivityDefId',
                        'netwisd:readOnly': '1'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfLocalAssignee',
                        target: 'wfLocalAssignee',
                        'netwisd:readOnly': '1'
                    }),
                    bpmnFactory.create('camunda:In', {
                        source: 'wfActInsId',
                        target: 'wfActInsId',
                        'netwisd:readOnly': '1'
                    }),

                    bpmnFactory.create('netwisd:HumanExps', {
                        values: [],
                        mustFlag: 'default'
                    }),
                    bpmnFactory.create('netwisd:Forms', {
                        // 加入表单所有字段
                        // values: store.getters['workflow/wfprocdef/editorFormField'].map(d => bpmnFactory.create('netwisd:Field', {
                        //     id: d.id,
                        //     varId: d.varId,
                        //     varName: d.varName,
                        //     javaType: d.javaType,
                        //     varType: d.varType,
                        //     powerCode: '1',
                        // })),
                        values: [],
                        mustFlag: 'default'
                    }),
                    bpmnFactory.create('netwisd:Buttons', {
                        // values: store.getters['workflow/wfprocdef/editorFormButton'].map(d => bpmnFactory.create('netwisd:NodeButton', {
                        //     id: d.id,
                        //     name: d.buttonName,
                        //     code: d.buttonCode
                        // })),
                        values: [],
                        mustFlag: 'default'
                    }),
                    bpmnFactory.create('netwisd:Vars', {
                        values: [],
                        mustFlag: 'default'
                    })
                ]
            })
    
        })
    })}
}