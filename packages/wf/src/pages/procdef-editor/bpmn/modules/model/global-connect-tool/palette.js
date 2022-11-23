import action from './action'
export default ({
  bpmnFactory,
  create,
  elementFactory,
  translate,
  globalConnect,
  eventBus
}) => ({
    group: 'tools',
    className: 'bpmn-icon-connection-multi',
    // className: 'bpmn-icon-user-task',
    title: translate(''),
    action: {
        click: function(event) {
            // const cb = (e) => {       
            //     console.log('connection.added.palette', e);
                
            //     eventBus.off('connection.added', cb)
            // }
            // eventBus.on('global-connect.end', (e) => {
            //     console.log('global-connect.end', e);
            // })  
            // eventBus.on('global-connect.ended', (e) => {
            //     console.log('global-connect.ended', e);
            // })
            // // eventBus.off('connection.added', cb)
            // eventBus.on('connection.added', cb)
            console.log('connection', event, globalConnect);
            console.log(globalConnect.start(event)); // toggle
            
            // console.log(globalConnect.start(event, action.createShape(elementFactory, bpmnFactory)));
        }
    }
})