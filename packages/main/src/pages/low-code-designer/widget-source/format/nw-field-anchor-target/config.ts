import { WidgetNS } from '../../../model/widget.d'
// export const label = '输入框'
// export const tagName = 'n-input'
// export const icon = 'icon-n-y-input'
// export const category = 'field'
export default {
    key: 'nw-field-anchor-target',
    type: 'nw-field-anchor-target',
    tagName:  'nw-field-anchor-target',
    isCustomDesigner: false,
    category: 'format',
    icon: 'icon-n-y-title',
    label: '段落标题',
    options: {
        label: {
            type: 'string',
            value: '标题'
        },
        target: {
            type: 'string',
            value: ''
        }
    }
} as WidgetNS.Config