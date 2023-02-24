import { WidgetNS } from '../../../model/widget.d'
// export const label = '输入框'
// export const tagName = 'n-input'
// export const icon = 'icon-n-y-input'
// export const category = 'field'
export default {
    key: 'n-input',
    type: 'n-input',
    tagName: 'n-input',
    isCustomDesigner: false,
    category: 'field',
    icon: 'icon-n-y-input',
    label: '输入框',
    vModel: {
        value: {
          type: 'DataForm',
          field: ''
        }
    },
    options: {
        disabled: {
        type: 'boolean',
        value: false
        },
        clearable: {
        type: 'boolean',
        value: false
        },
        type: {
        type: 'string',
        value: 'text'
        },
    }
} as WidgetNS.Config