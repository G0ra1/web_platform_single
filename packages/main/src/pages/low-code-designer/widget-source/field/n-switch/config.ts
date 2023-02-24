import { WidgetNS } from '../../../model/widget.d'
// export const label = '开关'
// export const tagName = 'n-switch'
// export const icon = 'icon-n-y-switch'
// export const category = 'field'
export default {
    key: 'n-switch',
    type: 'n-switch',
    tagName: 'n-switch',
    isCustomDesigner: false,
    category: 'field',
    icon: 'icon-n-y-switch',
    label: '开关',
    options: {
        disabled: {
          type: 'boolean',
          value: false
        }
    }
} as WidgetNS.Config