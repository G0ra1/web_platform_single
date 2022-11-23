import action from './action'
export default ({
  bpmnFactory,
  create,
  elementFactory,
  translate
}) => ({
    group: 'activity',
    className: 'entry bpmn-icon-user-task',
    // className: 'bpmn-icon-user-task',
    title: translate('创建一个类型为lindaidai-task的任务节点'),
    action: {
        dragstart: function(event) {
            const shape = action.createShape(elementFactory, bpmnFactory)
            create.start(event, shape);
        },
        click: function(event) {
            const shape = action.createShape(elementFactory, bpmnFactory)
            create.start(event, shape);
        }
    }
})