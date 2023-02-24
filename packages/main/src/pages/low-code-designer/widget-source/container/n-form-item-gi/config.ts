import { WidgetNS } from '../../../model/widget.d'
export const label = '表格'
export const tagName = 'nw-field-grid'
export const icon = 'icon-n-y-table'
export const category = 'container'
export const isCustomDesigner = true
export default {
    key: 'n-form-item-gi',
    type: 'n-form-item-gi',
    category: 'container',
    label: '字段栅格列',
    internal: true,
    slots: {
        default: []
    },
    options: {
        span: {
            type: 'number',
            value: 12
        },
        
        label: {
            type: 'string',
            value: '字段名1'
        },
        path: {
            type: 'string',
            value: 'field1'
        },
    }
} as WidgetNS.Config