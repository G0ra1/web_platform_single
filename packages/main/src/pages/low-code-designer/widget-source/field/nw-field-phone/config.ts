import { WidgetNS } from '../../../model/widget.d'
// export const label = '手机号'
// export const tagName = 'nw-field-phone'
// export const icon = 'icon-n-y-phone'
// export const category = 'field'
export default {
    key: 'nw-field-phone',
    type: 'nw-field-phone',
    tagName: 'nw-field-phone',
    category: 'field',
    isCustomDesigner: false,
    icon: 'icon-n-y-phone',
    label: '手机号',
    options: {
        disabled: {
          type: 'boolean',
          value: false 
        }
    }
} as WidgetNS.Config