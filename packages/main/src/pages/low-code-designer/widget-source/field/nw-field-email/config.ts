import { WidgetNS } from '../../../model/widget.d'
// export const label = 'Email'
// export const tagName = 'nw-field-email'
// export const icon = 'icon-n-y-email'
// export const category = 'field'
export default {
    key: 'nw-field-email',
    type: 'nw-field-email',
    tagName: 'nw-field-email',
    category: 'field',
    isCustomDesigner: false,
    icon: 'icon-n-y-email',
    label: 'Email',
    options: {
        disabled: {
          type: 'boolean',
          value: false
        }
    }
} as WidgetNS.Config