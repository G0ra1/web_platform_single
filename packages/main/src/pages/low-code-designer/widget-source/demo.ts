import { WidgetNS } from '../model/widget.d'
export default {
    key: 'n-form_11',
    type: 'n-form',
    category: 'container',
    icon: 'icon-n-y-form',
    label: '表单',
    internalOptions: {
        isFormPage: true,
        isTabs: false,
        

    },
    slots: {
        default: [{
            type: 'n-grid',
            category: 'container',
            icon: 'icon-n-y-grid',
            label: '栅格',
            slots: {
                default: [
                    {
                        type: 'n-form-item-gi',
                        category: 'container',
                        icon: 'icon-n-y-form',
                        label: '表单字段',
                        internal: true,
                        slots: {
                            default: [
                                {
                                    type: 'n-input',
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
                                }
                            ]
                        },
                        options: {
                            label: {
                                type: 'string',
                                value: '字段名1'
                            },
                            path: {
                                type: 'string',
                                value: 'field1'
                            },
                        }
                    }
                ]
            },
            options: {
                cols: {
                    type: 'number',
                    value: 24
                },
                layoutShiftDisabled: {
                    type: 'boolean',
                    value: false
                },
                xGap: {
                    type: 'number',
                    value: 0
                },
                yGap: {
                    type: 'number',
                    value: 0
                }
            }
        }]
    },
    options: {
        size: {
            type: 'string',
            value: 'small'
        },
        disabled: {
            type: 'boolean',
            value: false
        },
        inline: {
            type: 'boolean',
            value: false
        },
        labelWidth: {
            type: 'string',
            value: '100px'
        },
        labelAlgin: {
            type: 'string',
            value: 'left'
        },
        labelPlacement: {
            type: 'string',
            value: 'left'
        }
    }
} as WidgetNS.Config