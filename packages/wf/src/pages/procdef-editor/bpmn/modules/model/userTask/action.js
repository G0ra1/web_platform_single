// import store from '@workflow/store'
// import { BpmnFactory as EventFactory } from '../../propertiesPanel/components/event'
import { events } from '../../../../store/cache-events'
import {
    getExtensionRootEl,
  } from '../../../../util/index'
  import {
    getRootElement,
    actionElBusinessObject,
    getElements
  } from "../../../../store/bpmn"
export default {
    createShape: (elementFactory, bpmnFactory) => {
        const elForm = getExtensionRootEl(getRootElement(), 'netwisd:Form');
        return elementFactory.createShape({
        type: 'bpmn:UserTask',
        // icon: 'entry bpmn-icon-user-task',
        businessObject: bpmnFactory.create('bpmn:UserTask', {
            // id: `Test-${Math.random()*1000}`,
            'name': '',
            'netwisd:selectRule': '0',
            'netwisd:batchRule': '0',
            'netwisd:cancelRule': '1',
            'netwisd:returnRule': '1',
            candidateUsers: '${wfAssignee}',
            extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
                values: [
                    bpmnFactory.create('netwisd:Form', {
                        id: elForm.id,
                        formName: elForm.formName,
                        formNameCh: elForm.formNameCh,
                        pageUrl: elForm.pageUrl,
                        cptId: elForm.cptId,
                        cptFullName: elForm.cptFullName,
                        values: []
                    }),
                    bpmnFactory.create('netwisd:HumanExps', {
                        values: []
                    }),
                    // bpmnFactory.create('netwisd:NodeForm', {
                    //     // 加入表单所有字段
                    //     // values: store.getters['workflow/wfprocdef/editorFormField'].map(d => bpmnFactory.create('netwisd:Field', {
                    //     //     id: d.id,
                    //     //     varId: d.varId,
                    //     //     varName: d.varName,
                    //     //     javaType: d.javaType,
                    //     //     varType: d.varType,
                    //     //     powerCode: '1',
                    //     // })),
                    //     values: [],
                    //     mustFlag: 'default'
                    // }),
                    bpmnFactory.create('netwisd:Buttons', {
                        // values: store.getters['workflow/wfprocdef/editorFormButton'].map(d => bpmnFactory.create('netwisd:NodeButton', {
                        //     id: d.id,
                        //     name: d.buttonName,
                        //     code: d.buttonCode
                        // })),
                        values: []
                    }),
                    bpmnFactory.create('netwisd:Vars', {
                        values: []
                    }),
                    // 加入默认事件
                    // ...store.state.workflow.wfprocdef.editorDefEvents.filter(d => d.nodeEventType === 1).map(EventFactory(bpmnFactory))
                    // bpmnFactory.create('camunda:TaskListener', {
                    //     class: 'com.netwisd.base.wf.event.listener.MessageListener',
                    //     event: 'create',
                    //     id: 'messageListener'
                    // }),
                    // bpmnFactory.create('camunda:TaskListener',{
                    //   class: 'com.netwisd.base.wf.event.listener.InvokeListener',
                    //   event: 'create',
                    //   id: 'invokeListener',
                    //   fields: [
                    //       bpmnFactory.create('camunda:Field', {
                    //           name: 'fixedValue',
                    //           string: 'http://localhost:8007/test/handle'
                    //       })
                    //   ]
                    // }),
                    // bpmnFactory.create('camunda:TaskListener', {
                    //     class: 'com.netwisd.base.wf.event.listener.WfTaskListener',
                    //     event: 'create',
                    //     id: 'wfTaskListener',
                    //     'netwisd:class': 'com.netwisd.base.wf.event.listener.WfTaskListener',
                    // }),
                    // bpmnFactory.create('netwisd:Test', {
                    //     testx: '1111',
                    // })
                ]
            })
    
        })
    })}
}