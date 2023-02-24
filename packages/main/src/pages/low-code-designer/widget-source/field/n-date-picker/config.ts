import { WidgetNS } from '../../../model/widget.d'
// export const label = '日期'
// export const tagName = 'n-date-picker'
// export const icon = 'icon-n-y-date'
// export const category = 'field'
export default {
    key: 'n-date-picker',
    type: 'n-date-picker',
    category: 'field',
    icon: 'icon-n-y-input',
    isCustomDesigner: false,
    tagName: 'n-date-picker',
    label: '日期',
    options: {
        disabled: {
          type: 'boolean',
          value: false
        },
        style: {
            type: 'object',
            value: '{width:\'100%\'}'
        },
        clearable: {
          type: 'boolean',
          value: false
        },
        type: {
          type: 'string',
          value: 'date'
        },
        format: {
          type: 'string',
          value: 'yyyy-MM-dd'
        },
        
    }
} as WidgetNS.Config