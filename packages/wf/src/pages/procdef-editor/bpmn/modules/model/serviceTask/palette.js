import action from './action'
export default ({
  bpmnFactory,
  create,
  elementFactory,
  translate
}) => ({
    group: 'activity',
    className: 'entry bpmn-icon-service-task',
    // className: 'bpmn-icon-user-task',
    title: translate('创建一个类型为lindaidai-task的任务节点'),
    action: {
        dragstart: function(event) {
            create.start(event, action.createShape(elementFactory, bpmnFactory));
        },
        click: function(event) {
            create.start(event, action.createShape(elementFactory, bpmnFactory));
        }
    }
})