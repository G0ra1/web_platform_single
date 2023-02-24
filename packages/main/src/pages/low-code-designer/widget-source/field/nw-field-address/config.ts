import { WidgetNS } from '../../../model/widget.d'
// export const label = 'Email'
// export const tagName = 'nw-field-address'
// export const icon = 'icon-n-y-address'
// export const category = 'field'
export default {
    key: 'nw-field-address',
    type: 'nw-field-address',
    tagName: 'nw-field-address',
    category: 'field',
    isCustomDesigner: false,
    icon: 'icon-n-y-address',
    label: '地址',
    options: {
        disabled: {
          type: 'boolean',
          value: false
        },
        showDetailed: {
          type: 'boolean',
          value: false
        },
    }
} as WidgetNS.Config