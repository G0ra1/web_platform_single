import { palette } from '../model'
// import userTaskaPalette from '../model/userTask/palette'
// import callactivityPalette from '../model/callActivity/palette'
// import exclusiveGatewayPalette from '../model/exclusiveGateway/palette'
// import parallelGatewayPalette from '../model/parallelGateway/palette'
// import inclusiveGatewayPalette from '../model/inclusiveGateway/palette'
// import endEventPalette from '../model/endEvent/palette'

import userTaskaAction from '../model/userTask/action'
import callactivityAction from '../model/callActivity/action'
import exclusiveGatewayAction from '../model/exclusiveGateway/action'
import parallelGatewayAction from '../model/parallelGateway/action'
import inclusiveGatewayAction from '../model/inclusiveGateway/action'
import endEventAction from '../model/endEvent/action'
class CustomPalette {
    constructor(
        bpmnFactory,
        create,
        elementFactory,
        palette,
        translate,
        globalConnect,
        eventBus
    ) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.globalConnect = globalConnect;
        this.eventBus = eventBus;

        palette.registerProvider(this);
    }

    getPaletteEntries(element) {
        const {
            bpmnFactory,
            create,
            elementFactory,
            translate,
            globalConnect,
            eventBus
        } = this;
        const r = {
            // 'gateway-separator': {
            //     group: 'gateway',
            //     separator: true
            // },
            // 外链流程
            // 结束
            'create.end-event': {
                group: 'activity',
                className: 'entry bpmn-icon-end-event-none',
                // className: 'bpmn-icon-user-task',
                title: translate('创建结束节点'),
                action: {
                    dragstart: function(event) {
                        const shape = endEventAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    },
                    click: function(event) {
                        const shape = endEventAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    }
                }
            },
            // 用户节点
            'create.user-task': {
                group: 'activity',
                className: 'entry bpmn-icon-user-task',
                // className: 'bpmn-icon-user-task',
                title: translate('创建用户节点'),
                action: {
                    dragstart: function(event) {
                        const shape = userTaskaAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    },
                    click: function(event) {
                        const shape = userTaskaAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    }
                }
            },
            'create.call-activity': {
                group: 'activity',
                className: 'entry bpmn-icon-call-activity',
                // className: 'bpmn-icon-user-task',
                title: translate('创建外链流程'),
                action: {
                    dragstart: function(event) {
                        const shape = callactivityAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    },
                    click: function(event) {
                        const shape = callactivityAction.createShape(elementFactory, bpmnFactory)
                        create.start(event, shape);
                    }
                }
            },
            // 'task-separator': {
            //     group: 'task',
            //     separator: true
            // },
            // 'gateway-separator': {
            //     group: 'gateway',
            //     separator: true
            // },
            // 
            'create.exclusive-gateway': {
                group: 'gateway',
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
            // 'create.parallel-gateway': {
            //     group: 'gateway',
            //     className: `bpmn-icon-gateway-parallel`,
            //     title: '路由',
            //     action: {
            //         dragstart: (event, element) => {
            //             const shape = parallelGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //             this.create.start(event, shape, {
            //             source: element
            //             });
            //         },
            //         click: (event, element) => {
            //         const shape = parallelGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //         if (this.autoPlace) {
            //             this.autoPlace.append(element, shape);
            //         } else {
            //             this.create.start(event, shape, {
            //             source: element
            //             });
            //         }
            //         }
            //     }
            // },
            // 'create.inclusive-gateway': {
            //     group: 'gateway',
            //     className: `bpmn-icon-gateway-or`,
            //     title: '路由',
            //     action: {
            //       dragstart: (event, element) => {
            //           const shape = inclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //           this.create.start(event, shape, {
            //             source: element
            //           });
            //       },
            //       click: (event, element) => {
            //         const shape = inclusiveGatewayAction.createShape(this.elementFactory, this.bpmnFactory)
            //         if (this.autoPlace) {
            //           this.autoPlace.append(element, shape);
            //         } else {
            //           this.create.start(event, shape, {
            //             source: element
            //           });
            //         }
            //       }
            //     }
            // },
            'gateway-separator': {
                group: 'gateway',
                separator: true
            },
            
        }

        // 初始化palette
        
        // palette.forEach((d, i) => {
        //   r[d.key] = d.palette({
        //     bpmnFactory,
        //     create,
        //     elementFactory,
        //     translate,
        //     globalConnect,
        //     eventBus
        //   })
        // })
        r['create.task'] = {
            group: 'activity',
            className: 'palette-hide'
        }
        r['create.subprocess-expanded'] = {
            group: 'activity',
            className: 'palette-hide'
        }
        // create.intermediate-event
        r['create.intermediate-event'] = {
            group: 'activity',
            className: 'palette-hide'
        }

        // delete r['create.task']

        console.log('=====rrr=====', r)
        r['activity-separator'] = {
            group: 'activity',
            separator: true
        }
        return r
    }
}

CustomPalette.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate',
    'globalConnect',
    'eventBus'
]

export default {
    __init__: ['customPalette'],
    customPalette: ['type', CustomPalette]
}