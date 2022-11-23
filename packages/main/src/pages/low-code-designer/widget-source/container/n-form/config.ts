import { WidgetNS } from '../../../model/widget.d'
export default {
    type: 'n-form',
    category: 'container',
    icon: 'icon-n-y-form',
    label: '表单',
    slots: {
      default: [{
        type: 'n-grid',
        category: 'container',
        icon: 'icon-n-y-grid',
        label: '栅格',
        slots: {
          default: [
            {
              type: 'n-form-item-gi',
              category: 'container',
              icon: 'icon-n-y-form',
              label: '表单字段',
              internal: true,
              options: {
                offset: {
                  type: 'number',
                  value: 0
                },
                span: {
                  type: 'number',
                  value: 1
                }
              }
            }
          ]
        },
        options: {
          cols: {
            type: 'number',
            value: 24
          },
          layoutShiftDisabled: {
            type: 'boolean',
            value: false
          },
          xGap: {
            type: 'number',
            value: 0
          },
          yGap: {
            type: 'number',
            value: 0
          }
        }
      }]
    },
    options: {
      disabled: {
        type: 'boolean',
        value: false
      },
      inline: {
        type: 'boolean',
        value: false
      },
      labelWidth: {
        type: 'string',
        value: 'auto'
      },
      labelAlgin: {
        type: 'string',
        value: 'left'
      }
    }
} as WidgetNS.Config