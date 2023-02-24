import { WidgetNS } from '../../../model/widget.d'
export const label = '表格'
export const tagName = 'nw-field-grid'
export const icon = 'icon-n-y-table'
export const category = 'data'
export const isCustomDesigner = true
export default {
    key: 'nw-field-grid',
    type: 'nw-field-grid',
    category: 'data',
    icon: 'icon-n-y-table',
    label: '表格',
    tagName: 'nw-field-grid',
    isCustomDesigner: true,
    slots: {
        default_name: [{
            key: 'nw-field-render',
            type: 'nw-field-render',
            tagName: 'nw-field-render',
            isCustomDesigner: true,
            category: 'field',
            icon: 'icon-n-y-input',
            label: '自定义',
            options: {
                render: {
                    type: 'function',
                    value: `(dm, sp, h) => {
                        return sp.row.name
                    }`
                }
            }
        }],
        edit_name: [{
            key: 'n-input',
            type: 'n-input',
            tagName: 'n-input',
            isCustomDesigner: true,
            category: 'field',
            icon: 'icon-n-y-input',
            label: '输入框',
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
        }],
        default_code: [{
            key: 'nw-field-render',
            type: 'nw-field-render',
            tagName: 'nw-field-render',
            isCustomDesigner: true,
            category: 'field',
            icon: 'icon-n-y-input',
            label: '自定义',
            options: {
                render: {
                    type: 'function',
                    value: `(dm, sp, h) => {
                        return sp.row.code
                    }`
                }
            }
        }],
        edit_code: [{
            key: 'n-input',
            type: 'n-input',
            tagName: 'n-input',
            isCustomDesigner: true,
            category: 'field',
            icon: 'icon-n-y-input',
            label: '输入框',
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
        }],
    },
    options: {
        style: {
            type: 'object',
            value: `{
              width: '100%'
            }`
        },
        columns: {
            type: 'array',
            value: `[
                {
                    field: 'name',
                    title: '名称',
                    slots: {
                        default: 'default_name',
                        edit: 'edit_name'
                    },
                },
                {
                    field: 'code',
                    title: '编码',
                    slots: {
                        default: 'default_code',
                        edit: 'edit_code'
                    }
                }
          ]`
        },
        size: {
            type: 'string',
            value: 'mini'
        },
        showHeader: {
            type: 'boolean',
            value: true
        },
        align: {
            type: 'string',
            value: 'left'
        },
        headerAlign: {
            type: 'string',
            value: 'left'
        },
    }
} as WidgetNS.Config