import userTaskaAction from '../model/userTask/action'
import callactivityAction from '../model/callActivity/action'
import exclusiveGatewayAction from '../model/exclusiveGateway/action'
import parallelGatewayAction from '../model/parallelGateway/action'
import inclusiveGatewayAction from '../model/inclusiveGateway/action'
import endEventAction from '../model/endEvent/action'
// import store from '@workflow/store'

class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate, bpmnFactory) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.bpmnFactory = bpmnFactory;
        if (config.autoPlace !== false) { // 自动放置
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        // alert(1);
        // console.log('element==', element);
        // 根据节点类型展示 contextPad
        const isAddCustom = !['bpmn:SequenceFlow', 'bpmn:EndEvent'].includes(element.type)
        const AddCustom = {
            'append.userTask': {
              group: 'model',
              className: `bpmn-icon-user-task`,
              title: '任务节点',
              action: {
                dragstart: (event, element) => {
                  const shape = userTaskaAction.createShape(this.elementFactory, this.bpmnFactory)
                  this.create.start(event, shape, {
                    source: element
                  });
                },
                click: (event, element) => {
                  const shape = userTaskaAction.createShape(this.elementFactory, this.bpmnFactory)
                  // console.log('====autoPlace======', this.autoPlace)
                  if (this.autoPlace) {
                    this.autoPlace.append(element, shape)
                  } else {
                    this.create.start(event, shape, {
                      source: element
                    });
                  }
                }
              }
            },
            // callActivity
            'append.callActivity': {
              group: 'model',
              className: `bpmn-icon-call-activity`,
              title: '外链流程',
              action: {
                dragstart: (event, element) => {
                    const shape = callactivityAction.createShape(this.elementFactory, this.bpmnFactory)
                    this.create.start(event, shape, {
                      source: element
                    });
                },
                click: (event, element) => {
                  const shape = callactivityAction.createShape(this.elementFactory, this.bpmnFactory)
                  if (this.autoPlace) {
                    this.autoPlace.append(element, shape);
                  } else {
                    this.create.start(event, shape, {
                      source: element
                    });
                  }
                }
              }
            },
            'append.gateway': {
              group: 'default',
              className: `bpmn-icon-gateway-xor`,
              title: '路由',
              action: {
                dragstart: (event, element) => {
                    const shape = exclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
                    this.create.start(event, shape, {
                      source: element
                    });
                },
                click: (event, element) => {
                  const shape = exclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
                  if (this.autoPlace) {
                    this.autoPlace.append(element, shape);
                  } else {
                    this.create.start(event, shape, {
                      source: element
                    });
                  }
                }
              }
            },
            //parallelGatewayAction
            // 'append.parallelGateway': {
            //   group: 'default',
            //   className: `bpmn-icon-gateway-parallel`,
            //   title: '路由',
            //   action: {
            //     dragstart: (event, element) => {
            //         const shape = parallelGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //         this.create.start(event, shape, {
            //           source: element
            //         });
            //     },
            //     click: (event, element) => {
            //       const shape = parallelGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //       if (this.autoPlace) {
            //         this.autoPlace.append(element, shape);
            //       } else {
            //         this.create.start(event, shape, {
            //           source: element
            //         });
            //       }
            //     }
            //   }
            // },
            // //inclusiveGatewayAction
            // 'append.inclusiveGateway': {
            //   group: 'default',
            //   className: `bpmn-icon-gateway-or`,
            //   title: '路由',
            //   action: {
            //     dragstart: (event, element) => {
            //         const shape = inclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //         this.create.start(event, shape, {
            //           source: element
            //         });
            //     },
            //     click: (event, element) => {
            //       const shape = inclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //       if (this.autoPlace) {
            //         this.autoPlace.append(element, shape);
            //       } else {
            //         this.create.start(event, shape, {
            //           source: element
            //         });
            //       }
            //     }
            //   }
            // },


            //append.end-event
            'append.end-event': {
              group: 'model',
              className: `bpmn-icon-end-event-none`,
              title: '结束',
              action: {
                dragstart: (event, element) => {
                    const shape = endEventAction.createShape(this.elementFactory, this.bpmnFactory)
                    this.create.start(event, shape, {
                      source: element
                    });
                },
                click: (event, element) => {
                  const shape = endEventAction.createShape(this.elementFactory, this.bpmnFactory)
                  if (this.autoPlace) {
                    this.autoPlace.append(element, shape);
                  } else {
                    this.create.start(event, shape, {
                      source: element
                    });
                  }
                }
              }

            }
        }
        const actions = {
          // 
            'append.intermediate-event': {
                className: 'contextPad-hide'
            },
            'append.text-annotation': {
                className: 'contextPad-hide'
            },
            // 删除append task
            'append.append-task': {
                className: 'contextPad-hide'
            },
            // 去掉钳子
            'replace': {
                className: 'contextPad-hide'
            },
            ...(isAddCustom ? AddCustom : {})
        }
        if (isAddCustom) {
            actions
        }
        // 如果是userTask
        if (element.type === 'bpmn:UserTask') {
          actions['copy.form-item'] = {
            group: 'edit',
            className: `ivu-icon ivu-icon-md-copy`,
            title: '复制节点表单配置',
            action: {
              dragstart: (event, element) => {
              },
              click: (event, element) => {
                  // 这里缓存节点表单数据
                //   console.log('==element==',
                //   element,
                //   JSON.stringify(element
                //   .businessObject
                //   .extensionElements
                //   .values
                //   .find(d => d.$type === 'netwisd:NodeForm').values)
                //   );
                  // store.commit('workflow/wfprocdef/setCopyCacheUserTask', element, { root: true });
              }
            }
          }
        }
        return actions
    }
}

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate',
    'bpmnFactory'
]

export default {
    __init__: ['customContextPad'],
    customContextPad: ['type', CustomContextPad]
}