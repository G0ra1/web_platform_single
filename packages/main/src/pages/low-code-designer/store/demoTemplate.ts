import { WidgetNS } from '../model/widget.d'
export default {
    key: 'n-form_1',
    type: 'n-form',
    tagName: 'n-form',
    isCustomDesigner: false,
    category: 'container',
    icon: 'icon-n-y-form',
    label: '表单',
    slots: {
        default: [
            {
                key: 'n-scrollbar_1',
                type: 'n-scrollbar',
                tagName: 'n-scrollbar',
                isCustomDesigner: false,
                category: 'container',
                icon: 'icon-n-y-scrollbar',
                label: '滚动',
                internal: true,
                slots: {
                    default: [
                        {
                            key: 'n-grid_1',
                            type: 'n-grid',
                            tagName: 'n-grid',
                            isCustomDesigner: false,
                            category: 'container',
                            icon: 'icon-n-y-grid',
                            label: '栅格',
                            internal: true,
                            slots: {
                                default: [
                                    {
                                        key: 'n-gi_1',
                                        type: 'n-gi',
                                        tagName: 'n-gi',
                                        isCustomDesigner: false,
                                        category: 'container',
                                        icon: 'icon-n-y-grid',
                                        label: '栅格列',
                                        internal: true,
                                        slots: {
                                            default: [
                                                {
                                                    key: "n-form-item_1x",
                                                    type: "n-form-item",
                                                    tagName: "n-form-item",
                                                    isCustomDesigner: false,
                                                    category: "container",
                                                    icon: "icon-n-y-form",
                                                    label: "表单字段",
                                                    internal: true,
                                                    slots: {
                                                        default: [
                                                            {
                                                                key: 'n-input_1x',
                                                                type: 'n-input',
                                                                tagName: 'n-input',
                                                                isCustomDesigner: false,
                                                                category: 'field',
                                                                icon: 'icon-n-y-input',
                                                                label: '输入框',
                                                                vModel: {
                                                                    value: {
                                                                        desc: '基础值',
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
                                                            }
                                                        ],
                                                    },
                                                    options: {
                                                        label: {
                                                            type: "string",
                                                            value: "字段",
                                                        },
                                                        path: {
                                                            type: "string",
                                                            value: "field",
                                                        },
                                                    },
                                                }
                                            ]
                                        },
                                        options: {
                                            span: {
                                                type: "number",
                                                value: 12,
                                            }
                                        }
                                    },
                                    {
                                        key: 'n-gi_2',
                                        type: 'n-gi',
                                        tagName: 'n-gi',
                                        isCustomDesigner: false,
                                        category: 'container',
                                        icon: 'icon-n-y-grid',
                                        label: '栅格列',
                                        internal: true,
                                        slots: {
                                            default: [
                                                {
                                                    key: "n-form-item_2x",
                                                    type: "n-form-item",
                                                    tagName: "n-form-item",
                                                    isCustomDesigner: false,
                                                    category: "container",
                                                    icon: "icon-n-y-form",
                                                    label: "表单字段",
                                                    internal: true,
                                                    slots: {
                                                        default: [
                                                            {
                                                                key: 'n-input_2x',
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
                                                            }
                                                        ],
                                                    },
                                                    options: {
                                                        label: {
                                                            type: "string",
                                                            value: "字段",
                                                        },
                                                        path: {
                                                            type: "string",
                                                            value: "field",
                                                        },
                                                    },
                                                }
                                            ]
                                        },
                                        options: {
                                            span: {
                                                type: "number",
                                                value: 12,
                                            }
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
                        }
                    ]
                },
                options: {
                    "style": {
                        "type": "object",
                        "value": "{\"height\": \"100%\",\"padding\": \"20px\", \"box-sizing\": \"border-box\"}"
                    }
                }
            }
        ]
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