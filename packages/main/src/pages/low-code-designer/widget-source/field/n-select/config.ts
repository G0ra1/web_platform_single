import { WidgetNS } from '../../../model/widget.d'
// export const label = '下拉框'
// export const tagName = 'n-select'
// export const icon = 'icon-n-y-select'
// export const category = 'field'
export default {
    key: 'n-select',
    type: 'n-select',
    tagName: 'n-select',
    isCustomDesigner: false,
    category: 'field',
    icon: 'icon-n-y-select',
    label: '下拉框',
    options: {
        disabled: {
          type: 'boolean',
          value: false
        }
    }
} as WidgetNS.Config