import action from './action'
export default ({
  bpmnFactory,
  create,
  elementFactory,
  translate
}) => ({
    group: 'activity',
    className: 'entry bpmn-icon-call-activity',
    // className: 'bpmn-icon-user-task',
    title: translate(''),
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